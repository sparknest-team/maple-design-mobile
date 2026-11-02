# Ellipsis 文本省略

单行或多行文本省略，可选展开交互和 Tooltip。

## 基础示例

### 单行省略

```demo
../example/demos/line.vue
```

## 内容与展示

### 受控展开

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `tooltip` | Tooltip 配置，false 禁用 | 受控展开、自定义提示 |
| `expand` | 受控展开状态，配合 v-model:expand | 受控展开 |
| `line-clamp` | 正数行数，向下取整；未传或无效为单行 | 受控展开 |
| `expand-trigger` | 启用点击与 Enter / Space 展开 | 受控展开 |
<!-- demo-config-notes:end -->

```demo
../example/demos/two-way-binding.vue
```

### 自定义提示

```demo
../example/demos/tooltip.vue
```

## 数据与选项

### 多行省略

```demo
../example/demos/multiple-line.vue
```

## 交互与控制

### 交互展开

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `line-clamp` | 正数行数，向下取整；未传或无效为单行 | 交互展开 |
| `expand-trigger` | 启用点击与 Enter / Space 展开 | 交互展开 |
| `tooltip` | Tooltip 配置，false 禁用 | 交互展开 |
<!-- demo-config-notes:end -->

```demo
../example/demos/expand.vue
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `expand` | 受控展开状态，配合 v-model:expand | `boolean` | `undefined` |
| `default-expand` | 非受控初始展开状态 | `boolean` | `false` |
| `expand-trigger` | 启用点击与 Enter / Space 展开 | `'click'` | `—` |
| `line-clamp` | 正数行数，向下取整；未传或无效为单行 | `number \| string` | `—` |
| `tooltip` | Tooltip 配置，false 禁用 | `boolean \| TooltipProps` | `true` |

传入 `expand` 后只通知父级，不擅自修改受控值；省略时由内部状态管理，`default-expand` 仅用于初始化。Tooltip 遵循自身默认宽度及触发方式，不以实际测量是否溢出作为显示条件；触控场景可显式设置 `tooltip.trigger` 包含 `click`。外部 class/style/width 直接作用于文本节点。

### 事件与插槽

- `update:expand(expand: boolean)`：用户操作请求的新状态；外部更新不触发。
- `default`：正文。
- `tooltip-content`：提示内容；未提供时优先 tooltip.content，否则使用正文，不重复拼接。
- 键盘：可展开文本支持 Enter / Space；启用 Tooltip 的文本可通过 Tab 聚焦。无公开实例方法。

### 类型

```ts
import type { EllipsisProps, EllipsisInstance, EllipsisExpandTrigger } from '@maple-design/ui'
```

### 样式变量

| Token | 默认值 |
| --- | --- |
| `--mp-ellipsis-focus-color` | `var(--mp-sys-color-content-brand)` |
| `--mp-ellipsis-focus-width` | `2px` |
| `--mp-ellipsis-focus-offset` | `2px` |
