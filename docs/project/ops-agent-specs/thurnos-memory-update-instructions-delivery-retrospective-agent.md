# Manual sync — Delivery Retrospective Agent

Codex is sandboxed and cannot write directly to `/Users/thurr/thurnos-memory`. This folder contains a staging copy of the spec plus a checklist for syncing changes safely.

## Files

- Repo staging spec:
  - `/Users/thurr/Documents/New project/docs/project/ops-agent-specs/delivery-retrospective-agent.md`
- Thurnos memory spec (target):
  - `/Users/thurr/thurnos-memory/memory/semantic/ops/delivery-retrospective-agent.md`

## Sync checklist (safe, internal)

1. Diff the files:
   - Compare repo staging vs Thurnos memory spec.
2. If the staged version is newer, overwrite the Thurnos memory file with the staged version.
3. Verify `agent-command-menu.md` includes the agent entry:
   - `/Users/thurr/thurnos-memory/memory/semantic/ops/agent-command-menu.md`
   - Look for: “Delivery Retrospective Agent” and ensure the `Spec:` path matches.
4. Verify `MEMORY.md` contains a `Key Files` entry for this agent:
   - `/Users/thurr/thurnos-memory/memory/MEMORY.md`
5. (Optional) If you changed the agent name or trigger phrases, keep them consistent across:
   - spec file
   - agent command menu
   - MEMORY key-files list

## Copy/paste snippet — MEMORY.md (Key Files)

```text
- `memory/semantic/ops/delivery-retrospective-agent.md` — post-delivery retrospective agent spec for extracting lessons, updating runbooks/checklists/templates, and creating Linear-ready follow-ups (safe internal planning only; no deploy/publish/client comms without approval)
```

