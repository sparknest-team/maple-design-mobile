---
"@maple-design/ui": patch
---

Reduce Tooltip, Popover and Ellipsis entry overhead by removing duplicate prop-default setup, unused positioning fields and inactive ResizeObserver polyfill plumbing. Keep popup-container DOM-brand validation in development builds, where Vue uses it. Preserve native observation, viewport fallback, positioning, interaction and rendering behavior; tighten the floating-entry size and dependency checks.
