---
"@maple-design/ui": major
---

Add edit-mode to Form, FormItem and editable fields. direct replaces the ambiguous inline editing name; existing popup/click/dblclick behaviors and independent readPretty remain unchanged. Remove the old editing presentation prop, its type aliases and the inline editing value without compatibility shims. Migrate presentation="inline" to edit-mode="direct" and keep layout="inline" unchanged.
