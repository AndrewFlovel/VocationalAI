import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function FeedbackForm() {
  const [satisfaction, setSatisfaction] = useState<number | null>(null)
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (satisfaction === null) {
      setError('Por favor selecciona un nivel de satisfacción.')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      const { error: dbError } = await supabase.from('feedback').insert([
        { satisfaction, comment, created_at: new Date() }
      ])

      if (dbError) throw dbError
      setIsSubmitted(true)
    } catch (err: any) {
      console.error('Error al enviar feedback:', err)
      setError('No se pudo enviar el feedback. Intenta de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="feedback-container feedback-success">
        <p>✅ ¡Gracias por tu opinión! Nos ayuda a mejorar para otros bachilleres.</p>
      </div>
    )
  }

  return (
    <div className="feedback-container">
      <h3>¿Qué te parecieron las recomendaciones?</h3>
      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="satisfaction-options">
          {[1, 2, 3, 4, 5].map((val) => (
            <button
              key={val}
              type="button"
              className={`satisfaction-btn ${satisfaction === val ? 'active' : ''}`}
              onClick={() => setSatisfaction(val)}
              title={`${val} de 5`}
            >
              {val === 1 ? '😞' : val === 2 ? '😕' : val === 3 ? '😐' : val === 4 ? '🙂' : '😃'}
            </button>
          ))}
        </div>
        
        <label className="form-label">
          ¿Algún comentario adicional? (opcional)
          <textarea
            className="form-input"
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Ej: Me gustaría que mostrasen más becas..."
          />
        </label>

        {error && <p className="form-error">{error}</p>}

        <button type="submit" className="btn btn-small" disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : 'Enviar opinión'}
        </button>
      </form>
    </div>
  )
}
