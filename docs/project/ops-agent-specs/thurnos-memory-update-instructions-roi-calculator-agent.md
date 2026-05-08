# Manual sync — ROI Calculator Agent (Thurnos memory)

Codex cannot write directly to:

- `/Users/thurr/thurnos-memory/memory/semantic/ops`
- `/Users/thurr/thurnos-memory/memory/MEMORY.md`

This file documents the manual steps to keep repo staging in parity with Thurnos memory.

## 1) Spec parity

If the Thurnos memory spec is missing or out of date, overwrite it with this staged copy:

- Source: `/Users/thurr/Documents/New project/docs/project/ops-agent-specs/roi-calculator-agent.md`
- Destination: `/Users/thurr/thurnos-memory/memory/semantic/ops/roi-calculator-agent.md`

## 2) Wiring checks

Confirm `agent-command-menu.md` includes:

- `### ROI Calculator Agent`
- `Spec: /Users/thurr/thurnos-memory/memory/semantic/ops/roi-calculator-agent.md`

Confirm `/Users/thurr/thurnos-memory/memory/MEMORY.md` includes a bullet referencing:

- `memory/semantic/ops/roi-calculator-agent.md`

## 3) Safety reminder

- Draft-only output.
- No guarantees or financial advice.
- No sending, spending, or production changes without explicit approval.

