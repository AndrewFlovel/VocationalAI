# Errores al ver recomendaciones (404 o "Failed to fetch")

- **Error 404:** la petición a `/api/recomendaciones` no llega a la función.
- **Failed to fetch:** suele ser petición directa a otro dominio (CORS) o que el proxy no está activo. La app ya usa **ruta relativa** y proxy en local; asegúrate de tener `VITE_API_BASE_URL` en `.env` y de **reiniciar** `npm run dev` después de tocar `.env`.

## Si estás en **local** (`npm run dev`)

En local no hay servidor que responda en `/api/recomendaciones`. Tienes dos opciones:

### Opción A: Usar la API desplegada en Vercel (recomendado)

1. Despliega el proyecto en Vercel (si no lo has hecho).
2. En la raíz del proyecto crea o edita `.env` y añade la URL de tu app en Vercel (sin barra final):
   ```env
   VITE_API_BASE_URL=https://tu-proyecto.vercel.app
   ```
   (Reemplaza por la URL real de tu proyecto en Vercel.)
3. **Reinicia** el servidor de desarrollo (**Ctrl+C** y luego `npm run dev`). Si no reinicias, el proxy no se activa.
4. Vuelve a hacer la prueba. Las peticiones a `/api/recomendaciones` las reenvía Vite a tu Vercel (mismo origen en el navegador, sin problemas de CORS).

### Opción B: Probar todo en local con Vercel

En la raíz del proyecto:

```bash
npx vercel dev
```

Asegúrate de tener en `.env` la variable `GEMINI_API_KEY`. Con `vercel dev`, tanto el frontend como la función `/api/recomendaciones` se ejecutan en tu máquina.

---

## Si estás en **Vercel** (app ya desplegada)

1. **Prueba si la carpeta `api` está desplegada**  
   Abre en el navegador: **`https://tu-proyecto.vercel.app/api/health`**  
   - Si responde `{"ok":true,"message":"API en Vercel activa"}` → la carpeta `api` funciona. El 404 puede ser solo de `/api/recomendaciones` (p. ej. TypeScript o dependencias).  
   - Si también da 404 → en Vercel ve a **Settings → General** y revisa **Root Directory**. Debe estar vacío (o que la carpeta `api` esté dentro de esa ruta). Haz push de los últimos cambios (incluido `api/health.js` y `vercel.json`) y **Redeploy**.

2. **Revisa las variables de entorno**  
   En el proyecto de Vercel: **Settings → Environment Variables**. Debe existir `GEMINI_API_KEY`. Sin ella `/api/recomendaciones` puede devolver 502; si ni siquiera existe la ruta, verás 404.

3. **Comprueba que la función existe en el repo**  
   En la raíz del proyecto debe haber la carpeta `api` con `recomendaciones.ts` y `health.js`. Si falta o está en otra ruta, Vercel no desplegará la función.

4. **Vuelve a desplegar**  
   Después de tocar `vercel.json`, `api/` o variables de entorno: push a la rama o **Redeploy** en Vercel.

5. **Prueba la API de recomendaciones directamente**  
   - URL: `https://tu-proyecto.vercel.app/api/recomendaciones`  
   - Método: **POST**  
   - Body (JSON): `{"respuestas":[{"preguntaId":"test","preguntaTexto":"Test","valor":"x","opcionTexto":"Test"}]}`  

   Si aquí recibes 404, la función no está desplegada. Si recibes 502, falta `GEMINI_API_KEY`.
