# Thurr Solutions Codex Backlog - 2026-05-07

Source: locked Thurr/Codex backlog pasted on 2026-05-07.

## Repo Reality

The pasted backlog refers to `thurrsolutions-web` as a Next.js App Router repo. The active website is currently:

`/Users/thurr/Documents/New project`

Framework: Vite + React.

Implementation tickets should target the active Vite files until Thurr explicitly approves a Next.js migration.

## NOW Queue Applied To Active Repo

| Ticket | Status | Active files |
| --- | --- | --- |
| WEB-001 - Replace homepage hero with locked copy | Implemented | `src/main.jsx`, `src/styles/app.css` |
| WEB-002 - Add Three Steps section | Implemented as `ThreeStepsSection` | `src/main.jsx`, `src/styles/app.css` |
| WEB-003 - Add Offer Ladder section | Implemented with exactly 3 cards | `src/main.jsx`, `src/styles/app.css` |
| AUD-001 - Build `/audit` page with intake form | Implemented against Vite route handling | `src/main.jsx`, `api/audit-request.js` |
| AUD-002 - Supabase migration for `audit_requests` | Implemented under `thurrsolutions` schema | `supabase/migrations/202605070001_create_audit_requests.sql` |
| AUD-004 - Build `/audit/thanks` page | Implemented | `src/main.jsx` |

## Open Repo Decisions

- `thurr-ops` still needs to be created as a separate private operations repo before OPS tickets are truly complete.
- The active website is not currently Next.js. Do not create `app/` routes in this repo unless migration is approved.
- `AUD-003` remains blocked on email service and Discord channel ID.
- `LIN-001` and `LIN-002` remain blocked on Linear API access confirmation.
- `OPS-002` and `OPS-003` remain blocked on Notion API access confirmation.

## Security Note

No live secrets belong in this repo. Use `.env.example` placeholders only and keep live values in the approved vault/local secret path.
