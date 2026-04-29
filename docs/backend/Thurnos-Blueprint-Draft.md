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
-> Supabase/API: Save generated_report draft
-> Discord: Blueprint Draft Ready
-> Respond Blueprint Queued
```

### HTTP Request: Thurnos Blueprint Draft

Use this only after a private bridge exists.

```txt
Method: POST
URL: {{ $env.THURNOS_BLUEPRINT_URL }}
Authentication: Header Auth or signed secret
Send Body: JSON
Body: {{ $node["Buildout Intake Webhook"].json.body }}
Continue On Fail: true during first tests
```

Required private bridge env:

```txt
THURNOS_BLUEPRINT_URL=
THURNOS_SHARED_SECRET=
```

Do not call local Ollama directly from public Vercel.

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
