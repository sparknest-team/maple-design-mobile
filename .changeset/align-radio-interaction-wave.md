---
"@maple-design/ui": major
---

Align RadioGroup local keyboard navigation, roving tab entry and dynamic/KeepAlive registration. Copy button variant styles and five size heights independently into both libraries. Maple gains button variants and removes Ripple's eager runtime style import; import ripple/style manually when not using the resolver. Button CSS classes change to BEM; no legacy compatibility layer is retained.

Cancel Ripple timers and keyboard listeners on unmount/disable, and keep keyboard activation state per instance.
