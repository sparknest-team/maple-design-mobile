---
'@maple-design/ui': major
---

Unify Button and ButtonGroup on the feature-complete Maple implementation. Add icon/autofocus and complete loading controls, fix disabled links and async reentry, and share five sizes/eight statuses and paired demos. loading-type selects the spinner; migrate Cedar default/fill/line to loading-mode. ripple/focusable default to true, and Maple loading layout defaults to inline (set loading-mode=fill for covering). Cedar Button CSS token names follow the shared Maple baseline; see API-MIGRATION.md.

Fix numeric Loading animation primitive dimensions and restrict Button focus outlines to keyboard focus-visible. Restore interactive variant matrices, loading size/type combinations, gradient colors, icon and stacked buttons, complete ButtonGroup variants and split-action popover demos on both platforms.

Polish paired demos with library controls and selectable loading combinations. Make round buttons square, restore compact stacked/group corners and dimensions, and replace the existing icon during inline loading to avoid group growth and overflow.
