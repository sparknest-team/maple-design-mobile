# Affix

The same scenarios, parameters and interactions as Cedar. Only component prefixes differ; themes and site shells remain independent.

## Examples

### Basic usage

```demo
../example/demos/basic.vue
```

### Top offset

```demo
../example/demos/top.vue
```

### Bottom offset

```demo
../example/demos/bottom.vue
```

### Scroll container

```demo
../example/demos/container.vue
```

### Change event

```demo
../example/demos/fix-change.vue
```

### Disabled, CSS mode and manual update

```demo
../example/demos/controls.vue
```

<!-- api-review:start -->
### Feature playground

```demo
../example/demos/api-review.vue
```

<!-- api-review:end -->

## API

<!-- same-source-api:start -->
### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| offset-top | Distance from the scroll container top; accepts CSS lengths | `number / string` | `0` |
| offset-bottom | Distance from the bottom; takes precedence over offset-top, including 0 | `number / string` | `undefined` |
| target | Scroller or selector; finds nearest scrolling ancestor when omitted, falling back to window | `string / HTMLElement / Window` | `undefined` |
| target-container | Extra outer scroller to listen to; omitted means no extra listener, and it is not a clipping boundary | `string / HTMLElement / Window` | `undefined` |
| z-index | Stacking level | `number / string` | `10` |
| disabled | Disable affixing | `boolean` | `false` |
| css-mode | Use native position: sticky, subject to ancestor overflow and container boundaries | `boolean` | `false` |

### Events

| Event | Arguments and timing |
| --- | --- |
| change | `(fixed: boolean, offset: number)`, when fixed state changes; offset is the threshold while fixed, otherwise distance to the corresponding container edge; disabling reports 0 |

### Slots

| Slot | Description | Arguments |
| --- | --- | --- |
| default | Content to affix | — |

### Methods

| Method | Description | Arguments | Returns |
| --- | --- | --- | --- |
| updatePosition | Rebind scrollers and recalculate on the next animation frame | — | `Promise<void>` |

### Platform notes

Props, event arguments, slots and methods match. CSS mode follows browser sticky rules; paired demos use independent scroll containers.
<!-- same-source-api:end -->
