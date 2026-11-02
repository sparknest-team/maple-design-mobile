# Progress 进度条

两端主体、API 与样式独立同源。

## 基础示例

### 基础用法

```demo
../example/demos/basic-usage.vue
```

## 外观与状态

### 进度尺寸与状态

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `size` | 五档预设或自定义长度；线形厚度、环形直径 | 进度尺寸与状态 |
| `percent` | 0–100 百分比，保留小数；支持十进制数字字符串，非法值归零，越界裁剪 | 进度尺寸与状态 |
| `mode` | 线形或环形 | 进度尺寸与状态 |
| `stroke-width` | 覆盖轨道厚度，数字按 px，字符串支持 CSS 长度 | 进度尺寸与状态 |
| `status` | default/primary/secondary/tertiary/info/success/warning/danger；default 确定进度达到 100 时推导 success | 进度尺寸与状态 |
<!-- demo-config-notes:end -->

在相同进度范围内比较尺寸和状态色；环形、分段和不确定进度保留独立模型。

```demo
../example/demos/appearance-comparison.vue
```

## 内容与展示

### 环形进度

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `percent` | 0–100 百分比，保留小数；支持十进制数字字符串，非法值归零，越界裁剪 | 环形进度、分段进度、不确定进度与动画 |
| `mode` | 线形或环形 | 环形进度、不确定进度与动画、渐变、起点、隐藏轨道与文本 |
| `size` | 五档预设或自定义长度；线形厚度、环形直径 | 环形进度、分段进度、更多样式与不确定进度 |
| `color` | 进度颜色或渐变 stop 映射，优先于 status | 环形进度、渐变、起点、隐藏轨道与文本、更多样式与不确定进度 |
| `status` | default/primary/secondary/tertiary/info/success/warning/danger；default 确定进度达到 100 时推导 success | 环形进度、分段进度、更多样式与不确定进度 |
| `track` | 显示背景轨道；false 同时隐藏缓冲装饰层 | 环形进度、渐变、起点、隐藏轨道与文本 |
<!-- demo-config-notes:end -->

```demo
../example/demos/circle.vue
```

### 分段进度

```demo
../example/demos/step.vue
```

### 不确定进度与动画

```demo
../example/demos/loop.vue
```

### 渐变、起点、隐藏轨道与文本

```demo
../example/demos/advanced.vue
```

### 更多样式与不确定进度

```demo
../example/demos/style.vue
```

```demo
../example/demos/indeterminate-progress.vue
```

## 阅读方向

线性进度从阅读起点增长，活动与不确定进度动画沿阅读方向运动。百分比、数值和圆环角度不反转，减少动态效果的设置仍生效。

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| mode | 线形或环形 | `line \| circle` | `line` |
| percent | 0–100 百分比，保留小数；支持十进制数字字符串，非法值归零，越界裁剪 | `number \| string` | `0` |
| size | 五档预设或自定义长度；线形厚度、环形直径 | `ProgressSize` | `md` |
| stroke-width | 覆盖轨道厚度，数字按 px，字符串支持 CSS 长度 | `number \| string` | 随 size |
| steps | 仅线形的分段数，向下取整并限制为 0–1000；不确定模式忽略 | `number` | `0` |
| status | default/primary/secondary/tertiary/info/success/warning/danger；default 确定进度达到 100 时推导 success | `ProgressStatus` | `default` |
| color | 进度颜色或渐变 stop 映射，优先于 status | `string \| Record<string, string>` | — |
| track-color | 背景轨道颜色 | `string` | — |
| buffer-color | 线形剩余轨道装饰色/渐变，不代表独立缓冲百分比 | `ProgressColor` | — |
| track | 显示背景轨道；false 同时隐藏缓冲装饰层 | `boolean` | `true` |
| show-text | 显示文本；xs 环形隐藏文本避免溢出 | `boolean` | `true` |
| text-class | 文本容器类名 | `string` | — |
| rotate | 环形起点从十二点顺时针旋转的角度 | `number` | `0` |
| animation | 确定线形进度扫光动画，不应用于 steps | `boolean` | `false` |
| indeterminate | 不确定进度；省略 aria-valuenow，不自动推导成功 | `boolean` | `false` |

### 尺寸语义

| size | xs | sm | md | lg | xl |
| --- | --- | --- | --- | --- | --- |
| 线形厚度 / 环形默认描边 (px) | 2 | 3 | 4 | 6 | 8 |
| 环形直径 (px) | 16 | 48 | 64 | 80 | 96 |

`size=12` / `size="12"` 表示 12px；`size="2rem"`、`"50%"`、`"calc(100% - 2px)"` 保留 CSS 长度。自定义线形 size 控制厚度，自定义环形 size 控制直径；stroke-width 始终优先控制厚度。非正数或非法长度回退 md。环形百分比直径需要父容器有明确宽度。五档均实际实现，xs 环形不显示文本。Cedar 未传 size 时继承 ConfigProvider，Maple 未传时默认 md。

### Slots

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| text | `{ percent: number }` | 优先级高于 default |
| default | `{ percent: number }` | 自定义显示文本 |

不确定进度默认显示省略号，可用 text 插槽提供业务文案。组件本身不操作值、无更新事件；请提供 `aria-label` 标识业务任务。所有内置动画尊重系统减少动态效果设置。

### 类型定义

导出 `ProgressProps`、`ProgressInstance`、`ProgressSize`、`ProgressMode`、`ProgressStatus`、`ProgressColor` 和运行时 `progressProps`。

### 样式变量

| 变量 | 默认值 |
| --- | --- |
| `--mp-progress-font-size` | `var(--mp-sys-font-size-sm)` |
| `--mp-progress-text-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-progress-track-color` | `var(--mp-sys-color-state-hover)` |
| `--mp-progress-default-color` | `var(--mp-sys-color-content-brand)` |
| `--mp-progress-primary-color` | `var(--mp-sys-color-content-brand)` |
| `--mp-progress-secondary-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-progress-tertiary-color` | `var(--mp-sys-color-content-tertiary)` |
| `--mp-progress-info-color` | `var(--mp-sys-color-content-info)` |
| `--mp-progress-success-color` | `var(--mp-sys-color-content-success)` |
| `--mp-progress-warning-color` | `var(--mp-sys-color-content-warning)` |
| `--mp-progress-danger-color` | `var(--mp-sys-color-content-danger)` |
| `--mp-progress-line-border-radius` | `9999px` |
| `--mp-progress-text-gap` | `var(--mp-sys-space-4)` |
| `--mp-progress-steps-gap` | `var(--mp-sys-space-2)` |
| `--mp-progress-transition-duration` | `var(--mp-sys-motion-duration-standard)` |
| `--mp-progress-animation-duration` | `1.5s` |

环形确定进度的 success/danger 默认显示完成/失败图标（包括 xs）；text 插槽可覆盖，ARIA 数值始终保留。
