# Orientación vocacional — Bolivia

Plataforma de orientación vocacional para bachilleres de Santa Cruz, Montero y Warnes. Ayuda a reducir la crisis vocacional y la deserción universitaria con pruebas gamificadas e información del mercado laboral (datos INE, SIE, cámaras empresariales).

**Stack:** React · Vite · TypeScript · Supabase · Gemini API · Vercel

## Requisitos

- Node.js 18+
- npm o pnpm

## Cómo ejecutar el proyecto

### 1. Clonar e instalar

```bash
git clone <url-del-repositorio>
cd orientacion-vocacional-bolivia
npm install
```

### 2. Configurar variables de entorno (Supabase)

Copia el archivo de ejemplo y define tus variables:

```bash
cp .env.example .env
```

Edita `.env` y reemplaza con los datos de tu proyecto en [Supabase](https://app.supabase.com):

- `VITE_SUPABASE_URL`: URL del proyecto (ej. `https://xxxx.supabase.co`)
- `VITE_SUPABASE_ANON_KEY`: clave anónima pública (Project Settings → API)

- `GEMINI_API_KEY`: para la API de recomendaciones (obtener en [Google AI Studio](https://aistudio.google.com/app/apikey)). Añádela en **Vercel** → Settings → Environment Variables (no en el frontend).

La app arranca sin Supabase; para la prueba vocacional con IA necesitas desplegar y configurar `GEMINI_API_KEY` en Vercel.

### 3. Desarrollo

```bash
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en el navegador.

### 4. Build para producción

```bash
npm run build
```

La salida queda en `dist/`. Para previsualizar:

```bash
npm run preview
```

## Despliegue en Vercel

1. Conecta el repositorio en [Vercel](https://vercel.com).
2. En el proyecto, ve a **Settings → Environment Variables** y añade:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `GEMINI_API_KEY` (clave de [Google AI Studio](https://aistudio.google.com/app/apikey) para las recomendaciones de la prueba vocacional)
3. Deploy: Vercel usará `npm run build` y servirá la API en `/api/recomendaciones`.

## Configuración de Supabase (Base de Datos)

Ejecuta los archivos SQL en el **SQL Editor** de tu proyecto en [Supabase](https://app.supabase.com):

1. `supabase/migrations/001_profiles.sql`: Tablas de perfiles de usuario y políticas RLS.
2. `supabase/migrations/002_feedback.sql`: Tabla para el sistema de retroalimentación.

## Estructura del proyecto

```
src/
  components/   # Componentes reutilizables
  pages/        # Páginas (Bienvenida, Empezar, …)
  lib/          # Cliente Supabase y utilidades
  hooks/        # Hooks de React
  styles/       # CSS global
```

## Plan de desarrollo

Ver [PLAN_ORIENTACION_VOCACIONAL_BOLIVIA.md](./PLAN_ORIENTACION_VOCACIONAL_BOLIVIA.md) para los 5 sprints y criterios de completitud.

## Licencia

Proyecto con fines educativos y de impacto social en Bolivia.
