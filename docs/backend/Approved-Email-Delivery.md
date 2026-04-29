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

If email provider env vars are missing, the report is approved but the email is skipped and an
activity log records that delivery needs attention.

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

- [ ] Create a fake QA buildout request.
- [ ] Generate a blueprint draft.
- [ ] Confirm report starts as `needs_review`.
- [ ] Call `/api/approve-report` with `send_email: false`.
- [ ] Confirm report becomes `approved_for_delivery`.
- [ ] Confirm request becomes `approved_for_delivery`.
- [ ] Confirm activity log contains `report_approved_for_delivery`.
- [ ] Add email provider env vars.
- [ ] Call `/api/approve-report` with `send_email: true` only for an approved test recipient.
- [ ] Confirm activity log contains `report_email_sent`.

