# Manual sync — Client Status Update Agent

Codex can’t write to `/Users/thurr/thurnos-memory` directly. To sync this spec into Thurnos memory:

## 1) Copy the spec into thurnos-memory

- From: `/Users/thurr/Documents/New project/docs/project/ops-agent-specs/client-status-update-agent.md`
- To: `/Users/thurr/thurnos-memory/memory/semantic/ops/client-status-update-agent.md`

## 2) Wire into the Agent Command Menu

Edit: `/Users/thurr/thurnos-memory/memory/semantic/ops/agent-command-menu.md`

Add a new “Recommended Next Agents” entry (or place it near other client-facing workflow agents):

```text
### Client Status Update Agent

Purpose: draft short, accurate client-safe status updates (no sending without approval).

Use when Thurr says:

- draft a client update
- update the client
- what should I tell them
- summarize progress for the client
- write a client-safe recap

Spec: `/Users/thurr/thurnos-memory/memory/semantic/ops/client-status-update-agent.md`
```

Optional: add it to “Agent Creation Priority” if you want it ranked (suggested placement: after Client Delivery and before Project Closeout).

## 3) Index in MEMORY.md

Edit: `/Users/thurr/thurnos-memory/memory/MEMORY.md`

Add a new bullet under **Key Files**:

```text
- `memory/semantic/ops/client-status-update-agent.md` — client-safe weekly status update drafting (no sending without approval)
```

## 4) Notion todo hygiene (optional)

Update the “Agent Build Todo List” page to reflect Client Status Update Agent is complete:

- https://www.notion.so/357a6f1d252381dcbd17fb27961fe0de
