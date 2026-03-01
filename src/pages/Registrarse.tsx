import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Registrarse() {
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.')
      return
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.')
      return
    }
    setLoading(true)
    const { error: err } = await signUp(email, password)
    setLoading(false)
    if (err) {
      setError(err.message)
      return
    }
    setSuccess(true)
    navigate('/perfil', { replace: true })
  }

  if (success) {
    return (
      <main className="app-main">
        <div className="auth-card">
          <h1 className="page-heading">Cuenta creada</h1>
          <p className="auth-subtitle">
            Revisa tu correo si activaste la confirmación. Ya puedes completar tu perfil.
          </p>
          <Link to="/perfil" className="btn">Ir a mi perfil</Link>
        </div>
      </main>
    )
  }

  return (
    <main className="app-main">
      <div className="auth-card">
        <h1 className="page-heading">Crear cuenta</h1>
        <p className="auth-subtitle">Regístrate para guardar tu perfil y resultados.</p>

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
            Contraseña (mínimo 6 caracteres)
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              className="form-input"
              placeholder="••••••••"
              minLength={6}
            />
          </label>
          <label className="form-label">
            Repetir contraseña
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
              className="form-input"
              placeholder="••••••••"
            />
          </label>
          <button type="submit" className="btn btn-block" disabled={loading}>
            {loading ? 'Creando cuenta…' : 'Registrarme'}
          </button>
        </form>

        <p className="auth-footer">
          ¿Ya tienes cuenta? <Link to="/iniciar-sesion">Inicia sesión</Link>
        </p>
      </div>
    </main>
  )
}
