---
"@maple-design/ui": major
---

Unify CheckboxGroup and RadioGroup controlled/uncontrolled state using independent local source copies. Group changes are emitted once at the group boundary; child/external synchronization no longer emits duplicate updates or form validation. Add inherited readonly/disabled/error contracts and Maple group defaultValue. Maple bulk selection observes max, retains selected locked/unloaded values, and emits change for effective proposals. Grouped Checkbox.toggle accepts a checked boolean. Standalone API and component appearances are not yet fully aligned.
