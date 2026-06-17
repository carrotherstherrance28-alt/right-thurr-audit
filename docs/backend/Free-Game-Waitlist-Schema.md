# Right Thurr Free Game Waitlist Schema

## Table

`thurrsolutions.free_game_waitlist`

The canonical data lives in the `thurrsolutions` schema. Supabase REST currently exposes only
`public`, so the migration also creates `public.free_game_waitlist` as the API-facing view.

## Purpose

Store lightweight Right Thurr Free Game interest from the `/thurr` link hub before launching a paid or high-touch community.

## Fields

| Field | Type | Notes |
| --- | --- | --- |
| `id` | uuid | Primary key. |
| `created_at` | timestamptz | Defaults to current time. |
| `name` | text | Required. |
| `email` | text | Required and lowercased by the API. |
| `phone` | text | Optional. Saved only when SMS opt-in is checked. |
| `sms_opt_in` | boolean | Required, defaults to false. |
| `interest_area` | text | Required enum: `AI tools`, `Fitness`, `Travel`, `Money`, `Content`, `Business`, `Network`. |
| `put_on_request` | text | Required. Captures what the person wants to get put on to. |
| `source` | text | Defaults to `thurr-link-hub`. |
| `page_path` | text | Submit page path. |
| `referrer` | text | Browser referrer when available. |
| `status` | text | Defaults to `new`. |
| `responded_at` | timestamptz | Optional internal follow-up timestamp. |

## API Route

`/api/free-game-waitlist`

Required payload:

```json
{
  "name": "First Last",
  "email": "person@example.com",
  "interest_area": "AI tools",
  "put_on_request": "Show me the AI tools worth using for content.",
  "source": "thurr-link-hub"
}
```

Optional payload:

```json
{
  "phone": "555-111-2222",
  "sms_opt_in": true,
  "page_path": "/thurr/",
  "referrer": "https://www.instagram.com/"
}
```

## Data Boundary

This form is for broad interests only. Do not collect private health details, financial account details, legal issues, credentials, SSNs, client data, or regulated personal information.

## RLS Notes

Anonymous users can insert. Anonymous users cannot select or update rows. Service-role access is used for owner review and automation.
