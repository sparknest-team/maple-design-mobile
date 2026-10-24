---
'@maple-design/ui': major
---

Align time format and model contracts: strict formatted strings, local Date and millisecond timestamp inputs, and formatted string outputs. Maple replaces the ampm/24hr enum and Time.useSeconds with format tokens and use12Hours; Date internal callers are migrated. Add independent source copies, matching demos and regression tests. Time component bodies are not yet fully equivalent.
