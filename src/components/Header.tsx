import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Header() {
  const { user, loading, signOut } = useAuth()

  return (
    <header className="app-header">
      <div className="app-header-inner">
        <Link to="/">
          <h1 className="app-title">Orientación vocacional</h1>
        </Link>
        <div className="app-header-actions">
          {loading ? (
            <span className="app-lang">Cargando…</span>
          ) : user ? (
            <>
              <Link to="/perfil" className="header-link">Mi perfil</Link>
              <button
                type="button"
                onClick={() => signOut()}
                className="header-btn"
                aria-label="Cerrar sesión"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link to="/iniciar-sesion" className="header-link">Iniciar sesión</Link>
              <Link to="/registrarse" className="btn btn-small">Registrarse</Link>
            </>
          )}
          <span className="app-lang" aria-label="Idioma">Español</span>
        </div>
      </div>
    </header>
  )
}
