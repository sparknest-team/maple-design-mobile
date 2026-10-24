---
"@maple-design/ui": patch
---

Clean up Message display timers during KeepAlive deactivation and prevent scheduling after unmount. Reactivation starts the full current duration; exhausted hover deadlines close on resume, explicit zero remains persistent, and non-finite durations do not schedule auto-close. CSS motion tokens and defaults are unchanged.
