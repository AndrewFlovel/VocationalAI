import { Link } from 'react-router-dom'

export default function Bienvenida() {
  return (
    <main className="app-main animate-fade-in-up">
      <section className="welcome">
        <h1>Orientación vocacional para tu futuro</h1>
        <p>
          Esta plataforma te ayuda a descubrir tus intereses y a explorar carreras
          con información real del mercado laboral en Bolivia. Pensada para
          bachilleres de Santa Cruz, Montero y Warnes.
        </p>
        <p>
          Reducimos la incertidumbre y el abandono de carrera con pruebas
          adaptadas y datos de empleo y educación.
        </p>
        <Link to="/empezar" className="btn">
          Comenzar
        </Link>
      </section>
    </main>
  )
}
