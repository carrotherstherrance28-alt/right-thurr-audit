# Thurnos Memory Manual Updates (Project Closeout Agent)

Codex can’t write to `/Users/thurr/thurnos-memory`, so apply these edits manually after copying the spec.

## 1) Add the spec file

Copy:

- From: `/Users/thurr/Documents/New project/docs/project/ops-agent-specs/project-closeout-agent.md`
- To: `/Users/thurr/thurnos-memory/memory/semantic/ops/project-closeout-agent.md`

## 2) Verify Agent Command Menu entry exists

File: `/Users/thurr/thurnos-memory/memory/semantic/ops/agent-command-menu.md`

Under “### Project Closeout Agent”, ensure this line exists:

`Spec: /Users/thurr/thurnos-memory/memory/semantic/ops/project-closeout-agent.md`

## 3) Verify MEMORY key files entry exists

File: `/Users/thurr/thurnos-memory/memory/MEMORY.md`

In “## Key Files”, ensure this entry exists:

- `memory/semantic/ops/project-closeout-agent.md` — closeout + handoff agent spec for deliverables checklists, internal runbooks, acceptance checks, and maintenance/retainer boundaries (no production changes or client comms without approval)

