---
'@maple-design/ui-vue': patch
'@maple-design/cli-vue': patch
'@maple-design/icons-vue': patch
'@maple-design/shared-vue': patch
'@maple-design/use-vue': patch
'@maple-design/vite-plugins-vue': patch
'@maple-design/preset-tailwindcss-vue': patch
'@maple-design/preset-unocss-vue': patch
'@maple-design/resolver-vue': patch
'@maple-design/touch-emulator-vue': patch
---

文档站迁移到 VuePress 并统一组件库打包流程：

- 文档站由 maple-cli 自有 SPA 改为 VuePress 构建（`packages/ui/site`），与 Cedar 使用同一套共享构建工具（`@sparknest/vuepress-plugins-vue`）。
- 移除 CLI 内的 SPA 站点与其 50 万行生成产物，CLI 只保留编译与文档构建职责。
- 组件运行时、交互测试与文档示例同步更新；`vite-plugins` 的 markdown 处理对齐共享实现。

发布包内容因此发生变化，十个公开包统一 patch 升级。
