import type { VercelRequest, VercelResponse } from '@vercel/node'
import { GoogleGenAI } from '@google/genai'

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

  const resumen = respuestas
    .map((r) => `- ${r.preguntaTexto}\n  Respuesta: ${r.opcionTexto} (${r.valor})`)
    .join('\n')

  const prompt = `Eres un orientador vocacional para jóvenes de Bolivia (Santa Cruz de la Sierra, Montero, Warnes). 
Genera recomendaciones de carreras o áreas de estudio basadas en las respuestas del estudiante y el contexto laboral real de la región.

DATOS DEL MERCADO LABORAL BOLIVIANO (Contexto):
- Santa Cruz: Liderazgo en Agroindustria (soya, azúcar, lácteos) y crecimiento industrial (+4.5% anual).
- Eje Montero-Warnes: Centro logístico e industrial masivo (Parque Industrial Latinoamericano). Alta demanda en logística, transporte y gestión de carga.
- Tecnología: Crecimiento alto en servicios de software y ciberseguridad para empresas locales.
- Salud: Gran demanda en zonas periurbanas por crecimiento poblacional.

RESPUESTAS DEL ESTUDIANTE:
${resumen}

INSTRUCCIONES:
1. Sugiere 3-5 carreras que encajen con sus respuestas.
2. Prioriza carreras con alta demanda en la región si coinciden con sus intereses.
3. Para cada sugerencia incluye: nombre, por qué encaja, y menciona su relevancia en el mercado boliviano (ej. demanda en Santa Cruz, agro, logística, etc.).
4. Escribe en español, tono claro, profesional y motivador.
5. Usa párrafos cortos o viñetas simples.`

  // Modelos prioritarios para el usuario (Marzo 2026).
  const modelNames = [
    'gemini-2.5-flash',
    'gemini-2.0-flash',
    'gemini-1.5-flash',
    'gemini-1.5-pro'
  ]

  try {
    console.log('--- EJECUTANDO API v1.3 (Modelo 2.5) ---')
    const ai = new GoogleGenAI({ 
      apiKey: apiKey.trim(),
      apiVersion: 'v1'
    })
    let lastErr: any = null

    for (const modelName of modelNames) {
      try {
        console.log(`Intentando con modelo: ${modelName}`)
        const response = await ai.models.generateContent({
          model: modelName,
          contents: [{ role: 'user', parts: [{ text: prompt }] }]
        })
        
        // Verificamos si hay candidatos antes de acceder a .text
        if (response.candidates && response.candidates.length > 0) {
          const texto = response.text?.trim()
          if (texto) {
            console.log(`Éxito con modelo: ${modelName}`)
            res.setHeader('X-API-Version', '1.3')
            return res.status(200).json({ texto, version: '1.3' })
          }
        }
        console.warn(`Modelo ${modelName} no devolvió candidatos o texto.`)
      } catch (e: any) {
        lastErr = e
        const msg = (e?.message || String(e)).toLowerCase()
        console.error(`Error con modelo ${modelName}:`, msg)
        
        // 404 = modelo no existe, 400 = mala petición, 429 = cuota, 503 = sobrecarga
        if (
          msg.includes('404') || msg.includes('not found') || 
          msg.includes('400') || msg.includes('429') || 
          msg.includes('503') || msg.includes('unavailable')
        ) {
          continue
        }
        throw e
      }
    }

    if (lastErr) throw lastErr
    throw new Error('No se pudo generar contenido con ningún modelo disponible.')
  } catch (err: any) {
    const raw = err?.message || String(err)
    console.error('Gemini Catch Final:', raw)
    const message =
      raw.includes('API key') || raw.includes('401') || raw.includes('403')
        ? 'Clave de API de Gemini inválida o sin permisos. Revisa GEMINI_API_KEY en Vercel (Google AI Studio).'
        : raw.includes('429') || raw.includes('quota')
          ? 'Límite de uso de la API alcanzado. Prueba más tarde.'
          : raw
    return res.status(500).json({
      error: message,
      texto: `No se pudieron generar recomendaciones en este momento. (${message})`,
    })
  }
}
