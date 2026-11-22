---
'@maple-design/ui-vue': patch
---

修复 Checkbox 键盘焦点环的跨仓契约回归。

`feat(ui): refine card, section and table presentation` 把焦点环从 `inset` `box-shadow` 改成只改
`border-color`，但 `design-ui` 的 `check:choice-themes` / `choice-focus-style-check` 仍按
Radio 与 Cedar 的环形契约断言（`inset 0 0 0 <focus-width> <content-primary>`），于是
`pnpm quality` 在审计阶段直接失败。

现在三处统一：保留 `border-color` 作为额外视觉提示，同时恢复 `inset` 焦点环；
`forced-colors: active` 下继续用系统色 `Highlight` 描边（不消耗设计 token）。
