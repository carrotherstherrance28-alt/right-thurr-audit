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

## V1 Importable Workflow

Starter import file:

```text
docs/backend/n8n-workflows/right-thurr-buildout-intake.json
```

V1 flow:

```text
Webhook Trigger
-> HTTP Request to https://right-thurr-audit.vercel.app/api/buildout-request
-> Respond to Webhook
```

This keeps the first n8n workflow simple. Supabase saving is already handled by the Vercel API
route, so n8n does not need Supabase credentials yet.

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
16. Slack: Notify Thurr Solutions
17. Respond to Webhook
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
