# Supabase Setup

## Project

Project URL:

```text
https://xplfryahxdegfvxmymco.supabase.co
```

Project ref:

```text
xplfryahxdegfvxmymco
```

Local env file:

```text
.env.local
```

This file is ignored by Git and should not be committed.

## Keys

Use in frontend:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

Do not put these in docs:

```text
service_role key
database password
JWT secret
connection string
```

## Tables

Run this file in Supabase SQL Editor:

```text
docs/backend/Supabase-Schema.sql
```

It creates:

- `buildout_requests`
- `systems`
- `system_assets`
- `activity_logs`
- `tasks`
- `money_entries`

## V1 Security

RLS is enabled on all tables.

The only public policy added is:

```text
Allow anonymous inserts into buildout_requests when brand = right-thurr
```

Anonymous users cannot read, update, or delete records by default.

## Next Step

After schema creation:

1. Test inserting a buildout request from the frontend.
2. Create an n8n workflow that receives the same payload.
3. Decide whether the form writes directly to Supabase, n8n, or both.
