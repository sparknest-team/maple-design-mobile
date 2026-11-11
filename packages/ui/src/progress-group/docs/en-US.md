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

Horizontal segments, highlights and hints share the same logical origin. Vertical progress remains top to bottom; rings retain their existing angles and data order.

## Usage notes

### Geometry and motion
Built-in effects respect `prefers-reduced-motion: reduce`. Track thickness applies to both horizontal and vertical layouts; circle geometry remains prop-driven.


`orientation` controls linear layout only; circle legend arrangement is unchanged. Circle `stroke-width` is a number in the 100×100 SVG coordinate system, not a CSS length. A `text` slot is displayed even when `show-text=false`. When `item.slot` is set, its prefix and `-leading`, `-label`, `-trailing` slots are used; missing dynamic slots use built-in content rather than generic `item-*` slots.

The pointer can enter and remain over the tooltip; after leaving, the focused segment’s tooltip returns. Escape closes it. Tooltip content is descriptive and should not contain interactive form controls.

## API

### ProgressGroup Props

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

### ProgressGroup Slots

| Name | Slot arguments |
| --- | --- |
| text | `{ percent, value, max }` |
| tooltip | `{ item, index, percent }` |
| item / item-leading / item-label / item-trailing | `{ item, index, percent }` |

### ProgressGroupItem Props

| Prop | Description | Type |
| --- | --- | --- |
| label | Legend label | `string` |
| value | Segment value | `number` |
| color | Segment color | `string` |
| icon | Legend icon component | `Component` |
| slot | Custom slot-name prefix | `string` |
| class | Additional legend item class | `string` |
| tip | Custom hint text | `string` |

## CSS Variables

Graphic markers default to system content-brand. Color precedence: item.color → component color → default. Check custom-color contrast; geometry tokens retain platform differences.

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-progress-group-dot-size` | `var(--mp-sys-space-4)` | `height`, `width` |
| `--mp-progress-group-font-size` | `var(--mp-sys-font-size-sm)` | `font-size` |
| `--mp-progress-group-gap` | `var(--mp-sys-space-3)` | `gap` |
| `--mp-progress-group-item-gap` | `var(--mp-sys-space-2)` | `gap` |
| `--mp-progress-group-muted-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-progress-group-radius` | `9999px` | `border-radius`, `clip-path` |
| `--mp-progress-group-size-lg-thickness` | `12px` | `height`, `width` |
| `--mp-progress-group-size-md-thickness` | `8px` | `height`, `width` |
| `--mp-progress-group-size-sm-thickness` | `4px` | `height`, `width` |
| `--mp-progress-group-size-xl-thickness` | `16px` | `height`, `width` |
| `--mp-progress-group-size-xs-thickness` | `2px` | `height`, `width` |
| `--mp-progress-group-text-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-progress-group-text-font-weight` | `var(--mp-sys-font-weight-medium)` | `font-weight` |
| `--mp-progress-group-tooltip-bg` | `var(--mp-sys-color-surface-tooltip)` | `background` |
| `--mp-progress-group-tooltip-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-progress-group-tooltip-duration` | `var(--mp-sys-motion-duration-fast)` | `animation` |
| `--mp-progress-group-tooltip-font-size` | `var(--mp-sys-font-size-xs)` | `font-size` |
| `--mp-progress-group-tooltip-line-height` | `1.4` | `line-height` |
| `--mp-progress-group-tooltip-max-width` | `240px` | `max-width` |
| `--mp-progress-group-tooltip-offset` | `var(--mp-sys-space-4)` | `bottom`, `height`, `inset-inline-start`, `width` |
| `--mp-progress-group-tooltip-padding` | `5px var(--mp-sys-space-4)` | `padding` |
| `--mp-progress-group-tooltip-radius` | `var(--mp-sys-radius-md)` | `border-radius` |
| `--mp-progress-group-track-color` | `var(--mp-sys-color-state-hover)` | `background`, `stroke` |
| `--mp-progress-group-transition-duration` | `var(--mp-sys-motion-duration-standard)` | `animation`, `transition` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-progress-group-dot-size: var(--mp-sys-space-4);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
