# Linear Update - 2026-04-29

Use this as the Linear project/status update for the Right Thurr / Thurr Solutions MVP.

## Project

Right Thurr / Thurr Solutions Buildout Engine

## Status

On track, with one database migration blocker.

## Summary

The public Thurr Solutions site, buildout intake path, n8n workflow, Supabase persistence, Thurnos/OpenAI blueprint bridge, Discord alerts, manual review mode, Resend approved email delivery, and client diagnostic documentation package are now in place.

Latest production deploy is live from commit `93b4088`.

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
- Client diagnostic package added:
  - unbranded diagnostic report template
  - Thurr Solutions sales diagnostic version
  - client re-skin checklist
  - lead-gen niche prompt packs
  - follow-up automation templates

## Blocked

- Supabase CRM field migration is not installed yet.
- Verification returned: `column buildout_requests.lead_status does not exist`.

## Next

1. Run `docs/backend/Supabase-CRM-Fields-Migration.sql` in Supabase SQL Editor.
2. Verify one fresh buildout request moves through:

```text
requested -> awaiting_review -> approved_for_delivery
```

3. Confirm `lead_status`, `crm_tags`, and `last_activity_at` are visible in Supabase.
4. Decide the final owner auth/RLS path before showing real private client/operator records in the owner UI.

## Linear Tasks To Create Or Update

### 1. Run Supabase CRM Field Migration

Priority: High

Description:
Run `docs/backend/Supabase-CRM-Fields-Migration.sql` in Supabase SQL Editor, then verify `buildout_requests` includes `lead_status`, `crm_tags`, and `last_activity_at`.

Acceptance criteria:
- SQL runs with no errors.
- REST check for `buildout_requests?select=id,lead_status,crm_tags,last_activity_at&limit=1` returns `200`.
- Build queue and connector status docs are updated.

### 2. Verify Fresh Buildout Lifecycle

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

### 3. Finalize Owner Auth And RLS Path

Priority: High

Description:
Decide and implement the owner authentication path before real private report data appears in the owner UI.

Acceptance criteria:
- Owner access is private-by-default.
- Approved owner identity is enforced server-side.
- Supabase RLS policy direction is documented and implemented before real client/operator data is shown.
- Public visitors cannot access private report details.

### 4. Build Client Diagnostic V1 From Templates

Priority: Medium

Description:
Turn the new product docs into the first client-ready diagnostic flow and report package.

Acceptance criteria:
- Unbranded diagnostic report can be re-skinned.
- Thurr Solutions sales version has a clear CTA.
- Niche prompt pack is selected for the first target market.
- Follow-up template sequence is mapped to n8n.

### 5. Decide Linear Mirror Scope

Priority: Low

Description:
Use Linear for high-level phases and active sprint tasks only. Keep `docs/project/Build-Queue.md` as the detailed build source of truth until a Linear connector is available.

Acceptance criteria:
- Linear project has no noisy microtasks.
- Active sprint has only current blockers and next work.
- Repo docs remain the canonical technical handoff.
