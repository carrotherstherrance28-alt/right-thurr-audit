# Right Thurr Discord Setup

Use Discord as the V1 internal operator feed. Supabase remains the source of truth.

## Recommended Server Structure

```text
Right Thurr HQ
#leads-alerts
#system-activity
#errors
#revenue-alerts
#daily-summary
```

## First Channel

Use this existing channel first:

```text
#leads-alerts
```

## Create The Webhook

In Discord:

1. Open the `#leads-alerts` channel.
2. Open channel settings.
3. Go to Integrations.
4. Create a Webhook.
5. Name it `Right Thurr Intake`.
6. Copy the webhook URL.

Security note:

```text
Treat the Discord webhook URL like a key. Anyone with it can post into that channel.
```

## V1 Alert Payload

Use this privacy-safe message first:

```json
{
  "content": "New Right Thurr buildout request queued.",
  "embeds": [
    {
      "title": "Right Thurr Buildout Request",
      "description": "A new AI Business Buildout Plan request was saved and queued for review.",
      "color": 14246431,
      "fields": [
        {
          "name": "Industry",
          "value": "={{ $json.body?.intake?.industry || $json.intake?.industry || 'Not provided' }}",
          "inline": true
        },
        {
          "name": "Goal",
          "value": "={{ $json.body?.intake?.main_goal || $json.intake?.main_goal || 'Not provided' }}",
          "inline": false
        },
        {
          "name": "Status",
          "value": "Saved to Supabase",
          "inline": true
        },
        {
          "name": "Report Type",
          "value": "Right Thurr Autopilot Blueprint",
          "inline": true
        }
      ]
    }
  ]
}
```

## Privacy Rule

Do not send lead email, phone number, or other sensitive contact info to Discord by default. Keep
those details in Supabase and the Right Thurr dashboard/report flow.

If contact info is needed in Discord later, only add it after confirming the Discord channel is
private and the webhook is controlled.
