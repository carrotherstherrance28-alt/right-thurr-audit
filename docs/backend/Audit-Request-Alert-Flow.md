# Lead Flow Audit Alert Flow

## Goal

When a new Lead Flow Audit request arrives, save the request first, then alert Thurr through a private owner channel.

## Endpoint

```text
POST /api/audit-request
```

## Required Environment Variables

```text
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

## Optional Alert Environment Variables

```text
AUDIT_REQUEST_WEBHOOK_URL=
DISCORD_OWNER_WEBHOOK_URL=
```

If neither alert variable exists, the request can still be saved. The API returns `alerted: false` so the missing alert path is visible during testing.

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
