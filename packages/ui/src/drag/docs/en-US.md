# Drag

### Intro

Make the element draggable freely.

## Basic examples

### Basic Use

```demo
../example/demos/basic-use.vue
```

## Appearance and states

### Disabled

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `disabled` | Whether disabled | Disabled |
| `attraction` | Attraction direction, optional value is `x` `y` `xy` | Disabled |
| `boundary` | Drag boundary | Disabled |
| `popup-container` | The location where the dragged element is mounted | Disabled |
| `z-index` | Drag element z-index | Disabled |
<!-- demo-config-notes:end -->


```demo
../example/demos/disabled.vue
```

## Direction and boundaries

### Direction

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `boundary` | Drag boundary | Direction, Boundary |
| `popup-container` | The location where the dragged element is mounted | Direction, Boundary |
| `axis` | Allowed drag axis, default xy: x is horizontal only, y vertical only, xy both. Not an expansion side | Direction |
| `attraction` | Attraction direction, optional value is `x` `y` `xy` | Boundary |
<!-- demo-config-notes:end -->


```demo
../example/demos/direction.vue
```

### Boundary

```demo
../example/demos/boundary.vue
```

## Content and presentation

### Attraction Direction

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `attraction` | Attraction direction, optional value is `x` `y` `xy` | Attraction Direction, Reset Position |
| `boundary` | Drag boundary | Attraction Direction, Reset Position |
| `popup-container` | The location where the dragged element is mounted | Attraction Direction, Reset Position |
<!-- demo-config-notes:end -->


```demo
../example/demos/attraction.vue
```

### Reset Position

```demo
../example/demos/reset.vue
```

## API

### Drag Props

| Prop | Description | Type | Default |
| ----------------- | ------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `axis` | Allowed drag axis, default xy: x is horizontal only, y vertical only, xy both. Not an expansion side | _DragAxis_<br>`'x' \| 'y' \| 'xy'` | `xy` |
| `attraction` | Attraction direction, optional value is `x` `y` `xy` | _DragAttraction_<br>`'x' \| 'y' \| 'xy'` | `-` |
| `disabled` | Disables dragging only; ordinary click still notifies. Disabling during a drag cancels the gesture and retains the current position. | _boolean_ | `false` |
| `boundary` | Four physical boundaries; replacement or in-place updates automatically clamp an already-dragged position. | _{ top?: number \| string, bottom?: number \| string, left?: number \| string, right?: number \| string }_ | `{ top: 0, bottom: 0, left: 0, right: 0 }` |
| `z-index` | Drag element z-index | _string \| number_ | `90` |
| `popup-container` | The location where the dragged element is mounted | _PopupContainer_ | `body` |

With `popup-container`=`false`, draggable elements stay local rather than teleporting to `body` and are positioned/constrained against the nearest positioned ancestor. Give it `position: relative` for local dragging in cards/panels.

### Input and boundary rules

Touch dragging only. Physical x/y axes do not swap in RTL. Mouse input only produces ordinary clicks. Supply button/link semantics in business content; the root is not automatically a button.

Boundaries support finite numbers, numeric strings and px, rem, vw, vh, vmin and vmax. Negative values expand the allowed range. Percentages, em, calc, var and nonfinite values are unsupported, warn in development and use 0. Invalid axis falls back to xy; invalid attraction disables snapping. Boundary changes cancel the gesture and clamp the current position. Cancellation and disabling do not snap; normal touchend does.

### Drag Events

| Event | Description | Arguments |
| ------- | -------------- | -------------- |
| `click` | Ordinary click notification; suppressed during dragging and for one frame after ending. Promises are not awaited. | `event: Event` |

### Drag Methods

| Method | Description | Arguments | Returns |
| -------- | ---------------------------------------- | ---- | ------ |
| `resize` | Manually reread the visual position and clamp after host layout changes. Boundary prop changes need no manual call. | `-` | `-` |
| `reset` | Clear the gesture and translation, restoring the initial position defined by external styles. | `-` | `-` |

### Drag Slots

| Name | Description | Prop |
| --------- | -------------- | ---- |
| `default` | Drag element's content | `-` |


Wait for snapping animation to finish before calling resize, to avoid capturing an intermediate visual position. Both methods return void. Window resizing resolves relative units again and clamps; call resize for other host layout changes.

```ts
import { Drag } from '@maple-design/ui-vue/drag'
import type { DragProps, DragInstance, DragAxis, DragAttraction, DragBoundary, PopupContainer } from '@maple-design/ui-vue'
```
## CSS Variables

<!-- component-css-variables:start -->

This component declares no independent public CSS variables. Use the configuration and layout APIs documented on this page.

Internal custom properties and measurement values are implementation details and are not customization APIs.

<!-- component-css-variables:end -->
