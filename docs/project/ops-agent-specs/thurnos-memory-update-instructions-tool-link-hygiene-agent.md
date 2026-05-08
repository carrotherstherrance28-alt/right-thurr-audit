# Thurnos Memory Manual Updates (Tool + Direct-Link Hygiene Agent)

Codex can’t write to `/Users/thurr/thurnos-memory`. This spec already exists in `thurnos-memory`, so this file is for parity and future edits.

## 1) (Optional) Copy the spec file for strict parity

Copy:

- From: `/Users/thurr/Documents/New project/docs/project/ops-agent-specs/tool-link-hygiene-agent.md`
- To: `/Users/thurr/thurnos-memory/memory/semantic/ops/tool-link-hygiene-agent.md`

## 2) Verify Agent Command Menu wiring

File: `/Users/thurr/thurnos-memory/memory/semantic/ops/agent-command-menu.md`

Confirm the “### Tool + Direct-Link Hygiene Agent” section includes:

`Spec: \`/Users/thurr/thurnos-memory/memory/semantic/ops/tool-link-hygiene-agent.md\``

## 3) Verify MEMORY key files list

File: `/Users/thurr/thurnos-memory/memory/MEMORY.md`

Confirm “## Key Files” includes:

- `memory/semantic/ops/tool-link-hygiene-agent.md` — link hygiene agent spec for maintaining a single trustworthy link map (no secrets/tokens; no production changes without approval)
