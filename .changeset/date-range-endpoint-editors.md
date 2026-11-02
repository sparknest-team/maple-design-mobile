---
'@maple-design/ui': minor
---

Open every DateRange field editor session at the start endpoint, falling back to the end when the start is locked. Keep both endpoint summaries visible, open the calendar at the start date when possible, edit the active endpoint and retain the other endpoint, and allow initially empty fields to confirm either endpoint first. Preserve drafts, cancellation, ordering, timezone and endpoint locks. Evaluate and cache time constraints per candidate to avoid rebuilding every minute and second while switching endpoints.
