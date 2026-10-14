# Carousel

### Intro

Displays a collection of items that can be scrolled and swiped. Demos match Cedar Design Web; `effect` and `centered-slides` are shared.

### Basic Usage

```demo
../example/demos/basic-usage.vue
```

### Forbid Loop

```demo
../example/demos/forbid-loop.vue
```

### Autoplay

The demo uses a 2000ms interval. Displayed slide numbers start at 1; API indices remain zero-based. Toggle playback off/on to stop/resume. Focus inside the carousel also pauses playback.

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

Use `show-arrow` to control when arrows appear: `always`, `hover`, or `never`. Both libraries default to `always`.

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

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `current` | Controlled zero-based index | `number` | `undefined` |
| `default-current` | Uncontrolled initial index | `number` | `0` |
| `loop` | Loop without duplicating instances | `boolean` | `true` |
| `auto-play` | Autoplay configuration | `boolean \| number \| CarouselAutoPlayConfig` | `false` |
| `move-speed` | Explicit duration in milliseconds | `number` | `undefined (token)` |
| `trigger` | Indicator trigger | `click \| hover` | `click` |
| `direction` | Slide direction | `horizontal \| vertical` | `horizontal` |
| `show-arrow` | Arrow visibility | `always \| hover \| never` | `always` |
| `arrow-class` | Additional arrow class | `string` | `undefined` |
| `indicator` | Show indicators | `boolean` | `true` |
| `indicator-type` | Indicator appearance | `dot \| line \| slider` | `dot` |
| `indicator-position` | Indicator position | `bottom \| top \| left \| right \| outer` | `bottom` |
| `indicator-class` | Additional indicator class | `string` | `undefined` |
| `indicator-color` | Custom indicator background | `string` | `undefined` |
| `height` | Container height; numbers are px | `number \| string` | `undefined` |
| `transition-timing-function` | Explicit timing function | `string` | `undefined (token)` |
| `touchable` | Touch dragging | `boolean` | `true` |
| `draggable` | Mouse dragging, independent of touch | `boolean` | `false` |
| `mousewheel` | Wheel navigation | `boolean` | `false` |
| `keyboard` | Scoped arrow/Home/End navigation | `boolean` | `false` |
| `slides-per-view` | Visible count; auto uses item size | `number \| auto` | `1` |
| `space-between` | Item gap; numbers/numeric strings are px | `number \| string` | `0` |
| `effect` | Effect; all supported by both libraries | `slide \| fade \| card` | `slide` |
| `centered-slides` | Center active slide | `boolean` | `false` |
| `aria-label` | Carousel accessible name | `string` | Locale |
| `previous-button-aria-label` | Previous button accessible name | `string` | Locale |
| `next-button-aria-label` | Next button accessible name | `string` | Locale |

### Model and interaction
All indices are zero-based. A controlled action proposes update:current followed by change(index, previousIndex, isManual); it does not move until the owner accepts current. External assignment does not emit another change. Options { event: false } suppress change only, never the model proposal. All user navigation is manual; autoplay is not.

loop wraps original slide instances without duplicate component state. In non-loop, non-centered layouts the final viewport is clamped to avoid blank space; the active item may move within that last visible group without moving the track. Partially visible slides remain accessible; fully offscreen slides are inert. fade always displays exactly one item. auto uses an explicit width (horizontal) or height (vertical) on CarouselItem; provide container height for vertical layouts. Only CarouselItem children, optionally inside Vue fragments, count as slides.

Autoplay true uses 3000ms and hover pause; a number sets milliseconds without hover pause. The object form supports interval/hoverToPause. Focus, dragging, document/ancestor visibility and KeepAlive always pause playback. Reduced motion disables transitions. Interactive child controls retain keyboard/pointer behavior; data-carousel-no-drag exempts custom interactive content. show-arrow=hover also reveals arrows on focus.

### Events
| Event | Arguments |
| --- | --- |
| update:current | index: number |
| change | index: number, previousIndex: number, isManual: boolean |

### Slots
| Slot | Scope |
| --- | --- |
| default | CarouselItem |
| prev / next / indicator | { index, length, hovering, prev, next, to, resize } |

### Methods
| Method | Signature |
| --- | --- |
| prev / next | (options?: CarouselToOptions) => void |
| to | (index: number, options?: CarouselToOptions) => void |
| resize | () => void |

CarouselItem has no own props, events or methods; its default slot contains slide content.

### Types
CarouselProps, CarouselItemProps, CarouselInstance, CarouselItemInstance, CarouselEmits, CarouselSlots, CarouselItemSlots, CarouselExpose, CarouselSlotScope, CarouselToOptions, CarouselChangeData, CarouselDirection, CarouselEffect, CarouselAutoPlayConfig, CarouselArrowType, CarouselIndicatorType, CarouselIndicatorPosition, CarouselTriggerEvent.

### Style variables

| Token | Default |
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


### Loop transition boundary

Slides remain single component instances. Ordinary next/previous transitions recycle only after the outgoing page leaves the viewport. A long or centered jump that would need one slide in two positions snaps without animation; it does not clone interactive content or queue an unbounded series of transitions. When the number of slides is smaller than the requested visible count, no duplicate slides are fabricated. Accessibility labels follow the global Locale; explicit label props override it.
