import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PREGUNTAS } from '../data/preguntas'
import EthicalDisclaimer from '../components/EthicalDisclaimer'
import FeedbackForm from '../components/FeedbackForm'
import MatchmakingEducativo from '../components/MatchmakingEducativo'

const TOTAL_STEPS = 6
const API_PROXIMO = '/api/proximo-paso'
const API_RECOMENDACIONES = '/api/recomendaciones'

interface DynamicQuestion {
  pregunta: string
  opciones: { id: string, texto: string, valor: string }[]
  insight?: string
}

export default function PruebaVocacional() {
  const [step, setStep] = useState(0)
  const [respuestas, setRespuestas] = useState<any[]>([])
  const [currentQuestion, setCurrentQuestion] = useState<DynamicQuestion | null>(null)
  const [respuestaActual, setRespuestaActual] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [resultado, setResultado] = useState('')
  const [insight, setInsight] = useState('')
  const [error, setError] = useState('')
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  const progress = (step / TOTAL_STEPS) * 100

  useEffect(() => {
    const handleStatus = () => setIsOnline(navigator.onLine)
    window.addEventListener('online', handleStatus)
    window.addEventListener('offline', handleStatus)
    return () => {
      window.removeEventListener('online', handleStatus)
      window.removeEventListener('offline', handleStatus)
    }
  }, [])

  // Inicializar primera pregunta (siempre estática para rapidez o dinámica si se prefiere)
  useEffect(() => {
    if (step === 1 && !currentQuestion) {
      setCurrentQuestion({
        pregunta: PREGUNTAS[0].texto,
        opciones: PREGUNTAS[0].opciones.map(o => ({ id: o.id, texto: o.texto, valor: o.valor }))
      })
    }
  }, [step])

  const handleSiguiente = async () => {
    if (step === 0) {
      setStep(1)
      return
    }

    const textoRespuesta = currentQuestion?.opciones.find(o => o.valor === respuestaActual)?.texto || ''
    const nuevasRespuestas = [...respuestas, { 
      pregunta: currentQuestion?.pregunta, 
      respuesta: textoRespuesta, 
      valor: respuestaActual 
    }]
    setRespuestas(nuevasRespuestas)
    setRespuestaActual(null)

    if (step < TOTAL_STEPS) {
      setLoading(true)
      const siguientePaso = step + 1

      if (isOnline) {
        try {
          const res = await fetch(API_PROXIMO, {
            method: 'POST',
            body: JSON.stringify({ 
              historial: nuevasRespuestas, 
              pasoActual: siguientePaso, 
              totalPasos: TOTAL_STEPS 
            })
          })
          const data = await res.json()
          setCurrentQuestion(data)
          setInsight(data.insight || '')
          setStep(siguientePaso)
        } catch (err) {
          console.error('Error IA Adaptativa:', err)
          // Fallback a preguntas estáticas si falla la IA
          usarPreguntaEstatica(siguientePaso)
        } finally {
          setLoading(false)
        }
      } else {
        usarPreguntaEstatica(siguientePaso)
        setLoading(false)
      }
    } else {
      enviarResultadosFinales(nuevasRespuestas)
    }
  }

  const usarPreguntaEstatica = (paso: number) => {
    const q = PREGUNTAS[paso - 1]
    if (q) {
      setCurrentQuestion({
        pregunta: q.texto,
        opciones: q.opciones.map(o => ({ id: o.id, texto: o.texto, valor: o.valor }))
      })
      setInsight('')
      setStep(paso)
    }
  }

  const enviarResultadosFinales = async (historial: any[]) => {
    setLoading(true)
    setStep(TOTAL_STEPS + 1)
    try {
      const res = await fetch(API_RECOMENDACIONES, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ respuestas: historial.map(r => ({ preguntaTexto: r.pregunta, opcionTexto: r.respuesta, valor: r.valor })) }),
      })
      const data = await res.json()
      setResultado(data.texto || data.recomendacion)
    } catch (err) {
      setError('Error al generar recomendaciones finales.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="app-main prueba-main animate-fade-in-up">
      {step > 0 && step <= TOTAL_STEPS && (
        <div className="prueba-progress">
          <div className="prueba-progress-bar" style={{ width: `${progress}%` }} />
        </div>
      )}

      {step === 0 && (
        <div className="prueba-step">
          <span className="prueba-step-num">Test IA Adaptativo</span>
          <h1 className="prueba-pregunta">Tu camino personalizado</h1>
          <p className="prueba-intro">
            A diferencia de un test normal, nuestra IA analizará tus respuestas para elegir la siguiente pregunta.
          </p>
          {isOnline ? (
            <p style={{ color: 'var(--color-primary)', fontSize: '0.9rem', fontWeight: 700 }}>✨ Conexión con Gemini activa: Test Personalizado habilitado.</p>
          ) : (
            <p style={{ color: 'var(--color-orange)', fontSize: '0.9rem' }}>⚠️ Modo Offline: Se usará el test estándar pre-cargado.</p>
          )}
          <button type="button" className="btn btn-block" style={{ marginTop: '2rem' }} onClick={handleSiguiente}>¡Empezar ahora!</button>
        </div>
      )}

      {step > 0 && step <= TOTAL_STEPS && currentQuestion && (
        <div className="prueba-step" key={step}>
          <p className="prueba-step-num">Paso {step} de {TOTAL_STEPS}</p>
          
          {insight && isOnline && (
            <div className="step" style={{ background: 'rgba(19, 236, 109, 0.05)', borderColor: 'var(--color-primary)', borderBottomWidth: '1px', padding: '1rem', marginBottom: '1.5rem' }}>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-primary-text)' }}>💡 {insight}</p>
            </div>
          )}

          <h2 className="prueba-pregunta">{currentQuestion.pregunta}</h2>
          
          <div className="prueba-opciones" style={{ pointerEvents: loading ? 'none' : 'auto' }}>
            {currentQuestion.opciones.map((opcion, idx) => (
              <button
                key={opcion.id}
                type="button"
                className={`prueba-opcion ${respuestaActual === opcion.valor ? 'prueba-opcion--active' : ''}`}
                onClick={() => setRespuestaActual(opcion.valor)}
              >
                <span className="material-symbols-outlined opcion-icon" style={{ fontSize: '2.5rem' }}>
                  {['psychology', 'rocket_launch', 'palette', 'school'][idx % 4]}
                </span>
                {opcion.texto}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="btn btn-block"
            onClick={handleSiguiente}
            disabled={!respuestaActual || loading}
          >
            {loading ? 'Pensando...' : step < TOTAL_STEPS ? 'Siguiente' : 'Ver Perfil Final'}
          </button>
        </div>
      )}

      {step > TOTAL_STEPS && (
        <div className="prueba-step prueba-resultado">
          <h1 className="page-heading">Tu Perfil Vocacional</h1>
          {loading ? (
             <div style={{ textAlign: 'center', padding: '3rem' }}>
               <span className="material-symbols-outlined opcion-icon animate-spin">history_edu</span>
               <p className="prueba-loading" style={{ marginTop: '1rem' }}>Generando tu mapa de vida...</p>
             </div>
          ) : error ? (
            <div className="form-error">{error}</div>
          ) : (
            <>
              <div className="prueba-texto-resultado">{resultado}</div>
              <MatchmakingEducativo recomendacionesIA={resultado} />
              <EthicalDisclaimer />
              <FeedbackForm />
              <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                <Link to="/empezar" className="btn btn-secondary">Ir al Inicio</Link>
              </div>
            </>
          )}
        </div>
      )}
    </main>
  )
}
