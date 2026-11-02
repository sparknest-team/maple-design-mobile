---
"@maple-design/ui": major
---

Replace AutoComplete.strict with caseSensitive by explicit user request, without a compatibility alias. Migrate strict/strict=true to case-sensitive/caseSensitive=true; default false and boolean meaning are unchanged. This removal requires the next major release.

Add caseSensitive to Select and Cascader. Preserve default matching fields and existing case policy: AutoComplete/Select/Cascader/PeopleSelect ignore case by default; Cedar TreeSelect continues case-sensitive value matching. Custom filters retain priority and own their case policy; remote filtering bypasses local matching using each component's existing protocol. Update rendered/slot/keyboard filtering, demos, public type coverage and tests. No F06 guard protocol changes.
