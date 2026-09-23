import { Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { isCurrentUserAdmin } from '../services/admin'
import { isSupabaseConfigured } from '../services/supabase'
import { useAuth } from '../context/AuthContext'

export function AdminRoute({ children }: { children: React.ReactNode }) {
  const { loading: authLoading, session } = useAuth()
  const [checking, setChecking] = useState(true)
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    if (authLoading) return
    if (!session || !isSupabaseConfigured) {
      setAllowed(false)
      setChecking(false)
      return
    }
    void isCurrentUserAdmin().then(setAllowed).catch(() => setAllowed(false)).finally(() => setChecking(false))
  }, [authLoading, session])

  if (authLoading || checking) return <main className="centered-page"><p className="eyebrow">Verificando acesso...</p></main>
  if (!session || !allowed) return <Navigate to="/jornada" replace />
  return children
}