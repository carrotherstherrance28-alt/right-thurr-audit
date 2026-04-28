# Right Thurr — UI Kit (Product)

The live, working business-system builder. Components are JSX, loaded via Babel standalone in `index.html`.

## Screens
1. **Idea Composer** — single-input "drop your idea" hero, with stamps and recent ideas.
2. **Build In Progress** — split: blueprint streaming on the left, live activity feed on the right. The "machine working" state.
3. **Operator Dashboard** — the running system. Money tracker (top), task list (left), activity feed (right), offer card (center).

## Components
- `<RTHeader>` — sticky top nav with monogram + nav stamps
- `<HeroComposer>` — the big "Turn your idea into a business system" input
- `<MoneyTracker>` — auto-ticking ledger
- `<ActivityFeed>` — streaming events with mono timestamps
- `<TaskCard>` — checkable task with stamp-style status
- `<OfferCard>` — generated offer preview as a luggage tag
- `<StampButton>` — primary CTA with lift animation
- `<TagStamp>` — rotated label badges
- `<BlueprintStream>` — typewriter blueprint rendering

> ⚠️ This is a **visual recreation** based on the brand brief. No production codebase was provided. Iterate freely.
