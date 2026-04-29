# Client Template Brand Boundary

This document protects the difference between owned Thurr brands and reusable client diagnostic funnels.

The backend engine can be shared. The brand identity should not be shared by default.

## Core Rule

```txt
Thurr builds the system. Client brands stay client-owned.
```

Right Thurr and Thurr Solutions can use the owned design language:

- Orange, ink, paper, bold borders
- R+T monogram
- Directional arrows
- Western hand-drawn display type
- Luggage tag/sticker energy
- "We build. You profit."
- "Ideas do not pay you. Systems do."

Client diagnostic funnels should use the same backend logic but be visually re-skinnable:

- Client logo
- Client color system
- Client typography
- Client tone
- Client offer
- Client industry language
- Client report name

## Brand Architecture

### Right Thurr

Use for:

- Product/app language
- Public entrepreneur-facing buildout engine
- Merchandise
- Sticker sheets
- Luggage tags
- Autopilot Blueprint demos
- Right Thurr community or user-facing assets later

Default report:

```txt
Right Thurr Autopilot Blueprint
```

### Thurr Solutions

Use for:

- B2B services
- Workflow audits
- Automation implementation
- Client proposals
- Case studies
- Client onboarding
- Internal operator materials
- Sales pages for implementation work

Default report:

```txt
Thurr Solutions Growth Systems Blueprint
```

### Client Funnels

Use for:

- Client lead-gen diagnostics
- Industry-specific audits
- White-labeled campaigns
- Client-owned landing pages
- Client-owned reports

Default report naming pattern:

```txt
[Client/Niche] Growth Blueprint
[Client/Niche] Lead System Audit
[Client/Niche] Booking System Plan
[Client/Niche] Revenue Leak Report
```

## What Can Be Reused

These can be reused across owned and client work:

- n8n workflow structure
- Supabase table concepts
- Activity log schema
- AI prompt chain structure
- Diagnostic/report section structure
- Manual review mode
- Follow-up automation patterns
- Analytics event plan
- Lead routing logic
- CRM tagging logic
- Email/SMS sequence templates after rewording

Reusable report sections:

```txt
Opportunity
Audience
Offer
Funnel
Automation Stack
AI Agent Map
30-Day Roadmap
Bottlenecks
Next Step
```

## What Must Be Re-Skinned

Always replace these for client work:

- Logo
- Favicon
- Open Graph/social preview image
- Primary brand colors
- Accent colors
- Display fonts
- Button styling
- Watermark
- Report cover
- CTA language
- Footer/company identity
- Email sender identity
- Social links
- Domain/subdomain
- Contact methods
- Legal/privacy text

Do not ship client funnels with:

- Right Thurr primary logo
- Thurr Solutions logo as the main client logo
- R+T watermark
- Right Thurr merch/luggage tag visual system
- "Right Thurr Autopilot Blueprint" as the client report name
- Thurr Solutions email/signature unless the page is clearly a Thurr Solutions sales asset

## Allowed Thurr Attribution

Client-facing work can include quiet attribution only when appropriate:

```txt
Built by Thurr Solutions
Powered by Thurr Solutions
Automation by Thurr Solutions
```

Best placement:

- Footer
- Proposal appendix
- Case study page
- Internal handoff doc

Avoid attribution if the client purchased white-label work or if it weakens the client-owned experience.

## Visual Defaults

### Owned Thurr Assets

Use:

- High contrast
- Orange/ink/paper palette
- R+T watermark
- Bold borders
- Directional arrow language
- Strong display type
- Sticker/stamp treatments

### Client Assets

Start neutral:

- Client logo as primary mark
- Client color palette
- Clean sans-serif unless client brand says otherwise
- Light report layout
- Simple cards/tables
- Minimal decorative elements
- No Thurr monogram watermark

If the client has no brand system yet, create a small client-specific mini system:

```txt
Primary color
Accent color
Neutral background
Heading font
Body font
Button style
Logo placement
Report watermark or pattern
```

## Claude Design Prompt Guardrails

When using Claude Design or any external design tool, include this instruction:

```txt
This is a client diagnostic funnel template. Do not use Right Thurr or Thurr Solutions visual branding unless explicitly requested. Use a neutral, re-skinnable structure that can adopt the client's logo, colors, typography, and tone.
```

For owned Thurr assets, use:

```txt
Use the Thurr owned brand system: orange, ink, paper, bold borders, R+T monogram as a quiet watermark, directional arrow language, and confident builder tone.
```

For client case studies, use:

```txt
Use Thurr Solutions as the authoring brand, but keep client examples visually distinct. The client logo and brand should not be confused with the Thurr owned identity.
```

## Backend Payload Flags

Use these fields to keep brand routing clear:

```json
{
  "routing": {
    "report_type": "right-thurr-autopilot-blueprint",
    "owned_brand_design": true,
    "client_reskin_required": false
  }
}
```

For client funnels:

```json
{
  "routing": {
    "report_type": "client-growth-blueprint",
    "owned_brand_design": false,
    "client_reskin_required": true,
    "client_brand_id": "client-name-or-id"
  }
}
```

## Client Funnel Preflight Checklist

Before publishing a client funnel, confirm:

- [ ] Client logo is primary.
- [ ] Client colors are used.
- [ ] Client contact method is correct.
- [ ] Client offer and industry terms are correct.
- [ ] Report title does not say Right Thurr unless it is a Right Thurr product demo.
- [ ] R+T watermark is removed unless it is a Thurr Solutions sales/case-study asset.
- [ ] Footer attribution matches the contract.
- [ ] Open Graph image is client-specific.
- [ ] Domain/subdomain is correct.
- [ ] Analytics events use `brand_context: client-reskin`.
- [ ] Lead data routes to the correct client/system.
- [ ] Discord/Slack alerts do not expose sensitive lead data in public channels.
- [ ] Manual review is enabled before report delivery.

## Owned Asset Preflight Checklist

Before publishing a Right Thurr or Thurr Solutions asset, confirm:

- [ ] Correct brand name is used.
- [ ] Right Thurr is product/app/community-facing.
- [ ] Thurr Solutions is service/B2B/client-facing.
- [ ] R+T monogram is used as a watermark or signature, not a competing logo.
- [ ] Primary logo is not overused.
- [ ] "We build. You profit." is used as a promise of execution, not a guaranteed income claim.
- [ ] The CTA matches the page: buildout plan, workflow audit, start a project, or owner sign-in.
- [ ] Metadata and social preview match the brand.

## Decision Rule

If an asset is meant to sell Thurr Solutions, use Thurr Solutions branding.

If an asset is meant to demonstrate the Right Thurr product, use Right Thurr branding.

If an asset is meant to generate leads for a client, use the client's branding and keep Thurr in the backend or quiet attribution only.
