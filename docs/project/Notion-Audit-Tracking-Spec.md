# Notion Audit Tracking Spec

## Purpose

Every Lead Flow Audit request should become a trackable Notion record so Thurr can see offer, phase, status, next action, and links without digging through email or code.

## Recommended Record

Create or update a prospect/opportunity in the Client Command Center.

Direct link: https://www.notion.so/350a6f1d2523814d8b91f103559431e8

## Field Mapping

| Notion Field | Source |
| --- | --- |
| Name | `owner_name` |
| Business | `business_name` |
| Email | `email` |
| Website/Social | `business_url` |
| Offer | Lead Flow Audit |
| Phase | Audit Requested |
| Status | New Lead |
| Monthly Leads | `monthly_leads_estimate` |
| Pain Point | `frustration_text` |
| Next Action | Review request and reply with audit next step |
| Source | Website `/audit` |
| Links | Supabase row, Linear task if created, client folder if promoted |

## Automation Path

1. Website form posts to `/api/audit-request`.
2. API saves to Supabase `audit_requests`.
3. n8n or owner alert notifies Thurr.
4. n8n can create a Notion record once Notion API access is confirmed.
5. Linear task is created only when action is needed.

## Manual Path

Until Notion API access is confirmed, create the Notion record manually from the owner alert and link it back to the relevant Linear task.
