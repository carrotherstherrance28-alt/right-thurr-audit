-- Owner auth and RLS hardening for the private Command Center.
-- Run after the owner has signed in at least once with Supabase Auth.
-- Replace the email below before running.

create table if not exists public.owner_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  role text not null default 'owner',
  approved boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.owner_profiles enable row level security;

drop policy if exists "Approved owners can read own profile" on public.owner_profiles;
create policy "Approved owners can read own profile"
on public.owner_profiles
for select
to authenticated
using (id = auth.uid() and approved = true);

-- Run this after the owner magic-link login creates the Supabase Auth user.
-- Replace therrance@thurrsolutions.com if the owner email changes.
insert into public.owner_profiles (id, email, role, approved)
select id, lower(email), 'owner', true
from auth.users
where lower(email) = lower('therrance@thurrsolutions.com')
on conflict (id) do update
set
  email = excluded.email,
  role = excluded.role,
  approved = true,
  updated_at = now();

grant usage on schema public to authenticated;
grant select on public.owner_profiles to authenticated;
grant select on public.buildout_requests to authenticated;
grant select on public.systems to authenticated;
grant select on public.generated_reports to authenticated;
grant select on public.activity_logs to authenticated;
grant select on public.tasks to authenticated;
grant select on public.money_entries to authenticated;

drop policy if exists "Approved owners can read buildout requests" on public.buildout_requests;
create policy "Approved owners can read buildout requests"
on public.buildout_requests
for select
to authenticated
using (
  exists (
    select 1
    from public.owner_profiles
    where owner_profiles.id = auth.uid()
      and owner_profiles.approved = true
  )
);

drop policy if exists "Approved owners can read systems" on public.systems;
create policy "Approved owners can read systems"
on public.systems
for select
to authenticated
using (
  exists (
    select 1
    from public.owner_profiles
    where owner_profiles.id = auth.uid()
      and owner_profiles.approved = true
  )
);

drop policy if exists "Approved owners can read generated reports" on public.generated_reports;
create policy "Approved owners can read generated reports"
on public.generated_reports
for select
to authenticated
using (
  exists (
    select 1
    from public.owner_profiles
    where owner_profiles.id = auth.uid()
      and owner_profiles.approved = true
  )
);

drop policy if exists "Approved owners can read activity logs" on public.activity_logs;
create policy "Approved owners can read activity logs"
on public.activity_logs
for select
to authenticated
using (
  exists (
    select 1
    from public.owner_profiles
    where owner_profiles.id = auth.uid()
      and owner_profiles.approved = true
  )
);

drop policy if exists "Approved owners can read tasks" on public.tasks;
create policy "Approved owners can read tasks"
on public.tasks
for select
to authenticated
using (
  exists (
    select 1
    from public.owner_profiles
    where owner_profiles.id = auth.uid()
      and owner_profiles.approved = true
  )
);

drop policy if exists "Approved owners can read money entries" on public.money_entries;
create policy "Approved owners can read money entries"
on public.money_entries
for select
to authenticated
using (
  exists (
    select 1
    from public.owner_profiles
    where owner_profiles.id = auth.uid()
      and owner_profiles.approved = true
  )
);
