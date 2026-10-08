---
'@maplejs/maple-ui': patch
---

Consolidate single/range time panel drafts, validation, selection and confirmation in independently copied controllers. Extract desktop Dayjs/list and mobile wheel/clock interaction adapters. Remove obsolete input/open-state logic from Cedar's pure panel; keep popup closing at the component boundary and enforce current rules on its confirm button. No shared runtime or platform configuration. Add paired controller tests and source-copy checks.

