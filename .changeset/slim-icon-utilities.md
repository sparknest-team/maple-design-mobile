---
"@maple-design/ui": patch
"@maple-design/shared": patch
---

Consolidate Icon namespace and predicate helpers in maple-shared, remove the duplicate Icon-only utility files, and keep UI-specific prop-default and CSS size handling in the existing component utilities. Preserve behavior and tighten bundle checks so consolidation does not increase on-demand Icon size.

Reduce shared namespace and prop-default wrapper overhead, and keep unused array predicates out of unrelated named imports. Enforce raw/gzip size budgets from before the consolidation across all component entries.
