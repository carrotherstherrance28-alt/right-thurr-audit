# Client Diagnostic V1: Mobile Detailing

This is the first client-ready diagnostic lane for Thurr Solutions.

Use it to prove the repeatable engine:

```txt
Lead lands on diagnostic page
-> fills out business/lead-flow intake
-> n8n saves and tags the lead
-> AI drafts a custom diagnostic
-> owner reviews the report
-> approved follow-up invites the prospect into a buildout conversation
```

## Why This Niche First

Mobile detailing is a strong first diagnostic because the business problem is easy to understand.

- Leads often come from Google, Instagram, Facebook, referrals, and texts.
- Buyers want fast pricing, clear packages, proof, and simple booking.
- Owners lose money when quote requests sit too long.
- Follow-up is usually manual and inconsistent.
- Reviews, before/after photos, and repeat bookings matter.
- The first system can be small but valuable: quote request, owner alert, fast reply, CRM tag, follow-up, and review request.

This niche lets Thurr show the machine working without needing a complex regulated workflow.

## Offer

Public offer:

```txt
Get a free Mobile Detailing Lead-Flow Diagnostic.
```

Stronger page headline:

```txt
See where your detailing leads are leaking before they book someone else.
```

Supporting copy:

```txt
Thurr reviews your offer, quote path, response speed, follow-up, and booking flow, then maps the first system that would help turn more requests into booked details.
```

CTA:

```txt
Get My Lead-Flow Diagnostic
```

## Intake Fields

Keep the form short enough that a busy owner finishes it.

Required:

- Name
- Email
- Business name
- Website or social link
- Service area
- Main detailing offer
- Biggest lead problem
- Current booking method

Optional:

- Average job value
- Monthly lead volume
- Main lead source
- Follow-up tool used now
- Do you want more leads, faster booking, better follow-up, or repeat customers?

## Scoring

Use five 1-5 scores.

| Category | Measures | Low Score Signal | High Score Signal |
|---|---|---|---|
| Offer clarity | Packages, pricing cues, outcome promise | Visitor has to guess what to book | Clear services and next step |
| Quote readiness | Form captures vehicle, service, location, urgency | Owner has to ask basic follow-up questions manually | Quote request arrives with usable details |
| Speed to lead | How fast new requests get acknowledged | Lead waits in DMs/inbox | Immediate confirmation and owner alert |
| Trust/proof strength | Reviews, before/after, service area proof | Few visible reasons to trust | Proof supports booking decision |
| Follow-up reliability | Re-engagement after no reply | One manual reply, then silence | Follow-up sequence keeps the lead warm |

Overall score:

```txt
Overall Lead-Flow Score: [0-100]
Biggest leak: [one sentence]
Fastest win: [one sentence]
Recommended first system: [one sentence]
```

## Report Sections

The generated diagnostic should include:

1. Lead-Flow Snapshot
2. What Is Working
3. Biggest Booking Leak
4. Lead-Flow Scorecard
5. Fastest Fix
6. Recommended First System
7. Follow-Up Plan
8. 14-Day Implementation Path
9. What Thurr Would Build
10. Recommended Next Step

## Recommended First System

Default recommendation:

```txt
Mobile Detailing Quote-to-Booking System
```

It includes:

- Landing page or booking section CTA cleanup
- Quote request form
- Vehicle/service/location intake fields
- Supabase or CRM lead record
- Discord owner alert with privacy-safe summary
- Fast reply email/SMS draft
- 2-3 message follow-up sequence
- Daily or weekly owner lead summary
- Review request trigger after completed jobs

## n8n Workflow Map

V1 workflow:

```txt
Webhook Trigger
-> Validate intake fields
-> Save lead to Supabase
-> Tag lead: mobile-detailing-diagnostic
-> Generate diagnostic draft
-> Save generated report
-> Send privacy-safe Discord alert
-> Wait for owner approval
-> Send approved diagnostic email
-> Create follow-up task
```

Optional V2:

```txt
Scrape website/social
-> Pull visible reviews/proof
-> Score offer clarity and CTA friction
-> Add screenshots to owner review packet
```

## CRM Tags

Use:

```txt
mobile-detailing-diagnostic
lead-flow-review
quote-path
follow-up-needed
owner-review-required
```

Lifecycle:

```txt
diagnostic_requested
diagnostic_draft_generated
diagnostic_ready_for_review
approved_for_follow_up
diagnostic_delivered
consult_invite_sent
```

## Follow-Up Email

Subject:

```txt
Your detailing lead-flow diagnostic is ready
```

Email:

```txt
Hey {{first_name}},

Your Mobile Detailing Lead-Flow Diagnostic is ready.

The biggest leak I found is {{biggest_leak}}.

The fastest win is {{fastest_win}}.

The first system I would build is {{recommended_system}} because it helps new quote requests get captured, answered, followed up with, and tracked.

If you want, reply here and I can map what it would take to get the first version live.

{{sender_name}}
```

## Sales CTA

Use this after the report:

```txt
Your diagnostic shows where leads are leaking.
Thurr can build the quote-to-booking system that closes the gap.
```

Button:

```txt
Build My Lead System
```

## QA Checklist

Before launch:

- Submit one internal detailing test lead.
- Confirm `brand` is `thurr-solutions`.
- Confirm `routing.demo_niche` is `mobile-detailing`.
- Confirm `client_reskin_required` is `true` for client copies.
- Confirm report does not use Right Thurr visual branding.
- Confirm owner alert goes to `#leads-alerts` with no sensitive contact details.
- Confirm report waits for owner approval.
- Confirm approved email can be sent only after review.
- Confirm CRM tags appear in Supabase.
- Confirm mobile form fields fit and remain accessible.

## First Build Task

Create a neutral diagnostic page variant with three visual options before coding:

1. Clean local-service operator style
2. Premium auto-detailing style
3. Minimal white-label style

After selecting a direction, implement one reusable diagnostic page template that can swap niche copy, scores, colors, and report sections without touching backend logic.
