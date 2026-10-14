---
"@maplejs/maple-ui": patch
---

Reject cancelled, consumed and inactive long-press timer callbacks before stepping; preserve reentrant replacement holds and existing 800ms/150ms cadence. No public API or CSS token changes.
