---
"@maple-design/ui": minor
---

Add searchFields (default ['label']) to selection components; fields use OR matching and fieldNames mapping, with custom callbacks retaining priority. Cedar TreeSelect now defaults to case-insensitive label search by explicit user request; recover its previous defaults with searchFields=['value'] and caseSensitive=true. This Cedar default change requires a major release.

Extend existing beforeClose (Dialog/Drawer), beforeConfirm and beforeCancel (Popconfirm) with explicit boolean/Promise and callback completion. Keep the original before* names and done argument positions. Synchronous void waits for done; Promise<void> allows. First completion wins without signature guessing; errors are reported through guard-error. Handle loading, duplicate operations, cancellation, stale results and legacy rejection cleanup. Add public types, demos, runtime and declaration-contract tests. Existing Switch, field commit, Upload transformation and lazy-loading callback APIs remain unchanged.
