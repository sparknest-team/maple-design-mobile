---
"@maplejs/maple-shared": minor
"@maplejs/maple-ui": patch
---

将仓库实际使用的工具和类型迁入 maple-shared 的静态模块，移除未使用的整包转发导出、rattail 依赖及 pnpm 补丁。保留现有组件使用的工具语义，按需入口不再携带无关工具、存储初始化和 mitt。
