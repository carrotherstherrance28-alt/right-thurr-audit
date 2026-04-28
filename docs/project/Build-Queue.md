# Right Thurr Build Queue

This is the working task list for building the owned Right Thurr / Thurr Solutions websites and app. Use it to continue one task at a time across sessions.

## Current Rule

Use the Right Thurr / Thurr Solutions design system only for our owned brands.

Client diagnostic funnels can use the same backend engine, but they must stay visually re-skinnable and should not inherit Right Thurr styling unless the work is a Thurr Solutions case study or sales asset.

Before coding major visual changes, create 3 different example screenshots/options for review. The user chooses one direction or combines parts, then implementation starts.

## Phase 1: Foundation

- [x] Import Right Thurr / Thurr Solutions design system zip into repo.
- [x] Copy owned-brand assets into app source.
- [x] Create Right Thurr React/Vite app shell.
- [x] Add initial Right Thurr command center screen.
- [x] Run app build successfully.
- [x] Build first Right Thurr landing page pass.
- [x] Add dedicated AI Business Buildout Plan page/view.
- [x] Define n8n webhook payload contract.
- [x] Wire buildout form for optional n8n webhook URL.
- [x] Add first Thurr Solutions services page/view.
- [x] Connect local repo to GitHub remote `right-thurr-audit`.
- [x] Add domain strategy for Right Thurr, Thurr Solutions, diagnostics, and backups.
- [x] Add Supabase env placeholders.
- [x] Distill marketing fundamentals into project strategy notes.
- [x] Apply browser comments: remove header wordmark, revise hero headline, convert brand image to watermark treatment.
- [x] Create 3 homepage screenshot options before coding the next visual direction.
- [x] Add secondary R+T logo as favicon and website/social preview cover.
- [x] Add robots.txt, sitemap.xml, web app manifest, theme color, and Apple touch icon.
- [x] Add direct setup checklist for GitHub, Vercel, n8n, Supabase, and domains.
- [ ] Run app locally and verify the first screen.
- [ ] Fix responsive/layout issues from browser review.
- [ ] Create clean repo branch and first commit.
- [ ] Connect repo to GitHub `right-thurr`.

## External Setup Tasks

- [ ] Confirm whether GitHub repo should stay `right-thurr-audit` or be renamed to `right-thurr`.
- [ ] Push local repo to GitHub after first commit.
- [ ] Create Vercel project for Right Thurr.
- [ ] Add Vercel environment variable `VITE_N8N_BUILDOUT_WEBHOOK_URL`.
- [ ] Add Vercel environment variables `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` after Supabase exists.
- [ ] Create Supabase project.
- [ ] Create Supabase tables for leads/buildout requests/activity logs.
- [ ] Create n8n workflow `Right Thurr - Buildout Plan Intake`.
- [ ] Create n8n production webhook URL and add it to Vercel/local env.
- [ ] Domain decision: use `rightthurr.com` for Right Thurr product/app.
- [ ] Domain decision: use `thurrsolutions.com` for Thurr Solutions B2B services.
- [ ] Future domain: use `diagnostic.thurrsolutions.com` for client diagnostic funnels.
- [ ] Future domain: use `app.rightthurr.com` for logged-in app.
- [ ] Hold `thurrenterprise.com` for future parent/enterprise brand.
- [ ] Use `thurrsolutions.online` only for backup, staging, or redirects.

## Phase 2: Owned Websites

- [x] Build Right Thurr product landing page first pass.
- [x] Build AI Business Buildout Plan landing page first pass.
- [x] Build Thurr Solutions B2B services page first pass.
- [ ] Add brand boundary notes to reusable client template docs.
- [ ] Create shared website header/footer components.
- [ ] Add basic SEO metadata.
- [ ] Add founder/operator trust section for Thurr Solutions.
- [ ] Add accessibility and mobile QA pass.
- [ ] Add analytics event plan for CTA/form/report/booked-call tracking.
- [ ] Add LinkedIn-first B2B content plan.

## Phase 3: Right Thurr App MVP

- [ ] Add Start Build onboarding form.
- [ ] Add generated Autopilot Blueprint view.
- [ ] Add Systems screen.
- [ ] Add Activity Feed screen.
- [ ] Add Money screen with manual entries.
- [ ] Add AI Engine screen.
- [ ] Add mock local data store.
- [ ] Add exportable report layout.

## Phase 4: Backend Execution Engine

- [ ] Define n8n webhook payload.
- [x] Define n8n webhook payload.
- [ ] Create Supabase table schema.
- [ ] Create Activity Log event schema.
- [ ] Build n8n intake workflow.
- [ ] Add AI blueprint generation prompt chain.
- [ ] Add email delivery step.
- [ ] Add Slack notification step.
- [ ] Add CRM tagging step.

## Phase 5: Client-Ready Diagnostic Engine

- [ ] Create unbranded diagnostic report template.
- [ ] Create Thurr Solutions-branded sales version.
- [ ] Create client re-skin checklist.
- [ ] Create lead-gen niche prompt packs.
- [ ] Add manual review mode before reports send.
- [ ] Add follow-up automation templates for meeting thank-you, post-project thank-you, referral request, and deliverable reminders.

## Suggested Session Rhythm

Hourly session:

1. Pick one task from the current phase.
2. For visual work, create 3 screenshot options before coding.
3. Implement the selected direction.
4. Run the relevant check.
5. Update this queue.
6. Stop with the next task clearly marked.

Daily session:

1. Finish one complete feature or page.
2. Run build and browser review.
3. Commit clean progress.
4. Write a short next-day task list.

## Next Task

Create clean environment and setup instructions for GitHub/Vercel/n8n handoff.
