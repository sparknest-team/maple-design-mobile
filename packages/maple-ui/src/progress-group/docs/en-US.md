# ProgressGroup

### Introduction

Display multiple values as segments of a single progress track with a matching legend.

## Basic examples

### Basic Usage

```demo
../example/demos/basic.vue
```

## Appearance and states

### Progress group sizes and colors

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `items` | Segment data | Progress group sizes and colors |
| `size` | Track size | Progress group sizes and colors |
| `color` | Default segment color | Progress group sizes and colors |
| `show-text` | Show the summed percentage | Progress group sizes and colors |
<!-- demo-config-notes:end -->


Compare segment sizes and color overrides separately from orientation, circular layouts, overflow and keyboard interaction.

```demo
../example/demos/appearance-comparison.vue
```

## Layout and arrangement

### Orientation

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `items` | Segment data | Orientation |
| `show-text` | Show the summed percentage | Orientation |
| `orientation` | Horizontal/vertical orientation of the linear progress track, default horizontal; only used for mode=line | Orientation |
| `size` | Track size | Orientation |
<!-- demo-config-notes:end -->


```demo
../example/demos/orientation.vue
```

## Content and presentation

### Circular Segments

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `mode` | Display mode | Circular Segments |
| `items` | Segment data | Circular Segments |
| `show-text` | Show the summed percentage | Circular Segments |
| `circle-size` | Diameter in circle mode | Circular Segments |
| `stroke-width` | Track width in circle mode | Circular Segments |
<!-- demo-config-notes:end -->


```demo
../example/demos/circle.vue
```

## Interaction and control

### Overflow and keyboard

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `items` | Segment data | Overflow and keyboard, Custom Content |
| `max` | Total used to calculate each share | Overflow and keyboard, Custom Content |
| `show-text` | Show the summed percentage | Overflow and keyboard, Custom Content |
| `tooltip` | Enable segment hover/focus tips | Overflow and keyboard |
| `aria-label` | Accessible group name | Overflow and keyboard |
| `mode` | Display mode | Overflow and keyboard |
<!-- demo-config-notes:end -->


The demo's parent updates `max`, `items` and `tooltip` for both shapes; these controls are not built-in editing events. Toggle capacity between 100/200, clear/restore data or disable/enable tooltips. Disabling tooltips removes segments from the Tab order, and clearing data removes their tips. Pointer hover takes precedence over keyboard focus; leaving the hovered segment restores the focused segment's tip.

```demo
../example/demos/overflow-keyboard.vue
```

Segments are clipped cumulatively at max in both line and circle modes. Legend and tooltip values retain the logical per-item percentages. Non-finite/negative values become zero; invalid max falls back to 100. Focus a visible segment with Tab to show its tooltip; Escape dismisses it. Moving the pointer away does not dismiss a focused segment's tooltip. Use aria-label to name the group.

All five size presets affect line thickness (2/4/8/12/16px), not circle diameter; circle-size and stroke-width control circles. CSS-length circle-size values are supported.

### Custom Content

```demo
../example/demos/custom.vue
```

## Reading direction

Horizontal segments, highlights and tooltips share a logical start. Vertical progress stays top to bottom; circular angles and data order are preserved.

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
| color | Default segment color | `string` | `content-brand` |
| circle-size | Diameter in circle mode | `number \| string` | `120` |
| stroke-width | Track width in circle mode | `number` | `8` |
| tooltip | Enable segment hover/focus tips | `boolean` | `true` |
| orientation | Horizontal/vertical orientation of the linear progress track, default horizontal; only used for mode=line | `horizontal \| vertical` | `horizontal` |

### Slots

| Name | Slot arguments |
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

Graphic markers default to system content-brand. Color precedence: item.color → component color → default. Check custom-color contrast; geometry tokens retain platform differences.

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
