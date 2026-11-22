---
'@maple-design/cli-vue': patch
---

构建链工具升到 vite 8（rolldown），与下游业务项目保持一致：

- catalog `vite` 6.1.1 → 8.3.8，`@vitejs/plugin-vue` 6.0.11，`@vitejs/plugin-vue-jsx` 5.1.6
- `@types/node` ^22.12.0（vite 8 的 peer 要求 ≥22.12）
- `less` ^3.13.1 → ^4.4.0，与 cedar 对齐

文档站构建实测 1610 demo SFC 0 failures、4761 modules、9.6s（改造前约 19s）。
