# Workflow Next Step Recommendation

This compares the next backend workflow options for the Right Thurr MVP:

1. Manual review mode before reports send.
2. Email delivery.
3. CRM tagging.

## Current State

The production intake path already works:

```text
Buildout Intake Webhook
-> Save Request Through Vercel API
-> Generate Thurnos Blueprint Draft
-> Discord: Leads Alert
-> Respond Blueprint Queued
```

Verified behavior includes Supabase persistence for the buildout request, generated report, starter
system, tasks, and activity log. Discord alerts are live and privacy-safe. Slack is intentionally
non-blocking and still needs credential/channel access cleanup.

The remaining decision is what should happen after a blueprint draft exists.

## Recommendation

Build the MVP in this order:

```text
1. Manual review mode
2. Email delivery
3. CRM tagging
```

Manual review is the safest next step because the product is now generating real blueprint drafts.
Before sending those drafts to prospects automatically, Thurr Solutions needs a controlled approval
point to catch bad AI output, over-promising, missing personalization, or brand/client-boundary
issues.

Email delivery should come immediately after manual approval exists. CRM tagging should wait until
the lead lifecycle is proven because Supabase already serves as the MVP system record.

## Option 1: Manual Review Mode

### What It Adds

```text
Generate report draft
-> Save draft as pending_review
-> Notify operator in Discord
-> Operator reviews report in app/Supabase
-> Operator approves, edits, or rejects
-> Queue email delivery only after approval
```

### Pros

- Reduces the risk of automatically sending inaccurate, awkward, or promise-heavy AI reports.
- Matches the existing workflow doc rule: generate report draft, notify Thurr Solutions, manually
  approve/send.
- Lets the MVP collect real examples for improving the Thurnos prompt chain.
- Keeps private prospect data in Supabase instead of pushing more data into external tools too early.
- Gives the operator a clear quality gate before client-facing communication.

### Cons

- Slower than fully automated delivery.
- Requires at least one operator-facing review surface or a reliable Supabase-based review process.
- Adds a new status model before the full CRM/pipeline is built.

### Risks

- The approval step can become a bottleneck if alerts are missed.
- If review status is tracked loosely, reports may sit in limbo.
- Editing generated content directly in the database is workable for MVP, but not ideal long term.

### Required Accounts And Credentials

- Supabase project with server-side write access already configured in Vercel.
- Vercel server env for Supabase elevated key:

```text
SUPABASE_SERVICE_ROLE_KEY=
```

or:

```text
SUPABASE_SECRET_KEY=
```

- Existing n8n production workflow and private bridge secret:

```text
THURNOS_SHARED_SECRET=
```

- Existing Discord webhook for review-ready alerts.

No new external account is required for the first manual review pass.

### Minimum Implementation Shape

- Add report status values such as:

```text
draft_generated
pending_review
approved_for_delivery
rejected
delivered
```

- Save a review activity event:

```text
Report pending manual review
Report approved for delivery
Report rejected for revision
```

- Keep the n8n response to the public form as "queued" rather than "sent."
- Update Discord alert copy to say the blueprint draft is ready for review, not delivered.

## Option 2: Email Delivery

### What It Adds

```text
Approved report
-> Create email body or report link
-> Send to prospect
-> Save delivery event
-> Notify operator
```

### Pros

- Completes the user-facing promise: the prospect receives something after submitting the form.
- Creates a real handoff from intake to follow-up.
- Gives the MVP measurable delivery events for later analytics.
- Can start with a simple confirmation email before sending the full report.

### Cons

- Email deliverability and sender reputation need care.
- Auto-sending AI-generated reports before review is risky.
- Sending through Gmail may require manual confirmation; sending through n8n/SMTP requires provider
  setup and testing.

### Risks

- Bad report content becomes customer-facing immediately if delivery is not gated.
- Emails can land in spam if sender authentication is incomplete.
- Email templates can accidentally expose internal labels, draft statuses, or private URLs.
- Report links need access control if they include sensitive prospect details.

### Required Accounts And Credentials

Pick one MVP email path:

```text
n8n email/SMTP provider
```

or:

```text
Gmail draft/send workflow
```

Likely required values:

```text
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
FROM_EMAIL=
FROM_NAME=
```

If using a domain sender, also verify DNS records for deliverability:

```text
SPF
DKIM
DMARC
```

Email delivery should also keep Supabase as the delivery source of truth.

## Option 3: CRM Tagging

### What It Adds

```text
New buildout request
-> Create/update lead in CRM
-> Tag Blueprint Requested
-> Tag Blueprint Draft Ready
-> Tag Blueprint Delivered
-> Use CRM views for follow-up
```

### Pros

- Helps sales follow-up once lead volume increases.
- Makes pipeline status easier to manage outside the database.
- Good fit later for HubSpot, Airtable, or another sales workspace.
- Useful when multiple people need to work leads.

### Cons

- Adds a new system before the lead lifecycle is proven.
- Can duplicate data already stored in Supabase.
- Requires field mapping, dedupe rules, and failure handling.
- CRM setup can distract from finishing the customer-facing delivery loop.

### Risks

- Data drift between Supabase and the CRM.
- Duplicate contacts if email matching is not strict.
- Sensitive intake details may be pushed into a third-party tool unnecessarily.
- Workflow complexity increases before there is enough sales volume to justify it.

### Required Accounts And Credentials

Use Supabase-only for MVP. Later CRM options:

```text
Airtable API token + base/table IDs
HubSpot private app token + pipeline/stage IDs
Google Sheets credential + spreadsheet ID
```

If/when CRM tagging is added, start with a minimal field map:

```text
email
name
business_idea summary
industry
main_goal
report_status
last_activity_at
source
```

## Safest MVP Order

### 1. Manual Review Mode

Do this first. It protects the brand, gives the operator control, and matches the current state of
the workflow: reports are being generated, but the next trust boundary is client-facing delivery.

Definition of done:

- Generated reports are clearly marked `pending_review`.
- Operator receives a review-ready alert.
- Approval/rejection status is saved.
- Activity logs show review status changes.
- Public form response still says the blueprint is queued.

### 2. Email Delivery

Do this after approval exists. Start with a conservative confirmation or approved-report email, then
add richer templates once the generated reports are consistently good.

Definition of done:

- Only approved reports can be delivered.
- Delivery event is saved to Supabase.
- Email content avoids internal workflow labels.
- Failed email attempts are logged without breaking intake.
- Operator receives a delivered/failed alert.

### 3. CRM Tagging

Do this after the lead lifecycle is working end to end. Until then, Supabase remains the MVP system
record and Discord remains the internal alert channel.

Definition of done:

- CRM is chosen intentionally.
- Contact dedupe uses email as the primary key.
- CRM tags mirror Supabase statuses.
- CRM failures are non-blocking.
- Supabase remains the source of truth for generated reports and activity logs.

## Testing Checklist

### Manual Review

- Submit a valid buildout request through the production n8n webhook.
- Confirm Supabase creates:

```text
buildout_request
generated_report
system
tasks
activity_log
```

- Confirm the generated report status is `pending_review`.
- Confirm Discord alert says the report is ready for manual review.
- Approve a report and confirm status changes to `approved_for_delivery`.
- Reject a report and confirm status changes to `rejected`.
- Confirm approval/rejection writes activity log rows.
- Confirm no email is sent before approval.

### Email Delivery

- Send only from an approved report.
- Confirm email uses the intended sender name and reply-to address.
- Confirm required DNS/authentication records if using a branded sender.
- Confirm delivery success writes `Report delivered`.
- Confirm delivery failure writes `Report delivery failed`.
- Confirm the workflow still returns success for intake if the email node fails after save.
- Confirm the email does not include private internal URLs, service-role keys, webhook URLs, or
  operator-only notes.

### CRM Tagging

- Create a new lead and confirm one CRM contact is created.
- Submit a second request with the same email and confirm the CRM contact is updated, not duplicated.
- Confirm tags/statuses are applied:

```text
Blueprint Requested
Blueprint Draft Ready
Blueprint Approved
Blueprint Delivered
```

- Confirm CRM failures are logged and non-blocking.
- Confirm Supabase still has the complete source-of-truth record.
- Confirm sensitive intake fields are only synced if intentionally approved.

## Final Decision

Manual review mode should be the next backend workflow step for the MVP. Email delivery should follow
after approval exists. CRM tagging should wait until the product has a stable intake-to-approved-send
loop and enough lead volume to justify a separate sales system.
