# Codex-Ready Backlog

## 1. Website

TICKET: WEB-001 — Replace Homepage Hero Positioning
REPO: /Users/thurr/Documents/New project
BRANCH: codex/website-audit-offer-foundation
GOAL: Reposition homepage from single-niche demo to Thurr Solutions lead systems for local service businesses.
FILES: /Users/thurr/Documents/New project/src/main.jsx; /Users/thurr/Documents/New project/src/styles/app.css
LOCKED COPY / INPUTS: Lead with “Local Service Lead Systems” and the line “The audit tells us what to fix. The build fixes it. The retainer keeps it working.” Dallas Mobile Detailing becomes a demo/example, not the main offer.
DO NOT: Do not rebuild the whole homepage. Do not delete Right Thurr product/demo files. Do not add unverifiable revenue guarantees.
ACCEPTANCE: Homepage first viewport clearly sells Thurr Solutions B2B lead systems; primary CTA routes to Lead Flow Audit; Dallas Mobile Detailing is not the hero headline; mobile text fits without overlap; npm run build passes.
STATUS: DONE (2026-05-07) — Verified hero copy/CTA + build.
DEPENDENCIES: None.
OWNER: Codex
PRIORITY: P0
NOW / NEXT / LATER: NOW

TICKET: WEB-002 — Add Three-Step Operating Model Section
REPO: /Users/thurr/Documents/New project
BRANCH: codex/website-audit-offer-foundation
GOAL: Add a clear Audit → Build → Manage section to explain the buyer path.
FILES: /Users/thurr/Documents/New project/src/main.jsx; /Users/thurr/Documents/New project/src/styles/app.css
LOCKED COPY / INPUTS: Step 1: Audit the lead flow. Step 2: Build the highest-leverage fix. Step 3: Manage and improve the system after proof.
DO NOT: Do not turn this into a long explainer essay. Do not bury the CTA.
ACCEPTANCE: Section appears above detailed demos/use cases; each step has one outcome-focused sentence; CTA points to /audit; desktop and mobile layout are stable; npm run build passes.
STATUS: DONE (2026-05-07) — Three-step Audit → Build → Manage section present on homepage; verified `npm run build`.
DEPENDENCIES: WEB-001.
OWNER: Codex
PRIORITY: P0
NOW / NEXT / LATER: NOW

TICKET: WEB-003 — Add Offer Ladder Section
REPO: /Users/thurr/Documents/New project
BRANCH: codex/website-audit-offer-foundation
GOAL: Show the starter offer and upsell path without confusing buyers.
FILES: /Users/thurr/Documents/New project/src/main.jsx; /Users/thurr/Documents/New project/src/styles/app.css
LOCKED COPY / INPUTS: Cards: Lead Flow Audit $250-$350; Growth Website + Intake $750-$1,500+; Automation Build $1,500-$5,000+; Managed AI Automation $500-$1,500+/mo.
DO NOT: Do not make AI Cybersecurity a primary offer yet. Do not imply HIPAA, insurance, or compliance certification.
ACCEPTANCE: Four-card offer ladder appears on homepage; Lead Flow Audit is visibly the first step; each card has outcome, price band, CTA or next action; mobile cards do not overflow; npm run build passes.
STATUS: DONE (2026-05-07) — Homepage offer ladder updated to 4 cards w/ price bands + next actions; verified `npm run build`.
DEPENDENCIES: WEB-001.
OWNER: Codex
PRIORITY: P0
NOW / NEXT / LATER: NOW

TICKET: WEB-004 — Demote Dallas Mobile Detailing To Demo Lane
REPO: /Users/thurr/Documents/New project
BRANCH: codex/website-audit-offer-foundation
GOAL: Keep Dallas Mobile Detailing as proof/demo context while removing it from core Thurr Solutions positioning.
FILES: /Users/thurr/Documents/New project/src/main.jsx; /Users/thurr/Documents/New project/src/data/rightThurrMockData.js; /Users/thurr/Documents/New project/docs/product/Right-Thurr-Product-Spec.md
LOCKED COPY / INPUTS: Dallas Mobile Detailing may remain as a sample Right Thurr/diagnostic lane.
DO NOT: Do not delete diagnostic demo routes. Do not erase prior product documentation.
ACCEPTANCE: Homepage no longer reads like Thurr Solutions is only a detailing offer; demo language labels Dallas Mobile Detailing as example/demo; npm run build passes.
DEPENDENCIES: WEB-001.
OWNER: Codex
PRIORITY: P1
NOW / NEXT / LATER: NEXT

TICKET: WEB-005 — Add Industry Targets Strip
REPO: /Users/thurr/Documents/New project
BRANCH: codex/website-audit-offer-foundation
GOAL: Show the first target markets without overcommitting to too many verticals.
FILES: /Users/thurr/Documents/New project/src/main.jsx; /Users/thurr/Documents/New project/src/styles/app.css
LOCKED COPY / INPUTS: Priority targets: roofing/contractors, beauty/service studios, insurance agents. Healthcare/hospice appears only with compliance caution language.
DO NOT: Do not list every possible industry from notes. Do not pitch regulated healthcare automation without guardrails.
ACCEPTANCE: Site shows 3 primary target lanes and one compliance-gated lane; each lane links or scrolls to relevant examples; npm run build passes.
DEPENDENCIES: WEB-003.
OWNER: Codex
PRIORITY: P1
NOW / NEXT / LATER: NEXT

TICKET: WEB-006 — Add Compliance Guardrail Copy
REPO: /Users/thurr/Documents/New project
BRANCH: codex/website-audit-offer-foundation
GOAL: Add plain-language compliance boundaries for SMS, healthcare, youth wellness, and insurance offers.
FILES: /Users/thurr/Documents/New project/src/main.jsx; /Users/thurr/Documents/New project/src/styles/app.css
LOCKED COPY / INPUTS: “For regulated industries, Thurr Solutions builds the system and routes final public-facing copy, consent language, and policy decisions through the client’s authorized reviewer.”
DO NOT: Do not claim legal, HIPAA, COPPA, TCPA, or insurance compliance services as a standalone certification.
ACCEPTANCE: Compliance note appears near offer/use-case areas; wording is clear but not fear-based; npm run build passes.
DEPENDENCIES: WEB-003.
OWNER: Codex
PRIORITY: P1
NOW / NEXT / LATER: NEXT

TICKET: WEB-007 — Add Client Proof / Active Pipeline Section
REPO: /Users/thurr/Documents/New project
BRANCH: codex/website-audit-offer-foundation
GOAL: Show credible active project types without exposing private client details.
FILES: /Users/thurr/Documents/New project/src/main.jsx; /Users/thurr/Documents/New project/src/styles/app.css
LOCKED COPY / INPUTS: Use generalized proof: storm lead capture page, youth wellness MVP planning, insurance lead pipeline concept, contractor close system presentation.
DO NOT: Do not publish private emails, agreements, deposits, pricing that is not approved for public use, or client-sensitive healthcare/youth data.
ACCEPTANCE: Section communicates credibility without private information; no sensitive identifiers; npm run build passes.
DEPENDENCIES: WEB-003.
OWNER: Codex
PRIORITY: P2
NOW / NEXT / LATER: LATER

TICKET: WEB-008 — Add Website Tracking Documentation
REPO: /Users/thurr/Documents/New project
BRANCH: codex/website-audit-offer-foundation
GOAL: Document where website inquiries go and how Thurr checks them.
FILES: /Users/thurr/Documents/New project/docs/project/Website-Intake-Tracking.md; /Users/thurr/Documents/New project/README.md
LOCKED COPY / INPUTS: Website intake should ultimately flow to Supabase, owner alert, Notion task/client record, and Linear follow-up issue when appropriate.
DO NOT: Do not include secrets or API keys.
ACCEPTANCE: Documentation lists each intake path, data destination, owner alert destination, and manual fallback; direct Notion checklist link included; npm run build unaffected.
DEPENDENCIES: AUD-002; AUD-003; NOT-002; LIN-002.
OWNER: Codex
PRIORITY: P2
NOW / NEXT / LATER: LATER

TICKET: DECISION BLOCKER — Website Repo Name / Branch Policy
REPO: /Users/thurr/Documents/New project
BRANCH: Claude/Thurr decision needed
GOAL: Confirm whether branches should be created locally, committed directly, or left uncommitted for review.
FILES: Claude/Thurr decision needed
LOCKED COPY / INPUTS: Current local repo is Vite/React, not Next.js App Router.
DO NOT: Do not assume production deploy workflow.
ACCEPTANCE: Thurr confirms branch/commit/deploy policy.
STATUS: BLOCKED (2026-05-07) — Needs Thurr decision. Suggested default: work on local branches named `codex/<ticket-id>-<slug>`, commit small logical changes, do not push or deploy without explicit approval.
DEPENDENCIES: None.
OWNER: Thurr
PRIORITY: P0
NOW / NEXT / LATER: NOW

TICKET: DECISION BLOCKER — Final Homepage Copy Approval
REPO: /Users/thurr/Documents/New project
BRANCH: Claude/Thurr decision needed
GOAL: Lock final hero headline/subhead/CTA wording before production polish.
FILES: Claude/Thurr decision needed
LOCKED COPY / INPUTS: Claude owns final copy critique.
DO NOT: Do not ask Codex to invent premium positioning from scratch.
ACCEPTANCE: Approved copy pasted into ticket or Notion page.
STATUS: BLOCKED (2026-05-07) — Needs Claude/Thurr to paste the final H1/subhead/primary CTA copy (or link the locked Notion section) so polish can proceed without guesswork.
DEPENDENCIES: None.
OWNER: Claude/Thurr
PRIORITY: P0
NOW / NEXT / LATER: NOW

TICKET: DECISION BLOCKER — Production Deploy Target
REPO: /Users/thurr/Documents/New project
BRANCH: Claude/Thurr decision needed
GOAL: Confirm whether site deploys to Vercel, Netlify, or both.
FILES: Claude/Thurr decision needed
LOCKED COPY / INPUTS: Repo contains vercel.json and Vite app.
DO NOT: Do not deploy production without approval.
ACCEPTANCE: Thurr confirms deploy platform and production domain.
DEPENDENCIES: WEB-001.
OWNER: Thurr
PRIORITY: P1
NOW / NEXT / LATER: NEXT

## 2. Intro Video

TICKET: VID-001 — Verify Website Intro Video Embed Path
REPO: /Users/thurr/Documents/New project
BRANCH: codex/website-audit-offer-foundation
GOAL: Make sure the homepage intro video component works before the final video asset exists.
FILES: /Users/thurr/Documents/New project/src/main.jsx; /Users/thurr/Documents/New project/src/styles/app.css; /Users/thurr/Documents/New project/public/media
LOCKED COPY / INPUTS: Video path: /media/thurr-solutions-lead-system-intro.mp4. Poster path: /media/thurr-solutions-lead-system-intro-poster.jpg.
DO NOT: Do not use Runway credits. Do not generate or clone Thurr’s voice. Do not upload private assets.
ACCEPTANCE: If video exists, player renders; if missing, placeholder renders cleanly; CTA remains visible; npm run build passes.
DEPENDENCIES: WEB-001.
OWNER: Codex
PRIORITY: P0
NOW / NEXT / LATER: NEXT

TICKET: DECISION BLOCKER — Final Video Source
REPO: /Users/thurr/Documents/New project
BRANCH: Claude/Thurr decision needed
GOAL: Choose final production source for intro video.
FILES: Claude/Thurr decision needed
LOCKED COPY / INPUTS: Options: Remotion render already available in repo; NotebookLM audio; Runway polish; Thurr-recorded voice.
DO NOT: Do not create paid/generative video assets without Thurr approval.
ACCEPTANCE: Thurr selects Remotion-only, Runway-polished, or recorded-voice workflow.
DEPENDENCIES: None.
OWNER: Thurr
PRIORITY: P1
NOW / NEXT / LATER: NEXT

TICKET: DECISION BLOCKER — Voice Usage Approval
REPO: /Users/thurr/Documents/New project
BRANCH: Claude/Thurr decision needed
GOAL: Confirm whether Thurr’s real voice will be used and where voice samples are stored.
FILES: Claude/Thurr decision needed
LOCKED COPY / INPUTS: User wants it to be his voice eventually.
DO NOT: Do not synthesize voice without explicit approval.
ACCEPTANCE: Written approval and source audio location provided.
DEPENDENCIES: DECISION BLOCKER — Final Video Source.
OWNER: Thurr
PRIORITY: P1
NOW / NEXT / LATER: NEXT

## 3. Lead Flow Audit Page

TICKET: AUD-001 — Build /audit Page With Intake Form
REPO: /Users/thurr/Documents/New project
BRANCH: codex/lead-flow-audit-page
GOAL: Add a public Lead Flow Audit page with a focused intake form.
FILES: /Users/thurr/Documents/New project/src/main.jsx; /Users/thurr/Documents/New project/src/styles/app.css; /Users/thurr/Documents/New project/api/audit-request.js
LOCKED COPY / INPUTS: Starter price: $250-$350. CTA: Request a Lead Flow Audit. Collect name, business name, email, phone (optional), industry, website/social link (optional), monthly lead volume, biggest lead problem (max 500 chars), TCPA consent checkbox.
DO NOT: Do not collect PHI, youth/minor data, insurance health details, SSNs, bank info, or private credentials.
ACCEPTANCE: /audit route renders; form validates required fields; consent checkbox required; submission path works against configured endpoint or safe stub; /audit/thanks route exists; npm run build passes.
STATUS: DONE (2026-05-07) — /audit + request form + API endpoint shipped; verified `npm run build`.
DEPENDENCIES: AUD-002.
OWNER: Codex
PRIORITY: P0
NOW / NEXT / LATER: NOW

TICKET: AUD-002 — Add Supabase Audit Requests Migration
REPO: /Users/thurr/Documents/New project
BRANCH: codex/lead-flow-audit-page
GOAL: Create schema for storing Lead Flow Audit requests.
FILES: /Users/thurr/Documents/New project/supabase/migrations; /Users/thurr/Documents/New project/docs/backend/Audit-Request-Schema.md
LOCKED COPY / INPUTS: Table: audit_requests. Fields: id, created_at, full_name, business_name, email, phone, industry, website_url, monthly_leads, pain_point (<= 500 chars), tcpa_consent, status, source, notes, responded_at.
DO NOT: Do not store secrets. Do not create healthcare/youth-specific sensitive fields.
ACCEPTANCE: Migration SQL is present; RLS notes documented; local schema doc explains fields; no secret values committed.
STATUS: DONE (2026-05-07) — Migration + schema docs shipped (RLS-gated anon insert); verified `npm run build`.
DEPENDENCIES: SEC-001.
OWNER: Codex
PRIORITY: P0
NOW / NEXT / LATER: NOW

TICKET: AUD-003 — Add Owner Alert Hook For Audit Requests
REPO: /Users/thurr/Documents/New project
BRANCH: codex/lead-flow-audit-page
GOAL: Trigger an owner alert when a Lead Flow Audit request arrives.
FILES: /Users/thurr/Documents/New project/api/audit-request.js; /Users/thurr/Documents/New project/docs/backend/Audit-Request-Alert-Flow.md
LOCKED COPY / INPUTS: Preferred destinations: n8n webhook and/or Discord owner alert.
DO NOT: Do not hardcode webhook URLs, API keys, Discord channel IDs, or email credentials.
ACCEPTANCE: Endpoint reads alert destination from env vars; failure logs safely; docs list required env vars; npm run build passes.
DEPENDENCIES: AUD-001; DECISION BLOCKER — Audit Alert Destination.
OWNER: Codex
PRIORITY: P1
NOW / NEXT / LATER: NEXT

TICKET: AUD-004 — Build /audit/thanks Confirmation Page
REPO: /Users/thurr/Documents/New project
BRANCH: codex/lead-flow-audit-page
GOAL: Add post-submit page that tells prospects what happens next.
FILES: /Users/thurr/Documents/New project/src/main.jsx; /Users/thurr/Documents/New project/src/styles/app.css
LOCKED COPY / INPUTS: Confirmation should say Thurr will review the lead flow and follow up with next steps. Do not promise instant build.
DO NOT: Do not mention internal Notion/Linear/Supabase details to prospects.
ACCEPTANCE: /audit/thanks renders; form redirects there after success; CTA lets user return home or book if booking link is configured; npm run build passes.
STATUS: DONE (2026-05-07) — /audit/thanks shipped with Loom slot placeholder; verified `npm run build`.
DEPENDENCIES: AUD-001.
OWNER: Codex
PRIORITY: P0
NOW / NEXT / LATER: NOW

TICKET: DECISION BLOCKER — Audit Alert Destination
REPO: /Users/thurr/Documents/New project
BRANCH: Claude/Thurr decision needed
GOAL: Confirm whether new audit requests alert through Discord, email, n8n, or multiple destinations.
FILES: Claude/Thurr decision needed
LOCKED COPY / INPUTS: User mentioned Discord owner alerts; exact channel ID not confirmed.
DO NOT: Do not guess or hardcode alert targets.
ACCEPTANCE: Destination and env var names confirmed.
STATUS: BLOCKED (2026-05-07) — Needs Thurr to pick alert destinations (Discord/email/n8n) and confirm env var names (no values in repo).
DEPENDENCIES: None.
OWNER: Thurr
PRIORITY: P0
NOW / NEXT / LATER: NOW

TICKET: DECISION BLOCKER — Audit Payment / Booking Flow
REPO: /Users/thurr/Documents/New project
BRANCH: Claude/Thurr decision needed
GOAL: Decide whether /audit CTA collects form first, books call first, or takes payment first.
FILES: Claude/Thurr decision needed
LOCKED COPY / INPUTS: Prior recommendation: form first, then manual follow-up/booking while offer is still being validated.
DO NOT: Do not add payment collection before Thurr confirms.
ACCEPTANCE: Thurr selects form-first, calendar-first, or payment-first.
STATUS: BLOCKED (2026-05-07) — Needs Thurr decision: `form-first` (recommended while validating) vs `calendar-first` vs `payment-first` so CTAs and routing can be locked.
DEPENDENCIES: None.
OWNER: Claude/Thurr
PRIORITY: P0
NOW / NEXT / LATER: NOW

## 4. Notion / Operations

TICKET: NOT-001 — Create Operations Index Doc In Repo
REPO: /Users/thurr/Documents/New project
BRANCH: codex/ops-index-docs
GOAL: Maintain a local index of the Notion operating system with direct links.
FILES: /Users/thurr/Documents/New project/docs/project/Thurr-Solutions-Operating-System.md; /Users/thurr/Documents/New project/docs/project/Notion-Command-Center-Map.md
LOCKED COPY / INPUTS: Command Center: https://www.notion.so/34ca6f1d252381dbae98fd09da37ae32. Client Command Center: https://www.notion.so/350a6f1d2523814d8b91f103559431e8. Website + Marketplace Launch HQ: https://www.notion.so/350a6f1d2523817d8d04ee2fecdad043. Gym HQ: https://www.notion.so/357a6f1d25238103bdc7f8832a917164.
DO NOT: Do not include private legal IDs, API keys, client private data, or financial account details.
ACCEPTANCE: Doc lists source-of-truth pages by function; marks Notion as source of truth and Linear as execution; links are direct; no secrets.
DEPENDENCIES: None.
OWNER: Codex
PRIORITY: P1
NOW / NEXT / LATER: NEXT

TICKET: NOT-002 — Add Audit Request Tracking Spec For Notion
REPO: /Users/thurr/Documents/New project
BRANCH: codex/ops-index-docs
GOAL: Specify how audit requests should become Notion records/tasks.
FILES: /Users/thurr/Documents/New project/docs/project/Website-Intake-Tracking.md; /Users/thurr/Documents/New project/docs/project/Notion-Audit-Tracking-Spec.md
LOCKED COPY / INPUTS: Website intake should create or update a prospect/opportunity with offer, phase, status, next action, links, and deadline.
DO NOT: Do not directly alter Notion if API access is unavailable. Do not duplicate existing databases unless needed.
ACCEPTANCE: Spec maps website fields to Notion fields; includes manual fallback; links relevant Notion pages; no secrets.
DEPENDENCIES: AUD-002.
OWNER: Codex
PRIORITY: P1
NOW / NEXT / LATER: NEXT

TICKET: NOT-003 — Create Client Fulfillment Battle Plan Template Spec
REPO: /Users/thurr/Documents/New project
BRANCH: codex/ops-index-docs
GOAL: Define the Notion template generated after onboarding.
FILES: /Users/thurr/Documents/New project/docs/project/Client-Fulfillment-Battle-Plan-Template.md
LOCKED COPY / INPUTS: Template fields: client, offer, phase, status, deposit status, timeline, deliverables, assets needed, client decisions, compliance reviewer, next 7 days, links.
DO NOT: Do not create client-facing Notion access by default.
ACCEPTANCE: Template can be copied into Notion manually or used by n8n later; includes client-facing vs internal-only sections; no private data.
DEPENDENCIES: None.
OWNER: Codex
PRIORITY: P1
NOW / NEXT / LATER: NEXT

TICKET: DECISION BLOCKER — Notion API Write Access
REPO: /Users/thurr/Documents/New project
BRANCH: Claude/Thurr decision needed
GOAL: Confirm whether Codex should use Notion API to seed/update databases or only produce local specs.
FILES: Claude/Thurr decision needed
LOCKED COPY / INPUTS: User already has Notion Command Center and related pages.
DO NOT: Do not restructure/delete Notion pages without confirmation.
ACCEPTANCE: Thurr confirms API token and target databases or chooses manual setup.
DEPENDENCIES: None.
OWNER: Thurr
PRIORITY: P1
NOW / NEXT / LATER: NEXT

TICKET: DECISION BLOCKER — Client Portal Access Policy
REPO: /Users/thurr/Documents/New project
BRANCH: Claude/Thurr decision needed
GOAL: Decide what clients can see in Notion.
FILES: Claude/Thurr decision needed
LOCKED COPY / INPUTS: Current recommendation: internal Notion first; client-facing progress pages only when sanitized.
DO NOT: Do not expose internal tasks, financials, agent notes, or compliance risk notes to clients.
ACCEPTANCE: Thurr selects internal-only, per-client view-only page, or client portal later.
DEPENDENCIES: NOT-003.
OWNER: Claude/Thurr
PRIORITY: P1
NOW / NEXT / LATER: NEXT

## 5. Linear

TICKET: LIN-001 — Create Linear Ticket Template Library In Repo
REPO: /Users/thurr/Documents/New project
BRANCH: codex/linear-templates
GOAL: Document reusable Linear templates for the common Thurr Solutions work types.
FILES: /Users/thurr/Documents/New project/docs/project/Linear-Issue-Template-Library.md
LOCKED COPY / INPUTS: Templates: Website Change, Lead Flow Audit, Client Onboarding, Presentation Build, Automation Build, n8n Workflow, Compliance Review Gate, Credential Rotation, Follow-Up Task, Bug/Fix.
DO NOT: Do not include private tokens or assume Linear API access.
ACCEPTANCE: Template library uses consistent fields: goal, inputs, do not, acceptance, owner, due date, links; can be pasted into Linear.
DEPENDENCIES: None.
OWNER: Codex
PRIORITY: P1
NOW / NEXT / LATER: NEXT

TICKET: LIN-002 — Create Linear Seed Script Or Manual Import File
REPO: /Users/thurr/Documents/New project
BRANCH: codex/linear-templates
GOAL: Make the backlog importable into Linear if API access exists.
FILES: /Users/thurr/Documents/New project/scripts/linear-seed-backlog.mjs; /Users/thurr/Documents/New project/docs/project/Codex-Ready-Backlog.md; /Users/thurr/Documents/New project/docs/project/linear-backlog-import.csv
LOCKED COPY / INPUTS: Use this backlog as source. Team/project naming must match Thurr Solutions Linear workspace.
DO NOT: Do not call Linear API unless token/env is configured and Thurr approves.
ACCEPTANCE: Script runs in dry-run mode by default; CSV/manual import exists; no credentials committed.
DEPENDENCIES: LIN-001; DECISION BLOCKER — Linear API Write Access.
OWNER: Codex
PRIORITY: P2
NOW / NEXT / LATER: LATER

TICKET: DECISION BLOCKER — Linear API Write Access
REPO: /Users/thurr/Documents/New project
BRANCH: Claude/Thurr decision needed
GOAL: Confirm whether Codex should create/update Linear issues directly.
FILES: Claude/Thurr decision needed
LOCKED COPY / INPUTS: Linear workspace exists; prior tasks THU-159 and others exist.
DO NOT: Do not paste tokens into chat or commit them.
ACCEPTANCE: Thurr confirms Linear token is safely available through env or chooses manual import.
DEPENDENCIES: None.
OWNER: Thurr
PRIORITY: P1
NOW / NEXT / LATER: NEXT

TICKET: DECISION BLOCKER — Linear Project Structure
REPO: /Users/thurr/Documents/New project
BRANCH: Claude/Thurr decision needed
GOAL: Confirm whether each client gets a Linear project, with Notion remaining source of truth.
FILES: Claude/Thurr decision needed
LOCKED COPY / INPUTS: Prior recommendation: create a project per active client once money or serious proposal exists; keep loose leads in pipeline until real.
DO NOT: Do not create projects for every contact in raw notes.
ACCEPTANCE: Thurr confirms project-per-client policy.
DEPENDENCIES: None.
OWNER: Claude/Thurr
PRIORITY: P1
NOW / NEXT / LATER: NEXT

## 6. Agent System

TICKET: AGT-001 — Add Agent Operating Manual To Website Repo
REPO: /Users/thurr/Documents/New project
BRANCH: codex/agent-system-docs
GOAL: Document which agent handles which operating area.
FILES: /Users/thurr/Documents/New project/docs/project/Agent-Operating-System.md
LOCKED COPY / INPUTS: Agents: Operations Manager, Client Delivery, Sales Follow-Up, Lead Flow Audit, Presentation Builder, Content Engine, KPI Scoreboard, Release Gate.
DO NOT: Do not claim agents can act autonomously with money, sending, client contact, or production changes without approval.
ACCEPTANCE: Manual includes purpose, trigger phrases, allowed actions, prohibited actions, outputs, and source-of-truth links.
DEPENDENCIES: Existing agent specs in /Users/thurr/Documents/New project/docs/project/ops-agent-specs.
OWNER: Codex
PRIORITY: P1
NOW / NEXT / LATER: NEXT

TICKET: AGT-002 — Sync Agent Specs To Thurnos Memory
REPO: /Users/thurr/thurnos-memory
BRANCH: codex/agent-memory-sync
GOAL: Copy or update approved agent specs into Thurnos memory so local agents can reference them.
FILES: /Users/thurr/thurnos-memory/memory/semantic/ops; /Users/thurr/Documents/New project/docs/project/ops-agent-specs
LOCKED COPY / INPUTS: Existing specs should be synced, not reinvented. Use draft-only guardrails unless explicit approval is present.
DO NOT: Do not overwrite unknown user edits. Do not add sensitive client data. Do not give agents permission to spend, send, deploy, or change production without approval.
ACCEPTANCE: Thurnos memory has current specs for each approved agent; update note added; git diff only touches intended memory files.
DEPENDENCIES: AGT-001.
OWNER: Codex
PRIORITY: P2
NOW / NEXT / LATER: LATER

TICKET: DECISION BLOCKER — Agent Automation Permissions
REPO: /Users/thurr/Documents/New project
BRANCH: Claude/Thurr decision needed
GOAL: Decide which agents can only draft versus which can execute.
FILES: Claude/Thurr decision needed
LOCKED COPY / INPUTS: Current safest default: draft-only for client-facing, financial, compliance, production, and credential work.
DO NOT: Do not grant broad autonomous access.
ACCEPTANCE: Thurr approves permission matrix.
DEPENDENCIES: AGT-001.
OWNER: Claude/Thurr
PRIORITY: P1
NOW / NEXT / LATER: NEXT

TICKET: DECISION BLOCKER — Agent Trigger Phrase Library
REPO: /Users/thurr/Documents/New project
BRANCH: Claude/Thurr decision needed
GOAL: Lock phrases Thurr can remember when he forgets exact commands.
FILES: Claude/Thurr decision needed
LOCKED COPY / INPUTS: Examples: “run client delivery,” “check my lead flow,” “prep this client,” “make this a Linear ticket,” “organize this note.”
DO NOT: Do not require perfect syntax.
ACCEPTANCE: Trigger list approved and added to Agent Operating Manual.
DEPENDENCIES: AGT-001.
OWNER: Claude/Thurr
PRIORITY: P2
NOW / NEXT / LATER: LATER

## 7. Client Pipeline

TICKET: CLT-001 — Create Client Pipeline Index
REPO: /Users/thurr/Documents/New project
BRANCH: codex/client-pipeline-docs
GOAL: Add a concise pipeline map tying prospects to offers, status, next action, and source links.
FILES: /Users/thurr/Documents/New project/docs/sales/Client-Pipeline-Index.md
LOCKED COPY / INPUTS: Include HeartPathBloom, Restore-C, Andy Life Insurance, Christy/Sweetest Pea, 5 Star Hospice, Youth Wellness Platform, Right Thurr community/future.
DO NOT: Do not include private emails, agreements, signatures, accidental sensitive identifiers, or payment details beyond approved public/internal status.
ACCEPTANCE: Index has client/prospect, status, offer, next action, risk flag, direct Notion/doc links; sensitive data omitted.
DEPENDENCIES: Existing docs in /Users/thurr/Documents/New project/docs/sales.
OWNER: Codex
PRIORITY: P1
NOW / NEXT / LATER: NEXT

TICKET: CLT-002 — Update HeartPathBloom Internal Build Status
REPO: /Users/thurr/Documents/New project
BRANCH: codex/client-pipeline-docs
GOAL: Correct HeartPathBloom status to signed and deposit received May 1, 2026.
FILES: /Users/thurr/Documents/New project/docs/sales/Client-Pipeline-Index.md; /Users/thurr/Documents/New project/docs/project/Thurr-Solutions-Operating-System.md
LOCKED COPY / INPUTS: Deposit received May 1, 2026. Build clock running. COPPA applies. Named crisis escalation reviewer still needs lock before AI chat goes live.
DO NOT: Do not publish deposit info on public website. Do not create clinical claims.
ACCEPTANCE: Internal docs reflect corrected date/status; reviewer decision is a blocker; no public exposure.
DEPENDENCIES: CLT-001.
OWNER: Codex
PRIORITY: P0
NOW / NEXT / LATER: NEXT

TICKET: CLT-003 — Add Restore Residential Close System Brief Link
REPO: /Users/thurr/Documents/New project
BRANCH: codex/client-pipeline-docs
GOAL: Make Restore’s upsell/presentation asset easy to find.
FILES: /Users/thurr/Documents/New project/docs/sales/Client-Pipeline-Index.md; /Users/thurr/Documents/New project/docs/sales/Restore-C-Residential-Close-System-Upsell.md
LOCKED COPY / INPUTS: Position as residential close system / lead generator, not just app.
DO NOT: Do not build full 3D presentation before workflow answers.
ACCEPTANCE: Pipeline index links Restore upsell doc and lists next action: collect sales workflow details.
DEPENDENCIES: CLT-001.
OWNER: Codex
PRIORITY: P1
NOW / NEXT / LATER: NEXT

TICKET: CLT-004 — Add Andy Lead Flow Audit Brief Link
REPO: /Users/thurr/Documents/New project
BRANCH: codex/client-pipeline-docs
GOAL: Make Andy’s insurance lead system pitch easy to find and keep it in the audit flow.
FILES: /Users/thurr/Documents/New project/docs/sales/Client-Pipeline-Index.md; /Users/thurr/Documents/New project/docs/sales/Andy-Life-Insurance-Pipeline-Presentation.md
LOCKED COPY / INPUTS: Position line: “The goal is not just buying leads. The goal is owning the pipeline.”
DO NOT: Do not imply compliance approval or guaranteed ROI.
ACCEPTANCE: Pipeline index links Andy doc and lists intake gates: licensed states, lead sources, follow-up, CRM, compliance reviewer.
DEPENDENCIES: CLT-001.
OWNER: Codex
PRIORITY: P1
NOW / NEXT / LATER: NEXT

TICKET: CLT-005 — Add Christy Corrected Status
REPO: /Users/thurr/Documents/New project
BRANCH: codex/client-pipeline-docs
GOAL: Correct Christy/Sweetest Pea internal status and offer.
FILES: /Users/thurr/Documents/New project/docs/sales/Client-Pipeline-Index.md
LOCKED COPY / INPUTS: Christy/Sweetest Pea was Tier 2 $450 scope replacing Gloss Genius; she went quiet after proposal.
DO NOT: Do not label as signed or Tier 1 Gloss Genius embed.
ACCEPTANCE: Pipeline index reflects accurate status and next follow-up.
DEPENDENCIES: CLT-001.
OWNER: Codex
PRIORITY: P1
NOW / NEXT / LATER: NEXT

TICKET: DECISION BLOCKER — HeartPathBloom Named Reviewer
REPO: /Users/thurr/Documents/New project
BRANCH: Claude/Thurr decision needed
GOAL: Lock the named human reviewer for crisis escalations.
FILES: Claude/Thurr decision needed
LOCKED COPY / INPUTS: AI chat cannot go live without human escalation owner and disclosure flow.
DO NOT: Do not let automated system make clinical decisions.
ACCEPTANCE: Tisa/Kendalyn provide named adult reviewer and contact method.
STATUS: BLOCKED (2026-05-07) — Needs client (Tisa/Kendalyn) to name the adult human escalation reviewer + contact method before any live chat/escalation work proceeds.
DEPENDENCIES: None.
OWNER: Thurr/client
PRIORITY: P0
NOW / NEXT / LATER: NOW

TICKET: DECISION BLOCKER — HeartPathBloom Phase 1 Screen List
REPO: /Users/thurr/Documents/New project
BRANCH: Claude/Thurr decision needed
GOAL: Lock exact screens for Phase 1 before coding sprint.
FILES: Claude/Thurr decision needed
LOCKED COPY / INPUTS: Youth-only Phase 1; guardian/counselor portals are Phase 2.
DO NOT: Do not expand scope into Phase 2 features.
ACCEPTANCE: Screen list approved.
STATUS: BLOCKED (2026-05-07) — Needs Claude/Thurr/client to approve the Phase 1 screen list (explicitly excluding Phase 2 portals) so implementation scope stays bounded.
DEPENDENCIES: HeartPathBloom named reviewer.
OWNER: Claude/Thurr/client
PRIORITY: P0
NOW / NEXT / LATER: NOW

TICKET: DECISION BLOCKER — Restore Workflow Answers
REPO: /Users/thurr/Documents/New project
BRANCH: Claude/Thurr decision needed
GOAL: Get Restore’s residential sales process details before building presentation/app demo.
FILES: Claude/Thurr decision needed
LOCKED COPY / INPUTS: Need steps from storm lead to estimate to close; who follows up; what proof/photos/docs are needed; what blocks residential closes.
DO NOT: Do not design a complex app blind.
ACCEPTANCE: Restore answers captured in Notion or sales doc.
DEPENDENCIES: None.
OWNER: Thurr/Restore
PRIORITY: P1
NOW / NEXT / LATER: NEXT

TICKET: DECISION BLOCKER — Andy Intake Answers
REPO: /Users/thurr/Documents/New project
BRANCH: Claude/Thurr decision needed
GOAL: Get Andy’s licensed states, lead sources, CRM, calendar, and compliance reviewer.
FILES: Claude/Thurr decision needed
LOCKED COPY / INPUTS: Must confirm before paid traffic or automation build.
DO NOT: Do not launch insurance marketing without approval path.
ACCEPTANCE: Answers added to Andy sales doc.
DEPENDENCIES: None.
OWNER: Thurr/Andy
PRIORITY: P1
NOW / NEXT / LATER: NEXT

TICKET: DECISION BLOCKER — 5 Star Hospice Presentation Scope
REPO: /Users/thurr/Documents/New project
BRANCH: Claude/Thurr decision needed
GOAL: Decide whether 5 Star Hospice receives a light interest deck or full intake/triage proposal.
FILES: Claude/Thurr decision needed
LOCKED COPY / INPUTS: HIPAA applies to any patient data workflow.
DO NOT: Do not use patient examples or PHI.
ACCEPTANCE: Scope and compliance lane approved.
DEPENDENCIES: None.
OWNER: Claude/Thurr
PRIORITY: P2
NOW / NEXT / LATER: LATER

## 8. Right Thurr

TICKET: DECISION BLOCKER — Right Thurr Website Status
REPO: Claude/Thurr decision needed
BRANCH: Claude/Thurr decision needed
GOAL: Confirm whether rightthurr.com exists separately or remains inside current mixed repo.
FILES: Claude/Thurr decision needed
LOCKED COPY / INPUTS: Right Thurr is personal/lifestyle/travel/content brand, not B2B Thurr Solutions.
DO NOT: Do not mix Right Thurr lifestyle merch copy into Thurr Solutions B2B homepage.
ACCEPTANCE: Domain/repo/status confirmed.
DEPENDENCIES: None.
OWNER: Thurr
PRIORITY: P1
NOW / NEXT / LATER: NEXT

TICKET: DECISION BLOCKER — Right Thurr First Product Lane
REPO: Claude/Thurr decision needed
BRANCH: Claude/Thurr decision needed
GOAL: Decide first monetizable Right Thurr lane.
FILES: Claude/Thurr decision needed
LOCKED COPY / INPUTS: Options mentioned: travel/luggage tags, community, content, app with connections, merch.
DO NOT: Do not build store/community before product lane is selected.
ACCEPTANCE: One first lane selected with success metric.
DEPENDENCIES: Right Thurr website status.
OWNER: Claude/Thurr
PRIORITY: P2
NOW / NEXT / LATER: LATER

TICKET: DECISION BLOCKER — Right Thurr Public Phrase Bank
REPO: Claude/Thurr decision needed
BRANCH: Claude/Thurr decision needed
GOAL: Approve which phrases can be used publicly.
FILES: Claude/Thurr decision needed
LOCKED COPY / INPUTS: Candidate phrases: You got to be thurr; Subscribe button right thurr; I’m Thurr; Be Thurr; Thurr you go; Thurr Way.
DO NOT: Do not publish raw notes or sensitive/private references.
ACCEPTANCE: Approved phrase bank created.
DEPENDENCIES: None.
OWNER: Claude/Thurr
PRIORITY: P2
NOW / NEXT / LATER: LATER

TICKET: DECISION BLOCKER — Community Timing
REPO: Claude/Thurr decision needed
BRANCH: Claude/Thurr decision needed
GOAL: Decide whether Right Thurr community is paused until B2B site/client delivery is stable.
FILES: Claude/Thurr decision needed
LOCKED COPY / INPUTS: Current risk: community is maintenance-heavy for solo operator.
DO NOT: Do not launch unpaid community that adds daily workload without automation/support.
ACCEPTANCE: Community marked Now, Next, or Later.
DEPENDENCIES: None.
OWNER: Claude/Thurr
PRIORITY: P2
NOW / NEXT / LATER: LATER

## 9. Security / Credentials

TICKET: SEC-001 — Local Environment Hygiene Audit
REPO: /Users/thurr/Documents/New project
BRANCH: codex/security-env-hygiene
GOAL: Verify local env files are ignored and no secrets are accidentally tracked.
FILES: /Users/thurr/Documents/New project/.gitignore; /Users/thurr/Documents/New project/docs/project/Security-Credential-Rotation.md
LOCKED COPY / INPUTS: Key rotation checklist: https://www.notion.so/357a6f1d2523815e9180d47e8ce3bf78. Linear task: https://linear.app/thurr-soultions/issue/THU-159/rotate-exposed-local-website-env-keys-and-confirm-tracking-path.
DO NOT: Do not print, copy, commit, or summarize secret values.
ACCEPTANCE: .env*, .env.local, key files, and generated credential dumps are ignored; docs explain rotation targets without values; git status does not show secret files.
STATUS: DONE (2026-05-07) — Confirmed `.env*` ignore + no tracked env/keys; rotation doc present; no secret values captured.
DEPENDENCIES: None.
OWNER: Codex
PRIORITY: P0
NOW / NEXT / LATER: NOW

TICKET: SEC-002 — Add Credential Rotation Runbook
REPO: /Users/thurr/Documents/New project
BRANCH: codex/security-env-hygiene
GOAL: Document how Thurr rotates website and automation secrets.
FILES: /Users/thurr/Documents/New project/docs/project/Security-Credential-Rotation.md
LOCKED COPY / INPUTS: Rotate local env, Vercel/Netlify, n8n, Supabase, Resend, OpenAI/Anthropic as applicable.
DO NOT: Do not store values. Do not ask Thurr to paste secrets into chat.
ACCEPTANCE: Runbook has checklist, platform links/placeholders, verification steps, and owner; links Notion checklist and Linear task.
STATUS: DONE (2026-05-07) — Runbook expanded with owner, targets, platform placeholders, and verification steps (no values).
DEPENDENCIES: SEC-001.
OWNER: Codex
PRIORITY: P0
NOW / NEXT / LATER: NOW

TICKET: SEC-003 — Add Public Data Redaction Checklist
REPO: /Users/thurr/Documents/New project
BRANCH: codex/security-env-hygiene
GOAL: Prevent accidental private note content from reaching public channels.
FILES: /Users/thurr/Documents/New project/docs/project/Public-Data-Redaction-Checklist.md
LOCKED COPY / INPUTS: Raw notes included accidental legal/entity info and private relationship/contact references.
DO NOT: Do not repeat private identifiers, sensitive personal notes, or client private data.
ACCEPTANCE: Checklist covers website, LinkedIn, Upwork, GitHub, Notion public pages, client decks, screenshots, and video; no sensitive values included.
STATUS: DONE (2026-05-07) — Checklist updated with leak hotspots and repo scan command; no sensitive values included.
DEPENDENCIES: None.
OWNER: Codex
PRIORITY: P0
NOW / NEXT / LATER: NOW

TICKET: SEC-004 — Add Client Data Boundary Doc
REPO: /Users/thurr/Documents/New project
BRANCH: codex/security-env-hygiene
GOAL: Define what can and cannot be stored for regulated or sensitive clients.
FILES: /Users/thurr/Documents/New project/docs/project/Client-Data-Boundaries.md
LOCKED COPY / INPUTS: HIPAA for hospice, COPPA for HeartPathBloom, TCPA/FCC for SMS, insurance compliance for Andy.
DO NOT: Do not provide legal advice or claim certification.
ACCEPTANCE: Doc lists allowed metadata, prohibited data, approval gates, and escalation reviewer requirements; no private data included.
DEPENDENCIES: None.
OWNER: Codex
PRIORITY: P1
NOW / NEXT / LATER: NEXT

TICKET: DECISION BLOCKER — Secret Manager / Password Vault Policy
REPO: Claude/Thurr decision needed
BRANCH: Claude/Thurr decision needed
GOAL: Decide where secrets live long-term.
FILES: Claude/Thurr decision needed
LOCKED COPY / INPUTS: Candidate: Bitwarden or equivalent vault plus platform-native env vars.
DO NOT: Do not keep secrets in notes, chat, screenshots, repo docs, or raw text files.
ACCEPTANCE: Thurr confirms vault/tool and migration rule.
STATUS: BLOCKED (2026-05-07) — Needs Thurr to choose the vault/tool (e.g., Bitwarden) + the rule for what lives in vault vs platform env vars; then we can align repo docs and automation env var naming without storing values.
DEPENDENCIES: SEC-001.
OWNER: Thurr
PRIORITY: P0
NOW / NEXT / LATER: NOW
