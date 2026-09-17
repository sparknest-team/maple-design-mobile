# 轮播

### 介绍

显示可以在屏幕上滚动和滑动的项目集合。示例与 Cedar Design Web 保持一致；`effect`、`centered-slides` 为移动端能力。

### 基本使用

```demo
../example/demos/basic-usage.vue
```

### 禁止循环轮播

```demo
../example/demos/forbid-loop.vue
```

### 开启自动播放

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

通过 `show-arrow` 控制切换箭头的显示时机，支持 `always`、`hover`、`never`。移动端默认 `never`。

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

## API

### 属性

#### Carousel Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `current`(v-model) | 当前展示索引（0-based） | _number_ | `-` |
| `default-current` | 当前展示索引默认值（0-based） | _number_ | `0` |
| `loop` | 是否循环轮播 | _boolean_ | `true` |
| `auto-play` | 是否自动播放；`true` 为 3000ms，数字为间隔毫秒，或 `{ interval, hoverToPause }` | _boolean \| number \| CarouselAutoPlayConfig_ | `false` |
| `move-speed` | 切换动画时长(ms) | _string \| number_ | `300` |
| `trigger` | 指示器的触发方式 | _CarouselTriggerEvent_ | `click` |
| `direction` | 轮播方向 | _'horizontal' \| 'vertical'_ | `horizontal` |
| `show-arrow` | 切换箭头显示时机 | _CarouselArrowType_ | `never` |
| `arrow-class` | 切换箭头自定义 class | _string_ | `-` |
| `indicator` | 是否显示指示器 | _boolean_ | `true` |
| `indicator-type` | 指示器类型 | _CarouselIndicatorType_ | `dot` |
| `indicator-position` | 指示器位置 | _CarouselIndicatorPosition_ | `bottom` |
| `indicator-class` | 指示器自定义 class | _string_ | `-` |
| `indicator-color` | 指示器颜色 | _string_ | `-` |
| `height` | 轮播容器高度 | _string_ | `-` |
| `transition-timing-function` | 动画过渡曲线 | _string_ | `cubic-bezier(0.25, 0.8, 0.5, 1)` |
| `touchable` | 是否允许触摸滑动 | _boolean_ | `true` |
| `draggable` | 是否允许鼠标拖拽切换 | _boolean_ | `false` |
| `mousewheel` | 是否允许鼠标滚轮切换 | _boolean_ | `false` |
| `keyboard` | 是否允许键盘方向键切换 | _boolean_ | `false` |
| `slides-per-view` | 每屏显示的 slide 数量，`'auto'` 时由 slide 自身宽度决定 | _number \| 'auto'_ | `1` |
| `space-between` | slide 之间的间距 | _string \| number_ | `0` |
| `effect` | 切换动画类型（移动端） | _CarouselEffect_ | `slide` |
| `centered-slides` | 居中当前 slide（需配合 `slides-per-view`，移动端） | _boolean_ | `false` |

### 事件

#### Carousel Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `update:current` | v-model 绑定值更新时触发（0-based） | `index: number` |
| `change` | 幻灯片发生切换时的回调函数（0-based） | `index: number` <br/> `prevIndex: number` <br/> `isManual: boolean` |

### 插槽

#### Carousel Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 轮播项内容，放置 `CarouselItem` | `-` |
| `prev` | 自定义上一页按钮 | `{ index, length, prev, next, to, hovering }` |
| `next` | 自定义下一页按钮 | `{ index, length, prev, next, to, hovering }` |
| `indicator` | 自定义指示器 | `{ index, length, prev, next, to, hovering }` |

### 方法

#### Carousel Methods

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| `resize` | 重新计算轮播尺寸 | `-` | `-` |
| `next` | 切换到下一页 | `options?: CarouselToOptions` | `-` |
| `prev` | 切换到上一页 | `options?: CarouselToOptions` | `-` |
| `to` | 跳转到指定索引 | `index: number, options?: CarouselToOptions` | `-` |

### 类型定义

```ts
type CarouselTriggerEvent = 'click' | 'hover'
type CarouselArrowType = 'always' | 'hover' | 'never'
type CarouselIndicatorType = 'dot' | 'line' | 'slider'
type CarouselIndicatorPosition = 'bottom' | 'top' | 'left' | 'right' | 'outer'
type CarouselEffect = 'slide' | 'fade' | 'card'
type CarouselAutoPlayConfig = {
  interval?: number
  hoverToPause?: boolean
}
type CarouselToOptions = {
  event?: boolean
  isManual?: boolean
}
```

### 样式变量

以下为组件使用的 CSS 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

#### Carousel Variables

| 变量名 | 默认值 |
| --- | --- |
| `--carousel-indicator-color` | `#fff` |
| `--carousel-indicators-offset` | `10px` |
| `--carousel-indicator-offset` | `4px` |
| `--carousel-navigation-z-index` | `9` |
| `--carousel-navigation-button-width` | `36px` |
| `--carousel-navigation-button-height` | `36px` |
| `--carousel-navigation-button-border-radius` | `50%` |
| `--carousel-navigation-button-background` | `rgba(0, 0, 0, 0.35)` |
| `--carousel-navigation-button-color` | `#fff` |
| `--carousel-navigation-icon-size` | `20px` |
| `--carousel-navigation-prev-left` | `8px` |
| `--carousel-navigation-next-right` | `8px` |
| `--carousel-navigation-prev-top` | `8px` |
| `--carousel-navigation-next-bottom` | `8px` |
