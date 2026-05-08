# Branded AI Video Production Kit (Phase 1)

Build a repeatable, planning-first workflow for producing brand-consistent AI-assisted videos for:

- Thurr Solutions marketing assets
- Client deliverables (using supplied assets)

Phase 1 is documentation + templates (not a web app, posting automation, or analytics system).

## What This Adds

This kit standardizes:

1. Intake → collect the minimum brand inputs needed to avoid generic outputs.
2. Translation → convert inputs into concrete creative direction (tone, anchors, pacing, camera logic).
3. Shot plan → a short shot list before touching video tools.
4. Generation → Runway-first prompting with controlled motion and retry notes.
5. Polish → Remotion (or manual edit) for consistent branding, overlays, and format variants.
6. QA → a quality checklist that catches common AI artifacts early.

## File Map

- Client intake checklist: `docs/project/video-production-kit/Client-Intake-Checklist.md`
- Creative direction + shot plan template: `docs/project/video-production-kit/Motion-Direction-Template.md`
- Runway prompt templates: `docs/project/video-production-kit/Runway-Prompt-Templates.md`
- Quality checklist: `docs/project/video-production-kit/Quality-Checklist.md`

## Recommended Tool Defaults

- Default generator: Runway (image-to-video + short scenes, fast variations)
- Planning standard: “one camera move per shot” + explicit visual anchor per clip
- Assembly/polish: Remotion for branded intros/outros, readable text overlays, and format variants
- Research candidate: Hyperframe V2 for faster AI-assisted editing, to be evaluated before changing the default workflow.

## Safety / Privacy Rules

- Do not auto-post generated videos.
- Do not publish private client data in prompts, overlays, or exports.
- Do not upload or generate voice models without explicit approval and rights to use the voice.
- Keep raw voice samples private (not in `public/`).

## How To Use (Repeatable)

1. Fill out the intake checklist.
2. Produce a 6–10 shot plan using the motion direction template.
3. Generate clips shot-by-shot with Runway templates (iterate with retry notes).
4. Assemble/polish in Remotion (if needed) for consistent branding and text readability.
5. Run the quality checklist before “client review” or publish.

## Pilots (Recommended Validation)

Run two pilots before expanding scope:

- Thurr Solutions: Lead System intro (existing starting point)
- Right Thurr use-case explainer: Website landlord / rank-and-rent lead flow, based on the May 5, 2026 Granola note. Treat it as a copyable, curated model that can be adapted into owned or client-safe branded assets.

Related existing docs:

- Thurr Solutions intro brief: `docs/project/Thurr-Solutions-Intro-Video-Brief.md`
- Runway prompts (lead system intro): `docs/project/Runway-Lead-System-Intro-Prompts.md`
- Remotion starter: `docs/project/Remotion-Content-Starter.md`
- Research/agent backlog: `docs/project/Research-Agent-Backlog.md`
- Pilot 1 shot plan: `docs/project/video-production-kit/Pilot-Shot-Plan-Thurr-Solutions-Lead-System-Intro.md`
- Pilot 2 shot plan: `docs/project/video-production-kit/Pilot-Shot-Plan-Website-Landlord-Model.md`
