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

## OpenAI Brain Option

If you want Thurnos to use OpenAI instead of local Ollama, keep the same agent
role and swap the model provider behind it.

Recommended environment shape:

```txt
THURNOS_PROVIDER=openai
OPENAI_API_KEY=
THURNOS_OPENAI_MODEL=gpt-5.2
```

As of this build, the public OpenAI API model list shows GPT-5.2 as the current
frontier coding/agentic model. If a `gpt-5.5` API model becomes available later,
the only required change should be:

```txt
THURNOS_OPENAI_MODEL=gpt-5.5
```

Do not put the OpenAI key in the Vite client environment. Keep it in n8n
credentials, a private server route, or another server-only secret store.

## Discord Prototype Command Path

Current Discord status:

```txt
n8n buildout intake -> Discord #leads-alerts notification
```

Recommended next path for mobile prototype requests:

```txt
Discord channel/thread
-> n8n Discord trigger or Discord bot webhook
-> Thurnos Orchestrator
-> OpenAI or Ollama brain
-> GitHub/Linear task creation
-> prototype summary sent back to Discord
```

Use a separate Discord channel such as `#prototype-requests` or a dedicated
thread under `#leads-alerts` so real lead alerts do not get mixed with build
commands.

Minimum command format:

```txt
/prototype
Goal:
Audience:
Brand:
Deadline:
Notes:
```

First implementation should create a draft task and summary only. Do not let
Discord commands deploy production changes until the approval workflow is
tested.

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
