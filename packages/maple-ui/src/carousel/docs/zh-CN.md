# 轮播

### 介绍

显示可以在屏幕上滚动和滑动的项目集合。支持滑动、淡入淡出和卡片三种效果，多图同屏展示以及多种导航样式。

### 基本使用

```html
<template>
  <mp-carousel class="carousel-example">
    <mp-carousel-item>
      <img class="carousel-example-image" src="/cat.jpg">
    </mp-carousel-item>
    <mp-carousel-item>
      <img class="carousel-example-image" src="/cat2.jpg">
    </mp-carousel-item>
    <mp-carousel-item>
      <img class="carousel-example-image" src="/cat3.jpg">
    </mp-carousel-item>
  </mp-carousel>
</template>

<style>
.carousel-example {
  height: 160px;
}

.carousel-example-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}
</style>
```

### 禁止循环轮播

```html
<template>
  <mp-carousel class="carousel-example" :loop="false">
    <mp-carousel-item>
      <img class="carousel-example-image" src="/cat.jpg">
    </mp-carousel-item>
    <mp-carousel-item>
      <img class="carousel-example-image" src="/cat2.jpg">
    </mp-carousel-item>
    <mp-carousel-item>
      <img class="carousel-example-image" src="/cat3.jpg">
    </mp-carousel-item>
  </mp-carousel>
</template>

<style>
.carousel-example {
  height: 160px;
}

.carousel-example-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}
</style>
```

### 开启自动播放

```html
<template>
  <mp-carousel class="carousel-example" :autoplay="2000">
    <mp-carousel-item>
      <img class="carousel-example-image" src="/cat.jpg">
    </mp-carousel-item>
    <mp-carousel-item>
      <img class="carousel-example-image" src="/cat2.jpg">
    </mp-carousel-item>
    <mp-carousel-item>
      <img class="carousel-example-image" src="/cat3.jpg">
    </mp-carousel-item>
  </mp-carousel>
</template>

<style>
.carousel-example {
  height: 160px;
}

.carousel-example-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}
</style>
```

### 自动播放悬停暂停

```html
<template>
  <mp-carousel class="carousel-example" :autoplay="{ interval: 2000, hoverToPause: true }">
    <mp-carousel-item>
      <img class="carousel-example-image" src="/cat.jpg">
    </mp-carousel-item>
    <mp-carousel-item>
      <img class="carousel-example-image" src="/cat2.jpg">
    </mp-carousel-item>
    <mp-carousel-item>
      <img class="carousel-example-image" src="/cat3.jpg">
    </mp-carousel-item>
  </mp-carousel>
</template>

<style>
.carousel-example {
  height: 160px;
}

.carousel-example-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}
</style>
```

### 垂直轮播

```html
<template>
  <mp-carousel class="carousel-example" vertical>
    <mp-carousel-item>
      <img class="carousel-example-image" src="/cat.jpg">
    </mp-carousel-item>
    <mp-carousel-item>
      <img class="carousel-example-image" src="/cat2.jpg">
    </mp-carousel-item>
    <mp-carousel-item>
      <img class="carousel-example-image" src="/cat3.jpg">
    </mp-carousel-item>
  </mp-carousel>
</template>

<style>
.carousel-example {
  height: 160px;
}

.carousel-example-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}
</style>
```

### 导航

通过设置 `navigation` 可开启导航按钮, 当 `navigation` 为 `hover` 时，可在指针悬浮时对导航按钮进行显示。

```html
<template>
  <mp-carousel class="carousel-example" navigation>
    <mp-carousel-item>
      <img class="carousel-example-image" src="/cat.jpg">
    </mp-carousel-item>
    <mp-carousel-item>
      <img class="carousel-example-image" src="/cat2.jpg">
    </mp-carousel-item>
    <mp-carousel-item>
      <img class="carousel-example-image" src="/cat3.jpg">
    </mp-carousel-item>
  </mp-carousel>

  <mp-carousel class="carousel-example" navigation="hover">
    <mp-carousel-item>
      <img class="carousel-example-image" src="/cat.jpg">
    </mp-carousel-item>
    <mp-carousel-item>
      <img class="carousel-example-image" src="/cat2.jpg">
    </mp-carousel-item>
    <mp-carousel-item>
      <img class="carousel-example-image" src="/cat3.jpg">
    </mp-carousel-item>
  </mp-carousel>
</template>

<style>
.carousel-example {
  height: 160px;
  margin-top: 14px;
}

.carousel-example-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}
</style>
```

### 滑动效果（默认）

```html
<template>
  <mp-carousel class="carousel-example" effect="slide">
    <mp-carousel-item>
      <img class="carousel-example-image" src="/cat.jpg">
    </mp-carousel-item>
    <mp-carousel-item>
      <img class="carousel-example-image" src="/cat2.jpg">
    </mp-carousel-item>
    <mp-carousel-item>
      <img class="carousel-example-image" src="/cat3.jpg">
    </mp-carousel-item>
  </mp-carousel>
</template>

<style>
.carousel-example {
  height: 160px;
}

.carousel-example-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}
</style>
```

### 淡入淡出效果

```html
<template>
  <mp-carousel class="carousel-example" effect="fade">
    <mp-carousel-item>
      <img class="carousel-example-image" src="/cat.jpg">
    </mp-carousel-item>
    <mp-carousel-item>
      <img class="carousel-example-image" src="/cat2.jpg">
    </mp-carousel-item>
    <mp-carousel-item>
      <img class="carousel-example-image" src="/cat3.jpg">
    </mp-carousel-item>
  </mp-carousel>
</template>

<style>
.carousel-example {
  height: 160px;
}

.carousel-example-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}
</style>
```

### 卡片效果

```html
<template>
  <mp-carousel class="carousel-example" effect="card">
    <mp-carousel-item>
      <img class="carousel-example-image" src="/cat.jpg">
    </mp-carousel-item>
    <mp-carousel-item>
      <img class="carousel-example-image" src="/cat2.jpg">
    </mp-carousel-item>
    <mp-carousel-item>
      <img class="carousel-example-image" src="/cat3.jpg">
    </mp-carousel-item>
  </mp-carousel>
</template>

<style>
.carousel-example {
  height: 160px;
}

.carousel-example-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}
</style>
```

### 多图同屏

```html
<template>
  <mp-carousel class="carousel-example" :slides-per-view="2.5" :space-between="10">
    <mp-carousel-item v-for="i in 6" :key="i">
      <div class="carousel-custom-slide">{{ i }}</div>
    </mp-carousel-item>
  </mp-carousel>
</template>

<style>
.carousel-example {
  height: 160px;
}

.carousel-custom-slide {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #4a90d9;
  color: #fff;
  font-size: 24px;
  font-weight: bold;
}
</style>
```

### 居中当前滑块

```html
<template>
  <mp-carousel class="carousel-example" :slides-per-view="1.5" :space-between="10" centered-slides>
    <mp-carousel-item v-for="i in 5" :key="i">
      <div class="carousel-custom-slide">{{ i }}</div>
    </mp-carousel-item>
  </mp-carousel>
</template>

<style>
.carousel-example {
  height: 160px;
}

.carousel-custom-slide {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #4a90d9;
  color: #fff;
  font-size: 24px;
  font-weight: bold;
}
</style>
```

### 指示器类型

```html
<template>
  <h4>圆点</h4>
  <mp-carousel class="carousel-example" indicator-type="dot">
    <mp-carousel-item>
      <img class="carousel-example-image" src="/cat.jpg">
    </mp-carousel-item>
    <mp-carousel-item>
      <img class="carousel-example-image" src="/cat2.jpg">
    </mp-carousel-item>
    <mp-carousel-item>
      <img class="carousel-example-image" src="/cat3.jpg">
    </mp-carousel-item>
  </mp-carousel>

  <h4>线条</h4>
  <mp-carousel class="carousel-example" indicator-type="line">
    <mp-carousel-item>
      <img class="carousel-example-image" src="/cat.jpg">
    </mp-carousel-item>
    <mp-carousel-item>
      <img class="carousel-example-image" src="/cat2.jpg">
    </mp-carousel-item>
    <mp-carousel-item>
      <img class="carousel-example-image" src="/cat3.jpg">
    </mp-carousel-item>
  </mp-carousel>
</template>

<style>
.carousel-example {
  height: 160px;
  margin-top: 14px;
}

.carousel-example-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}
</style>
```

### 指示器位置

```html
<template>
  <mp-carousel class="carousel-example" indicator-position="top">
    <mp-carousel-item>
      <img class="carousel-example-image" src="/cat.jpg">
    </mp-carousel-item>
    <mp-carousel-item>
      <img class="carousel-example-image" src="/cat2.jpg">
    </mp-carousel-item>
    <mp-carousel-item>
      <img class="carousel-example-image" src="/cat3.jpg">
    </mp-carousel-item>
  </mp-carousel>
</template>

<style>
.carousel-example {
  height: 160px;
  margin-top: 14px;
}

.carousel-example-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}
</style>
```

### 悬停触发

```html
<template>
  <mp-carousel class="carousel-example" trigger="hover">
    <mp-carousel-item>
      <img class="carousel-example-image" src="/cat.jpg">
    </mp-carousel-item>
    <mp-carousel-item>
      <img class="carousel-example-image" src="/cat2.jpg">
    </mp-carousel-item>
    <mp-carousel-item>
      <img class="carousel-example-image" src="/cat3.jpg">
    </mp-carousel-item>
  </mp-carousel>
</template>

<style>
.carousel-example {
  height: 160px;
}

.carousel-example-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}
</style>
```

### 鼠标滚轮控制

```html
<template>
  <mp-carousel class="carousel-example" mousewheel>
    <mp-carousel-item>
      <img class="carousel-example-image" src="/cat.jpg">
    </mp-carousel-item>
    <mp-carousel-item>
      <img class="carousel-example-image" src="/cat2.jpg">
    </mp-carousel-item>
    <mp-carousel-item>
      <img class="carousel-example-image" src="/cat3.jpg">
    </mp-carousel-item>
  </mp-carousel>
</template>

<style>
.carousel-example {
  height: 160px;
}

.carousel-example-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}
</style>
```

### 键盘控制

```html
<template>
  <mp-carousel class="carousel-example" keyboard>
    <mp-carousel-item>
      <img class="carousel-example-image" src="/cat.jpg">
    </mp-carousel-item>
    <mp-carousel-item>
      <img class="carousel-example-image" src="/cat2.jpg">
    </mp-carousel-item>
    <mp-carousel-item>
      <img class="carousel-example-image" src="/cat3.jpg">
    </mp-carousel-item>
  </mp-carousel>
</template>

<style>
.carousel-example {
  height: 160px;
}

.carousel-example-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}
</style>
```

### 自定义指示器

```html
<template>
  <mp-carousel class="carousel-example">
    <mp-carousel-item>
      <img class="carousel-example-image" src="/cat.jpg">
    </mp-carousel-item>
    <mp-carousel-item>
      <img class="carousel-example-image" src="/cat2.jpg">
    </mp-carousel-item>
    <mp-carousel-item>
      <img class="carousel-example-image" src="/cat3.jpg">
    </mp-carousel-item>
    <template #indicator="{ index, length, to }">
      <div class="carousel-custom-indicators">
        <div
          v-for="(l, idx) in length"
          :key="l"
          class="carousel-custom-indicator"
          :class="{ 'carousel-custom--active': idx === index }"
          @click="to(idx)"
        >{{ idx + 1 }}</div>
      </div>
    </template>
  </mp-carousel>
</template>

<style>
.carousel-example {
  height: 160px;
}

.carousel-example-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}

.carousel-custom-indicators {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 4px;
}

.carousel-custom-indicator {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
  font-size: 12px;
  border-radius: 50%;
  cursor: pointer;
}

.carousel-custom--active {
  background: #4a90d9;
}
</style>
```

### 监听切换

```html
<script setup>
import { Message } from '@maplejs/maple-ui'
</script>

<template>
  <mp-carousel class="carousel-example" @change="(index) => Message(String(index))">
    <mp-carousel-item>
      <img class="carousel-example-image" src="/cat.jpg">
    </mp-carousel-item>
    <mp-carousel-item>
      <img class="carousel-example-image" src="/cat2.jpg">
    </mp-carousel-item>
    <mp-carousel-item>
      <img class="carousel-example-image" src="/cat3.jpg">
    </mp-carousel-item>
  </mp-carousel>
</template>

<style>
.carousel-example {
  height: 160px;
}

.carousel-example-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}
</style>
```

## API

### 属性

#### Carousel Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `current`(v-model) | 当前展示索引（受控模式） | _number_ | `-` |
| `default-current` | 当前展示索引（默认值） | _number_ | `0` |
| `loop` | 是否循环轮播 | _boolean_ | `true` |
| `autoplay` | 自动播放间隔(ms)，传入对象 `{ interval, hoverToPause }` 可开启悬停暂停 | _string \| number \| CarouselAutoPlayConfig_ | `-` |
| `duration` | 切换动画时长(ms) | _string \| number_ | `300` |
| `initial-index` | 初始展示项的索引 | _string \| number_ | `0` |
| `navigation` | 是否显示切换箭头，`'hover'` 时鼠标悬浮才显示 | _boolean \| 'hover' \| 'always' \| 'never'_ | `false` |
| `indicator` | 是否显示指示器 | _boolean_ | `true` |
| `indicator-color` | 指示器颜色 | _string_ | `-` |
| `indicator-class` | 指示器自定义 class | _string_ | `-` |
| `indicator-type` | 指示器类型，可选值 `dot` `line` `slider` | _string_ | `dot` |
| `indicator-position` | 指示器位置，可选值 `bottom` `top` `left` `right` `outer` | _string_ | `bottom` |
| `arrow-class` | 切换箭头自定义 class | _string_ | `-` |
| `vertical` | 是否为垂直轮播 | _boolean_ | `false` |
| `touchable` | 是否允许触摸滑动 | _boolean_ | `true` |
| `draggable` | 是否允许鼠标拖拽切换 | _boolean_ | `false` |
| `effect` | 切换动画类型，可选值 `slide` `fade` `card` | _string_ | `slide` |
| `slides-per-view` | 每屏显示的 slide 数量，`'auto'` 时由 slide 自身宽度决定 | _number \| 'auto'_ | `1` |
| `space-between` | slide 之间的间距 | _string \| number_ | `0` |
| `centered-slides` | 居中当前 slide（需配合 `slides-per-view` 使用） | _boolean_ | `false` |
| `height` | 轮播容器高度 | _string_ | `-` |
| `transition-timing-function` | 动画过渡曲线 | _string_ | `cubic-bezier(0.25, 0.8, 0.5, 1)` |
| `trigger` | 指示器的触发方式，可选值 `click` `hover` | _string_ | `click` |
| `mousewheel` | 是否允许鼠标滚轮切换 | _boolean_ | `false` |
| `keyboard` | 是否允许键盘方向键切换 | _boolean_ | `false` |

### 事件

#### Carousel Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `update:current` | `current` 值更新时触发 | `index: number` |
| `change` | 切换时触发 | `index: number` <br/> `prevIndex: number` <br/> `isManual: boolean` |

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
| `next` | 切换到下一页 | `options?: { event?: boolean }` | `-` |
| `prev` | 切换到上一页 | `options?: { event?: boolean }` | `-` |
| `to` | 跳转到指定索引 | `index: number, options?: { event?: boolean }` | `-` |

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
| `--carousel-navigation-icon-size` | `20px` |
| `--carousel-navigation-prev-left` | `8px` |
| `--carousel-navigation-next-right` | `8px` |
| `--carousel-navigation-prev-top` | `8px` |
| `--carousel-navigation-next-bottom` | `8px` |
