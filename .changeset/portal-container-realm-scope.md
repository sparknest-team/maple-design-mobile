---
"@maplejs/maple-ui": patch
---

Accept valid popup-container HTMLElements from an iframe's own realm while still rejecting SVG and non-elements. Preserve real Teleport target, state, event ownership and cleanup contracts with regression coverage.

Document component-variable scopes, root alias computation and Teleport inheritance boundaries. No token names, defaults or theme-generation behavior change.

Rebind modal focus listeners and layer ownership when an already open Dialog or Popup moves to another document, preserving the same content instance and releasing the old destination.

Fix custom-host → inline → body target retention in shared popup plumbing, including modal scroll-lock ownership. No public token or API changes.

Restore focus to the active top modal after same-document host/inline moves, which can blur a moved control without changing the root ref or ownerDocument. Preserve the original opening trigger for close restoration.

Capture the original opener across accessible same-origin ancestor documents when a modal initially opens inside an iframe. Restore the parent trigger after close without stealing newly moved outside focus. Real iframe browser acceptance and focused permanent regression cover both platform implementations; no public API or token change.

Preserve ancestor modal opener chains when opening a nested modal. If its parent closes first, retain child focus and restore the visible original page opener after the final close instead of targeting a hidden parent control. Skip hidden/disabled/inert/disconnected restoration candidates and preserve outside focus. Eight native nested theme cases and real Teleport regression cover the fix; no public API or token change.
