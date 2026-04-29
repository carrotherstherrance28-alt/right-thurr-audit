-- CRM fields for buildout_requests.
-- Run this in Supabase SQL Editor.

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

update public.buildout_requests
set
  lead_status = case
    when status = 'delivered' then 'report_delivered'
    when status = 'approved_for_delivery' then 'approved_for_follow_up'
    when status = 'awaiting_review' then 'blueprint_ready_for_review'
    when status = 'draft_generated' then 'blueprint_draft_generated'
    else 'blueprint_requested'
  end,
  crm_tags = array_remove(array[
    'blueprint-requested',
    case when status = 'awaiting_review' then 'blueprint-ready-for-review' end,
    case when status = 'approved_for_delivery' then 'approved-for-follow-up' end,
    case when status = 'delivered' then 'report-delivered' end
  ], null),
  last_activity_at = updated_at
where crm_tags = '{}'::text[];
