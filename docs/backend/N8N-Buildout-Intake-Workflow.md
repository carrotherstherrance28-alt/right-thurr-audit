# n8n Workflow: Right Thurr - Buildout Plan Intake

This is the first production automation for the AI Business Buildout Plan.

## Goal

Capture a prospect, save the intake, create visible activity, generate the first blueprint draft, and notify Thurr Solutions that execution is ready.

## Trigger

```text
Node: Webhook
Method: POST
Path: right-thurr/buildout-intake
Response mode: Respond to Webhook node
```

Expected production URL:

```text
https://therrancecarrothers.app.n8n.cloud/webhook/right-thurr/buildout-intake
```

Created workflow ID:

```text
zadCesubfwS0INug
```

Production status:

```text
Active
```

Verified:

```text
Direct POST to production webhook returned 201 and saved a fake QA row to Supabase.
Vercel Production is configured with VITE_N8N_BUILDOUT_WEBHOOK_URL.
```

## Slack Alert Status

A Slack node was added after the Supabase save step:

```text
Slack: Buildout Request Alert
```

The alert is set to continue on fail so intake does not break if Slack is unavailable.

Test result:

```text
n8n intake still returns 201 and saves to Supabase.
Slack node returns channel_not_found.
```

Tried channels:

```text
general
new-clients
```

Likely fix:

```text
Reconnect or update the n8n Slack credential so it has access to the Right Thurr Slack workspace and the desired alert channel.
```

Recommended channel:

```text
new-clients
```

## Discord Alert Status

Discord is the recommended V1 operator alert channel because the user already uses it and n8n can
post to a Discord channel with a simple webhook.

Live status:

```text
Discord node added to active n8n workflow as "Discord: Leads Alert".
Continue On Fail: true
Channel: #leads-alerts
Live QA execution succeeded and ran the Discord node.
```

Recommended server/channel setup:

```text
Right Thurr HQ
#leads-alerts
#system-activity
#errors
#revenue-alerts
#daily-summary
```

Recommended first channel:

```text
#leads-alerts
```

Recommended n8n node:

```text
HTTP Request: Discord Buildout Alert
Method: POST
URL: Discord channel webhook URL
Continue On Fail: true
```

Recommended privacy-safe V1 message:

```json
{
  "content": "New Right Thurr buildout request queued.",
  "embeds": [
    {
      "title": "Right Thurr Buildout Request",
      "description": "A new AI Business Buildout Plan request was saved and queued for review.",
      "color": 14246431,
      "fields": [
        { "name": "Industry", "value": "Local service", "inline": true },
        { "name": "Goal", "value": "Get leads and launch my first system", "inline": false },
        { "name": "Status", "value": "Saved to Supabase", "inline": true },
        { "name": "Report Type", "value": "Right Thurr Autopilot Blueprint", "inline": true }
      ]
    }
  ]
}
```

Privacy rule:

```text
Do not post lead email, phone, or other sensitive lead data into Discord by default. Keep those in Supabase.
```

If the user explicitly wants lead contact info in Discord later, add it only after confirming the
channel is private and the webhook is controlled.

## V1 Importable Workflow

Starter import file:

```text
docs/backend/n8n-workflows/right-thurr-buildout-intake.json
```

V1 flow:

```text
Webhook Trigger
-> HTTP Request to https://right-thurr-audit.vercel.app/api/buildout-request
-> HTTP Request to private Thurnos blueprint bridge
-> HTTP Request to Discord webhook
-> Respond to Webhook
```

This keeps the first n8n workflow simple. Supabase saving is already handled by the Vercel API
routes, so n8n does not need Supabase credentials for V1.

Private bridge URL:

```text
https://right-thurr-audit.vercel.app/api/thurnos-blueprint
```

Private bridge header:

```text
x-thurnos-secret: {{ $env.THURNOS_SHARED_SECRET }}
```

Private bridge body:

```json
{
  "buildout_request_id": "{{ $node['Save Request Through Vercel API'].json.buildout_request_id }}",
  "payload": "{{ $node['Buildout Intake Webhook'].json.body }}"
}
```

Required Vercel server env:

```text
SUPABASE_SERVICE_ROLE_KEY=
THURNOS_SHARED_SECRET=
THURNOS_PROVIDER=openai
OPENAI_API_KEY=
THURNOS_OPENAI_MODEL=gpt-5.2
```

After importing, activate the workflow and copy the production webhook URL into Vercel:

```text
VITE_N8N_BUILDOUT_WEBHOOK_URL=https://therrancecarrothers.app.n8n.cloud/webhook/right-thurr/buildout-intake
```

## Required Payload Checks

Reject with validation error if any are missing:

```text
lead.name
lead.email
intake.business_idea
intake.industry
intake.main_goal
```

## Recommended Nodes

```text
1. Webhook Trigger
2. Code: Validate payload
3. Supabase: Insert buildout_request
4. Supabase: Insert activity_log "Blueprint request received"
5. AI: Opportunity Agent
6. AI: Funnel Agent
7. AI: Revenue Agent
8. AI: Automation Agent
9. AI: Execution Agent
10. Code: Merge blueprint sections
11. Supabase: Insert generated_report
12. Supabase: Insert starter system
13. Supabase: Insert launch tasks
14. Supabase: Insert activity_log "Blueprint generated"
15. Email: Send confirmation or report link
16. Discord: Notify Right Thurr HQ
17. Slack: Notify Thurr Solutions later if needed
18. Respond to Webhook
```

## Validation Error Response

```json
{
  "ok": false,
  "status": "validation_error",
  "message": "Name, email, business idea, industry, and main goal are required."
}
```

## Success Response

```json
{
  "ok": true,
  "status": "queued",
  "message": "Blueprint queued.",
  "next_step": "Watch your inbox for the report."
}
```

## AI Prompt Chain

Local draft script:

```bash
npm run thurnos:blueprint -- docs/backend/sample-buildout-intake.json
```

Implementation guide:

```text
docs/backend/Thurnos-Blueprint-Draft.md
```

The script is designed for a private bridge or internal worker, not direct public browser calls.
It defaults to local Ollama `thurnos:latest` and can switch to OpenAI with server-only env vars.

### Opportunity Agent

```text
You are the Right Thurr Opportunity Agent.
Find the strongest business angle from the user intake.
Return: opportunity summary, target customer, first profitable niche, and why it should be built first.
```

### Funnel Agent

```text
You are the Right Thurr Funnel Agent.
Turn the opportunity into a simple conversion path.
Return: offer, landing page sections, lead magnet, CTA, follow-up sequence, and booking/sales path.
```

### Revenue Agent

```text
You are the Right Thurr Revenue Agent.
Map how this business can make money.
Return: first offer price, upsells, recurring revenue options, expected first 30-day revenue range, and risk notes.
```

### Automation Agent

```text
You are the Right Thurr Automation Agent.
Map the workflows needed to make the system run.
Return: n8n workflows, triggers, integrations, data tables, alerts, and failure points to monitor.
```

### Execution Agent

```text
You are the Right Thurr Execution Agent.
Create the first 30 days of build tasks.
Return: weekly milestones, daily actions, dependencies, owner approvals needed, and launch checklist.
```

## Generated Report Sections

Save the report in `generated_reports.sections` as JSON:

```json
{
  "business_opportunity": "",
  "best_business_model": "",
  "revenue_potential": "",
  "what_to_build_first": "",
  "funnel_strategy": "",
  "automation_stack_needed": "",
  "ai_agents_needed": "",
  "thirty_day_launch_roadmap": "",
  "biggest_bottlenecks": "",
  "recommended_next_step": ""
}
```

## Starter Activity Log Events

Write these into `activity_logs`:

```text
Blueprint request received
Opportunity Agent started
Funnel Agent started
Revenue Agent started
Automation Agent started
Execution Agent started
Blueprint generated
Starter system created
Launch tasks created
Report delivery queued
Discord notification sent
Slack notification sent
```

## Manual Review Rule

V1 should not auto-send a high-stakes promise-heavy report without review.

Recommended first mode:

```text
Generate report draft -> notify Thurr Solutions -> manually approve/send
```

Later mode:

```text
Generate report -> send automatically -> invite user to launch first System
```
