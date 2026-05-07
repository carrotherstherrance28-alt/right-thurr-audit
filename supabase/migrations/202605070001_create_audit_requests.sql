create schema if not exists thurrsolutions;

create table if not exists thurrsolutions.audit_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  business_name text not null,
  owner_name text not null,
  email text not null,
  business_url text not null,
  monthly_leads_estimate text not null,
  frustration_text text not null,
  status text not null default 'new',
  responded_at timestamptz null,
  constraint audit_requests_monthly_leads_estimate_check check (
    monthly_leads_estimate in ('<25', '25–100', '100–500', '500+', 'Not sure')
  )
);

alter table thurrsolutions.audit_requests enable row level security;

drop policy if exists "audit_requests_insert_anon" on thurrsolutions.audit_requests;
create policy "audit_requests_insert_anon"
on thurrsolutions.audit_requests
for insert
to anon
with check (true);

drop policy if exists "audit_requests_select_service_role" on thurrsolutions.audit_requests;
create policy "audit_requests_select_service_role"
on thurrsolutions.audit_requests
for select
to service_role
using (true);

drop policy if exists "audit_requests_update_service_role" on thurrsolutions.audit_requests;
create policy "audit_requests_update_service_role"
on thurrsolutions.audit_requests
for update
to service_role
using (true)
with check (true);

create index if not exists audit_requests_created_at_idx
on thurrsolutions.audit_requests (created_at desc);

create index if not exists audit_requests_status_idx
on thurrsolutions.audit_requests (status);
