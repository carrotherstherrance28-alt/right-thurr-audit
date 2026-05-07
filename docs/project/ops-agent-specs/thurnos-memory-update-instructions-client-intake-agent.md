# Manual sync checklist — Client Intake Agent (Thurnos)

Codex can’t write directly to `/Users/thurr/thurnos-memory`, so this spec is staged in the repo first.

## 0) Reality check (likely already synced)

As of 2026-05-06, `thurnos-memory` already contains:

- `/Users/thurr/thurnos-memory/memory/semantic/ops/client-intake-agent.md`

If that file exists and looks correct, you can stop here.

## 1) Copy the spec into thurnos-memory (only if missing)

Copy:

- From: `/Users/thurr/Documents/New project/docs/project/ops-agent-specs/client-intake-agent.md`
- To: `/Users/thurr/thurnos-memory/memory/semantic/ops/client-intake-agent.md`

## 2) Wire into the Agent Command Menu (only if missing)

File:

- `/Users/thurr/thurnos-memory/memory/semantic/ops/agent-command-menu.md`

Entry (paste under “Recommended Next Agents” where it fits):

```md
### Client Intake Agent

Purpose: turn one inbound inquiry into a qualified opportunity with a clear next step, a reply draft for approval, and the minimum Notion + Linear hygiene so it doesn’t get lost (safe internal planning only).

Use when Thurr says:

- qualify this lead
- do intake on this inquiry
- what should I ask them
- should we take this client
- summarize this call / notes into an intake

Spec: `/Users/thurr/thurnos-memory/memory/semantic/ops/client-intake-agent.md`
```

## 3) Add to MEMORY.md index (only if missing)

File:

- `/Users/thurr/thurnos-memory/memory/MEMORY.md`

Add a bullet in `## Key Files` (near the other agent specs):

```md
- `memory/semantic/ops/client-intake-agent.md` — intake/qualification agent spec for turning one inbound inquiry into a qualified opportunity with a clear next step, reply draft for approval, and minimal Notion + Linear hygiene (safe internal planning only)
```

