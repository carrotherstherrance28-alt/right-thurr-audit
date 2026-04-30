# Notion Import Pack

These CSV files create the first Command Center databases if the API script is unavailable:

- `task-tracker.csv`
- `content-calendar.csv`
- `ai-ideas-log.csv`

The live databases were also created through `scripts/notion-create-command-center.mjs`:

- Task Tracker: https://app.notion.com/p/352a6f1d252381ccb2d8c1feeadd0a29
- Content Calendar: https://app.notion.com/p/352a6f1d2523811694cec856397a88d6
- AI Ideas Log: https://app.notion.com/p/352a6f1d2523818f80a7db7d63e73f0a

## Import Steps

1. Open Notion.
2. Go to the Command Center page.
3. Type `/csv` or use `Import`.
4. Import each CSV as a new database.
5. Rename the imported databases:
   - Task Tracker
   - Content Calendar
   - AI Ideas Log

## Recommended Source Of Truth

- Supabase: CRM and lead lifecycle records.
- Repo docs: technical build source of truth.
- Notion: daily task visibility, content planning, and idea capture.

Do not sync private lead details into Notion until owner auth/RLS is finalized.
