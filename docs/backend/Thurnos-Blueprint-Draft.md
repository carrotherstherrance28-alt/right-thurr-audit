# Thurnos Blueprint Draft Step

This is the next backend execution step after buildout intake.

## Goal

Turn a saved buildout request into an internal draft Autopilot Blueprint.

V1 must stay in manual review mode:

```txt
Intake received
-> request saved
-> Thurnos draft generated
-> report draft saved
-> Discord owner alert
-> owner reviews before sending to lead/client
```

## Local Test Command

```bash
npm run thurnos:blueprint -- docs/backend/sample-buildout-intake.json
```

Default provider:

```txt
THURNOS_PROVIDER=ollama
THURNOS_OLLAMA_MODEL=thurnos:latest
```

OpenAI provider:

```bash
THURNOS_PROVIDER=openai OPENAI_API_KEY=<server-only-key> npm run thurnos:blueprint -- docs/backend/sample-buildout-intake.json
```

Private bridge dry-run:

```bash
npm run thurnos:bridge:dry-run
```

This loads ignored `.env.local`, calls the private bridge handler with `dry_run: true`, and verifies
the secret/header/OpenAI path without saving rows to Supabase.

## Output Shape

The script returns JSON that can map into Supabase:

```json
{
  "ok": true,
  "status": "draft_generated",
  "created_by_agent": "Thurnos",
  "report_type": "right-thurr-autopilot-blueprint",
  "title": "Right Thurr Autopilot Blueprint",
  "summary": "",
  "sections": {
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
  },
  "starter_system": {
    "name": "",
    "type": "",
    "current_mission": "",
    "next_move": ""
  },
  "launch_tasks": [],
  "activity_log": []
}
```

## n8n Node Plan

Recommended first n8n implementation:

```txt
Buildout Intake Webhook
-> Save Request Through Vercel API
-> HTTP Request: Thurnos Blueprint Draft
-> Discord: Blueprint Draft Ready
-> Respond Blueprint Queued
```

The private bridge saves the generated report, starter system, launch tasks, and activity log
records. n8n does not need direct Supabase credentials for V1.

### HTTP Request: Thurnos Blueprint Draft

```txt
Method: POST
URL: https://right-thurr-audit.vercel.app/api/thurnos-blueprint
Authentication: Header Auth
Header Name: x-thurnos-secret
Header Value: {{ $env.THURNOS_SHARED_SECRET }}
Send Body: JSON
Body:
{
  "buildout_request_id": "{{ $node['Save Request Through Vercel API'].json.buildout_request_id }}",
  "payload": {{ $node["Buildout Intake Webhook"].json.body }}
}
Continue On Fail: true during first tests
```

Required Vercel server env:

```txt
SUPABASE_SERVICE_ROLE_KEY=
or SUPABASE_SECRET_KEY=
THURNOS_SHARED_SECRET=
THURNOS_PROVIDER=openai
OPENAI_API_KEY=
THURNOS_OPENAI_MODEL=gpt-5.2
```

Do not call local Ollama directly from public Vercel.

Supabase dashboard note:

```txt
Project Settings -> API -> API keys
```

If the dashboard shows `Secret keys` instead of an older `service_role` JWT, copy a secret key
value and put it in Vercel as either `SUPABASE_SERVICE_ROLE_KEY` or `SUPABASE_SECRET_KEY`.
Never place that key in browser/client env vars.

If the bridge returns `permission denied for table buildout_requests`, run:

```text
docs/backend/Supabase-Service-Role-Grants.sql
```

That grants the server-side `service_role` role access to the MVP tables while keeping RLS enabled.

For a local/private worker version later, point n8n to a private machine endpoint that runs the
same `generateBlueprintDraft` logic against Ollama.

## Private Bridge Endpoint

Live route:

```txt
POST /api/thurnos-blueprint
```

Security:

```txt
x-thurnos-secret: <same value as THURNOS_SHARED_SECRET in Vercel>
```

Request:

```json
{
  "buildout_request_id": "uuid-from-buildout-request-save",
  "payload": {
    "lead": {},
    "intake": {},
    "routing": {}
  }
}
```

Dry-run test without saving:

```json
{
  "dry_run": true,
  "payload": {
    "lead": {},
    "intake": {},
    "routing": {}
  }
}
```

Response:

```json
{
  "ok": true,
  "status": "draft_generated_and_saved",
  "buildout_request_id": "",
  "draft": {},
  "persistence": {
    "system_id": "",
    "generated_report_id": "",
    "task_ids": [],
    "activity_log_ids": []
  }
}
```

## Supabase Mapping

`generated_reports`:

```txt
buildout_request_id -> request id from save step
report_type         -> output.report_type
title               -> output.title
report_status       -> draft
summary             -> output.summary
sections            -> output.sections
created_by_agent    -> output.created_by_agent
```

`systems`:

```txt
buildout_request_id -> request id from save step
name                -> output.starter_system.name
type                -> output.starter_system.type
status              -> building
current_mission     -> output.starter_system.current_mission
next_move           -> output.starter_system.next_move
```

`tasks`:

```txt
system_id       -> starter system id
title           -> output.launch_tasks[].title
description     -> output.launch_tasks[].description
priority        -> output.launch_tasks[].priority
assigned_agent  -> output.launch_tasks[].assigned_agent
status          -> open
```

`activity_logs`:

```txt
buildout_request_id -> request id from save step
agent_name          -> output.activity_log[].agent_name
action_type         -> output.activity_log[].action_type
summary             -> output.activity_log[].summary
status              -> output.activity_log[].status
```

## Discord Draft Alert

Privacy-safe message:

```json
{
  "content": "Thurnos drafted a new Autopilot Blueprint.",
  "embeds": [
    {
      "title": "Blueprint Draft Ready",
      "description": "Review the draft before sending anything to the lead.",
      "color": 14246431,
      "fields": [
        { "name": "Status", "value": "Draft generated", "inline": true },
        { "name": "Review Mode", "value": "Manual approval required", "inline": true }
      ]
    }
  ]
}
```

Do not include email or phone in Discord by default.
