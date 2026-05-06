# Branded AI Video Production Kit Design

## Purpose

Create a repeatable video production workflow that lets Thurr Solutions produce better AI-assisted brand videos for its own marketing and for client deliverables.

The workflow should turn rough business context, brand assets, and offer details into platform-ready video directions. It should improve clip quality, creative consistency, and production speed without requiring every project to start from a blank prompt.

## Background

The project already has:

- A Runway intro prompt document for the Thurr Solutions lead system video.
- A Remotion starter for vertical branded intro clips.
- Brand and product docs for the Thurr Solutions / Right Thurr visual system.

The referenced X post resolves to an X Article that is blocked from unauthenticated fetches, but the visible context and current Higgsfield / Runway documentation point to the same useful idea: use a planning-first video workflow. Instead of asking a video model to "make it premium," the system should translate brand intent into shot rhythm, visual anchors, camera motion, pacing, and retry notes before generation.

## Recommended Scope

Build phase one as a documented production kit, not a full content engine.

This phase should support:

- Thurr Solutions brand videos.
- Client brand videos using supplied logos, screenshots, photos, products, locations, offers, and proof assets.
- Runway generation using the user's current tool access.
- Higgsfield-style motion planning as a creative standard and future tool option.
- Remotion polish and export where programmatic brand framing, intros, captions, or format variants are useful.

This phase should not include:

- Automated posting.
- Performance analytics.
- A full campaign calendar.
- A custom web app for managing jobs.
- Complex asset storage or client portals.

Those can become phase two once the core workflow proves useful.

## Workflow

### 1. Brand Intake

Collect the minimum inputs needed to keep outputs from feeling generic:

- Brand name and offer.
- Audience and use case.
- Logo, colors, type direction, and style notes.
- Existing website, screenshots, product photos, service photos, or location photos.
- Proof assets such as reviews, before-and-after examples, metrics, or customer outcomes.
- Output targets: 16:9 website video, 9:16 social video, poster image, captions, or client handoff package.

### 2. Creative Direction Translator

Translate the intake into a usable creative brief:

- Brand tone: practical, premium, local, energetic, clinical, luxury, gritty, friendly, or other relevant direction.
- Visual anchors: the assets or moments each clip should revolve around.
- Pacing: calm explainer, fast hook, before-and-after, product reveal, service transformation, or offer walkthrough.
- Camera logic: dolly in, locked camera, slow push, orbit, crane reveal, handheld follow, close-up insert, or dashboard sweep.
- Quality boundaries: what the clip must avoid so it does not look like generic AI advertising.

### 3. Shot Plan

Create a short shot list before prompting video tools.

Each shot should include:

- Goal: what the shot proves or makes the viewer feel.
- Input asset: image, screenshot, product, person, dashboard, location, or generated still.
- Motion direction: subject motion, camera motion, and scene motion.
- Overlay text or caption line.
- Tool recommendation: Runway, Higgsfield, Remotion, or manual edit.
- Retry notes: what to adjust if the output drifts, warps, over-animates, or loses brand fidelity.

### 4. Generation Path

Use Runway as the default production tool because it is already available.

Use Runway for:

- Image-to-video clips from prepared stills.
- 5-10 second scene generations.
- Simple motion prompts focused on direct physical movement.
- Fast variations for client review.

Use Higgsfield-style planning for:

- Stronger camera intent.
- Motion-controlled creative direction.
- Short-form pacing and trend-native rhythm.
- Future workflows if Higgsfield access becomes available.

Use Remotion for:

- Branded intros and outros.
- Programmatic text overlays.
- Format variants.
- Reusable social wrappers.
- Final assembly when generated clips need consistent framing.

### 5. Quality Checklist

Before a clip is accepted, check:

- The subject or product does not morph in a distracting way.
- The brand asset remains recognizable.
- The motion is clear and intentional.
- The video feels native to the target platform.
- Text is readable on mobile.
- The clip has a clear first-second hook.
- The style matches the client's brand instead of default AI gloss.
- The output can be explained to a client as part of a professional production process.

## Deliverables

Phase one should produce:

- A reusable documentation file for the Branded AI Video Production Kit.
- A client-facing intake checklist.
- A Runway prompt template for single-shot and multi-shot videos.
- A Higgsfield-style motion direction template.
- A quality checklist for generated clips.
- Optional additions to the current Thurr Solutions intro prompt doc showing how to apply the workflow to the existing lead system video.

## Data Flow

```text
Brand/client inputs
  -> creative direction translator
  -> shot plan
  -> Runway/Higgsfield-style generation prompts
  -> Remotion polish or manual assembly
  -> final deliverables and quality checklist
```

## Error Handling

Common generation problems should have explicit fixes:

- If assets morph, reduce motion and use a cleaner input still.
- If the camera movement is chaotic, use one camera move per shot.
- If the clip feels generic, strengthen the visual anchor and brand-specific proof.
- If text is unreadable, move text overlays into Remotion or manual edit.
- If the client brand is weak, require more real assets before generation.
- If the output looks too futuristic or fake, return to grounded service-business visuals.

## Testing

Validate the workflow with two pilot uses:

- Thurr Solutions lead system intro or short-form clip.
- One client-style example using a different brand context.

For each pilot, confirm:

- The intake produces enough creative direction.
- The shot plan can be followed without extra explanation.
- Runway prompts are direct enough to generate usable motion.
- The quality checklist catches weak AI artifacts.
- The final deliverable can be reused as a portfolio or sales example.

## Open Decisions

The implementation plan should decide the exact file structure, but the likely location is under `docs/project/` near the existing Runway and Remotion content docs.

The implementation should keep this as documentation and templates first. A web UI or automation layer should wait until the workflow is used on real clips.
