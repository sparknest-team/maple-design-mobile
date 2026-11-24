---
"@maple-design/ui-vue": patch
---

section: `show-marker` 改为显式默认 `false`，去掉按表单上下文推断

`Section` 原来在未传 `show-marker` 时，会根据祖先是否存在 `Form` 自行决定是否显示标题色条
（`props.showMarker ?? !!form`），使同一份调用代码在表单内外视觉不同。现改为
`default: false`，需要色条时显式传入。`form` 上下文仍用于 `--form` 类名与 inline 布局。
