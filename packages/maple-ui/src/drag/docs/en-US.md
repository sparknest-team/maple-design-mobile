# Drag

## Examples

### Intro

Make the element draggable freely.

### Basic Use

```demo
../example/demos/basic-use.vue
```

### Disabled

```demo
../example/demos/disabled.vue
```

### Direction

```demo
../example/demos/direction.vue
```

### Attraction Direction

```demo
../example/demos/attraction.vue
```

### Boundary

```demo
../example/demos/boundary.vue
```

### Reset Position

```demo
../example/demos/reset.vue
```

<!-- api-review:start -->
### Feature playground

```demo
../example/demos/api-review.vue
```

<!-- api-review:end -->

## API

### Props

| Prop              | Description                                          | Type                                                                                                       | Default                                    |
| ----------------- | ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `direction`       | Drag direction, optional value is `x` `y` `xy`       | _string_                                                                                                   | `xy`                                       |
| `attraction`      | Attraction direction, optional value is `x` `y` `xy` | _string_                                                                                                   | `-`                                        |
| `disabled`        | Whether to disable                                   | _boolean_                                                                                                  | `false`                                    |
| `boundary`        | Drag boundary                                        | _{ top?: number \| string, bottom?: number \| string, left?: number \| string, right?: number \| string }_ | `{ top: 0, bottom: 0, left: 0, right: 0 }` |
| `z-index`         | Drag element z-index                                 | _string \| number_                                                                                         | `90`                                       |
| `popup-container` | The location where the dragged element is mounted    | _TeleportProps['to'] \| false_                                                                             | `body`                                     |

When `popup-container` is `false`, the dragged element stays in place and calculates its boundary against the nearest positioned parent. Set `position: relative` on that parent for local dragging inside a card or panel.

### Events

| Event   | Description                            | Arguments      |
| ------- | -------------------------------------- | -------------- |
| `click` | Triggered when clicking drag component | `event: Event` |

### Methods

| Method   | Description                                                                  | Arguments | Return |
| -------- | ---------------------------------------------------------------------------- | --------- | ------ |
| `resize` | You can call this method to redraw when a drag element changes position size | `-`       | `-`    |
| `reset`  | Reset initialized position information                                       | `-`       | `-`    |

### Slots

| Name      | Description            | SlotProps |
| --------- | ---------------------- | --------- |
| `default` | Drag element's content | `-`       |
