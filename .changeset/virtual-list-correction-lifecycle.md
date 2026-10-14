---
"@maplejs/maple-ui": patch
---

Invalidate stale VirtualList post-render scroll corrections when superseded, data/mode changes, deactivated or disposed. Ignore retained inactive/disposed commands; consume corrections once and preserve existing List API and alignment behavior. No new CSS motion token.
