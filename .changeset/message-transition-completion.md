---
"@maplejs/maple-ui": patch
---

Let Message CSS transition completion control service disposal instead of fixed 150ms/200ms waits. Clean up never-mounted entries immediately and clear from an item snapshot; preserve business display duration and same-id reopen ownership.
