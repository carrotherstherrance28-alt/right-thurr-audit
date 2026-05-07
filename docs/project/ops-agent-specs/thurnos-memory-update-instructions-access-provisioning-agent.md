# Thurnos Memory Update Instructions — Access Provisioning Agent

Codex can’t write directly to `/Users/thurr/thurnos-memory`, so this checklist is the safe manual sync step.

## 1) Copy the spec into thurnos-memory

- Copy from: `/Users/thurr/Documents/New project/docs/project/ops-agent-specs/access-provisioning-agent.md`
- Paste into: `/Users/thurr/thurnos-memory/memory/semantic/ops/access-provisioning-agent.md`

## 2) Add to Agent Command Menu (if missing)

File:

- `/Users/thurr/thurnos-memory/memory/semantic/ops/agent-command-menu.md`

Suggested entry (paste under “## Recommended Next Agents” where it fits):

```md
### Access Provisioning Agent

Purpose: generate a least-privilege access checklist + request drafts so delivery doesn’t stall (draft-only; no credential collection).

Use when Thurr says:

- what access do we need from this client
- set up the project access
- I can’t get into their accounts
- domain / DNS / hosting access
- onboarding checklist (access)

Spec: `/Users/thurr/thurnos-memory/memory/semantic/ops/access-provisioning-agent.md`
```

## 3) Add to MEMORY.md key files index (if missing)

File:

- `/Users/thurr/thurnos-memory/memory/MEMORY.md`

Expected entry:

`memory/semantic/ops/access-provisioning-agent.md`

## 4) Notion todo hygiene (optional)

Update the “Agent Build Todo List” page to reflect Access Provisioning Agent is complete:

- https://www.notion.so/357a6f1d252381dcbd17fb27961fe0de

