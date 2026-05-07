# Thurnos Memory Update Instructions — Delivery QA Agent

Codex can’t write directly to `/Users/thurr/thurnos-memory`, so this file is a manual checklist for syncing the staged spec into `thurnos-memory`.

## 1) Copy the spec into thurnos-memory

- From: `/Users/thurr/Documents/New project/docs/project/ops-agent-specs/delivery-qa-agent.md`
- To: `/Users/thurr/thurnos-memory/memory/semantic/ops/delivery-qa-agent.md`

## 2) Wire into the Agent Command Menu (if missing)

File: `/Users/thurr/thurnos-memory/memory/semantic/ops/agent-command-menu.md`

Confirm this entry exists under `## Recommended Next Agents`:

```md
### Delivery QA Agent

Purpose: run a preflight QA checklist on a deliverable (proposal/deck/update/site/handoff) and return a go/no-go + fix list (draft-only; no sending/deploy/spend without approval).

Use when Thurr says:

- QA this before we send it
- is this ready to ship
- run a preflight check
- sanity check this deliverable
- final check before handoff

Spec: `/Users/thurr/thurnos-memory/memory/semantic/ops/delivery-qa-agent.md`
```

## 3) Add to Key Files index (if missing)

File: `/Users/thurr/thurnos-memory/memory/MEMORY.md`

Under `## Key Files`, confirm this line exists:

```md
- `memory/semantic/ops/delivery-qa-agent.md` — preflight QA agent spec for go/no-go checks + fix lists before anything is sent/published (draft-only; no sending/deploy/spend without approval)
```

## 4) (Optional) Agent Creation Priority

File: `/Users/thurr/thurnos-memory/memory/semantic/ops/agent-command-menu.md`

Under `## Agent Creation Priority`, confirm Delivery QA is listed (recommended placement: after `Project Closeout Agent`).

