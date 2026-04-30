# AIDesigner Setup Status

Status: project-level Codex setup installed.

## What Was Fixed

Installed AIDesigner for Codex in this repo:

```txt
npx -y @aidesigner/agent-skills init codex --scope project --trust-project
```

Created:

```txt
.codex/config.toml
.aidesigner/.gitkeep
.agents/skills/aidesigner-frontend/SKILL.md
.agents/skills/aidesigner-frontend/references/api.md
.agents/skills/aidesigner-frontend/references/frontend-rubric.md
```

Doctor result:

```txt
npx -y @aidesigner/agent-skills doctor codex
```

Project checks passed:

- Codex CLI found
- Project config includes the AIDesigner MCP server
- Project is trusted
- Project skill exists
- OAuth metadata endpoints are reachable
- Helper CLI is available

## Remaining Step

Open a fresh Codex session in this repo so the trusted project MCP config is loaded.

If the app prompts for auth, complete AIDesigner sign-in. If using CLI, run:

```txt
codex mcp login aidesigner
```

Optional fallback:

```txt
AIDESIGNER_API_KEY=<key>
```

Use the fallback only if the MCP OAuth route is not available.

## Operating Rule

Use AIDesigner when it materially improves the visual direction. Do not use credits for tiny copy edits or routine CSS fixes.

For visual client-facing pages:

1. Generate or create three options.
2. Capture screenshots.
3. Pick a direction.
4. Port into the React/Vite app.
5. Run mobile/accessibility QA.
