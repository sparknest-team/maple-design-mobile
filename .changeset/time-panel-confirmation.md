---
'@maplejs/maple-ui': major
---

Align standalone time panel confirmation and disabled-option visibility. Maple panels now keep selection drafts until confirmation by default; disableConfirm opts into immediate commit. Nested fields/date panels explicitly skip inner confirmation. Add hideDisabledOptions to public time fields and mobile panels; clock scales preserve their geometry when hidden. Actions slots expose confirm/canConfirm/value. Fix external clock synchronization emitting selection events. Migrate demos and add regression tests; full component source equivalence remains pending.
