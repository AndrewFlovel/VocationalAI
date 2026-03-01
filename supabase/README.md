# Supabase — Sprint 2

## Ejecutar la migración de perfiles

1. Entra en [app.supabase.com](https://app.supabase.com) y abre tu proyecto.
2. Ve a **SQL Editor** (menú izquierdo).
3. Clic en **New query**.
4. Copia todo el contenido del archivo `migrations/001_profiles.sql`.
5. Pégalo en el editor y clic en **Run** (o Ctrl+Enter).

Deberías ver el mensaje de éxito. Con eso quedan creados:

- Tabla `profiles` (id, tipo_usuario, municipio, tipo_unidad_educativa, created_at, updated_at).
- Políticas RLS para que cada usuario solo vea y edite su propio perfil.
- Trigger que crea un perfil automáticamente al registrarse un nuevo usuario.

## Confirmar email (opcional)

En **Authentication → Providers → Email** puedes activar o desactivar "Confirm email". Si está activo, el usuario debe confirmar el correo antes de poder iniciar sesión; si está desactivado, puede entrar de inmediato después de registrarse.
