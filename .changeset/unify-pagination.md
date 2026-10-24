---
"@maple-design/ui": major
---

统一 Pagination 两端 API、状态、页码按钮和布局；增加容器响应式简洁模式，补齐尺寸、键盘和非法输入处理及 12 组配对 demo。

pageSizeProps 收敛为 PaginationPageSizeProps，size 默认 md，elevation 默认 false。默认开启 responsive（480px）；完整页码设 responsive=false。DOM 与 CSS token 更新，详见 API-MIGRATION.md。当前尚未发布的同源批次统一迁移，不保留旧属性透传。

修复 Less 3 对 max(var(...)) 的编译错误，使用转义字符串保留浏览器原生 CSS max()；两端同时兼容 Less 3.13.1 与 4.6.7。
