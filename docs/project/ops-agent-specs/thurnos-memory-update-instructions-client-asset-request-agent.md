# Manual sync — Client Asset Request Agent

Codex can’t write to `/Users/thurr/thurnos-memory` directly. Use this checklist to keep `thurnos-memory` in sync.

Note: as of 2026-05-06, this spec already exists in `thurnos-memory` — use this to verify parity and fix drift if needed.

## 1) Copy the spec into thurnos-memory (parity check)

- From: `/Users/thurr/Documents/New project/docs/project/ops-agent-specs/client-asset-request-agent.md`
- To: `/Users/thurr/thurnos-memory/memory/semantic/ops/client-asset-request-agent.md`

## 2) Wire into the Agent Command Menu (verify)

Edit: `/Users/thurr/thurnos-memory/memory/semantic/ops/agent-command-menu.md`

Ensure an entry exists under `## Recommended Next Agents`:

```text
### Client Asset Request Agent

Purpose: prevent delivery stalls by generating a clean asset checklist + follow-up drafts for Thurr approval (draft-only; no sending).

Use when Thurr says:

- what do I need from this client
- I’m waiting on assets
- make an assets list
- draft the asset request
- follow up for assets

Spec: `/Users/thurr/thurnos-memory/memory/semantic/ops/client-asset-request-agent.md`
```

## 3) Index in MEMORY.md (verify)

Edit: `/Users/thurr/thurnos-memory/memory/MEMORY.md`

Ensure a bullet exists under **Key Files**:

```text
- `memory/semantic/ops/client-asset-request-agent.md` — asset checklist + follow-up drafting agent spec to unblock delivery (draft-only; no sending; no secrets/PHI)
```

## 4) Notion todo hygiene (optional)

Update the “Agent Build Todo List” page to reflect Client Asset Request Agent is complete:

- https://www.notion.so/357a6f1d252381dcbd17fb27961fe0de

