# Thurnos Memory Manual Updates (KPI Scoreboard Agent)

Codex can’t write to `/Users/thurr/thurnos-memory`, so apply these edits manually after copying the spec.

## 1) Add the spec file

Copy:

- From: `/Users/thurr/Documents/New project/docs/project/ops-agent-specs/kpi-scoreboard-agent.md`
- To: `/Users/thurr/thurnos-memory/memory/semantic/ops/kpi-scoreboard-agent.md`

## 2) Verify Agent Command Menu wiring

File: `/Users/thurr/thurnos-memory/memory/semantic/ops/agent-command-menu.md`

Under “### KPI Scoreboard Agent”, verify it includes:

`Spec: /Users/thurr/thurnos-memory/memory/semantic/ops/kpi-scoreboard-agent.md`

## 3) Update MEMORY key files list

File: `/Users/thurr/thurnos-memory/memory/MEMORY.md`

In “## Key Files”, add:

- `memory/semantic/ops/kpi-scoreboard-agent.md` — KPI scoreboard agent spec for weekly metric snapshots + KPI-driven Linear tasks (safe internal planning only)

