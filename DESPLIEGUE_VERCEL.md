# Desplegar el proyecto en Vercel — Paso a paso

## Requisitos previos

- Cuenta en [Vercel](https://vercel.com) (gratis con GitHub, GitLab o email).
- Proyecto subido a un repositorio Git (GitHub o GitLab recomendado).

---

## Opción A: Desplegar desde GitHub/GitLab (recomendado)

### 1. Subir el proyecto a un repositorio

Si aún no tienes el proyecto en Git:

1. Crea un repositorio nuevo en [GitHub](https://github.com/new) o [GitLab](https://gitlab.com/projects/new).
2. En la carpeta del proyecto, abre terminal y ejecuta:

   ```bash
   cd "d:\Prog Practice\Ai for Good"
   git init
   git add .
   git commit -m "Sprint 1: fundamentos y bienvenida"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
   git push -u origin main
   ```

   (Reemplaza `TU_USUARIO` y `TU_REPO` por tu usuario y nombre del repositorio.)

### 2. Conectar el repositorio con Vercel

1. Entra en [vercel.com](https://vercel.com) e inicia sesión.
2. Clic en **Add New…** → **Project**.
3. En **Import Git Repository** elige **Continue with GitHub** (o GitLab) y autoriza a Vercel si te lo pide.
4. Selecciona el repositorio de tu proyecto (ej. `orientacion-vocacional-bolivia`).
5. Clic en **Import**.

### 3. Configurar el proyecto en Vercel

1. **Framework Preset:** debe detectarse **Vite**. Si no, elige **Vite**.
2. **Root Directory:** deja en blanco (raíz del repo).
3. **Build Command:** `npm run build` (valor por defecto).
4. **Output Directory:** `dist` (valor por defecto para Vite).
5. **Install Command:** `npm install` (por defecto).
6. No cambies nada más y clic en **Deploy**.

### 4. Añadir variables de entorno (Supabase)

1. En el proyecto de Vercel, ve a **Settings** → **Environment Variables**.
2. Añade dos variables:

   | Name                   | Value                    | Environment  |
   |------------------------|--------------------------|--------------|
   | `VITE_SUPABASE_URL`    | `https://xxxx.supabase.co` | Production (y Preview si quieres) |
   | `VITE_SUPABASE_ANON_KEY` | `tu-clave-anonima`        | Production (y Preview si quieres) |

3. Guarda. Para que se apliquen en el siguiente deploy, haz un **Redeploy** desde la pestaña **Deployments** → los tres puntos del último deploy → **Redeploy**.

### 5. Verificar el despliegue

1. Al terminar el primer deploy, Vercel te dará una URL (ej. `https://tu-proyecto.vercel.app`).
2. Ábrela en el navegador: deberías ver la página de bienvenida y poder ir a **Comenzar** y ver los 3 pasos.
3. Prueba en el móvil o redimensionando la ventana para comprobar que se ve bien.

---

## Opción B: Desplegar con Vercel CLI (sin GitHub)

### 1. Instalar Vercel CLI

```bash
npm install -g vercel
```

### 2. Iniciar sesión

```bash
vercel login
```

Sigue el enlace o el código que te muestre en la terminal.

### 3. Desplegar desde la carpeta del proyecto

```bash
cd "d:\Prog Practice\Ai for Good"
vercel
```

Responde a las preguntas:

- **Set up and deploy?** → **Y**
- **Which scope?** → tu cuenta
- **Link to existing project?** → **N**
- **Project name?** → acepta el sugerido o escribe uno (ej. `orientacion-vocacional-bolivia`)
- **In which directory is your code located?** → `./` (Enter)
- **Want to override the settings?** → **N** (Vercel detecta Vite)

### 4. Añadir variables de entorno (CLI)

```bash
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
```

Introduce el valor cuando te lo pida (Production). Luego vuelve a desplegar:

```bash
vercel --prod
```

### 5. Ver la URL

La URL de producción se muestra al final (ej. `https://orientacion-vocacional-bolivia.vercel.app`). También la ves en el dashboard de [vercel.com](https://vercel.com).

---

## Resumen rápido (con GitHub)

| Paso | Acción |
|------|--------|
| 1 | Subir código a GitHub (git init, add, commit, remote, push). |
| 2 | En Vercel: Add New → Project → Import repo desde GitHub. |
| 3 | Deploy con configuración por defecto (Vite, build, dist). |
| 4 | Settings → Environment Variables: añadir `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`. |
| 5 | Redeploy si añadiste variables después del primer deploy. |
| 6 | Abrir la URL de producción y probar bienvenida y /empezar. |

---

## Problemas frecuentes

- **404 al refrescar en una ruta:** Vercel ya sirve bien SPAs con Vite; si usas otro servidor, asegura redirección de todas las rutas a `index.html`.
- **Variables no se ven:** Deben empezar por `VITE_` para que Vite las incluya en el build. Después de añadirlas, haz **Redeploy**.
- **Build falla:** Revisa en Vercel la pestaña **Deployments** → el deploy fallido → **Building** para ver el log. Comprueba que `npm run build` funcione en local.

Cuando el despliegue funcione, puedes marcar el último ítem del checklist del Sprint 1 en `PLAN_ORIENTACION_VOCACIONAL_BOLIVIA.md`.
