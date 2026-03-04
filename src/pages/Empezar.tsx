import { Link } from 'react-router-dom'

export default function Empezar() {
  const pasos = [
    {
      titulo: 'Conocer tus intereses',
      descripcion: 'Responderás preguntas cortas y dinámicas sobre lo que te gusta y en lo que destacas.',
    },
    {
      titulo: 'Explorar carreras',
      descripcion: 'Verás opciones de estudio alineadas a tus respuestas y a la demanda laboral en Bolivia.',
    },
    {
      titulo: 'Ver recomendaciones',
      descripcion: 'Recibirás sugerencias claras para que puedas conversar con tu familia y tu colegio.',
    },
  ]

  return (
    <main className="app-main animate-fade-in-up">
      <h1 className="page-heading">¿Qué haremos?</h1>
      <ol className="steps" aria-label="Pasos de la orientación">
        {pasos.map((paso, i) => (
          <li key={i} className="step">
            <strong>Paso {i + 1}: {paso.titulo}</strong>
            <span>{paso.descripcion}</span>
          </li>
        ))}
      </ol>
      <p className="auth-subtitle" style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Link to="/prueba" className="btn">
          Hacer la prueba de orientación
        </Link>
        <Link to="/mercado" className="btn" style={{ background: 'var(--color-surface)', color: 'var(--color-primary)', border: '2px solid var(--color-primary)' }}>
          Ver datos del mercado
        </Link>
      </p>
    </main>
  )
}
