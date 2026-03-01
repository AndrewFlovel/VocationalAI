// Endpoint de diagnóstico: si responde 200, la carpeta api está desplegada en Vercel.
export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.status(200).json({ ok: true, message: 'API en Vercel activa' })
}
