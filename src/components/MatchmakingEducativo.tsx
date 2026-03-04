import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { INSTITUCIONES, Institucion, Carrera } from '../data/instituciones'

interface OfertaMatch {
  id: string
  nombre_carrera: string
  costo_mensual_estimado: number
  turno: string
  institucion_nombre: string
  institucion_sigla: string
  municipio: string
  tipo_gestion: string
  whatsapp_contacto: string
}

interface Props {
  recomendacionesIA: string
}

export default function MatchmakingEducativo({ recomendacionesIA }: Props) {
  const [municipio, setMunicipio] = useState('Santa Cruz de la Sierra')
  const [presupuesto, setPresupuesto] = useState(0)
  const [matches, setMatches] = useState<OfertaMatch[]>([])
  const [loading, setLoading] = useState(false)
  const [isOffline, setIsOffline] = useState(!navigator.onLine)

  useEffect(() => {
    const handleStatus = () => setIsOffline(!navigator.onLine)
    window.addEventListener('online', handleStatus)
    window.addEventListener('offline', handleStatus)
    return () => {
      window.removeEventListener('online', handleStatus)
      window.removeEventListener('offline', handleStatus)
    }
  }, [])

  const buscarMatches = async () => {
    setLoading(true)
    
    // Si estamos offline o preferimos datos estáticos para velocidad
    if (isOffline) {
      const results: OfertaMatch[] = []
      INSTITUCIONES.forEach(inst => {
        if (inst.municipio === municipio) {
          inst.carreras.forEach(carrera => {
            const matchesIA = recomendacionesIA.toLowerCase().includes(carrera.nombre.toLowerCase())
            const cumplePresupuesto = presupuesto === 0 
              ? inst.tipo === 'pública' 
              : carrera.costo_mensual <= presupuesto

            if (matchesIA && cumplePresupuesto) {
              results.push({
                id: `${inst.id}-${carrera.nombre}`,
                nombre_carrera: carrera.nombre,
                costo_mensual_estimado: carrera.costo_mensual,
                turno: carrera.turno.join(', '),
                institucion_nombre: inst.nombre,
                institucion_sigla: inst.sigla,
                municipio: inst.municipio,
                tipo_gestion: inst.tipo,
                whatsapp_contacto: inst.whatsapp
              })
            }
          })
        }
      })
      setMatches(results)
      setLoading(false)
      return
    }

    // Lógica Online (Supabase)
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
        .eq('instituciones.municipio', municipio)

      if (presupuesto === 0) {
        query = query.eq('instituciones.tipo_gestion', 'pública')
      } else {
        query = query.lte('costo_mensual_estimado', presupuesto)
      }

      const { data, error } = await query
      if (error) throw error

      const filtered = (data as any[] || []).filter(oferta => 
        recomendacionesIA.toLowerCase().includes(oferta.nombre_carrera.toLowerCase())
      ).map(o => ({
        id: o.id,
        nombre_carrera: o.nombre_carrera,
        costo_mensual_estimado: o.costo_mensual_estimado,
        turno: o.turno,
        institucion_nombre: o.instituciones.nombre,
        institucion_sigla: o.instituciones.sigla,
        municipio: o.instituciones.municipio,
        tipo_gestion: o.instituciones.tipo_gestion,
        whatsapp_contacto: o.instituciones.whatsapp_contacto
      }))

      setMatches(filtered)
    } catch (err) {
      console.error('Error en matchmaking online, usando fallback local:', err)
      setIsOffline(true) // Forzar modo local si falla la API
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (recomendacionesIA) {
      buscarMatches()
    }
  }, [municipio, presupuesto, isOffline])

  const handleWhatsApp = (oferta: OfertaMatch) => {
    const mensaje = encodeURIComponent(`Hola, vi su oferta de ${oferta.nombre_carrera} en la plataforma de Orientación Vocacional. Me gustaría recibir más información.`)
    window.open(`https://wa.me/${oferta.whatsapp_contacto}?text=${mensaje}`, '_blank')
  }

  return (
    <div className="matchmaking-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 className="page-heading" style={{ margin: 0 }}>Encuentra dónde estudiar</h2>
        {isOffline && <span className="app-lang" style={{ color: 'var(--color-orange)' }}>⚡ Modo Offline</span>}
      </div>
      
      <div className="matchmaking-filters auth-card" style={{ maxWidth: '100%', marginBottom: '2rem' }}>
        <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          <label className="form-label">
            📍 ¿Dónde quieres estudiar?
            <select className="form-input" value={municipio} onChange={(e) => setMunicipio(e.target.value as any)}>
              <option value="Santa Cruz de la Sierra">Santa Cruz de la Sierra</option>
              <option value="Montero">Montero</option>
              <option value="Warnes">Warnes</option>
            </select>
          </label>
          
          <label className="form-label">
            💰 Presupuesto Mensual
            <select className="form-input" value={presupuesto} onChange={(e) => setPresupuesto(Number(e.target.value))}>
              <option value={0}>Solo Pública (Gratuita)</option>
              <option value={1500}>Hasta 1,500 Bs</option>
              <option value={2500}>Hasta 2,500 Bs</option>
              <option value={10000}>Más de 2,500 Bs</option>
            </select>
          </label>
        </div>
      </div>

      {loading ? (
        <p className="auth-subtitle animate-fade-in-up">Buscando las mejores opciones para ti...</p>
      ) : matches.length > 0 ? (
        <div className="match-cards">
          {matches.map((match) => (
            <div key={match.id} className="match-card animate-fade-in-up">
              <div className="match-card-header">
                <span className="match-badge">{match.tipo_gestion}</span>
                <h3 className="match-title">{match.nombre_carrera}</h3>
                <p className="match-inst">{match.institucion_sigla}</p>
              </div>
              <div className="match-details">
                <p>📍 {match.municipio}</p>
                <p>🕒 {match.turno}</p>
                <p>💵 {match.costo_mensual_estimado > 0 ? `${match.costo_mensual_estimado} Bs/mes` : 'Gratuito'}</p>
              </div>
              <button 
                className="btn btn-small btn-block" 
                style={{ background: '#25D366', marginTop: '1rem', color: 'white' }}
                onClick={() => handleWhatsApp(match)}
              >
                Contactar WhatsApp
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="step" style={{ textAlign: 'center', background: 'transparent' }}>
          <p className="auth-subtitle">No encontramos ofertas exactas con estos filtros. Prueba cambiando el presupuesto o el municipio.</p>
        </div>
      )}
    </div>
  )
}
