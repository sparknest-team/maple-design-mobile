---
"@maplejs/maple-ui": major
---

Remove unused public CSS token interfaces after verifying their real consumers, without pre-release compatibility aliases. Restore effective Card/Dialog and state/geometry customization, document platform-specific Textarea counter layouts, unify Card motion tokens and improve reduced-motion and PageHeader input-mode feedback. Cedar additionally completes Form/Tree xl geometry and replaces FilterForm's ineffective CSS column-gap token with the existing numeric gridProps.colGap customization path. See design-ui/audits/token-consumer-resolution.md for token-by-token migration details.
