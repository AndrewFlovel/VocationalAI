-- Migration 003: Institutions and Academic Offer
create table instituciones (
  id uuid default gen_random_uuid() primary key,
  nombre text not null,
  sigla text,
  tipo_gestion text not null check (tipo_gestion in ('pública', 'privada', 'convenio')),
  municipio text not null, -- Santa Cruz de la Sierra, Montero, Warnes, etc.
  logo_url text,
  web_url text,
  whatsapp_contacto text, -- Número en formato internacional (ej: 59170000000)
  created_at timestamp with time zone default now()
);

create table oferta_academica (
  id uuid default gen_random_uuid() primary key,
  institucion_id uuid references instituciones(id) on delete cascade,
  nombre_carrera text not null,
  area_conocimiento text not null, -- Salud, Ingeniería, Social, Agro, etc.
  modalidad text default 'presencial',
  turno text check (turno in ('mañana', 'tarde', 'noche', 'combinado', 'todo el día')),
  costo_mensual_estimado numeric default 0, -- 0 para públicas
  duracion_anios integer,
  created_at timestamp with time zone default now()
);

create table interacciones_contacto (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id),
  oferta_id uuid references oferta_academica(id),
  tipo_accion text default 'click_whatsapp',
  created_at timestamp with time zone default now()
);

-- RLS
alter table instituciones enable row level security;
alter table oferta_academica enable row level security;
alter table interacciones_contacto enable row level security;

create policy "Lectura pública de instituciones" on instituciones for select using (true);
create policy "Lectura pública de oferta" on oferta_academica for select using (true);
create policy "Insertar interacciones" on interacciones_contacto for insert with check (true);

-- Datos iniciales de prueba (Seed Data)
insert into instituciones (nombre, sigla, tipo_gestion, municipio, whatsapp_contacto) values
('Universidad Autónoma Gabriel René Moreno', 'UAGRM', 'pública', 'Santa Cruz de la Sierra', '59176000000'),
('Universidad Privada de Santa Cruz de la Sierra', 'UPSA', 'privada', 'Santa Cruz de la Sierra', '59177000000'),
('Instituto Tecnológico Montero', 'ITM', 'pública', 'Montero', '59178000000');

insert into oferta_academica (institucion_id, nombre_carrera, area_conocimiento, turno, costo_mensual_estimado)
select id, 'Ingeniería de Sistemas', 'Ingeniería', 'mañana', 0 from instituciones where sigla = 'UAGRM';

insert into oferta_academica (institucion_id, nombre_carrera, area_conocimiento, turno, costo_mensual_estimado)
select id, 'Administración de Empresas', 'Social', 'tarde', 1800 from instituciones where sigla = 'UPSA';

insert into oferta_academica (institucion_id, nombre_carrera, area_conocimiento, turno, costo_mensual_estimado)
select id, 'Mecánica Automotriz', 'Técnica', 'noche', 0 from instituciones where sigla = 'ITM';
