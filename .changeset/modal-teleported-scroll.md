---
"@maple-design/ui-vue": patch
---

修复 Popup 和 Dialog 的背景锁滚误拦截内部 Trigger 浮层的触摸滚动。下拉选项可从文字处起手滚动，到达列表边界时背景仍保持锁定。
