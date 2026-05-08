# Thurnos Memory Manual Updates (Release Gate Agent)

Codex can’t write to `/Users/thurr/thurnos-memory`, so use this as a manual parity checklist.

Note: `release-gate-agent.md` already exists in `thurnos-memory` today; this staged copy is for repo ↔ memory parity.

## 1) (Optional) Sync the spec file

Compare:

- Repo staging: `/Users/thurr/Documents/New project/docs/project/ops-agent-specs/release-gate-agent.md`
- Thurnos memory: `/Users/thurr/thurnos-memory/memory/semantic/ops/release-gate-agent.md`

If they differ and you want parity, overwrite the `thurnos-memory` version with the staged one.

## 2) (Optional) Verify command menu wiring

File: `/Users/thurr/thurnos-memory/memory/semantic/ops/agent-command-menu.md`

Ensure this spec line exists under “### Release Gate Agent”:

`Spec: /Users/thurr/thurnos-memory/memory/semantic/ops/release-gate-agent.md`

## 3) (Optional) Verify MEMORY key files list

File: `/Users/thurr/thurnos-memory/memory/MEMORY.md`

In “## Key Files”, ensure an entry exists for:

- `memory/semantic/ops/release-gate-agent.md` — release readiness gate agent spec for cross-system shipping (website + Supabase + n8n), rollback-aware plans, and GO/NO-GO recommendations (safe internal planning only; no deploy/changes/sends/spend without approval)

