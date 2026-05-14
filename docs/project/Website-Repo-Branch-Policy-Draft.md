# Website Repo Branch / Commit Policy (Draft)

Owner: Thurr
Status: Draft — needs Thurr decision

## Purpose

Set a simple, repeatable workflow for Codex changes in this repo without accidentally:
- pushing to origin
- deploying production
- mixing unrelated work in one working tree
- losing work because the working tree was already dirty

## Recommended default (safe)

Default policy:
- **Local branches are OK**
- **Local commits are OK**
- **No pushing / PRs / deploys** unless explicitly requested

Branch naming:
- `codex/<ticket-id>-<short-slug>` (example: `codex/AUD-002-audit-alerts`)

Commit style:
- small, logical commits
- include ticket ID in the subject line when practical

Start-of-work hygiene:
- If the working tree is already dirty, Codex should first:
  - identify whether changes are related to the current ticket
  - if unrelated, **leave them untouched** and work in a fresh branch (or stop and ask if the repo state looks risky)
- Prefer keeping one ticket’s changes isolated (avoid “mega commits”).

## Alternative policies (pick one)

### Option A — Local-only (recommended)

Codex may:
- create local branches
- commit locally

Codex may NOT:
- push branches
- open PRs
- deploy (Netlify/Vercel)

### Option B — Push + PR allowed (no deploy)

Codex may:
- push branches
- open PRs for review

Codex may NOT:
- deploy to production

### Option C — No branches, no commits (working tree only)

Codex may:
- change files in place

Codex should NOT:
- create branches
- commit

This is the least safe operationally (harder to review/rollback), but may match your preference.

## Guardrails (non-negotiable)

- No secrets in git, docs, screenshots, or chat logs (values never committed).
- No production deploys without explicit approval.
- No paid credits or external spend.
- No client messaging, no production n8n edits.

## “Done” definition (for Codex tickets)

When a ticket is marked DONE, Codex should include:
- Ticket ID(s) completed
- Changed files list
- Verification run (only when relevant, e.g. `npm run build` for website code)
- Any blockers/decisions needed next

## Thurr decision to unblock `NOW`

Reply with:
1. Choose policy: Option A vs B vs C
2. Confirm branch prefix convention (keep `codex/` or provide preferred)
