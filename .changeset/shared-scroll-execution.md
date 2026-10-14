---
"@maplejs/maple-ui": patch
---

Bind JS scroll RAF and reduced-motion queries to the target owner window, complete zero/invalid durations without queued interpolation, and reject consumed/completed frame replay. Preserve default 300ms/caller easing; no cancellation API or CSS token changes.
