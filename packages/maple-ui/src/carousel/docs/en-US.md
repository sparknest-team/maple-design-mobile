# Carousel

Autoplay interval is business playback cadence (business-clock), not CSS duration. Autoplay remains off by default; true uses3000ms, with existing numeric/config intervals and hover/focus/hidden pause rules. Cancellation/replacement invalidates old playback work; delivery consumes once before navigation. Retained inactive/disposed next/prev/to, keyboard and wheel cannot navigate or intercept input. Activation creates fresh observer/event bindings; detached deliveries cannot use a newer active state to reschedule.

## Examples

### Basic Usage

```demo
../example/demos/basic-usage.vue
```

### Forbid Loop

```demo
../example/demos/forbid-loop.vue
```

### Autoplay

The demo uses a 2000ms interval. Displayed slide numbers start at 1; API indices remain one-based. Toggle playback off/on to stop/resume. Focus inside the carousel also pauses playback.

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

Use the indicator buttons to switch pages. Inactive slides become transparent and inert. All slides overlap in one grid cell, keeping the active slide at the viewport width rather than splitting the track into columns.

```demo
../example/demos/effect-fade.vue
```

### Card Effect

The active slide uses full scale and opacity; neighboring slides are scaled down and dimmed. Previous/next buttons retain native keyboard activation.

```demo
../example/demos/effect-card.vue
```

### Multiple Slides Per View

This 2.5-slide example exposes mouse dragging, controlled acceptance and looping. Current is the parent's accepted one-based slide number; Proposal records the request and Changes counts change events. Rejection can still emit a proposal and change event without updating the accepted model. Accept changes to drag both ways or wrap backward from the first item to the last. With looping off, dragging beyond the last item does not navigate or duplicate notifications. This mouse combination does not certify physical touch, centered or auto-width combinations.

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

Wheeling over the carousel changes slides without scrolling the outer page. With loop enabled, moving backward from the first slide selects the last. This is separate from touch dragging.

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

Reverse cards reorders the same uniquely keyed cards (their distinct widths are the Demo keys). Current is positional, not a business-card identity: slide number 2 changes from 220px to 180px without changing the index or event count. Drag left to slide number 3, restore order to show 180px there, then drag right to slide number 2. Reordering alone emits no change. Arbitrary insertion/sorting, identity-following selection, reordering during a held gesture and physical touch remain unverified.

When the active fifth card is removed, parent Current stays 5 without another change; the view clamps it to the remaining fourth card and centers that card. A subsequent left drag wraps to 1 and updates the model once. Applications that need immediate parent-index correction must update current themselves. Arbitrary reordering and deletion during a held gesture remain unverified.

Empty temporarily removes every card: navigation is disabled and dragging emits no change. Turning it off restores the configured cards without switching. Clearing and restoring from slide number 1 allows a subsequent right drag to wrap to the last item. This does not cover nonzero out-of-range controlled indices or clearing during a held gesture.

Clearing from slide number 4 retains the parent Current and change count. Restoring centers the last card; the next left drag wraps to 1 and emits once. Empty content does not force the controlled parent value to 0. Active-card deletion, arbitrary invalid indices and clearing during a held gesture remain unverified.

Extra card appends a 200px fifth item without changing a valid current index or incrementing Changes. Drag right from the first item to reach it, then right again to the original last item before removing the extra card. The index and count stay unchanged; dragging left then wraps across the restored four-item boundary. This covers removing an inactive final item, not deleting the active item, arbitrary reordering, or changes during a held gesture.

Drag to the last item, then enable Wider cards (80px added per item) and the 300px viewport. Resizing does not change the model or increment Changes: the current 340px card recenters, and a left drag can wrap to the first item. Restoring both switches recenters again. This paragraph describes ResizeObserver updates after a completed gesture, not resizing while holding a drag.

The centered auto-width example uses four independent items (140/220/180/260px), with a 12px gap. Dragging advances one item at a time and wraps at either boundary. Current displays the accepted one-based model and Changes counts change events; the current item stays centered even when its width differs. This example does not certify physical touch, resizing during a gesture or dynamic item insertion.

```demo
../example/demos/auto-sized.vue
```

### interactive-content

The current index and change count expose the controlled model. Arrow/Home/End keys and mouse text selection inside inputs remain native editing actions, not slide navigation. Drag the background or focus the carousel container and press an arrow key to change slides; returning to a slide retains its input text. This example does not demonstrate saving text externally or physical touch selection.

```demo
../example/demos/interactive-content.vue
```

### Scheduler lifecycle / 调度生命周期

Loop nextTick waits for rendering; the settlement timer is visual-completion and two RAFs are state-settlement. Request/track/window checks and per-phase consumption prevent old timers clearing newer offsets, duplicate first-frame forks and old second frames releasing newer noMotion. Cancel held timers and RAF through their original frame window; already-dequeued callbacks still require ownership checks. Content/config render measurements are binding-generation scoped. Playback cadence and motion settlement are distinct, never a forced shared CSS duration.

```demo
../example/demos/en-US/scheduler-lifecycle.vue
```

### Intro

Displays a collection of items that can be scrolled and swiped. Demos match Cedar Design Web; `effect` and `centered-slides` are shared.

<!-- api-review:start -->
### Feature playground

```demo
../example/demos/api-review.vue
```

<!-- api-review:end -->

## API

### Model and default value

Use ordinary `v-model`. `modelValue` is the current slide number, starting at 1. `defaultValue` initializes uncontrolled state only at creation; changing it later does not reset the current state. A supplied model takes precedence. Initialization emits no `update:modelValue`.

### Carousel Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `model-value` | Controlled one-based slide number | `number` | `undefined` |
| `default-value` | Uncontrolled initial index | `number` | `1` |
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
All indices are one-based. A controlled action proposes update:model-value followed by change(slideNumber, previousSlideNumber, isManual); it does not move until the owner accepts current. External assignment does not emit another change. Options { event: false } suppress change only, never the model proposal. All user navigation is manual; autoplay is not.

loop wraps original slide instances without duplicate component state. In non-loop, non-centered layouts the final viewport is clamped to avoid blank space; the active item may move within that last visible group without moving the track. Partially visible slides remain accessible; fully offscreen slides are inert. fade always displays exactly one item. auto uses an explicit width (horizontal) or height (vertical) on CarouselItem; provide container height for vertical layouts. Only CarouselItem children, optionally inside Vue fragments, count as slides.

Autoplay true uses 3000ms and hover pause; a number sets milliseconds without hover pause. The object form supports interval/hoverToPause. Focus, dragging, document/ancestor visibility and KeepAlive always pause playback. Reduced motion disables transitions. Interactive child controls retain keyboard/pointer behavior; data-carousel-no-drag exempts custom interactive content. show-arrow=hover also reveals arrows on focus.

### Events
| Event | Arguments |
| --- | --- |
| update:model-value | slideNumber: number |
| change | slideNumber: number, previousSlideNumber: number, isManual: boolean |

### Slots
| Slot | Scope |
| --- | --- |
| default | CarouselItem |
| prev / next / indicator | { slideNumber, length, hovering, prev, next, to, resize } |

### Methods
| Method | Signature |
| --- | --- |
| prev / next | (options?: CarouselToOptions) => void |
| to | (slideNumber: number, options?: CarouselToOptions) => void |
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
