# Audit Payment / Booking Flow — Decision Draft (No-Secrets)

Purpose: unblock `DECISION BLOCKER — Audit Payment / Booking Flow` by forcing a single explicit choice so Codex can safely align CTAs, page order, and implementation tickets without guessing.

Non-goals:
- No production deployments
- No paid tool setup or purchases
- No secrets (env var **names** only, if needed)

Current state (already implemented):
- `/audit` form intake exists
- `/audit/thanks` exists with optional Loom embed via `VITE_LOOM_AUDIT_URL`

---

## Option A — `form-first` (recommended default)

Flow:
1) Visitor submits `/audit` form
2) Redirect to `/audit/thanks`
3) Manual follow-up scheduling (or later: automated booking link on thanks page)

Pros:
- Lowest friction to ship and validate demand
- No payment/booking tooling required up front
- Keeps the site focused on the audit as the “first step”

Cons:
- Requires manual ops to schedule / collect payment (until automated)

If you choose A, confirm:
- Scheduling method (pick one): `manual-email` / `manual-text` / `calendar-link`
- If `calendar-link`, provide link **destination** (no credentials)

---

## Option B — `calendar-first`

Flow:
1) Primary CTA routes to booking/scheduling first
2) Intake form happens before/after booking (your choice)

Pros:
- Faster time-to-meeting
- Can filter for seriousness by requiring a time commitment

Cons:
- Can reduce leads if calendar feels like “too much” too soon

If you choose B, confirm:
- Where booking happens: `/audit` page embed vs dedicated `/book` route
- Provider: Calendly / Google Calendar appointment schedule / other

---

## Option C — `payment-first`

Flow:
1) Visitor pays first
2) Then submits intake and/or schedules

Pros:
- Qualifies hard; reduces time-wasters

Cons:
- Highest conversion friction; requires payments wiring and refund policy clarity

If you choose C, confirm:
- Payment provider: Stripe Checkout / other
- Refund rule: `no-refunds` / `24h` / `case-by-case`

---

## Decision (Thurr picks one)

Chosen flow:
- [ ] `form-first`
- [ ] `calendar-first`
- [ ] `payment-first`

One-sentence rationale (optional):
`[PASTE HERE]`
