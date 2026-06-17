# Consultation Request Alert Flow

## Goal

When a new consultation request arrives, save the request first, then alert Thurr through a private owner channel.

## Endpoint

```text
POST /api/consultation-request
```

## Required Environment Variables

```text
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

## Optional Alert Environment Variables

```text
CONSULTATION_REQUEST_WEBHOOK_URL=
AUDIT_REQUEST_WEBHOOK_URL=
DISCORD_OWNER_WEBHOOK_URL=
```

`CONSULTATION_REQUEST_WEBHOOK_URL` is preferred. `AUDIT_REQUEST_WEBHOOK_URL` remains supported as a legacy fallback. If neither alert variable exists, the request can still be saved. The API returns `alerted: false` so the missing alert path is visible during testing.

The final production destination is still a Thurr decision. Until that is locked, the repo only supports a generic environment-driven webhook hook and does not store or name a concrete channel, email address, or n8n URL.

## Alert Payload

The alert should include only operational metadata:

- Request ID (if available)
- Name
- Business
- Email
- Phone (if provided)
- Industry
- Monthly lead volume
- Website URL (if provided)
- Pain point summary

Do not send sensitive regulated details, credentials, or private client records through owner alerts.

## Local Verification

```text
npm run consultation-alert:verify
```

This checks that the endpoint uses environment variables for alert routing, skips cleanly when alert variables are absent, catches alert failures without breaking saved requests, and keeps the alert destination decision blocker open for production routing.
