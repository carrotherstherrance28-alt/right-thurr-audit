# Public Data Redaction Checklist

Use this before updating the website, GitHub, LinkedIn, Upwork, public Notion pages, screenshots, decks, or videos.

## Where Leaks Happen

- Screenshots / screen recordings (tabs, bookmarks, browser autofill, notification banners)
- `.env.local` / terminal output pasted into issues or docs
- Copy/paste from invoices, contracts, emails, or payment portals
- Exported CSVs from CRM/booking/calendar tools
- “Just one example” client story that implies private details

## Remove

- API keys, tokens, webhook URLs, and environment variable values
- EINs, bank details, account numbers, payment plan details, and private legal identifiers
- Client emails, signatures, agreement links, deposits, and private pricing unless approved for public use
- Healthcare, hospice, youth wellness, insurance, or other regulated client details that could identify private data
- Personal relationship notes, private contact lists, and raw brainstorm items not meant for public positioning

## Replace With

- “Secure legal/entity filing needed”
- “Client agreement signed”
- “Deposit received”
- “Owner alert webhook”
- “Approved reviewer”
- “Private client project”

## Public-Safe Proof

Use generalized proof unless a client has approved a named case study:

- Storm lead capture page
- Residential contractor close system concept
- Youth wellness MVP planning with COPPA guardrails
- Insurance lead pipeline audit concept
- Beauty booking and intake workflow concept

## Final Check

Before publishing, search the changed files for:

```text
api
key
secret
token
webhook
EIN
deposit
signature
icloud
gmail
patient
minor
```

If you are publishing from the repo, run a quick scan from the project root:

- `rg -n \"(api[_-]?key|secret|token|webhook|EIN|deposit|signature|patient|minor)\" docs src public api`
