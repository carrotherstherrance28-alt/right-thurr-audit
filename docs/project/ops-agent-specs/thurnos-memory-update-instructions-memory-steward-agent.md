# Thurnos Memory Manual Updates (Memory Steward Agent)

Codex can’t write to `/Users/thurr/thurnos-memory`. This spec already exists in `thurnos-memory`, so this file is for parity and future edits.

## 1) (Optional) Copy the spec file for strict parity

Copy:

- From: `/Users/thurr/Documents/New project/docs/project/ops-agent-specs/memory-steward-agent.md`
- To: `/Users/thurr/thurnos-memory/memory/semantic/ops/memory-steward-agent.md`

## 2) Verify Agent Command Menu wiring

File: `/Users/thurr/thurnos-memory/memory/semantic/ops/agent-command-menu.md`

Confirm the “### Memory Steward Agent” section includes:

`Spec: \`/Users/thurr/thurnos-memory/memory/semantic/ops/memory-steward-agent.md\``

## 3) Verify MEMORY key files list

File: `/Users/thurr/thurnos-memory/memory/MEMORY.md`

Confirm “## Key Files” includes:

- `memory/semantic/ops/memory-steward-agent.md` — memory hygiene agent spec for capturing decisions, redacting sensitive values, and keeping `thurnos-memory` searchable (no secrets/PII; no production changes without approval)

