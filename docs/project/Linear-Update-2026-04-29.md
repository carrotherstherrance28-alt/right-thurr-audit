# Linear Update - 2026-04-29

Use this as the Linear project/status update for the Right Thurr / Thurr Solutions MVP.

## Project

Right Thurr / Thurr Solutions Buildout Engine

## Status

On track. CRM lifecycle is verified; owner auth/RLS is the active trust-boundary task.

## Summary

The public Thurr Solutions site, buildout intake path, n8n workflow, Supabase persistence, Thurnos/OpenAI blueprint bridge, Discord alerts, manual review mode, Resend approved email delivery, CRM lifecycle tagging, Notion Command Center databases, and client diagnostic documentation package are now in place.

Latest pushed commit is `2b857a5`; Vercel production deploy is blocked until the free daily deployment cap resets.

## Completed

- Public website and buildout intake deployed to Vercel.
- `build.thurrsolutions.com` and `right-thurr-audit.vercel.app` resolve to production.
- n8n intake workflow saves buildout requests and calls the private blueprint bridge.
- Supabase stores requests, generated reports, systems, tasks, and activity logs.
- Discord `#leads-alerts` receives privacy-safe intake alerts.
- Reports default to manual review before delivery.
- `/api/approve-report` supports approval-only mode and Resend-backed delivery.
- Approved test email delivery to `therrance@thurrsolutions.com` succeeded.
- Owner review API is private-by-default; unauthenticated `/api/review-reports` returns `401`.
- CRM lifecycle fields are installed and verified: `lead_status`, `crm_tags`, and `last_activity_at`.
- Fresh QA moved a request from intake to `awaiting_review` to `approved_for_delivery`.
- Notion Task Tracker, Content Calendar, and AI Ideas Log were created under the Command Center.
- Owner Report Review Queue frontend magic-link auth has been re-enabled.
- Supabase owner RLS hardening SQL exists at `docs/backend/Supabase-Owner-RLS-Hardening.sql`.
- Recurring hourly build-session automation was created for one-task-at-a-time execution.
- Mobile detailing was selected as the first client diagnostic V1 lane.
- Three mobile detailing diagnostic screenshot options were created before frontend coding.
- Client diagnostic package added:
  - unbranded diagnostic report template
  - Thurr Solutions sales diagnostic version
  - client re-skin checklist
  - lead-gen niche prompt packs
  - follow-up automation templates

## Blocked

- Owner RLS hardening needs one owner Supabase Auth user. Sign in once with the owner magic link, then run `docs/backend/Supabase-Owner-RLS-Hardening.sql`.
- Vercel free daily deployment cap blocked deploying commit `2b857a5`.

## Next

1. Retry Vercel production deploy after the free daily deployment cap resets.
2. Open the owner Command Center and request the Supabase magic link.
3. After first owner sign-in, run `docs/backend/Supabase-Owner-RLS-Hardening.sql` in Supabase SQL Editor.
4. QA the private report queue against production:

```text
signed out -> locked
signed in owner -> reports load
approve without send -> approved_for_delivery / approved_for_follow_up
```

5. Pick one mobile detailing diagnostic visual option, then implement the selected reusable template.

## Linear Tasks To Create Or Update

### 1. QA Owner Magic-Link Report Queue

Priority: High

Description:
Verify the production owner Report Review Queue after Vercel deploys commit `2b857a5`.

Acceptance criteria:
- Signed-out owner queue stays locked.
- Magic-link request sends to the approved owner email.
- Signed-in owner can load reports.
- Non-owner sessions are rejected server-side.

### 2. Run Owner RLS Hardening SQL

Priority: High

Description:
After the owner Auth user exists, run `docs/backend/Supabase-Owner-RLS-Hardening.sql` in Supabase SQL Editor.

Acceptance criteria:
- `owner_profiles` table exists.
- Approved owner profile row exists.
- Authenticated owner read policies exist for private tables.
- Anonymous reads remain blocked.

### 3. Verify Fresh Buildout Lifecycle

Priority: High

Description:
Submit one fresh internal buildout request and verify it persists through intake, blueprint generation, manual review, approval-only mode, CRM tags, and activity logs.

Acceptance criteria:
- Request row is created.
- Generated report starts as `needs_review`.
- Request moves to `awaiting_review`.
- Approval-only mode moves request/report to `approved_for_delivery`.
- `crm_tag_applied` activity exists.
- CRM fields reflect the lifecycle.

### 4. Build Client Diagnostic V1 From Templates

Priority: Medium

Description:
Turn the mobile detailing V1 spec into the first client-ready diagnostic flow and report package.

Acceptance criteria:
- Three screenshot options are created before coding the frontend.
- One option is selected for implementation.
- Unbranded diagnostic report can be re-skinned.
- Thurr Solutions sales version has a clear CTA.
- Mobile detailing prompt pack is selected for the first target market.
- Follow-up template sequence is mapped to n8n.

### 5. Decide Linear Mirror Scope

Priority: Low

Description:
Use Linear for high-level phases and active sprint tasks only. Keep `docs/project/Build-Queue.md` as the detailed build source of truth until a Linear connector is available.

Acceptance criteria:
- Linear project has no noisy microtasks.
- Active sprint has only current blockers and next work.
- Repo docs remain the canonical technical handoff.
