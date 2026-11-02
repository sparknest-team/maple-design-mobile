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

size 五档均实现，仅影响线形厚度（2/4/8/12/16px）；环形用 circle-size（支持 number/CSS长度）和 stroke-width。累计文本开关为 show-text，自定义插槽为 text，已删除旧布尔 status / status 插槽。

### 自定义内容

```demo
../example/demos/custom.vue
```

## 阅读方向

横向分段、高亮与提示使用同一逻辑起点；垂直进度仍从上到下，圆环保持原有角度与数据顺序。

## API

### Props

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

### Slots

| 名称 | 插槽参数 |
| --- | --- |
| text | `{ percent, value, max }` |
| tooltip | `{ item, index, percent }` |
| item / item-leading / item-label / item-trailing | `{ item, index, percent }` |

### 样式变量

| 变量 | 默认值 |
| --- | --- |
| `--mp-progress-group-gap` | `var(--mp-sys-space-3)` |
| `--mp-progress-group-item-gap` | `var(--mp-sys-space-2)` |
| `--mp-progress-group-dot-size` | `var(--mp-sys-space-4)` |
| `--mp-progress-group-radius` | `9999px` |
| `--mp-progress-group-track-color` | `var(--mp-sys-color-state-hover)` |
| `--mp-progress-group-text-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-progress-group-muted-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-progress-group-font-size` | `var(--mp-sys-font-size-sm)` |
| `--mp-progress-group-tooltip-bg` | `var(--mp-sys-color-surface-tooltip)` |
| `--mp-progress-group-tooltip-color` | `var(--mp-sys-color-content-on-dark)` |

图形标记默认使用 system content-brand。颜色优先级：item.color → 组件 color → 默认值。自定义颜色需自行验证对比度；几何 Token 保留平台差异。

### Geometry and motion variables

Built-in effects respect `prefers-reduced-motion: reduce`. Track thickness applies to both horizontal and vertical layouts; circle geometry remains prop-driven.

| Token | Default |
| --- | --- |
| `--mp-progress-group-transition-duration` | `var(--mp-sys-motion-duration-standard)` |
| `--mp-progress-group-tooltip-duration` | `var(--mp-sys-motion-duration-fast)` |
| `--mp-progress-group-tooltip-max-width` | `240px` |
| `--mp-progress-group-tooltip-padding` | `5px var(--mp-sys-space-4)` |
| `--mp-progress-group-tooltip-radius` | `var(--mp-sys-radius-md)` |
| `--mp-progress-group-tooltip-font-size` | `var(--mp-sys-font-size-xs)` |
| `--mp-progress-group-tooltip-line-height` | `1.4` |
| `--mp-progress-group-tooltip-offset` | `var(--mp-sys-space-4)` |
| `--mp-progress-group-text-font-weight` | `var(--mp-sys-font-weight-medium)` |
| `--mp-progress-group-size-xs-thickness` | `2px` |
| `--mp-progress-group-size-sm-thickness` | `4px` |
| `--mp-progress-group-size-md-thickness` | `8px` |
| `--mp-progress-group-size-lg-thickness` | `12px` |
| `--mp-progress-group-size-xl-thickness` | `16px` |
