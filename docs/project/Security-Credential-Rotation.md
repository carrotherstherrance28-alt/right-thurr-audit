# Security Credential Rotation (Runbook)

Owner: Thurr

## Direct Links

- Notion checklist: https://www.notion.so/357a6f1d2523815e9180d47e8ce3bf78
- Linear task: https://linear.app/thurr-soultions/issue/THU-159/rotate-exposed-local-website-env-keys-and-confirm-tracking-path

## Non-Negotiable Rule

Never paste secret values into chat, Notion, GitHub, Linear, screenshots, Looms, or public docs.
Store values only in the password vault and/or the provider’s environment variable manager.

## Rotate When

- A key or webhook URL is accidentally exposed (screen recording, paste, commit, public link).
- A vendor reports unusual activity.
- A contractor/device/user should no longer have access.
- A project changes ownership or environments (staging/prod).

## Rotation Targets (No Values Here)

- Local website: `.env.local` values used by Vite (`VITE_*`) and serverless functions
- Hosting: Vercel / Netlify environment variables
- Automation: n8n credentials, webhook secrets, and inbound tokens
- Database: Supabase anon key and service-role key (when applicable)
- Email: Resend (or other ESP) API keys / webhooks
- Models: OpenAI / Anthropic / other providers (API keys, project keys, webhook URLs)
- Alerts: Slack/Discord/webhook URLs used for owner notifications

## Platform Places To Rotate (Fill In As Needed)

- Vercel: Project → Settings → Environment Variables
- Netlify: Site → Site configuration → Environment variables
- n8n: Credentials + webhook nodes + any inbound auth headers/tokens
- Supabase: Project settings → API keys (anon/service-role) and JWT settings if used
- Resend: API keys + webhook endpoints
- OpenAI/Anthropic: Project/API key settings in provider dashboard

## Standard Rotation Checklist

1. Create a replacement secret in the provider dashboard.
2. Update the platform environment variable(s) first (Vercel/Netlify/n8n/Supabase/etc).
3. Update local `.env.local` only if you need local dev; do not commit it.
4. Restart local dev (`npm run dev`) and verify the affected feature path.
5. Revoke/disable the old secret after verification passes.
6. Confirm the repo is not tracking env/secret files:
   - `git ls-files | rg '(^|/)(\\.env(\\.|$)|\\.pem$|\\.key$|\\.p12$)'` returns nothing except `.env.example`
   - `git status --porcelain` does not show any `.env*` files

## Local Repo Guardrails

This repo ignores `.env*`, local key files, and common credential/token export patterns via `.gitignore`.
If a vendor downloads secrets into a new filename pattern, add it to `.gitignore` before exporting/downloading again.
