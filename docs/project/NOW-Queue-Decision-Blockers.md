# NOW Queue — Decision Blockers (Thurr)

Last updated: 2026-05-14 (verified against source backlogs; removed stale WEB-006 hero-polish blocker that is not a current source backlog ticket)

This doc summarizes **only** the items currently sitting in the `NOW` queue that are marked **BLOCKED** and require a Thurr / Claude / client decision before Codex can safely execute the next implementation tickets.

Source backlogs:
- `/Users/thurr/Documents/New project/docs/project/Codex-Ready-Backlog.md`
- `/Users/thurr/Documents/New project/docs/project/Premium-Website-Implementation-Backlog.md` (NOW is DONE)

---

## Current `NOW` blockers (all BLOCKED)

These are the **only** items currently sitting in the `NOW` queue that require a Thurr / Claude / client decision before Codex can safely execute the next implementation tickets:

1. Website Repo Name / Branch Policy
2. Final Homepage Copy Approval
3. Audit Alert Destination (no secrets)
4. Audit Payment / Booking Flow
5. HeartPathBloom Named Reviewer (client decision)
6. HeartPathBloom Phase 1 Screen List
7. Secret Manager / Password Vault Policy

Note: There are additional `DECISION BLOCKER` items in `Codex-Ready-Backlog.md`, but they are currently in `NEXT`/`LATER` (not `NOW`) and are intentionally not tracked here.

---

## 1) Website Repo Name / Branch Policy
Backlog item: `DECISION BLOCKER — Website Repo Name / Branch Policy`

Decision needed:
- Confirm the working policy for local branches, commits, and pushes.

Helper draft (safe, no secrets):
- `docs/project/Website-Repo-Branch-Policy-Draft.md`

Suggested default (safe):
- Use local branches named `codex/<ticket-id>-<slug>`.
- Make small, logical commits.
- **Do not** push / open PRs / deploy without explicit approval.

What I need from Thurr (choose one):
- A) Keep everything local-only unless explicitly asked (recommended).
- B) Allow pushing branches + opening PRs (no deploy) when a ticket is DONE.

---

## 2) Final Homepage Copy Approval
Backlog item: `DECISION BLOCKER — Final Homepage Copy Approval`

Decision needed:
- Paste the final locked H1/subhead/primary CTA copy (or link the locked Notion section).

Why it blocks:
- Any further “premium polish” risks rewriting positioning without the locked copy.

Helper draft (safe, no secrets):
- `docs/project/Homepage-Hero-Copy-Approval-Draft.md`

What I need from Thurr:
- Final H1
- Final subhead
- Primary CTA label (destination stays `/audit`)

---

## 3) Audit Alert Destination (No secrets)
Backlog item: `DECISION BLOCKER — Audit Alert Destination`

Decision needed:
- Where new audit requests should alert (Discord/email/n8n/etc).
- Confirm **env var names only** (no values in repo).

Helper draft (safe, no secrets):
- `docs/project/Audit-Alert-Destination-Draft.md`

Suggested default (safe):
- Start with **email** destination (lowest moving parts) while validating.

What I need from Thurr:
- Destination(s): Discord, email, n8n, other
- Env var names for routing (names only)

---

## 4) Audit Payment / Booking Flow
Backlog item: `DECISION BLOCKER — Audit Payment / Booking Flow`

Decision needed (pick one):
- `form-first` (recommended while validating): submit form → confirmation/thanks → manual scheduling or follow-up
- `calendar-first`: scheduling as primary conversion
- `payment-first`: require payment before anything else

Why it blocks:
- CTAs, route ordering, and copy depend on the chosen funnel.

Helper draft (safe, no secrets):
- `docs/project/Audit-Booking-Payment-Flow-Decision-Draft.md`

What I need from Thurr:
- Pick the flow: `form-first` vs `calendar-first` vs `payment-first`

---

## 5) HeartPathBloom Named Reviewer (Client decision)
Backlog item: `DECISION BLOCKER — HeartPathBloom Named Reviewer`

Decision needed:
- Named adult human escalation reviewer + contact method.

Why it blocks:
- Any youth mental-health adjacent chat/escalation system must have a real human owner; no clinical decisioning.

Helper draft (safe, no secrets):
- `docs/project/HeartPathBloom-Named-Reviewer-Draft.md`

What I need from Thurr:
- Confirmation that client (Tisa/Kendalyn) provided: name + contact method

---

## 6) HeartPathBloom Phase 1 Screen List
Backlog item: `DECISION BLOCKER — HeartPathBloom Phase 1 Screen List`

Decision needed:
- Approve the Phase 1 screens list (explicitly excluding Phase 2 portals).

Dependency:
- Blocked until “Named Reviewer” is locked.

Helper draft (safe, no secrets):
- `docs/project/HeartPathBloom-Phase1-Scope-Draft.md`

What I need from Thurr:
- A single bullet list of Phase 1 screens, or a link to the locked Notion spec section

---

## 7) Secret Manager / Password Vault Policy
Backlog item: `DECISION BLOCKER — Secret Manager / Password Vault Policy`

Decision needed:
- Pick the vault/tool (e.g., Bitwarden) and define the rule for:
  - what lives in the vault vs
  - what lives in platform env vars (Vercel/Supabase/etc)

Non-negotiable constraints:
- No secrets in repo, chat logs, screenshots, or raw text files.

Draft (safe, no secrets):
- `docs/project/Secrets-Vault-Policy-Draft.md`

What I need from Thurr:
- Vault/tool choice
- “Source of truth” rule (vault vs platform env vars)
- Any naming conventions for env vars (names only)
