import { Check, ChevronDown, LogOut, Save, ShieldAlert } from 'lucide-react'
import { useEffect, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getAdminOverview, resetJourneyProgress, saveAdminCarousel, saveAdminPresent, saveAdminSettings } from '../services/admin'
import type { AdminOverview, AdminPresent } from '../types/database'

type AdminTab = 'overview' | 'presents' | 'photos' | 'settings' | 'progress'

export function AdminPage() {
  const { signOut } = useAuth()
  const [tab, setTab] = useState<AdminTab>('overview')
  const [overview, setOverview] = useState<AdminOverview | null>(null)
  const [selectedId, setSelectedId] = useState('')
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function load() {
    setLoading(true)
    try { setOverview(await getAdminOverview()); setError('') } catch { setError('Não foi possível carregar o painel.') } finally { setLoading(false) }
  }

  useEffect(() => { void load() }, [])

  async function handleReset() {
    if (!window.confirm('Isso apagará todo o progresso da usuária e voltará ao Dia 01. Continuar?')) return
    try { await resetJourneyProgress(); setMessage('Jornada resetada.'); await load() } catch { setError('Não foi possível resetar a jornada.') }
  }

  if (loading && !overview) return <main className="centered-page"><p className="eyebrow">Abrindo painel...</p></main>
  const completed = overview?.progress.filter((item) => item.completed).length ?? 0
  const selected = overview?.presents.find((present) => present.id === (selectedId || overview.presents[0]?.id)) ?? null

  return (
    <main className="app-shell admin-page">
      <nav className="topbar" aria-label="Navegação administrativa"><Link className="brand-mark" to="/">19 / 19</Link><button className="logout-button" type="button" onClick={() => void signOut()}><LogOut size={15} /> Sair</button></nav>
      <header className="admin-header"><div><p className="eyebrow">Espaço reservado</p><h1>Painel da história.</h1></div><span className="admin-badge"><ShieldAlert size={15} /> Administrador</span></header>
      {error && <p className="form-error admin-feedback" role="alert">{error}</p>}
      {message && <p className="admin-success" role="status"><Check size={16} /> {message}</p>}
      <nav className="admin-tabs" aria-label="Seções do painel">{(['overview', 'presents', 'photos', 'settings', 'progress'] as AdminTab[]).map((item) => <button type="button" className={tab === item ? 'is-active' : ''} onClick={() => { setTab(item); setMessage('') }} key={item}>{tabLabel(item)}</button>)}</nav>
      <section className="admin-content">
        {tab === 'overview' && <Overview completed={completed} total={overview?.presents.length ?? 19} progress={overview?.progress.length ?? 0} />}
        {tab === 'presents' && selected && <><label className="admin-selector">Selecionar presente<select value={selected.id} onChange={(event) => setSelectedId(event.target.value)}>{overview?.presents.map((present) => <option value={present.id} key={present.id}>Dia {String(present.day_number).padStart(2, '0')} · {present.title}</option>)}</select></label><PresentEditor present={selected} onSaved={async () => { setMessage('Alterações salvas.'); await load() }} /></>}
        {tab === 'photos' && <PhotoEditor overview={overview} onSaved={async () => { setMessage('Foto atualizada.'); await load() }} />}
        {tab === 'settings' && overview?.settings && <SettingsEditor settings={overview.settings} onSaved={async () => { setMessage('Configurações salvas.'); await load() }} />}
        {tab === 'progress' && <ProgressPanel overview={overview} onReset={handleReset} />}
      </section>
    </main>
  )
}

function tabLabel(tab: AdminTab) { return ({ overview: 'Visão geral', presents: 'Presentes', photos: 'Fotos', settings: 'Configurações', progress: 'Progresso' })[tab] }

function Overview({ completed, total, progress }: { completed: number; total: number; progress: number }) {
  return <div className="admin-overview"><div className="admin-stat-grid"><div><span>Presentes</span><strong>{total}</strong></div><div><span>Concluídos</span><strong>{completed}</strong></div><div><span>Registros</span><strong>{progress}</strong></div><div><span>Progresso</span><strong>{total ? Math.round((completed / total) * 100) : 0}%</strong></div></div><div className="admin-panel"><p className="eyebrow">Ritmo da jornada</p><h2>Conteúdo pronto para cada capítulo.</h2><p className="hero-description">Edite cada presente com calma. As credenciais continuam protegidas no servidor.</p></div></div>
}

function PresentEditor({ present, onSaved }: { present: AdminPresent; onSaved: () => Promise<void> }) {
  const [form, setForm] = useState({ title: present.title, question: present.question, answer: '', password: '', success_message: present.success_message, riddle: present.riddle, photo_url: present.photo_url ?? '', hint: present.hint ?? '', normalize_accents: present.normalize_accents, ignore_punctuation: present.ignore_punctuation, is_active: present.is_active })
  async function submit(event: FormEvent) { event.preventDefault(); await saveAdminPresent({ present_id: present.id, ...form }); await onSaved() }
  return <form className="admin-form" onSubmit={submit}><label>Presente<select value={present.id} onChange={() => undefined} disabled><option>Dia {String(present.day_number).padStart(2, '0')}</option></select></label>{(['title', 'password', 'question', 'answer', 'success_message', 'riddle', 'photo_url', 'hint'] as const).map((field) => <label key={field}>{fieldLabel(field)}{field === 'question' || field === 'success_message' || field === 'riddle' ? <textarea value={form[field]} onChange={(event) => setForm({ ...form, [field]: event.target.value })} /> : <input type={field === 'password' || field === 'answer' ? 'password' : 'text'} placeholder={field === 'password' || field === 'answer' ? 'Deixe em branco para manter' : undefined} value={form[field]} onChange={(event) => setForm({ ...form, [field]: event.target.value })} />}</label>)}<div className="check-row"><label><input type="checkbox" checked={form.normalize_accents} onChange={(event) => setForm({ ...form, normalize_accents: event.target.checked })} /> Ignorar acentos</label><label><input type="checkbox" checked={form.ignore_punctuation} onChange={(event) => setForm({ ...form, ignore_punctuation: event.target.checked })} /> Ignorar pontuação</label><label><input type="checkbox" checked={form.is_active} onChange={(event) => setForm({ ...form, is_active: event.target.checked })} /> Ativo</label></div><button className="primary-button" type="submit"><Save size={16} /> Salvar alterações</button></form>
}

function fieldLabel(field: string) { return ({ title: 'Título', password: 'Nova senha física', question: 'Pergunta', answer: 'Nova resposta correta', success_message: 'Mensagem após acerto', riddle: 'Enigma', photo_url: 'URL da foto', hint: 'Dica opcional' })[field] }

function SettingsEditor({ settings, onSaved }: { settings: NonNullable<AdminOverview['settings']>; onSaved: () => Promise<void> }) { const [form, setForm] = useState(settings); async function submit(event: FormEvent) { event.preventDefault(); await saveAdminSettings(form); await onSaved() } return <form className="admin-form" onSubmit={submit}>{(['site_title', 'site_subtitle', 'intro_message', 'final_message'] as const).map((field) => <label key={field}>{fieldLabel(field)}<textarea value={form[field]} onChange={(event) => setForm({ ...form, [field]: event.target.value })} /></label>)}<button className="primary-button" type="submit"><Save size={16} /> Salvar configurações</button></form> }

function PhotoEditor({ overview, onSaved }: { overview: AdminOverview | null; onSaved: () => Promise<void> }) { const image = overview?.carousel[0]; const [caption, setCaption] = useState(image?.caption ?? ''); if (!image) return <div className="admin-panel"><h2>Nenhuma foto cadastrada.</h2><p className="hero-description">O upload para o Storage será habilitado na próxima etapa.</p></div>; return <form className="admin-form" onSubmit={async (event) => { event.preventDefault(); await saveAdminCarousel({ image_id: image.id, caption, display_order: image.display_order, is_active: image.is_active }); await onSaved() }}><img className="admin-photo-preview" src={image.image_url} alt={image.caption ?? 'Foto cadastrada'} /><label>Legenda<input value={caption} onChange={(event) => setCaption(event.target.value)} /></label><button className="primary-button" type="submit"><Save size={16} /> Salvar legenda</button></form> }

function ProgressPanel({ overview, onReset }: { overview: AdminOverview | null; onReset: () => Promise<void> }) { return <div className="admin-panel"><div className="section-heading"><div><p className="eyebrow">Acompanhamento</p><h2>{overview?.progress.filter((item) => item.completed).length ?? 0} capítulos concluídos</h2></div><button className="danger-button" type="button" onClick={() => void onReset()}>Resetar jornada</button></div><div className="progress-table">{(overview?.progress ?? []).map((item) => <div key={item.id}><span>{item.present_id}</span><strong>{item.completed ? 'Concluído' : item.password_verified ? 'Pergunta pendente' : 'Aguardando senha'}</strong><small>{item.attempts} tentativas</small></div>)}</div></div> }