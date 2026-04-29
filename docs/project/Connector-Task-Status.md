# Connector / Task Status

Concise status for the Right Thurr / Thurr Solutions connector stack.

Last updated: 2026-04-29

## Current Priority

Verify the CRM field migration and owner review queue detail path with one fresh buildout request.

This is the next trust-boundary task because intake, blueprint generation, manual review status,
Discord alerts, approval-only review, and approved Resend delivery are already working.

## Status Table

| Area | Status | Complete | Blocked By | Next Action |
| --- | --- | --- | --- | --- |
| Vercel | Live / deploy-limited | `right-thurr-audit` deploy is live, production env includes Supabase, n8n webhook, Thurnos/OpenAI, Resend, and bridge secrets. `/api/buildout-request`, `/api/thurnos-blueprint`, `/api/approve-report`, and `/api/review-reports` exist. The owner Report Review Queue detail expansion is pushed to GitHub but not live yet. | Vercel free daily deployment limit returned `api-deployments-free-per-day` on 2026-04-29 after the direct production deploy attempt. | After the deployment limit resets, deploy commit `4a3093e`, then visually verify the owner Report Review Queue after owner sign-in. |
| Supabase | Live | Project `xplfryahxdegfvxmymco` exists. MVP schema, generated reports, service-role grants, owner auth gate, RLS, and persistence for requests/reports/systems/tasks/activity are in place. CRM tagging writes verified `crm_tag_applied` activity events and can update optional `lead_status`, `crm_tags`, and `last_activity_at` fields after the migration is run. | User-owned Supabase login for dashboard changes; server-only keys must stay out of docs and client env. CRM field migration still needs to be run in Supabase. | Run CRM field migration, then keep Supabase as the source of truth; harden owner RLS before loading real private operator/client records in the UI. |
| n8n | Live | Workflow `Right Thurr - Buildout Plan Intake` is active. Production webhook saves intake, calls the Thurnos blueprint bridge, creates draft report/system/tasks/activity, and returns queued status. | n8n login/credentials for workflow edits; production webhook and bridge secret must stay private. | Add approval/email delivery workflow after Resend is configured. |
| Discord | Live | `#leads-alerts` webhook is connected through n8n as a non-blocking privacy-safe alert. Live QA showed the Discord node ran successfully. | Discord webhook URL is sensitive; channel privacy must be confirmed before posting contact details. | Keep V1 alerts privacy-safe; optionally add review/delivery confirmation alerts. |
| Slack | Optional / blocked | Slack node exists in n8n as a non-blocking side branch, so failed Slack delivery does not break intake. | Current n8n Slack credential returned `channel_not_found` for `general` and `new-clients`. Needs Slack workspace/channel access cleanup. | Leave optional until team/client operations need it; reconnect credential and test `new-clients` later. |
| Notion | Pending | Repo docs map the desired Notion Command Center databases and page IDs. Planning can continue from pasted content. | Notion connector can search, but the linked pages/databases are not visible yet. Needs user connector/page access. | When access is fixed, sync Build Queue tasks and workspace URLs into Notion. |
| Cloudflare / domain | Live for Thurr Solutions | `thurrsolutions.com`, `www.thurrsolutions.com`, and `build.thurrsolutions.com` resolve to Vercel with issued certificates. DNS is gray-cloud / DNS-only. | Future domain changes require Cloudflare login. `rightthurr.com`, `app.rightthurr.com`, and `diagnostic.thurrsolutions.com` are still future decisions/work. | Keep current DNS stable; decide later when to attach `rightthurr.com`, `app.rightthurr.com`, and `diagnostic.thurrsolutions.com`. |
| Email provider / Resend | Live | `/api/approve-report` supports approval-only mode and Resend-backed send mode. Production send QA to `therrance@thurrsolutions.com` passed: Resend returned `sent`, request/report moved to `delivered`, and `report_email_sent` activity was logged. Owner Command Center can show reviewable reports and approve without sending. | Prospect delivery should still stay manual-review only. | Keep send tests limited to approved recipients until report quality is reviewed. |
| Thurnos / Hermes / GPT | Live bridge | Local Ollama notes exist for `thurnos:latest`/`hermes3:latest`. Production bridge currently supports OpenAI provider with server-only `OPENAI_API_KEY` and `THURNOS_OPENAI_MODEL`. End-to-end n8n tests generated report/system/tasks/activity. | OpenAI key and bridge secret are server-only. Local Ollama should not be exposed directly to the public web. | Keep generated reports in manual review mode; improve prompt/report quality from reviewed examples. |

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
- Notion connector/page permission if Notion should become the live task mirror.
- Cloudflare login for future domain/subdomain/DNS changes.
- Resend account/API key and verified sender DNS for approved email delivery.

## Next Task Marker

Do next:

```text
Run the CRM field migration in Supabase if it has not already been applied, then verify a fresh buildout request writes CRM tags and lifecycle status visible in the owner queue.
```

Do not do yet:

```text
Auto-send generated reports without manual review.
Post lead contact details into Discord or Slack.
Expose local Ollama/Thurnos directly to the public web.
Make Slack or Notion required for the intake path.
```
