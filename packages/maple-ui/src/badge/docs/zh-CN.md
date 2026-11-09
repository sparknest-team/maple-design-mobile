# Badge

## 基础示例

### 基础用法

徽标默认使用红色背景和白色文字。

```demo
../example/demos/basic.vue
```

## 外观与状态

### 状态和颜色

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `content` | 徽标显示的内容 | 状态和颜色、外观配置对比 |
| `status` | 徽标的状态 | 状态和颜色 |
| `mode` | 徽标的类型 | 状态和颜色 |
| `description` | 徽标的描述文本 | 状态和颜色 |
| `color` | 徽标的背景色，也可以设置自定义色值 | 状态和颜色 |
| `text-color` | 徽标显示的内容颜色 | 状态和颜色 |
<!-- demo-config-notes:end -->

```demo
../example/demos/color.vue
```

### 外观配置对比

选择一个对比维度后，同屏展示它的全部可选值；其余配置和内容保持一致。可切换其他配置检查组合效果；输入类预览共享一个值。

<details>
<summary>配置说明与使用限制</summary>

#### 外观组合

适用于通知数量和标记。调整变体、状态、尺寸，用相同数据观察变化。内容保持一致，便于比较不同设置的实际效果。

</details>

```demo
../example/demos/appearance-lab.vue
```

## 布局与排列

### 位置与偏移

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `position` | 浮动徽标在宿主盒子中的物理角落或左右中点，默认 top-right；只在 floating 模式生效，RTL 不反转 | 位置与偏移 |
| `content` | 徽标显示的内容 | 位置与偏移 |
| `dot` | 显示为小红点 | 位置与偏移 |
| `offset-x` | 设置徽标位置的偏移X，mode为inline时无效。 | 位置与偏移 |
| `offset-y` | 设置徽标位置的偏移Y。 | 位置与偏移 |
| `mode` | 徽标的类型 | 位置与偏移 |
<!-- demo-config-notes:end -->

```demo
../example/demos/position.vue
```

## 内容与展示

### 内联与独立展示

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `content` | 徽标显示的内容 | 内联与独立展示、小圆点、最大值与零值 |
| `dot` | 显示为小红点 | 内联与独立展示、小圆点、显示与隐藏 |
| `description` | 徽标的描述文本 | 内联与独立展示、显示与隐藏 |
| `show-zero` | 徽标为0时是否显示 | 最大值与零值、显示与隐藏 |
| `mode` | 徽标的类型 | 内联与独立展示 |
| `inline-position` | 内联徽标位于宿主内容的逻辑 start 或 end，默认 end；仅 inline 模式生效 | 内联与独立展示 |
<!-- demo-config-notes:end -->

```demo
../example/demos/inline.vue
```

### 小圆点

```demo
../example/demos/dot.vue
```

### 最大值与零值

```demo
../example/demos/max.vue
```

### 显示与隐藏

```demo
../example/demos/show.vue
```

## 自定义与插槽

### 自定义内容

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `content` | 徽标显示的内容 | 自定义内容 |
| `mode` | 徽标的类型 | 自定义内容 |
| `inline-position` | 内联徽标位于宿主内容的逻辑 start 或 end，默认 end；仅 inline 模式生效 | 自定义内容 |
<!-- demo-config-notes:end -->

```demo
../example/demos/content.vue
```

## 使用说明

### 配置说明

以下是全部公开 Badge 变量及默认值：

## API

<!-- same-source-api:start -->
数字内容支持有限非负数；零仅在 `show-zero` 为真时显示，点状和 `content` 插槽也遵循此规则。字符串原样显示，包括字符串 `0`。负数和非有限数字不显示。`max=0` 表示不截断，无效上限回退为 99；偏移支持有限负数，无效偏移按 0 处理。浮动模式下正偏移从锚边向内，中点位置的正纵向偏移向下；内联模式忽略横向偏移，纵向偏移按 start/end 使用不同的块方向边距。默认插槽存在即视为有宿主，即使插槽内容为空；`content` 插槽优先于默认徽标，但仍受 `show` 和数字零值规则约束。

### Badge Props

| 参数名          | 描述                                                                               | 类型                                                           |   默认值    |
| --------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------- | :---------: |
| description     | 徽标的描述文本                                                                     | `string`                                                       |     `-`     |
| content         | 徽标显示的内容                                                                     | `number \| string`                                             |     `-`     |
| max             | 徽标最大显示数值，如果content超过这个数值会显示为`${max}+`，content 为数字时有效。 | `number`                                                       |    `99`     |
| dot             | 显示为小红点                                                                       | `boolean`                                                      |   `false`   |
| offset-x        | 设置徽标位置的偏移X，mode为inline时无效。                                          | `number`                                                       |     `0`     |
| offset-y        | 设置徽标位置的偏移Y。                                                              | `number`                                                       |     `0`     |
| color           | 徽标的背景色，也可以设置自定义色值                                                 | `string`                                                       |     `-`     |
| text-color      | 徽标显示的内容颜色                                                                 | `string`                                                       |     `-`     |
| mode            | 徽标的类型                                                                         | `'floating' \| 'inline'`                                       | `floating`  |
| position        | 浮动徽标在宿主盒子中的物理角落或左右中点，默认 top-right；只在 floating 模式生效，RTL 不反转 | `'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left' \| 'left' \| 'right'` | `top-right` |
| inline-position | 内联徽标位于宿主内容的逻辑 start 或 end，默认 end；仅 inline 模式生效 | `'start' \| 'end'`                                             |    `end`    |
| size            | 徽标的尺寸                                                                         | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                         |    `md`     |
| status          | 徽标的状态                                                                         | `SemanticStatus`<br>`'default' \| 'primary' \| 'secondary' \| 'tertiary' \| 'info' \| 'success' \| 'warning' \| 'danger'` |  `danger`   |
| show            | 是否显示徽标                                                                       | `boolean`                                                      |   `true`    |
| show-zero       | 徽标为0时是否显示                                                                  | `boolean`                                                      |   `false`   |
| variant         | 徽标的变体                                                                         | `'outline' \| 'default'`                                       |  `default`  |

### Badge Events

无组件自定义事件。

### Badge Slots

| 插槽名  | 说明             | 参数 |
| ------- | ---------------- | ---- |
| default | 徽标的描述文本   | -    |
| content | 徽标中显示的内容 | -    |

### Badge Methods

无公开方法。

### 使用说明

属性和插槽契约一致。没有 default 插槽且 description 为空时自动独立内联展示；未提供 content 时显示圆点。两端分别通过各自配置读取文字方向，主题颜色和 CSS 前缀由各端提供。
<!-- same-source-api:end -->

## Types

```ts
type SemanticStatus = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'primary' | 'secondary' | 'tertiary'
type BadgeVariant = 'default' | 'outline'
type BadgeMode = 'floating' | 'inline'
type BadgePosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'left' | 'right'
type BadgeInlinePosition = 'start' | 'end'
type BadgeSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
```

## CSS Variables

填充徽标的文字配色以 Button 为准：primary、info、success、warning、danger、secondary 使用 `content-on-dark`；tertiary 在亮色使用 `content-on-dark`，暗色使用 `content-on-bright`。默认通知徽标使用红底白字，中性背景 `#e0e0e0` 为固定浅灰色。

彩色轮廓文字和描边与 Button 一致，使用对应的 `content-brand` / `content-info` / `content-success` / `content-warning` / `content-danger` 语义色；secondary 与 tertiary 轮廓均使用 `content-secondary` 保持可读性。`variant-outline-bg-color` 对所有状态均生效，默认透明。`color` 属性覆盖轮廓文字和描边，`text-color` 进一步覆盖文字；二者均保留背景变量的控制权。自定义前景或背景后须重新验证对比度。

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-badge-bg-color` | `rgb(var(--mp-danger-7))` | `background-color` |
| `--mp-badge-border-color` | `var(--mp-sys-color-surface-default)` | `background-color`, `box-shadow` |
| `--mp-badge-description-size-lg-font-size` | `var(--mp-sys-font-size-lg)` | `font-size` |
| `--mp-badge-description-size-md-font-size` | `var(--mp-sys-font-size-md)` | `font-size` |
| `--mp-badge-description-size-sm-font-size` | `var(--mp-sys-font-size-xs)` | `font-size` |
| `--mp-badge-description-size-xl-font-size` | `var(--mp-sys-font-size-xl)` | `font-size` |
| `--mp-badge-description-size-xs-font-size` | `var(--mp-sys-font-size-xs)` | `font-size` |
| `--mp-badge-description-text-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-badge-font-weight` | `var(--mp-sys-font-weight-medium)` | `font-weight` |
| `--mp-badge-offset` | `2px` | `bottom`, `left`, `right`, `top` |
| `--mp-badge-ring-width` | `2px` | `box-shadow`, `line-height` |
| `--mp-badge-size-lg-border-radius` | `28px` | `border-radius` |
| `--mp-badge-size-lg-dot-height` | `7px` | `height` |
| `--mp-badge-size-lg-dot-width` | `7px` | `width` |
| `--mp-badge-size-lg-font-size` | `var(--mp-sys-font-size-md)` | `font-size` |
| `--mp-badge-size-lg-height` | `28px` | `line-height`, `min-width` |
| `--mp-badge-size-lg-padding` | `0 var(--mp-sys-space-4)` | `padding` |
| `--mp-badge-size-lg-scale` | `1` | `transform` |
| `--mp-badge-size-lg-space` | `var(--mp-sys-space-3)` | `margin-inline` |
| `--mp-badge-size-md-border-radius` | `24px` | `border-radius` |
| `--mp-badge-size-md-dot-height` | `6px` | `height` |
| `--mp-badge-size-md-dot-width` | `6px` | `width` |
| `--mp-badge-size-md-font-size` | `var(--mp-sys-font-size-xs)` | `font-size` |
| `--mp-badge-size-md-height` | `24px` | `line-height`, `min-width` |
| `--mp-badge-size-md-padding` | `0 var(--mp-sys-space-4)` | `padding` |
| `--mp-badge-size-md-scale` | `1` | `transform` |
| `--mp-badge-size-md-space` | `var(--mp-sys-space-3)` | `margin-inline` |
| `--mp-badge-size-sm-border-radius` | `20px` | `border-radius` |
| `--mp-badge-size-sm-dot-height` | `5px` | `height` |
| `--mp-badge-size-sm-dot-width` | `5px` | `width` |
| `--mp-badge-size-sm-font-size` | `var(--mp-sys-font-size-xs)` | `font-size` |
| `--mp-badge-size-sm-height` | `20px` | `line-height`, `min-width` |
| `--mp-badge-size-sm-padding` | `0 var(--mp-sys-space-3)` | `padding` |
| `--mp-badge-size-sm-scale` | `0.8333` | `transform` |
| `--mp-badge-size-sm-space` | `var(--mp-sys-space-1)` | `margin-inline` |
| `--mp-badge-size-xl-border-radius` | `32px` | `border-radius` |
| `--mp-badge-size-xl-dot-height` | `8px` | `height` |
| `--mp-badge-size-xl-dot-width` | `8px` | `width` |
| `--mp-badge-size-xl-font-size` | `var(--mp-sys-font-size-lg)` | `font-size` |
| `--mp-badge-size-xl-height` | `32px` | `line-height`, `min-width` |
| `--mp-badge-size-xl-padding` | `0 10px` | `padding` |
| `--mp-badge-size-xl-scale` | `1` | `transform` |
| `--mp-badge-size-xl-space` | `var(--mp-sys-space-4)` | `margin-inline` |
| `--mp-badge-size-xs-border-radius` | `20px` | `border-radius` |
| `--mp-badge-size-xs-dot-height` | `4px` | `height` |
| `--mp-badge-size-xs-dot-width` | `4px` | `width` |
| `--mp-badge-size-xs-font-size` | `var(--mp-sys-font-size-xs)` | `font-size` |
| `--mp-badge-size-xs-height` | `20px` | `line-height`, `min-width` |
| `--mp-badge-size-xs-padding` | `0 var(--mp-sys-space-3)` | `padding` |
| `--mp-badge-size-xs-scale` | `0.6667` | `transform` |
| `--mp-badge-size-xs-space` | `0px` | `margin-inline` |
| `--mp-badge-status-danger-bg-color` | `rgb(var(--mp-danger-7))` | `background-color` |
| `--mp-badge-status-danger-text-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-badge-status-default-bg-color` | `#e0e0e0` | `background-color` |
| `--mp-badge-status-default-text-color` | `var(--mp-sys-color-content-on-bright)` | `color` |
| `--mp-badge-status-info-bg-color` | `var(--mp-sys-color-status-info)` | `background-color` |
| `--mp-badge-status-info-text-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-badge-status-primary-bg-color` | `var(--mp-sys-color-action-primary)` | `background-color` |
| `--mp-badge-status-primary-text-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-badge-status-secondary-bg-color` | `rgb(var(--mp-gray-6))` | `background-color` |
| `--mp-badge-status-secondary-text-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-badge-status-success-bg-color` | `var(--mp-sys-color-status-success)` | `background-color` |
| `--mp-badge-status-success-text-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-badge-status-tertiary-bg-color` | `rgb(var(--mp-gray-7))` | `background-color` |
| `--mp-badge-status-tertiary-text-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-badge-status-warning-bg-color` | `var(--mp-sys-color-status-warning)` | `background-color` |
| `--mp-badge-status-warning-text-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-badge-text-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-badge-variant-outline-bg-color` | `transparent` | `background-color` |
| `--mp-badge-variant-outline-status-danger-text-color` | `var(--mp-sys-color-content-danger)` | `border`, `color` |
| `--mp-badge-variant-outline-status-default-text-color` | `var(--mp-sys-color-content-primary)` | `border`, `color` |
| `--mp-badge-variant-outline-status-info-text-color` | `var(--mp-sys-color-content-info)` | `border`, `color` |
| `--mp-badge-variant-outline-status-primary-text-color` | `var(--mp-sys-color-content-brand)` | `border`, `color` |
| `--mp-badge-variant-outline-status-secondary-text-color` | `var(--mp-sys-color-content-secondary)` | `border`, `color` |
| `--mp-badge-variant-outline-status-success-text-color` | `var(--mp-sys-color-content-success)` | `border`, `color` |
| `--mp-badge-variant-outline-status-tertiary-text-color` | `var(--mp-sys-color-content-secondary)` | `border`, `color` |
| `--mp-badge-variant-outline-status-warning-text-color` | `var(--mp-sys-color-content-warning)` | `border`, `color` |
| `--mp-badge-variant-outline-text-color` | `var(--mp-sys-color-content-danger)` | `border`, `color` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-badge-bg-color: rgb(var(--mp-danger-7));
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->

### 颜色覆盖边界

bg-color 兜底和 danger 填充均使用红色背景与白色文字：浅色主题为 danger 第 7 阶，暗色主题为第 4 阶。中性固定浅灰与 secondary/tertiary 灰阶是有意的组件配色；border-color 隔离环可按宿主表面覆盖。自定义 color/text-color 由调用方保证对比度。
