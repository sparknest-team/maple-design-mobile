# @maple-design/ui-vue

## 1.4.11

### Patch Changes

- [#65](https://github.com/sparknest-team/maple-design-mobile/pull/65) [`2008313`](https://github.com/sparknest-team/maple-design-mobile/commit/2008313ab7bd77365bfd487f2d5f91e7d01a5295) Thanks [@sparknest-team](https://github.com/sparknest-team)! - 发布包不再包含与逐组件产物重复、且无消费方引用的 `es/maple.esm.js` 与 `lib/maple.cjs.js`：构建改用 `@sparknest/ui-build-vue@1.5.0` 的 `bundleFormats` 开关（只保留 `umd`），`umd/maple.js` 与 `es/maple.css` 不受影响。发布包从 22831.6 KiB / 3943 文件降到 19354.8 KiB / 3941 文件，回到 `package:check` 的 20MB 门禁以内。

  同时移除 `pnpm-workspace.yaml` 里针对 `@sparknest/ui-build-vue` 的本地 tarball override —— 该包 1.5.0 已发布到 npm，改用正式版。

- Updated dependencies []:
  - @maple-design/icons-vue@1.4.11
  - @maple-design/shared-vue@1.4.11
  - @maple-design/use-vue@1.4.11

## 1.4.10

### Patch Changes

- [#63](https://github.com/sparknest-team/maple-design-mobile/pull/63) [`d8724ee`](https://github.com/sparknest-team/maple-design-mobile/commit/d8724ee77233f52a5a3a6f7b7a729b6db96c592f) Thanks [@sparknest-team](https://github.com/sparknest-team)! - 修复 jsdom 31 升级后失效的单元测试：移除往只读 `getComputedStyle()` 结果写 `transform` 的 `mockTranslate`（jsdom 31 按规范改为只读）、对齐 CSS 序列化断言、补齐用例间 DOM 隔离与焦点还原的宏任务同步，并把 VuePress 迁移后失效的路由测试改测真实的 `legacyRoute` 兼容实现。
- Updated dependencies []:
  - @maple-design/icons-vue@1.4.10
  - @maple-design/shared-vue@1.4.10
  - @maple-design/use-vue@1.4.10

## 1.4.9

### Patch Changes

- [#61](https://github.com/sparknest-team/maple-design-mobile/pull/61) [`eb8a82b`](https://github.com/sparknest-team/maple-design-mobile/commit/eb8a82b0894b6f107c9d4a52a361c99d56b679fb) Thanks [@sparknest-team](https://github.com/sparknest-team)! - 文档站迁移到 VuePress 并统一组件库打包流程：

  - 文档站由 maple-cli 自有 SPA 改为 VuePress 构建（`packages/ui/site`），与 Cedar 使用同一套共享构建工具（`@sparknest/vuepress-plugins-vue`）。
  - 移除 CLI 内的 SPA 站点与其 50 万行生成产物，CLI 只保留编译与文档构建职责。
  - 组件运行时、交互测试与文档示例同步更新；`vite-plugins` 的 markdown 处理对齐共享实现。

  发布包内容因此发生变化，十个公开包统一 patch 升级。

- Updated dependencies [[`eb8a82b`](https://github.com/sparknest-team/maple-design-mobile/commit/eb8a82b0894b6f107c9d4a52a361c99d56b679fb)]:
  - @maple-design/icons-vue@1.4.9
  - @maple-design/shared-vue@1.4.9
  - @maple-design/use-vue@1.4.9

## 1.4.8

### Patch Changes

- [#58](https://github.com/sparknest-team/maple-design-mobile/pull/58) [`27dfb59`](https://github.com/sparknest-team/maple-design-mobile/commit/27dfb5904229763ebae25f84a35b6c0166ba2688) Thanks [@sparknest-team](https://github.com/sparknest-team)! - Section 标题默认使用 h4，调整正文间距、状态底色和整段色条圆角。Card 的长标题示例支持点按查看全文。缩小 Tag 各档高度与默认字号。

- Updated dependencies []:
  - @maple-design/icons-vue@1.4.8
  - @maple-design/shared-vue@1.4.8
  - @maple-design/use-vue@1.4.8

## 1.4.7

### Patch Changes

- [#46](https://github.com/sparknest-team/maple-design-mobile/pull/46) [`d67dcf3`](https://github.com/sparknest-team/maple-design-mobile/commit/d67dcf3ee425e0971f5ae30958637a14d83884bb) Thanks [@sparknest-team](https://github.com/sparknest-team)! - section: `show-marker` 改为显式默认 `false`，去掉按表单上下文推断

  `Section` 原来在未传 `show-marker` 时，会根据祖先是否存在 `Form` 自行决定是否显示标题色条
  （`props.showMarker ?? !!form`），使同一份调用代码在表单内外视觉不同。现改为
  `default: false`，需要色条时显式传入。`form` 上下文仍用于 `--form` 类名与 inline 布局。

- Updated dependencies []:
  - @maple-design/icons-vue@1.4.7
  - @maple-design/shared-vue@1.4.7
  - @maple-design/use-vue@1.4.7

## 1.4.6

### Patch Changes

- [#43](https://github.com/sparknest-team/maple-design-mobile/pull/43) [`f497e87`](https://github.com/sparknest-team/maple-design-mobile/commit/f497e87368cd8d58ead9b31a88f291ef635b5304) Thanks [@sparknest-team](https://github.com/sparknest-team)! - Section 标题默认使用 h4，调整正文间距、状态底色和整段色条圆角。Card 的长标题示例支持点按查看全文。缩小 Tag 各档高度与默认字号。

- Updated dependencies []:
  - @maple-design/icons-vue@1.4.6
  - @maple-design/shared-vue@1.4.6
  - @maple-design/use-vue@1.4.6

## 1.4.5

### Patch Changes

- [#41](https://github.com/sparknest-team/maple-design-mobile/pull/41) [`603eb83`](https://github.com/sparknest-team/maple-design-mobile/commit/603eb83c5401663fc9bb3f9594238c1c7b1a520f) Thanks [@sparknest-team](https://github.com/sparknest-team)! - card: 补 `sizes-and-headings` demo 的中英文 locale 文案

  `sizes-and-headings` demo 新增后未在 `card/example/messages.json` 的 `zh-CN` /
  `en-US` 下登记站点标签，导致 `same-source-demos` 门禁报
  `card/sizes-and-headings: missing locale`。文案取文档章节标题原文。

- Updated dependencies []:
  - @maple-design/icons-vue@1.4.5
  - @maple-design/shared-vue@1.4.5
  - @maple-design/use-vue@1.4.5

## 1.4.4

### Patch Changes

- [#28](https://github.com/sparknest-team/maple-design-mobile/pull/28) [`878b700`](https://github.com/sparknest-team/maple-design-mobile/commit/878b70027014ea22d5c501ad76ac178eac3cdc79) Thanks [@sparknest-team](https://github.com/sparknest-team)! - 重新生成 `people-select` 示例页：按 design-ui 的分组清单把 `popup-search` 纳入「异步数据」分组，使示例页章节与文档分组一致。

- [#29](https://github.com/sparknest-team/maple-design-mobile/pull/29) [`68fddba`](https://github.com/sparknest-team/maple-design-mobile/commit/68fddba77743c86a2011035ac5e34dafceab9077) Thanks [@sparknest-team](https://github.com/sparknest-team)! - select 的 option 补充 `:hover` 状态，与 cedar select 及本仓 auto-complete 的双选择器写法对齐（此前仅支持 JS 驱动的 `-active`）。

- Updated dependencies []:
  - @maple-design/icons-vue@1.4.4
  - @maple-design/shared-vue@1.4.4
  - @maple-design/use-vue@1.4.4

## 1.4.3

### Patch Changes

- [#24](https://github.com/sparknest-team/maple-design-mobile/pull/24) [`485c828`](https://github.com/sparknest-team/maple-design-mobile/commit/485c8288ebbc132f07aa2c47e51a9a5c1b71fa88) Thanks [@sparknest-team](https://github.com/sparknest-team)! - 修复 Popup 和 Dialog 的背景锁滚误拦截内部 Trigger 浮层的触摸滚动。下拉选项可从文字处起手滚动，到达列表边界时背景仍保持锁定。

- Updated dependencies []:
  - @maple-design/icons-vue@1.4.3
  - @maple-design/shared-vue@1.4.3
  - @maple-design/use-vue@1.4.3

## 1.4.2

### Patch Changes

- [#20](https://github.com/sparknest-team/maple-design-mobile/pull/20) [`40be872`](https://github.com/sparknest-team/maple-design-mobile/commit/40be872519d8f679e748a4c492d73aa9e9af03ae) Thanks [@sparknest-team](https://github.com/sparknest-team)! - 修复搜索下拉框在软键盘展开时覆盖输入框的问题，保留面板高度和原有的上下翻转行为。修复 iOS Safari 上首次轻点选项可能无法选中的问题，滑动列表仍可正常滚动。

- Updated dependencies []:
  - @maple-design/icons-vue@1.4.2
  - @maple-design/shared-vue@1.4.2
  - @maple-design/use-vue@1.4.2

## 1.4.1

### Patch Changes

- chore(release): 全仓版本号统一（fixed 组），未变更包同步升版

- Updated dependencies []:
  - @maple-design/icons-vue@1.4.1
  - @maple-design/shared-vue@1.4.1
  - @maple-design/use-vue@1.4.1

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

- [#18](https://github.com/sparknest-team/maple-design-mobile/pull/18) [`26a6c2e`](https://github.com/sparknest-team/maple-design-mobile/commit/26a6c2e104a6684242dba3130e4b00373dca27fe) Thanks [@sparknest-team](https://github.com/sparknest-team)! - 修复 Checkbox 键盘焦点环的跨仓契约回归。

  `feat(ui): refine card, section and table presentation` 把焦点环从 `inset` `box-shadow` 改成只改
  `border-color`，但 `design-ui` 的 `check:choice-themes` / `choice-focus-style-check` 仍按
  Radio 与 Cedar 的环形契约断言（`inset 0 0 0 <focus-width> <content-primary>`），于是
  `pnpm quality` 在审计阶段直接失败。

  现在三处统一：保留 `border-color` 作为额外视觉提示，同时恢复 `inset` 焦点环；
  `forced-colors: active` 下继续用系统色 `Highlight` 描边（不消耗设计 token）。

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

- Updated dependencies [[`7b85843`](https://github.com/sparknest-team/maple-design-mobile/commit/7b858430cc74795bc6c276381f74f44a69bef26a)]:
  - @maple-design/icons-vue@1.3.1

## 1.3.1

### Patch Changes

- [#10](https://github.com/sparknest-team/maple-design-mobile/pull/10) [`1ebd8d7`](https://github.com/sparknest-team/maple-design-mobile/commit/1ebd8d7fcf3bd5c5b1217aaf8ae6c1a49df56da1) Thanks [@sparknest-team](https://github.com/sparknest-team)! - 修复构建工具无法解析 NavMenu 内部模块名导致的打包错误。业务项目无需额外配置 alias，NavMenu 继续支持服务端渲染。

## 1.3.0

### Minor Changes

- [#7](https://github.com/loca-spirit/maple-design-mobile/pull/7) [`9133140`](https://github.com/loca-spirit/maple-design-mobile/commit/9133140e0ff5bb6bdb2a5547e1ede70dc6ddc8d0) Thanks [@loca-spirit](https://github.com/loca-spirit)! - Add the standalone Section layout component with form-aware defaults, automatic imports, and bilingual documentation examples. Replace MpFormSection and Form.Section with MpSection, and rename the section theme variables from --mp-form-section-* to --mp-section-*.

### Patch Changes

- [#7](https://github.com/loca-spirit/maple-design-mobile/pull/7) [`9133140`](https://github.com/loca-spirit/maple-design-mobile/commit/9133140e0ff5bb6bdb2a5547e1ede70dc6ddc8d0) Thanks [@loca-spirit](https://github.com/loca-spirit)! - Fix native form label targeting and nested field feedback, Cascader keyboard and search ownership, popup reference motion tracking, and inherited reading direction. Align Checkbox and Radio theme tokens and refresh their documentation.

- Updated dependencies [[`9133140`](https://github.com/loca-spirit/maple-design-mobile/commit/9133140e0ff5bb6bdb2a5547e1ede70dc6ddc8d0)]:
  - @maple-design/use-vue@1.2.2

## 1.2.0

### Minor Changes

- [#5](https://github.com/sparknest-team/maple-design-mobile/pull/5) [`92e7613`](https://github.com/sparknest-team/maple-design-mobile/commit/92e761339607ceb1cd2365c605d6d9383cf11012) Thanks [@sparknest-team](https://github.com/sparknest-team)! - Release the public packages together at 1.2.0 so applications can install matching versions.

- [#5](https://github.com/sparknest-team/maple-design-mobile/pull/5) [`92e7613`](https://github.com/sparknest-team/maple-design-mobile/commit/92e761339607ceb1cd2365c605d6d9383cf11012) Thanks [@sparknest-team](https://github.com/sparknest-team)! - Develop with Vue 3.5.45 while supporting consumers on Vue 3.2.47 and later Vue 3 releases. Preserve compatible component IDs and public declarations, and gate releases on packed runtime and type compatibility checks.

  The minimum supported Vue version is 3.2.47. Consumers on Vue 3.2.0–3.2.46 must update Vue before installing this 1.x release.

### Patch Changes

- [#5](https://github.com/sparknest-team/maple-design-mobile/pull/5) [`92e7613`](https://github.com/sparknest-team/maple-design-mobile/commit/92e761339607ceb1cd2365c605d6d9383cf11012) Thanks [@sparknest-team](https://github.com/sparknest-team)! - Fix native form label targeting and nested field feedback, Cascader keyboard and search ownership, popup reference motion tracking, and inherited reading direction. Align Checkbox and Radio theme tokens and refresh their documentation.

- [#5](https://github.com/sparknest-team/maple-design-mobile/pull/5) [`92e7613`](https://github.com/sparknest-team/maple-design-mobile/commit/92e761339607ceb1cd2365c605d6d9383cf11012) Thanks [@sparknest-team](https://github.com/sparknest-team)! - Fix BackTop's unresolved stacking token and make Image footer descriptions follow the semantic theme color. Add component stylesheet and built-in theme variable dependency regression coverage.

- [#5](https://github.com/sparknest-team/maple-design-mobile/pull/5) [`92e7613`](https://github.com/sparknest-team/maple-design-mobile/commit/92e761339607ceb1cd2365c605d6d9383cf11012) Thanks [@sparknest-team](https://github.com/sparknest-team)! - Preserve component installers when applications tree-shake the aggregate library entry.

- [#5](https://github.com/sparknest-team/maple-design-mobile/pull/5) [`92e7613`](https://github.com/sparknest-team/maple-design-mobile/commit/92e761339607ceb1cd2365c605d6d9383cf11012) Thanks [@sparknest-team](https://github.com/sparknest-team)! - Close an open menu branch when another menu is opened from the keyboard.

- [#5](https://github.com/sparknest-team/maple-design-mobile/pull/5) [`92e7613`](https://github.com/sparknest-team/maple-design-mobile/commit/92e761339607ceb1cd2365c605d6d9383cf11012) Thanks [@sparknest-team](https://github.com/sparknest-team)! - Preserve inherited safe-area insets inside locally themed popup containers.

- [#5](https://github.com/sparknest-team/maple-design-mobile/pull/5) [`92e7613`](https://github.com/sparknest-team/maple-design-mobile/commit/92e761339607ceb1cd2365c605d6d9383cf11012) Thanks [@sparknest-team](https://github.com/sparknest-team)! - Keep standard Textarea fields within the available width on mobile.

- [#5](https://github.com/sparknest-team/maple-design-mobile/pull/5) [`92e7613`](https://github.com/sparknest-team/maple-design-mobile/commit/92e761339607ceb1cd2365c605d6d9383cf11012) Thanks [@sparknest-team](https://github.com/sparknest-team)! - Fix unresolved Timeline style tokens so dots, connecting lines, typography and spacing render correctly.

- [#5](https://github.com/sparknest-team/maple-design-mobile/pull/5) [`92e7613`](https://github.com/sparknest-team/maple-design-mobile/commit/92e761339607ceb1cd2365c605d6d9383cf11012) Thanks [@sparknest-team](https://github.com/sparknest-team)! - Preserve source-generated declarations instead of overwriting them with legacy sibling declaration stubs, fixing missing theme types in published packages.

- [#5](https://github.com/sparknest-team/maple-design-mobile/pull/5) [`92e7613`](https://github.com/sparknest-team/maple-design-mobile/commit/92e761339607ceb1cd2365c605d6d9383cf11012) Thanks [@sparknest-team](https://github.com/sparknest-team)! - Fix keyboard listener types in Trigger while preserving Escape handling and listener cleanup across document windows.

- Updated dependencies [[`92e7613`](https://github.com/sparknest-team/maple-design-mobile/commit/92e761339607ceb1cd2365c605d6d9383cf11012), [`92e7613`](https://github.com/sparknest-team/maple-design-mobile/commit/92e761339607ceb1cd2365c605d6d9383cf11012), [`92e7613`](https://github.com/sparknest-team/maple-design-mobile/commit/92e761339607ceb1cd2365c605d6d9383cf11012)]:
  - @maple-design/use-vue@1.2.0
  - @maple-design/icons-vue@1.2.0
  - @maple-design/shared-vue@1.2.0
