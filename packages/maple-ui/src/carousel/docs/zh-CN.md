# 轮播

### 介绍

显示可以在屏幕上滚动和滑动的项目集合。示例与 Cedar Design Web 保持一致；两端均支持 `effect`、`centered-slides`。

### 基本使用

```demo
../example/demos/basic-usage.vue
```

### 禁止循环轮播

```demo
../example/demos/forbid-loop.vue
```

### 开启自动播放

示例使用 2000ms 间隔，显示页码从 1 开始（API 索引仍从 0 开始）。开关支持停止与继续；焦点在轮播内部时自动暂停。

通过 `auto-play` 开启自动播放。传入 `true` 使用默认间隔 3000ms；传入数字则作为间隔（毫秒）。

```demo
../example/demos/autoplay.vue
```

### 自动播放悬停暂停

```demo
../example/demos/autoplay-hover-pause.vue
```

### 垂直轮播

```demo
../example/demos/vertical.vue
```

### 切换箭头

通过 `show-arrow` 控制切换箭头的显示时机，支持 `always`、`hover`、`never`。两端默认 `always`。

```demo
../example/demos/navigation.vue
```

### 滑动效果（默认）

```demo
../example/demos/effect-slide.vue
```

### 淡入淡出效果

```demo
../example/demos/effect-fade.vue
```

### 卡片效果

```demo
../example/demos/effect-card.vue
```

### 多图同屏

```demo
../example/demos/multi-slides.vue
```

### 居中当前滑块

```demo
../example/demos/centered-slides.vue
```

### 指示器类型

通过 `indicator-type` 设置指示器类型，支持 `dot`、`line`、`slider`。隐藏指示器请使用 `indicator`。

```demo
../example/demos/indicator-type.vue
```

### 指示器位置

```demo
../example/demos/indicator-position.vue
```

### 悬停触发

```demo
../example/demos/trigger-hover.vue
```

### 鼠标滚轮控制

```demo
../example/demos/mousewheel.vue
```

### 键盘控制

```demo
../example/demos/keyboard.vue
```

### 自定义指示器

```demo
../example/demos/custom-indicator.vue
```

### 监听切换

```demo
../example/demos/handle-change.vue
```

### controlled

```demo
../example/demos/controlled.vue
```

### auto-sized

```demo
../example/demos/auto-sized.vue
```

### interactive-content

```demo
../example/demos/interactive-content.vue
```

## API

### Carousel Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `current` | 受控索引，零基 | `number` | `undefined` |
| `default-current` | 非受控初始索引 | `number` | `0` |
| `loop` | 循环，跨边界不复制实例 | `boolean` | `true` |
| `auto-play` | 自动播放及间隔 | `boolean \| number \| CarouselAutoPlayConfig` | `false` |
| `move-speed` | 显式切换时长（毫秒） | `number` | `undefined (token)` |
| `trigger` | 指示器触发方式 | `click \| hover` | `click` |
| `direction` | 内部滑动方向 | `horizontal \| vertical` | `horizontal` |
| `show-arrow` | 箭头显示策略 | `always \| hover \| never` | `always` |
| `arrow-class` | 箭头附加类 | `string` | `undefined` |
| `indicator` | 显示指示器 | `boolean` | `true` |
| `indicator-type` | 指示器样式 | `dot \| line \| slider` | `dot` |
| `indicator-position` | 指示器位置 | `bottom \| top \| left \| right \| outer` | `bottom` |
| `indicator-class` | 指示器附加类 | `string` | `undefined` |
| `indicator-color` | 自定义指示器背景 | `string` | `undefined` |
| `height` | 容器高度，数字为px | `number \| string` | `undefined` |
| `transition-timing-function` | 显式缓动曲线 | `string` | `undefined (token)` |
| `touchable` | 触摸拖动 | `boolean` | `true` |
| `draggable` | 鼠标拖动，可与触摸并存 | `boolean` | `false` |
| `mousewheel` | 滚轮切换 | `boolean` | `false` |
| `keyboard` | 组件内方向键/Home/End | `boolean` | `false` |
| `slides-per-view` | 同时显示页数；auto使用子项宽高 | `number \| auto` | `1` |
| `space-between` | 项间距；数字/数字字符串为px | `number \| string` | `0` |
| `effect` | 视觉效果，两端全部支持 | `slide \| fade \| card` | `slide` |
| `centered-slides` | 当前页居中 | `boolean` | `false` |
| `aria-label` | 轮播可访问名称 | `string` | Locale |
| `previous-button-aria-label` | 上一页按钮名称 | `string` | Locale |
| `next-button-aria-label` | 下一页按钮名称 | `string` | Locale |

### 模型与交互
索引从零开始。受控操作先发 update:current，再发 change(index, previousIndex, isManual)，父级接受 current 前不移动；外部赋值不补发 change。方法 options 的 event:false 只关闭 change，不吞掉模型提议。用户操作的 isManual 为 true，自动播放为 false。

loop 跨边界移动原有子项，不复制组件实例。非循环且未居中时，末尾视区钳制以避免留白，选中项可能在最后一组可见项内移动而不再移动轨道。部分可见页保持可访问，完全离屏页 inert。fade 固定展示一页；auto 使用 CarouselItem 显式 width（横向）或 height（纵向），纵向需提供容器高度。默认插槽只统计 CarouselItem（可包在 Vue Fragment 中），注释、普通元素不成为页。

auto-play=true 使用 3000ms 且悬停暂停，数字指定毫秒且不启用悬停暂停；对象配置 interval/hoverToPause。焦点在组件内、拖动中、文档/祖先隐藏、KeepAlive 停用始终暂停。尊重减少动态效果偏好。输入框、按钮等交互子项保留原生行为，自定义交互区域可加 data-carousel-no-drag。show-arrow=hover 在键盘聚焦时也显示。

### Events
| 事件 | 参数 |
| --- | --- |
| update:current | index: number |
| change | index: number, previousIndex: number, isManual: boolean |

### Slots
| 插槽 | 参数 |
| --- | --- |
| default | CarouselItem |
| prev / next / indicator | { index, length, hovering, prev, next, to, resize } |

### Methods
| 方法 | 签名 |
| --- | --- |
| prev / next | (options?: CarouselToOptions) => void |
| to | (index: number, options?: CarouselToOptions) => void |
| resize | () => void |

CarouselItem 无自有 Props、事件或方法；默认插槽为页面内容。

### Types
CarouselProps, CarouselItemProps, CarouselInstance, CarouselItemInstance, CarouselEmits, CarouselSlots, CarouselItemSlots, CarouselExpose, CarouselSlotScope, CarouselToOptions, CarouselChangeData, CarouselDirection, CarouselEffect, CarouselAutoPlayConfig, CarouselArrowType, CarouselIndicatorType, CarouselIndicatorPosition, CarouselTriggerEvent.

### 样式变量

| Token | 默认值 |
| --- | --- |
| `--mp-carousel-indicator-dot-size` | `8px` |
| `--mp-carousel-indicator-position` | `var(--mp-sys-space-4)` |
| `--mp-carousel-indicator-gap` | `var(--mp-sys-space-3)` |
| `--mp-carousel-indicator-color-default` | `rgb(255 255 255 / 35%)` |
| `--mp-carousel-indicator-color-active` | `var(--mp-sys-color-content-on-dark)` |
| `--mp-carousel-indicator-outer-margin-bottom` | `var(--mp-sys-space-8)` |
| `--mp-carousel-indicator-line-width` | `20px` |
| `--mp-carousel-indicator-line-height` | `3px` |
| `--mp-carousel-indicator-line-border-radius` | `var(--mp-sys-radius-sm)` |
| `--mp-carousel-arrow-size` | `var(--mp-sys-control-height-md)` |
| `--mp-carousel-arrow-font-size` | `var(--mp-sys-font-size-xl)` |
| `--mp-carousel-arrow-margin` | `var(--mp-sys-space-4)` |
| `--mp-carousel-arrow-color` | `var(--mp-sys-color-content-on-dark)` |
| `--mp-carousel-arrow-background` | `rgb(0 0 0 / 35%)` |
| `--mp-carousel-arrow-background-hover` | `rgb(0 0 0 / 55%)` |
| `--mp-carousel-arrow-disabled-opacity` | `0.4` |
| `--mp-carousel-navigation-z-index` | `10` |
| `--mp-carousel-transition-duration` | `var(--mp-sys-motion-duration-standard)` |
| `--mp-carousel-transition-timing-function` | `ease` |
| `--mp-carousel-fade-duration` | `var(--mp-sys-motion-duration-standard)` |
| `--mp-carousel-card-duration` | `var(--mp-sys-motion-duration-standard)` |
| `--mp-carousel-card-scale` | `0.85` |
| `--mp-carousel-card-opacity` | `0.6` |
| `--mp-carousel-focus-width` | `2px` |
| `--mp-carousel-focus-offset` | `2px` |
| `--mp-carousel-focus-color` | `var(--mp-sys-color-content-brand)` |


### 循环过渡边界

每个轮播项始终只有一个组件实例。普通上一页/下一页在出场项离开后回收位置；跨多页或居中跳转若需要同一项同时占据两个位置，则直接无动画定位，不复制交互内容，也不排队执行无限过渡。项目数量小于可视页数时不会复制项目填满。可访问名称跟随全局 Locale，显式标签属性优先。
