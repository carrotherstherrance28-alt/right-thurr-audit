# Manual sync checklist — Presentation Builder Agent

Codex cannot write directly to `/Users/thurr/thurnos-memory`, so copy + wiring must be done manually.

## 1) Copy the spec into thurnos-memory

Copy this file:

- `/Users/thurr/Documents/New project/docs/project/ops-agent-specs/presentation-builder-agent.md`

Into:

- `/Users/thurr/thurnos-memory/memory/semantic/ops/presentation-builder-agent.md`

## 2) Add to the Agent Command Menu

Edit:

- `/Users/thurr/thurnos-memory/memory/semantic/ops/agent-command-menu.md`

Add a new section (recommended under “Proposal Builder Agent” or near other sales assets agents):

```md
### Presentation Builder Agent

Purpose: draft clear slide decks (outline + slide copy + speaker notes) for proposals, Lead Flow Audits, kickoffs, and status updates (draft-only; no sending/spend without approval).

Use when Thurr says:

- build a deck
- draft slides
- make a presentation
- build a Lead Flow Audit deck
- create a kickoff deck
- summarize this into slides

Spec: `/Users/thurr/thurnos-memory/memory/semantic/ops/presentation-builder-agent.md`
```

## 3) Add to `MEMORY.md` key files list

Edit:

- `/Users/thurr/thurnos-memory/memory/MEMORY.md`

Under “## Key Files”, add:

- `memory/semantic/ops/presentation-builder-agent.md` — draft-only slide deck agent spec for proposals, Lead Flow Audits, kickoffs, and internal status decks (no sending/spend without approval)

## 4) Optional: update Agent Creation Priority list

If you want it ranked, add to:

- `/Users/thurr/thurnos-memory/memory/semantic/ops/agent-command-menu.md`

Under “## Agent Creation Priority”, suggested placement:

- After “Proposal Builder Agent” and before “Content Engine Agent”

## 5) Confirm the file exists

Verify:

- `/Users/thurr/thurnos-memory/memory/semantic/ops/presentation-builder-agent.md`

Then confirm the command menu spec link matches exactly.

