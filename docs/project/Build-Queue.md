# Right Thurr Build Queue

This is the working task list for building the owned Right Thurr / Thurr Solutions websites and app. Use it to continue one task at a time across sessions.

## Current Rule

Use the Right Thurr / Thurr Solutions design system only for our owned brands.

Client diagnostic funnels can use the same backend engine, but they must stay visually re-skinnable and should not inherit Right Thurr styling unless the work is a Thurr Solutions case study or sales asset.

Public visitors should see the offer under `Thurr`, with `Thurr Solutions` as the top-left company lockup. Right Thurr can stay as an internal/product-engine name in backend/workflow language until the brand architecture is finalized.

Operator preview should stay narrow: `Command Center` for activity, AI, money, alerts, and next moves; `Systems` for individual business workspaces. Real owner authentication is required before private client/operator data is stored or shown.

Before coding major visual changes, create 3 different example screenshots/options for review. The user chooses one direction or combines parts, then implementation starts.

All tasks should use a plan-first automation loop before build work starts:

1. Create a short task plan.
2. Refine the plan at least twice, or until it is clear enough to execute without guessing.
3. For visual work, create 3 screenshot/options before coding.
4. Build only the selected/refined direction.
5. Run the relevant check.
6. Update this queue.
7. Stop with the next task clearly marked.

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
- [x] Add temporary Supabase direct-intake fallback when n8n is not connected.
- [x] Add Vercel API route for production Supabase intake.
- [x] Add first Thurr Solutions services page/view.
- [x] Connect local repo to GitHub remote `right-thurr-audit`.
- [x] Add domain strategy for Right Thurr, Thurr Solutions, diagnostics, and backups.
- [x] Add Supabase env placeholders.
- [x] Distill marketing fundamentals into project strategy notes.
- [x] Apply browser comments: remove header wordmark, revise hero headline, convert brand image to watermark treatment.
- [x] Create 3 homepage screenshot options before coding the next visual direction.
- [x] Implement selected direction: Option B homepage, Option A buildout page, Option C brand architecture.
- [x] Add secondary R+T logo as favicon and website/social preview cover.
- [x] Add robots.txt, sitemap.xml, web app manifest, theme color, and Apple touch icon.
- [x] Add direct setup checklist for GitHub, Vercel, n8n, Supabase, and domains.
- [x] Add deployment verification checklist.
- [x] Add connector/plugin strategy with pros, cons, and recommended order.
- [x] Run app locally and verify the first screen.
- [x] Fix responsive/layout issues from browser review.
- [x] Create clean repo branch and first commit.
- [x] Connect repo to GitHub remote `right-thurr-audit`.

## External Setup Tasks

- [ ] Confirm whether GitHub repo should stay `right-thurr-audit` or be renamed to `right-thurr`.
- [ ] Push local repo to GitHub after first commit.
- [ ] Create Vercel project for Right Thurr.
- [x] Create/import Vercel project for Right Thurr.
- [x] Verify live Vercel deployment URL.
- [x] Add Vercel environment variable `VITE_N8N_BUILDOUT_WEBHOOK_URL`.
- [x] Add Vercel environment variables for Supabase intake after Supabase exists.
- [x] Redeploy Vercel after environment variables are added.
- [ ] Create Supabase project.
- [x] Create Supabase project.
- [x] Store Supabase project URL and anon key locally in ignored `.env.local`.
- [x] Add Supabase MVP schema and setup docs.
- [x] Add generated reports table to Supabase MVP schema.
- [x] Add live account setup checklist for Vercel, Supabase, n8n, and domains.
- [x] Add n8n workflow build sheet and AI prompt chain.
- [x] Create Supabase tables for leads/buildout requests/activity logs.
- [x] Create n8n workflow `Right Thurr - Buildout Plan Intake`.
- [x] Create n8n production webhook URL and add it to Vercel/local env.
- [x] Test form submission against Supabase or n8n.
- [x] Draft Slack status update after n8n intake works.
- [ ] Fix n8n Slack credential/channel access for buildout request alerts.
- [x] Create Discord `#leads-alerts` webhook.
- [x] Add Discord buildout request alert to n8n.
- [x] Hide owner/operator screens from public website navigation.
- [x] Consolidate repetitive owner tabs into Command Center and Systems.
- [x] Add Supabase owner email auth gate for operator preview.
- [x] Add local Thurnos/Ollama smoke test and bridge documentation.
- [x] Reposition public website copy around Thurr Solutions LLC instead of Right Thurr.
- [x] Reposition public website copy around Thurr instead of Thurr Solutions LLC.
- [x] Add top-right dropdown navigation for Home, Buildout Plan, Thurr, and About Therrance.
- [x] Add founder/operator trust section for Therrance Carrothers.
- [x] Document Thurnos OpenAI brain swap and Discord prototype command path.
- [x] Install Remotion and add first branded vertical intro composition.
- [ ] Decide whether to expose/use Linear after the current build queue is stable.
- [ ] Domain decision: use `rightthurr.com` for Right Thurr product/app.
- [x] Domain decision: use `thurrsolutions.com` for Thurr Solutions B2B services.
- [x] Add `thurrsolutions.com` and `www.thurrsolutions.com` to Vercel `right-thurr`.
- [x] Add `build.thurrsolutions.com` to Vercel `right-thurr-audit`.
- [x] Update Cloudflare DNS records for `thurrsolutions.com`, `www`, and `build` to Vercel.
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
- [x] Add basic SEO metadata.
- [x] Add founder/operator trust section for Thurr Solutions.
- [ ] Add full accessibility and mobile QA pass.
- [x] Add analytics event plan for CTA/form/report/booked-call tracking.
- [x] Add LinkedIn-first B2B content plan.
- [x] Create inspiration tracker for Nate Herk and other AI automation/content references.
- [ ] Add future community roadmap for Thurr brand after consistent content exists.

## Phase 3: Right Thurr App MVP

- [ ] Add Start Build onboarding form.
- [x] Create 3 generated Autopilot Blueprint report screenshot options.
- [x] Add generated Autopilot Blueprint view.
- [x] Create 3 Activity Feed screen options before coding.
- [x] Add Activity Feed screen.
- [x] Create 3 Systems screen options before coding.
- [x] Add Systems screen.
- [x] Create 3 Money screen options before coding.
- [x] Add Money screen with manual entries.
- [x] Create 3 AI Engine screen options before coding.
- [x] Add AI Engine screen.
- [x] Add mock local data store.
- [x] Add real owner authentication before storing or showing private client/operator data.
- [ ] Add owner RLS hardening before loading real private operator/client records.
- [x] Create 3 exportable report layout options before coding.
- [x] Add exportable report layout.

## Phase 4: Backend Execution Engine

- [ ] Define n8n webhook payload.
- [x] Define n8n webhook payload.
- [ ] Create Supabase table schema.
- [ ] Create Activity Log event schema.
- [ ] Build n8n intake workflow.
- [x] Add AI blueprint generation prompt chain.
- [x] Add private n8n -> Thurnos bridge endpoint.
- [x] Add generated report/system/task/activity draft persistence path.
- [ ] Add email delivery step.
- [x] Add Discord notification step.
- [ ] Add Slack notification step later if needed.
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
2. Create a short plan and refine it twice before building.
3. For visual work, create 3 screenshot options before coding.
4. Implement the selected/refined direction.
5. Run the relevant check.
6. Update this queue.
7. Stop with the next task clearly marked.

Daily session:

1. Finish one complete feature or page.
2. Run build and browser review.
3. Commit clean progress.
4. Write a short next-day task list.

## Latest Completed

- [x] Added AI automation/content inspiration tracker for Nate Herk reference patterns and future Thurr Solutions content/community planning.
- [x] Updated basic SEO metadata, canonical URL, sitemap, robots, and web manifest for Thurr Solutions.
- [x] Added analytics event plan for CTA, buildout form, blueprint report, booked-call intent, social, owner, and backend activity tracking.
- [x] Added LinkedIn-first B2B content plan with 4-week starter calendar, post formats, CTA rules, and measurement loop.
- [x] Sent a live QA Right Thurr buildout request through n8n.
- [x] Verified n8n execution finished successfully.
- [x] Verified the Discord `#leads-alerts` node ran in the successful execution.
- [x] Deployed and verified the AI Engine screen.
- [x] Moved MVP mock app data into `src/data/rightThurrMockData.js`.
- [x] Split public website navigation from owner/operator preview screens.
- [x] Added export-ready Autopilot Blueprint report view using Option A.
- [x] Narrowed navigation to public website tabs plus owner Command Center/Systems.
- [x] Added Supabase email magic-link gate for `?operator=1` with server-side owner email allowlist.
- [x] Verified local `thurnos:latest` responds through Ollama.
- [x] Updated public site positioning to `Thurr Solutions LLC`.
- [x] Updated public site positioning to `Thurr` and added Therrance Carrothers section.
- [x] Added Thurnos OpenAI/Discord orchestration notes.
- [x] Installed Remotion with `ThurrIntro` vertical content starter.
- [x] Added Thurnos blueprint draft script and n8n mapping guide.
- [x] Added private Thurnos blueprint bridge API and Supabase persistence path.
- [x] Added Vercel production env for Thurnos provider, OpenAI model, OpenAI API key, and bridge shared secret.
- [x] Verified OpenAI-provider blueprint generation locally.
- [x] Added local private bridge dry-run command and Supabase secret-key fallback support.
- [x] Added Supabase service-role grant SQL for server-side report/system/task/activity persistence.

## Next Task

Run `docs/backend/Supabase-Service-Role-Grants.sql` in Supabase SQL Editor, retest the live `/api/buildout-request` -> `/api/thurnos-blueprint` persistence path, then update the active n8n workflow.
