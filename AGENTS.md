# AGENTS.md — Maple Design Mobile

> 此文件是 AI 编码代理（GitHub Copilot / Claude / Cursor 等）在本仓库工作的统一入口。
> 仓库定位：基于 Vue 3 + TypeScript + Less 的移动端组件库（pnpm monorepo），注册前缀 `Mp`，CSS 前缀 `mp-`。


**前置依赖**：读取并执行全局 `/Users/jiaming.wu/AGENTS.md` 的要求。

## 必读文档（按优先级）

1. **[docs/practices/component-spec.md](docs/practices/component-spec.md)** —— 组件开发规范（移动端版），所有 `packages/maple-ui/src/<component>/` 下的修改必须先读。
2. **[.github/copilot-instructions.md](.github/copilot-instructions.md)** —— GitHub Copilot Chat 自动加载的精简规范。
3. **[docs/practices/ai-collaboration.md](docs/practices/ai-collaboration.md)** —— AI 协作 / 入口文件机制说明（什么时候该更新哪个文件）。
4. **[CHECKLIST.md](CHECKLIST.md)** —— 组件清单。

## 项目结构速览

```
packages/
  maple-ui/                  # 主组件库
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
  maple-cli/                 # CLI / build / vitest 配置
  maple-icons-vue/           # 独立 SVG Vue 图标包（不使用 iconfont）
  maple-shared/              # createNamespaceFn 等基础工具
  maple-use/                 # composables
  maple-resolver/            # 组件、图标、指令与样式 resolver
  maple-vite-plugins/        # vite 插件
  maple-vscode-extension/    # vscode 扩展
  maple-ui-playground/       # playground
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
| 静态检查（不自动修改） | `pnpm lint:check` |
| 跑指定包单测 | `pnpm --dir packages/maple-ui exec vitest run --config ../maple-cli/lib/node/config/vitest.config.js` |
| 跑指定组件 | `... vitest run src/<component>` |
| 更新快照 | 上述命令加 `-u` |

## 与 PC 版（Cedar Design Web）的关系

公共 API（如 `Space` 的 `size` 枚举、`Button` 的 `variant` 等）应**两端同步**，以 PC 实现为准。
PC 端见 `/Users/shuaimeng/github/cedar-design-web/AGENTS.md`。

正式发布前处于 API 收敛期：组件改造确定最终 API 后，应同步迁移两端源码、调用方、Demo、文档、类型和测试并直接删除旧 API；不要保留 deprecated alias、双写或运行时兼容分支。正式发布后再恢复 SemVer 弃用周期，具体以 `design-ui/standards/release-and-compatibility.md` 为准。

具体对应关系（前缀、工具函数等）见 [docs/practices/component-spec.md §13](docs/practices/component-spec.md)。

## 历史教训（不要重蹈）

### 批量重命名 CSS token

- 一次性大批量给 CSS token 加 `--mp-` 前缀时，**正则必须排除**：
  - 已经带 `mp-` 前缀的（避免 `--mp-mp-`）
  - BEM 修饰符 `&--xxx`、`.mp-xxx--yyy` 选择器
  - 模板字符串里的 BEM 片段（`` `${ns}--xxx` ``、`` `${ns}--lock` ``）
  - 固定字面量的功能类；图标由 `@maplejs/icons-vue` 的 SVG 组件渲染，不使用字体类
- 安全做法：仅匹配 `:root { ... }` 块内、或 `var(--xxx)` 内、或 inline `style="--xxx: ..."` 内的自定义属性。
- 踩过的坑（git log 可查）：icon `--mp-set`、slider `--mp-error`、pull-refresh `--mp-lock`、common.less `&--mp-box`。

### 组件内部

- **Provider 字段忘 `.value`** 会渲染 `[object Object]`（参考 `breadcrumb-item separator` bug）。
- **父子通信不要用 `toRefs(props)`** ，类型对不上 `ComputedRef`；用 `computed(() => props.x)`。
- **`classes` 不 unwrap Vue Ref**：条件位要写 `block.value`。
- **裸 PascalCase 名与 HTML tag 同名** 会触发 Vue 自递归 → `RangeError: Invalid string length`。

### 测试

- 测试文件显式从 `vitest` 导入 `describe` / `it` / `test` / `expect` / `vi` / 生命周期函数；Vitest 的 `globals: true` 不代表 ESLint 识别这些全局变量。
- AI 交付前必须运行 `pnpm lint:check` 和受影响的测试；涉及类型时再运行 `pnpm typecheck`。报告实际结果，未运行或失败不能声称验证通过；不要通过跳过 Git hooks 或关闭规则规避错误。
- 预存在失败：`result/imageSize`、`form/zod`（与本人改动无关）。
- vitest 必须显式指定 `--config` 指向 `maple-cli/lib/node/config/vitest.config.js`，否则没有默认配置。

更多细节见 [docs/practices/component-spec.md](docs/practices/component-spec.md)。
