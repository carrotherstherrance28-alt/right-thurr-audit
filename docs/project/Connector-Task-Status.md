# Connector / Task Status

Concise status for the Right Thurr / Thurr Solutions connector stack.

Last updated: 2026-05-03

## Current Priority

Finish owner RLS hardening in Supabase (owner sign-in + run the SQL) before loading real private lead/report data in the owner UI.

As of 2026-04-29, `/api/review-reports` reads via the owner session (anon key + bearer token) so the owner queue can no longer be fetched via the Supabase service role.

This is the next trust-boundary task because intake, blueprint generation, manual review status, Discord alerts, approval-only review, and approved Resend delivery are already working.

## Status Table

| Area | Status | Complete | Blocked By | Next Action |
| --- | --- | --- | --- | --- |
| Vercel | Live / deployed | Latest production deploy is `right-thurr-audit-dkfup06k2` from 2026-04-30 01:02 CDT and is aliased to `build.thurrsolutions.com` and `right-thurr-audit.vercel.app`. Production env includes Supabase, n8n webhook, Thurnos/OpenAI, Resend, and bridge secrets. `/api/buildout-request`, `/api/thurnos-blueprint`, `/api/approve-report`, `/api/review-reports`, and `/api/owner-access` exist. `/api/buildout-request` now returns a clean `400` `invalid_json` response when given invalid JSON. Unauthenticated `/api/review-reports` and `/api/owner-access` both reject with missing owner session. | None for current deploy. Owner browser QA still needs signed-in Supabase session. | QA owner sign-in + report review queue gating in the browser, then run owner RLS hardening SQL. |
| GitHub Actions (CI) | Live | Workflow runs `npm ci` + `npm run ci` on pushes and PRs. `npm run ci` runs `diagnostic:verify` + `build` so diagnostic lane invariants are enforced automatically. | None | Keep CI green; use `npm run ci` for local pre-push checks. |
| Linear (PM) | Optional / mirror-only | Decision captured: use Linear for phase-level visibility only; keep `docs/project/Build-Queue.md` canonical until a connector exists. See `docs/project/Linear-Mirror-Scope.md` and the update template `docs/project/Linear-Update-2026-04-29.md`. | User-owned Linear login (optional). | If desired: create one project and mirror only phases, blockers, and weekly updates (no private lead data). |
| Supabase | Live | Project `xplfryahxdegfvxmymco` exists. MVP schema, generated reports, service-role grants, RLS, and persistence for requests/reports/systems/tasks/activity are in place. CRM fields are installed; REST verification on 2026-04-29 returned `lead_status`, `crm_tags`, and `last_activity_at`. A fresh lifecycle QA request moved from intake to `awaiting_review` to `approved_for_delivery`, with `approved_for_follow_up` and `blueprint-approved` / `approved-for-follow-up` tags. Owner RLS hardening SQL exists at `docs/backend/Supabase-Owner-RLS-Hardening.sql`, and `/api/review-reports` now reads reports via the owner session (RLS) instead of the service role. | User-owned Supabase login for future SQL/RLS changes; server-only keys must stay out of docs and client env. | Sign in once with the owner magic link, run `docs/backend/Supabase-Owner-RLS-Hardening.sql`, then QA the private queue. |
| n8n | Live | Workflow `Right Thurr - Buildout Plan Intake` is active. Production webhook saves intake, calls the Thurnos blueprint bridge, creates draft report/system/tasks/activity, and returns queued status. | n8n login/credentials for workflow edits; production webhook and bridge secret must stay private. | Add approval/email delivery workflow after Resend is configured. |
| Discord | Live | `#leads-alerts` webhook is connected through n8n as a non-blocking privacy-safe alert. Live QA showed the Discord node ran successfully. | Discord webhook URL is sensitive; channel privacy must be confirmed before posting contact details. | Keep V1 alerts privacy-safe; optionally add review/delivery confirmation alerts. |
| Slack | Optional / available (webhook) | Repo now supports optional privacy-safe Slack incoming webhook alerts via `SLACK_ALERTS_WEBHOOK_URL` (buildout queued, blueprint approved, blueprint delivered). The n8n Slack node remains optional and non-blocking. | n8n Slack credential still returned `channel_not_found`; Slack workspace/channel access cleanup is needed if n8n should post to channels. | If Slack alerts are desired now, create an incoming webhook, set `SLACK_ALERTS_WEBHOOK_URL` in Vercel, redeploy after the cap resets, then confirm the messages are privacy-safe. |
| Notion | Live / API-created | Task Tracker, Content Calendar, and AI Ideas Log were created under the Command Center with the repo Notion API script. CSV fallback/import files exist in `docs/notion-imports`. | The Codex Notion connector is still search/fetch-oriented; automated writes need `NOTION_API_KEY` through the repo script or n8n Notion credentials. Rotate any pasted Notion integration token after setup. | Decide whether task/content/idea sync should run through n8n or the repo script, then mirror only high-level tasks and content ideas. |
| Cloudflare / domain | Live for Thurr Solutions | `thurrsolutions.com`, `www.thurrsolutions.com`, and `build.thurrsolutions.com` resolve to Vercel with issued certificates. DNS is gray-cloud / DNS-only. | Future domain changes require Cloudflare login. `rightthurr.com` and `app.rightthurr.com` are still future work. `diagnostic.thurrsolutions.com` is an optional later upgrade (MVP uses `thurrsolutions.com/diagnostic/*`). | Keep current DNS stable; attach `rightthurr.com`/`app.rightthurr.com` later and only add `diagnostic.thurrsolutions.com` if/when cookie/app isolation is needed. |
| Email provider / Resend | Live | `/api/approve-report` supports approval-only mode and Resend-backed send mode. Production send QA to `therrance@thurrsolutions.com` passed: Resend returned `sent`, request/report moved to `delivered`, and `report_email_sent` activity was logged. Owner Command Center has a Supabase magic-link gate and can approve without sending once the owner session is active. | Prospect delivery should still stay manual-review only. | Keep send tests limited to approved recipients until report quality is reviewed. |
| Thurnos / Hermes / GPT | Live bridge | Local Ollama notes exist for `thurnos:latest`/`hermes3:latest`. Production bridge currently supports OpenAI provider with server-only `OPENAI_API_KEY` and `THURNOS_OPENAI_MODEL`. End-to-end n8n tests generated report/system/tasks/activity. | OpenAI key and bridge secret are server-only. Local Ollama should not be exposed directly to the public web. | Keep generated reports in manual review mode; improve prompt/report quality from reviewed examples. |
| Client diagnostic V1 | Built locally | Mobile detailing was selected as the first client diagnostic lane, with `med-spa` and `roofing-contractor` added as additional lanes. V1 spec exists at `docs/product/Client-Diagnostic-V1-Mobile-Detailing.md`. Three screenshot options exist in `design-options/screenshots/`; the reusable Option C-inspired template is implemented. A simple lane selector dropdown is now present in the diagnostic sidebar to switch between lanes without editing the URL; selector UI screenshot options captured at `design-options/screenshots/diagnostic-lane-selector-option-a.png`, `design-options/screenshots/diagnostic-lane-selector-option-b.png`, and `design-options/screenshots/diagnostic-lane-selector-option-c.png` (Option A implemented). A “Back to lanes” link now appears in the diagnostic sidebar so visitors can return to `/diagnostic` after starting a lane, and a “Back to site” link returns to `/`. A `/diagnostic` index view now exists (cards) so visitors can pick a lane before loading the diagnostic; `diagnostic/index.html` is routed by Vercel so view-source has the correct `noindex` + title/canonical/meta tags for `/diagnostic`. A real `/diagnostic/*` route now exists with Vercel routes, and legacy `?diagnostic=mobile-detailing` redirects to `/diagnostic/mobile-detailing`. The SPA normalizes stray `/diagnostic/*` paths back to the canonical lane path and applies diagnostic-only `meta name="robots"` + page titles for accurate previews. Diagnostic lanes also update `<meta name="description">` + social preview tags (`og:*`, `twitter:*`) per lane and restore defaults when leaving diagnostics. Lane-specific static HTML entries now exist at `diagnostic/mobile-detailing.html`, `diagnostic/med-spa.html`, and `diagnostic/roofing-contractor.html`, and Vercel routes `/diagnostic/<slug>` to them so social preview bots receive the correct meta tags without executing JS. Lane registry lives at `diagnostic/lanes.json`; `npm run diagnostic:create-lane` scaffolds lane HTML and updates `vercel.json`, and both Vite multi-page inputs + `npm run diagnostic:verify` derive lane lists from the registry. The SPA’s allowed slugs now derive from `diagnostic/lanes.json`, and template mapping derives from `src/data/clientDiagnosticTemplates.js` so new lanes can be added without hardcoding slugs in the router. MVP URL decision stays: use `thurrsolutions.com/diagnostic/*` (path-based) before anything goes public. Repo sets `X-Robots-Tag: noindex, nofollow` for `/diagnostic/*` (Vercel headers) and disallows `/diagnostic` in `public/robots.txt` to avoid premature indexing. Repo-local verification exists at `npm run diagnostic:verify` (checks lane social meta tags, legacy redirect handling, Vercel routing/headers, and robots/sitemap invariants; `npm run ci` passed locally on 2026-05-03). | Needs a production deploy + browser QA on the live domain to confirm the route works, the page looks correct, `X-Robots-Tag: noindex` is actually being served, and view-source reflects the lane meta tags (not the generic homepage tags). | Run `npm run diagnostic:verify`, then deploy + browser-QA `thurrsolutions.com/diagnostic` plus `thurrsolutions.com/diagnostic/mobile-detailing`, `thurrsolutions.com/diagnostic/med-spa`, and `thurrsolutions.com/diagnostic/roofing-contractor` (confirm lane index + lane HTML routes + legacy redirect + `X-Robots-Tag: noindex` + view-source title/meta/canonical + lane social preview tags). Use `docs/project/Deployment-Verification.md` → “Diagnostic Lane Checks”. |
| AIDesigner | Project setup installed | Project-level Codex config and skill files were installed. `doctor codex` passes project config/trust/skill checks. | Needs a fresh Codex session and OAuth/API auth before MCP generation tools appear in-session. | Open a fresh Codex session in this repo; complete AIDesigner sign-in if prompted. |
| Marketplace sales | Launch kit + sample ready | Upwork/Fiverr positioning, profile copy, gigs, buyer requirements, proposal template, and first-week action plan exist at `docs/sales/Marketplace-Launch-Kit.md`. Portfolio sample PDF exists at `docs/sales/rendered/marketplace-portfolio-sample.pdf`. | User must create/login to Upwork and Fiverr accounts and provide any required identity/tax/profile info. | Publish first Upwork/Fiverr offers and use the PDF/screenshots as proof assets. |

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
Primary: QA owner sign-in, run `docs/backend/Supabase-Owner-RLS-Hardening.sql`, and verify the private queue + hidden `?diagnostic=mobile-detailing` page on the live domain.

Fallback (repo-local if logins block progress): run `npm run diagnostic:verify`, then deploy + browser-QA `thurrsolutions.com/diagnostic/mobile-detailing`, `thurrsolutions.com/diagnostic/med-spa`, and `thurrsolutions.com/diagnostic/roofing-contractor` on the live domain (confirm rewrites + legacy redirect + `X-Robots-Tag: noindex` + title/meta + canonical path normalization), then decide when to remove `noindex` and add it to `public/sitemap.xml`.
```

Do not do yet:

```text
Auto-send generated reports without manual review.
Post lead contact details into Discord or Slack.
Expose local Ollama/Thurnos directly to the public web.
Make Slack or Notion required for the intake path.
```
