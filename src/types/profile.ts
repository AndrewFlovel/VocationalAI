export type TipoUnidadEducativa = 'fiscal' | 'privado' | ''

export interface Profile {
  id: string
  tipo_usuario: string
  municipio: string | null
  tipo_unidad_educativa: string | null
  created_at: string
  updated_at: string
}

export const MUNICIPIOS = [
  'Santa Cruz de la Sierra',
  'Montero',
  'Warnes',
] as const

export const TIPOS_UNIDAD: { value: TipoUnidadEducativa; label: string }[] = [
  { value: 'fiscal', label: 'Fiscal (público)' },
  { value: 'privado', label: 'Privado' },
]
