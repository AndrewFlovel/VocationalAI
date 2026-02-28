import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="app-header">
      <div className="app-header-inner">
        <Link to="/">
          <h1 className="app-title">Orientación vocacional</h1>
        </Link>
        <span className="app-lang" aria-label="Idioma">Español</span>
      </div>
    </header>
  )
}
