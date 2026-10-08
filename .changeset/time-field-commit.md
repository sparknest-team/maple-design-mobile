---
'@maplejs/maple-ui': patch
---

Unify field and standalone time panel commit validation using independent local copies. Revalidate current format, steps, disabled rules and supported bounds; sort ranges unless showNextDay is enabled. Cedar typed times now enforce step and use the same range ordering as panels. Mobile confirmation availability respects readonly/disabled form state. Keep clearing independent from candidate validation. Update reactive step demos, docs and paired tests.

