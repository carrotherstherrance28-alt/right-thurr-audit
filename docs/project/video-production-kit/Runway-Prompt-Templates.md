# Runway Prompt Templates

Use these as consistent starting prompts. Keep clips short (5–10s) and iterate shot-by-shot.

## Global Guardrails (Paste Into Every Prompt)

- Professional, grounded, brand-consistent visuals.
- No neon sci-fi AI imagery, robots, holograms, or cyberpunk style unless explicitly requested.
- Keep the main subject stable; avoid morphing faces, hands, or logos.
- One camera move per shot.
- Clean lighting and realistic textures.

## Template: Image-to-Video (Service Business)

Prompt:

```text
{GLOBAL_GUARDRAILS}

Subject: {SUBJECT_DESCRIPTION}
Input: use the provided image as the primary visual anchor; keep it recognizable.
Camera: {ONE_CAMERA_MOVE} at a slow, controlled speed.
Motion: subtle, realistic motion only; no warping or melting.
Style: {BRAND_STYLE_NOTES}
```

Retry notes:

- If it morphs: reduce motion, choose a cleaner still, restate “keep subject stable.”
- If it looks generic: strengthen the anchor and include a brand-specific detail from intake.
- If it over-animates: slow camera speed; remove extra scene motion.

## Template: UI / Dashboard Walkthrough

Prompt:

```text
{GLOBAL_GUARDRAILS}

Scene: clean B2B workflow UI on {BACKGROUND_STYLE}. Black interface lines, {ACCENT_COLOR} highlights.
Action: show {STEP} progressing through {WORKFLOW_STAGES} with simple arrows/markers.
Camera: slow push-in, slight parallax.
Text: keep any on-screen text minimal and readable.
```

Retry notes:

- If text is unreadable: remove text from generation; add overlays in Remotion.
- If UI gets too futuristic: restate “grounded B2B ops UI, not sci-fi.”

## Template: Final Brand Card

Prompt:

```text
{GLOBAL_GUARDRAILS}

Scene: simple premium brand card for {BRAND_NAME}.
Background: {BACKGROUND_STYLE}
Typography: clean, modern, high-trust.
Accent: {ACCENT_COLOR}
Motion: subtle reveal, slow push-in.
```

## Template Variables

- `{BRAND_STYLE_NOTES}`: tone + style constraints from intake
- `{ONE_CAMERA_MOVE}`: locked / slow push / slow pan / gentle orbit
- `{BACKGROUND_STYLE}`: paper texture / clean studio / natural location

