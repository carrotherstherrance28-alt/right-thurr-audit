# Connector / Task Status

Concise status for the Right Thurr / Thurr Solutions connector stack.

Last updated: 2026-04-29

## Current Priority

Finalize owner auth/RLS before showing real private lead/report data in the owner UI.

This is the next trust-boundary task because intake, blueprint generation, manual review status,
Discord alerts, approval-only review, and approved Resend delivery are already working.

## Status Table

| Area | Status | Complete | Blocked By | Next Action |
| --- | --- | --- | --- | --- |
| Vercel | Live / deploy capped | Production currently serves the previous ready deploy; owner auth/RLS code is pushed at commit `2b857a5`. Production env includes Supabase, n8n webhook, Thurnos/OpenAI, Resend, and bridge secrets. `/api/buildout-request`, `/api/thurnos-blueprint`, `/api/approve-report`, `/api/review-reports`, and `/api/owner-access` exist. Unauthenticated `/api/review-reports` returns `401` on both `right-thurr-audit.vercel.app` and `build.thurrsolutions.com`. | Vercel free daily deployment cap returned `api-deployments-free-per-day`; retry after the cap resets. | Retry production deploy, then QA the owner magic-link queue flow. |
| Supabase | Live | Project `xplfryahxdegfvxmymco` exists. MVP schema, generated reports, service-role grants, RLS, and persistence for requests/reports/systems/tasks/activity are in place. CRM fields are installed; REST verification on 2026-04-29 returned `lead_status`, `crm_tags`, and `last_activity_at`. A fresh lifecycle QA request moved from intake to `awaiting_review` to `approved_for_delivery`, with `approved_for_follow_up` and `blueprint-approved` / `approved-for-follow-up` tags. Owner RLS hardening SQL now exists at `docs/backend/Supabase-Owner-RLS-Hardening.sql`. | User-owned Supabase login for future SQL/RLS changes; server-only keys must stay out of docs and client env. | Sign in once with the owner magic link, run the owner RLS hardening SQL, then QA the private queue. |
| n8n | Live | Workflow `Right Thurr - Buildout Plan Intake` is active. Production webhook saves intake, calls the Thurnos blueprint bridge, creates draft report/system/tasks/activity, and returns queued status. | n8n login/credentials for workflow edits; production webhook and bridge secret must stay private. | Add approval/email delivery workflow after Resend is configured. |
| Discord | Live | `#leads-alerts` webhook is connected through n8n as a non-blocking privacy-safe alert. Live QA showed the Discord node ran successfully. | Discord webhook URL is sensitive; channel privacy must be confirmed before posting contact details. | Keep V1 alerts privacy-safe; optionally add review/delivery confirmation alerts. |
| Slack | Optional / blocked | Slack node exists in n8n as a non-blocking side branch, so failed Slack delivery does not break intake. | Current n8n Slack credential returned `channel_not_found` for `general` and `new-clients`. Needs Slack workspace/channel access cleanup. | Leave optional until team/client operations need it; reconnect credential and test `new-clients` later. |
| Notion | Live / API-created | Task Tracker, Content Calendar, and AI Ideas Log were created under the Command Center with the repo Notion API script. CSV fallback/import files exist in `docs/notion-imports`. | The Codex Notion connector is still search/fetch-oriented; automated writes need `NOTION_API_KEY` through the repo script or n8n Notion credentials. Rotate any pasted Notion integration token after setup. | Decide whether task/content/idea sync should run through n8n or the repo script, then mirror only high-level tasks and content ideas. |
| Cloudflare / domain | Live for Thurr Solutions | `thurrsolutions.com`, `www.thurrsolutions.com`, and `build.thurrsolutions.com` resolve to Vercel with issued certificates. DNS is gray-cloud / DNS-only. | Future domain changes require Cloudflare login. `rightthurr.com`, `app.rightthurr.com`, and `diagnostic.thurrsolutions.com` are still future decisions/work. | Keep current DNS stable; decide later when to attach `rightthurr.com`, `app.rightthurr.com`, and `diagnostic.thurrsolutions.com`. |
| Email provider / Resend | Live | `/api/approve-report` supports approval-only mode and Resend-backed send mode. Production send QA to `therrance@thurrsolutions.com` passed: Resend returned `sent`, request/report moved to `delivered`, and `report_email_sent` activity was logged. Owner Command Center has a Supabase magic-link gate and can approve without sending once the owner session is active. | Prospect delivery should still stay manual-review only. | Keep send tests limited to approved recipients until report quality is reviewed. |
| Thurnos / Hermes / GPT | Live bridge | Local Ollama notes exist for `thurnos:latest`/`hermes3:latest`. Production bridge currently supports OpenAI provider with server-only `OPENAI_API_KEY` and `THURNOS_OPENAI_MODEL`. End-to-end n8n tests generated report/system/tasks/activity. | OpenAI key and bridge secret are server-only. Local Ollama should not be exposed directly to the public web. | Keep generated reports in manual review mode; improve prompt/report quality from reviewed examples. |
| Client diagnostic V1 | Planned / spec ready | Mobile detailing was selected as the first client diagnostic lane. V1 spec exists at `docs/product/Client-Diagnostic-V1-Mobile-Detailing.md`. | Needs three visual options before frontend coding because this is visual/client-facing work. | Create three screenshot options, select one, then build reusable diagnostic page template. |

## Working Production Path

```text
Public buildout form
-> Vercel / n8n production webhook
-> Vercel API saves buildout request to Supabase
-> n8n calls private Thurnos blueprint bridge
-> bridge uses OpenAI/Thurnos provider
-> Supabase stores generated report, starter system, tasks, and activity
-> Discord posts privacy-safe operator alert
-> report waits for manual review
```

## Blocked By User Login / Keys

- Vercel dashboard access for future project/domain/env changes.
- Supabase dashboard access for schema/RLS/key changes.
- n8n login for workflow edits and credential updates.
- Slack workspace/channel credential access if Slack alerts become necessary.
- Notion API key or n8n Notion credential if Notion should become the live task mirror.
- Cloudflare login for future domain/subdomain/DNS changes.
- Resend account/API key and verified sender DNS for approved email delivery.

## Next Task Marker

Do next:

```text
Retry Vercel production deploy after the daily cap resets. While blocked, create three visual options for the mobile detailing diagnostic page.
```

Do not do yet:

```text
Auto-send generated reports without manual review.
Post lead contact details into Discord or Slack.
Expose local Ollama/Thurnos directly to the public web.
Make Slack or Notion required for the intake path.
```
