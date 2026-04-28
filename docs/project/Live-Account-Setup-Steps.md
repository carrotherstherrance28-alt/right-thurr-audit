# Live Account Setup Steps

Use this when the browser dashboard is open and logged in. These are the account-side steps Codex cannot complete while the dashboard is at a login wall.

## 1. Vercel Project

Project dashboard:

```text
https://vercel.com/dashboard
```

Expected project:

```text
right-thurr-audit
```

Recommended build settings:

```text
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
Root Directory: ./
Production Branch: main
```

Environment variables:

```text
VITE_SUPABASE_URL=https://xplfryahxdegfvxmymco.supabase.co
VITE_SUPABASE_ANON_KEY=<stored locally in ignored .env.local>
SUPABASE_URL=https://xplfryahxdegfvxmymco.supabase.co
SUPABASE_ANON_KEY=<stored locally in ignored .env.local>
VITE_N8N_BUILDOUT_WEBHOOK_URL=<add after n8n webhook exists>
```

The production form can submit through `/api/buildout-request`, so `VITE_SUPABASE_ANON_KEY` may stay marked Sensitive in Vercel. The browser bundle does not need to expose it for the MVP intake path.

The serverless API route reads `SUPABASE_URL` and `SUPABASE_ANON_KEY` at runtime. These were added with Vercel CLI for the `right-thurr-audit` Production environment.

After adding or changing environment variables, redeploy the latest `main` deployment.

## 2. Supabase Tables

SQL editor:

```text
https://supabase.com/dashboard/project/xplfryahxdegfvxmymco/sql/new
```

Run:

```text
docs/backend/Supabase-Schema.sql
```

This creates the MVP tables:

```text
buildout_requests
systems
system_assets
generated_reports
activity_logs
tasks
money_entries
```

RLS stays enabled. Public anonymous users can only insert buildout requests where `brand = 'right-thurr'`.

## 3. n8n Intake Workflow

n8n cloud:

```text
https://therrancecarrothers.app.n8n.cloud/
```

Workflow name:

```text
Right Thurr - Buildout Plan Intake
```

Webhook:

```text
Method: POST
Path: right-thurr/buildout-intake
```

Expected production URL:

```text
https://therrancecarrothers.app.n8n.cloud/webhook/right-thurr/buildout-intake
```

Once the production webhook exists, add it to Vercel and local `.env.local` as:

```text
VITE_N8N_BUILDOUT_WEBHOOK_URL=
```

## 4. Domains

Recommended first production domain:

```text
rightthurr.com
```

Recommended services domain:

```text
thurrsolutions.com
```

Future subdomains:

```text
app.rightthurr.com
diagnostic.thurrsolutions.com
```

Hold for later:

```text
thurrenterprise.com
thurrsolutions.online
```
