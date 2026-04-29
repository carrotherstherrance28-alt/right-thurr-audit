# Approved Email Delivery

Approved email delivery is the next step after manual review mode.

The rule is simple:

```text
No prospect email is sent until a generated report is approved for delivery.
```

## Endpoint

```text
POST /api/approve-report
```

Required header:

```text
x-report-approval-secret: <REPORT_APPROVAL_SECRET>
```

Fallback header for early MVP testing:

```text
x-thurnos-secret: <THURNOS_SHARED_SECRET>
```

Required body:

```json
{
  "report_id": "generated-report-uuid",
  "send_email": false
}
```

## Approval Only

Use this first:

```json
{
  "report_id": "generated-report-uuid",
  "send_email": false
}
```

Result:

- `generated_reports.report_status = approved_for_delivery`
- `buildout_requests.status = approved_for_delivery`
- `activity_logs.action_type = report_approved_for_delivery`
- no email is sent

## Approval And Email

Only use this after reviewing the report:

```json
{
  "report_id": "generated-report-uuid",
  "send_email": true
}
```

Result if email provider is configured:

- `generated_reports.report_status = delivered`
- `buildout_requests.status = delivered`
- `activity_logs.action_type = report_approved_for_delivery`
- `activity_logs.action_type = report_email_sent`
- prospect receives the approved email

If email provider env vars are missing, the report stays `approved_for_delivery`; the email is
skipped and an activity log records that delivery needs attention. A report only becomes
`delivered` after the email provider confirms the send.

## Email Provider

The MVP endpoint supports Resend first because it is simple for transactional email.

Required Vercel env vars:

```text
REPORT_APPROVAL_SECRET=
RESEND_API_KEY=
REPORT_EMAIL_FROM=
REPORT_EMAIL_REPLY_TO=
```

Recommended sender:

```text
Thurr Solutions <blueprints@thurrsolutions.com>
```

Before sending real prospect emails, verify domain DNS:

```text
SPF
DKIM
DMARC
```

## Resend Setup Steps

1. Create or open Resend.
2. Add `thurrsolutions.com` as the sending domain.
3. Copy the DNS records Resend gives you into Cloudflare exactly.
4. Keep Cloudflare proxy off for mail records.
5. Click `Verify DNS Records` in Resend.
6. Create an API key after the domain verifies.
7. Add the API key and sender variables to Vercel production.
8. Redeploy production.
9. Run the approved delivery test with your own email address first.

Helpful links:

- Resend Domains: <https://resend.com/domains>
- Resend API Keys: <https://resend.com/api-keys>
- Resend Cloudflare guide: <https://resend.com/docs/knowledge-base/cloudflare>
- Resend DMARC guide: <https://resend.com/docs/dashboard/domains/dmarc>

Recommended Vercel values:

```text
REPORT_EMAIL_FROM=Thurr Solutions <blueprints@thurrsolutions.com>
REPORT_EMAIL_REPLY_TO=blueprints@thurrsolutions.com
```

Use a real monitored inbox for `REPORT_EMAIL_REPLY_TO` before sending to prospects.

## QA Command

Approval-only test:

```bash
npm run report:delivery:test
```

Approved email-send test:

```bash
npm run report:delivery:test -- --email=you@example.com --send-email
```

The send test requires Resend to be configured in Vercel first. It creates a fresh QA buildout
request, generates a manual-review blueprint, approves it, sends to the test email, and confirms
the final Supabase statuses.

Production env status:

```text
REPORT_APPROVAL_SECRET: configured
REPORT_EMAIL_FROM: configured
REPORT_EMAIL_REPLY_TO: configured
RESEND_API_KEY: pending
```

## n8n Shape

Manual review workflow:

```text
Operator approves report
-> HTTP Request: /api/approve-report
-> send_email false for first QA
-> send_email true after email provider is verified
-> Discord operator confirmation
```

Do not connect public form submission directly to email delivery. The approval endpoint is the
trust boundary between generated draft and client-facing communication.

## Test Checklist

- [x] Create a fake QA buildout request.
- [x] Generate a blueprint draft.
- [x] Confirm report starts as `needs_review`.
- [x] Call `/api/approve-report` with `send_email: false`.
- [x] Confirm report becomes `approved_for_delivery`.
- [x] Confirm request becomes `approved_for_delivery`.
- [x] Confirm activity log contains `report_approved_for_delivery`.
- [ ] Add email provider env vars.
- [ ] Call `/api/approve-report` with `send_email: true` only for an approved test recipient.
- [ ] Confirm activity log contains `report_email_sent`.

Production approval-only verification:

```text
request_status: approved_for_delivery
report_status: approved_for_delivery
email_delivery_status: not_requested
activity: report_approved_for_delivery
```
