# ProgressGroup

## Examples

### Introduction

Display multiple values as segments of a single progress track with a matching legend.

### Basic Usage

```demo
../example/demos/basic.vue
```

### Track Sizes

```demo
../example/demos/size.vue
```

### Orientation

```demo
../example/demos/orientation.vue
```

### Circular Segments

```demo
../example/demos/circle.vue
```

### Default Color and Track Only

```demo
../example/demos/color.vue
```

### Custom Content

```demo
../example/demos/custom.vue
```

### Overflow and keyboard

The demo's parent updates `max`, `items` and `tooltip` for both shapes; these controls are not built-in editing events. Toggle capacity between 100/200, clear/restore data or disable/enable tooltips. Disabling tooltips removes segments from the Tab order, and clearing data removes their tips. Pointer hover takes precedence over keyboard focus; leaving the hovered segment restores the focused segment's tip.

```demo
../example/demos/overflow-keyboard.vue
```

Segments are clipped cumulatively at max in both line and circle modes. Legend and tooltip values retain the logical per-item percentages. Non-finite/negative values become zero; invalid max falls back to 100. Focus a visible segment with Tab to show its tooltip; Escape dismisses it. Moving the pointer away does not dismiss a focused segment's tooltip. Use aria-label to name the group.

All five size presets affect line thickness (2/4/8/12/16px), not circle diameter; circle-size and stroke-width control circles. CSS-length circle-size values are supported.

<!-- api-review:start -->
### Feature playground

```demo
../example/demos/api-review.vue
```

<!-- api-review:end -->

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| aria-label | Accessible group name | `string` | — |
| items | Segment data | `ProgressGroupItem[]` | `[]` |
| mode | Display mode | `line \| circle` | `line` |
| max | Total used to calculate each share | `number` | `100` |
| show-text | Show the summed percentage | `boolean` | `false` |
| size | Track size | `xs \| sm \| md \| lg \| xl` | `md` |
| color | Default segment color | `string` | theme primary |
| circle-size | Diameter in circle mode | `number \| string` | `120` |
| stroke-width | Track width in circle mode | `number` | `8` |
| tooltip | Enable segment hover/focus tips | `boolean` | `true` |
| orientation | Track orientation | `horizontal \| vertical` | `horizontal` |

### Slots

| Name | Slot props |
| --- | --- |
| text | `{ percent, value, max }` |
| tooltip | `{ item, index, percent }` |
| item / item-leading / item-label / item-trailing | `{ item, index, percent }` |

### Style variables

| Variable | Default |
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

Marks use system content-brand. Color precedence: item.color > component color > default. Custom colors require contrast validation. Both libraries use the same geometry tokens.

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
