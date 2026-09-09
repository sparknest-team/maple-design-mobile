---
"@maplejs/maple-ui": patch
"@maplejs/maple-cli": patch
---

按 Arco 的静态样式入口模式拆分公共基础和组件依赖，避免 Less 重复内嵌 CSS；文档站基础样式使用统一模块路径，发布入口保留依赖图。
