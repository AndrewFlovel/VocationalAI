-- Sprint 2: Tabla de perfiles para estudiantes
-- Ejecuta este script en Supabase: SQL Editor → New query → Pegar → Run

-- Tabla perfiles (vinculada a auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  tipo_usuario text not null default 'estudiante',
  municipio text,
  tipo_unidad_educativa text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Índice para búsquedas por municipio (útil después)
create index if not exists idx_profiles_municipio on public.profiles(municipio);

-- RLS: cada usuario solo ve y edita su propio perfil
alter table public.profiles enable row level security;

create policy "Usuarios pueden ver su propio perfil"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Usuarios pueden insertar su propio perfil"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Usuarios pueden actualizar su propio perfil"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Crear perfil automáticamente al registrarse
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, tipo_usuario)
  values (new.id, 'estudiante');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Actualizar updated_at al modificar
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();
