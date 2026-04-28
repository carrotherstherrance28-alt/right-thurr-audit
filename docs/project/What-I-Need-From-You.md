# What I Need From You

This is the current setup checklist for the parts that require your account access.

## 1. GitHub

Current connected repo:

```text
https://github.com/carrotherstherrance28-alt/right-thurr-audit.git
```

Direct link:

```text
https://github.com/carrotherstherrance28-alt/right-thurr-audit
```

What I need:

- Confirm whether this repo should stay named `right-thurr-audit` or be renamed to `right-thurr`.
- If you want it renamed, do it in GitHub repo settings, then send me the new URL.
- Tell me when you want me to push the current local work.

## 2. Vercel

Create/import project:

```text
https://vercel.com/new
```

Account settings:

```text
https://vercel.com/account/settings
```

What I need:

- Import the GitHub repo into Vercel.
- Set framework to Vite if Vercel does not auto-detect it.
- Send me the Vercel project URL after creation.

Recommended settings:

```text
Build command: npm run build
Output directory: dist
Install command: npm install
```

Environment variables to add later:

```text
VITE_N8N_BUILDOUT_WEBHOOK_URL=
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

## 3. n8n

n8n cloud:

```text
https://therrancecarrothers.app.n8n.cloud/
```

What I need:

- Create workflow named `Right Thurr - Buildout Plan Intake`.
- Add a `Webhook Trigger`.
- Set method to `POST`.
- Set path to `right-thurr/buildout-intake`.
- Activate the workflow.
- Send me the production webhook URL.

Expected production URL shape:

```text
https://therrancecarrothers.app.n8n.cloud/webhook/right-thurr/buildout-intake
```

## 4. Supabase

Create project:

```text
https://supabase.com/dashboard/projects
```

What I need:

- Supabase project is created:

```text
https://supabase.com/dashboard/project/xplfryahxdegfvxmymco
```

- Send me the public anon key only when we are ready to wire the frontend.
- Do not send service role keys in chat.

## 5. Domains

Recommended split:

```text
rightthurr.com       -> Right Thurr product/app/public brand
thurrsolutions.com   -> Thurr Solutions B2B services
```

Future split:

```text
app.rightthurr.com              -> logged-in Right Thurr app
diagnostic.thurrsolutions.com   -> client diagnostic funnels
```

Hold:

```text
thurrenterprise.com
```

Backup/staging:

```text
thurrsolutions.online
```

What I need:

- Confirm which domains you own or can manage DNS for.
- Tell me where DNS is managed: Cloudflare, Namecheap, Vercel, GoDaddy, etc.
- Once Vercel exists, add `rightthurr.com` first.

## 6. Visual Direction

Current options:

```text
design-options/screenshots/homepage-option-a.png
design-options/screenshots/homepage-option-b.png
design-options/screenshots/homepage-option-c.png
```

What I need:

- Pick A, B, C, or tell me what to combine.

My recommendation:

- Use Option B for the homepage.
- Use Option A for the Buildout Plan page.
- Use Option C as a brand architecture section or internal brand page.
