import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function IniciarSesion() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error: err } = await signIn(email, password)
    setLoading(false)
    if (err) {
      setError(err.message === 'Invalid login credentials' ? 'Correo o contraseña incorrectos.' : err.message)
      return
    }
    navigate('/perfil', { replace: true })
  }

  return (
    <main className="app-main">
      <div className="auth-card">
        <h1 className="page-heading">Iniciar sesión</h1>
        <p className="auth-subtitle">Ingresa con tu correo y contraseña.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <p className="form-error" role="alert">{error}</p>}
          <label className="form-label">
            Correo electrónico
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="form-input"
              placeholder="tu@correo.com"
            />
          </label>
          <label className="form-label">
            Contraseña
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="form-input"
              placeholder="••••••••"
            />
          </label>
          <button type="submit" className="btn btn-block" disabled={loading}>
            {loading ? 'Entrando…' : 'Entrar'}
          </button>
        </form>

        <p className="auth-footer">
          ¿No tienes cuenta? <Link to="/registrarse">Regístrate</Link>
        </p>
      </div>
    </main>
  )
}
