---
'@maple-design/ui-vue': patch
---

修复构建工具无法解析 NavMenu 内部模块名导致的打包错误。业务项目无需额外配置 alias，NavMenu 继续支持服务端渲染。
