# ProgressGroup 分段进度条

### 介绍

将多个数值展示为同一条进度轨中的分段，并提供对应图例。

## 基础示例

### 基础用法

```demo
../example/demos/basic.vue
```

## 外观与状态

### 进度组尺寸与颜色

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `items` | 分段数据 | 进度组尺寸与颜色 |
| `size` | 进度轨尺寸 | 进度组尺寸与颜色 |
| `color` | 默认分段颜色 | 进度组尺寸与颜色 |
| `show-text` | 是否展示累计百分比 | 进度组尺寸与颜色 |
<!-- demo-config-notes:end -->

比较同类分段数据的尺寸和颜色覆盖；方向、环形布局、总量溢出与键盘操作另行展示。

```demo
../example/demos/appearance-comparison.vue
```

## 布局与排列

### 排列方向

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `items` | 分段数据 | 排列方向 |
| `show-text` | 是否展示累计百分比 | 排列方向 |
| `orientation` | 线形进度轨的横纵朝向，默认 horizontal；仅 mode=line 生效 | 排列方向 |
| `size` | 进度轨尺寸 | 排列方向 |
<!-- demo-config-notes:end -->

```demo
../example/demos/orientation.vue
```

## 内容与展示

### 环形分段进度

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `mode` | 展示模式 | 环形分段进度 |
| `items` | 分段数据 | 环形分段进度 |
| `show-text` | 是否展示累计百分比 | 环形分段进度 |
| `circle-size` | 环形模式的直径 | 环形分段进度 |
| `stroke-width` | 环形模式的轨道宽度 | 环形分段进度 |
<!-- demo-config-notes:end -->

```demo
../example/demos/circle.vue
```

## 交互与控制

### 超额数据与键盘提示

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `items` | 分段数据 | 超额数据与键盘提示、自定义内容 |
| `max` | 计算占比时的总值 | 超额数据与键盘提示、自定义内容 |
| `show-text` | 是否展示累计百分比 | 超额数据与键盘提示、自定义内容 |
| `tooltip` | 是否显示分段悬浮/聚焦提示 | 超额数据与键盘提示 |
| `aria-label` | 分组的无障碍名称 | 超额数据与键盘提示 |
| `mode` | 展示模式 | 超额数据与键盘提示 |
<!-- demo-config-notes:end -->

示例按钮由父级更新 `max`、`items` 和 `tooltip`，同步驱动线形与环形；它们不是组件内置的编辑事件。可切换容量 100/200、清空/恢复数据、关闭/开启提示。关闭提示后分段不再进入 Tab 顺序，清空后不保留提示。鼠标悬浮优先于键盘焦点，离开悬浮段后回到焦点段提示。

```demo
../example/demos/overflow-keyboard.vue
```

线形与环形按数据顺序累计裁剪到 max；图例和提示仍保留每项原始占比。例如 70+50 时第二段实际显示 30%，图例仍为 50%。非有限值和负数归零，非法 max 回退 100。Tab 聚焦可见分段展示提示，Escape 关闭；鼠标离开不会关闭仍处于焦点的提示。用 aria-label 为整个分组命名。

size 五档均实现，仅影响线形厚度（2/4/8/12/16px）；环形用 circle-size（支持 number/CSS长度）和 stroke-width。累计文本开关为 show-text，自定义插槽为 text。

### 自定义内容

```demo
../example/demos/custom.vue
```

## 阅读方向

横向分段、高亮与提示使用同一逻辑起点；垂直进度仍从上到下，圆环保持原有角度与数据顺序。

## 使用说明

### 布局与动效
内置动效遵循 `prefers-reduced-motion: reduce`。线形厚度同时适用于横向和纵向布局；环形尺寸通过属性配置。


`orientation` 只控制线形布局，圆环的图例排列不随它变化。圆环 `stroke-width` 是 100×100 SVG 坐标中的数值，不是 CSS 长度。提供 `text` 插槽时，即使 `show-text=false` 也会显示该槽。设置 `item.slot` 后使用该前缀及其 `-leading`、`-label`、`-trailing` 槽；未提供的动态槽使用内置内容，不回退到通用 `item-*` 槽。

提示支持鼠标移入和停留，离开后恢复焦点对应的提示；Escape 可关闭。提示内容用于说明，请勿放入可交互表单控件。

## API

### ProgressGroup Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| aria-label | 分组的无障碍名称 | `string` | — |
| items | 分段数据 | `ProgressGroupItem[]` | `[]` |
| mode | 展示模式 | `line \| circle` | `line` |
| max | 计算占比时的总值 | `number` | `100` |
| show-text | 是否展示累计百分比 | `boolean` | `false` |
| size | 进度轨尺寸 | `xs \| sm \| md \| lg \| xl` | `md` |
| color | 默认分段颜色 | `string` | `content-brand` |
| circle-size | 环形模式的直径 | `number \| string` | `120` |
| stroke-width | 环形模式的轨道宽度 | `number` | `8` |
| tooltip | 是否显示分段悬浮/聚焦提示 | `boolean` | `true` |
| orientation | 线形进度轨的横纵朝向，默认 horizontal；仅 mode=line 生效 | `horizontal \| vertical` | `horizontal` |

### ProgressGroup Slots

| 名称 | 插槽参数 |
| --- | --- |
| text | `{ percent, value, max }` |
| tooltip | `{ item, index, percent }` |
| item / item-leading / item-label / item-trailing | `{ item, index, percent }` |

### ProgressGroupItem Props

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| label | 图例名称 | `string` |
| value | 分段数值 | `number` |
| color | 分段颜色 | `string` |
| icon | 图例图标组件 | `Component` |
| slot | 自定义插槽名前缀 | `string` |
| class | 图例项附加类名 | `string` |
| tip | 自定义提示文案 | `string` |

## CSS Variables

图形标记默认使用 system content-brand。颜色优先级：item.color → 组件 color → 默认值。自定义颜色需自行验证对比度；几何 Token 保留平台差异。

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-progress-group-dot-size` | `var(--mp-sys-space-4)` | `height`, `width` |
| `--mp-progress-group-font-size` | `var(--mp-sys-font-size-sm)` | `font-size` |
| `--mp-progress-group-gap` | `var(--mp-sys-space-3)` | `gap` |
| `--mp-progress-group-item-gap` | `var(--mp-sys-space-2)` | `gap` |
| `--mp-progress-group-muted-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-progress-group-radius` | `9999px` | `border-radius`, `clip-path` |
| `--mp-progress-group-size-lg-thickness` | `12px` | `height`, `width` |
| `--mp-progress-group-size-md-thickness` | `8px` | `height`, `width` |
| `--mp-progress-group-size-sm-thickness` | `4px` | `height`, `width` |
| `--mp-progress-group-size-xl-thickness` | `16px` | `height`, `width` |
| `--mp-progress-group-size-xs-thickness` | `2px` | `height`, `width` |
| `--mp-progress-group-text-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-progress-group-text-font-weight` | `var(--mp-sys-font-weight-medium)` | `font-weight` |
| `--mp-progress-group-tooltip-bg` | `var(--mp-sys-color-surface-tooltip)` | `background` |
| `--mp-progress-group-tooltip-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-progress-group-tooltip-duration` | `var(--mp-sys-motion-duration-fast)` | `animation` |
| `--mp-progress-group-tooltip-font-size` | `var(--mp-sys-font-size-xs)` | `font-size` |
| `--mp-progress-group-tooltip-line-height` | `1.4` | `line-height` |
| `--mp-progress-group-tooltip-max-width` | `240px` | `max-width` |
| `--mp-progress-group-tooltip-offset` | `var(--mp-sys-space-4)` | `bottom`, `height`, `inset-inline-start`, `width` |
| `--mp-progress-group-tooltip-padding` | `5px var(--mp-sys-space-4)` | `padding` |
| `--mp-progress-group-tooltip-radius` | `var(--mp-sys-radius-md)` | `border-radius` |
| `--mp-progress-group-track-color` | `var(--mp-sys-color-state-hover)` | `background`, `stroke` |
| `--mp-progress-group-transition-duration` | `var(--mp-sys-motion-duration-standard)` | `animation`, `transition` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-progress-group-dot-size: var(--mp-sys-space-4);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
