# Premium Website Implementation Backlog

## NOW

TICKET: TS-001 — Lock OPERATOR CORE Design Tokens
REPO: /Users/thurr/Documents/New project
BRANCH: local working tree
GOAL: Move Thurr Solutions public pages toward the locked dark operator-console palette and Inter / JetBrains Mono typography.
FILES: /Users/thurr/Documents/New project/src/styles/brand-tokens.css; /Users/thurr/Documents/New project/src/styles/app.css
LOCKED COPY / INPUTS: Palette from Claude brief: #0B0B0D, #141417, #1B1B1F, #26262B, #F2F2EE, #8E8E94, #5A5A60, #E8643C, #3A1F18, #7BB369, #D4A04A. Fonts: Inter and JetBrains Mono.
DO NOT: Do not add gradients, glassmorphism, robot/AI iconography, or a second accent color.
ACCEPTANCE: Public B2B pages render dark, restrained, hairline-bordered, and token-driven; npm run build passes.
STATUS: DONE (2026-05-07) — Verified `npm run build`.
DEPENDENCIES: None.
OWNER: Codex
PRIORITY: P0
NOW / NEXT / LATER: NOW

TICKET: TS-002 — Add Global System Status Bar
REPO: /Users/thurr/Documents/New project
BRANCH: local working tree
GOAL: Add global infrastructure-style status bar above navigation.
FILES: /Users/thurr/Documents/New project/src/components/SiteChrome.jsx; /Users/thurr/Documents/New project/src/main.jsx; /Users/thurr/Documents/New project/src/styles/app.css
LOCKED COPY / INPUTS: AUDIT · OPERATIONAL, BUILD · OPERATIONAL, MANAGE · OPERATIONAL. Mobile collapses to ALL SYSTEMS OPERATIONAL.
DO NOT: Do not fetch live status or add heavy animation.
ACCEPTANCE: Bar appears on all routes, no layout shift, npm run build passes.
STATUS: DONE (2026-05-07) — Removed pulse animation/time label; verified `npm run build`.
DEPENDENCIES: TS-001.
OWNER: Codex
PRIORITY: P0
NOW / NEXT / LATER: NOW

TICKET: TS-003 — Rebuild Homepage Hero
REPO: /Users/thurr/Documents/New project
BRANCH: local working tree
GOAL: Replace homepage hero with locked left-aligned operator hero and right-side system panel.
FILES: /Users/thurr/Documents/New project/src/main.jsx; /Users/thurr/Documents/New project/src/styles/app.css
LOCKED COPY / INPUTS: Hero label, headline, subhead, CTAs, and panel copy from Claude brief.
DO NOT: Do not use a hero image, gradient, or centered layout.
ACCEPTANCE: Hero is left aligned, H1 is LCP target, system panel renders on desktop and stacks on mobile, npm run build passes.
STATUS: DONE (2026-05-07) — Operator hero + system panel shipped; verified `npm run build`.
DEPENDENCIES: TS-001; TS-002.
OWNER: Codex
PRIORITY: P0
NOW / NEXT / LATER: NOW

TICKET: TS-004 — Replace Methodology Cards With Vertical Timeline
REPO: /Users/thurr/Documents/New project
BRANCH: local working tree
GOAL: Make Audit → Build → Manage read like a documented operator process.
FILES: /Users/thurr/Documents/New project/src/main.jsx; /Users/thurr/Documents/New project/src/styles/app.css
LOCKED COPY / INPUTS: Full methodology section from Claude brief.
DO NOT: Do not render as three horizontal cards or use icons.
ACCEPTANCE: Vertical rail, three numbered steps, duration metadata, “What you get” bullets, anchor `#methodology`, npm run build passes.
STATUS: DONE (2026-05-07) — Vertical timeline (`#methodology`) shipped; verified `npm run build`.
DEPENDENCIES: TS-001.
OWNER: Codex
PRIORITY: P0
NOW / NEXT / LATER: NOW

TICKET: TS-005 — Rebuild /audit Page
REPO: /Users/thurr/Documents/New project
BRANCH: local working tree
GOAL: Upgrade /audit copy, form fields, trust copy, and schema to locked spec.
FILES: /Users/thurr/Documents/New project/src/main.jsx; /Users/thurr/Documents/New project/api/audit-request.js; /Users/thurr/Documents/New project/supabase/migrations/202605070001_create_audit_requests.sql; /Users/thurr/Documents/New project/docs/backend/Audit-Request-Schema.md; /Users/thurr/Documents/New project/src/styles/app.css
LOCKED COPY / INPUTS: Audit hero, framing, fields, TCPA checkbox, and below-form trust copy from Claude brief.
DO NOT: Do not check TCPA by default. Do not collect PHI, minor data, insurance health details, credentials, or bank info.
ACCEPTANCE: Client/server validation match; pain point max 500 with counter; writes new schema fields; redirects to /audit/thanks; npm run build passes.
STATUS: DONE (2026-05-07) — Form + API + migration aligned; schema docs updated; verified `npm run build`.
DEPENDENCIES: TS-001.
OWNER: Codex
PRIORITY: P0
NOW / NEXT / LATER: NOW

TICKET: TS-006 — Upgrade /audit/thanks
REPO: /Users/thurr/Documents/New project
BRANCH: local working tree
GOAL: Replace generic thanks page with one-business-day confirmation, Loom slot, and field note snippet.
FILES: /Users/thurr/Documents/New project/src/main.jsx; /Users/thurr/Documents/New project/src/styles/app.css
LOCKED COPY / INPUTS: Thanks copy from Claude brief. `VITE_LOOM_AUDIT_URL` renders embed if set, otherwise clean placeholder.
DO NOT: Do not show broken iframe or add competing CTA.
ACCEPTANCE: Thanks page renders next-step sequence, video placeholder or embed, field notes snippet, npm run build passes.
STATUS: DONE (2026-05-07) — Next-step confirmation + Loom slot placeholder shipped; verified `npm run build`.
DEPENDENCIES: TS-005.
OWNER: Codex
PRIORITY: P0
NOW / NEXT / LATER: NOW

## NEXT

TICKET: TS-007 — Industries Section
REPO: /Users/thurr/Documents/New project
BRANCH: local working tree
GOAL: Add 2x2 industry qualification grid.
FILES: /Users/thurr/Documents/New project/src/main.jsx; /Users/thurr/Documents/New project/src/styles/app.css
LOCKED COPY / INPUTS: Roofing & Contractors, Beauty & Service Studios, Insurance Agents, Healthcare & Hospice copy from Claude brief.
DO NOT: Do not add icons or CTAs.
ACCEPTANCE: 2x2 desktop, 1-column mobile, healthcare card has COMPLIANCE-FIRST tag, npm run build passes.
DEPENDENCIES: TS-001.
OWNER: Codex
PRIORITY: P1
NOW / NEXT / LATER: NEXT

TICKET: TS-008 — Compliance Page
REPO: /Users/thurr/Documents/New project
BRANCH: local working tree
GOAL: Add /compliance page and footer link.
FILES: /Users/thurr/Documents/New project/src/main.jsx; /Users/thurr/Documents/New project/src/components/SiteChrome.jsx; /Users/thurr/Documents/New project/vercel.json; /Users/thurr/Documents/New project/src/styles/app.css
LOCKED COPY / INPUTS: Page scaffold only until final TCPA/HIPAA/COPPA/Insurance body copy is locked.
DO NOT: Do not make certification or guarantee claims.
ACCEPTANCE: Page renders, footer link works, anchor sections exist, npm run build passes.
DEPENDENCIES: TS-001; Thurr/Claude final copy.
OWNER: Codex
PRIORITY: P1
NOW / NEXT / LATER: NEXT

TICKET: TS-009 — System Diagram Component
REPO: /Users/thurr/Documents/New project
BRANCH: local working tree
GOAL: Add hand-built SVG workflow diagram section.
FILES: /Users/thurr/Documents/New project/src/main.jsx; /Users/thurr/Documents/New project/src/styles/app.css
LOCKED COPY / INPUTS: Nodes from Claude brief.
DO NOT: Do not use Mermaid or external diagram libraries.
ACCEPTANCE: Pure SVG, responsive, readable, npm run build passes.
DEPENDENCIES: TS-001.
OWNER: Codex
PRIORITY: P1
NOW / NEXT / LATER: NEXT

TICKET: TS-010 — Field Notes Case Snapshots
REPO: /Users/thurr/Documents/New project
BRANCH: local working tree
GOAL: Add recent engagements section.
FILES: /Users/thurr/Documents/New project/src/main.jsx; /Users/thurr/Documents/New project/src/styles/app.css
LOCKED COPY / INPUTS: Restore and HeartPathBloom tiles. Third tile is Thurr decision needed.
DO NOT: Do not add client logos, fake testimonials, private emails, or private payment details.
ACCEPTANCE: Two public-safe cards render, no links until work pages exist, npm run build passes.
DEPENDENCIES: TS-001.
OWNER: Codex
PRIORITY: P1
NOW / NEXT / LATER: NEXT

TICKET: TS-011 — Founder, Final CTA, Footer Upgrade
REPO: /Users/thurr/Documents/New project
BRANCH: local working tree
GOAL: Add operator-led founder section, one-door final CTA, and legal footer disclosure.
FILES: /Users/thurr/Documents/New project/src/main.jsx; /Users/thurr/Documents/New project/src/components/SiteChrome.jsx; /Users/thurr/Documents/New project/src/styles/app.css
LOCKED COPY / INPUTS: Founder/final CTA/footer copy from Claude brief. Founder photo path is Thurr decision needed.
DO NOT: Do not add newsletter signup or extra contact form.
ACCEPTANCE: Founder section uses placeholder if no photo is chosen, final CTA points only to /audit, footer has disclosure, npm run build passes.
DEPENDENCIES: TS-001.
OWNER: Codex
PRIORITY: P1
NOW / NEXT / LATER: NEXT

## LATER

TICKET: TS-012 — Lead Leak Diagnostic Widget
REPO: /Users/thurr/Documents/New project
BRANCH: local working tree
GOAL: Add 4-question estimated lead leak widget with documented assumptions.
FILES: /Users/thurr/Documents/New project/src/main.jsx; /Users/thurr/Documents/New project/src/styles/app.css; /Users/thurr/Documents/New project/scripts or tests as needed.
LOCKED COPY / INPUTS: Inputs and disclosure from Claude brief.
DO NOT: Do not promise results or hide assumptions.
ACCEPTANCE: Widget calculates estimate, disclaimer visible, verification script covers math assumptions, npm run build passes.
DEPENDENCIES: TS-001; TS-003.
OWNER: Codex
PRIORITY: P2
NOW / NEXT / LATER: LATER
