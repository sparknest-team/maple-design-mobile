---
'@maple-design/cli-vue': patch
'@maple-design/ui-vue': patch
'@maple-design/icons-vue': patch
---

构建链工具升到 vite 8（rolldown），与下游业务项目保持一致：

- catalog `vite` 6.1.1 → 8.3.8，`@vitejs/plugin-vue` 6.0.11，`@vitejs/plugin-vue-jsx` 5.1.6
- `vitest` 3.0.6 → 5.1.1，`@vitest/coverage-istanbul` 同步：vitest 3 自带独占的 vite 6，会在同一个 TS
  程序里和 vite 8 的 `Plugin` 类型冲突（`TS2769 No overload matches this call`），必须随工具链一起升
- `typescript` 5.3.3 → 5.9.3：`@vitejs/plugin-vue@6` 的 `.d.mts` 用了 TS 5.3 解析不了的语法
- `@types/node` ^22.12.0（vite 8 的 peer 要求 ≥22.12）
- `less` ^3.13.1 → ^4.4.0，与 cedar 对齐

随之调整的源码/配置：

- `packages/cli`、`packages/vite-plugins` 的 `moduleResolution` 改为 `bundler`：vite 8 的 package.json 没有顶层
  `types`，`exports["."]` 只指向 `.js`，`node` 解析不到声明
- `packages/ui` 的 `types` 补 `node`：vitest 5 的 `globals.d.ts` 不再 reference node 类型，
  `process` / `global` 会报 `TS2591`，导致 `vue-tsc -p tsconfig.declaration.json` 整个类型产物编译失败
- `vitest.config.ts` 去掉 vitest 5 已删除的 `poolOptions` / `sharedVueDomRealm` 相关写法，
  `--isolate=false` 改由 `maxWorkers: 1` 表达

文档站构建实测 1610 demo SFC 0 failures、5138 modules。

---

同时修正 `src/themes/dark/table.ts` 里 Table 重构（2026-11-20）遗留的旧 token 名：
`thead-th-*` / `tbody-td-*` / `tr-hover-background` 等在源码已无定义，声明从未生效，
并让 design-ui 的 theme-contract 门禁报 `undefined theme override`。

---

同时把三处 demo 断言对齐到「demo 文案单语化 + `example/demos/en-US/` 英文副本」的既有约定
（此前这些用例仍在用 `Locale.use('en-US')` 切换运行时语言，而对应 demo 已改为固定中文文案）：

- `carousel/__tests__/autoplay-demo.spec.js` 改为对中英两份 demo 分别断言状态文案
- `time-range/__tests__/overnight-demo.spec.js` 改为对中英两份 demo 分别断言重置按钮
- `split-button/__tests__/demo-language.spec.js` 的 appearance lab 改用 `demos/en-US/appearance-lab.vue`
  断言英文文案，中英两份都覆盖
