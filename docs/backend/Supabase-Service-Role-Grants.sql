-- Run this in Supabase SQL Editor after creating/adding a server-side
-- Supabase secret key for Vercel.
--
-- Why this exists:
-- RLS stays enabled for app safety. Supabase secret keys and legacy
-- service_role keys bypass RLS, but the service_role Postgres role still
-- needs explicit table privileges for REST inserts/updates.

grant usage on schema public to service_role;

grant select, insert, update on public.buildout_requests to service_role;
grant select, insert, update, delete on public.systems to service_role;
grant select, insert, update, delete on public.system_assets to service_role;
grant select, insert, update, delete on public.generated_reports to service_role;
grant select, insert, update, delete on public.activity_logs to service_role;
grant select, insert, update, delete on public.tasks to service_role;
grant select, insert, update, delete on public.money_entries to service_role;
