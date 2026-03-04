export interface Carrera {
  nombre: string
  area: string
  turno: string[]
  costo_mensual: number
  duracion_anios: number
}

export interface Institucion {
  id: string
  nombre: string
  sigla: string
  tipo: 'pública' | 'privada' | 'convenio'
  municipio: 'Santa Cruz de la Sierra' | 'Montero' | 'Warnes'
  whatsapp: string
  web?: string
  carreras: Carrera[]
}

export const INSTITUCIONES: Institucion[] = [
  {
    id: 'uagrm-scz',
    nombre: 'Universidad Autónoma Gabriel René Moreno',
    sigla: 'UAGRM',
    tipo: 'pública',
    municipio: 'Santa Cruz de la Sierra',
    whatsapp: '59176000000',
    web: 'https://www.uagrm.edu.bo',
    carreras: [
      { nombre: 'Medicina', area: 'Salud', turno: ['mañana', 'tarde'], costo_mensual: 0, duracion_anios: 6 },
      { nombre: 'Ingeniería de Sistemas', area: 'Ingeniería', turno: ['mañana', 'tarde', 'noche'], costo_mensual: 0, duracion_anios: 5 },
      { nombre: 'Derecho', area: 'Social', turno: ['mañana', 'tarde', 'noche'], costo_mensual: 0, duracion_anios: 5 },
      { nombre: 'Administración de Empresas', area: 'Empresarial', turno: ['mañana', 'tarde', 'noche'], costo_mensual: 0, duracion_anios: 5 },
      { nombre: 'Arquitectura', area: 'Diseño', turno: ['mañana', 'tarde'], costo_mensual: 0, duracion_anios: 5 }
    ]
  },
  {
    id: 'uagrm-montero',
    nombre: 'Facultad Integral del Norte',
    sigla: 'FINOR (UAGRM)',
    tipo: 'pública',
    municipio: 'Montero',
    whatsapp: '59178000000',
    carreras: [
      { nombre: 'Enfermería', area: 'Salud', turno: ['mañana', 'tarde'], costo_mensual: 0, duracion_anios: 4 },
      { nombre: 'Ingeniería Industrial', area: 'Ingeniería', turno: ['tarde', 'noche'], costo_mensual: 0, duracion_anios: 5 },
      { nombre: 'Veterinaria', area: 'Salud', turno: ['mañana', 'tarde'], costo_mensual: 0, duracion_anios: 5 },
      { nombre: 'Contaduría Pública', area: 'Empresarial', turno: ['mañana', 'tarde', 'noche'], costo_mensual: 0, duracion_anios: 5 }
    ]
  },
  {
    id: 'upsa-scz',
    nombre: 'Universidad Privada de Santa Cruz de la Sierra',
    sigla: 'UPSA',
    tipo: 'privada',
    municipio: 'Santa Cruz de la Sierra',
    whatsapp: '59177000000',
    web: 'https://www.upsa.edu.bo',
    carreras: [
      { nombre: 'Ingeniería Civil', area: 'Ingeniería', turno: ['mañana', 'tarde'], costo_mensual: 3600, duracion_anios: 5 },
      { nombre: 'Diseño Gráfico', area: 'Diseño', turno: ['mañana', 'tarde'], costo_mensual: 3200, duracion_anios: 4 },
      { nombre: 'Marketing y Publicidad', area: 'Empresarial', turno: ['mañana', 'tarde'], costo_mensual: 3400, duracion_anios: 4 }
    ]
  },
  {
    id: 'utepsa-scz',
    nombre: 'Universidad Tecnológica Privada de Santa Cruz',
    sigla: 'UTEPSA',
    tipo: 'privada',
    municipio: 'Santa Cruz de la Sierra',
    whatsapp: '59175000000',
    carreras: [
      { nombre: 'Ingeniería Mecánica', area: 'Ingeniería', turno: ['tarde', 'noche'], costo_mensual: 1600, duracion_anios: 5 },
      { nombre: 'Psicología', area: 'Social', turno: ['mañana', 'noche'], costo_mensual: 1400, duracion_anios: 5 },
      { nombre: 'Comercio Internacional', area: 'Empresarial', turno: ['tarde', 'noche'], costo_mensual: 1500, duracion_anios: 4 }
    ]
  },
  {
    id: 'upds-montero',
    nombre: 'Universidad Privada Domingo Savio',
    sigla: 'UPDS',
    tipo: 'privada',
    municipio: 'Montero',
    whatsapp: '59171000000',
    carreras: [
      { nombre: 'Derecho', area: 'Social', turno: ['mañana', 'noche'], costo_mensual: 1100, duracion_anios: 5 },
      { nombre: 'Ingeniería de Sistemas', area: 'Ingeniería', turno: ['noche'], costo_mensual: 1250, duracion_anios: 5 },
      { nombre: 'Gestión Turística', area: 'Social', turno: ['mañana'], costo_mensual: 1050, duracion_anios: 4 }
    ]
  },
  {
    id: 'usb-montero',
    nombre: 'Universidad Salesiana de Bolivia (Muyurina)',
    sigla: 'USB',
    tipo: 'privada',
    municipio: 'Montero',
    whatsapp: '59173000000',
    carreras: [
      { nombre: 'Gastronomía', area: 'Técnica', turno: ['mañana', 'tarde'], costo_mensual: 1400, duracion_anios: 4 },
      { nombre: 'Ciencias de la Educación', area: 'Social', turno: ['tarde'], costo_mensual: 950, duracion_anios: 5 }
    ]
  }
]
