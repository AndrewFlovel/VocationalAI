/**
 * Preguntas para la prueba de orientación vocacional.
 * Diseño sencillo tipo intereses/aptitudes para contexto boliviano (Santa Cruz, Montero, Warnes).
 */

export interface Opcion {
  id: string
  texto: string
  valor: string
}

export interface Pregunta {
  id: string
  texto: string
  opciones: Opcion[]
}

export const PREGUNTAS: Pregunta[] = [
  {
    id: 'actividad_preferida',
    texto: '¿En qué tipo de actividad te gustaría pasar más tiempo?',
    opciones: [
      { id: 'a', texto: 'Resolver problemas con números o datos', valor: 'analitico' },
      { id: 'b', texto: 'Crear cosas nuevas (diseño, arte, ideas)', valor: 'creativo' },
      { id: 'c', texto: 'Ayudar o atender a otras personas', valor: 'social' },
      { id: 'd', texto: 'Organizar, dirigir o emprender proyectos', valor: 'organizacion' },
      { id: 'e', texto: 'Trabajar con la naturaleza o con máquinas', valor: 'tecnico' },
    ],
  },
  {
    id: 'entorno_ideal',
    texto: '¿Dónde te imaginas trabajando dentro de unos años?',
    opciones: [
      { id: 'a', texto: 'Oficina o laboratorio', valor: 'oficina' },
      { id: 'b', texto: 'Campo, granja o industria', valor: 'campo_industria' },
      { id: 'c', texto: 'Consultorio, escuela u hospital', valor: 'servicios' },
      { id: 'd', texto: 'Mi propio negocio o emprendimiento', valor: 'emprendimiento' },
      { id: 'e', texto: 'En remoto, con tecnología', valor: 'tecnologia' },
    ],
  },
  {
    id: 'fortaleza',
    texto: '¿Qué se te da mejor o te gustaría desarrollar?',
    opciones: [
      { id: 'a', texto: 'Entender leyes, normas y argumentar', valor: 'leyes' },
      { id: 'b', texto: 'Matemáticas, programación o análisis', valor: 'stem' },
      { id: 'c', texto: 'Comunicación, idiomas o enseñanza', valor: 'comunicacion' },
      { id: 'd', texto: 'Salud, cuidado de personas o animales', valor: 'salud' },
      { id: 'e', texto: 'Ventas, negocios o finanzas', valor: 'negocios' },
    ],
  },
  {
    id: 'problema_resolver',
    texto: '¿Qué tipo de problema te gustaría ayudar a resolver?',
    opciones: [
      { id: 'a', texto: 'Mejorar la salud de las personas', valor: 'salud' },
      { id: 'b', texto: 'Optimizar procesos o usar tecnología', valor: 'tecnologia' },
      { id: 'c', texto: 'Educar o formar a otros', valor: 'educacion' },
      { id: 'd', texto: 'Producir alimentos o cuidar el medio ambiente', valor: 'agro_ambiente' },
      { id: 'e', texto: 'Crear empresas o generar empleo', valor: 'economia' },
    ],
  },
  {
    id: 'estilo_estudio',
    texto: '¿Cómo prefieres aprender?',
    opciones: [
      { id: 'a', texto: 'Leyendo y estudiando teoría', valor: 'teoria' },
      { id: 'b', texto: 'Practicando con ejercicios o proyectos', valor: 'practica' },
      { id: 'c', texto: 'Trabajando en equipo y debatiendo', valor: 'equipo' },
      { id: 'd', texto: 'Viendo resultados concretos (números, diseños)', valor: 'resultados' },
      { id: 'e', texto: 'En contacto con la realidad (visitas, prácticas)', valor: 'campo' },
    ],
  },
  {
    id: 'sector_interes',
    texto: '¿En qué sector te gustaría trabajar en Bolivia?',
    opciones: [
      { id: 'a', texto: 'Agroindustria, agricultura o ganadería', valor: 'agro' },
      { id: 'b', texto: 'Tecnología, sistemas o informática', valor: 'tech' },
      { id: 'c', texto: 'Salud o ciencias de la vida', valor: 'salud' },
      { id: 'd', texto: 'Educación o investigación', valor: 'educacion' },
      { id: 'e', texto: 'Comercio, servicios o administración', valor: 'servicios' },
    ],
  },
]
