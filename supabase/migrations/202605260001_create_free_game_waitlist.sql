create schema if not exists thurrsolutions;

create table if not exists thurrsolutions.free_game_waitlist (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text,
  sms_opt_in boolean not null default false,
  interest_area text not null,
  put_on_request text not null,
  source text not null default 'thurr-link-hub',
  page_path text,
  referrer text,
  status text not null default 'new',
  responded_at timestamptz,
  constraint free_game_waitlist_interest_area_check check (
    interest_area in ('AI tools', 'Fitness', 'Travel', 'Money', 'Content', 'Business', 'Network')
  )
);

alter table thurrsolutions.free_game_waitlist enable row level security;

drop policy if exists "free_game_waitlist_insert_anon" on thurrsolutions.free_game_waitlist;
create policy "free_game_waitlist_insert_anon"
on thurrsolutions.free_game_waitlist
for insert
to anon
with check (true);

drop policy if exists "free_game_waitlist_select_service_role" on thurrsolutions.free_game_waitlist;
create policy "free_game_waitlist_select_service_role"
on thurrsolutions.free_game_waitlist
for select
to service_role
using (true);

drop policy if exists "free_game_waitlist_update_service_role" on thurrsolutions.free_game_waitlist;
create policy "free_game_waitlist_update_service_role"
on thurrsolutions.free_game_waitlist
for update
to service_role
using (true)
with check (true);

grant usage on schema thurrsolutions to anon;
grant insert on thurrsolutions.free_game_waitlist to anon;
grant usage on schema thurrsolutions to service_role;
grant select, insert, update on thurrsolutions.free_game_waitlist to service_role;

create index if not exists free_game_waitlist_created_at_idx
on thurrsolutions.free_game_waitlist (created_at desc);

create index if not exists free_game_waitlist_interest_area_idx
on thurrsolutions.free_game_waitlist (interest_area);

create index if not exists free_game_waitlist_status_idx
on thurrsolutions.free_game_waitlist (status);

create or replace view public.free_game_waitlist as
select
  id,
  created_at,
  name,
  email,
  phone,
  sms_opt_in,
  interest_area,
  put_on_request,
  source,
  page_path,
  referrer,
  status,
  responded_at
from thurrsolutions.free_game_waitlist;

grant insert, select, update on public.free_game_waitlist to service_role;
grant insert on public.free_game_waitlist to anon;
