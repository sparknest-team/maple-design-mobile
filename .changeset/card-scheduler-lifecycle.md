---
"@maplejs/maple-ui": patch
---

Own Card floating render/timer/layout continuation work by lifecycle, generation and node identity. Reject stale/consumed deliveries, reentrant geometry disposal and inactive retained input; activation starts fresh current state without duplicate initial waiting. Preserve500ms ripple policy, public floating-duration250ms and CSS/API contracts. Existing doubleRaf frames are not physically canceled; old continuation writes are invalidated.
