import { ArrowLeft, Gift, Heart, KeyRound, Send, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getPresentContent, getPublicPresents, getPublicSiteSettings, validatePresentPassword } from '../services/presents'
import { getMyProgress } from '../services/progress'
import { isSupabaseConfigured } from '../services/supabase'
import type { Present, PresentContent } from '../types/database'

type Step = 'password' | 'success'
type ProposalStep = 'closed' | 'question' | 'celebration'

export function PresentPage() {
  const { presentId = '' } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [summary, setSummary] = useState<Present | null>(null)
  const [content, setContent] = useState<PresentContent | null>(null)
  const [step, setStep] = useState<Step>('password')
  const [value, setValue] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [proposalAnswer, setProposalAnswer] = useState('')
  const [proposalStep, setProposalStep] = useState<ProposalStep>('closed')
  const [finalMessage, setFinalMessage] = useState('19 anos, 19 dias, 19 presentes. E eu escolheria continuar vivendo nossa história ao seu lado.')

  useEffect(() => {
    if (!isSupabaseConfigured || !presentId) return
    void Promise.all([getPublicPresents(), getMyProgress(), getPublicSiteSettings()]).then(async ([presents, progress, settings]) => {
      const selected = presents.find((present) => present.id === presentId) ?? null
      setSummary(selected)
      if (settings?.final_message) setFinalMessage(settings.final_message)
      const current = progress.find((item) => item.present_id === presentId)
      if (current?.password_verified) {
        const unlockedContent = await getPresentContent(presentId)
        setContent(unlockedContent)
        if (current.completed) setStep('success')
        else if (unlockedContent) setStep('success')
      }
    }).catch(() => setError('Nossa história encontrou um pequeno obstáculo. Tente novamente.'))
  }, [presentId])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!presentId || !value.trim()) return
    setBusy(true)
    setError('')
    try {
      if (step === 'password') {
        const valid = await validatePresentPassword(presentId, value)
        if (!valid) {
          setError('Hmm... essa não parece ser a senha que veio com o presente. ❤️')
        } else {
          setContent(await getPresentContent(presentId))
          setStep('success')
          setValue('')
        }
      }
    } catch {
      setError('Parece que nossa história encontrou um pequeno obstáculo. Tente novamente.')
    } finally {
      setBusy(false)
    }
  }

  function handleProposalSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (proposalAnswer.trim().toLocaleLowerCase('pt-BR') === 'sim') {
      setProposalStep('celebration')
      return
    }
    setError('Pense com carinho e responda quando estiver pronta. ❤️')
  }

  if (!summary && isSupabaseConfigured && !error) return <main className="centered-page"><p className="eyebrow">Abrindo o presente...</p></main>

  return (
    <main className="app-shell present-page">
      <nav className="topbar" aria-label="Navegação do presente">
        <button className="back-link" type="button" onClick={() => navigate('/jornada')}><ArrowLeft size={16} /> Voltar para a jornada</button>
        <span className="brand-mark">Dia {String(summary?.day_number ?? '?').padStart(2, '0')}</span>
      </nav>
      <section className="present-card" aria-labelledby="present-title">
        <p className="eyebrow">{step === 'password' ? 'Uma nova surpresa' : 'Mais um capítulo nosso'}</p>
        <div className="present-icon">{step === 'password' ? <KeyRound size={26} /> : <Heart size={26} fill="currentColor" />}</div>
        <h1 id="present-title">{summary?.title ?? 'Um presente para você'}</h1>
        {step === 'password' && <p className="hero-description">Digite a senha que veio junto com o presente físico.</p>}
        {step === 'success' && summary?.day_number === 12 && proposalStep !== 'closed' ? <ProposalContent proposalStep={proposalStep} answer={proposalAnswer} error={error} onAnswerChange={setProposalAnswer} onSubmit={handleProposalSubmit} /> : step === 'success' && <SuccessContent content={content} isFinal={summary?.day_number === 19} finalMessage={finalMessage} />}
        {step !== 'success' && <form className="present-form" onSubmit={handleSubmit}>
          <label htmlFor="present-answer">Senha do presente</label>
          <input id="present-answer" type="password" value={value} onChange={(event) => setValue(event.target.value)} autoComplete="off" required autoFocus />
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="primary-button" type="submit" disabled={busy}>{busy ? 'Abrindo...' : 'Abrir presente'} <Send size={16} /></button>
        </form>}
        {step === 'success' && summary?.day_number === 12 && proposalStep === 'closed' && <button className="primary-button surprise-button" type="button" onClick={() => { setError(''); setProposalStep('question') }}>Abrir surpresa <Sparkles size={16} /></button>}
        {step === 'success' && (summary?.day_number !== 12 || proposalStep === 'celebration') && <Link className="primary-button" to={summary?.day_number === 19 ? '/' : '/jornada'}>{summary?.day_number === 19 ? 'Reviver nossa história' : 'Voltar para a jornada'} <Heart size={16} fill="currentColor" /></Link>}
        <span className="user-note">{user?.email ?? 'Nossa história'}</span>
      </section>
    </main>
  )
}

function SuccessContent({ content, isFinal, finalMessage }: { content: PresentContent | null; isFinal: boolean; finalMessage: string }) {
  if (isFinal) {
    return <div className="success-content final-celebration">
      <div className="heart-burst" aria-hidden="true">{Array.from({ length: 9 }, (_, index) => <motion.span key={index} animate={{ y: [0, -18 - index * 3, 0], opacity: [0.3, 1, 0.3] }} transition={{ duration: 2 + index * 0.15, repeat: Infinity, delay: index * 0.12 }}>♥</motion.span>)}</div>
      <p className="final-count">19 / 19</p>
      <p className="success-mark">Você chegou até o fim. <Heart size={17} fill="currentColor" /></p>
      <p className="final-message">{finalMessage}</p>
      <p className="day-message">Agora aproveite o seu dia.</p>
      <p className="hint-collection">Acho que já vou ter feito o pedido, mas caso não, junte as letras de todas as dicas e terá uma surpresa muito grande. Heheheh.</p>
      <div className="riddle-box"><span className="eyebrow">O presente final</span><p>{content?.success_message}</p><small>Obrigada por viver cada capítulo comigo.</small></div>
    </div>
  }

  return <div className="success-content">
    <motion.div className="opened-gift" initial={{ scale: 0.7, rotate: -5, opacity: 0 }} animate={{ scale: 1, rotate: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 180, damping: 12 }} aria-label="Presente aberto">
      <Gift size={42} strokeWidth={1.5} aria-hidden="true" />
      <span className="gift-spark gift-spark-one" aria-hidden="true">✦</span>
      <span className="gift-spark gift-spark-two" aria-hidden="true">✦</span>
    </motion.div>
    <p className="success-mark">Presente aberto. <Heart size={17} fill="currentColor" /></p>
    <p className="success-message">{content?.success_message}</p>
    <div className="riddle-box"><span className="eyebrow">O próximo passo</span><p>{content?.riddle}</p>{content?.hint && <small>Dica: {content.hint}</small>}</div>
  </div>
}

function ProposalContent({ proposalStep, answer, error, onAnswerChange, onSubmit }: { proposalStep: ProposalStep; answer: string; error: string; onAnswerChange: (value: string) => void; onSubmit: (event: FormEvent<HTMLFormElement>) => void }) {
  if (proposalStep === 'celebration') {
    return <motion.div className="proposal-celebration" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}>
      <div className="celebration-decor" aria-hidden="true">♥ ✦ ♥ ✦ ♥</div>
      <Sparkles className="celebration-icon" size={42} aria-hidden="true" />
      <p className="final-count">O começo do nosso para sempre</p>
      <h2>Eu sabia que seria você.</h2>
      <p>Então é oficial: agora começa o capítulo mais bonito da nossa história. Obrigado por escolher viver a vida comigo. Eu te amo, hoje e todos os dias que ainda vamos construir.</p>
      <div className="celebration-decor" aria-hidden="true">✦ ♥ ✦ ♥ ✦</div>
    </motion.div>
  }

  return <motion.div className="proposal-question" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
    <div className="proposal-ring" aria-hidden="true"><Heart size={28} fill="currentColor" /></div>
    <p className="eyebrow">Uma pergunta muito especial</p>
    <h2>Qual é a sua resposta?</h2>
    <p className="hero-description">Responda com o coração. ❤️</p>
    <form className="present-form" onSubmit={onSubmit}>
      <label htmlFor="proposal-answer">Sua resposta</label>
      <input id="proposal-answer" type="text" value={answer} onChange={(event) => onAnswerChange(event.target.value)} autoComplete="off" autoFocus required />
      {error && <p className="form-error" role="alert">{error}</p>}
      <button className="primary-button" type="submit">Responder <Heart size={16} fill="currentColor" /></button>
    </form>
  </motion.div>
}