import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

interface OfertaMatch {
  id: string
  nombre_carrera: string
  costo_mensual_estimado: number
  turno: string
  instituciones: {
    nombre: string
    sigla: string
    municipio: string
    tipo_gestion: string
    whatsapp_contacto: string
  }
}

interface Props {
  recomendacionesIA: string
}

export default function MatchmakingEducativo({ recomendacionesIA }: Props) {
  const [municipio, setMunicipio] = useState('Santa Cruz de la Sierra')
  const [presupuesto, setPresupuesto] = useState(0) // 0 = solo gratuitas/públicas
  const [matches, setMatches] = useState<OfertaMatch[]>([])
  const [loading, setLoading] = useState(false)

  // Extraer palabras clave de las recomendaciones de la IA para buscar en DB
  // Nota: Esto es un matchmaking simplificado basado en texto.
  const buscarMatches = async () => {
    setLoading(true)
    try {
      let query = supabase
        .from('oferta_academica')
        .select(`
          id,
          nombre_carrera,
          costo_mensual_estimado,
          turno,
          instituciones!inner (
            nombre,
            sigla,
            municipio,
            tipo_gestion,
            whatsapp_contacto
          )
        `)

      // Filtro de municipio (opcional pero recomendado)
      if (municipio) {
        query = query.eq('instituciones.municipio', municipio)
      }

      // Filtro de presupuesto
      if (presupuesto === 0) {
        query = query.eq('instituciones.tipo_gestion', 'pública')
      } else {
        query = query.lte('costo_mensual_estimado', presupuesto)
      }

      const { data, error } = await query

      if (error) throw error

      // Filtrado simple: vemos si el nombre de la carrera está mencionado en la IA
      // En una versión más pro, usaríamos IA para este mapeo
      const filtered = (data as any[] || []).filter(oferta => {
        const keywords = recomendacionesIA.toLowerCase()
        return keywords.includes(oferta.nombre_carrera.toLowerCase()) || 
               keywords.includes(oferta.instituciones.sigla.toLowerCase())
      })

      setMatches(filtered)
    } catch (err) {
      console.error('Error en matchmaking:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (recomendacionesIA) {
      buscarMatches()
    }
  }, [municipio, presupuesto])

  const registrarInteraccion = async (ofertaId: string) => {
    const { data: { user } } = await supabase.auth.getUser()
    await supabase.from('interacciones_contacto').insert([
      { oferta_id: ofertaId, user_id: user?.id }
    ])
  }

  const handleWhatsApp = (oferta: OfertaMatch) => {
    registrarInteraccion(oferta.id)
    const mensaje = encodeURIComponent(`Hola, vi su oferta de ${oferta.nombre_carrera} en la plataforma de Orientación Vocacional. Me gustaría recibir más información.`)
    window.open(`https://wa.me/${oferta.instituciones.whatsapp_contacto}?text=${mensaje}`, '_blank')
  }

  return (
    <div className="matchmaking-section">
      <h2 className="page-heading">Encuentra dónde estudiar</h2>
      
      <div className="matchmaking-filters auth-card" style={{ maxWidth: '100%', marginBottom: '2rem' }}>
        <p className="auth-subtitle">Ajusta tus preferencias logísticas para ver opciones reales:</p>
        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          <label className="form-label">
            Municipio de preferencia
            <select className="form-input" value={municipio} onChange={(e) => setMunicipio(e.target.value)}>
              <option value="Santa Cruz de la Sierra">Santa Cruz de la Sierra</option>
              <option value="Montero">Montero</option>
              <option value="Warnes">Warnes</option>
            </select>
          </label>
          
          <label className="form-label">
            Presupuesto mensual (Bs)
            <select className="form-input" value={presupuesto} onChange={(e) => setPresupuesto(Number(e.target.value))}>
              <option value={0}>Solo Educación Pública (Gratuita)</option>
              <option value={500}>Hasta 500 Bs</option>
              <option value={1000}>Hasta 1,000 Bs</option>
              <option value={2000}>Hasta 2,000 Bs</option>
              <option value={10000}>Sin límite</option>
            </select>
          </label>
        </div>
      </div>

      {loading ? (
        <p className="auth-subtitle">Buscando instituciones que coincidan con tu perfil...</p>
      ) : matches.length > 0 ? (
        <div className="match-cards">
          {matches.map((match) => (
            <div key={match.id} className="match-card step">
              <div className="match-card-header">
                <span className="match-badge">{match.instituciones.tipo_gestion}</span>
                <h3 className="match-title">{match.nombre_carrera}</h3>
                <p className="match-inst">{match.instituciones.nombre} ({match.instituciones.sigla})</p>
              </div>
              <div className="match-details">
                <p>📍 {match.instituciones.municipio}</p>
                <p>🕒 Turno: {match.turno}</p>
                <p>💰 Costo: {match.costo_mensual_estimado > 0 ? `${match.costo_mensual_estimado} Bs/mes` : 'Gratuito'}</p>
              </div>
              <button 
                className="btn btn-small btn-block" 
                style={{ background: '#25D366', marginTop: '1rem' }}
                onClick={() => handleWhatsApp(match)}
              >
                Contactar por WhatsApp
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="form-error" style={{ background: '#fff' }}>
          No encontramos ofertas exactas en {municipio} con ese presupuesto para las carreras sugeridas. Intenta ampliar tu búsqueda o presupuesto.
        </div>
      )}
    </div>
  )
}
