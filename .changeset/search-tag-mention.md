---
"@maple-design/ui-vue": major
---

Add local and remote candidate search to InputTag, and configurable minimum search length and single-result auto-commit to InputTag and Mention.

Avoid flashing empty results during automatic tag commits and remote search debounce.

Support scalar single-tag mode and creating the input after an empty search.

Rename InputTag format-tag and the tag slot to format-label and the label slot; the old names are removed.
