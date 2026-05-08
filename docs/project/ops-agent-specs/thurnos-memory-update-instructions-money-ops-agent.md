# Manual update checklist — Money Ops Agent (thurnos-memory)

Codex can’t write directly to `/Users/thurr/thurnos-memory`, so this checklist is for copying the staged spec into Thurnos memory safely.

## 1) Copy the spec into thurnos-memory

Copy:
- From: `/Users/thurr/Documents/New project/docs/project/ops-agent-specs/money-ops-agent.md`
- To: `/Users/thurr/thurnos-memory/memory/semantic/ops/money-ops-agent.md`

## 2) Add to Agent Command Menu (if missing)

Edit:
- `/Users/thurr/thurnos-memory/memory/semantic/ops/agent-command-menu.md`

Under “## Recommended Next Agents”, ensure this section exists:

```md
### Money Ops Agent

Purpose: keep cash flow, invoices, retainers, subscriptions, and tax/renewal reminders clean with safe internal tasks (no moving money without approval).

Use when Thurr says:

- check my money
- what invoices are due
- what subscriptions are we paying for
- what is my runway
- prep month-end close

Spec: `/Users/thurr/thurnos-memory/memory/semantic/ops/money-ops-agent.md`
```

## 3) Add to MEMORY.md key files index (if missing)

Edit:
- `/Users/thurr/thurnos-memory/memory/MEMORY.md`

Under “## Key Files”, ensure this line exists:

```md
- `memory/semantic/ops/money-ops-agent.md` — cash-flow hygiene agent spec for invoices/retainers/subscriptions, runway snapshots, and safe internal admin tasks (no moving money without approval)
```

