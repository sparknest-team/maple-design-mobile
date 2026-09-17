# Button

Both libraries use the same implementation and examples; package prefixes, themes and registration stay local.

## Examples

### Eight statuses

```demo
../example/demos/basic.vue
```

### Four variants

```demo
../example/demos/variants.vue
```

### Five sizes

```demo
../example/demos/size.vue
```

### Disabled buttons and links

```demo
../example/demos/disabled.vue
```

### Loading layouts and animations

```demo
../example/demos/loading.vue
```

### Sync, async and rejection recovery

```demo
../example/demos/auto-loading.vue
```

### Block buttons

```demo
../example/demos/block.vue
```

### Colors, ripple and elevation

```demo
../example/demos/custom-color.vue
```

### Icon slots and round buttons

```demo
../example/demos/round.vue
```

### Stacked icon and text

```demo
../example/demos/stacked.vue
```

### Group inheritance and overrides

```demo
../example/demos/button-group.vue
```

### Native form, focus and touch events

```demo
../example/demos/native-events.vue
```

## API

<!-- same-source-api:start -->
### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| status | Semantic color; inherits group, otherwise default | `SemanticStatus` | `undefined` |
| variant | Appearance; inherits group, otherwise default | `default / text / outline / tonal` | `undefined` |
| size | Size; inherits group, otherwise md | `xs / sm / md / lg / xl` | `undefined` |
| html-type | Native button type | `button / submit / reset` | `button` |
| component | Root tag; link attributes fall through | `button / a` | `button` |
| round | Round button | `boolean` | `false` |
| block | Full available width | `boolean` | `false` |
| loading | Loading; blocks activation and navigation | `boolean` | `false` |
| loading-type | Spinner animation; same as Loading.type | `circle / wave / cube / rect / disappear` | `circle` |
| loading-mode | Inline, covering, or bottom progress line | `default / fill / line` | `default` |
| loading-size | Spinner size; inherits button size, or xs when replacing an inline icon | `ComponentSize / number` | `undefined` |
| loading-color | Loading indicator color | `string` | `currentColor` |
| loading-radius | Circle spinner radius | `string / number` | `undefined` |
| auto-loading | Wait for click/touchstart Promise results; sync callbacks do not flash loading | `boolean` | `false` |
| icon-container | Icon container appearance | `boolean` | `false` |
| disabled | Disabled; inherits group, explicit false overrides | `boolean` | `undefined` |
| ripple | Click ripple | `boolean` | `true` |
| focusable | Allow sequential Tab focus; does not prevent programmatic focus | `boolean` | `true` |
| autofocus | Native autofocus | `boolean` | `false` |
| text-color | Custom text color | `string` | `undefined` |
| color | Custom background or variant base color | `string` | `undefined` |
| elevation | Default variant shadow; true=2, false=off, rounded/clamped 0–24; group owns grouped elevation | `boolean / number` | `true` |
| stacked | Stack icon and text; inherits group when omitted | `boolean` | `undefined` |

### Events

| Event | Arguments and behavior |
| --- | --- |
| click | `(event: Event) => void / Promise<unknown>` |
| touchstart | `(event: Event) => void / Promise<unknown>` |

Handlers may return promises and multiple listeners are supported. With auto-loading, all listeners must settle before unblocking, including after rejection. Unmounting or KeepAlive deactivation invalidates pending completion. Listener return values are read directly; events are not dispatched a second time. Native focus/blur attributes fall through. Disabled/busy clicks prevent navigation and propagation.

### Slots

| Slot | Description | Arguments |
| --- | --- | --- |
| default | Button label; retained while loading | — |
| icon | Leading icon; above label when stacked | — |

### Methods

No custom public methods.
<!-- same-source-api:end -->

## ButtonGroup

Props: size=md, status=default, variant=default, color/text-color=undefined, disabled/stacked/vertical=false, elevation=true. Uses the default slot and exposes buttonGroupProvider (reactive group configuration). No custom events.

## Migration

Cedar loading-type=default/fill/line becomes loading-mode=default/fill/line; loading-type now selects spinner animation. Maple uses loading-mode=fill to retain the previous covering layout. Both default ripple and focusable to true. CSS tokens now use the shared Button token names (with --c-/--mp- prefixes); see style/token.less.

## Types

ButtonProps、ButtonVariant、ButtonLoadingMode、ButtonHandler、ButtonInstance、ButtonGroupProps、ButtonGroupInstance。
