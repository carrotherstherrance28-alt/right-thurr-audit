create schema if not exists thurrsolutions;

create table if not exists thurrsolutions.thurr_tag_waitlist (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text,
  sms_opt_in boolean not null default false,
  interest_type text not null,
  founder_interest boolean not null default false,
  personalized_interest boolean not null default false,
  sticker_interest boolean not null default false,
  corporate_interest boolean not null default false,
  company text,
  quantity_range text not null default '1',
  notes text,
  source text not null default 'thurr-tag-page',
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  audience_segment text,
  outreach_type text,
  page_path text,
  referrer text,
  status text not null default 'new',
  responded_at timestamptz,
  constraint thurr_tag_waitlist_interest_type_check check (
    interest_type in (
      'Founders Edition',
      'Personalized',
      'Personalized Founders Edition',
      'Sticker Pack',
      'Corporate Gifting'
    )
  ),
  constraint thurr_tag_waitlist_quantity_range_check check (
    quantity_range in ('1', '2-5', '25+', '50+', '100+', 'Not sure')
  )
);

alter table thurrsolutions.thurr_tag_waitlist
add column if not exists utm_source text,
add column if not exists utm_medium text,
add column if not exists utm_campaign text,
add column if not exists utm_content text,
add column if not exists audience_segment text,
add column if not exists outreach_type text;

alter table thurrsolutions.thurr_tag_waitlist enable row level security;

drop policy if exists "thurr_tag_waitlist_insert_anon" on thurrsolutions.thurr_tag_waitlist;
create policy "thurr_tag_waitlist_insert_anon"
on thurrsolutions.thurr_tag_waitlist
for insert
to anon
with check (true);

drop policy if exists "thurr_tag_waitlist_select_service_role" on thurrsolutions.thurr_tag_waitlist;
create policy "thurr_tag_waitlist_select_service_role"
on thurrsolutions.thurr_tag_waitlist
for select
to service_role
using (true);

drop policy if exists "thurr_tag_waitlist_update_service_role" on thurrsolutions.thurr_tag_waitlist;
create policy "thurr_tag_waitlist_update_service_role"
on thurrsolutions.thurr_tag_waitlist
for update
to service_role
using (true)
with check (true);

grant usage on schema thurrsolutions to anon;
grant insert on thurrsolutions.thurr_tag_waitlist to anon;
grant usage on schema thurrsolutions to service_role;
grant select, insert, update on thurrsolutions.thurr_tag_waitlist to service_role;

create index if not exists thurr_tag_waitlist_created_at_idx
on thurrsolutions.thurr_tag_waitlist (created_at desc);

create index if not exists thurr_tag_waitlist_interest_type_idx
on thurrsolutions.thurr_tag_waitlist (interest_type);

create index if not exists thurr_tag_waitlist_corporate_interest_idx
on thurrsolutions.thurr_tag_waitlist (corporate_interest);

create index if not exists thurr_tag_waitlist_status_idx
on thurrsolutions.thurr_tag_waitlist (status);

create index if not exists thurr_tag_waitlist_utm_campaign_idx
on thurrsolutions.thurr_tag_waitlist (utm_campaign);

create index if not exists thurr_tag_waitlist_audience_segment_idx
on thurrsolutions.thurr_tag_waitlist (audience_segment);

create index if not exists thurr_tag_waitlist_outreach_type_idx
on thurrsolutions.thurr_tag_waitlist (outreach_type);
