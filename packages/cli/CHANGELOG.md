# @maple-design/cli-vue

## 1.4.7

### Patch Changes

- Updated dependencies []:
  - @maple-design/resolver-vue@1.4.7
  - @maple-design/shared-vue@1.4.7
  - @maple-design/vite-plugins-vue@1.4.7

## 1.4.6

### Patch Changes

- Updated dependencies []:
  - @maple-design/resolver-vue@1.4.6
  - @maple-design/shared-vue@1.4.6
  - @maple-design/vite-plugins-vue@1.4.6

## 1.4.5

### Patch Changes

- Updated dependencies []:
  - @maple-design/resolver-vue@1.4.5
  - @maple-design/shared-vue@1.4.5
  - @maple-design/vite-plugins-vue@1.4.5

## 1.4.4

### Patch Changes

- Updated dependencies []:
  - @maple-design/resolver-vue@1.4.4
  - @maple-design/shared-vue@1.4.4
  - @maple-design/vite-plugins-vue@1.4.4

## 1.4.3

### Patch Changes

- Updated dependencies []:
  - @maple-design/resolver-vue@1.4.3
  - @maple-design/shared-vue@1.4.3
  - @maple-design/vite-plugins-vue@1.4.3

## 1.4.2

### Patch Changes

- Updated dependencies []:
  - @maple-design/resolver-vue@1.4.2
  - @maple-design/shared-vue@1.4.2
  - @maple-design/vite-plugins-vue@1.4.2

## 1.4.1

### Patch Changes

- Updated dependencies []:
  - @maple-design/resolver-vue@1.4.1
  - @maple-design/shared-vue@1.4.1
  - @maple-design/vite-plugins-vue@1.4.1

## 1.4.0

### Minor Changes

- [#13](https://github.com/sparknest-team/maple-design-mobile/pull/13) [`f1e7d3a`](https://github.com/sparknest-team/maple-design-mobile/commit/f1e7d3afc3f9350f405ff3800b7d10ac7a3a4450) Thanks [@sparknest-team](https://github.com/sparknest-team)! - 构建工具链统一到 Node 26 / pnpm 10，与 Cedar、design-ui 保持同一套运行时：

  - `engines.node` 下限 20 → `>=26.13.1`，`.nvmrc` / `.node-version` / `.npmrc use-node-version` / Volta 全部固定 26.13.1
  - pnpm `9.6.0` → `10.23.0`：`pnpm.overrides` 从 `package.json` 迁到 `pnpm-workspace.yaml`（pnpm 10 不再读 package.json 的 `pnpm` 字段，留着会让 `@sparknest/*` 的 `link:` 覆盖静默失效），CI 的 `pnpm/action-setup` 同步到 10.23.0
  - `pnpm-lock.yaml` 按 pnpm 10 重新归一化：`patchedDependencies` 哈希改为 sha256，peer 后缀改为 pnpm 10 的写法；解析结果与版本号不变

  同时删除 Table 里 19 个从未被任何样式或脚本消费的桌面筛选弹层 token
  （`--mp-table-filters-popup-*` / `-list-*` / `-item-*` / `-text-*` / `-bottom-*`）：
  移动端首版不提供桌面筛选弹层，这些声明连同文档的 CSS 变量表一起移除，避免对外承诺一个不存在的定制入口。
  `--mp-table-empty-image-size` 是真实消费的，保留并补登记到 token 审计白名单。

### Patch Changes

- [#12](https://github.com/sparknest-team/maple-design-mobile/pull/12) [`7b85843`](https://github.com/sparknest-team/maple-design-mobile/commit/7b858430cc74795bc6c276381f74f44a69bef26a) Thanks [@sparknest-team](https://github.com/sparknest-team)! - 构建链工具升到 vite 8（rolldown），与下游业务项目保持一致：

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

  ***

  同时修正 `src/themes/dark/table.ts` 里 Table 重构（2026-11-20）遗留的旧 token 名：
  `thead-th-*` / `tbody-td-*` / `tr-hover-background` 等在源码已无定义，声明从未生效，
  并让 design-ui 的 theme-contract 门禁报 `undefined theme override`。

  ***

  同时把三处 demo 断言对齐到「demo 文案单语化 + `example/demos/en-US/` 英文副本」的既有约定
  （此前这些用例仍在用 `Locale.use('en-US')` 切换运行时语言，而对应 demo 已改为固定中文文案）：

  - `carousel/__tests__/autoplay-demo.spec.js` 改为对中英两份 demo 分别断言状态文案
  - `time-range/__tests__/overnight-demo.spec.js` 改为对中英两份 demo 分别断言重置按钮
  - `split-button/__tests__/demo-language.spec.js` 的 appearance lab 改用 `demos/en-US/appearance-lab.vue`
    断言英文文案，中英两份都覆盖

- Updated dependencies []:
  - @maple-design/resolver-vue@1.3.1

## 1.2.2

### Patch Changes

- Updated dependencies [[`9133140`](https://github.com/loca-spirit/maple-design-mobile/commit/9133140e0ff5bb6bdb2a5547e1ede70dc6ddc8d0)]:
  - @maple-design/resolver-vue@1.3.0

## 1.2.0

### Minor Changes

- [#5](https://github.com/sparknest-team/maple-design-mobile/pull/5) [`92e7613`](https://github.com/sparknest-team/maple-design-mobile/commit/92e761339607ceb1cd2365c605d6d9383cf11012) Thanks [@sparknest-team](https://github.com/sparknest-team)! - Release the public packages together at 1.2.0 so applications can install matching versions.

### Patch Changes

- [#5](https://github.com/sparknest-team/maple-design-mobile/pull/5) [`92e7613`](https://github.com/sparknest-team/maple-design-mobile/commit/92e761339607ceb1cd2365c605d6d9383cf11012) Thanks [@sparknest-team](https://github.com/sparknest-team)! - Preserve source-generated declarations instead of overwriting them with legacy sibling declaration stubs, fixing missing theme types in published packages.

- [#5](https://github.com/sparknest-team/maple-design-mobile/pull/5) [`92e7613`](https://github.com/sparknest-team/maple-design-mobile/commit/92e761339607ceb1cd2365c605d6d9383cf11012) Thanks [@sparknest-team](https://github.com/sparknest-team)! - Develop with Vue 3.5.45 while supporting consumers on Vue 3.2.47 and later Vue 3 releases. Preserve compatible component IDs and public declarations, and gate releases on packed runtime and type compatibility checks.

  The minimum supported Vue version is 3.2.47. Consumers on Vue 3.2.0–3.2.46 must update Vue before installing this 1.x release.

- Updated dependencies [[`92e7613`](https://github.com/sparknest-team/maple-design-mobile/commit/92e761339607ceb1cd2365c605d6d9383cf11012)]:
  - @maple-design/resolver-vue@1.2.0
  - @maple-design/shared-vue@1.2.0
  - @maple-design/vite-plugins-vue@1.2.0
