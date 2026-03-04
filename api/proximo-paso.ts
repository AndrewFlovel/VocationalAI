import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export const config = {
  runtime: 'edge',
}

export default async function handler(req: Request) {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 })

  try {
    const { historial, pasoActual, totalPasos } = await req.json()
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }) // O gemini-2.0-flash-lite si está disponible

    const prompt = `
      Eres un orientador vocacional experto en el mercado laboral de Bolivia (Santa Cruz, Montero, Warnes).
      Tu objetivo es generar la PRÓXIMA pregunta de un test dinámico.
      
      HISTORIAL DE RESPUESTAS:
      ${JSON.stringify(historial)}
      
      REGLAS:
      1. La pregunta debe ayudar a discriminar entre áreas de interés basadas en las respuestas anteriores.
      2. Usa un lenguaje motivador y cercano para jóvenes de 17-19 años.
      3. Proporciona exactamente 4 opciones de respuesta claras.
      4. Menciona o contextualiza la pregunta con elementos locales si es posible (agroindustria, tecnología en la ciudad, servicios, etc.).
      5. Responde ÚNICAMENTE en formato JSON con esta estructura:
         {
           "pregunta": "¿Texto de la pregunta?",
           "opciones": [
             {"id": "a", "texto": "Opción 1", "valor": "valor_tecnico_1"},
             {"id": "b", "texto": "Opción 2", "valor": "valor_tecnico_2"},
             {"id": "c", "texto": "Opción 3", "valor": "valor_tecnico_3"},
             {"id": "d", "texto": "Opción 4", "valor": "valor_tecnico_4"}
           ],
           "insight": "Un micro-comentario sobre su respuesta anterior (ej: Veo que te atrae el liderazgo...)"
         }

      Paso actual: ${pasoActual} de ${totalPasos}.
    `

    const result = await model.generateContent(prompt)
    const text = result.response.text()
    const cleanJson = text.replace(/```json|```/g, '').trim()
    
    return new Response(cleanJson, {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error en IA Adaptativa:', error)
    return new Response(JSON.stringify({ error: 'Falla en generación' }), { status: 500 })
  }
}
