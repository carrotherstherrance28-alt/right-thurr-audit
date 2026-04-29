# CRM Tagging

V1 CRM tagging uses Supabase `buildout_requests` as the lead record and `activity_logs` as the
history trail.

The API is backwards-compatible: if the CRM columns are not installed yet, the production workflow
still writes `crm_tag_applied` activity events and continues normally. Once the columns are added,
the same routes also update `lead_status`, `crm_tags`, and `last_activity_at`.

## Lead Fields

```sql
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
```

## Event Shape

```text
activity_logs.action_type = crm_tag_applied
activity_logs.agent_name = CRM Agent
activity_logs.buildout_request_id = <lead request id>
activity_logs.summary = Lead tagged: tag-one, tag-two
activity_logs.status = completed
```

## Tags Applied

On intake save:

```text
lead_status: blueprint_requested
new-buildout-request
budget-<budget level>
timeline-<timeline>
industry-<industry>
```

On blueprint generation with manual review:

```text
lead_status: blueprint_ready_for_review
blueprint-needs-review
report-draft-ready
```

On approval without sending:

```text
lead_status: approved_for_follow_up
blueprint-approved
ready-for-delivery
```

On approval with requested delivery:

```text
lead_status: delivery_requested
blueprint-approved
delivery-requested
```

On successful Resend delivery:

```text
lead_status: report_delivered
report-delivered
follow-up-needed
```

On delivery failure:

```text
lead_status: delivery_needs_attention
delivery-needs-attention
```

## Query

Recent CRM tag events:

```text
activity_logs?action_type=eq.crm_tag_applied&select=*&order=created_at.desc
```

Tags for one buildout request:

```text
activity_logs?buildout_request_id=eq.<request-id>&action_type=eq.crm_tag_applied&select=summary,created_at&order=created_at.asc
```

## Next Step

When the operator flow stabilizes, add a CRM sync workflow:

```text
Supabase activity_logs crm_tag_applied
-> n8n scheduled or webhook sync
-> Notion/Airtable/HubSpot lead record
-> Discord summary only when attention is needed
```

Keep contact details in Supabase by default. External tools should receive only the data needed for
the workflow they own.
