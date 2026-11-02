# Affix

The same scenarios, parameters and interactions as Cedar. Only component prefixes differ; themes and site shells remain independent.

## Basic examples

### Basic usage

```demo
../example/demos/basic.vue
```

## Layout and arrangement

### Affix direction, offset and container

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `target` | Scroller or selector; finds nearest scrolling ancestor when omitted, falling back to window | Affix direction, offset and container |
| `offset-top` | Distance from the scroll container top; accepts CSS lengths | Affix direction, offset and container |
| `offset-bottom` | Distance from the bottom; takes precedence over offset-top, including 0 | Affix direction, offset and container |
<!-- demo-config-notes:end -->


Scroll each bordered area separately to compare top/bottom affixing and offsets within an explicit scroll container.

```demo
../example/demos/offset-container-comparison.vue
```

## Interaction and control

### Change event

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `target` | Scroller or selector; finds nearest scrolling ancestor when omitted, falling back to window | Change event, Disabled, CSS mode and manual update |
| `offset-top` | Distance from the scroll container top; accepts CSS lengths | Change event, Disabled, CSS mode and manual update |
| `disabled` | Disable affixing | Disabled, CSS mode and manual update |
| `css-mode` | Use native position: sticky, subject to ancestor overflow and container boundaries | Disabled, CSS mode and manual update |
| `z-index` | Stacking level | Disabled, CSS mode and manual update |
<!-- demo-config-notes:end -->


```demo
../example/demos/fix-change.vue
```

### Disabled, CSS mode and manual update

```demo
../example/demos/controls.vue
```

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
| change | `(fixed: boolean, offset: number)`, emitted when the fixed state changes. While fixed, offset is the affix threshold; otherwise it is the distance to the corresponding container edge. Disabling affixing reports 0. |

### Slots

| Slot | Description | Arguments |
| --- | --- | --- |
| default | Content to affix | — |

### Methods

| Method | Description | Arguments | Returns |
| --- | --- | --- | --- |
| updatePosition | Rebind scrollers and recalculate on the next animation frame | — | `Promise<void>` |

### Platform notes

Props, event arguments, slots and public methods match across platforms. CSS mode follows browser sticky rules; examples use independent scroll containers.
<!-- same-source-api:end -->

`change` reports state transitions, so remeasuring an already fixed item does not repeat `true`; disabling a fixed item reports `false, 0`. Viewport units are reevaluated during measurement. CSS mode passes valid lengths to native sticky positioning; JS mode resolves numbers, numeric strings, px, rem, vw, vh, vmin and vmax. The target controls observation and JS measurement; native sticky remains constrained by actual CSS ancestors. Pending `updatePosition()` work cannot rebind a deactivated or replaced activation generation.
