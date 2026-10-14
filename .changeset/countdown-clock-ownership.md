---
"@maplejs/maple-ui": patch
---

Isolate stale/consumed countdown RAF and reentrant change callbacks from replacement runs. Defer inactive auto-start/reset work until activation, honor explicit pause, and reject disposed controls without changing business timing or CSS tokens.
