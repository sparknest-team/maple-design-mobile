# Carousel

### Intro

Displays a collection of items that can be scrolled and swiped. Demos match Cedar Design Web; `effect` and `centered-slides` are mobile-only.

### Basic Usage

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

### Forbid Loop

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

### Autoplay

Enable autoplay with `auto-play`. `true` uses a 3000ms interval; a number is the interval in milliseconds.

```html
<template>
  <mp-carousel class="carousel-example" :auto-play="2000">
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

### Autoplay with Hover to Pause

```html
<template>
  <mp-carousel class="carousel-example" :auto-play="{ interval: 2000, hoverToPause: true }">
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

### Vertical Carousel

```html
<template>
  <mp-carousel class="carousel-example" direction="vertical">
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

### Navigation Arrows

Use `show-arrow` to control when arrows appear: `always`, `hover`, or `never`. Mobile default is `never`.

```html
<template>
  <mp-carousel class="carousel-example" show-arrow="always">
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

  <mp-carousel class="carousel-example" show-arrow="hover">
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

### Slide Effect (Default)

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

### Fade Effect

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

### Card Effect

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

### Multiple Slides Per View

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

### Centered Slides

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

### Indicator Types

Use `indicator-type` for `dot`, `line`, or `slider`. Hide indicators with `indicator`.

```html
<template>
  <h4>Dot</h4>
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

  <h4>Line</h4>
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

  <h4>Slider</h4>
  <mp-carousel class="carousel-example" indicator-type="slider">
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

### Indicator Position

```html
<template>
  <h4>Top</h4>
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

  <h4>Outer</h4>
  <mp-carousel class="carousel-example" indicator-position="outer">
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

### Trigger with Hover

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

### Mousewheel Control

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

### Keyboard Control

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

### Custom Indicator

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

### Handle Change

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

### Props

#### Carousel Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `current`(v-model) | Current slide index (0-based) | _number_ | `-` |
| `default-current` | Default current slide index (0-based) | _number_ | `0` |
| `loop` | Whether to loop infinitely | _boolean_ | `true` |
| `auto-play` | Autoplay; `true` uses 3000ms, a number is the interval in ms, or `{ interval, hoverToPause }` | _boolean \| number \| CarouselAutoPlayConfig_ | `false` |
| `move-speed` | Transition duration (ms) | _string \| number_ | `300` |
| `trigger` | Indicator trigger | _CarouselTriggerEvent_ | `click` |
| `direction` | Slide direction | _'horizontal' \| 'vertical'_ | `horizontal` |
| `show-arrow` | When to show navigation arrows | _CarouselArrowType_ | `never` |
| `arrow-class` | Custom class for navigation arrows | _string_ | `-` |
| `indicator` | Whether to show indicators | _boolean_ | `true` |
| `indicator-type` | Indicator type | _CarouselIndicatorType_ | `dot` |
| `indicator-position` | Indicator position | _CarouselIndicatorPosition_ | `bottom` |
| `indicator-class` | Custom class for indicator | _string_ | `-` |
| `indicator-color` | Color of indicator | _string_ | `-` |
| `height` | Carousel container height | _string_ | `-` |
| `transition-timing-function` | CSS transition timing function | _string_ | `cubic-bezier(0.25, 0.8, 0.5, 1)` |
| `touchable` | Whether to enable touch swiping | _boolean_ | `true` |
| `draggable` | Whether to enable mouse dragging | _boolean_ | `false` |
| `mousewheel` | Whether to enable mousewheel navigation | _boolean_ | `false` |
| `keyboard` | Whether to enable keyboard arrow navigation | _boolean_ | `false` |
| `slides-per-view` | Number of slides visible per view. `'auto'` uses slide's own width | _number \| 'auto'_ | `1` |
| `space-between` | Gap between slides | _string \| number_ | `0` |
| `effect` | Transition effect (mobile) | _CarouselEffect_ | `slide` |
| `centered-slides` | Center the active slide (with `slides-per-view`, mobile) | _boolean_ | `false` |

### Events

#### Carousel Events

| Event | Description | Arguments |
| --- | --- | --- |
| `update:current` | Emitted when the v-model value updates (0-based) | `index: number` |
| `change` | Emitted when the active slide changes (0-based) | `index: number` <br/> `prevIndex: number` <br/> `isManual: boolean` |

### Slots

#### Carousel Slots

| Slot | Description | Arguments |
| --- | --- | --- |
| `default` | Carousel items, place `CarouselItem` here | `-` |
| `prev` | Custom previous button | `{ index, length, prev, next, to, hovering }` |
| `next` | Custom next button | `{ index, length, prev, next, to, hovering }` |
| `indicator` | Custom indicator | `{ index, length, prev, next, to, hovering }` |

### Methods

#### Carousel Methods

| Method | Description | Arguments | Return |
| --- | --- | --- | --- |
| `resize` | Recalculate carousel dimensions | `-` | `-` |
| `next` | Switch to next slide | `options?: CarouselToOptions` | `-` |
| `prev` | Switch to previous slide | `options?: CarouselToOptions` | `-` |
| `to` | Jump to specified index | `index: number, options?: CarouselToOptions` | `-` |

### Types

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

### Style Variables

#### Carousel Variables

| Variable | Default |
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
