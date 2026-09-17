# Carousel

### Intro

Displays a collection of items that can be scrolled and swiped. Demos match Cedar Design Web; `effect` and `centered-slides` are mobile-only.

### Basic Usage

```demo
../example/demos/basic-usage.vue
```

### Forbid Loop

```demo
../example/demos/forbid-loop.vue
```

### Autoplay

Enable autoplay with `auto-play`. `true` uses a 3000ms interval; a number is the interval in milliseconds.

```demo
../example/demos/autoplay.vue
```

### Autoplay with Hover to Pause

```demo
../example/demos/autoplay-hover-pause.vue
```

### Vertical Carousel

```demo
../example/demos/vertical.vue
```

### Navigation Arrows

Use `show-arrow` to control when arrows appear: `always`, `hover`, or `never`. Mobile default is `never`.

```demo
../example/demos/navigation.vue
```

### Slide Effect (Default)

```demo
../example/demos/effect-slide.vue
```

### Fade Effect

```demo
../example/demos/effect-fade.vue
```

### Card Effect

```demo
../example/demos/effect-card.vue
```

### Multiple Slides Per View

```demo
../example/demos/multi-slides.vue
```

### Centered Slides

```demo
../example/demos/centered-slides.vue
```

### Indicator Types

Use `indicator-type` for `dot`, `line`, or `slider`. Hide indicators with `indicator`.

```demo
../example/demos/indicator-type.vue
```

### Indicator Position

```demo
../example/demos/indicator-position.vue
```

### Trigger with Hover

```demo
../example/demos/trigger-hover.vue
```

### Mousewheel Control

```demo
../example/demos/mousewheel.vue
```

### Keyboard Control

```demo
../example/demos/keyboard.vue
```

### Custom Indicator

```demo
../example/demos/custom-indicator.vue
```

### Handle Change

```demo
../example/demos/handle-change.vue
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
