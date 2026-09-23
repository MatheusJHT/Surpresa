import { ArrowLeft, Heart, KeyRound, Send } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getPresentContent, getPublicPresents, getPublicSiteSettings, validatePresentPassword } from '../services/presents'
import { getMyProgress } from '../services/progress'
import { isSupabaseConfigured } from '../services/supabase'
import type { Present, PresentContent } from '../types/database'

type Step = 'password' | 'success'

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
        {step === 'success' && <SuccessContent content={content} isFinal={summary?.day_number === 19} finalMessage={finalMessage} />}
        {step !== 'success' && <form className="present-form" onSubmit={handleSubmit}>
          <label htmlFor="present-answer">Senha do presente</label>
          <input id="present-answer" type="password" value={value} onChange={(event) => setValue(event.target.value)} autoComplete="off" required autoFocus />
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="primary-button" type="submit" disabled={busy}>{busy ? 'Abrindo...' : 'Abrir presente'} <Send size={16} /></button>
        </form>}
        {step === 'success' && <Link className="primary-button" to={summary?.day_number === 19 ? '/' : '/jornada'}>{summary?.day_number === 19 ? 'Reviver nossa história' : 'Voltar para a jornada'} <Heart size={16} fill="currentColor" /></Link>}
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
      <div className="riddle-box"><span className="eyebrow">O presente final</span><p>{content?.success_message}</p><small>Obrigada por viver cada capítulo comigo.</small></div>
    </div>
  }

  return <div className="success-content"><p className="success-mark">Você acertou. <Heart size={17} fill="currentColor" /></p><p>{content?.success_message}</p><div className="riddle-box"><span className="eyebrow">O próximo passo</span><p>{content?.riddle}</p>{content?.hint && <small>Dica: {content.hint}</small>}</div></div>
}