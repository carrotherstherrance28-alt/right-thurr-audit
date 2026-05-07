# Thurnos Memory Manual Updates (n8n Systems Agent)

Codex can’t write to `/Users/thurr/thurnos-memory`, so apply these edits manually after copying the spec.

## 1) Add the spec file

Copy:

- From: `/Users/thurr/Documents/New project/docs/project/ops-agent-specs/n8n-systems-agent.md`
- To: `/Users/thurr/thurnos-memory/memory/semantic/ops/n8n-systems-agent.md`

## 2) Update Agent Command Menu

File: `/Users/thurr/thurnos-memory/memory/semantic/ops/agent-command-menu.md`

Under “### n8n Systems Agent”, add:

`Spec: /Users/thurr/thurnos-memory/memory/semantic/ops/n8n-systems-agent.md`

## 3) Update MEMORY key files list

File: `/Users/thurr/thurnos-memory/memory/MEMORY.md`

In “## Key Files”, add:

- `memory/semantic/ops/n8n-systems-agent.md` — systems hygiene agent spec for workflow inventory, backups/exports, error triage, naming conventions, and safe change planning (no production edits without approval)

