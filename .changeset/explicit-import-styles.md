---
"@maplejs/resolver": minor
"@maplejs/maple-cli": patch
---

新增 MapleStyleImports Vite 插件，复用 resolver 映射为显式具名函数和组件导入自动补齐样式，支持别名与去重。文档开发配置默认启用，修复 SplitButton Demo 调用 Message 缺少样式的问题，不增加 SplitButton 对 Message 的组件依赖。
