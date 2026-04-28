# App Architecture Notes

## Current State

The app is intentionally simple right now.

Everything is in:

```text
src/main.jsx
src/styles/app.css
```

This is acceptable for the first build because the product direction is still moving quickly.

## Visual Decision Workflow

For major visual, website, brand, or app screen changes, do not jump straight into implementation.

Default workflow:

```text
1. Create 3 distinct visual options/screenshots.
2. Review with the user.
3. Let the user pick one direction or combine parts.
4. Implement the selected direction in the repo.
5. Run build and browser QA.
```

Small copy edits, bug fixes, wiring, docs, and backend contracts can be implemented directly.

## Current Views

```text
Home
Buildout Plan
Thurr Solutions
```

The current view switch is local React state. This keeps the prototype fast and avoids premature routing setup.

## Next Refactor

When the current pages are visually reviewed, split the code into:

```text
src/App.jsx
src/data/brandData.js
src/components/Topbar.jsx
src/components/BuildoutForm.jsx
src/components/BuildPanel.jsx
src/components/BlueprintPanel.jsx
src/components/ActivityPanel.jsx
src/components/AppPreview.jsx
src/pages/HomePage.jsx
src/pages/BuildoutPlanPage.jsx
src/pages/SolutionsPage.jsx
```

Do not refactor before visual review unless the file becomes painful to edit.

## Route Plan

Later production routes:

```text
/                     Right Thurr product homepage
/buildout             AI Business Buildout Plan landing page
/app                  Right Thurr app preview or authenticated app shell
/solutions            Thurr Solutions B2B services page
/brand                Brand guide or internal brand reference
```

## Backend Plan

Form submission should move from local state to:

```text
VITE_N8N_BUILDOUT_WEBHOOK_URL
```

Then n8n handles:

```text
Validate payload
Save lead
Tag lead
Generate blueprint
Save report
Send email
Notify Slack
```

## Brand Boundary

Right Thurr and Thurr Solutions can share:

- color palette
- R+T monogram
- arrow language
- report engine
- backend workflow shape

Client funnels should not share:

- Right Thurr wordmark
- R+T watermark
- orange luggage tag identity
- owned-brand sticker/badge system

Client funnels should use the same backend engine with client-specific visual skins.
