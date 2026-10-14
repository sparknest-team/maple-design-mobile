---
"@maplejs/maple-ui": patch
---

Reject stale/consumed Icon name-transition callbacks, cancel pending phases when transition duration changes, and suspend timers/media listeners during KeepAlive deactivation. Bind reduced-motion observation to the actual Icon owner document and reject detached listener deliveries. Preserve default zero transition, explicit registry/slots/spin behavior and public API; no new CSS token.
