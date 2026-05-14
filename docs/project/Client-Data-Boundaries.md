# Client Data Boundaries

Use this before building, documenting, or automating workflows for healthcare, hospice, youth wellness, SMS, insurance, or any client project with sensitive personal data.

## Operating Rule

Thurr Solutions builds workflow systems. It does not replace the client’s legal, compliance, clinical, financial, or carrier approval process.

For regulated industries, Thurr Solutions can build the system and route final public-facing copy, consent language, privacy language, and policy decisions through the client’s authorized reviewer. Thurr Solutions should not claim legal, HIPAA, COPPA, TCPA, insurance, or clinical certification.

## Allowed Metadata In Repo Docs

- Client or prospect name
- Business name
- Offer, phase, status, and next action
- Public website or social link
- Non-sensitive workflow notes
- Approved reviewer name or role, only when the client has authorized sharing inside internal docs
- Approved public-facing copy
- Workflow labels such as "audit requested," "proposal sent," "reviewer needed," or "ready for client approval"
- Links to approved source-of-truth docs that do not expose secrets or sensitive client data

## Do Not Store In Public Docs Or General Intake

- Protected health information
- Minor or youth journal content
- Crisis messages or clinical notes
- Insurance health details
- Social Security numbers
- Bank account details
- API keys or passwords
- Signed agreement artifacts unless stored in the approved private location
- Patient names, admission details, diagnoses, medication notes, payer details, or referral records
- Guardian, counselor, or youth contact details unless the approved private system requires them
- Carrier application data, underwriting data, health answers, beneficiary details, or policy numbers
- Raw SMS exports, call transcripts, voicemail recordings, CRM exports, or inbox screenshots that include private customer data

## Data Boundary By Workflow

| Workflow | Repo-safe data | Prohibited in repo/general intake | Required gate before launch |
| --- | --- | --- | --- |
| Healthcare / hospice | Public business info, workflow stage, reviewer needed, approved copy | PHI, patient examples, admissions, diagnoses, referral details | HIPAA-aware client reviewer approves data path, copy, retention, and access |
| Youth wellness | Phase, screen list, non-sensitive feature notes, reviewer needed | Minor journal content, crisis messages, guardian/counselor private details | Named adult reviewer, COPPA/consent decision, crisis escalation path |
| SMS / lead follow-up | Consent checkbox status, opt-in source, non-sensitive lead workflow metadata | Message exports, private customer conversations, phone lists in public docs | TCPA/FCC consent, opt-out language, quiet-hour rules, client approval |
| Insurance | Public offer positioning, licensed-state checklist, compliance reviewer needed | Health details, underwriting answers, carrier/private policy data | Licensed/authorized reviewer approves claims, disclaimers, consent, and lead source |
| General local service | Public business info, offer, status, next action, approved testimonial/case-study copy | Private payment details, contracts, credentials, raw inbox/CRM exports | Client approval before public naming or proof claims |

## Approval Gates

No regulated automation goes live until these gates are complete:

1. Client identifies the authorized reviewer by role or approved name.
2. Reviewer approves the exact public-facing copy, consent language, privacy language, and escalation path.
3. Data destinations are documented without secret values.
4. Access rules are documented, including who can view, export, edit, or delete records.
5. Manual fallback exists for intake, alerts, and escalation if automation fails.
6. Test submissions use dummy data only.
7. Public pages, decks, screenshots, and videos pass the redaction checklist before sharing.

## Escalation Reviewer Requirements

Youth wellness, healthcare, hospice, insurance, and other regulated workflows need an accountable human reviewer before launch. The internal record should capture:

- Reviewer name or role
- Organization or authority source
- What the reviewer approves
- Escalation contact method stored only in the approved private system
- Backup reviewer or manual fallback, when applicable
- Last approval date

Do not publish reviewer contact details on public pages or in public docs.

## Public Proof Rules

Use generalized proof unless a client has approved a named case study:

- "Storm lead capture page"
- "Residential contractor close system concept"
- "Youth wellness MVP planning with COPPA guardrails"
- "Insurance lead pipeline audit concept"
- "Beauty booking and intake workflow concept"

Do not publish deposits, agreement details, private client communications, screenshots, or named regulated-client details without written approval.

## Repo Verification

Before committing or publishing sensitive-workflow docs, run:

```bash
rg -n "(PHI|diagnosis|patient|minor|guardian|SSN|bank|policy number|underwriting|api[_-]?key|secret|token|webhook)" docs src public api
```

Review any matches manually. The presence of a word is not automatically a leak, but private values, private identifiers, and raw client examples must be removed or moved to the approved private system.
