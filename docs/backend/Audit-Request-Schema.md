# Lead Flow Audit Request Schema

## Table

`thurrsolutions.audit_requests`

## Purpose

Store public Lead Flow Audit requests from the Thurr Solutions website without collecting regulated or sensitive client data.

## Fields

| Field | Type | Notes |
| --- | --- | --- |
| `id` | uuid | Primary key. |
| `created_at` | timestamptz | Defaults to current time. |
| `business_name` | text | Required. |
| `owner_name` | text | Required. Person submitting the request. |
| `email` | text | Required. Lowercased at write time. |
| `business_url` | text | Required website or business URL. |
| `monthly_leads_estimate` | text | Required enum: `<25`, `25-100`, `100-500`, `500+`, `Not sure`. |
| `frustration_text` | text | Required. Where leads are slipping through. |
| `status` | text | Defaults to `new`. Internal status label. |
| `responded_at` | timestamptz | Optional internal follow-up timestamp. |

## Data Boundary

Do not collect PHI, youth/minor journal content, insurance health details, private credentials, SSNs, bank data, or agreement/signature artifacts in this form.

## RLS Notes

Anonymous users can insert. Anonymous users cannot select or update rows. Service-role access is used for owner review and automation.
