import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PREGUNTAS } from '../data/preguntas'
import type { Pregunta } from '../data/preguntas'

const TOTAL_STEPS = PREGUNTAS.length + 1 // intro + preguntas
// Siempre usamos ruta relativa: en local el proxy de Vite reenvía a Vercel; en producción es mismo origen
const API_RECOMENDACIONES = '/api/recomendaciones'

export interface Respuesta {
  preguntaId: string
  preguntaTexto: string
  valor: string
  opcionTexto: string
}

export default function PruebaVocacional() {
  const [step, setStep] = useState(0)
  const [respuestas, setRespuestas] = useState<Respuesta[]>([])
  const [respuestaActual, setRespuestaActual] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [resultado, setResultado] = useState('')
  const [error, setError] = useState('')

  const isIntro = step === 0
  const isQuestion = step >= 1 && step <= PREGUNTAS.length
  const isSending = step === TOTAL_STEPS && loading
  const isResult = step === TOTAL_STEPS && !loading && (resultado || error)

  const preguntaActual: Pregunta | undefined = PREGUNTAS[step - 1]
  const progress = step === 0 ? 0 : (step / TOTAL_STEPS) * 100

  function handleElegir(valor: string) {
    setRespuestaActual(valor)
  }

  function handleSiguiente() {
    if (isIntro) {
      setStep(1)
      return
    }
    if (isQuestion && preguntaActual && respuestaActual) {
      const nueva: Respuesta = {
        preguntaId: preguntaActual.id,
        preguntaTexto: preguntaActual.texto,
        valor: respuestaActual,
        opcionTexto: opcionTextoActual,
      }
      setRespuestas((prev) => [...prev, nueva])
      setRespuestaActual(null)
      if (step < PREGUNTAS.length) {
        setStep(step + 1)
      } else {
        setStep(TOTAL_STEPS)
        enviarRecomendaciones([...respuestas, nueva])
      }
    }
  }

  function enviarRecomendaciones(answers: Respuesta[]) {
    setLoading(true)
    setError('')
    setResultado('')
    fetch(API_RECOMENDACIONES, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ respuestas: answers }),
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error(
              'La API no respondió (404). En local: pon en .env VITE_API_BASE_URL=https://tu-app.vercel.app (tu URL de Vercel) y reinicia con "npm run dev". En Vercel: revisa GEMINI_API_KEY en Variables de entorno.'
            )
          }
          if (res.status === 502) {
            throw new Error('Servicio no disponible. Revisa que GEMINI_API_KEY esté configurada en Vercel (Settings → Environment Variables).')
          }
          throw new Error(`Error ${res.status}`)
        }
        return res.json()
      })
      .then((data) => {
        setResultado(data.texto ?? data.recomendacion ?? JSON.stringify(data))
      })
      .catch((err) => {
        setError(err.message || 'No se pudieron generar recomendaciones. Intenta de nuevo.')
      })
      .finally(() => setLoading(false))
  }

  const opcionTextoActual = preguntaActual?.opciones.find((o) => o.valor === respuestaActual)?.texto ?? ''

  return (
    <main className="app-main prueba-main">
      {!isResult && (
        <div className="prueba-progress" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
          <div className="prueba-progress-bar" style={{ width: `${progress}%` }} />
        </div>
      )}

      {isIntro && (
        <div className="prueba-step">
          <h1 className="page-heading">Prueba de orientación</h1>
          <p className="prueba-intro">
            Responde con calma. No hay respuestas correctas o incorrectas; sirve para conocerte mejor y sugerirte carreras alineadas a tus intereses y al contexto de Bolivia (Santa Cruz, Montero, Warnes).
          </p>
          <p className="prueba-intro">Son {PREGUNTAS.length} preguntas. Puedes cambiar tus respuestas antes de enviar.</p>
          <button type="button" className="btn" onClick={() => setStep(1)}>
            Empezar preguntas
          </button>
        </div>
      )}

      {isQuestion && preguntaActual && (
        <div className="prueba-step">
          <p className="prueba-step-num">Pregunta {step} de {PREGUNTAS.length}</p>
          <h2 className="prueba-pregunta">{preguntaActual.texto}</h2>
          <ul className="prueba-opciones" role="listbox" aria-label={preguntaActual.texto}>
            {preguntaActual.opciones.map((opcion) => (
              <li key={opcion.id}>
                <button
                  type="button"
                  className={`prueba-opcion ${respuestaActual === opcion.valor ? 'prueba-opcion--active' : ''}`}
                  onClick={() => handleElegir(opcion.valor)}
                  role="option"
                  aria-selected={respuestaActual === opcion.valor}
                >
                  {opcion.texto}
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="btn"
            onClick={() => handleSiguiente()}
            disabled={!respuestaActual}
          >
            {step < PREGUNTAS.length ? 'Siguiente' : 'Ver mis recomendaciones'}
          </button>
        </div>
      )}

      {isSending && (
        <div className="prueba-step prueba-step--center">
          <p className="prueba-loading">Generando recomendaciones con IA…</p>
          <p className="auth-subtitle">Un momento, por favor.</p>
        </div>
      )}

      {isResult && (
        <div className="prueba-step prueba-resultado">
          <h1 className="page-heading">Tus recomendaciones</h1>
          {error ? (
            <div className="form-error" role="alert">
              {error}
              <p className="auth-subtitle" style={{ marginTop: '0.5rem' }}>
                Puedes <button type="button" className="header-btn" style={{ marginLeft: 0 }} onClick={() => { setStep(0); setRespuestas([]); setResultado(''); setError(''); }}>volver a intentar</button> o <Link to="/empezar">regresar al inicio</Link>.
              </p>
            </div>
          ) : (
            <>
              <div className="prueba-texto-resultado">{resultado}</div>
              <p className="auth-subtitle" style={{ marginTop: '1rem' }}>
                Estas sugerencias son un punto de partida. Te recomendamos comentarlas con tu familia, orientación del colegio o un profesional.
              </p>
              <Link to="/empezar" className="btn">Volver al inicio</Link>
            </>
          )}
        </div>
      )}
    </main>
  )
}
