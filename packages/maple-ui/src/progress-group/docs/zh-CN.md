# ProgressGroup 分段进度条

### 介绍

将多个数值展示为同一条进度轨中的分段，并提供对应图例。

### 基础用法

```demo
../example/demos/basic.vue
```

### 进度轨尺寸

```demo
../example/demos/size.vue
```

### 排列方向

```demo
../example/demos/orientation.vue
```

### 环形分段进度

```demo
../example/demos/circle.vue
```

### 默认颜色与纯进度轨

```demo
../example/demos/color.vue
```

### 自定义内容

```demo
../example/demos/custom.vue
```

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 分段数据 | `ProgressGroupItem[]` | `[]` |
| mode | 展示模式 | `line \| circle` | `line` |
| max | 计算占比时的总值 | `number` | `100` |
| status | 是否展示累计百分比 | `boolean` | `false` |
| size | 进度轨尺寸 | `xs \| sm \| md \| lg \| xl` | `md` |
| color | 默认分段颜色 | `string` | `content-brand` |
| circle-size | 环形模式的直径 | `number \| string` | `120` |
| stroke-width | 环形模式的轨道宽度 | `number` | `8` |
| tooltip | 是否显示分段悬浮/聚焦提示 | `boolean` | `true` |
| orientation | 排列方向 | `horizontal \| vertical` | `horizontal` |

### Slots

| 名称 | 插槽参数 |
| --- | --- |
| status | `{ percent, value, max }` |
| tooltip | `{ item, index, percent }` |
| item / item-leading / item-label / item-trailing | `{ item, index, percent }` |

### 样式变量

| 变量 | 默认值 |
| --- | --- |
| `--mp-progress-group-gap` | `8px` |
| `--mp-progress-group-item-gap` | `6px` |
| `--mp-progress-group-dot-size` | `8px` |
| `--mp-progress-group-radius` | `999px` |
| `--mp-progress-group-track-color` | `var(--mp-sys-color-state-hover)` |
| `--mp-progress-group-text-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-progress-group-muted-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-progress-group-font-size` | `14px` |
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
| `--mp-progress-group-status-font-weight` | `var(--mp-sys-font-weight-medium)` |
| `--mp-progress-group-size-xs-thickness` | `2px` |
| `--mp-progress-group-size-sm-thickness` | `4px` |
| `--mp-progress-group-size-md-thickness` | `8px` |
| `--mp-progress-group-size-lg-thickness` | `12px` |
| `--mp-progress-group-size-xl-thickness` | `16px` |
