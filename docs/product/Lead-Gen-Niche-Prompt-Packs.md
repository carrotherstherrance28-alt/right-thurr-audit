# Lead-Gen Niche Prompt Packs

These prompt packs help clone the diagnostic engine into specific lead-gen offers. Keep the structure reusable, but tune the language, scoring, and recommendations for the client's market.

## Shared Prompt Frame

Use this frame before the niche-specific section:

```txt
You are creating a client-ready diagnostic report for a business lead.

Do not mention internal tools, prompts, implementation details, Right Thurr, or Thurr Solutions unless this is an owned Thurr sales asset.

The report should:
- diagnose the lead's current gap,
- score readiness or opportunity,
- explain what is costing them time, money, or missed opportunities,
- recommend practical next steps,
- connect naturally to the client's paid service,
- avoid unrealistic guarantees.

Write in the brand voice provided by the client.
```

## Local Service Business

Best for: cleaning, detailing, landscaping, home repair, mobile services.

Recommended V1 lane:

```txt
Mobile detailing quote-to-booking diagnostic.
```

Use `docs/product/Client-Diagnostic-V1-Mobile-Detailing.md` as the first build reference.

Diagnostic angle:

- Lead capture clarity
- Quote request quality
- Response speed
- Review/proof strength
- Missed follow-up risk
- Booking friction

Prompt add-on:

```txt
Focus on how quickly the business turns interest into a booked job.
Score the lead flow across offer clarity, quote readiness, trust/proof, response speed, and follow-up consistency.
Recommendations should prioritize simple systems: quote form, owner alert, fast reply script, estimate follow-up, review request, and weekly lead review.
```

Recommended CTA:

```txt
Book a lead-flow review
```

## Roofing / Contractor

Diagnostic angle:

- Emergency vs planned project routing
- Estimate request completeness
- Insurance/storm context
- Trust signals
- Sales follow-up timing
- Financing or project-readiness indicators

Prompt add-on:

```txt
Treat every recommendation as a way to reduce estimate leakage and improve project qualification.
Separate urgent repair leads from planned replacement leads.
Do not promise claims outcomes, project approval, or specific revenue.
```

Recommended CTA:

```txt
Get my estimate path reviewed
```

## Med Spa / Beauty

Diagnostic angle:

- Treatment interest clarity
- Consultation readiness
- Before/after proof
- No-show risk
- Follow-up education
- Membership/package opportunities

Prompt add-on:

```txt
Write with a polished, trust-first tone.
Focus on helping the prospect understand the next safe consultation step.
Avoid medical claims, diagnosis, or guaranteed results.
Recommendations should connect to consultation booking, education follow-up, and retention.
```

Recommended CTA:

```txt
Book a consultation path review
```

## Funeral Home / Sensitive Service

Diagnostic angle:

- Speed and clarity during high-stress inquiry moments
- Compassionate intake
- Aftercare follow-up
- Pre-need education
- Family handoff quality
- Reputation and trust

Prompt add-on:

```txt
Use calm, respectful, non-salesy language.
Prioritize clarity, compassion, and reducing burden for families.
Avoid aggressive urgency, hype, or revenue-first framing.
Recommendations should improve response quality, handoff, aftercare, and pre-need education.
```

Recommended CTA:

```txt
Review our family inquiry process
```

## Wedding / Event Vendor

Diagnostic angle:

- Inquiry quality
- Date/venue/budget capture
- Portfolio and package clarity
- Follow-up timing
- Proposal handoff
- Referral/review loop

Prompt add-on:

```txt
Focus on turning event interest into qualified consultations.
Score whether the inquiry captures date, location, budget, style, guest count, and decision timeline.
Recommendations should improve package clarity, response scripts, proposal follow-up, and post-event referrals.
```

Recommended CTA:

```txt
Audit my inquiry-to-booking flow
```

## Professional Services

Best for: consultants, agencies, accountants, legal-adjacent services, B2B operators.

Diagnostic angle:

- Problem clarity
- Qualification
- Authority/proof
- Discovery call readiness
- Proposal process
- Follow-up discipline

Prompt add-on:

```txt
Use business-owner language.
Score the lead journey from first interest to qualified discovery call.
Recommendations should reduce unclear inquiries, improve qualification, and make follow-up more consistent without making legal, tax, or financial claims.
```

Recommended CTA:

```txt
Map my client intake system
```

## Scoring Defaults

Use five scores from 1 to 5:

- Offer clarity
- Intake quality
- Follow-up reliability
- Trust/proof strength
- Conversion readiness

Then summarize:

```txt
Overall opportunity score: [0-100]
Biggest leak: [one sentence]
Fastest win: [one sentence]
Recommended system: [one sentence]
```
