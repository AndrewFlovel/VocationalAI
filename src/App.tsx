import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Header from './components/Header'
import Bienvenida from './pages/Bienvenida'
import Empezar from './pages/Empezar'
import IniciarSesion from './pages/IniciarSesion'
import Registrarse from './pages/Registrarse'
import Perfil from './pages/Perfil'
import PruebaVocacional from './pages/PruebaVocacional'

function App() {
  return (
    <AuthProvider>
      <div className="app-layout">
        <Header />
        <Routes>
          <Route path="/" element={<Bienvenida />} />
          <Route path="/empezar" element={<Empezar />} />
          <Route path="/prueba" element={<PruebaVocacional />} />
          <Route path="/iniciar-sesion" element={<IniciarSesion />} />
          <Route path="/registrarse" element={<Registrarse />} />
          <Route path="/perfil" element={<Perfil />} />
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App
