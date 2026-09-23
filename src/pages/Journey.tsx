import { LogOut } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { JourneyTimeline } from '../components/JourneyTimeline'
import { useAuth } from '../context/AuthContext'
import { getPublicPresents } from '../services/presents'
import { getMyProgress } from '../services/progress'
import { isSupabaseConfigured } from '../services/supabase'
import type { Present, UserProgress } from '../types/database'

const fallbackPresents = Array.from({ length: 19 }, (_, index) => ({
  id: `preview-${index + 1}`,
  day_number: index + 1,
  title: `Presente ${String(index + 1).padStart(2, '0')}`,
  is_active: true,
})) satisfies Present[]

export function JourneyPage() {
  const { signOut, user } = useAuth()
  const [presents, setPresents] = useState<Present[]>(fallbackPresents)
  const [progress, setProgress] = useState<UserProgress[]>([])
  const [loading, setLoading] = useState(isSupabaseConfigured)
  const [loadError, setLoadError] = useState(false)

  useEffect(() => {
    if (!isSupabaseConfigured) return
    void Promise.all([getPublicPresents(), getMyProgress()])
      .then(([remotePresents, remoteProgress]) => {
        setPresents(remotePresents)
        setProgress(remoteProgress)
      })
      .catch(() => setLoadError(true))
      .finally(() => setLoading(false))
  }, [])

  async function handleSignOut() {
    await signOut()
  }

  return (
    <main className="app-shell journey-page">
      <nav className="topbar" aria-label="Navegação da jornada">
        <Link className="brand-mark" to="/">19 / 19</Link>
        <button className="logout-button" type="button" onClick={handleSignOut}><LogOut size={15} /> Sair</button>
      </nav>
      <section className="journey-heading" aria-labelledby="journey-title">
        <p className="eyebrow">Nossa jornada</p>
        <h1 id="journey-title">Cada senha abre um novo capítulo.</h1>
        <p className="hero-description">Uma surpresa de cada vez. O caminho só existe porque é nosso.</p>
        <span className="user-note">Acesso de {user?.email ?? 'você'}</span>
      </section>
      <section className="journey-board" aria-labelledby="board-title">
        <div className="section-heading"><div><p className="eyebrow">O caminho</p><h2 id="board-title">19 presentes</h2></div><span className="progress-count">{progress.filter((item) => item.completed).length} / 19</span></div>
        {loading ? <p className="journey-status">Abrindo cada capítulo...</p> : <JourneyTimeline presents={presents} progress={progress} />}
        {!loading && progress.filter((item) => item.completed).length === 19 && <p className="journey-complete">Todos os capítulos foram vividos. A história continua. <span aria-hidden="true">♥</span></p>}
        {loadError && <p className="connection-note" role="status">Não conseguimos sincronizar seu progresso agora. Mostrando a última estrutura disponível.</p>}
      </section>
    </main>
  )
}