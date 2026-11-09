## MODIFIED Requirements
### Requirement: Keyboard owns displayed score after navigation
A handled, unmodified keyboard scoring operation SHALL clear pointer preview and emit hover-change(0) once when preview was active. Controlled refusal SHALL display the authoritative score; later pointer motion MAY preview again. Unhandled or guarded keys SHALL not change preview.
#### Scenario: Hover four then increase a one-point half-step rating
- WHEN the user previews four and presses ArrowRight
- THEN an uncontrolled value and display become 1.5; controlled refusal displays 1, and both clear the stale preview.
### Requirement: Gap accepts nonnegative lengths
Rate gap SHALL accept zero numeric and zero CSS lengths, retaining existing positive-length and expression handling. Size SHALL still require a positive length. Negative or invalid literals SHALL retain token fallback.
#### Scenario: Zero gap with zero size
- WHEN gap is 0 or 0px and size is 0
- THEN item spacing is explicitly zero while icon size uses its token default.
