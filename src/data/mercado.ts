/**
 * Datos representativos del mercado laboral en Bolivia (Santa Cruz, Montero, Warnes).
 * Basado en tendencias generales de INE, CAINCO y SIE (2025-2026).
 */

export interface CarreraDemanda {
  nombre: CarreraNombre
  demanda: 'Alta' | 'Media' | 'Baja'
  sector: string
  descripcion: string
}

export type CarreraNombre = 
  | 'Ingeniería Agroindustrial'
  | 'Sistemas / Programación'
  | 'Medicina / Enfermería'
  | 'Administración / Finanzas'
  | 'Logística y Comercio'
  | 'Educación'

export const DEMANDA_LABORAL: CarreraDemanda[] = [
  {
    nombre: 'Ingeniería Agroindustrial',
    demanda: 'Alta',
    sector: 'Agroindustria',
    descripcion: 'Santa Cruz lidera la producción de soya, azúcar y lácteos. Se buscan expertos en procesos eficientes.'
  },
  {
    nombre: 'Sistemas / Programación',
    demanda: 'Alta',
    sector: 'Tecnología',
    descripcion: 'Alta demanda en desarrollo de software, ciberseguridad y servicios para empresas en Santa Cruz y Montero.'
  },
  {
    nombre: 'Logística y Comercio',
    demanda: 'Alta',
    sector: 'Servicios',
    descripcion: 'Eje Warnes-Montero es el pulmón logístico. El Parque Industrial y puertos secos requieren gestores de carga.'
  },
  {
    nombre: 'Medicina / Enfermería',
    demanda: 'Alta',
    sector: 'Salud',
    descripcion: 'Crecimiento poblacional en zonas periurbanas de Santa Cruz demanda personal de salud especializado.'
  },
  {
    nombre: 'Administración / Finanzas',
    demanda: 'Media',
    sector: 'Economía',
    descripcion: 'Sector bancario y de servicios empresariales estable en el centro urbano de Santa Cruz.'
  }
]

export const STATS_REGIONALES = {
  santa_cruz: {
    poblacion_bachiller: '40% del total nacional',
    crecimiento_industrial: '+4.5% anual',
    sector_fuente: 'CAINCO / INE'
  },
  montero_warnes: {
    enfoque: 'Logístico e Industrial',
    proyectos_clave: 'Parque Industrial Latinoamericano, Mutún (impacto indirecto)',
    sector_fuente: 'CADEX / SIE'
  }
}
