import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Header from './components/Header'
import ConnectivityBanner from './components/ConnectivityBanner'
import Bienvenida from './pages/Bienvenida'
import Empezar from './pages/Empezar'
import IniciarSesion from './pages/IniciarSesion'
import Registrarse from './pages/Registrarse'
import Perfil from './pages/Perfil'
import PruebaVocacional from './pages/PruebaVocacional'
import MercadoLaboral from './pages/MercadoLaboral'

function App() {
  return (
    <AuthProvider>
      <div className="app-layout">
        <ConnectivityBanner />
        <Header />
        <Routes>
          <Route path="/" element={<Bienvenida />} />
          <Route path="/empezar" element={<Empezar />} />
          <Route path="/prueba" element={<PruebaVocacional />} />
          <Route path="/mercado" element={<MercadoLaboral />} />
          <Route path="/iniciar-sesion" element={<IniciarSesion />} />
          <Route path="/registrarse" element={<Registrarse />} />
          <Route path="/perfil" element={<Perfil />} />
        </Routes>
        <footer className="app-footer">
          <div className="footer-content">
            <p className="footer-disclaimer">
              Esta herramienta apoya la orientación vocacional pero no reemplaza el criterio de profesionales y familiares.
            </p>
            <p className="footer-copy">
              © 2026 Orientación Vocacional Bolivia
            </p>
          </div>
        </footer>
      </div>
    </AuthProvider>
  )
}

export default App
