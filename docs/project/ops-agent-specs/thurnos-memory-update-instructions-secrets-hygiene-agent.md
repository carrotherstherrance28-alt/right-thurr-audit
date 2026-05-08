# Manual update checklist — Secrets Hygiene Agent (thurnos-memory)

Codex can’t write directly to `/Users/thurr/thurnos-memory`, so this checklist is for copying the staged spec into Thurnos memory safely.

## 1) Copy the spec into thurnos-memory

Copy:
- From: `/Users/thurr/Documents/New project/docs/project/ops-agent-specs/secrets-hygiene-agent.md`
- To: `/Users/thurr/thurnos-memory/memory/semantic/ops/secrets-hygiene-agent.md`

## 2) Add to Agent Command Menu (if missing)

Edit:
- `/Users/thurr/thurnos-memory/memory/semantic/ops/agent-command-menu.md`

Under “## Recommended Next Agents”, ensure this section exists:

```md
### Secrets Hygiene Agent

Purpose: prevent secret leakage and draft safe rotation plans (no secrets copied, no production changes without approval).

Use when Thurr says:

- rotate keys
- scan for secrets
- I leaked a key
- check env vars
- tighten security hygiene

Spec: `/Users/thurr/thurnos-memory/memory/semantic/ops/secrets-hygiene-agent.md`
```

## 3) Add to MEMORY.md key files index (if missing)

Edit:
- `/Users/thurr/thurnos-memory/memory/MEMORY.md`

Under “## Key Files”, ensure this line exists:

```md
- `memory/semantic/ops/secrets-hygiene-agent.md` — secrets hygiene agent spec for safe key-leak detection, env-var inventory (names only), and key-rotation planning (no secrets copied, no production changes without approval)
```

