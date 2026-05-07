# Thurnos Memory Manual Updates (Right Thurr Brand Agent)

Codex can’t write to `/Users/thurr/thurnos-memory`, so apply these edits manually after copying the spec.

## 1) Add the spec file

Copy:

- From: `/Users/thurr/Documents/New project/docs/project/ops-agent-specs/right-thurr-brand-agent.md`
- To: `/Users/thurr/thurnos-memory/memory/semantic/ops/right-thurr-brand-agent.md`

## 2) Update Agent Command Menu

File: `/Users/thurr/thurnos-memory/memory/semantic/ops/agent-command-menu.md`

Add a new section under “## Recommended Next Agents”:

```md
### Right Thurr Brand Agent

Purpose: keep Right Thurr/Thurr Solutions on-brand, clearly separated, and demand-led (MVP scope + validation-first).

Use when Thurr says:

- right thurr
- is this on brand
- should we build this
- what should we ship next
- what offer should I lead with
- does this sound like Thurr Solutions or Right Thurr

Spec: `/Users/thurr/thurnos-memory/memory/semantic/ops/right-thurr-brand-agent.md`
```

## 3) Update MEMORY key files list

File: `/Users/thurr/thurnos-memory/memory/MEMORY.md`

In “## Key Files”, add:

- `memory/semantic/ops/right-thurr-brand-agent.md` — guardrail agent spec for Right Thurr/Thurr Solutions brand separation, MVP scope control, and validation-first planning (no-spend default; no external posting without approval)

