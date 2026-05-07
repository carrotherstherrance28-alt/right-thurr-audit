# Website Connector Enhancement Backlog — 2026-05-07

## Decisions Locked

- Keep the Lead Flow Audit as a paid diagnostic, not a free audit. The current site keeps the $250 entry point and audit-credit positioning.
- Keep the intro video off the hero until Thurr's approved voiceover is added.
- Use selected work as honest proof: live, signed/in build, and proposal-stage labels.
- Public trust signals should be visible; private operations systems should stay behind the curtain.

## Decisions Needed From Thurr

- Analytics provider: Plausible, Fathom, or Vercel Analytics.
- Audit payment flow: Stripe Payment Link now, or invoice manually after review.
- Confirmation email sender: Gmail, Resend, or Postmark.
- Notion destination: use existing Command Center databases or create clean Prospects/Client Pipeline databases.
- Linear structure: one team or separate Website / Client Builds / Operations teams.
- Video: final voiceover asset URL and whether the silent draft should stay off public pages.

## NOW

TICKET: WEB-CONNECT-001 — Add privacy route and compliance trust strip  
REPO: right-thurr-audit  
BRANCH: codex/operator-core-premium-site  
GOAL: Make the audit funnel more launch-ready by adding a privacy/data-handling page and visible compliance trust signal.  
FILES: src/main.jsx, src/components/SiteChrome.jsx  
LOCKED COPY / INPUTS: Privacy page explains what the audit form collects, what not to submit, internal routing, retention, and contact. Footer trust strip: "HIPAA-aware system design. TCPA-safe follow-up architecture. COPPA-compliant where required. Compliance sign-off required before any regulated system goes live."  
DO NOT: Claim legal compliance guarantees or say HIPAA-certified.  
ACCEPTANCE: /privacy renders; footer links Privacy; footer includes compliance trust strip; npm run build passes.  
DEPENDENCIES: none  
OWNER: Codex  
PRIORITY: P0  
NOW / NEXT / LATER: NOW  

TICKET: ANALYTICS-001 — Add privacy-first analytics  
REPO: right-thurr-audit  
BRANCH: feat/privacy-first-analytics  
GOAL: Track traffic and audit-funnel conversion without collecting form-field content.  
FILES: index.html or src/main.jsx, docs/project/Analytics-Event-Plan.md  
LOCKED COPY / INPUTS: Track pageviews, /audit views, audit submit success, /audit/thanks views, homepage CTA clicks, UTM source.  
DO NOT: Add GA4, Meta Pixel, session replay, or PII tracking.  
ACCEPTANCE: Selected provider script loads only after env/provider decision; audit submit event fires without PII.  
DEPENDENCIES: Thurr decision: Plausible/Fathom/Vercel Analytics.  
OWNER: Codex after Thurr decision  
PRIORITY: P1  
NOW / NEXT / LATER: NEXT  

TICKET: N8N-001 — Audit submission owner alert workflow  
REPO: thurr-ops  
BRANCH: feat/audit-submission-flow  
GOAL: When an audit request is created, alert Thurr and send a confirmation email.  
FILES: n8n/workflows/audit-submission-flow.json  
LOCKED COPY / INPUTS: Confirmation email: "Hey {{owner_name}} — got your audit request. I'll review your answers and follow up within 1 business day with a short summary of what I'm seeing and what I'd recommend as a first step. — Thurr, Thurr Solutions"  
DO NOT: Send marketing sequences, bulk email, or ad-retargeting events.  
ACCEPTANCE: Test submission sends internal alert and prospect confirmation within 2 minutes.  
DEPENDENCIES: confirmation sender decision, n8n credentials, owner alert channel.  
OWNER: Codex / Thurr auth  
PRIORITY: P1  
NOW / NEXT / LATER: NEXT  

TICKET: NOTION-001 — Prospects database or Command Center integration  
REPO: thurr-ops  
BRANCH: feat/notion-prospects-sync  
GOAL: Route audit submissions into a trackable Notion prospect/client pipeline.  
FILES: scripts/notion or n8n workflow documentation  
LOCKED COPY / INPUTS: Fields: Name, Business, Industry, Lead Source, Process Gap, Email, Status, Source UTM, Submitted At, Next Action.  
DO NOT: Sync payment data, signed SOWs, PHI, minor data, or credentials.  
ACCEPTANCE: A test audit request creates or updates one Notion record with correct status.  
DEPENDENCIES: Notion destination decision and database schema.  
OWNER: Codex / Thurr auth  
PRIORITY: P1  
NOW / NEXT / LATER: NEXT  

TICKET: LINEAR-001 — Website launch hardening project  
REPO: Linear  
BRANCH: N/A  
GOAL: Track the remaining launch blockers in Linear without leaking client PII.  
FILES: Linear project/issues  
LOCKED COPY / INPUTS: Create issues for analytics decision, audit payment flow, email sender, Notion sync, n8n workflow, privacy review, and video voiceover.  
DO NOT: Add client emails, deal financials, or private health/youth details.  
ACCEPTANCE: Linear project exists and issues are created with NOW/NEXT/LATER labels.  
DEPENDENCIES: Linear team/project decision.  
OWNER: Thurr / Codex connector  
PRIORITY: P1  
NOW / NEXT / LATER: NEXT  

## What Not To Add Yet

- Full pricing page.
- Case study pages with performance claims.
- Blog.
- Public tool stack section.
- Meta Pixel or retargeting.
- Free audit positioning.
- Homepage hero video before Thurr voiceover exists.
