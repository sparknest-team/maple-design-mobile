---
"@maple-design/ui": patch
---

Invalidate canceled/consumed ImagePreview long-press and double-tap timers, suspend retained input during deactivation/disposal, detach keyboard/coarse-pointer observation and release capture. Activation reads current mode without replay. Preserve500ms/320ms policies, public API and CSS tokens; PreviewGroup scheduling remains separate.
