---
'@maple-design/cli': patch
---

文档开发直接使用源码入口，不再在启动或配置/调研重启时清空 es 并写入旧占位模块，保留 npm 发布产物与 Playground 构建资源。
