---
"@maple-design/ui": patch
---

Own each Scrollbar Thumb mouse gesture by session/node/axis/original window. Remove move/up/contextmenu/blur listeners on end/cancel/geometry changes/deactivation/disposal; reject old move/end and inactive retained input. Preserve equal-geometry drag continuity, current setOffset/track behavior and public CSS/API. Actual Parent+Thumb controlled regression is separate from native browser/OS/cross-frame drag proof.
