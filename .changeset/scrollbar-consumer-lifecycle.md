---
"@maplejs/maple-ui": patch
---

Suspend retained Scrollbar commands/events/measurements during deactivation/disposal and isolate old activation bindings/reentrant geometry. Correct zero-origin scrolling, zero thumb reset, horizontal ratio and zero-viewport metrics in independent copies. Preserve native options and public signatures/CSS variables; no timers/RAF or synthetic smooth animation added. Native Thumb drag/observer/browser behavior remains separately bounded.
