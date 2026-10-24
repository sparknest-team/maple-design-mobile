---
"@maple-design/cli": patch
---

将命令入口移动到随源码发布的稳定 bootstrap，确保 pnpm 首次安装时即能创建 bin 链接，之后构建 lib 便可执行命令，不依赖工作区残留产物。
