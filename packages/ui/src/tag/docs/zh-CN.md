# 标签

### 介绍

标签用于标记、分类与筛选。API 与 Cedar Design Web (PC) 的 Tag 对齐，并吸收移动端常见能力（圆角、自定义文字色）。

## 基础示例

### 主题色标签

通过 `status` 设置主题色，可选值与 Button 一致：`default` `primary` `secondary` `tertiary` `info` `success` `warning` `danger`。

```demo
../example/demos/theme-color-tag.vue
```

## 外观与状态

### 圆角标签

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `variant` | 变体，可选 `default`（实心） / `outline`（描边） | 圆角标签、自定义颜色 |
| `round` | 是否为圆角胶囊形 | 圆角标签 |
| `status` | 主题色，可选值 `default` `primary` `secondary` `tertiary` `info` `success` `warning` `danger` | 圆角标签 |
| `closable` | 是否可关闭 | 圆角标签 |
| `color` | 自定义背景色（outline 时为边框色） | 自定义颜色 |
| `text-color` | 自定义文字色 | 自定义颜色 |
<!-- demo-config-notes:end -->

通过 `round` 开启胶囊圆角。

```demo
../example/demos/round-tag.vue
```

### 自定义颜色

通过 `color` 与 `text-color` 设置自定义颜色（覆盖 status）。`variant="outline"` 时 `color` 作为边框色。

```demo
../example/demos/custom-color-tag.vue
```

### 外观配置对比

选择一个对比维度后，同屏展示它的全部可选值；其余配置和内容保持一致。可切换其他配置检查组合效果；输入类预览共享一个值。

<details>
<summary>配置说明与使用限制</summary>

#### 标签尺寸

通过 `size` 设置尺寸，可选值 `xs` `sm` `md` `lg` `xl`。

#### 描边标签

通过 `variant="outline"` 切换为描边风格。

#### 外观组合

适用于短标签与分类标记。调整变体、状态、尺寸，用相同数据观察变化。内容保持一致，便于比较不同设置的实际效果。

</details>

```demo
../example/demos/appearance-lab.vue
```

## 内容与展示

### 可选中标签

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `status` | 主题色，可选值 `default` `primary` `secondary` `tertiary` `info` `success` `warning` `danger` | 可选中标签、带图标 |
| `checkable` | 是否可点击选中 | 可选中标签 |
| `default-value` | 默认选中状态（checkable 时有效） | 可选中标签 |
| `variant` | 变体，可选 `default`（实心） / `outline`（描边） | 可选中标签 |
| `loading` | 是否为加载中状态 | 可选中标签 |
<!-- demo-config-notes:end -->

通过 `checkable` 使标签可点击切换选中，配合 `v-model`。

```demo
../example/demos/checkable-tag.vue
```

### 带图标

通过 `icon` 插槽自定义前缀，`close-icon` 自定义关闭图标。

```demo
../example/demos/icon-tag.vue
```

## 交互与控制

### 可关闭标签

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `status` | 主题色，可选值 `default` `primary` `secondary` `tertiary` `info` `success` `warning` `danger` | 可关闭标签、加载中标签 |
| `show` | 是否可见（v-model） | 可关闭标签 |
| `closable` | 是否可关闭 | 可关闭标签 |
| `round` | 是否为圆角胶囊形 | 可关闭标签 |
| `loading` | 是否为加载中状态 | 加载中标签 |
<!-- demo-config-notes:end -->

关闭按钮支持 Space / Enter，关闭不会同时触发选中。可选中标签支持 Space / Enter；受控 checked 由父级决定是否接受，未传时由组件保存状态。loading 阻止选中动作。

通过 `closable` 显示关闭按钮，配合 `v-model:show` 或自行维护列表。

```demo
../example/demos/closable-tag.vue
```

### 加载中标签

通过 `loading` 显示加载状态。

```demo
../example/demos/loading-tag.vue
```

## API


加载中保留选中状态，可选中标签声明禁用与忙碌状态；关闭按钮持焦时进入加载会将焦点移到标签。正文中的独立交互控件不会触发标签选中。

关闭按钮名称默认使用当前语言的关闭文案，可通过 `close-button-aria-label` 覆盖。标签根始终保持单行；`nowrap` 主要启用内容截断内层，并不控制多行换行。

### 主值与默认值

使用普通 `v-model`。`modelValue` 表示可选标签是否选中，布尔值；`defaultValue` 仅在创建时初始化非受控值，后续修改不会重置当前状态。显式绑定值优先，初始化不发出 `update:modelValue`。

### Tag Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `status` | 主题色，可选值 `default` `primary` `secondary` `tertiary` `info` `success` `warning` `danger` | _string_ | `default` |
| `variant` | 变体，可选 `default`（实心） / `outline`（描边） | _string_ | `default` |
| `size` | 尺寸，可选值 `xs` `sm` `md` `lg` `xl` | _string_ | `md` |
| `round` | 是否为圆角胶囊形 | _boolean_ | `false` |
| `show` | 是否可见（v-model） | _boolean_ | `true` |
| `default-show` | 默认是否可见 | _boolean_ | `true` |
| `loading` | 是否为加载中状态 | _boolean_ | `false` |
| `closable` | 是否可关闭 | _boolean_ | `false` |
| `close-button-aria-label` | 关闭按钮的可访问名称，默认使用当前语言 | `string` | `—` |
| `checkable` | 是否可点击选中 | _boolean_ | `false` |
| `model-value` | 选中状态（checkable 时有效，v-model） | _boolean_ | `true` |
| `default-value` | 默认选中状态（checkable 时有效） | _boolean_ | `true` |
| `nowrap` | 是否启用内容截断内层；根始终单行 | _boolean_ | `false` |
| `color` | 自定义背景色（outline 时为边框色） | _string_ | `-` |
| `text-color` | 自定义文字色 | _string_ | `-` |

### Tag Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `update:show` | 可见状态变化 | `(show: boolean)` |
| `update:model-value` | 选中状态变化（checkable 时） | `(checked: boolean)` |
| `close` | 点击关闭按钮 | `(event: MouseEvent)` |
| `check` | 点击切换选中状态（checkable 时） | `(checked: boolean, event: MouseEvent)` |

### Tag Slots

| 插槽名 | 说明 |
| --- | --- |
| `default` | 标签内容 |
| `icon` | 前缀 |
| `close-icon` | 自定义关闭按钮图标 |

## Types

```ts
type TagStatus = 'default' | 'primary' | 'secondary' | 'tertiary' | 'info' | 'success' | 'warning' | 'danger'
type TagSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type TagVariant = 'default' | 'outline'
```

## 使用说明



show / checked 为受控值时由调用方更新。隐藏时保留淡出效果，class / style 作用于实际标签；移动端触控尺寸可通过 CSS 变量定制。

### 颜色覆盖边界

预设色 outline 保持透明；loading 不触发预设填充 hover。暗色背景消费 bg/bg-hover 变量，实例覆盖同样生效。预设 icon-color 与 text-color 分开。未选中预设保持中性，但自定义 color 属性仍生效。预设／自定义色不保证任意背景上的对比度。

## CSS Variables

完整公开变量以 `style/token.less` 中的 `--mp-tag-*` 为准，可通过 [ThemeProvider 组件](#/zh-CN/theme-provider) 定制。Cedar 使用完全相同的逻辑变量名，仅品牌前缀不同。

状态文字与 outline 描边使用对应的主题语义色，彩色填充使用浅色背景。未选中时保持中性，已选中状态色优先于 hover；默认中性背景在 fill-2 与 fill-3 之间切换。color 优先于 status。自定义背景时需保证文字对比度，必要时设置 text-color。

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-tag-bg-not-checked-hover` | `var(--mp-sys-color-state-hover)` | `background-color` |
| `--mp-tag-blue-bg` | `rgb(var(--mp-blue-1))`<br>`rgba(var(--mp-blue-6), 0.2)` (`:root[maple-theme='dark']`) | `background-color` |
| `--mp-tag-blue-bg-hover` | `rgb(var(--mp-blue-2))`<br>`rgba(var(--mp-blue-6), 0.35)` (`:root[maple-theme='dark']`) | `background-color` |
| `--mp-tag-blue-border-color` | `transparent` | `border` |
| `--mp-tag-blue-border-color-hover` | `transparent` | `border-color` |
| `--mp-tag-blue-icon-color` | `rgb(var(--mp-blue-6))` | `color` |
| `--mp-tag-blue-text-color` | `rgb(var(--mp-blue-6))` | `border-color`, `color` |
| `--mp-tag-border-radius` | `var(--mp-sys-radius-md)` | `border-radius` |
| `--mp-tag-border-type` | `solid` | `border` |
| `--mp-tag-border-width` | `1px` | `border`, `line-height` |
| `--mp-tag-brand-bg` | `rgb(var(--mp-brand-1))`<br>`rgba(var(--mp-brand-6), 0.2)` (`:root[maple-theme='dark']`) | `background-color` |
| `--mp-tag-brand-bg-hover` | `rgb(var(--mp-brand-2))`<br>`rgba(var(--mp-brand-6), 0.35)` (`:root[maple-theme='dark']`) | `background-color` |
| `--mp-tag-brand-border-color` | `transparent` | `border` |
| `--mp-tag-brand-border-color-hover` | `transparent` | `border-color` |
| `--mp-tag-brand-icon-color` | `rgb(var(--mp-brand-6))` | `color` |
| `--mp-tag-brand-text-color` | `rgb(var(--mp-brand-6))` | `border-color`, `color` |
| `--mp-tag-close-font-size` | `var(--mp-tag-size-md-font-size)` | `font-size` |
| `--mp-tag-close-margin-left` | `var(--mp-sys-space-3)` | `margin-left`, `margin-right` |
| `--mp-tag-custom-text-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-tag-cyan-bg` | `rgb(var(--mp-cyan-1))`<br>`rgba(var(--mp-cyan-6), 0.2)` (`:root[maple-theme='dark']`) | `background-color` |
| `--mp-tag-cyan-bg-hover` | `rgb(var(--mp-cyan-2))`<br>`rgba(var(--mp-cyan-6), 0.35)` (`:root[maple-theme='dark']`) | `background-color` |
| `--mp-tag-cyan-border-color` | `transparent` | `border` |
| `--mp-tag-cyan-border-color-hover` | `transparent` | `border-color` |
| `--mp-tag-cyan-icon-color` | `rgb(var(--mp-cyan-6))` | `color` |
| `--mp-tag-cyan-text-color` | `rgb(var(--mp-cyan-6))` | `border-color`, `color` |
| `--mp-tag-default-bg` | `var(--mp-sys-color-state-hover)` | `background-color` |
| `--mp-tag-default-bg-hover` | `var(--mp-color-fill-3)` | `background-color` |
| `--mp-tag-default-border-color` | `transparent` | `border-color` |
| `--mp-tag-default-border-color-hover` | `transparent` | `border-color` |
| `--mp-tag-default-icon-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-tag-default-text-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-tag-fade-duration` | `var(--mp-sys-motion-duration-fast)` | `transition` |
| `--mp-tag-gold-bg` | `rgb(var(--mp-gold-1))`<br>`rgba(var(--mp-gold-6), 0.2)` (`:root[maple-theme='dark']`) | `background-color` |
| `--mp-tag-gold-bg-hover` | `rgb(var(--mp-gold-2))`<br>`rgba(var(--mp-gold-6), 0.35)` (`:root[maple-theme='dark']`) | `background-color` |
| `--mp-tag-gold-border-color` | `transparent` | `border` |
| `--mp-tag-gold-border-color-hover` | `transparent` | `border-color` |
| `--mp-tag-gold-icon-color` | `rgb(var(--mp-gold-6))` | `color` |
| `--mp-tag-gold-text-color` | `rgb(var(--mp-gold-6))` | `border-color`, `color` |
| `--mp-tag-gray-bg` | `rgb(var(--mp-gray-2))`<br>`rgba(var(--mp-gray-6), 0.2)` (`:root[maple-theme='dark']`) | `background-color` |
| `--mp-tag-gray-bg-hover` | `rgb(var(--mp-gray-3))`<br>`rgba(var(--mp-gray-6), 0.35)` (`:root[maple-theme='dark']`) | `background-color` |
| `--mp-tag-gray-border-color` | `transparent` | `border` |
| `--mp-tag-gray-border-color-hover` | `transparent` | `border-color` |
| `--mp-tag-gray-icon-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-tag-gray-text-color` | `var(--mp-sys-color-content-secondary)` | `border-color`, `color` |
| `--mp-tag-green-bg` | `rgb(var(--mp-green-1))`<br>`rgba(var(--mp-green-6), 0.2)` (`:root[maple-theme='dark']`) | `background-color` |
| `--mp-tag-green-bg-hover` | `rgb(var(--mp-green-2))`<br>`rgba(var(--mp-green-6), 0.35)` (`:root[maple-theme='dark']`) | `background-color` |
| `--mp-tag-green-border-color` | `transparent` | `border` |
| `--mp-tag-green-border-color-hover` | `transparent` | `border-color` |
| `--mp-tag-green-icon-color` | `rgb(var(--mp-green-6))` | `color` |
| `--mp-tag-green-text-color` | `rgb(var(--mp-green-6))` | `border-color`, `color` |
| `--mp-tag-icon-margin-right` | `var(--mp-sys-space-3)` | `margin-left`, `margin-right` |
| `--mp-tag-lime-bg` | `rgb(var(--mp-lime-1))`<br>`rgba(var(--mp-lime-6), 0.2)` (`:root[maple-theme='dark']`) | `background-color` |
| `--mp-tag-lime-bg-hover` | `rgb(var(--mp-lime-2))`<br>`rgba(var(--mp-lime-6), 0.35)` (`:root[maple-theme='dark']`) | `background-color` |
| `--mp-tag-lime-border-color` | `transparent` | `border` |
| `--mp-tag-lime-border-color-hover` | `transparent` | `border-color` |
| `--mp-tag-lime-icon-color` | `rgb(var(--mp-lime-6))` | `color` |
| `--mp-tag-lime-text-color` | `rgb(var(--mp-lime-6))` | `border-color`, `color` |
| `--mp-tag-magenta-bg` | `rgb(var(--mp-magenta-1))`<br>`rgba(var(--mp-magenta-6), 0.2)` (`:root[maple-theme='dark']`) | `background-color` |
| `--mp-tag-magenta-bg-hover` | `rgb(var(--mp-magenta-2))`<br>`rgba(var(--mp-magenta-6), 0.35)` (`:root[maple-theme='dark']`) | `background-color` |
| `--mp-tag-magenta-border-color` | `transparent` | `border` |
| `--mp-tag-magenta-border-color-hover` | `transparent` | `border-color` |
| `--mp-tag-magenta-icon-color` | `rgb(var(--mp-magenta-6))` | `color` |
| `--mp-tag-magenta-text-color` | `rgb(var(--mp-magenta-6))` | `border-color`, `color` |
| `--mp-tag-orange-bg` | `rgb(var(--mp-orange-1))`<br>`rgba(var(--mp-orange-6), 0.2)` (`:root[maple-theme='dark']`) | `background-color` |
| `--mp-tag-orange-bg-hover` | `rgb(var(--mp-orange-2))`<br>`rgba(var(--mp-orange-6), 0.35)` (`:root[maple-theme='dark']`) | `background-color` |
| `--mp-tag-orange-border-color` | `transparent` | `border` |
| `--mp-tag-orange-border-color-hover` | `transparent` | `border-color` |
| `--mp-tag-orange-icon-color` | `rgb(var(--mp-orange-6))` | `color` |
| `--mp-tag-orange-text-color` | `rgb(var(--mp-orange-6))` | `border-color`, `color` |
| `--mp-tag-orangered-bg` | `rgb(var(--mp-orangered-1))`<br>`rgba(var(--mp-orangered-6), 0.2)` (`:root[maple-theme='dark']`) | `background-color` |
| `--mp-tag-orangered-bg-hover` | `rgb(var(--mp-orangered-2))`<br>`rgba(var(--mp-orangered-6), 0.35)` (`:root[maple-theme='dark']`) | `background-color` |
| `--mp-tag-orangered-border-color` | `transparent` | `border` |
| `--mp-tag-orangered-border-color-hover` | `transparent` | `border-color` |
| `--mp-tag-orangered-icon-color` | `rgb(var(--mp-orangered-6))` | `color` |
| `--mp-tag-orangered-text-color` | `rgb(var(--mp-orangered-6))` | `border-color`, `color` |
| `--mp-tag-padding-horizontal` | `10px` | `padding` |
| `--mp-tag-padding-vertical` | `0` | `line-height`, `padding` |
| `--mp-tag-pinkpurple-bg` | `rgb(var(--mp-pinkpurple-1))`<br>`rgba(var(--mp-pinkpurple-6), 0.2)` (`:root[maple-theme='dark']`) | `background-color` |
| `--mp-tag-pinkpurple-bg-hover` | `rgb(var(--mp-pinkpurple-2))`<br>`rgba(var(--mp-pinkpurple-6), 0.35)` (`:root[maple-theme='dark']`) | `background-color` |
| `--mp-tag-pinkpurple-border-color` | `transparent` | `border` |
| `--mp-tag-pinkpurple-border-color-hover` | `transparent` | `border-color` |
| `--mp-tag-pinkpurple-icon-color` | `rgb(var(--mp-pinkpurple-6))` | `color` |
| `--mp-tag-pinkpurple-text-color` | `rgb(var(--mp-pinkpurple-6))` | `border-color`, `color` |
| `--mp-tag-purple-bg` | `rgb(var(--mp-purple-1))`<br>`rgba(var(--mp-purple-6), 0.2)` (`:root[maple-theme='dark']`) | `background-color` |
| `--mp-tag-purple-bg-hover` | `rgb(var(--mp-purple-2))`<br>`rgba(var(--mp-purple-6), 0.35)` (`:root[maple-theme='dark']`) | `background-color` |
| `--mp-tag-purple-border-color` | `transparent` | `border` |
| `--mp-tag-purple-border-color-hover` | `transparent` | `border-color` |
| `--mp-tag-purple-icon-color` | `rgb(var(--mp-purple-6))` | `color` |
| `--mp-tag-purple-text-color` | `rgb(var(--mp-purple-6))` | `border-color`, `color` |
| `--mp-tag-red-bg` | `rgb(var(--mp-red-1))`<br>`rgba(var(--mp-red-6), 0.2)` (`:root[maple-theme='dark']`) | `background-color` |
| `--mp-tag-red-bg-hover` | `rgb(var(--mp-red-2))`<br>`rgba(var(--mp-red-6), 0.35)` (`:root[maple-theme='dark']`) | `background-color` |
| `--mp-tag-red-border-color` | `transparent` | `border` |
| `--mp-tag-red-border-color-hover` | `transparent` | `border-color` |
| `--mp-tag-red-icon-color` | `rgb(var(--mp-red-6))` | `color` |
| `--mp-tag-red-text-color` | `rgb(var(--mp-red-6))` | `border-color`, `color` |
| `--mp-tag-round-radius` | `100px` | `border-radius` |
| `--mp-tag-size-lg` | `36px` | `height`, `line-height` |
| `--mp-tag-size-lg-font-size` | `var(--mp-sys-font-size-md)` | `font-size` |
| `--mp-tag-size-md` | `32px` | `height`, `line-height` |
| `--mp-tag-size-md-font-size` | `var(--mp-sys-font-size-md)` | `font-size` |
| `--mp-tag-size-sm` | `28px` | `height`, `line-height` |
| `--mp-tag-size-sm-font-size` | `var(--mp-sys-font-size-xs)` | `font-size` |
| `--mp-tag-size-xl` | `40px` | `height`, `line-height` |
| `--mp-tag-size-xl-font-size` | `var(--mp-sys-font-size-lg)` | `font-size` |
| `--mp-tag-size-xs` | `24px` | `height`, `line-height` |
| `--mp-tag-size-xs-font-size` | `var(--mp-sys-font-size-xs)` | `font-size` |
| `--mp-tag-status-danger-bg-color` | `rgb(var(--mp-danger-1))` | `background-color` |
| `--mp-tag-status-danger-text-color` | `var(--mp-sys-color-content-danger)` | `color` |
| `--mp-tag-status-info-bg-color` | `rgb(var(--mp-blue-1))` | `background-color` |
| `--mp-tag-status-info-text-color` | `var(--mp-sys-color-content-info)` | `color` |
| `--mp-tag-status-primary-bg-color` | `rgb(var(--mp-primary-1))` | `background-color` |
| `--mp-tag-status-primary-text-color` | `var(--mp-sys-color-content-brand)` | `color` |
| `--mp-tag-status-secondary-bg-color` | `rgb(var(--mp-gray-2))` | `background-color` |
| `--mp-tag-status-secondary-text-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-tag-status-success-bg-color` | `rgb(var(--mp-success-1))` | `background-color` |
| `--mp-tag-status-success-text-color` | `var(--mp-sys-color-content-success)` | `color` |
| `--mp-tag-status-tertiary-bg-color` | `rgb(var(--mp-gray-1))` | `background-color` |
| `--mp-tag-status-tertiary-text-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-tag-status-warning-bg-color` | `rgb(var(--mp-warning-1))` | `background-color` |
| `--mp-tag-status-warning-text-color` | `var(--mp-sys-color-content-warning)` | `color` |
| `--mp-tag-text-font-weight` | `var(--mp-sys-font-weight-medium)` | `font-weight` |
| `--mp-tag-variant-outline-default-border-color` | `var(--mp-sys-color-border-default)` | `border` |
| `--mp-tag-variant-outline-default-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-tag-variant-outline-status-danger-color` | `var(--mp-sys-color-content-danger)` | `border`, `color` |
| `--mp-tag-variant-outline-status-info-color` | `var(--mp-sys-color-content-info)` | `border`, `color` |
| `--mp-tag-variant-outline-status-primary-color` | `var(--mp-sys-color-content-brand)` | `border`, `color` |
| `--mp-tag-variant-outline-status-secondary-color` | `var(--mp-sys-color-content-secondary)` | `border`, `color` |
| `--mp-tag-variant-outline-status-success-color` | `var(--mp-sys-color-content-success)` | `border`, `color` |
| `--mp-tag-variant-outline-status-tertiary-color` | `var(--mp-sys-color-content-secondary)` | `border`, `color` |
| `--mp-tag-variant-outline-status-warning-color` | `var(--mp-sys-color-content-warning)` | `border`, `color` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-tag-blue-border-color: transparent;
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->

### 动效

内置动效遵循 `prefers-reduced-motion: reduce`；减少动效不会阻止加载状态或关闭事件更新。
