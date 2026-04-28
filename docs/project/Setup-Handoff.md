# Right Thurr Setup Handoff

## GitHub Repo

Create repo:

```text
https://github.com/new
```

Recommended:

```text
Repository name: right-thurr
Description: Right Thurr product, brand, website, and app prototype.
Visibility: Private for now
Do not add README
Do not add .gitignore
Do not add license
```

Current repo URL:

```text
https://github.com/carrotherstherrance28-alt/right-thurr-audit
```

This local folder is currently connected to:

```bash
origin https://github.com/carrotherstherrance28-alt/right-thurr-audit.git
```

Recommendation:

Use `right-thurr-audit` for the AI Business Buildout Plan / diagnostic funnel work, or rename it to `right-thurr` if this repo will become the full product and brand site.

## Vercel

Create project:

```text
https://vercel.com/new
```

Settings:

```text
Framework: Vite
Build command: npm run build
Output directory: dist
Install command: npm install
```

Environment variables:

```text
VITE_N8N_BUILDOUT_WEBHOOK_URL=
VITE_SUPABASE_URL=https://xplfryahxdegfvxmymco.supabase.co
VITE_SUPABASE_ANON_KEY=<stored in .env.local and Vercel env>
```

Leave the webhook variable empty until the n8n workflow exists.

Vercel account settings:

```text
https://vercel.com/account/settings
```

## n8n

n8n instance:

```text
https://therrancecarrothers.app.n8n.cloud/
```

Create workflow:

```text
Right Thurr - Buildout Plan Intake
```

First node:

```text
Webhook Trigger
Method: POST
Path: right-thurr/buildout-intake
```

After publishing the webhook, copy the production webhook URL into:

```text
VITE_N8N_BUILDOUT_WEBHOOK_URL
```

Payload contract:

```text
docs/backend/Buildout-Webhook-Contract.md
```

## Storage

Fast MVP:

```text
Google Sheet
```

Recommended app storage:

```text
Supabase
```

Supabase project can come after the n8n form works.

Supabase:

```text
https://supabase.com/dashboard/projects
```

Current Right Thurr Supabase project:

```text
https://supabase.com/dashboard/project/xplfryahxdegfvxmymco
```

Project ref:

```text
xplfryahxdegfvxmymco
```

Schema setup:

```text
docs/backend/Supabase-Schema.sql
```

## Current Local Commands

Install:

```bash
npm install
```

Run local app:

```bash
npm run dev -- --port 5173
```

Build:

```bash
npm run build
```

Local URL:

```text
http://localhost:5173/
```

## Current App Views

The app currently has three top-level views:

```text
Home
Buildout Plan
Thurr Solutions
```

These are internal React views for now. Formal routing can come later when deployment structure is locked.
