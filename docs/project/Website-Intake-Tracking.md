# Website Intake Tracking

## Current Public Paths

| Path | Purpose | Data Destination | Owner Alert | Follow-Up |
| --- | --- | --- | --- | --- |
| `/audit` | Thurr Solutions Lead Flow Audit request | Supabase `audit_requests` through `/api/audit-request` | `AUDIT_REQUEST_WEBHOOK_URL` or `DISCORD_OWNER_WEBHOOK_URL` | Notion opportunity + Linear follow-up task |
| `/audit/thanks` | Prospect confirmation | No new data | None | Manual review |
| `/` lead sections | Homepage CTA routing | Routes to `/audit` | Same as `/audit` after form submit | Same as `/audit` |
| `/buildout` | Legacy Right Thurr blueprint/demo intake | Supabase `buildout_requests` through `/api/buildout-request` | Existing Slack alert helper if configured | Internal product/demo queue |

## Lead Flow Audit Field Map

| Form Field | API Payload | Supabase Field | Notes |
| --- | --- | --- | --- |
| Business name | `business_name` | `business_name` | Required |
| Owner name | `owner_name` | `owner_name` | Required |
| Email | `email` | `email` | Required |
| Business URL | `business_url` | `business_url` | Required |
| Approx. monthly lead volume | `monthly_leads_estimate` | `monthly_leads_estimate` | Required enum |
| Lead-flow frustration | `frustration_text` | `frustration_text` | Required |

## Manual Fallback

If Supabase or the owner alert is not configured, use the website submission details to create:

1. A Notion prospect/opportunity record with offer, phase, status, next action, and links.
2. A Linear follow-up task if the prospect needs action within 48 hours.
3. A calendar reminder only if there is a date-specific follow-up.

## Direct Links

- Codex backlog: /Users/thurr/Documents/New project/docs/project/Codex-Ready-Backlog.md
- Audit schema: /Users/thurr/Documents/New project/docs/backend/Audit-Request-Schema.md
- Alert flow: /Users/thurr/Documents/New project/docs/backend/Audit-Request-Alert-Flow.md
- Key rotation checklist: https://www.notion.so/357a6f1d2523815e9180d47e8ce3bf78
- Client Command Center: https://www.notion.so/350a6f1d2523814d8b91f103559431e8

## Data Boundary

The Lead Flow Audit form is for operational lead-flow details only. Do not collect PHI, youth/minor journal content, insurance health details, passwords, bank information, or signed agreement artifacts.
