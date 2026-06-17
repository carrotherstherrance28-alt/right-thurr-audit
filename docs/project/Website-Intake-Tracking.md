# Website Intake Tracking

Updated: 2026-06-17

## Current Public Paths

| Path | Purpose | Data Destination | Owner Alert | Follow-Up |
| --- | --- | --- | --- | --- |
| `/audit` | Thurr Solutions consultation request | Supabase `audit_requests` through `/api/consultation-request` | `CONSULTATION_REQUEST_WEBHOOK_URL` first; `AUDIT_REQUEST_WEBHOOK_URL` legacy fallback; `DISCORD_OWNER_WEBHOOK_URL` fallback when configured | Notion opportunity + Linear follow-up task |
| `/audit/thanks` | Prospect confirmation after successful submit | No new data | None | Manual review next business day |
| `/` lead sections | Homepage CTA routing | Routes to `/audit` | Same as `/audit` after form submit | Same as `/audit` |
| `/thurr` | Right Thurr Free Game waitlist and profile hub | Supabase `free_game_waitlist` through `/api/free-game-waitlist` | `FREE_GAME_WAITLIST_WEBHOOK_URL` first; `DISCORD_OWNER_WEBHOOK_URL` fallback when configured | Weekly theme sorting and light community interest follow-up |
| `/links` | Short alias for `/thurr` | Same as `/thurr` | Same as `/thurr` | Same as `/thurr` |
| `/buildout` | Legacy Right Thurr blueprint/demo intake | Supabase `buildout_requests` through `/api/buildout-request` | Existing Slack alert helper if configured | Internal product/demo queue |

## Consultation Request Field Map

| Form Field | API Payload | Supabase Field | Notes |
| --- | --- | --- | --- |
| Business name | `business_name` | `business_name` | Required |
| Owner name | `owner_name` | `owner_name` | Required |
| Email | `email` | `email` | Required |
| Business URL | `business_url` | `business_url` | Required |
| Approx. monthly lead volume | `monthly_leads_estimate` | `monthly_leads_estimate` | Required enum |
| Lead-flow frustration | `frustration_text` | `frustration_text` | Required |

## Free Game Waitlist Field Map

| Form Field | API Payload | Supabase Field | Notes |
| --- | --- | --- | --- |
| Name | `name` | `name` | Required |
| Email | `email` | `email` | Required |
| Lane | `interest_area` | `interest_area` | Required enum |
| Phone optional | `phone` | `phone` | Optional; saved only with SMS opt-in |
| Put me on to | `put_on_request` | `put_on_request` | Required |
| Text opt-in | `sms_opt_in` | `sms_opt_in` | Required if phone is provided |
| Source | `source` | `source` | Defaults to `thurr-link-hub` |

## Destination Checklist

| Destination | What Gets Recorded | Owner / Timing | Fallback |
| --- | --- | --- | --- |
| Supabase | Structured website intake row in `thurrsolutions.audit_requests` | API immediately on submit | Table name is legacy; if write fails, API returns a failure and no downstream work should be assumed. |
| Owner alert | Private operational summary without sensitive regulated data | API after save when env vars are configured | Manually check Supabase once per business day until alert destination is locked. |
| Notion | Prospect/opportunity with offer, phase, status, next action, and source links | Manual or n8n after alert | Create from the owner alert using the current consultation request status. |
| Linear | Follow-up issue when action is due, blocked, or waiting on assets | After Notion record is created | Use the consultation/request follow-up template from `Linear-Issue-Template-Library.md`. |

## Owner Alert Routing

Alert delivery is intentionally environment-driven. Do not hardcode webhook URLs, channel IDs, email credentials, or routing secrets in repo docs or source files.

| Env Var Name | Intended Use | Secret Boundary |
| --- | --- | --- |
| `CONSULTATION_REQUEST_WEBHOOK_URL` | Primary n8n/automation intake alert when Thurr approves the destination | Store value only in the deployment platform or password vault. |
| `AUDIT_REQUEST_WEBHOOK_URL` | Legacy alert fallback for older deployment settings | Store value only in the deployment platform or password vault. |
| `FREE_GAME_WAITLIST_WEBHOOK_URL` | Primary owner alert for Right Thurr Free Game waitlist signups | Store value only in the deployment platform or password vault. |
| `DISCORD_OWNER_WEBHOOK_URL` | Direct owner alert fallback when Discord is approved | Store value only in the deployment platform or password vault. |
| `SUPABASE_URL` | Supabase project URL used by the API | Deployment env only. |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side insert credential for consultation and waitlist persistence | Deployment env only; never expose to browser code. |

## Manual Fallback

If Supabase or the owner alert is not configured, use the website submission details to create:

1. A Notion prospect/opportunity record with offer, phase, status, next action, and links.
2. A Linear follow-up task if the prospect needs action within 48 hours.
3. A calendar reminder only if there is a date-specific follow-up.

## Manual Notion Checklist

Use this checklist when converting a consultation request into an operating-system record:

1. Search the Client Command Center for the business name and email before creating a duplicate.
2. Create or update the prospect/opportunity record using the current consultation request fields.
3. Set offer to `Consultation`, phase to `Consultation Requested`, and status to `New Lead`.
4. Add next action: `Review request and send consultation next step`.
5. Link the Supabase row when available.
6. Create a Linear follow-up only when there is an owner, due date, blocker, or asset request.
7. Do not paste PHI, youth/minor data, insurance health details, credentials, bank data, or signed agreement artifacts.

## Direct Links

- Codex backlog: /Users/thurr/Documents/New project/docs/project/Codex-Ready-Backlog.md
- Consultation schema: /Users/thurr/Documents/New project/docs/backend/Consultation-Request-Schema.md
- Free Game waitlist schema: /Users/thurr/Documents/New project/docs/backend/Free-Game-Waitlist-Schema.md
- Alert flow: /Users/thurr/Documents/New project/docs/backend/Consultation-Request-Alert-Flow.md
- Notion tracking spec: /Users/thurr/Documents/New project/docs/project/Notion-Audit-Tracking-Spec.md
- Notion audit destination checklist: https://www.notion.so/350a6f1d2523814d8b91f103559431e8
- Key rotation checklist: https://www.notion.so/357a6f1d2523815e9180d47e8ce3bf78
- Client Command Center: https://www.notion.so/350a6f1d2523814d8b91f103559431e8

## Data Boundary

The consultation form is for operational lead-flow details only. Do not collect PHI, youth/minor journal content, insurance health details, passwords, bank information, or signed agreement artifacts.
