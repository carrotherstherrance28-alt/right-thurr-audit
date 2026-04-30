# Supabase Owner Auth

Status: private-by-default.

The owner gate should stay private-by-default because the report review queue can include lead contact details, intake notes, and generated report sections.

Temporary preview mode exists for local mock review only. Do not enable preview mode in production once real leads are flowing.

## App Behavior

- Public website nav shows only `Home`, `Buildout Plan`, and `Thurr Solutions`.
- Owner preview lives at:

```txt
https://right-thurr-audit.vercel.app/?operator=1
```

- `/owner/callback` now redirects back into the operator preview:

```txt
https://right-thurr-audit.vercel.app/owner/callback?operator=1
```

- With a valid owner session and server-side allowlisted email, the page opens `Command Center`.
- Operator tabs are limited to `Command Center` and `Systems`.
- `/api/review-reports` and owner report approvals require Supabase owner-session checks by default.
- The private Report Review Queue now sends a Supabase owner magic link, stores the owner session in the browser, and calls private review/approval APIs with the owner bearer token.

## Vercel Environment Variables

For production, keep `OWNER_AUTH_MODE` unset or set it to:

```txt
OWNER_AUTH_MODE=supabase
```

Add these to the Vercel project, Production environment:

```txt
VITE_SUPABASE_URL=https://xplfryahxdegfvxmymco.supabase.co
VITE_SUPABASE_ANON_KEY=<anon key already stored in Vercel>
OWNER_EMAILS=<your owner email>
OWNER_AUTH_MODE=supabase
```

For local mock-only preview, use:

```txt
OWNER_AUTH_MODE=preview
```

For multiple owner emails:

```txt
OWNER_EMAILS=first@example.com,second@example.com
```

Redeploy Production after changing these.

## Supabase Recommended Settings

Configure Supabase:

1. Go to `Authentication` -> `URL Configuration`.
2. Set `Site URL`:

```txt
https://right-thurr-audit.vercel.app
```

3. Add redirect URLs:

```txt
https://right-thurr-audit.vercel.app/owner/callback
https://right-thurr-audit.vercel.app/owner/callback?operator=1
https://right-thurr-audit.vercel.app/**
http://localhost:5173/**
```

4. Go to `Authentication` -> `Providers` -> `Email`.
5. Keep email provider enabled.
6. Use magic link / OTP email sign-in or the final chosen owner auth method.

Why: Supabase requires the redirect URL used by magic-link flows to match the Auth redirect allowlist. Supabase recommends exact production URLs and allows localhost for development. The app also includes a Vercel rewrite for `/owner/callback` so direct callback visits load the React app instead of a missing static route.

Sources:

- https://supabase.com/docs/guides/auth/redirect-urls
- https://supabase.com/docs/reference/javascript/auth-signinwithotp
- https://supabase.com/docs/reference/javascript/auth-verifyotp

## Next Hardening Step

Before real private records appear in the owner UI:

1. Sign in once with the owner magic link so Supabase creates the owner Auth user.
2. Run:

```txt
docs/backend/Supabase-Owner-RLS-Hardening.sql
```

3. Confirm the `owner_profiles` row exists for the owner email.
4. Keep Discord alerts privacy-safe and store sensitive lead details only in Supabase.
5. Keep `OWNER_AUTH_MODE=supabase` for production owner screens.
