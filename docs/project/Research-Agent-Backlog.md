# Research And Agent Backlog

Captured from the May 6, 2026 steering notes. Use this as the intake lane for research ideas, creator references, narrow personal agents, video tooling, and new business opportunities.

## Source Links To Review

YouTube links captured:

- `https://youtu.be/w9-gfaV5vlM?si=gMPv-9CML8xHtTIU`
  - Identified title: `Stop Selling AI Agents, Sell AI Solutions Instead`
  - Working takeaway to validate: Thurr Solutions should sell business outcomes and managed systems, not generic "AI agents."
- `https://youtu.be/wIcw0T9NhZM?si=KMDCldHGNDmx5zbW`
  - Identified title: `How to Price AI Workflows (Without Losing Clients)`
  - Working takeaway to validate: package AI workflow pricing around value, scope boundaries, and support tiers.
- `https://youtu.be/Q46OLxFshAQ`
  - Identified title: `How I'd Make Money with AI in 2026 (if I had to Start Over)`
  - Working takeaway to validate: look for simple, high-demand implementation lanes that can become repeatable offers.

## Video Automation Research

### Hyperframe V2 / AI Video Editing

Research goal:

- Understand whether Hyperframe V2 can speed up short-form editing, branded explainers, testimonial clips, or use-case videos.
- Compare it against the current Runway + Remotion workflow in `docs/project/Branded-AI-Video-Production-Kit.md`.

Questions to answer:

- Does Hyperframe help with editing, generation, repurposing, captions, or full video assembly?
- Can it keep Thurr brand consistency without too much manual cleanup?
- Is it better for raw talking-head clips, screen recordings, product demos, or synthetic scenes?
- Where does Remotion still win: programmatic overlays, branded intros, repeatable formats, exports?

Output:

- Add a short tool comparison table to the video-production kit after research.
- Create one pilot brief if Hyperframe is worth testing.

## YouTube Researcher Agent

Build a narrow YouTube researcher using SerpAPI and/or Supadata.

Purpose:

- Find high-signal videos from specific creators and channels.
- Extract titles, channels, descriptions, transcripts when available, and repeatable tactics.
- Turn raw YouTube research into Thurr-specific implementation notes.

Inputs:

- Creator/channel name
- Topic
- Date window
- Max videos
- Output type: `summary`, `offer research`, `content ideas`, `workflow ideas`, `pricing notes`

Outputs:

- Top videos with links
- Why each video matters
- What Thurr Solutions can adapt
- What to avoid copying
- Suggested next asset or experiment

Guardrails:

- Do not clone creator offers, copy, communities, or courses.
- Convert research into Thurr-specific service, content, or product decisions.
- Keep citations/links attached to claims.

First creator list:

- Alex Finn
- Dan Martell
- Nate Herk
- AI Chris Lee
- Alex Hormozi
- Chris Koerner
- The Rich Dad Channel

## Client Automation Lead: Credit Repair + Auto Funding Team

Goal:

- Prepare an implementation plan for a credit-repair + auto-funding team that wants:
  1) multi-site information extraction (3 sources) in an “eye-pleasing” format,
  2) referral payout automation after payment finalization,
  3) a YouTube researcher workflow that categorizes takeaways into business knowledge vs personal learning.

Repo draft:

- `docs/project/Reece-Credit-Team-Gameplan.md`

## Narrow Personal Agents

Rule: personal agents should be narrow enough to become useful quickly.

Candidate agents:

- `creator-research-agent`: studies one creator/topic and outputs Thurr-specific takeaways.
- `youtube-research-agent`: uses SerpAPI/Supadata to gather videos and transcripts.
- `offer-packaging-agent`: converts research into service packages, price bands, and scope boundaries.
- `video-brief-agent`: turns an offer or use-case page into shot list, voiceover, and Remotion/Runway prompts.
- `code-quality-agent`: runs CI/checks, summarizes failures, and proposes safe fixes.
- `trading-bot-delivery-agent`: tracks trading bot scope, disclaimers, test evidence, deployment state, and client-facing handoff.

Build order:

1. YouTube researcher
2. Creator research summarizer
3. Offer packaging agent
4. Code quality agent
5. Video brief agent
6. Trading bot delivery agent

## Chronicle Research Preview / AI Security Tiers

Research goal:

- Study Chronicle-style high-security research workflows and turn them into a simple tier model for Thurr AI systems.
- Use "Dan M S level tiers for AI" as a framing note to investigate and clarify later.

Draft tier model:

- Tier 0: public content and inspiration research
- Tier 1: internal business notes and non-sensitive planning
- Tier 2: client project context with limited personal/business data
- Tier 3: private client/operator data, CRM records, finances, and credentials
- Tier 4: regulated/high-risk workflows requiring explicit approval, audit logs, access controls, and human review

Implementation direction:

- Tag agents and workflows with a data tier before they run.
- Keep Tier 3+ out of public prompts, videos, screenshots, and shared docs.
- Require RLS/auth hardening before private owner screens use Tier 3 data.

## Baby Rae / Rated R Marketing

Goal:

- Use Remotion and the branded video workflow to help Baby Rae with marketing assets for the `Rated R` brand.

First deliverables:

- Brand intake checklist
- 3 visual directions before production
- 15-second vertical teaser
- 30-second brand intro
- 3 reusable caption/overlay styles
- Simple content calendar for launch week

Workflow:

1. Collect brand inputs: audience, music/style, logo, colors, references, boundaries.
2. Create 3 visual directions.
3. Pick one direction.
4. Build a Remotion composition or Runway + Remotion hybrid.
5. Export vertical variants for TikTok/Reels/Shorts.

Guardrails:

- Confirm rights for music, voice, images, logos, and footage.
- Keep any explicit/adult positioning intentional and platform-safe.
- Separate Baby Rae client/brand files from public Thurr assets.

## Trading Bot With Cam

Goal:

- Track the trading bot business opportunity clearly so product, delivery, compliance, and marketing do not get mixed up.

Immediate planning questions:

- What market/instrument does the bot trade?
- Is it signal-only, paper-trading, auto-execution, or copy-trading?
- What platform/API does it use?
- What proof exists: backtests, paper trading, live results, drawdown, risk limits?
- Who owns what between Thurr and Cam?
- What exactly is being sold: bot access, alerts, setup, education, managed service, or software license?

Must-have guardrails:

- No guaranteed profit claims.
- No "set and forget income" claims.
- Use risk disclosures before selling.
- Keep financial advice boundaries clear.
- Require paper-trade/live test evidence before broad marketing.

First docs to create:

- Trading bot scope brief
- Risk/disclaimer copy bank
- QA checklist for backtest/live-trading claims
- Sales page outline with conservative claims

## Code Quality In Automations

Goal:

- Make the automation loop catch code quality problems earlier.

Recommended checks:

- `npm run ci`
- Diagnostic lane verifier
- Use-case route verifier
- Buildout payload smoke test
- Production route smoke checks after deploy
- Git status guard before committing

Future automation idea:

- A recurring code-quality heartbeat that checks the repo, runs the appropriate verification command, and reports only actionable failures.

Do not auto-fix or auto-push from a recurring automation without explicit approval.
