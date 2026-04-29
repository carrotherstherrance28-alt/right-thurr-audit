# Notion Command Center Alignment

This document maps the repo build system to the user's Notion Command Center.

The Notion page is the operating hub. The repo remains the source of truth for code, technical docs, and committed plans.

## Notion Command Center Structure

Pasted Command Center links:

- Task Tracker: `09eb0d6f1f76481c93272f8b9e02c108`
- Content Calendar: `6926f277a49a4e99a0cba692b9279bf9`
- AI Ideas Log: `7919998222104e29b6b94f18fd276f8d`
- Thurr Solutions Client Command Center: `350a6f1d2523814d8b91f103559431e8`
- Work Space URL: `350a6f1d252380469052f5fcfeafb848`
- To Do List: `33da6f1d252380cfb558d87000b3b800`

Current connector status:

```txt
The Notion connector can search the workspace, but these linked pages/databases are not visible yet.
The user pasted the Command Center content, so planning can continue.
```

If connector access is fixed later, use these IDs to fetch and sync.

## Operating Rule

Use Notion for day-to-day visibility.

Use the repo for:

- Code
- Backend workflows
- Source-controlled docs
- Build queue
- Design option files
- Screenshots
- SQL scripts
- Deployment notes

Use Notion for:

- Active task board
- Weekly review
- Content calendar
- Raw AI ideas
- Client system status
- Quick links
- Human-friendly dashboard

## Database Mapping

### Task Tracker

Purpose:

Track execution tasks across product, website, backend, content, and client work.

Source repo file:

```txt
docs/project/Build-Queue.md
```

Recommended Notion properties:

```txt
Name
Status: Backlog | Planned | In Progress | Blocked | Done
Phase: Foundation | External Setup | Owned Websites | App MVP | Backend Engine | Client Diagnostic Engine | Content
Priority: High | Medium | Low
Owner: Therrance | Codex | Claude | n8n | Manual
Type: Code | Design | Backend | Content | Docs | Setup | QA
Blocked By
Repo Link
Notion Source
Due Date
Last Updated
```

Tasks to add now:

```txt
Run Supabase-Service-Role-Grants.sql
Retest buildout request -> Thurnos blueprint persistence
Update active n8n workflow with Thurnos bridge node
Choose We build. You profit. placement option
Implement selected We build. You profit. website placement
Full accessibility and mobile QA pass
Create future Thurr community roadmap
Create client diagnostic re-skin checklist
Create lead-gen niche prompt packs
```

### Content Calendar

Purpose:

Schedule LinkedIn-first content, website updates, Remotion clips, and future video posts.

Source repo files:

```txt
docs/project/LinkedIn-First-B2B-Content-Plan.md
docs/project/AI-Automation-Content-Inspiration-Tracker.md
docs/project/Remotion-Content-Starter.md
```

Recommended Notion properties:

```txt
Title
Status: Idea | Drafting | Scheduled | Posted | Repurpose | Archived
Channel: LinkedIn | Website | YouTube | Instagram | Remotion | Email
Content Pillar: Missed Lead Leaks | Buildout Blueprint | BTS Builds | Local Service Automation | Founder Perspective | Offer
CTA
Publish Date
Asset Link
Source Doc
Performance Notes
```

First content items to add:

```txt
Most businesses do not have a lead problem. They have a follow-up leak.
Ideas do not pay you. Systems do.
Mobile detailing lead-to-booking system breakdown.
Contact forms are not systems.
Built today: form -> n8n -> Supabase -> Discord.
AI agents should prepare decisions, not replace owner judgment.
We build. You profit. What that actually means.
```

### AI Ideas Log

Purpose:

Capture raw ideas from Claude, Codex, Thurnos, social inspiration, client calls, and build sessions.

Source repo files:

```txt
docs/project/AI-Automation-Content-Inspiration-Tracker.md
docs/project/Marketing-Strategy-Inputs.md
docs/product/AI-Business-Buildout-Plan-Engine.md
```

Recommended Notion properties:

```txt
Idea
Category: Content | Product | Client Offer | Automation | Design | Community | Sales
Source: Codex | Claude | Thurnos | Client | Social | Manual
Status: Raw | Review | Approved | Turned Into Task | Archived
Next Action
Related Task
Related Content
```

Capture examples:

```txt
Wedding branding diagnostic funnel.
Funeral home follow-up automation offer.
Mobile detailing quote workflow demo.
Client report-to-content repurposing.
Daily owner summary automation.
Prototype requests through Discord.
```

### Thurr Solutions Client Command Center

Purpose:

Track client-facing systems separately from owned Right Thurr/Thurr Solutions work.

Source repo files:

```txt
docs/brand/Client-Template-Brand-Boundary.md
docs/project/Analytics-Event-Plan.md
docs/backend/Buildout-Webhook-Contract.md
```

Recommended Notion sections:

```txt
Client Systems
Active Leads
Blueprints / Reports
Automations
Follow-Up Sequences
Client Assets
Revenue / ROI Notes
Meeting Notes
```

Recommended client system properties:

```txt
Client Name
System Name
Niche
Status: Prospect | Blueprint Draft | Building | Live | Monitoring | Paused
Brand Context: Client-Owned | Thurr Solutions Case Study | Right Thurr Demo
Report Type
Automation Status
Last Action
Next Action
Revenue / Lead Impact
Owner Review Required
```

Brand boundary rule:

```txt
Client systems can reuse the backend engine, but must be visually re-skinned unless the asset is a Thurr Solutions case study or sales asset.
```

### Work Space URL

Purpose:

Centralize live links, repo links, dashboards, and account pages.

Recommended sections:

```txt
Live Sites
Repos
Vercel
Supabase
n8n
Discord
Cloudflare
Design Assets
Docs
```

Add these links:

```txt
Website: https://thurrsolutions.com
Build site: https://build.thurrsolutions.com
Repo: https://github.com/carrotherstherrance28-alt/right-thurr-audit
Supabase project: https://supabase.com/dashboard/project/xplfryahxdegfvxmymco
Vercel project: https://vercel.com/thurrenterprise-6341s-projects/right-thurr-audit
```

### To Do List

Purpose:

Quick capture only.

Rule:

```txt
Anything that will take more than one session should be moved into Task Tracker.
```

Use for:

- Quick reminders
- Login/setup tasks
- Manual account actions
- One-off checks

## Weekly Monday Review

Use this Notion flow each Monday:

1. Review Task Tracker blocked tasks.
2. Move one backend task, one website task, and one content task into the week.
3. Review Content Calendar and pick 4 LinkedIn posts.
4. Move useful AI Ideas into either Task Tracker or Content Calendar.
5. Check Client Command Center for follow-up tasks.
6. Ask Claude/Codex/Thurnos for new content ideas only after reviewing what already exists.

## Sync Rules For Codex Sessions

At the end of a Codex session:

- Update `docs/project/Build-Queue.md`.
- Commit and push repo changes.
- Give user a Notion update summary they can paste into Task Tracker.
- Mark the next task clearly.

Suggested paste format:

```txt
Task:
Status:
What changed:
Repo commit:
Blocked by:
Next action:
```

## Immediate Notion Paste Updates

Paste these into Task Tracker:

```txt
Task: Run Supabase service-role grants
Status: Blocked / Manual
Phase: Backend Engine
Priority: High
Owner: Therrance
Blocked By: Supabase SQL Editor action
Next Action: Run docs/backend/Supabase-Service-Role-Grants.sql, then tell Codex "success no rows returned."
```

```txt
Task: Choose We build. You profit. website placement
Status: Planned
Phase: Owned Websites
Priority: Medium
Owner: Therrance
Next Action: Choose Option A, B, or C. Codex recommends Option B.
```

```txt
Task: Full accessibility and mobile QA pass
Status: Planned
Phase: Owned Websites
Priority: Medium
Owner: Codex
Next Action: Run browser/mobile review after next deploy window opens.
```

Paste these into Content Calendar:

```txt
Title: Most businesses do not have a lead problem. They have a follow-up leak.
Channel: LinkedIn
Pillar: Missed Lead Leaks
Status: Idea
CTA: Ask where leads get stuck.
```

```txt
Title: Built today: form -> n8n -> Supabase -> Discord.
Channel: LinkedIn
Pillar: Behind-The-Scenes Builds
Status: Idea
CTA: Ask who wants the simple diagram.
```

Paste these into AI Ideas Log:

```txt
Idea: Prototype requests through Discord while on the go.
Category: Automation
Source: Codex / Thurnos
Status: Raw
Next Action: Turn into task after n8n bridge persistence works.
```

```txt
Idea: Client diagnostic funnels should reuse backend logic but never inherit Thurr visual branding by default.
Category: Client Offer
Source: Brand boundary docs
Status: Approved
Next Action: Use in client re-skin checklist.
```
