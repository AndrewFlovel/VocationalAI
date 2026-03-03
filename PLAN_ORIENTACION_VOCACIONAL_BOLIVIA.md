# Plan de desarrollo: Plataforma de Orientación Vocacional para Bachilleres (Bolivia)

## Resumen del proyecto
Solución con IA multimodal (Gemini) para reducir la crisis vocacional y deserción en bachilleres de Santa Cruz, Montero y Warnes, mediante orientación basada en datos públicos (INE, SIE, cámaras empresariales, ITC) y pruebas gamificadas.

**Stack:** React · Gemini API · Supabase · Vercel  
**Usuarios:** Estudiantes 17–19 años, último año de bachillerato (fiscal/privado), con foco en zonas periurbanas/rurales.

---

## Sprint 1 — Fundamentos del proyecto y experiencia base

### Objetivo del sprint
Tener un proyecto React desplegado en Vercel, con Supabase configurado y una interfaz en español simple e intuitiva que permita a un estudiante “entrar” a la plataforma, ver una pantalla de bienvenida y entender en un vistazo qué hace la app (orientación vocacional sin necesidad de registrarse aún).

### Lista de tareas específicas

1. **Inicializar proyecto React**
   - Crear app con Vite + React + TypeScript.
   - Configurar ESLint y estructura de carpetas (`components`, `pages`, `hooks`, `lib`, `styles`).

2. **Configurar Supabase**
   - Crear proyecto en Supabase (si no existe).
   - Añadir variables de entorno para `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`.
   - Crear cliente Supabase en `lib/supabase.ts` y usarlo desde la app.

3. **Configurar Vercel**
   - Conectar el repositorio con Vercel (o subir el proyecto).
   - Definir las variables de entorno en Vercel para Supabase.
   - Asegurar que el build (`npm run build`) y el despliegue funcionen.

4. **Diseño y accesibilidad**
   - Elegir una tipografía legible y un esquema de colores claro (accesible).
   - Implementar una página de bienvenida en español con:
     - Título claro: ej. “Orientación vocacional para tu futuro”.
     - 2–3 frases que expliquen el propósito (ayudar a elegir carrera, reducir abandono).
     - Un botón o enlace tipo “Comenzar” que lleve a una pantalla siguiente (por ejemplo “¿Qué haremos?” con pasos muy simples).

5. **Navegación mínima**
   - Usar React Router con al menos dos rutas: `/` (bienvenida) y `/empezar` (o similar).
   - Incluir un header o barra simple con el nombre de la app y, si aplica, idioma (español).

6. **Documentación del sprint**
   - Actualizar un `README.md` con: qué es el proyecto, cómo clonar, cómo configurar `.env` con Supabase y cómo ejecutar `npm install` y `npm run dev`.

### Primer prompt exacto para empezar el Sprint 1

```
Necesito iniciar el Sprint 1 de mi proyecto de orientación vocacional para bachilleres en Bolivia.

Contexto: es una app React que usará después Supabase y Gemini; por ahora solo fundamentos.

Por favor:
1. Crea un proyecto React con Vite y TypeScript en la carpeta actual.
2. Configura la estructura de carpetas: src/components, src/pages, src/lib, src/hooks, src/styles.
3. Crea un cliente de Supabase en src/lib/supabase.ts que lea VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY (sin implementar login aún).
4. Instala y configura React Router con dos rutas: "/" (página de bienvenida) y "/empezar" (página "¿Qué haremos?").
5. La página de bienvenida debe estar en español, con un título como "Orientación vocacional para tu futuro", un texto corto que explique que la app ayuda a bachilleres a elegir carrera con información del mercado laboral y pruebas adaptadas, y un botón "Comenzar" que navegue a /empezar.
6. La página /empezar debe listar 3 pasos simples (ej: Conocer tus intereses, Explorar carreras, Ver recomendaciones) en texto claro.
7. Usa CSS o un enfoque simple (sin librería UI por ahora) para que la interfaz sea limpia, legible y con buena jerarquía visual; que funcione bien en móvil (viewport responsive).
8. Añade un README.md con instrucciones: clonar, crear .env con las variables de Supabase, npm install, npm run dev y npm run build.
9. Crea un archivo .env.example con VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY para que otros desarrolladores sepan qué variables configurar.
```

### Cómo saber que el Sprint 1 está completo

- [ ] El proyecto arranca con `npm run build` y `npm run dev` sin errores.
- [ ] Existe `.env.example` y el README explica la configuración de Supabase.
- [ ] Al abrir `/` se ve la bienvenida en español y el botón "Comenzar" lleva a `/empezar`.
- [ ] La página `/empezar` muestra los 3 pasos de forma clara.
- [ ] El cliente Supabase en `src/lib/supabase.ts` está creado y la app no falla si las variables de Supabase están definidas (aunque aún no se use para nada).
- [ ] El proyecto está desplegado en Vercel y la URL pública muestra la misma experiencia (bienvenida + navegación).

---

## Sprint 2 — Autenticación y perfiles de usuario ✅

### Objetivo del sprint
Que el estudiante pueda registrarse e iniciar sesión (email o anónimo si aplica), y que tengamos en Supabase una tabla de perfiles (ej. tipo_usuario, municipio, tipo_unidad_educativa) vinculada al usuario.

### Tareas realizadas
- Supabase Auth (registro con email/contraseña e inicio de sesión).
- Tabla `profiles` y políticas RLS (script en `supabase/migrations/001_profiles.sql` — ejecutar en Supabase SQL Editor).
- Páginas en español: Iniciar sesión (`/iniciar-sesion`), Registrarse (`/registrarse`), Mi perfil (`/perfil`).
- Perfil con municipio (Santa Cruz de la Sierra, Montero, Warnes) y tipo de unidad educativa (fiscal/privado).
- Header con enlaces según sesión (Iniciar sesión / Registrarse o Mi perfil / Cerrar sesión).
- Criterio de completitud: usuario nuevo puede registrarse, iniciar sesión y ver/editar su perfil básico.

---

## Sprint 3 — Módulo de orientación vocacional con IA ✅

### Objetivo del sprint
Implementar un flujo de “prueba gamificada” (preguntas de intereses/aptitudes) y usar Gemini para analizar respuestas y devolver un primer borrador de recomendaciones en lenguaje sencillo.

### Tareas realizadas
- **Preguntas:** 6 preguntas de intereses/aptitudes en `src/data/preguntas.ts` (actividad preferida, entorno ideal, fortaleza, problema a resolver, estilo de estudio, sector en Bolivia).
- **Pantalla gamificada:** ruta `/prueba`, una pregunta por pantalla, barra de progreso, opciones seleccionables y botón “Siguiente” / “Ver mis recomendaciones”.
- **API:** `api/recomendaciones.ts` (Vercel serverless) llama a Gemini con las respuestas y devuelve texto de recomendaciones en español para contexto boliviano.
- **Resultados:** pantalla “Tus recomendaciones” con el texto generado y aviso de que son orientativas (complementan orientación con familia/colegio).
- **Enlace:** en la página “¿Qué haremos?” (/empezar) botón “Hacer la prueba de orientación” que lleva a `/prueba`.
- **Config:** `GEMINI_API_KEY` en Vercel (y en `.env` si se usa `vercel dev`). Opcional `VITE_API_BASE_URL` para desarrollo.
- Criterio: el estudiante completa la prueba y ve recomendaciones generadas por IA.

---

## Sprint 4 — Datos públicos y métricas (pendiente)

### Objetivo del sprint
Integrar datos de contexto boliviano (INE, SIE, cámaras) para enriquecer recomendaciones y mostrar estadísticas simples (ej. demanda laboral por carrera en Santa Cruz). Definir métricas de éxito (abandono, congruencia aptitud-rendimiento) a nivel de diseño.

### Tareas resumidas
- Definir fuentes y formatos (INE, SIE, CAINCO/CAO).
- Capa de datos (CSV/API o estáticos) y uso en recomendaciones.
- Vista “Datos del mercado” o similar para el estudiante.
- Especificación de cómo se calcularán después el índice de abandono y congruencia.
- Criterio: al menos una fuente de datos integrada y visible en la UI.

---

## Sprint 5 — Producción, feedback y consideraciones offline (pendiente)

### Objetivo del sprint
Dejar la app lista para uso real: manejo de conectividad limitada (cache, mensajes claros), sistema de feedback cualitativo (encuestas o comentarios) y consideraciones éticas (transparencia, no reemplazo del criterio humano).

### Tareas resumidas
- Detección de conexión y mensajes cuando no hay internet.
- Formulario o flujo de retroalimentación (feedback) del estudiante.
- Textos de aviso ético (la app apoya, no reemplaza a orientadores).
- Revisión de accesibilidad y usabilidad en móvil.
- Documentación final y despliegue estable en Vercel.
- Criterio: app desplegada con feedback y avisos éticos implementados.

---

## Sprint 6 — Conexión y Matchmaking Educativo

#### Objetivo del sprint

Desarrollar una interfaz que cruce los resultados del test de orientación vocacional (Sprint 3) y las preferencias logísticas del estudiante (presupuesto, ubicación, disponibilidad) con una base de datos de instituciones de educación superior, facilitando el contacto directo y accionable.

### Lista de tareas específicas

1. Modelo de datos de instituciones:
   - Crear tablas en Supabase (instituciones y oferta_academica) para almacenar universidades e institutos técnicos locales (ej. UAGRM, UPSA, institutos tecnológicos de Santa Cruz, Montero y Warnes).
   - Incluir campos clave: nombre, ubicación, rango de costos (mensualidad/matrícula), tipo de gestión (pública/privada) y enlace de contacto directo (WhatsApp o web).

2. Formulario de preferencias logísticas:
   - Construir una interfaz que se despliegue justo después de mostrar los resultados del test con Gemini.
   - Capturar datos clave del estudiante: municipio de preferencia para estudiar, rango de presupuesto mensual deseado y turno (mañana, tarde, noche).

3. Lógica de emparejamiento (Matchmaking)

   - Implementar una función que tome las carreras sugeridas por la IA y busque coincidencias exactas o afines en la tabla oferta_academica de Supabase.
   - Aplicar filtros basados en el formulario de preferencias (descartar opciones fuera de presupuesto o en municipios no deseados).

4. Interfaz de resultados y conexión
   - Diseñar una vista con tarjetas (cards) para cada institución recomendada.
   - Mostrar de forma clara: nombre de la institución, carrera coincidente, costo estimado y porcentaje de afinidad.
   - Incluir un Call to Action (CTA) claro, como un botón "Solicitar información por WhatsApp" que genere un enlace con un mensaje pre-rellenado.

5. Registro de interacciones (Métricas de conversión)
   - Crear una tabla interacciones_contacto en Supabase para registrar cuándo un estudiante hace clic en el botón de contacto de una universidad. Esto servirá como métrica analítica clave para medir la efectividad de la plataforma frente a la deserción y la indecisión.

---
## Próximo paso

**Empieza con el Sprint 1:** usa el “Primer prompt exacto” de la sección Sprint 1 en tu asistente de IA o en Cursor para generar el código inicial. Cuando tengas el proyecto corriendo localmente, la bienvenida en español, la navegación y el despliegue en Vercel funcionando, considera el Sprint 1 completo.

Cuando me confirmes que el Sprint 1 está listo (o si quieres ajustar algo), seguimos con el **Sprint 2** (autenticación y perfiles).
