---
"@maple-design/ui": minor
"@maple-design/cli": patch
---

日期族的值、严格校验、范围、字段与面板提交逻辑独立同源复制。统一 Date/string/number、format/valueFormat、Date 禁用回调、默认秒精度、type 和 confirm/open-change/clear 事件；差异展示保留本地文件。更新 Demo、文档和门禁，不保留旧 API 别名。

Maple CLI 测试清理在 Node SSR 环境跳过 DOM，支持无 window/document 的组件渲染测试。
