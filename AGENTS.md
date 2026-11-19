# AGENTS.md — Maple Design Mobile

> 此文件是 AI 编码代理（GitHub Copilot / Claude / Cursor 等）在本仓库工作的统一入口。
> 仓库定位：基于 Vue 3 + TypeScript + Less 的移动端组件库（pnpm monorepo），注册前缀 `Mp`，CSS 前缀 `mp-`。


**前置依赖**：读取并执行全局 `/Users/jiaming.wu/AGENTS.md` 的要求。

## 必读文档（按优先级）

1. **[docs/practices/component-spec.md](docs/practices/component-spec.md)** —— 组件开发规范（移动端版），所有 `packages/ui/src/<component>/` 下的修改必须先读。
2. **[.github/copilot-instructions.md](.github/copilot-instructions.md)** —— GitHub Copilot Chat 自动加载的精简规范。
3. **[docs/practices/ai-collaboration.md](docs/practices/ai-collaboration.md)** —— AI 协作 / 入口文件机制说明（什么时候该更新哪个文件）。
4. **[CHECKLIST.md](CHECKLIST.md)** —— 组件清单。

## 项目结构速览

```
packages/
  ui/                  # 主组件库
    src/
      <component>/
        <Component>.vue      # 主组件，PascalCase 文件名
        <Component>.tsx      # 或 .tsx
        index.ts             # 入口聚合
        props.ts             # props + 类型
        style/               # index.less + index.ts（按需 / 全量样式入口）
        __tests__/           # 单测（*.spec.js）
        docs/zh-CN.md        # 文档
        example/index.vue    # 示例
      themes/                # 主题色板
      utils/                 # createNamespace / 工具
      style/                 # 全局 foundation（tokens / common / elevation）
  cli/                 # CLI / build / vitest 配置
  icons/           # 独立 SVG Vue 图标包（不使用 iconfont）
  shared/              # createNamespaceFn 等基础工具
  use/                 # composables
  resolver/            # 组件、图标、指令与样式 resolver
  vite-plugins/        # vite 插件
  vscode-extension/    # vscode 扩展
  ui-playground/       # playground
```

## 关键约束（高频踩坑）

- 组件注册名统一用 `createNamespace('<kebab>').name`（产物 `MpXxx`），不要写死，更不要裸 `'Xxx'`。
- BEM 修饰符必须显式带 `--`：`n('--block')` → `mp-space--block`。
- 全局工具类用 `n('$--box')` → `mp--box`（`$` 替换为前缀）。
- `classes([cond, truthy, falsy])` **不会自动 unwrap Vue Ref**，写 `block.value` 不要写 `block`。
- **所有 CSS 自定义属性必须以 `--mp-` 开头**（`--mp-button-padding`、`--mp-space-size-md-row-gap`），声明在 `:root` 或主题文件。
- **不要把 BEM 修饰符 `--xxx` 当成 token 加 `mp-` 前缀**（`&--ghost` ✅ vs `&--mp-ghost` ❌）。
- 模板字符串里也是同理：`n(\`${direction}--error\`)` ✅，不要写成 `--mp-error`。
- icon 字体激活类是固定字面量 `${namespace}--set`，不要改。
- `index.ts` 必须导出：`default`、`CompInstance`、`CompProps`、`compProps`、`_CompComponent`。
- 公共枚举统一复用 `utils/constants.ts` 的 `ComponentSize` / `SemanticStatus` / `Orientation`，禁止组件自行复制。

## 开发命令

| 用途 | 命令 |
| --- | --- |
| 安装依赖 | `pnpm i` |
| 构建 npm 包（根目录含依赖包） | `pnpm build:lib` |
| 构建文档 | `pnpm build:doc` |
| 仅检查示例脚本和模板语法 | `pnpm docs:check` |
| 构建 npm 包及文档 | `pnpm build` |
| 完整本地 CI | `pnpm quality`；先按同级目录安装 Cedar、Maple、design-ui，使用 pnpm 9.6.0；CI 与本地共用该入口，不单独维护步骤子集 |
| 全组件按需 JS 依赖与共享包构建回归 | `pnpm check:component-bundle` |
| Icon 按需 JS 依赖与体积回归 | `pnpm check:icon-bundle` |
| 静态检查（不自动修改） | `pnpm lint:check` |
| 全库运行时依赖与 HMR 兜底门禁 | `pnpm check:runtime-dependencies`（公共契约见 `design-ui/standards/component-anatomy.md`） |
| shared 发布运行时、类型和体积回归 | `pnpm check:shared`（公共契约见 `design-ui/standards/shared-foundation.md`） |
| 开发流程不覆盖发布产物的回归 | `pnpm check:dev-boundary` |
| 跑指定包单测 | `pnpm --dir packages/ui exec vitest run --config ../cli/lib/node/config/vitest.config.js` |
| 跑指定组件 | `... vitest run src/<component>` |
| CLI 文档站与编译器回归 | `pnpm check:cli` |
| 手机宽度文档与示例主题回归（先构建文档，首次运行需 `pnpm exec playwright install chromium`） | `pnpm check:docs-theme` |
| 全组件生产文档与手机示例回归 | 构建后运行 `pnpm check:docs-components`；显式覆盖清单见 `design-ui/browser/contracts.mjs`，新增组件必须补行为契约；输出 `artifacts/docs-components/maple/coverage.json` |
| 测试收集边界回归 | `pnpm check:test-collection` |
| 同源检查格式归一化回归 | `pnpm check:source-normalization` |
| 更新快照 | 上述命令加 `-u` |

## 与 PC 版（Cedar Design Web）的关系

构建环境、发布产物消费行为与 CI 工具链遵守 `design-ui/standards/build-and-ci.md`；不能用自定义 NODE_ENV 编译发布包，也不能把入口版本当成子进程版本的证明。

公共 API（如 `Space` 的 `size` 枚举、`Button` 的 `variant` 等）应**两端同步**，以 PC 实现为准。
PC 端见 `/Users/shuaimeng/github/cedar-design-web/AGENTS.md`。

正式发布前处于 API 收敛期：组件改造确定最终 API 后，应同步迁移两端源码、调用方、Demo、文档、类型和测试并直接删除旧 API；不要保留 deprecated alias、双写或运行时兼容分支。正式发布后再恢复 SemVer 弃用周期，具体以 `design-ui/standards/release-and-compatibility.md` 为准。

具体对应关系（前缀、工具函数等）见 [docs/practices/component-spec.md §13](docs/practices/component-spec.md)。

## 历史教训（不要重蹈）

- 所有组件示例（含手机入口、子示例和生成的 SFC）统一使用只读的 [demoEnglish](packages/cli/demo-language.js)。模板直接读取，脚本读取 `.value`。禁止用 `watchLang`、路由或 DOM 推断语言，禁止先复制到 ref 再用 computed 判断，也禁止通过 english prop 逐级传递。修改后运行 `pnpm docs:check`。

### 批量重命名 CSS token

- 一次性大批量给 CSS token 加 `--mp-` 前缀时，**正则必须排除**：
  - 已经带 `mp-` 前缀的（避免 `--mp-mp-`）
  - BEM 修饰符 `&--xxx`、`.mp-xxx--yyy` 选择器
  - 模板字符串里的 BEM 片段（`` `${ns}--xxx` ``、`` `${ns}--lock` ``）
  - 固定字面量的功能类；图标由 `@maple-design/icons-vue` 的 SVG 组件渲染，不使用字体类
- 安全做法：仅匹配 `:root { ... }` 块内、或 `var(--xxx)` 内、或 inline `style="--xxx: ..."` 内的自定义属性。
- 踩过的坑（git log 可查）：icon `--mp-set`、slider `--mp-error`、pull-refresh `--mp-lock`、common.less `&--mp-box`。

### 组件内部

- **Provider 字段忘 `.value`** 会渲染 `[object Object]`（参考 `breadcrumb-item separator` bug）。
- **父子通信不要用 `toRefs(props)`** ，类型对不上 `ComputedRef`；用 `computed(() => props.x)`。
- **`classes` 不 unwrap Vue Ref**：条件位要写 `block.value`。
- **裸 PascalCase 名与 HTML tag 同名** 会触发 Vue 自递归 → `RangeError: Invalid string length`。

### 测试

- 测试文件显式从 `vitest` 导入 `describe` / `it` / `test` / `expect` / `vi` / 生命周期函数；Vitest 的 `globals: true` 不代表 ESLint 识别这些全局变量。
- 本地 commit 仅执行 `.githooks` 的轻量暂存内容与提交信息检查。完整 lint、类型、测试、构建及浏览器校验由 PR Quality 执行；针对性开发验证按改动运行，报告实际结果。提交推送任务不重复运行完整 quality，不绕过钩子；合并使用 `pnpm pr:merge <PR编号>`。详见 `PR_WORKFLOW.md`。
- 预存在失败：`result/imageSize`、`form/zod`（与本人改动无关）。
- vitest 必须显式指定 `--config` 指向 `cli/lib/node/config/vitest.config.js`，否则没有默认配置。
- `--isolate=false` 的 Vue/jsdom 生命周期与批次要求见 `docs/practices/component-spec.md` §10；不要通过放宽 DOM 类型判断修复跨 realm 查询失败。
- 组件单测只收集 `src/`，生成目录 `.maple/` 中的文档站副本不能进入组件测试。CLI 源码的站点与编译器测试通过 `pnpm check:cli` 独立执行。

更多细节见 [docs/practices/component-spec.md](docs/practices/component-spec.md)。

### 浅色品牌主色的文字使用

- `--mp-color-primary` / `--mp-sys-color-action-primary` 是填充色，Firefly 黄绿等浅色不能直接用于白底或浅底的文字、链接、步骤标签、选中按钮文字。
- 页面文字强调使用 `--mp-sys-color-content-brand`，Button 的 text / outline / tonal 使用各状态的 foreground token；实心底色与前景必须配对。
- Firefly 沿用 Horo 角色：primary 为黄色主行动、secondary 为中性次级、tertiary 为紫色辅助品牌。紫色填充与文字使用不同色阶；选择、焦点、日期和滑块使用紫色，不能把 secondary 固定映射为紫色。text/outline 保持透明，黄色文字通过示例卡片背景切换展示深色场景。
- 调整品牌 Button 时检查明暗主题的四种变体、八种状态和交互态，不能让实心状态层以全不透明覆盖底色。浏览器回归：`node --test scripts/browser/button-theme.test.mjs`（先构建文档）。

## 浏览器兼容性

构建后执行 `pnpm check:compatibility`，运行三引擎完整生产回归。原生版本和移动真机发布验收见 `design-ui/standards/browser-compatibility.md`（同级仓库）。使用 `pnpm compatibility:native:init` 创建待验收报告，`pnpm check:compatibility:release` 核对最终发布产物与原生证据。模拟手机不等于真机通过。

## 包名与框架边界

包目录使用职责名，所有内部包（含私有包）以 -vue 结尾；与 React 的源码、CSS、token、preset、shared 和构建依赖完全独立。`pnpm check:packages` 验证目录、名称和直接依赖边界。

## Vue 运行时版本兼容

开发环境使用 catalog 固定的 Vue 稳定版，发布最低兼容 Vue 3.2.47。源码检查运行 `pnpm check:vue-compat:source`；构建后运行 `pnpm check:vue-compat`。新语法、声明降级、消费版本矩阵与 SSR 边界统一见同级 `design-ui/standards/build-and-ci.md` 的「Vue 开发版本与消费兼容性」。
