# Manual update checklist — Lead Flow Audit Agent (Thurnos)

Codex cannot write to `/Users/thurr/thurnos-memory` directly. Use this checklist to apply the update safely.

## 1) Copy the spec into thurnos-memory

- Copy:
  - From: `/Users/thurr/Documents/New project/docs/project/ops-agent-specs/lead-flow-audit-agent.md`
  - To: `/Users/thurr/thurnos-memory/memory/semantic/ops/lead-flow-audit-agent.md`

## 2) Wire it into the command menu

Edit `/Users/thurr/thurnos-memory/memory/semantic/ops/agent-command-menu.md`:

- Add a new “Recommended Next Agents” entry:
  - Name: `Lead Flow Audit Agent`
  - Purpose: verify CTA→form→Supabase→n8n intake path; draft fixes/tasks
  - Add “Use when Thurr says” triggers (see spec)
  - Spec path: `/Users/thurr/thurnos-memory/memory/semantic/ops/lead-flow-audit-agent.md`

Optionally add it into “Agent Creation Priority” after the Operations Manager Agent since it supports May 2026 priority stack.

### Ready-to-paste snippet (Recommended Next Agents)

Paste this block under `## Recommended Next Agents` (suggested placement: right after “Website Ops Agent”):

```md
### Lead Flow Audit Agent

Purpose: keep the Thurr Solutions website “Lead Flow Audit” funnel working end-to-end (CTA → form → Supabase → n8n → follow-up tasks) and draft fixes/tasks.

Use when Thurr says:

- check my lead flow
- audit the website intake
- are the forms working
- did we lose leads
- is Supabase receiving submissions
- is n8n firing
- what’s broken in the funnel
- can you verify the Lead Flow Audit path

Spec: `/Users/thurr/thurnos-memory/memory/semantic/ops/lead-flow-audit-agent.md`
```

### Optional change: Agent Creation Priority

If you want this agent to show up as a “do this next” priority, insert it after the Operations Manager Agent and renumber the rest:

```md
## Agent Creation Priority

1. Operations Manager Agent: active now.
2. Lead Flow Audit Agent: keep the website lead funnel from silently breaking.
3. Client Delivery Agent: next, because paid clients can fall behind.
4. Sales Follow-Up Agent: next, because warm leads equal cash flow.
5. n8n Systems Agent: after backups are verified.
6. Content Engine Agent: useful, but should not distract from paid delivery.
7. Website Ops Agent: keep proof + CTA current without redesign spirals.
8. Compliance Guard Agent: needed before healthcare/minors/insurance builds.
9. Right Thurr Brand Agent: validate later; do not let it outrun B2B revenue.
```

## 3) Add it to MEMORY.md Key Files index

Edit `/Users/thurr/thurnos-memory/memory/MEMORY.md` under “## Key Files”:

- Add:
  - `memory/semantic/ops/lead-flow-audit-agent.md` — website Lead Flow Audit funnel verification agent spec (CTA → form → Supabase → n8n), drafts fixes/tasks only

### Ready-to-paste snippet (Key Files)

Paste this bullet under `## Key Files` near the other `memory/semantic/ops/...` entries:

```md
- `memory/semantic/ops/lead-flow-audit-agent.md` — website Lead Flow Audit funnel verification agent spec (CTA → form → Supabase → n8n), drafts fixes/tasks only
```

## 4) (Optional) Stage a repo copy

Already staged here:
- `/Users/thurr/Documents/New project/docs/project/ops-agent-specs/lead-flow-audit-agent.md`

## 5) Sanity check (no production changes)

- Confirm file appears in: `/Users/thurr/thurnos-memory/memory/semantic/ops`
- Ensure command menu lists it
- Ensure MEMORY.md indexes it
