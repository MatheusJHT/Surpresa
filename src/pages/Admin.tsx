import { Check, LogOut, Save, ShieldAlert, Trash2, Upload } from 'lucide-react'
import { useEffect, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { createAdminCarousel, deleteAdminCarousel, getAdminOverview, resetJourneyProgress, saveAdminCarousel, saveAdminPresent, saveAdminSettings } from '../services/admin'
import { removeCarouselImage, storagePathFromUrl, uploadCarouselImage } from '../services/storage'
import type { AdminOverview, AdminPresent, AdminCarouselImage } from '../types/database'

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
    try { setOverview(await getAdminOverview()); setError('') } catch (loadError) { setError(loadError instanceof Error ? loadError.message : 'Não foi possível carregar o painel.') } finally { setLoading(false) }
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
  const [form, setForm] = useState({ title: present.title, password: '', success_message: present.success_message, riddle: present.riddle, photo_url: present.photo_url ?? '', hint: present.hint ?? '', normalize_accents: present.normalize_accents, ignore_punctuation: present.ignore_punctuation, is_active: present.is_active })
  useEffect(() => {
    setForm({ title: present.title, password: '', success_message: present.success_message, riddle: present.riddle, photo_url: present.photo_url ?? '', hint: present.hint ?? '', normalize_accents: present.normalize_accents, ignore_punctuation: present.ignore_punctuation, is_active: present.is_active })
  }, [present])
  async function submit(event: FormEvent) { event.preventDefault(); await saveAdminPresent({ present_id: present.id, ...form }); await onSaved() }
  return <form className="admin-form" onSubmit={submit}><label>Presente<select value={present.id} onChange={() => undefined} disabled><option>Dia {String(present.day_number).padStart(2, '0')}</option></select></label>{(['title', 'password', 'success_message', 'riddle', 'photo_url', 'hint'] as const).map((field) => <label key={field}>{fieldLabel(field)}{field === 'success_message' || field === 'riddle' ? <textarea value={form[field]} onChange={(event) => setForm({ ...form, [field]: event.target.value })} /> : <input type={field === 'password' ? 'password' : 'text'} placeholder={field === 'password' ? 'Deixe em branco para manter' : undefined} value={form[field]} onChange={(event) => setForm({ ...form, [field]: event.target.value })} />}</label>)}<div className="check-row"><label><input type="checkbox" checked={form.is_active} onChange={(event) => setForm({ ...form, is_active: event.target.checked })} /> Ativo</label></div><button className="primary-button" type="submit"><Save size={16} /> Salvar alterações</button></form>
}

function fieldLabel(field: string) { return ({ title: 'Título', password: 'Nova senha física', success_message: 'Mensagem após a senha', riddle: 'Enigma', photo_url: 'URL da foto', hint: 'Dica opcional' })[field] }

function SettingsEditor({ settings, onSaved }: { settings: NonNullable<AdminOverview['settings']>; onSaved: () => Promise<void> }) { const [form, setForm] = useState(settings); async function submit(event: FormEvent) { event.preventDefault(); await saveAdminSettings(form); await onSaved() } return <form className="admin-form" onSubmit={submit}>{(['site_title', 'site_subtitle', 'intro_message', 'final_message'] as const).map((field) => <label key={field}>{fieldLabel(field)}<textarea value={form[field]} onChange={(event) => setForm({ ...form, [field]: event.target.value })} /></label>)}<button className="primary-button" type="submit"><Save size={16} /> Salvar configurações</button></form> }

function PhotoEditor({ overview, onSaved }: { overview: AdminOverview | null; onSaved: () => Promise<void> }) {
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [caption, setCaption] = useState('')
  const [photoError, setPhotoError] = useState('')
  async function addPhotos(files: File[]) {
    if (files.length === 0) return
    setUploading(true); setUploadProgress(0); setPhotoError('')
    try {
      const startOrder = overview?.carousel.length ?? 0
      for (const [index, file] of files.entries()) {
        const uploaded = await uploadCarouselImage(file)
        await createAdminCarousel({ image_url: uploaded.url, caption, display_order: startOrder + index })
        setUploadProgress(index + 1)
      }
      setCaption('')
      await onSaved()
    } catch {
      setPhotoError('Algumas fotos podem não ter sido enviadas. Verifique o carrossel e tente novamente.')
    } finally { setUploading(false) }
  }
  async function replacePhoto(image: AdminCarouselImage, file: File) {
    setUploading(true); setPhotoError('')
    try { const uploaded = await uploadCarouselImage(file); await saveAdminCarousel({ image_id: image.id, caption: image.caption ?? '', display_order: image.display_order, is_active: image.is_active, image_url: uploaded.url }); const oldPath = storagePathFromUrl(image.image_url); if (oldPath) await removeCarouselImage(oldPath); await onSaved() } catch { setPhotoError('Não foi possível substituir essa foto.') } finally { setUploading(false) }
  }
  async function removePhoto(image: AdminCarouselImage) {
    if (!window.confirm('Excluir esta foto do carrossel?')) return
    try { const path = storagePathFromUrl(image.image_url); if (path) await removeCarouselImage(path); await deleteAdminCarousel(image.id); await onSaved() } catch { setPhotoError('Não foi possível excluir essa foto.') }
  }
  return <div className="photo-manager"><div className="upload-panel"><p className="eyebrow">Novas memórias</p><label className="upload-button"><Upload size={16} /> {uploading ? `Enviando ${uploadProgress} foto(s)...` : 'Escolher várias fotos'}<input type="file" accept="image/jpeg,image/png,image/webp" multiple disabled={uploading} onChange={(event) => { void addPhotos(Array.from(event.target.files ?? [])); event.currentTarget.value = '' }} /></label><label>Legenda opcional<input value={caption} onChange={(event) => setCaption(event.target.value)} placeholder="Uma frase para acompanhar as fotos" /></label><small className="upload-help">Você pode selecionar várias imagens de uma vez. A legenda será aplicada a todas.</small></div>{photoError && <p className="form-error" role="alert">{photoError}</p>}<div className="photo-grid">{(overview?.carousel ?? []).map((image) => <article className="photo-item" key={image.id}><img src={image.image_url} alt={image.caption ?? 'Foto da memória'} /><div><span>{image.caption || 'Sem legenda'}</span><label className="replace-button">Substituir<input type="file" accept="image/jpeg,image/png,image/webp" disabled={uploading} onChange={(event) => { const file = event.target.files?.[0]; if (file) void replacePhoto(image, file) }} /></label><button type="button" className="icon-danger" aria-label="Excluir foto" onClick={() => void removePhoto(image)}><Trash2 size={16} /></button></div></article>)}</div></div>
}

function ProgressPanel({ overview, onReset }: { overview: AdminOverview | null; onReset: () => Promise<void> }) { return <div className="admin-panel"><div className="section-heading"><div><p className="eyebrow">Acompanhamento</p><h2>{overview?.progress.filter((item) => item.completed).length ?? 0} capítulos concluídos</h2></div><button className="danger-button" type="button" onClick={() => void onReset()}>Resetar jornada</button></div><div className="progress-table">{(overview?.progress ?? []).map((item) => <div key={item.id}><span>{item.present_id}</span><strong>{item.completed ? 'Concluído' : item.password_verified ? 'Mensagem liberada' : 'Aguardando senha'}</strong><small>{item.attempts} tentativa(s)</small></div>)}</div></div> }