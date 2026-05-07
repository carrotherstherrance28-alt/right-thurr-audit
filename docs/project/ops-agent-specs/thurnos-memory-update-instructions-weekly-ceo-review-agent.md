# Manual update checklist — Weekly CEO Review Agent (thurnos-memory)

Codex can’t write directly to `/Users/thurr/thurnos-memory`, so this checklist is for copying the staged spec into Thurnos memory safely.

## 1) Copy the spec into thurnos-memory

Copy:
- From: `/Users/thurr/Documents/New project/docs/project/ops-agent-specs/weekly-ceo-review-agent.md`
- To: `/Users/thurr/thurnos-memory/memory/semantic/ops/weekly-ceo-review-agent.md`

## 2) Add to Agent Command Menu

Edit:
- `/Users/thurr/thurnos-memory/memory/semantic/ops/agent-command-menu.md`

Add a new section under “Recommended Next Agents” (suggested placement: after “Money Ops Agent”, before “Client Delivery Agent”):

```md
### Weekly CEO Review Agent

Purpose: produce a weekly CEO review brief (wins, drift, decisions needed, client + pipeline status, systems health, and next actions).

Use when Thurr says:

- run the weekly review
- prep my CEO review
- what happened this week
- what needs my attention this week
- what do I need to decide

Spec: `/Users/thurr/thurnos-memory/memory/semantic/ops/weekly-ceo-review-agent.md`
```

## 3) Add to MEMORY.md key files index

Edit:
- `/Users/thurr/thurnos-memory/memory/MEMORY.md`

Under “## Key Files”, add:

```md
- `memory/semantic/ops/weekly-ceo-review-agent.md` — weekly cadence agent spec for CEO review briefs, decisions-needed lists, and safe internal execution task creation (no spend/sends without approval)
```

## 4) Optional: update Agent Creation Priority list

If you want it reflected as a first-class agent mode, edit:
- `/Users/thurr/thurnos-memory/memory/semantic/ops/agent-command-menu.md`

Under “## Agent Creation Priority”, add:

```md
2. Weekly CEO Review Agent: weekly cadence; keeps the business from drifting.
```

Then renumber the rest.
