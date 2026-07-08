# Maple Design Mobile 组件开发规范

> 适用范围：`packages/maple-ui/src/<component>/` 下所有新增 / 重构组件。
> 本规范以 `space` / `button` / `breadcrumb` 三个组件为参考实现，从 Cedar Design Web 规范迁移而来，针对移动端做了相应调整。
> **凡是新组件 PR，必须按本规范落实；若有偏离，需在 PR 描述中说明原因。**

---

## 1. 项目定位

Maple Design Mobile 是基于 Vue 3 + TypeScript + Less 的移动端组件库。
所有组件位于 `packages/maple-ui/src/<component>/`，并以 `Mp` 为默认注册前缀（`MpButton`、`MpSpace` 等），CSS 类前缀为 `mp-`。

---

## 2. 目录结构

每个组件遵循同一骨架（不需要的文件可省略，但**已列出的文件名不得改名**）：

```
packages/maple-ui/src/<component>/
  <Component>.vue            # 主组件，PascalCase 文件名（必备）
  <Component>.tsx            # 或 .tsx（如 Space.tsx）
  index.ts                   # 入口：聚合 install + 类型 + 默认导出
  props.ts                   # 集中放 props 与类型定义
  provide.ts                 # 可选：父子上下文 (useChildren / useParent)
  <component>.less           # 主样式（BEM）
  __tests__/index.spec.js    # 单测
  __tests__/__snapshots__/   # vitest 快照
  docs/zh-CN.md              # 中文文档
  docs/en-US.md              # 英文文档（可选）
  example/index.vue          # 示例 demo
```

> 注意：与 PC 端 `cedar-design-web` 不同，移动端组件文件名采用 PascalCase（`Space.tsx` / `Button.vue`），样式文件采用 kebab-case（`space.less`）。

---

## 3. 命名规范

### 3.1 组件命名（关键）

**统一**使用 `createNamespace('<kebab-name>')` 返回的 `name` 作为 `defineComponent` 的 name。
`createNamespace` 在 `src/utils/components.ts` 由 `createNamespaceFn('mp')` 创建：

```ts
import { createNamespace } from '../utils/components'

const { name, n, classes } = createNamespace('button')

export default defineComponent({
  name, // => 'MpButton'
  // ...
})
```

`createNamespace('button')` 返回：

| 字段 | 值 / 行为 |
| --- | --- |
| `name` | `'MpButton'`（PascalCase，带 `Mp` 前缀，避免与 HTML 标签同名导致 `<component :is>` 自递归） |
| `n()` | `'mp-button'` |
| `n('item')` | `'mp-button__item'`（自动 `__` 前缀，BEM Element） |
| `n('--ghost')` | `'mp-button--ghost'`（BEM Modifier，需显式带 `--`） |
| `n('$--box')` | `'mp--box'`（`$` 替换为前缀，全局共享类） |
| `classes(...)` | 来自 rattail，组合类名；**注意 `[cond, truthy, falsy]` 不会自动 unwrap Vue Ref** |

### 3.2 命名空间与样式

| 项目 | 规则 |
| --- | --- |
| 组件注册名 | `Mp<PascalName>`，由 install 时 `prefix + name` 拼接 |
| CSS 类前缀 | `mp-` |
| Block | `.mp-<component>` |
| Element | `.mp-<component>__<el>`（`n('xxx')`） |
| Modifier | `.mp-<component>--<mod>`（`n('--xxx')`） |
| 全局共享类 | `n('$--box')` → `.mp--box`，定义在 `styles/common.less` |
| CSS 变量前缀 | **`--mp-<component>-...`**（强制 `mp-` 前缀） |

模板根元素 class 一律通过 `classes(n(), n('$--box'), [cond.value, n('--xxx')], …)` 组装，**禁止字符串拼接**。

#### 3.2.1 `classes` 与 Vue Ref 的坑

`classes` 不会解开 Vue Ref，`ref(true)` 在条件位上始终是真值（`Ref` 对象本身永远 truthy）：

```ts
// ❌ 错：block 是 Ref<boolean>，永远会命中 truthy 分支
class={classes(n(), [block, n('--block')])}

// ✅ 正确
class={classes(n(), [block.value, n('--block')])}
```

#### 3.2.2 BEM 修饰符必须显式加 `--`

`n()` 区分 element 和 modifier：

```ts
n('item')      // 'mp-button__item'   ← 元素
n('--block')   // 'mp-button--block'  ← 修饰符（必须以 `--` 开头）
n('$--box')   // 'mp--box'            ← 全局共享类
```

### 3.3 文件命名

- 组件文件：PascalCase（`Space.tsx`、`Button.vue`、`BottomNavigation.vue`）
- 样式文件：kebab-case（`space.less`、`bottom-navigation.less`）
- 示例文件：`example/index.vue`
- 测试文件：`__tests__/index.spec.js`
- 类型名：标准 PascalCase（`SpaceSize`、`ButtonVariant`，**不是** `Spacesize`）

---

## 4. Props 定义

```ts
import type { ExtractPropTypes, PropType } from 'vue'
import { defineListenerProp } from '../utils/components'

export type SpaceSize = SpaceInternalSize | number | string | [number | string, number | string]
export type SpaceInternalSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export const spaceProps = {
  /** 间距大小 */
  size: { type: [Number, String, Array] as PropType<SpaceSize>, default: 'md' },
  /** 是否块级 */
  block: { type: Boolean, default: false },
  /** 点击事件 */
  onClick: defineListenerProp<(e: Event) => void | Promise<any>>(),
}
export type SpaceProps = ExtractPropTypes<typeof spaceProps>

// 兼容旧用法：同步 export `props`
export const props = spaceProps
```

要求：
- 每个 prop 上方写中文 JSDoc。
- 事件回调用 `defineListenerProp<...>()`。
- 通用 prop 必须保持统一语义：`size` / `block` / `disabled` / `loading` / `direction` / `align` / `justify` / `wrap` 等，详见 `space` / `button` 实现。
- 父子继承的布尔 prop（如 `disabled`）默认值用 `default: undefined`。

---

## 5. 父子组件通信

使用 `@nio-pow/maple-use` 的 `useChildren` / `useParent`，文件 `provide.ts` 内导出 `XXX_BIND_KEY` Symbol 与 `useXxxs()` / `useXxxGroup()` 封装。子组件读取 group 配置必须 `??` 兜底：`props.size ?? group.size.value`。

---

## 6. 入口（index.ts）

`index.ts` 必须导出（任意一项缺失视为违规）：

```ts
import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { spaceProps } from './props'
import Space from './Space'

withInstall(Space)
withPropsDefaultsSetter(Space, spaceProps)

export type SpaceInstance = InstanceType<typeof Space>
export type {
  SpaceProps,
  SpaceAlign,
  SpaceDirection,
  SpaceJustify,
  SpaceInternalSize,
  SpaceSize,
} from './props'

export { spaceProps }
export const _SpaceComponent = Space
export default Space
```

必须导出：
- `default Comp`（带 `withInstall` / `withPropsDefaultsSetter`）
- `CompInstance`（实例类型）
- `CompProps` / 各联合类型（如 `CompSize`、`CompVariant`）
- `compProps`（运行时 props 对象）
- `_CompComponent`（resolver 用别名，下划线开头）

---

## 7. 样式

### 7.1 文件结构

每个组件**单一**样式文件 `<component>.less`：

```less
:root {
  --mp-space-size-xs-row-gap: 4px;
  --mp-space-size-xs-column-gap: 4px;
  /* 所有 token 集中声明在 :root */
}

.mp-space {
  display: inline-flex;

  &--block {
    display: flex;
  }

  &__item {
    display: inline-flex;
    align-items: center;
  }
}
```

### 7.2 强制规则

- **所有 CSS 自定义属性必须以 `--mp-` 开头**，例如 `--mp-button-padding`、`--mp-space-size-md-row-gap`。
- 全局工具类放在 `styles/common.less`（`mp--box` / `mp--flex` / `mp--lock` 等），不要在组件样式中再定义。
- 主样式**只读 CSS 变量，不写常量值**；颜色 / 间距常量必须落到 `:root` 或 `themes/` 主题文件。
- 主题色板放在 `src/themes/{dark,md3-light,md3-dark}/<component>.ts`，键统一以 `--mp-<component>-` 开头。
- 模板里写在 `style` 内联的 CSS 变量也必须带 `--mp-` 前缀：

```vue
<div :style="{ [`--mp-badge-offset-x`]: toSizeUnit(props.offsetX) }" />
```

### 7.3 BEM 选择器避坑

下面这些是从 token 大批量迁移踩出的坑，**严禁**：

```less
/* ❌ 错：把 BEM 修饰符里的 --xxx 当成 token 加了前缀 */
.mp-button {
  &--mp-ghost { ... }   /* 实际产物 .mp-button--mp-ghost，与 JS 渲染的 .mp-button--ghost 不匹配 */
}

/* ✅ 正确 */
.mp-button {
  &--ghost { ... }
}
```

模板字符串里同理：

```ts
// ❌ 错：会渲染出 .mp-slider__horizontal--mp-error
n(`${direction}--mp-error`)

// ✅ 正确
n(`${direction}--error`)

// ❌ 错：图标 font-family 触发类被破坏
`${namespace}--mp-set`

// ✅ 正确（icon 字体激活类是固定字面量 --set）
`${namespace}--set`
```

> 区分诀窍：**只有以 `--` 开头出现在 `:root` 或元素 `style` 上的才是 CSS 自定义属性，需要 `mp-` 前缀；BEM 修饰符里的 `--xxx` 是普通类名片段，绝对不要加。**

---

## 8. 主题（themes）

`src/themes/<theme>/<component>.ts` 导出该组件在该主题下的所有 token：

```ts
export default {
  '--mp-space-size-xs-row-gap': '4px',
  '--mp-space-size-xs-column-gap': '4px',
  // ...
}
```

`themes/convert.ts` 会处理 px → vw/rem 等单位转换，键名必须与组件 `:root` 中声明的完全一致。

---

## 9. 文档（docs/zh-CN.md）

每个组件至少提供 `docs/zh-CN.md`，按 `案例 → API → 类型定义 → 样式变量` 顺序组织。
样式变量表必须列出所有 `--mp-<component>-*` token 的默认值。

---

## 10. 测试

- 每个组件至少 `__tests__/index.spec.js`，包含基础 mount 快照。
- 跑测试：

```bash
cd packages/maple-ui
npx vitest run --config /path/to/maple-cli/lib/node/config/vitest.config.js
# 或在 monorepo 根目录通过 pnpm 脚本
```

- 使用 `-u` 更新快照（仅在 UI 故意变化时使用）。

---

## 11. 反模式速查

- ❌ `defineComponent({ name: 'MpXxx' })`（写死前缀）
- ❌ `defineComponent({ name: 'Button' })` —— 与 HTML 标签同名会触发 Vue 自递归 → `RangeError: Invalid string length`
- ❌ camelCase 文件名（demo / 样式都禁止）
- ❌ 类型名小写缩写（`Spacesize`）
- ❌ 主样式直接写颜色 / 间距常量，绕过 token
- ❌ `index.ts` 漏导出 `xxxProps` / `_XxxComponent`
- ❌ CSS 变量缺少 `--mp-` 前缀
- ❌ BEM 修饰符 / icon 激活类被加上 `mp-` 前缀（见 §7.3）
- ❌ 在 `classes([refValue, ...])` 处忘记 `.value`
- ❌ 残留 `console.log`

---

## 12. 新增组件 Checklist

实现新组件时，按以下顺序：

1. 创建 `packages/maple-ui/src/<component>/` 目录及 `__tests__/`、`docs/`、`example/`。
2. 写 `props.ts`，定义类型与 `xxxProps`，同步 `export const props = xxxProps`。
3. 写 `<Component>.vue` 或 `<Component>.tsx`（`createNamespace(...).name` 用于 `defineComponent.name`）。
4. 如有子组件，写 `provide.ts` 与 `<Component>Sub.vue`。
5. 写 `<component>.less`：`:root` 声明 `--mp-*` token，主选择器使用 BEM。
6. 写 `index.ts`（按规范导出全部内容）。
7. 写 `docs/zh-CN.md` 与至少一个 `example/index.vue` + 一个 `__tests__/index.spec.js`。
8. 如果有主题需求，在 `src/themes/{dark,md3-light,md3-dark}/<component>.ts` 中补对应键值。
9. 在 `src/index.ts` / `src/components.ts`（如有）注册。

---

## 13. 与 PC 版（Cedar Design Web）的对应关系

| 项目 | Cedar (PC) | Maple (Mobile) |
| --- | --- | --- |
| 注册前缀 | `C` | `Mp` |
| CSS 类前缀 | `c-` | `mp-` |
| CSS 变量前缀 | `--c-` | `--mp-` |
| 命名空间工具 | `_utils/global-config.ts createNamespace` | `utils/components.ts createNamespace` |
| Fragment 工具 | `_utils/vue-utils.ts unFragment` | `utils/components.ts flatFragment` |
| 元素工具 | `_utils/maple/elements.ts` | `utils/elements.ts` |
| 文档 frontmatter | 必填 `permalink` | `docs/zh-CN.md` 可选 |
| 测试 | `vitest`（`*.test.tsx`） | `vitest`（`*.spec.js`） |

新增 / 修改公共 API（如 `Space` 的 `size` 枚举、`Button` 的 `variant` 等）应**两端同步**，以 PC 实现为准。

## 附录 A：跨端对齐案例 — Alert

Alert 是首个走完 OpenSpec 流程完成 PC ↔ Mobile API 对齐的组件，可作为后续组件双端对齐的参考样本。

**核心约定**：
- 类型枚举与 PC `Status` 对齐：`info | success | warning | danger | default`（不再用 `error` / `closeable` 拼写错误）。
- 视觉变体三档：`standard` / `tonal` / `outlined`。
- 通用属性：`color` / `elevation` / `closable` / `showIcon` / `banner` / `center` / `title` / `message`。
- 通用插槽：`default` / `icon` / `title` / `action` / `close-icon`。
- 通用事件：`close(e)` / `after-close()`。
- 样式实现：所有颜色 / 间距走 `--mp-alert-*` token，主样式只读 CSS 变量。
- 类型导出齐备：`AlertProps` / `AlertType` / `AlertVariant` / `AlertInstance`。

PC 侧 OpenSpec change：`cedar-design-web/openspec/changes/align-alert-spec/`。
