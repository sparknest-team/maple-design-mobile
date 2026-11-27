---
'@maple-design/ui-vue': patch
---

修复 jsdom 31 升级后失效的单元测试：移除往只读 `getComputedStyle()` 结果写 `transform` 的 `mockTranslate`（jsdom 31 按规范改为只读）、对齐 CSS 序列化断言、补齐用例间 DOM 隔离与焦点还原的宏任务同步，并把 VuePress 迁移后失效的路由测试改测真实的 `legacyRoute` 兼容实现。
