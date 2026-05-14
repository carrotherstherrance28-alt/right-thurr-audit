# Secrets Vault Policy (Draft)

Owner: Thurr
Status: Draft — needs Thurr decision

## Purpose

Keep all secret **values** out of:
- git repos
- chat logs
- screenshots / Looms
- Notion pages (unless in a private, access-controlled vault integration)

…and define a simple “source of truth” rule so the team knows where to put things.

## Scope

This policy covers:
- API keys, tokens, webhook URLs with embedded secrets
- passwords, passkeys, SSH keys, private keys, signing secrets
- Supabase `service_role` keys and JWT secrets
- email provider keys (Resend, etc)
- automation credentials (n8n, Zapier, Make, etc)
- deploy platform secrets (Vercel/Netlify env vars)

This policy does **not** cover:
- public IDs, project refs, or non-secret URLs
- environment variable **names** (names are fine in repo docs)

## Recommended tool (decision)

Pick one vault as the default:
- **Bitwarden** (recommended default): strong sharing, good cross-platform, team-friendly.
- **1Password**: excellent UX; widely used for teams.

Decision required:
- Which vault is the official “secret value store”?

## Core rules (proposed)

### 1) Source of truth

**Secret values live in the vault.**
Platforms (Vercel/Netlify/Supabase/n8n) are allowed to store secrets too, but the vault remains the canonical record.

Practical meaning:
- If you rotate a key in a provider dashboard, update the vault entry immediately.
- If you add a new env var in Vercel/Netlify, also add/update the vault entry.

Decision required:
- Confirm “vault is source of truth” vs “platform is source of truth”.

### 2) Never commit secrets

Non-negotiable:
- No `.env.local`, `.env.*`, `*.pem`, `*.key`, `*.p12`, credential JSON, or downloaded OAuth client secrets in git.
- Secret scanning findings mean rotate + invalidate, not “delete and hope”.

### 3) Environment separation

Maintain separate credentials per environment:
- `dev`
- `staging` (optional)
- `prod`

Never reuse prod keys in dev.

### 4) Naming conventions (names only)

Use consistent env var prefixes and keep values elsewhere.

Client app (Vite):
- `VITE_*` only for values safe to expose to the browser (still treat as secrets where applicable, but remember they’re public by design).

Server-only (functions, automations, DB admin):
- Prefer `THURR_*` for owner/system secrets.
- Prefer `CLIENT_*` (or project-specific prefix) for client credentials.

Examples (names only):
- `THURR_ALERT_DISCORD_WEBHOOK_URL`
- `THURR_AUDIT_ALERT_EMAIL_TO`
- `THURR_SUPABASE_SERVICE_ROLE_KEY`
- `CLIENT_RESEND_API_KEY`

Decision required:
- Confirm preferred prefix scheme: `THURR_*` + `CLIENT_*` (or another standard).

### 5) Access control

Default access posture:
- Least privilege (only grant access to what a person needs)
- 2FA required for vault accounts and deploy platforms
- Shared items go in a shared collection/vault folder (not DMs)

### 6) Sharing secrets

Allowed:
- vault sharing to specific people/roles
- provider-managed environment variables (Vercel/Netlify/Supabase)

Not allowed:
- pasting values into Slack/Discord/Notion comments/PRs
- putting values into tickets (Linear/GitHub issues)

### 7) Rotation and incident response

When a secret might be exposed:
1. Rotate in provider dashboard
2. Update platform env vars
3. Update vault entry
4. Revoke old key
5. Record rotation date in the vault item notes (no values)

Reference runbook:
- `docs/project/Security-Credential-Rotation.md`

## Minimal onboarding checklist (proposed)

1. Create vault account + enable 2FA
2. Join shared collection
3. Confirm access to deploy platform (Vercel/Netlify) without downloading secrets
4. Confirm access to Supabase project role(s)
5. Confirm automation tool access (n8n) via role-based credentials

## Thurr decisions to unblock `NOW`

Reply with:
1. Vault choice: Bitwarden vs 1Password
2. Source of truth: vault vs platform env vars
3. Prefix scheme: `THURR_*` / `CLIENT_*` (or your preferred standard)
