# Manual update checklist — Proposal Builder Agent (thurnos-memory)

Codex can’t write directly to `/Users/thurr/thurnos-memory`, so this checklist is for copying the staged spec into Thurnos memory safely.

## 1) Copy the spec into thurnos-memory

Copy:
- From: `/Users/thurr/Documents/New project/docs/project/ops-agent-specs/proposal-builder-agent.md`
- To: `/Users/thurr/thurnos-memory/memory/semantic/ops/proposal-builder-agent.md`

## 2) Add to Agent Command Menu (if missing)

Edit:
- `/Users/thurr/thurnos-memory/memory/semantic/ops/agent-command-menu.md`

Under “## Recommended Next Agents”, ensure this section exists:

```md
### Proposal Builder Agent

Purpose: draft clear proposals/SOWs with tight scope, assumptions, acceptance criteria, and a clean next step (no sending without approval).

Use when Thurr says:

- build a proposal
- write an SOW
- scope this project
- price this offer
- what should I charge
- rewrite this proposal to be clearer

Spec: `/Users/thurr/thurnos-memory/memory/semantic/ops/proposal-builder-agent.md`
```

## 3) Add to MEMORY.md key files index (if missing)

Edit:
- `/Users/thurr/thurnos-memory/memory/MEMORY.md`

Under “## Key Files”, ensure this line exists:

```md
- `memory/semantic/ops/proposal-builder-agent.md` — proposal/SOW drafting agent spec for tight scope boundaries, acceptance criteria, assumptions, pricing options, and a Linear activation-task template (no sending without approval)
```

