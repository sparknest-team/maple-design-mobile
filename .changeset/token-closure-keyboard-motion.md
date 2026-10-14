---
"@maplejs/maple-ui": patch
---

Centralize 375 cross-platform public CSS declarations in owning token files without changing their effective defaults. Fix ImagePreview enabled-arrow hover consumption, remove the unused Counter disabled-color variable, and make omitted TabBar z-index consume its CSS variable (visual default 1; prop default now undefined, explicit props still win).

Add Picker listbox keyboard navigation, stable focus and disabled-option click guards. Respect reduced motion in JavaScript selection commits and dynamic preference changes. Commit Time drafts before opening without premature blur, restoring the input focus after closing. Update token guides, generated references and regression gates.

Mark the actual Popup dialog as the modal focus root, repairing opening focus and nested return-focus ownership. Verify transition lifecycle through real Vue transitions rather than a transition stub that never calls after-leave.

Preserve DateRange's inferred withInstall plugin type instead of narrowing it to an optional install signature. Align Date wrapper import formatting without changing behavior.
