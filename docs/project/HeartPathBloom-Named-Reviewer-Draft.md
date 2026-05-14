# HeartPathBloom — Named Reviewer (Decision Helper Draft)

Status: Draft (safe, no secrets)

Purpose: Provide a fill-in template for the **named adult human escalation reviewer** required before any youth wellness / mental-health-adjacent automation can be implemented safely.

Non-negotiable guardrails:
- This is **not** clinical decisioning, diagnosis, or therapy.
- No crisis promise language unless the client’s licensed team explicitly provides it.
- No personal health info (PHI) storage requirements implied by this doc.
- The “reviewer” is a **real person** responsible for escalation decisions + response.

---

## Decision to collect from client (fill in)

### 1) Reviewer identity
- Reviewer name: `TBD`
- Role/title (optional): `TBD`
- Organization (optional): `TBD`

### 2) Escalation contact method (choose one primary)
- Primary channel: `SMS` / `Phone call` / `Email` / `Other`
- Primary contact address (do not store in repo): `Provided out-of-band`
- Backup channel (optional): `TBD`

### 3) Availability + response expectations
- Hours (time zone): `TBD`
- Expected response window: `TBD` (example: “same day” or “within 1 business day”)
- Weekend/after-hours handling: `TBD` (example: “send auto-disclaimer + route to resources page”)

### 4) What triggers escalation (plain language)
Examples (pick/adjust):
- Self-harm language or crisis signals
- “I’m not safe” / “I want to disappear”
- Reports of abuse, exploitation, or immediate danger
- User asks for medical/clinical advice
- Any content flagged by the client’s own policy rules

Client-approved triggers:
- `TBD`

### 5) What the system must do on escalation (process)
- Step 1: `TBD` (example: “pause automated responses + show ‘get help now’ resources”)
- Step 2: `TBD` (example: “notify reviewer via chosen channel”)
- Step 3: `TBD` (example: “log a minimal event record without sensitive content”)
- Step 4: `TBD` (example: “reviewer decides whether to follow up directly”)

### 6) Disclaimers (client-approved wording)
- “This is not medical advice.” wording: `TBD`
- Emergency guidance wording (if any): `TBD`

---

## Output format Thurr can paste back into the backlog ticket

- Named reviewer: `<Name> (<Role>)`
- Primary escalation channel: `<SMS/Call/Email/...>` (details provided out-of-band)
- Hours + response window: `<Hours> / <SLA>`
- Approved escalation triggers: `<Bullets>`
- Approved escalation steps: `<Bullets>`
