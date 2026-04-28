# SKILL — Working in the Right Thurr / Thurr Solutions design system

You are designing inside a **two-brand** design system. Read this before making anything.

## The two brands

| | Right Thurr | Thurr Solutions |
|---|---|---|
| **Job** | Get attention. Loud, sticker, western. | Earn trust. Calm, professional, slab. |
| **Display** | `Rye` (Google) — stand-in for the custom hand-lettered wordmark. | `Alfa Slab One`. |
| **Borders** | `4–6px` solid ink-black, hard offset shadow. | `1–2px` warm hairline, soft paper shadow. |
| **Radii** | `0px`. | `4–8px`. |
| **Mood** | Hang-tag, banner, stamp, rotated 1–4°. | Card, grid, rounded button, calm. |

**Never combine them in one composition.** Pick one brand per surface.

## Always include `colors_and_type.css`

```html
<link rel="stylesheet" href="colors_and_type.css">
```

Then scope your work with `data-brand`:

```html
<body data-brand="right-thurr">  <!-- or "thurr-solutions" -->
```

This switches `--card-radius`, `--card-border`, `--card-shadow` and the display family used by `h1`/`.display`.

## Color rules

The brand is **three colors**: `--rt-orange-500` `#D9621F`, `--rt-ink-900` `#1A1714`, `--rt-paper` `#F5EFE2`. Status accents (`--rt-success`, `--rt-warning`, `--rt-danger`, `--rt-info`) are for status only — never decoration. **Don't introduce new hues** without checking with the user.

Royal blue (~`#4548B8`) appears in source mockup backdrops (the hang-tag photo, the wordmark presentation). It is **not** a brand color — it's a photography backdrop. Don't bring it into UI.

## Type rules

- **Right Thurr** display: `var(--font-display-rt)` (Rye). Title Case. Big — 64px+ for heroes.
- **Thurr Solutions** display: `var(--font-display-ts)` (Alfa Slab One). Sentence case. `letter-spacing: -0.02em`.
- Body / UI: `var(--font-body)` (Archivo).
- Eyebrows / tags / caps labels: `var(--font-subhead)` (Archivo Narrow), 700, `letter-spacing: var(--tracking-loud)` (`0.14em`), uppercase.
- Numerics, IDs, money, timestamps: `var(--font-mono)` (JetBrains Mono).

## The signature interactions

1. **Stamp shadow on hover** (Right Thurr): card has `box-shadow: var(--shadow-stamp)`. On hover, translate `(2px, 2px)` and reduce shadow to `1px 1px 0 #000`. On active, flatten to `0 0`. Feels like pressing a stamp.
2. **Hang-tag rotation** (Right Thurr): orange tags / stickers / badges always rotated `1–4°` (alternate direction per group). Never axis-aligned.
3. **Activity-feed slide-in**: feed items enter from the left, 280ms, staggered 60ms.

## Voice cheat sheet

| Surface | Right Thurr | Thurr Solutions |
|---|---|---|
| Hero CTA | `GET IT BUILT →` | `Start a project →` |
| Loading | "Wiring offer to landing page…" | "Generating preview…" |
| Done | "Live. Your offer is online." | "Proposal sent." |

Right Thurr uses **"you" + "we"** — never "I". Refer to users as "operators" / "hustlers", not "users". No emoji in product UI; only the four status glyphs `✓ ▲ → ●` as text characters.

## Asset rules

- Use the cleaned wordmark `assets/right-thurr-wordmark-clean.png` as the primary Right Thurr logo. The earlier `right-thurr-logo.png` was a screenshot crop — superseded.
- Use `assets/rt-monogram-clean.png` for the R+T monogram (favicon, app chrome, watermark, ship-stamp).
- Both are **rasters**. Replace with vector SVGs before any production deployment.
- The arrow descender on the "T" always points **down-and-right**. Never mirror.
- Right Thurr looks great laid over a royal-blue or paper backdrop with a slight rotation. Don't lay it over orange (it's already orange).

## File map (where to edit)

| Want to change… | Edit this |
|---|---|
| Tokens (color, type, spacing, shadow) | `colors_and_type.css` |
| The visual reference document | `design-system.html` |
| Right Thurr applied UI examples | `right-thurr-ui-kit.html` |
| Thurr Solutions applied UI examples | `thurr-solutions-ui-kit.html` |
| Brand strategy, voice, casing rules | `README.md` |

## Before shipping

1. **Pick one brand per surface.** Don't mix RT stamp shadows with TS hairline cards.
2. **Use the bold black border at least once on every Right Thurr screen.** It's the brand's signal.
3. **Status colors only on status badges** — not on buttons, headlines, or backgrounds.
4. **Run a 0/4/8/12 px radius audit** — RT should be 0 everywhere; TS should be 4–8 (never 12+ except pills).
5. **Run a copy pass** — no "users", no "platform", no "synergy", no emoji.
