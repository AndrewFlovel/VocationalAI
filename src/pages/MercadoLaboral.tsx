import { Link } from 'react-router-dom'
import { DEMANDA_LABORAL, STATS_REGIONALES } from '../data/mercado'

export default function MercadoLaboral() {
  return (
    <main className="app-main">
      <h1 className="page-heading">Datos del mercado laboral — Bolivia</h1>
      <p className="auth-subtitle">
        Basado en tendencias regionales (INE, CAINCO, SIE). Estos datos te ayudan a ver qué sectores están creciendo en el eje Santa Cruz - Montero - Warnes.
      </p>

      <section className="mercado-section" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Sectores de alta demanda</h2>
        <div className="steps">
          {DEMANDA_LABORAL.map((item) => (
            <div key={item.nombre} className="step" style={{ borderLeft: item.demanda === 'Alta' ? '4px solid #0d6b4c' : '1px solid #e0e0e0' }}>
              <strong>{item.nombre} <span style={{ fontSize: '0.75rem', padding: '2px 6px', background: '#e8f5e9', borderRadius: '4px', marginLeft: '8px' }}>Demanda {item.demanda}</span></strong>
              <p style={{ fontSize: '0.9rem', color: '#5c5c5c', margin: '4px 0 0' }}>{item.descripcion}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mercado-section">
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Indicadores regionales</h2>
        <div className="auth-card" style={{ maxWidth: '100%', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Santa Cruz (Cuna Industrial)</h3>
          <ul style={{ paddingLeft: '1.25rem', color: '#5c5c5c' }}>
            <li>Bachilleres: {STATS_REGIONALES.santa_cruz.poblacion_bachiller}</li>
            <li>Crecimiento industrial: {STATS_REGIONALES.santa_cruz.crecimiento_industrial}</li>
            <li style={{ fontSize: '0.75rem', marginTop: '4px' }}>Fuente: {STATS_REGIONALES.santa_cruz.sector_fuente}</li>
          </ul>
        </div>
        
        <div className="auth-card" style={{ maxWidth: '100%' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Eje Montero-Warnes</h3>
          <ul style={{ paddingLeft: '1.25rem', color: '#5c5c5c' }}>
            <li>Enfoque: {STATS_REGIONALES.montero_warnes.enfoque}</li>
            <li>Proyectos: {STATS_REGIONALES.montero_warnes.proyectos_clave}</li>
            <li style={{ fontSize: '0.75rem', marginTop: '4px' }}>Fuente: {STATS_REGIONALES.montero_warnes.sector_fuente}</li>
          </ul>
        </div>
      </section>

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <Link to="/empezar" className="btn">Regresar</Link>
      </div>
    </main>
  )
}
