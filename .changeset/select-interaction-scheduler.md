---
"@maplejs/maple-ui": patch
---

Invalidate Select shared-hook open-scroll work across close/reopen, newer navigation, deactivation and disposal. Consume empty deliveries once, guard retained interaction entries, and recheck after virtual callbacks before DOM writes. Preserve late registration, keyboard/option protocol and CSS/public API; regress shared consumers.
