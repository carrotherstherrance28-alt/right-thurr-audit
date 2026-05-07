# Manual sync checklist — Offer Packaging Agent

Codex runs in a sandbox that can’t write to `/Users/thurr/thurnos-memory` directly. This file is the manual parity checklist.

## 1) Copy the spec into Thurnos memory

- Copy:
  - `/Users/thurr/Documents/New project/docs/project/ops-agent-specs/offer-packaging-agent.md`
- To:
  - `/Users/thurr/thurnos-memory/memory/semantic/ops/offer-packaging-agent.md`

## 2) Verify wiring (should already be done)

These are expected to already reference the spec:

- `/Users/thurr/thurnos-memory/memory/semantic/ops/agent-command-menu.md`
  - Should include: `Spec: /Users/thurr/thurnos-memory/memory/semantic/ops/offer-packaging-agent.md`
- `/Users/thurr/thurnos-memory/memory/MEMORY.md`
  - Should include: `memory/semantic/ops/offer-packaging-agent.md`

If either reference is missing, add it using the same formatting as nearby agent entries.

## 3) Optional planning hygiene (safe internal only)

- If you keep a Notion “Agent Build Todo List”, mark “Offer Packaging Agent” as built/synced and move to “Parity staged” if you want a clean audit trail.

