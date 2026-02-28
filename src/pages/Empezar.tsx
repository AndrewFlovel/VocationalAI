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
    <main className="app-main">
      <h1 className="page-heading">¿Qué haremos?</h1>
      <ol className="steps" aria-label="Pasos de la orientación">
        {pasos.map((paso, i) => (
          <li key={i} className="step">
            <strong>Paso {i + 1}: {paso.titulo}</strong>
            <span>{paso.descripcion}</span>
          </li>
        ))}
      </ol>
    </main>
  )
}
