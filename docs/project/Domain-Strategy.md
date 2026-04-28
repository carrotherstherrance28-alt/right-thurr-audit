# Domain Strategy

## Goal

Keep Right Thurr, Thurr Solutions, and client diagnostic funnels separated clearly.

Too much on one domain is possible technically, but it can confuse the brand if the product, B2B services, portfolio, and client funnels all look like the same offer.

## Current Domain Signals

DNS lookup showed these domains currently resolve:

```text
thurrsolutions.com
thurrenterprise.com
thurrsolutions.online
rightthurr.com
```

That means they are pointed somewhere. It does not prove ownership inside this repo; it only means they resolve in DNS.

## Recommended Domain Split

### Right Thurr Product

Best:

```text
rightthurr.com
```

Use for:

- Right Thurr product homepage
- AI Business Buildout Plan
- app preview
- eventual app onboarding
- merch/stickers/luggage tags

Suggested paths:

```text
rightthurr.com/
rightthurr.com/buildout
rightthurr.com/app
rightthurr.com/brand
```

### Thurr Solutions B2B

Best:

```text
thurrsolutions.com
```

Use for:

- B2B services
- automation consulting
- AI implementation
- proposals
- case studies
- lead-gen clients

Suggested paths:

```text
thurrsolutions.com/
thurrsolutions.com/services
thurrsolutions.com/case-studies
thurrsolutions.com/diagnostic
```

### Client Diagnostic Funnels

Best:

```text
diagnostic.thurrsolutions.com
```

or client-specific paths:

```text
thurrsolutions.com/diagnostic/roofing
thurrsolutions.com/diagnostic/med-spa
thurrsolutions.com/diagnostic/cleaning
```

Rule:

Client funnels may use the same backend engine, but they should be visually re-skinnable and not inherit Right Thurr branding by default.

### Thurr Enterprise

Use only if you intentionally create a higher-level holding company or enterprise-grade service line.

Possible use:

```text
thurrenterprise.com
```

Best for:

- future parent company
- enterprise consulting
- umbrella brand
- internal corporate landing page

Do not use it for Right Thurr V1 unless the brand strategy changes.

### Thurr Solutions Online

Use as backup, redirect, or temporary staging.

Possible use:

```text
thurrsolutions.online
```

Best for:

- staging
- redirects
- temporary campaigns
- backup domain

Do not make this the main brand domain if `thurrsolutions.com` is available to you.

## Final Recommendation

Use:

```text
rightthurr.com       -> Right Thurr product/app/public brand
thurrsolutions.com   -> Thurr Solutions B2B services
```

Use later:

```text
diagnostic.thurrsolutions.com -> client diagnostic funnels
app.rightthurr.com            -> future logged-in app
```

Hold:

```text
thurrenterprise.com
```

Backup:

```text
thurrsolutions.online
```

## Vercel Project Split

Cleanest setup:

```text
Vercel project: right-thurr
Domains:
- rightthurr.com
- app.rightthurr.com later

Vercel project: thurr-solutions
Domains:
- thurrsolutions.com
- diagnostic.thurrsolutions.com later
```

Temporary setup:

One Vercel project can host all current prototype views, but production should split the brands once pages are stable.
