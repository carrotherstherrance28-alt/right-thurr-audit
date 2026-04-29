-- Right Thurr MVP schema
-- Run this in Supabase SQL Editor after confirming the project is ready.
-- RLS should remain enabled on all tables.

create table if not exists public.buildout_requests (
  id uuid primary key default gen_random_uuid(),
  source text not null default 'right-thurr-buildout-page',
  brand text not null default 'right-thurr',
  name text not null,
  email text not null,
  phone text,
  website_or_social text,
  business_idea text not null,
  industry text not null,
  main_goal text not null,
  location text,
  budget_level text,
  timeline text,
  biggest_bottleneck text,
  report_type text not null default 'right-thurr-autopilot-blueprint',
  status text not null default 'requested',
  lead_status text not null default 'blueprint_requested',
  crm_tags text[] not null default '{}'::text[],
  last_activity_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.buildout_requests
add column if not exists lead_status text not null default 'blueprint_requested',
add column if not exists crm_tags text[] not null default '{}'::text[],
add column if not exists last_activity_at timestamptz not null default now();

create index if not exists buildout_requests_lead_status_idx
on public.buildout_requests (lead_status);

create index if not exists buildout_requests_crm_tags_idx
on public.buildout_requests using gin (crm_tags);

create index if not exists buildout_requests_last_activity_at_idx
on public.buildout_requests (last_activity_at desc);

create table if not exists public.systems (
  id uuid primary key default gen_random_uuid(),
  buildout_request_id uuid references public.buildout_requests(id) on delete set null,
  name text not null,
  type text not null default 'local-service-funnel',
  status text not null default 'building',
  location text,
  target_customer text,
  current_mission text,
  next_move text,
  build_progress integer not null default 0 check (build_progress >= 0 and build_progress <= 100),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.system_assets (
  id uuid primary key default gen_random_uuid(),
  system_id uuid not null references public.systems(id) on delete cascade,
  asset_type text not null,
  title text not null,
  content text not null,
  status text not null default 'draft',
  created_by_agent text,
  created_at timestamptz not null default now()
);

create table if not exists public.generated_reports (
  id uuid primary key default gen_random_uuid(),
  buildout_request_id uuid references public.buildout_requests(id) on delete cascade,
  system_id uuid references public.systems(id) on delete set null,
  report_type text not null default 'right-thurr-autopilot-blueprint',
  title text not null,
  report_status text not null default 'draft',
  report_url text,
  pdf_url text,
  summary text,
  sections jsonb not null default '{}'::jsonb,
  created_by_agent text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.activity_logs (
  id uuid primary key default gen_random_uuid(),
  system_id uuid references public.systems(id) on delete cascade,
  buildout_request_id uuid references public.buildout_requests(id) on delete cascade,
  agent_name text,
  action_type text not null,
  summary text not null,
  status text not null default 'completed',
  revenue_impact numeric(12, 2),
  created_at timestamptz not null default now()
);

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  system_id uuid references public.systems(id) on delete cascade,
  title text not null,
  description text,
  status text not null default 'open',
  priority text not null default 'normal',
  assigned_agent text,
  due_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.money_entries (
  id uuid primary key default gen_random_uuid(),
  system_id uuid references public.systems(id) on delete cascade,
  entry_type text not null check (entry_type in ('revenue', 'expense', 'payout')),
  amount numeric(12, 2) not null,
  category text,
  source text,
  notes text,
  created_at timestamptz not null default now()
);

alter table public.buildout_requests enable row level security;
alter table public.systems enable row level security;
alter table public.system_assets enable row level security;
alter table public.generated_reports enable row level security;
alter table public.activity_logs enable row level security;
alter table public.tasks enable row level security;
alter table public.money_entries enable row level security;

-- V1 intake policy:
-- Allow anonymous inserts into buildout_requests from the public form.
-- Do not allow anonymous reads/updates/deletes by default.
drop policy if exists "Allow public buildout request inserts" on public.buildout_requests;
create policy "Allow public buildout request inserts"
on public.buildout_requests
for insert
to anon
with check (brand = 'right-thurr');

grant usage on schema public to anon;
grant insert on public.buildout_requests to anon;

-- Server-side automation/API routes:
-- Supabase secret keys and legacy service_role keys use the service_role Postgres role.
-- RLS is bypassed for service_role, but explicit table grants are still required.
grant usage on schema public to service_role;
grant select, insert, update on public.buildout_requests to service_role;
grant select, insert, update, delete on public.systems to service_role;
grant select, insert, update, delete on public.system_assets to service_role;
grant select, insert, update, delete on public.generated_reports to service_role;
grant select, insert, update, delete on public.activity_logs to service_role;
grant select, insert, update, delete on public.tasks to service_role;
grant select, insert, update, delete on public.money_entries to service_role;

-- n8n/admin reads should use server-side credentials or authenticated policies later.
