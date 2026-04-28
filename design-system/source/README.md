# Right Thurr & Thurr Solutions — Design System

Two sibling brands. One palette, one monogram, one arrow language — but two voices. Treat them as related siblings, **never** as the same brand.

> **Read this first.** This README is the source of truth. The CSS in `colors_and_type.css` is the implementation. Cards in `design-system.html` are the visual reference. UI kits in `right-thurr-ui-kit.html` and `thurr-solutions-ui-kit.html` are the applied examples.

---

## The two brands at a glance

| | **Right Thurr** | **Thurr Solutions** |
|---|---|---|
| **Audience** | Local service side-hustlers, solo entrepreneurs, the "let's get it" crowd. | Small-business owners, agencies, and clients buying automation/AI consulting. |
| **What it sells** | The product/app: turns an idea into a live, trackable business system. Merch & public face. | B2B services: automation builds, AI consulting, proposals, client work. |
| **Job to do** | **Get attention.** Make people feel like a business is being built around them, right now. | **Earn trust.** Make a buyer comfortable handing over a 5-figure engagement. |
| **Tone** | Bold, active, directional, "boots-on" western energy. | Cleaner, professional, calm, capable. |
| **Display type** | `Rye` — saloon/western hand-drawn poster face. | `Alfa Slab One` — refined slab, confident but not loud. |
| **Borders** | `4–6px` solid black, sticker outlines, hard offset shadows. | `1–2px` warm-gray, soft paper shadows. |
| **Radii** | `0px` — poster corners, sticker edges. | `4–8px` — small, professional. |
| **Shadow** | Hard offset stamp (`6px 6px 0 #000`). | Soft warm paper (`0 6px 18px rgba(26,23,20,0.10)`). |
| **Imagery** | Hand-drawn arrows, banners, tags, badges. Texture. | Clean diagrams, screenshots in chrome, abstract geometry. |

> **Don't combine them.** They share a palette and the R+T monogram and an arrow vocabulary — but the two should never appear in the same composition without a clear hierarchy (e.g. a Thurr Solutions case study _about_ a Right Thurr launch).

---

## Tagline

> **Turn your idea into a business system.** *(Right Thurr)*

For Thurr Solutions, lean toward outcome-led copy: "Automation and AI systems for small business operators." (No tagline mandated yet — flag for the user.)

---

## What Right Thurr does

Right Thurr is an AI-powered **business system builder.** A user describes a service idea ("I want to start a pressure washing side hustle in Atlanta"), and the product generates:

- A **business blueprint** (positioning, pricing, who-it's-for)
- An **offer** (the headline service + price)
- **Landing page copy** (real, deployable)
- A **task list** (the next 10 things to do, in order)
- An **activity feed** (what the system did for you, like a Stripe-style log)
- A **money tracker** (revenue, costs, runway)

The product should **feel like a business-building machine that is actively working**, not a dashboard displaying data. That distinction is the entire UX brief: motion, activity feeds, real-time-feeling progress, and copy that says **"we built this for you"** — not "here is your data."

## What Thurr Solutions does

Thurr Solutions is the studio behind Right Thurr. It sells:

- AI consulting for small businesses
- Custom automations (Zapier/n8n/code)
- Internal-tool builds
- Brand & landing-page production

Its surfaces are: a marketing site, proposal PDFs, client-facing dashboards, and case studies.

---

## Sources & uploaded references

The user uploaded three screenshots from a brand-system PDF/Figma:

- `uploads/Screenshot 2026-04-28 at 4.36.46 AM.png` — secondary icon (R+T monogram with arrow descender)
- `uploads/Screenshot 2026-04-28 at 4.37.08 AM.png` — primary Right Thurr logo (banner-style western lettering)
- `uploads/Screenshot 2026-04-28 at 4.37.45 AM.png` — features card: "Directional Arrow / Western Handdrawn Font / Bold Border" + orange hang-tag application

A second drop included higher-fidelity source art:
- `uploads/Right Thurr Logo-11.png` — high-res Right Thurr wordmark on royal-blue presentation field
- `uploads/Right Thurr.png` — hang-tag photo mockup (orange tag, twine, blue backdrop)

Cleaned logo art is in `assets/`:
- **`right-thurr-wordmark-clean.png`** — primary wordmark, background removed (**canonical Right Thurr logo — use this**)
- `rt-monogram-clean.png` — R+T monogram, transparent bg
- `right-thurr-hangtag-photo.png` — hang-tag application reference
- `right-thurr-logo.png` — earlier crop from screenshot (superseded)

**No codebase or Figma URL was attached.** All visual decisions are inferred from the uploaded references + the written brief. The royal-blue field in the source mockups is **not** a brand color — it's a presentation backdrop. If the user has the source vector logo and licensed display typeface, please attach to replace the raster + Google-Font stand-ins.

---

## CONTENT FUNDAMENTALS

### Voice

Right Thurr writes the way a confident operator talks to another operator. **Active verbs, short sentences, second person ("you"), no jargon.** It tells the user what's happening *to* their business, not what they should think about doing.

Thurr Solutions writes one notch quieter and more measured — same voice, but in a meeting room instead of a tailgate.

### Tone matrix

| Surface | Right Thurr | Thurr Solutions |
|---|---|---|
| Hero | "Turn your idea into a business system." | "We build the systems that run small businesses." |
| Empty state | "Drop your idea in. We'll wire it up." | "Start a project to begin." |
| Loading | "Building your blueprint…" / "Wiring offer to landing page…" | "Generating preview…" |
| Success | "Live. Your offer is online." | "Proposal sent." |
| Error | "Hit a snag. We're rerouting." | "Something went wrong. Retry?" |
| CTA | **GET IT BUILT** / **SHIP IT** / **GO →** | **Start a project** / **Talk to us** |

### Casing rules

- **Right Thurr** uses ALL-CAPS aggressively for buttons, labels, badges. Display headlines stay in **Title Case** (because Rye renders capitals natively). Use letter-spacing `0.14em` on caps labels.
- **Thurr Solutions** uses **Sentence case** for headlines, **Title Case** for buttons, ALL-CAPS only for tiny labels/eyebrows.

### Person & pronouns

- **"You"** addresses the user. ("Your blueprint is live.")
- **"We"** is the product/team doing work for them. ("We wired your offer to a landing page.")
- Avoid **"I"** — Right Thurr is a system, not an assistant persona.
- Never use "users," "customers," "clients" in user-facing copy. Prefer **"operators,"** **"hustlers,"** or just **"you."**

### Emoji

**No emoji in product UI.** Right Thurr's iconography is hand-drawn arrows, sticker-style icons, and the R+T monogram — emoji breaks the western/sticker visual code. Exception: internal Slack-style activity feed messages can use a single status glyph (✓ ▲ → ●) prefix, but only those four.

### Vibe (one-liners)

- "Boots-on, not boots-up."
- "A workshop, not a dashboard."
- "Stamped, stitched, shipped."

### Examples

**✅ Good Right Thurr copy:**
> Drop your idea. We'll build the offer, the page, and the to-do list — by the time your coffee's done.

**❌ Bad Right Thurr copy:**
> Welcome to your AI-powered entrepreneurship platform. Click "Get Started" to begin onboarding.

**✅ Good Thurr Solutions copy:**
> We build the automations that take 200 hours off your year. Start with a 30-minute call.

**❌ Bad Thurr Solutions copy:**
> Synergize your AI-driven workflows with our world-class consulting.

---

## VISUAL FOUNDATIONS

### Color system

A **three-color** brand. Anything else is a status accent, not identity.

- **Rust Orange** `#D9621F` — the action color. Hang-tags, CTAs, monogram fill, sticker accents. Flat fill, never a gradient.
- **Ink Black** `#1A1714` — warm black, never pure `#000` in body text. The bold-border color, the wordmark color, the type color.
- **Off-White Paper** `#F5EFE2` — the canvas. Never cool gray; always paper-warm.

Backgrounds may shift between three paper tones (`--rt-paper-cold` near-white, `--rt-paper` default, `--rt-paper-deep` aged) for visual rhythm. Status accents (`--rt-success`, `--rt-warning`, `--rt-danger`, `--rt-info`) are used **only** for status — never decoration.

### Typography

- **Display (Right Thurr):** `Rye` — substituted from Google Fonts in place of the custom hand-drawn western face shown in the logo. **Flag:** the actual logo is custom-lettered; `Rye` matches the saloon vibe but isn't pixel-identical. Provide source `.otf`/`.ttf` to replace.
- **Display (Thurr Solutions):** `Alfa Slab One` — confident slab, professional cousin to the western face.
- **Subhead/condensed:** `Archivo Narrow` — for stickers, hang-tags, all-caps labels.
- **Body / UI:** `Archivo` — workhorse grotesk, six weights.
- **Mono:** `JetBrains Mono` — money trackers, task IDs, activity feed timestamps.

Type scale ranges 12 → 112px on a 1.25 (major-third) modular ratio. See `colors_and_type.css` for tokens.

### Spacing

4px base. The full ramp: `0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128`. Right Thurr layouts tend toward **bigger** rhythm (`--s-12+`) so things feel poster-like; Thurr Solutions uses tighter steps (`--s-4` to `--s-8`) for information density.

### Borders

The bold black border is core brand DNA — it should appear on **at least one element per Right Thurr screen.**

- `--bw-thin` 2px — internal dividers
- `--bw-bold` 3px — secondary borders
- `--bw-loud` 4px — **default Right Thurr border**
- `--bw-poster` 6px — sticker outlines, hero CTAs

Thurr Solutions uses `--bw-hair` (1px) and `--bw-thin` (2px) only.

### Radii

- **Right Thurr:** `0px` always. Cards, buttons, tags — sharp corners.
- **Thurr Solutions:** `4px` for inputs/buttons, `8px` for cards. Pill (`999px`) reserved for status badges.

### Shadows

- **Stamp shadow** (Right Thurr): `6px 6px 0 0 #1A1714` — hard offset, no blur. The shadow MOVES on hover (offset reduces to `3px 3px`) and the element shifts toward the original shadow position. This is the brand's signature interaction.
- **Paper shadow** (Thurr Solutions): `0 6px 18px rgba(26,23,20,0.10)` — soft, warm, single-direction.

### Motion

- Things SNAP. They don't glide. Default duration is 180ms with a slight overshoot easing (`--ease-snap`).
- Stamp interactions use 360ms with `--ease-stamp` for a satisfying "thunk."
- Activity feed lines slide in from the left at 280ms, staggered 60ms.

---

## ICONOGRAPHY

Right Thurr's icon system is **not** generic line-icons. It's a hand-drawn, slightly-rough, sticker-style set built around **three shape primitives:**

1. **The Arrow** — directional, varies in style: straight chevron, curved bend, hook-back, banner-arrow. Always implies "forward, do this, ship it."
2. **The Tag/Banner** — hang-tags (orange ribbon with string), banners (the shape of the wordmark plate), stamp seals.
3. **The Tool** — pickaxe, hammer, ladder, lasso, anvil — drawn with a single bold contour, no inner detail.

### Status glyphs (the ONLY emoji-equivalents allowed in UI)

- `✓` complete / shipped / live
- `▲` building / in progress
- `→` next / queue / outbound action
- `●` pending / backlog

These ship as text characters (so they can be colored via CSS and never break) — **not** images.

### Stroke / weight rules

- Stroke width is **3px at 24px size** (proportional). Never thinner than 2px at any size.
- Corners are slightly rounded (`stroke-linejoin: round`) — never miter-sharp. This is the "hand-drawn" cue.
- Single-color: ink-black on paper, or paper on orange. Never two-color icons.

### Sourcing

Until a custom icon set is commissioned, use **`Lucide` icons stroked at 2.5–3px** as a placeholder. They have the right energy. Avoid `Material`, `Heroicons`, or anything filled.

> **Flag for user:** an actual hand-drawn icon library should be commissioned to live up to the brand's potential. The screenshots show a clear illustrated style that off-the-shelf libraries can't match.

### The R+T monogram

The R+T monogram (`assets/rt-monogram-clean.png`) is the brand's **secondary mark**. Use it:

- As a favicon
- As a stamp on ship-confirmation moments
- As a watermark on PDFs / proposals
- As a small lockup mark in product chrome (top-left of the app shell)

The arrow descending from the "T" always points **down-and-right** — never mirror it.

---

## File map

```
README.md                   ← you are here
SKILL.md                    ← Claude/agent guidance for working in this system
colors_and_type.css         ← all tokens; import this once, use everywhere
design-system.html          ← visual reference: palette, type, spacing, components
right-thurr-ui-kit.html     ← applied UI: app shell, hero, activity feed, money tracker
thurr-solutions-ui-kit.html ← applied UI: marketing site, proposal, case study
assets/                     ← logos, monogram (rasters; replace with SVG when available)
uploads/                    ← original brand screenshots
```

## Caveats & next steps

1. **Logos are raster crops** from screenshots. Replace with vector SVGs ASAP — the bold-black border breaks at small sizes when scaled from PNG.
2. **Display face is approximated.** `Rye` matches the saloon vibe but the actual wordmark is custom-lettered. If a typeface license is intended (e.g. *True North*, *Riesling*, *Zilap Western*), point to it and we'll swap.
3. **No icon library yet.** Lucide is used as a placeholder. Commission an illustrated set or vectorize the existing motifs from the brand guide PDF.
4. **No photography direction.** The brand likely needs a photo treatment guide (high-contrast, warm-toned, blue-collar subject matter). Flag if needed.
5. **No motion guide for video/launch animation** — only product-level micro-interactions are specified. If launch videos or social motion content is on the roadmap, expand `MOTION` into a separate doc.
