import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Bienvenida from './pages/Bienvenida'
import Empezar from './pages/Empezar'

function App() {
  return (
    <div className="app-layout">
      <Header />
      <Routes>
        <Route path="/" element={<Bienvenida />} />
        <Route path="/empezar" element={<Empezar />} />
      </Routes>
    </div>
  )
}

export default App
