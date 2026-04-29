# Notion Import Pack

These CSV files create the first Command Center databases:

- `task-tracker.csv`
- `content-calendar.csv`
- `ai-ideas-log.csv`

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
