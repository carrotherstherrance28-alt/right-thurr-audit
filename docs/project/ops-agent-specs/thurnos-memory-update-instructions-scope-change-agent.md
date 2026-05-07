# Thurnos Memory Update Instructions — Scope Change Agent

Codex can’t write directly to `/Users/thurr/thurnos-memory`, so this checklist is the safe manual sync step.

## 1) Copy the spec into thurnos-memory

- Copy from: `/Users/thurr/Documents/New project/docs/project/ops-agent-specs/scope-change-agent.md`
- Paste into: `/Users/thurr/thurnos-memory/memory/semantic/ops/scope-change-agent.md`

## 2) Add to Agent Command Menu

File:

- `/Users/thurr/thurnos-memory/memory/semantic/ops/agent-command-menu.md`

Suggested entry (paste under “## Recommended Next Agents” where it fits):

```md
### Scope Change Agent

Purpose: protect scope boundaries by turning “can you also…” requests into options (add-on / next phase / decline) with a client-safe draft reply (draft-only; no sending/contract edits without approval).

Use when Thurr says:

- is this in scope
- scope creep
- they want to add another thing
- we need a change order
- can we squeeze this in
- how do I respond to this request

Spec: `/Users/thurr/thurnos-memory/memory/semantic/ops/scope-change-agent.md`
```

## 3) Add to MEMORY.md key files index

File:

- `/Users/thurr/thurnos-memory/memory/MEMORY.md`

Expected entry:

`memory/semantic/ops/scope-change-agent.md`

## 4) Notion todo hygiene (optional)

Add or mark the agent complete on the “Agent Build Todo List” page:

- https://www.notion.so/357a6f1d252381dcbd17fb27961fe0de
