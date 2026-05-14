# Audit Alert Destination (Draft)

Owner: Thurr
Status: Draft — needs Thurr decision (no secrets)

## Purpose

Define where **new Lead Flow Audit requests** should alert, without putting any secret values in the repo.

This doc covers:
- destination choices (email / Discord / n8n / multiple)
- proposed env var **names** (names only)
- what the alert payload should contain (and exclude)

## Recommended default (safe)

Start with **email-only** alerts first (lowest moving parts), then add Discord and/or workflow automation once the routing is stable.

## Destination options (pick one)

### Option A — Email (recommended)

Pros:
- simplest to operate
- works even when chat/webhooks fail

Cons:
- less structured than a workflow tool

### Option B — Discord webhook

Pros:
- instant operator-style alerts
- easy to see in one place

Cons:
- webhook URLs are secrets
- messages can get noisy without filtering

### Option C — n8n (or similar) workflow

Pros:
- best for routing + dedupe + CRM/Notion/Linear follow-ups
- easy to extend later

Cons:
- introduces another runtime to maintain
- webhook endpoints are secrets

### Option D — Multiple destinations

Example:
- email for “failsafe”
- Discord for “immediate visibility”
- n8n for “structured routing + records”

## Proposed env var names (names only; no values)

Choose the names you want as the standard. Suggested (aligned with `THURR_*` prefix):

Email routing:
- `THURR_AUDIT_ALERT_EMAIL_TO`
- `THURR_AUDIT_ALERT_EMAIL_FROM` (optional)

Discord routing:
- `THURR_AUDIT_ALERT_DISCORD_WEBHOOK_URL`

Workflow routing:
- `THURR_AUDIT_ALERT_N8N_WEBHOOK_URL`

Mode / routing flags:
- `THURR_AUDIT_ALERT_MODE` (values like `email`, `discord`, `n8n`, `multi`)

## Payload rules (proposed)

### Include
- timestamp (UTC)
- request `id` (or generated request key)
- business name
- contact name
- email + phone (if provided)
- website URL (if provided)
- pain point summary (truncate to safe length)
- best-time-to-reach (if provided)

### Exclude / redact
- anything that looks like credentials, passwords, access links
- payment details
- any regulated healthcare info / PHI (we already avoid collecting; keep alerts clean too)

## Thurr decision to unblock `NOW`

Reply with:
1. Destination(s): `email` vs `discord` vs `n8n` vs `multi`
2. Confirm env var naming: keep the suggested names or provide your preferred names (names only)
