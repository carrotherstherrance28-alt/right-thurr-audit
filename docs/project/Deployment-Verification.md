# Deployment Verification

Use this after each Vercel deployment.

## Build Status

Verify in Vercel:

- Build command is `npm run build`.
- Output directory is `dist`.
- Framework is Vite.
- Deployment status is Ready.

## Live URL Checks

Check:

- Homepage loads.
- Buildout Plan view opens.
- Thurr Solutions view opens.
- R+T favicon appears.
- Social preview image is available at `/og-image.png`.
- `robots.txt` is available at `/robots.txt`.
- `sitemap.xml` is available at `/sitemap.xml`.
- `site.webmanifest` is available at `/site.webmanifest`.

## Form Behavior

Before n8n webhook is configured:

- Buildout form should show local queued state.

After n8n webhook is configured:

- Buildout form should POST to `VITE_N8N_BUILDOUT_WEBHOOK_URL`.
- Success state should say the blueprint is queued.
- Error state should show if webhook fails.

## Domain Checks

Right Thurr:

```text
rightthurr.com
```

Thurr Solutions:

```text
thurrsolutions.com
```

Future:

```text
app.rightthurr.com
diagnostic.thurrsolutions.com
```

## Preview Cache

If a platform still shows a generic preview image, refresh the preview cache after deployment.

Common places:

- LinkedIn Post Inspector
- Facebook Sharing Debugger
- X/Twitter Card Validator
- Slack link unfurl cache by reposting after deploy
