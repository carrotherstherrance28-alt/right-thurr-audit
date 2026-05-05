# Linear Mirror Scope (Decision)

Last updated: 2026-04-30

## Decision

Use Linear for high-level visibility only (phases, blockers, and current sprint). Keep `docs/project/Build-Queue.md` as the canonical, detailed source of truth for build work until a dedicated connector exists.

## Why

- The build is moving quickly and needs one “truth” document with full technical notes and file references.
- Linear is best used for stakeholder visibility and prioritization, not microtask checklists.
- We must avoid leaking private lead/client data into third-party tools or public issues.

## What goes in Linear

- Phase-level epics (Foundation, Owned Websites, App MVP, Backend Execution Engine, Client Diagnostic Engine).
- “Now” tasks (1–5 items) that match the current week/sprint.
- Explicit blockers that require user-owned logins/keys (Supabase dashboard, Vercel, n8n, Slack, Cloudflare).
- Release notes / updates (weekly or when a milestone ships).

## What does NOT go in Linear

- Private lead details (names, phone numbers, emails, addresses, intake payloads).
- Secrets, keys, webhook URLs, or environment variable values.
- High-churn implementation subtasks that belong in `Build-Queue.md`.

## Operating rhythm

1. Every build session: complete one repo task; update `Build-Queue.md` and `Connector-Task-Status.md`.
2. End of day: mirror only the top-level changes into Linear as an update or by moving one high-level issue.
3. If a blocker appears: create/mark a Linear blocker issue and link to the repo doc section (no secrets).

## Suggested Linear structure (when you set it up)

- Project: “Right Thurr / Thurr Solutions Buildout Engine”
- Views:
  - “Now” (current sprint)
  - “Blockers”
  - “Shipped”
- Labels: `phase-1` … `phase-5`, `blocked`, `security`, `ux`, `ops`

## Canonical files

- Build queue: `docs/project/Build-Queue.md`
- Connector status: `docs/project/Connector-Task-Status.md`
- Linear update template: `docs/project/Linear-Update-2026-04-29.md`

