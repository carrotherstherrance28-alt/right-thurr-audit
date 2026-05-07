# Thurnos Memory Manual Updates (Compliance Guard Agent)

Codex can’t write to `/Users/thurr/thurnos-memory`, so apply these edits manually after copying the spec.

## 1) Add the spec file

Copy:

- From: `/Users/thurr/Documents/New project/docs/project/ops-agent-specs/compliance-guard-agent.md`
- To: `/Users/thurr/thurnos-memory/memory/semantic/ops/compliance-guard-agent.md`

## 2) Update Agent Command Menu

File: `/Users/thurr/thurnos-memory/memory/semantic/ops/agent-command-menu.md`

Under “### Compliance Guard Agent”, add:

`Spec: /Users/thurr/thurnos-memory/memory/semantic/ops/compliance-guard-agent.md`

## 3) Update MEMORY key files list

File: `/Users/thurr/thurnos-memory/memory/MEMORY.md`

In “## Key Files”, add:

- `memory/semantic/ops/compliance-guard-agent.md` — risk triage + safe requirements agent spec for healthcare/hospice, minors, insurance, finance, and sensitive-data workflows (not legal advice; no sensitive data stored)

