---
"@maplejs/maple-ui": patch
---

Isolate BackTop measurement/listener and animation-frame generations across replacement, deactivation and disposal. Consume dequeued frames once, recheck after custom easing, and request/cancel RAF with the target owner window/time origin. Preserve duration/easing/defaults/API and independent sources; no CSS token added.
