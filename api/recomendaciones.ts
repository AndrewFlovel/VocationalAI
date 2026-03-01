import type { VercelRequest, VercelResponse } from '@vercel/node'
import { GoogleGenerativeAI } from '@google/generative-ai'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

interface Respuesta {
  preguntaId: string
  preguntaTexto: string
  valor: string
  opcionTexto: string
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(204).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' })
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return res.status(502).json({
      error: 'API no configurada',
      texto: 'Falta configurar GEMINI_API_KEY en el servidor. Contacta al administrador.',
    })
  }

  const body = req.body as { respuestas?: Respuesta[] }
  const respuestas: Respuesta[] = Array.isArray(body?.respuestas) ? body.respuestas : []

  if (respuestas.length === 0) {
    return res.status(400).json({ error: 'Se necesitan respuestas para generar recomendaciones' })
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const resumen = respuestas
      .map((r) => `- ${r.preguntaTexto}\n  Respuesta: ${r.opcionTexto} (${r.valor})`)
      .join('\n')

    const prompt = `Eres un orientador vocacional para jóvenes de Bolivia (Santa Cruz de la Sierra, Montero, Warnes). 
Basándote SOLO en las siguientes respuestas de un estudiante de bachillerato, genera recomendaciones de carreras o áreas de estudio.

Contexto: El estudiante está en último año de bachillerato y busca orientación. Considera carreras disponibles en universidades bolivianas y el mercado laboral regional (agroindustria, tecnología, salud, educación, servicios).

Respuestas del estudiante:
${resumen}

Instrucciones:
1. Sugiere entre 3 y 5 carreras o áreas de estudio que encajen con sus respuestas.
2. Para cada una: nombre de la carrera/área, una oración breve de por qué encaja, y si aplica una mención al sector en Bolivia (ej. demanda en Santa Cruz, agro, etc.).
3. Escribe en español, de forma clara y animadora.
4. No inventes respuestas que el estudiante no dio; basa todo en lo que eligió.
5. No incluyas títulos como "Recomendaciones" ni listas numeradas largas; usa párrafos cortos o viñetas simples.`

    const result = await model.generateContent(prompt)
    const response = result.response
    const texto = response.text()?.trim() ?? 'No se pudo generar el texto.'

    return res.status(200).json({ texto })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error al generar recomendaciones'
    return res.status(500).json({
      error: message,
      texto: `No se pudieron generar recomendaciones en este momento. (${message})`,
    })
  }
}
