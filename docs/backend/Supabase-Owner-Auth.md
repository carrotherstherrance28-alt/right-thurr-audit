# Supabase Owner Auth

Use Supabase email magic links for the first owner/admin gate.

This protects the operator preview UI from casual public browsing while the real app account model is still being built. Do not treat this as the final security layer for private client data. Before real private data is shown, add Supabase RLS policies tied to authenticated owner roles.

## App Behavior

- Public website nav shows only `Home`, `Buildout Plan`, and `Thurr Solutions`.
- Owner preview lives at:

```txt
https://right-thurr-audit.vercel.app/?operator=1
```

- Magic links now return to a dedicated callback:

```txt
https://right-thurr-audit.vercel.app/owner/callback?operator=1
```

- Without a valid owner session, the page shows an owner sign-in form.
- With a valid owner session and server-side allowlisted email, the page opens `Command Center`.
- Operator tabs are limited to `Command Center` and `Systems`.

## Vercel Environment Variables

Add these to the Vercel project, Production environment:

```txt
VITE_SUPABASE_URL=https://xplfryahxdegfvxmymco.supabase.co
VITE_SUPABASE_ANON_KEY=<anon key already stored in Vercel>
OWNER_EMAILS=<your owner email>
```

For multiple owner emails:

```txt
OWNER_EMAILS=first@example.com,second@example.com
```

Redeploy Production after changing these.

## Supabase Recommended Settings

In Supabase:

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
6. Use magic link / OTP email sign-in for now.

Why: Supabase requires the redirect URL used by `signInWithOtp` to match the Auth redirect allowlist. Supabase recommends exact production URLs and allows localhost for development. The app also includes a Vercel rewrite for `/owner/callback` so direct magic-link visits load the React app instead of a missing static route.

Sources:

- https://supabase.com/docs/guides/auth/redirect-urls
- https://supabase.com/docs/reference/javascript/auth-signinwithotp
- https://supabase.com/docs/reference/javascript/auth-verifyotp

## Next Hardening Step

Before real private records appear in the owner UI:

1. Create an `owner_profiles` table.
2. Store approved owner user IDs after first sign-in.
3. Add RLS policies requiring `auth.uid()` to match an approved owner profile.
4. Move operator data reads to authenticated Supabase queries.
5. Keep Discord alerts privacy-safe and store sensitive lead details only in Supabase.
