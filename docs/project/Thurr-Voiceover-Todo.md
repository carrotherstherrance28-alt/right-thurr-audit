# Thurr Voiceover Todo

## Goal

Use Thurr's voice for the Thurr Solutions website intro video.

## Why

The site should feel founder-led and credible. A generic AI narrator would weaken trust. Thurr's voice makes the walkthrough more personal and better for social clips, sales calls, and Right Thurr behind-the-scenes content.

## Required Authorization

Before uploading, cloning, or generating a voice model, Thurr must explicitly approve:

- Which platform will use the voice
- Whether the voice is recorded once or cloned/reused
- Whether the output is for public website use, social clips, or internal drafts
- Where raw samples are stored

## Steps

1. [ ] Sign in to NotebookLM and Runway.
2. [ ] Generate the final 45-60 second script from the NotebookLM source.
3. [ ] Record Thurr reading the final script, or use an approved voice tool only after explicit authorization.
4. [ ] Save raw voice samples privately in `private-media/voice-samples/`.
5. [ ] Save final approved voiceover as `public/media/thurr-solutions-lead-system-voiceover.mp3`.
6. [x] Generate a first Remotion visual draft for the website intro.
7. [ ] Combine approved voiceover and final visuals.
8. [x] Export visual draft website video to `public/media/thurr-solutions-lead-system-intro.mp4`.
9. [x] Export a poster image to `public/media/thurr-solutions-lead-system-intro-poster.jpg`.
10. [x] Wire the homepage intro section to detect the video file.

## Current Asset Status

- Visual draft MP4: `public/media/thurr-solutions-lead-system-intro.mp4`
- Poster image: `public/media/thurr-solutions-lead-system-intro-poster.jpg`
- Composition: `ThurrLeadSystemIntro`
- Render command: `npm run remotion:render:lead-system`
- Poster command: `npm run remotion:still:lead-system`

The video is ready for website preview as a silent visual draft. It is not the final public voice-led version until Thurr's approved voiceover is added.

## Voice Direction

Calm, direct, confident, practical, and founder-led.

Avoid:

- Hype ad voice
- Fake urgency
- Overly dramatic music
- Radio-announcer tone
- Generic AI narrator
