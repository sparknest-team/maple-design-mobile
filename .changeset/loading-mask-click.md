---
'@maple-design/ui': patch
---

Stop default click actions and propagation on the Loading directive overlay so clicks do not reach the host Card or ancestor click handlers. Keep normal clicks after loading ends.
