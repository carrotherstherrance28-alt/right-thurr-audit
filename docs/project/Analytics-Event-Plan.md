# Thurr Solutions Analytics Event Plan

This plan defines the first conversion events for the Thurr Solutions public site, AI Business Buildout Plan, and future diagnostic funnels.

The goal is not vanity tracking. The goal is to know which source, page, CTA, and follow-up path creates qualified buildout requests, generated blueprints, booked execution calls, and eventually revenue.

## Measurement Principles

- Track conversion quality, not just clicks.
- Keep public visitor data minimal and privacy-safe.
- Do not send secret keys, private notes, full blueprint text, or raw personal intake details to analytics tools.
- Use Supabase/n8n as the system-of-record for leads and reports.
- Use website analytics for funnel behavior and attribution.
- Use activity logs for backend machine actions.
- Keep event names stable so future dashboards do not break.

## Recommended Tool Order

V1:

- Vercel Analytics or Plausible for lightweight page and CTA tracking.
- Supabase for buildout request, report, task, and activity records.
- n8n execution logs for automation health.
- Discord alerts for operator visibility.

V2:

- PostHog if we need product analytics, session funnels, feature flags, or deeper app behavior.
- Google Analytics only if ad tracking, Google ecosystem reporting, or client-facing expectations require it.

Recommendation: start light. Use simple event names and Supabase records first; add heavier tools only after traffic exists.

## Core Funnel

```txt
Visitor lands
-> CTA click
-> buildout form starts
-> buildout form submitted
-> request saved
-> blueprint draft generated
-> report viewed
-> booked-call intent
-> execution/client status
```

## Event Naming

Use lowercase snake_case:

```txt
page_viewed
cta_clicked
buildout_form_started
buildout_form_submitted
buildout_request_saved
blueprint_draft_generated
blueprint_report_viewed
booking_intent_clicked
contact_email_clicked
outbound_social_clicked
owner_access_requested
owner_access_verified
automation_error_seen
```

## Shared Event Properties

Every event should include as many of these as are safely available:

```json
{
  "event_id": "uuid",
  "timestamp": "iso timestamp",
  "session_id": "anonymous session id",
  "page": "home | buildout | solutions | report | export | owner",
  "path": "/",
  "brand_context": "thurr-solutions | thurr | right-thurr-internal | client-reskin",
  "source": "direct | linkedin | instagram | youtube | referral | unknown",
  "utm_source": "",
  "utm_medium": "",
  "utm_campaign": "",
  "device_type": "desktop | tablet | mobile",
  "is_operator": false
}
```

Do not send raw email, phone, full business idea, or private report body to third-party analytics.

## CTA Events

### `cta_clicked`

Fire when a visitor clicks a primary or secondary CTA.

Examples:

- `GET MY BUILDOUT PLAN`
- `START A PROJECT`
- `Watch the system work`
- `View generated report`
- `Start a project` email link
- Future `Book execution call`

Properties:

```json
{
  "cta_label": "GET MY BUILDOUT PLAN",
  "cta_location": "home_hero | buildout_hero | solutions_hero | report_cta | footer",
  "destination": "buildout_form | mailto | report | external_booking",
  "intent": "buildout_plan | project_inquiry | proof_view | booking"
}
```

Success metric:

```txt
CTA clicks that become buildout_form_submitted or booking_intent_clicked.
```

## Buildout Form Events

### `buildout_form_started`

Fire once per session when a visitor first types into the buildout form.

Properties:

```json
{
  "form_id": "ai-business-buildout-plan",
  "first_field": "name | email | idea | industry | goal | link",
  "form_location": "home_embed | buildout_page"
}
```

### `buildout_form_submitted`

Fire when the visitor submits the form before the backend response returns.

Properties:

```json
{
  "form_id": "ai-business-buildout-plan",
  "industry": "selected industry value",
  "goal": "selected goal value",
  "has_website_or_social": true,
  "idea_length_bucket": "short | medium | long",
  "form_location": "home_embed | buildout_page"
}
```

### `buildout_request_saved`

Fire after the request is accepted by n8n or the Vercel API route.

Properties:

```json
{
  "buildout_request_id": "uuid if available",
  "submission_path": "n8n | vercel_api | supabase_direct | local_demo",
  "status": "queued | queued_supabase | queued_local",
  "report_type": "right-thurr-autopilot-blueprint"
}
```

Success metric:

```txt
Form submit rate, save success rate, and form start-to-submit conversion.
```

## Blueprint And Report Events

### `blueprint_draft_generated`

Backend event written by the Thurnos bridge or n8n.

System-of-record:

```txt
activity_logs
generated_reports
```

Properties:

```json
{
  "buildout_request_id": "uuid",
  "generated_report_id": "uuid",
  "system_id": "uuid",
  "created_by_agent": "Thurnos",
  "report_status": "draft",
  "manual_review_required": true
}
```

### `blueprint_report_viewed`

Fire when someone views a generated report or export-ready report screen.

Properties:

```json
{
  "report_type": "right-thurr-autopilot-blueprint",
  "report_status": "mock | draft | approved | sent",
  "viewer_type": "public_demo | owner | lead | client",
  "system_type": "local-service-funnel | ecommerce | content-brand | saas-tool"
}
```

Success metric:

```txt
Generated reports that lead to booking intent, project inquiry, or system launch.
```

## Booking And Contact Events

### `booking_intent_clicked`

Fire when a visitor clicks a booking, calendar, or execution-call CTA.

Properties:

```json
{
  "booking_source": "blueprint_report | solutions_page | email_followup | discord_manual",
  "offer_context": "execution_call | workflow_audit | first_system_build",
  "destination": "calendar | mailto | form | manual"
}
```

### `contact_email_clicked`

Fire when the user clicks `mailto:hello@thurrsolutions.com`.

Properties:

```json
{
  "email_context": "solutions_cta | footer | founder_section",
  "intent": "project_inquiry | general_contact"
}
```

## Social And Content Events

### `outbound_social_clicked`

Fire when a visitor clicks LinkedIn, Instagram, YouTube, GitHub, or future community links.

Properties:

```json
{
  "platform": "linkedin | instagram | youtube | github | skool | discord",
  "link_location": "founder_section | footer | content_card",
  "intent": "trust | content | community | portfolio"
}
```

Success metric:

```txt
Which social links assist buildout requests or booked calls.
```

## Owner Events

Owner events should stay separate from public funnel analytics.

Events:

```txt
owner_access_requested
owner_access_verified
owner_access_denied
```

Properties:

```json
{
  "auth_provider": "supabase_magic_link",
  "is_operator": true,
  "result": "sent | verified | denied | error"
}
```

Do not send owner email to public analytics.

## Backend Activity Events

These belong in Supabase `activity_logs`, not only website analytics:

```txt
buildout_request_received
blueprint_draft_generated
starter_system_created
launch_tasks_created
discord_notification_sent
email_delivery_queued
automation_error_detected
manual_review_completed
report_sent
booking_intent_logged
```

Every backend activity event should include:

```json
{
  "buildout_request_id": "uuid",
  "system_id": "uuid",
  "agent_name": "Thurnos | n8n | Operator Agent | Finance Agent",
  "action_type": "string",
  "summary": "operator-safe summary",
  "status": "draft | completed | failed | needs_review",
  "revenue_impact": null
}
```

## First Dashboard Views

Build these only after events are being captured:

- Source quality: source -> form starts -> submissions -> saved requests.
- Blueprint funnel: saved requests -> drafts generated -> reviewed -> sent.
- Booking funnel: report views -> booking clicks -> booked calls -> closed projects.
- Automation health: n8n success/fail count, latest error, average execution time.
- Follow-up effectiveness: sent follow-ups -> replies -> booked calls.

## Implementation Checklist

- Add a small `trackEvent()` helper in the frontend.
- Keep the helper no-op when no analytics provider is configured.
- Add event calls around CTA buttons and form state transitions.
- Add backend activity log writes for the Thurnos bridge path.
- Add UTM parsing and anonymous session ID.
- Add a privacy review before sending data to any third-party tool.
- Test event names in local dev before deploying.

## What Not To Track Yet

- Keystroke-level form analytics.
- Full session recording.
- Full lead email/phone in third-party analytics.
- Full business idea text in analytics.
- Private owner/operator screen behavior outside owner-safe product analytics.
