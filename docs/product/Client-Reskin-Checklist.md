# Client Diagnostic Re-Skin Checklist

Use this checklist whenever the diagnostic engine is cloned for a client, niche, or white-label lead-gen funnel.

The backend logic can stay shared. The public-facing brand layer must change unless the asset is explicitly a Thurr Solutions sales asset or case study.

## Brand Inputs

- Client/business name
- Logo files or temporary wordmark
- Primary and secondary colors
- Font preference or existing website typography
- Website/social URL
- Service area
- Primary offer
- Tone notes: premium, local, urgent, friendly, clinical, luxury, practical, etc.
- Words to use
- Words to avoid
- Proof points: reviews, before/after, years in business, certifications, guarantees

## Funnel Identity

Replace these before showing the funnel to a lead:

- Page title
- Meta description
- Open Graph/social preview image
- Favicon
- Header/logo lockup
- Footer business name
- Contact email/phone
- Privacy/contact links
- CTA button copy
- Report title
- Report sender name
- Email from/reply-to identity

## Visual Re-Skin

- Remove Right Thurr and Thurr Solutions marks unless this is an owned sales asset.
- Replace orange/black owned-brand styling with the client's palette.
- Use the client's photography, industry imagery, or neutral service visuals.
- Keep layout structure reusable, but avoid copied hero language.
- Confirm mobile header, CTA, and form fields still fit.
- Confirm report cards, scores, and tables are readable in the new palette.

## Copy Re-Skin

Every client funnel needs copy that matches the niche:

- Hero headline names the client's offer or diagnostic category.
- Subcopy explains the business problem in the client's market language.
- Intake questions use terms the lead already understands.
- Report sections connect findings to the client's paid service.
- CTA invites the next specific action, not a generic consultation.
- Follow-up messages sound like the client, not Thurr.

## Backend Routing

Set or confirm:

```json
{
  "brand": "client-brand-slug",
  "routing": {
    "report_type": "client-diagnostic",
    "demo_niche": "niche-slug",
    "owned_brand_design": false,
    "client_reskin_required": true
  }
}
```

## Data And Privacy

- Store lead details only in Supabase or the approved client CRM.
- Do not leak one client's examples, prompts, reports, or contacts into another funnel.
- Use client-specific Discord/Slack/email alerts when needed.
- Confirm webhook secrets are not shared in public docs.
- Confirm analytics use `brand_context: client-reskin`.

## QA Before Launch

- Submit one internal test lead.
- Confirm the lead record has correct brand/routing values.
- Confirm the diagnostic report uses client-facing language.
- Confirm CRM tags match the niche and offer.
- Confirm owner/client alert goes to the right channel.
- Confirm follow-up email uses the right sender/reply-to.
- Confirm no Right Thurr/Thurr Solutions visual branding appears unless approved.

## Handoff Notes

Give the client:

- Live funnel URL
- What the diagnostic measures
- What happens after a lead submits
- Where lead alerts go
- What follow-up messages are active
- What should be reviewed manually
- What can be changed without engineering support

