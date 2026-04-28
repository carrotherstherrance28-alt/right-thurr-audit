# Thurnos / Hermes Bridge

Thurnos is the internal Thurr Solutions operations agent. Keep it on the operator side of the system, not the public website.

## Current Local Status

Local Ollama is reachable at:

```txt
http://localhost:11434
```

Available local models include:

```txt
thurnos:latest
hermes3:latest
llama3.1:8b
```

The project includes a local smoke test:

```bash
npm run thurnos:test
```

Optional overrides:

```bash
OLLAMA_URL=http://localhost:11434 THURNOS_MODEL=thurnos:latest npm run thurnos:test
```

## Recommended Architecture

Do not connect the public Vercel website directly to local Ollama.

Use this order:

1. Right Thurr public form submits to n8n.
2. n8n saves the request to Supabase.
3. n8n calls Thurnos/Hermes only from an internal/private path.
4. Thurnos generates internal plan outputs.
5. n8n saves generated reports, tasks, and activity logs to Supabase.
6. The owner Command Center reads approved records after authentication.

## Production Bridge Options

Recommended first bridge:

```txt
n8n Cloud -> Cloudflare Tunnel -> local Ollama/Thurnos
```

Use Cloudflare Access or a signed shared secret so the local model endpoint is not open to the internet.

Environment variables for a future server-side bridge:

```txt
THURNOS_BASE_URL=
THURNOS_MODEL=thurnos:latest
THURNOS_SHARED_SECRET=
```

## Safety Rules

- Never expose local Ollama directly to the public web.
- Never let client-facing reports auto-send without review until the output quality is proven.
- Keep Thurnos as an internal operator agent first.
- Store generated output in Supabase with RLS before showing it in the owner UI.
- Keep Discord alerts privacy-safe; do not post lead email/phone by default.

## Next Build Step

Add an n8n node after intake:

```txt
Buildout Intake -> Supabase Save -> Thurnos Blueprint Draft -> Supabase Report Save -> Discord Owner Alert
```

The first Thurnos output should be a draft Autopilot Blueprint, not an automatically sent client PDF.
