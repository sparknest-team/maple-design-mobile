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

### Props

| Arguments | Description | Type | Default |
| ----------------- | ------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `axis` | Allowed drag axis, default xy: x is horizontal only, y vertical only, xy both. Not an expansion side | _string_ | `xy` |
| `attraction` | Attraction direction, optional value is `x` `y` `xy` | _string_ | `-` |
| `disabled` | Whether disabled | _boolean_ | `false` |
| `boundary` | Drag boundary | _{ top?: number \| string, bottom?: number \| string, left?: number \| string, right?: number \| string }_ | `{ top: 0, bottom: 0, left: 0, right: 0 }` |
| `z-index` | Drag element z-index | _string \| number_ | `90` |
| `popup-container` | The location where the dragged element is mounted | _TeleportProps['to'] \| false_ | `body` |

With `popup-container`=`false`, draggable elements stay local rather than teleporting to `body` and are positioned/constrained against the nearest positioned ancestor. Give it `position: relative` for local dragging in cards/panels.

### Events

| Event | Description | Arguments |
| ------- | -------------- | -------------- |
| `click` | Triggered when clicking drag component | `event: Event` |

### Methods

| Method | Description | Arguments | Returns |
| -------- | ---------------------------------------- | ---- | ------ |
| `resize` | You can call this method to redraw when a drag element changes position size | `-` | `-` |
| `reset` | Reset initialized position information | `-` | `-` |

### Slots

| Name | Description | Arguments |
| --------- | -------------- | ---- |
| `default` | Drag element's content | `-` |
