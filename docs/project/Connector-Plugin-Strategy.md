# Connector and Plugin Strategy

This document decides which connectors, plugins, and external tools should run Right Thurr now, which ones should wait, and why.

## Recommendation

Use a lean core stack first:

```text
GitHub -> Vercel -> Right Thurr frontend
Right Thurr form -> Supabase intake fallback
Right Thurr form -> n8n production webhook
n8n -> Supabase, Discord alerts, email, and later CRM
```

This keeps the MVP simple enough to finish while still proving the real product promise: Right Thurr can take an idea, turn it into a System, and show what the System is doing.

## Current Codex Session Connectors

Available in this session:

```text
GitHub
Gmail
Slack
Browser
Documents
Presentations
Spreadsheets
Codex automations
AIDesigner frontend skill
```

Not exposed in this session:

```text
Linear
Vercel account connector
Supabase account connector
n8n account connector
```

Linear may still be connected elsewhere in your workspace, but Codex cannot act on Linear from this thread unless a Linear tool is exposed.

## Core Build Tools

### GitHub

Use GitHub as the source of truth for code, docs, and deployment history.

Pros:

- Best place to keep the website/app code, schema docs, and workflow specs together.
- Works naturally with Vercel deployments.
- Good long-term fit for GitHub-backed system files and agent-created assets.

Cons:

- Not ideal as the daily task manager for non-technical tasks.
- Client-facing work can get messy if every small idea becomes a repo issue too early.

Recommendation:

Keep using GitHub for code and technical planning. Rename `right-thurr-audit` to `right-thurr` later only if this repo becomes the full product/app home.

### Vercel

Use Vercel for the public Right Thurr frontend.

Pros:

- Fast GitHub-based deploys.
- Environment variables can be managed outside the repo.
- Good fit for Vite/React and marketing/app hybrid pages.

Cons:

- Environment variables added after a deployment require a redeploy before the app sees them.
- Account login/passkeys need Safari or normal browser auth, not the Codex in-app browser.

Recommendation:

Keep Vercel. Add `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, and later `VITE_N8N_BUILDOUT_WEBHOOK_URL`, then redeploy `main`.

### Supabase

Use Supabase as the app database and early intake fallback.

Pros:

- Good fit for `buildout_requests`, `systems`, `activity_logs`, `generated_reports`, `tasks`, and `money_entries`.
- The public anon key can be used by the frontend when Row Level Security is enabled and policies are narrow.
- Lets the MVP capture real requests before the full n8n workflow is finished.

Cons:

- RLS mistakes can accidentally expose more data than intended.
- Direct frontend inserts are useful for MVP intake, but n8n should become the production orchestration layer.

Recommendation:

Run the schema in Supabase, keep RLS enabled, and allow only anonymous inserts into `buildout_requests`. Do not put service-role keys in the frontend or chat.

### n8n

Use n8n as the execution/orchestration layer.

Pros:

- Best fit for webhook intake, validation, AI prompt chains, report generation, CRM tagging, email/SMS, Slack alerts, and scheduled summaries.
- Keeps business logic out of the frontend.
- Easy to clone and re-skin workflows for client diagnostic funnels.

Cons:

- Webhooks need careful validation because they are externally reachable.
- Workflow sprawl can happen fast if naming and logging are sloppy.
- The test webhook URL and production webhook URL are different.

Recommendation:

Create `Right Thurr - Buildout Plan Intake` first. Use production webhook only after the workflow is activated. Every workflow should write to `activity_logs`.

## Communication and Sales Tools

### Slack

Use Slack later for client/team operations, not as the source of truth.

Pros:

- Great for “new blueprint request,” “report ready,” and “workflow failed” alerts.
- Useful for quick operator awareness.

Cons:

- Easy to lose decisions in chat.
- Client-sensitive data should be summarized carefully.

Recommendation:

Keep Slack optional for now. Use Discord for V1 internal alerts, then add Slack later only if client
operations or a team workspace truly needs it.

Current status:

The n8n Slack node is non-blocking so blueprint intake keeps working even when Slack fails. The
current n8n Slack credential returned `channel_not_found` for both `general` and `new-clients`, so
fix channel access later instead of blocking the app build.

### Discord

Use Discord as the V1 internal command center.

Pros:

- The user already uses it, so alerts are more likely to be seen.
- n8n can post to Discord with a simple channel webhook.
- Easy to organize by alert type with channels such as `#general`, `#system-activity`,
  `#errors`, `#revenue-alerts`, and `#daily-summary`.

Cons:

- Discord is less standard for B2B client-facing operations than Slack.
- A Discord webhook URL is sensitive because anyone with it can post into that channel.
- Lead contact details should not be posted by default unless the channel is private and approved.

Recommendation:

Use Discord now for internal alerts. Keep Supabase as the source of truth and post privacy-safe
summaries into Discord. Do not duplicate the same alert into Slack and Discord unless there is a
specific operational reason.

### Gmail

Use Gmail for drafting and sending report/meeting/follow-up messages later.

Pros:

- Good for real client communication.
- Good fit for thank-you emails, meeting follow-ups, referral requests, and report delivery.

Cons:

- Sending emails requires explicit action-time confirmation.
- Gmail is not a CRM or workflow database.

Recommendation:

Do not make Gmail part of V1 until the report draft flow works. Use n8n email or manual Gmail drafts first.

### CRM Options

Start with Supabase as the system record. Add a CRM only when leads need pipeline management beyond the MVP.

Options:

```text
Supabase only: best for MVP
Airtable: easier for manual review, less app-native
HubSpot: better for sales pipeline, heavier setup
Google Sheets: fastest demo, weakest app foundation
```

Recommendation:

Use Supabase now. Add Airtable or HubSpot later only if the sales process needs it.

## Task and Project Management

### Linear

Linear is useful if you want a polished task system for build work, but it is not required for the MVP.

Pros:

- Excellent for engineering-style issues, statuses, cycles, and roadmaps.
- Better than GitHub Issues for day-to-day product planning.

Cons:

- Another account/integration to maintain.
- Not currently exposed as a Codex connector in this thread.
- Can become duplicate work if GitHub docs and Build Queue are already current.

Recommendation:

Use `docs/project/Build-Queue.md` as the source of truth until a Linear connector is exposed. Once Linear is available, mirror only high-level phases and active sprint tasks, not every tiny implementation note.

## Design and Brand Tools

### AIDesigner / Claude Design

Use Claude/AIDesigner for visual exploration and Codex for implementation.

Pros:

- Good for fast visual directions, moodboards, and layout experiments.
- Matches your workflow: Claude for honing ideas, Codex as build partner.

Cons:

- Generated design output must still be translated into repo-native React/CSS.
- Brand separation can blur if prompts mix Right Thurr, Thurr Solutions, and client work.

Recommendation:

Keep the standing rule: major visual changes need 3 screenshots/options before coding. Owned-brand visuals can use Right Thurr/Thurr Solutions design language; client funnels should be re-skinnable.

## Payment, Commerce, and SMS

### Stripe / PayPal / Square

Use these after the manual money screen exists.

Pros:

- Real revenue tracking.
- Strong proof for the “machine working” dashboard.

Cons:

- Financial integrations increase security and testing requirements.
- Do not wire payouts or account-management flows early.

Recommendation:

Start with manual revenue entries. Add Stripe read-only revenue sync first.

### Twilio

Use Twilio after email follow-up works.

Pros:

- Strong for lead follow-up, reminders, and urgent service-business workflows.

Cons:

- SMS compliance, opt-in, and deliverability need care.
- Costs can climb with mistakes.

Recommendation:

Do not add Twilio to V1. Add it after the lead intake, report, and email flow are proven.

## AI and Automation Layer

### Ollama / Local Models

Use Ollama for local/private planning and generation later.

Pros:

- Strong fit for local-first AI engine branding.
- Useful for business planning, copy, code, and report drafts without making every call cloud-dependent.

Cons:

- Requires local runtime management.
- Quality depends heavily on model choice and prompt chains.

Recommendation:

Design the app as if Ollama is part of the AI Engine, but build the first MVP around clear prompt outputs and database records. Plug local models in after intake/report storage works.

## What To Connect First

1. Supabase tables.
2. Vercel environment variables.
3. n8n production webhook.
4. Form submission test.
5. Discord alert from n8n.
6. Email/report delivery draft.
7. Manual revenue entry.
8. Stripe read-only revenue sync.
9. Linear task mirror, only if the connector becomes available.
10. Twilio SMS, only after opt-in language exists.

## Sources

- Vercel environment variables: https://vercel.com/docs/environment-variables
- Supabase API keys: https://supabase.com/docs/guides/api/api-keys
- Supabase API security: https://supabase.com/docs/guides/api/securing-your-api
- n8n webhook URLs: https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/workflow-development/
- Linear API and webhooks: https://linear.app/docs/api-and-webhooks
