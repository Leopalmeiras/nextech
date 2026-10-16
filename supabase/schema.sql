-- Esquema inicial. Execute no SQL Editor do Supabase após revisar permissões.
create extension if not exists pgcrypto;

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  manufacturer text not null,
  model text not null,
  name text not null,
  category text not null,
  specs jsonb not null default '{}'::jsonb,
  source_url text not null,
  source_title text not null,
  verified_at timestamptz,
  created_at timestamptz not null default now(),
  unique (manufacturer, model)
);

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references public.products(id) on delete set null,
  title text not null,
  document_type text not null check (document_type in ('datasheet','manual','nota_tecnica','pagina_oficial','outro')),
  source_url text,
  storage_path text,
  version_label text,
  published_at date,
  imported_at timestamptz not null default now(),
  metadata jsonb not null default '{}'::jsonb
);

create table if not exists public.document_chunks (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references public.documents(id) on delete cascade,
  page_number integer,
  section_title text,
  content text not null,
  source_url text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.price_offers (
  id uuid primary key default gen_random_uuid(),
  distributor_name text not null,
  distributor_domain text not null,
  product_model text not null,
  manufacturer_sku text,
  price numeric(12,2),
  currency text not null default 'BRL',
  availability_label text,
  offer_url text not null,
  observed_at timestamptz not null default now(),
  match_status text not null default 'needs_review' check (match_status in ('exact','probable','needs_review','rejected')),
  metadata jsonb not null default '{}'::jsonb
);

create index if not exists products_model_idx on public.products (lower(model));
create index if not exists products_category_idx on public.products (category);
create index if not exists documents_chunks_document_idx on public.document_chunks (document_id);
create index if not exists price_offers_model_idx on public.price_offers (lower(product_model));
create index if not exists price_offers_observed_idx on public.price_offers (observed_at desc);

-- Não habilite acesso público às tabelas. Configure RLS e políticas após definir
-- autenticação. A service role deve ficar somente no servidor.
