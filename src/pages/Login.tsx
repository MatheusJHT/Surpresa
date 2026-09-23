import { FormEvent, useState } from 'react'
import { ArrowLeft, Heart } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function LoginPage() {
  const { isConfigured, signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setSubmitting(true)
    const result = await signIn(email.trim(), password)
    setSubmitting(false)

    if (result.error) {
      setError(isConfigured ? 'Não conseguimos abrir sua jornada. Confira seus dados e tente novamente.' : result.error.message)
      return
    }

    const destination = (location.state as { from?: string } | null)?.from ?? '/jornada'
    navigate(destination, { replace: true })
  }

  return (
    <main className="app-shell centered-page login-page">
      <Link className="back-link" to="/"><ArrowLeft size={16} aria-hidden="true" /> Voltar</Link>
      <p className="eyebrow">Uma jornada só nossa</p>
      <h1>Entre para continuar.</h1>
      <p className="hero-description">Use o acesso que foi preparado para você.</p>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">E-mail</label>
        <input id="email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        <label htmlFor="password">Senha</label>
        <input id="password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required />
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="primary-button" type="submit" disabled={submitting}>
          {submitting ? 'Abrindo...' : 'Entrar'} <Heart size={17} fill="currentColor" aria-hidden="true" />
        </button>
      </form>
    </main>
  )
}