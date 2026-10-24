---
"@maple-design/ui": patch
---

移除 Popup 运行时主体的样式副作用导入。样式仍由既有 popup/style 及调用方 style 入口静态引入，避免 Search/Popup 在 Node SSR 裸导入时加载 CSS。
