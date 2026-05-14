# Reece Credit Team — Automation + Content Gameplan (Draft)

Purpose: prepare a clean follow-up plan for a credit-repair + auto-funding team that wants (1) multi-site info extraction, (2) referral payout automation after payment, and (3) a YouTube researcher that turns videos into categorized notes.

This doc is intentionally generic (no private lead details).

## 1) Tomorrow Call: Questions That Unlock Implementation

### A. The “scrape 3 sites” request

1. What are the 3 sources (exact URLs) and what pages change most often?
2. Do we have permission/logins to access the data (or is it public)?
3. What is the output they actually want?
   - Alerts (e.g., “new rule change”)
   - A daily digest
   - A dashboard with “what matters” highlighted
4. What does “eye-pleasing” mean here?
   - One-page summary with cards
   - A notion-like knowledge base
   - A Google Sheet with clean columns + highlights
5. How fast does it need to update (hourly/daily/weekly)?
6. What’s the “stop condition” (when is the scrape done / what’s the acceptance test)?
7. Any constraints: no bots, rate limits, CAPTCHAs, paywalls, legal/compliance?

### B. Referral payout automation

1. What payment processor runs the checkout today (Stripe, Square, Authorize.net, manual invoices, etc.)?
2. What counts as “a referral” in their workflow (code, tagged lead, affiliate link, CRM field)?
3. When is payout allowed (after full payment, after refund window, after service completion)?
4. How do they pay out?
   - Cash payout (ACH, card, PayPal)
   - Store credit / account credit
   - Discount on future service
5. What are the rules?
   - Flat amount vs percentage
   - Caps per month
   - Exclusions (chargebacks/refunds)
6. Do they need audit logs and approval gates (recommended at first)?

### C. Content + “intangibles”

1. What is the 1 offer they want to sell right now?
2. Who is the buyer (consumer vs business) and what’s the #1 objection?
3. What content cadence can they sustain (2/wk, 5/wk)?
4. What proof assets exist already (before/after, testimonials, screenshots)?

## 2) Proposed System Designs (Pick One Per Lane)

### Lane 1: Multi-source “eye-pleasing” info extractor

Recommended build path:

1. **Collector**
   - Pull sources on a schedule (cron or workflow).
   - Store raw HTML/text snapshots with timestamps.
2. **Extractor**
   - Convert each page into normalized “facts” (title, sections, bullet summary, key numbers).
   - Detect diffs (“what changed since last run”).
3. **Presenter**
   - Output to one of:
     - A dashboard (cards per source + change highlights)
     - A daily email/slack digest (privacy-safe)
     - A Notion database (if they live in Notion)

Acceptance test example:

- “Every morning at 8am, I get a 1-page digest with the top 5 changes across the 3 sources, with direct links and timestamps.”

### Lane 2: Referral payouts (post-payment)

Safe default pattern (recommended):

1. **Track referral attribution** at intake (lead form / CRM).
2. **Hold payout** until payment is finalized (and optional cooldown window).
3. **Create a payout record** (immutable log, includes: payment id, referral id, rules version).
4. **Approval gate** (V1): operator clicks “approve payout”.
5. **Automated payout** (V2): connect to processor payouts once the rules are proven.

If they use Stripe:

- Stripe Checkout → webhook → compute referral payout → (V1) create “payout pending” record → (V2) Connect transfers or off-platform payout service.

### Lane 3: YouTube researcher + categorized memory

Goal:

- Given a YouTube URL (or channel + topic), output:
  - Summary
  - Key tactical bullets
  - “What we can adapt” (Thurr-specific)
  - Tags/categories (offers, pricing, outreach, delivery, compliance, etc.)

Storage options:

1. Repo-local markdown files (fastest start, versioned).
2. Notion database (if client wants a living knowledge base).
3. Airtable/Sheets (if they want structured fields).

## 3) First 48-Hour Execution Plan (Post-Call)

1. Confirm data access + legal constraints for the 3 sources.
2. Pick the output format (dashboard vs digest vs knowledge base).
3. Pick payment processor + referral rules.
4. Build V1:
   - scrape/summarize/diff MVP for the 3 sources (even if manual-run)
   - referral payout logging + approval gate (no auto payouts yet)
   - YouTube URL → summary → tagged note → saved to the chosen store

## 4) Guardrails

- No scraping behind authentication without explicit permission.
- No automatic payouts until refund/chargeback rules and audit logs are defined.
- No private client/lead details in shared channels or public dashboards.
