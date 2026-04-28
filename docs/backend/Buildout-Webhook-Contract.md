# AI Business Buildout Plan Webhook Contract

## Purpose

This contract defines the first n8n webhook for the Right Thurr AI Business Buildout Plan form.

The goal is to capture a lead, save the intake data, trigger the report generation workflow, and notify Thurr Solutions that a new blueprint request is ready.

## Frontend Endpoint

Temporary frontend behavior:

```text
Form submit -> local queued state
```

Supabase-ready frontend behavior:

```text
Form submit -> Vercel API route -> Supabase REST insert into buildout_requests
```

Production frontend behavior:

```text
POST {N8N_BUILDOUT_WEBHOOK_URL}
```

Environment variable:

```text
VITE_N8N_BUILDOUT_WEBHOOK_URL=
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Priority order:

1. If `VITE_N8N_BUILDOUT_WEBHOOK_URL` exists, submit to n8n.
2. If local Vite env variables exist, insert directly into `buildout_requests` for local development.
3. In production, submit to `/api/buildout-request`, which writes to Supabase server-side.
4. If none of those paths exist, show local queued state for demo only.

## Request Payload

```json
{
  "source": "right-thurr-buildout-page",
  "brand": "right-thurr",
  "submitted_at": "2026-04-28T00:00:00.000Z",
  "lead": {
    "name": "Therrance",
    "email": "you@example.com",
    "phone": "",
    "website_or_social": "https://example.com"
  },
  "intake": {
    "business_idea": "I want to start a mobile detailing business in Dallas.",
    "industry": "Local service",
    "main_goal": "Get leads and launch my first system",
    "location": "",
    "budget_level": "",
    "timeline": "",
    "biggest_bottleneck": ""
  },
  "routing": {
    "report_type": "right-thurr-autopilot-blueprint",
    "demo_niche": "mobile-detailing",
    "owned_brand_design": true,
    "client_reskin_required": false
  }
}
```

## Required Fields

V1 required:

- `lead.name`
- `lead.email`
- `intake.business_idea`
- `intake.industry`
- `intake.main_goal`

V1 optional:

- `lead.phone`
- `lead.website_or_social`
- `intake.location`
- `intake.budget_level`
- `intake.timeline`
- `intake.biggest_bottleneck`

## n8n Workflow Steps

```text
Webhook Trigger
-> Validate required fields
-> Normalize payload
-> Save lead to storage
-> Tag lead: Blueprint Requested
-> Generate report draft
-> Save report draft
-> Tag lead: Blueprint Ready
-> Email report or confirmation
-> Notify Slack
```

## Storage Target Options

Fast V1:

- Google Sheet

Real app:

- Supabase `buildout_requests`
- Supabase `activity_logs`
- Supabase `generated_reports`

Recommended:

Use n8n as the orchestration layer once the webhook exists. Until then, the frontend can save
requests directly into Supabase as a temporary MVP intake path.

## Supabase Insert Shape

When n8n is not configured, the Vercel API route maps the request payload into `buildout_requests`:

```json
{
  "source": "right-thurr-buildout-page",
  "brand": "right-thurr",
  "name": "Therrance",
  "email": "you@example.com",
  "phone": "",
  "website_or_social": "https://example.com",
  "business_idea": "I want to start a mobile detailing business in Dallas.",
  "industry": "Local service",
  "main_goal": "Get leads and launch my first system",
  "location": "",
  "budget_level": "",
  "timeline": "",
  "biggest_bottleneck": "",
  "report_type": "right-thurr-autopilot-blueprint",
  "status": "requested"
}
```

This requires `docs/backend/Supabase-Schema.sql` to be run first.

## Vercel API Route

Production fallback:

```text
POST /api/buildout-request
```

The API route reads Supabase credentials from Vercel environment variables server-side:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

It also supports non-Vite aliases for later cleanup:

```text
SUPABASE_URL
SUPABASE_ANON_KEY
```

This keeps the browser bundle from needing to expose the anon key directly while n8n is not connected.

## Expected n8n Response

Success:

```json
{
  "ok": true,
  "request_id": "rtb_20260428_001",
  "status": "queued",
  "message": "Blueprint queued.",
  "next_step": "Watch your inbox for the report."
}
```

Validation error:

```json
{
  "ok": false,
  "status": "validation_error",
  "message": "Name, email, and business idea are required."
}
```

System error:

```json
{
  "ok": false,
  "status": "system_error",
  "message": "Blueprint could not be queued. Try again."
}
```

## Activity Log Events

The workflow should write these events:

```text
Blueprint request received
Lead saved
Opportunity Agent started
Funnel Agent started
Revenue Agent started
Automation Agent started
Execution Agent started
Blueprint generated
Report delivery queued
Slack notification sent
```

## Report Generation Prompt Sections

The AI generation step should output:

1. Your Business Opportunity
2. Best Business Model For You
3. Revenue Potential
4. What To Build First
5. Your Funnel Strategy
6. Automation Stack Needed
7. AI Agents Needed
8. 30-Day Launch Roadmap
9. Biggest Bottlenecks
10. Recommended Next Step

## Brand Boundary

For Right Thurr owned forms:

```json
"brand": "right-thurr",
"owned_brand_design": true,
"client_reskin_required": false
```

For client diagnostic funnels:

```json
"brand": "client",
"owned_brand_design": false,
"client_reskin_required": true
```

Client funnels can use the same backend engine, but they should not inherit Right Thurr visual identity by default.
