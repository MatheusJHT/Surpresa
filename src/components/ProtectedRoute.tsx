import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { loading, session } = useAuth()
  const location = useLocation()

  if (loading) {
    return <main className="centered-page"><p className="eyebrow">Abrindo nossa história...</p></main>
  }

  if (!session) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return children
}