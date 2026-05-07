# Client Data Boundaries

## Rule

Thurr Solutions builds workflow systems. It does not replace the client’s legal, compliance, clinical, financial, or carrier approval process.

## Allowed Metadata

- Client or prospect name
- Business name
- Offer, phase, status, and next action
- Public website or social link
- Non-sensitive workflow notes
- Approved reviewer name or role
- Approved public-facing copy

## Do Not Store In Public Docs Or General Intake

- Protected health information
- Minor or youth journal content
- Crisis messages or clinical notes
- Insurance health details
- Social Security numbers
- Bank account details
- API keys or passwords
- Signed agreement artifacts unless stored in the approved private location

## Regulated Workflows

Healthcare and hospice workflows need HIPAA review before any patient data path goes live.

Youth wellness workflows need COPPA guardrails, parental consent decisions, and a named human reviewer before AI chat or escalation logic goes live.

SMS follow-up needs consent, opt-out language, quiet-hour rules, and client approval before launch.

Insurance lead generation needs carrier, upline, or authorized reviewer approval for public-facing copy, consent, privacy language, and marketing restrictions.

## Approval Gate

No regulated automation goes live until the client provides the authorized reviewer and approves the exact public-facing copy, consent language, and escalation path.
