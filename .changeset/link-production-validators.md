---
"@maple-design/ui": patch
"@maple-design/cli": patch
---

Link 保留尺寸功能及开发校验，生产包不携带 Vue 不执行的自定义校验函数；发布编译入口改用 production，而非自定义 compile 环境。
