# Button

Disabled styles follow Arco: colored solid fills use a lighter status background; text and outline remain transparent with muted status text; tonal keeps its light background. Neutral buttons use disabled neutral colors. Custom color/text-color is suspended while disabled; hover/active feedback and elevation are suppressed.

Both libraries use the same implementation and examples; package prefixes, themes and registration stay local.

## Examples

### Eight statuses

```demo
../example/demos/basic.vue
```

### Four variants

The `default` variant uses white text for primary, info, success, warning, danger and secondary solid fills.

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

## CSS variable responsibilities and full defaults

status-color is the solid background; status-text-color is its contrasting foreground. Historical status-icon-color supplies readable text/icon colors for text/outline/tonal and default icon-container; status-icon-container-color supplies soft surfaces. Override these pairs together. Disabled colors win over color/text-color Props; loading inherits currentColor unless loading-color is explicit. Focus uses an independent content-brand ring.

state-opacity-hover/active (0.08/0.12) apply to solid/tonal/icon-container; plain-state-opacity-hover/active (0.5/1) apply to text/outline soft surfaces. status-state-layer-color controls solid feedback; state-layer-color controls tonal/icon-container feedback. Active wins hover, blocked states suppress both, and layers stay behind content. internal-button-state-* variables are private and unsupported for customization. Custom backgrounds, ripple animation and disabled contrast are not covered by default contrast checks.

The table lists root defaults, not theme overrides. Dark tertiary changes text to on-bright and its state layer to on-dark; Maple light primary changes text to on-dark and its state layer to on-bright. Sizes and loading motion retain their existing component-specific values.

| Variable | Root default |
| --- | --- |
| `--mp-button-default-text-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-button-primary-text-color` | `var(--mp-sys-color-content-on-dark)` |
| `--mp-button-danger-text-color` | `var(--mp-sys-color-content-on-bright)` |
| `--mp-button-success-text-color` | `var(--mp-sys-color-content-on-bright)` |
| `--mp-button-warning-text-color` | `var(--mp-sys-color-content-on-bright)` |
| `--mp-button-info-text-color` | `var(--mp-sys-color-content-on-bright)` |
| `--mp-button-default-color` | `var(--mp-sys-color-surface-default)` |
| `--mp-button-primary-color` | `var(--mp-sys-color-action-primary)` |
| `--mp-button-danger-color` | `var(--mp-sys-color-status-danger)` |
| `--mp-button-success-color` | `var(--mp-sys-color-status-success)` |
| `--mp-button-warning-color` | `var(--mp-sys-color-status-warning)` |
| `--mp-button-info-color` | `var(--mp-sys-color-status-info)` |
| `--mp-button-secondary-color` | `rgb(var(--mp-gray-6))` |
| `--mp-button-secondary-text-color` | `var(--mp-sys-color-content-on-bright)` |
| `--mp-button-tertiary-color` | `rgb(var(--mp-gray-7))` |
| `--mp-button-tertiary-text-color` | `var(--mp-sys-color-content-on-dark)` |
| `--mp-button-default-icon-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-button-primary-icon-color` | `var(--mp-sys-color-content-brand)` |
| `--mp-button-danger-icon-color` | `var(--mp-sys-color-content-danger)` |
| `--mp-button-success-icon-color` | `var(--mp-sys-color-content-success)` |
| `--mp-button-warning-icon-color` | `var(--mp-sys-color-content-warning)` |
| `--mp-button-info-icon-color` | `var(--mp-sys-color-content-info)` |
| `--mp-button-default-icon-container-color` | `var(--mp-sys-color-surface-muted)` |
| `--mp-button-primary-icon-container-color` | `rgb(var(--mp-primary-1))` |
| `--mp-button-danger-icon-container-color` | `rgb(var(--mp-danger-1))` |
| `--mp-button-success-icon-container-color` | `rgb(var(--mp-success-1))` |
| `--mp-button-warning-icon-container-color` | `rgb(var(--mp-warning-1))` |
| `--mp-button-info-icon-container-color` | `rgb(var(--mp-blue-1))` |
| `--mp-button-disabled-color` | `var(--mp-color-disabled)` |
| `--mp-button-disabled-text-color` | `var(--mp-sys-color-content-disabled)` |
| `--mp-button-border-radius` | `var(--mp-sys-radius-md)` |
| `--mp-button-mini-padding` | `0 var(--mp-sys-space-4)` |
| `--mp-button-small-padding` | `0 var(--mp-sys-space-5)` |
| `--mp-button-normal-padding` | `0 var(--mp-sys-space-6)` |
| `--mp-button-large-padding` | `0 22px` |
| `--mp-button-xl-padding` | `0 28px` |
| `--mp-button-round-padding` | `var(--mp-sys-space-3)` |
| `--mp-button-mini-height` | `20px` |
| `--mp-button-small-height` | `28px` |
| `--mp-button-normal-height` | `36px` |
| `--mp-button-large-height` | `44px` |
| `--mp-button-xl-height` | `52px` |
| `--mp-button-mini-font-size` | `var(--mp-font-size-xs)` |
| `--mp-button-small-font-size` | `var(--mp-sys-font-size-xs)` |
| `--mp-button-normal-font-size` | `var(--mp-sys-font-size-md)` |
| `--mp-button-large-font-size` | `var(--mp-sys-font-size-lg)` |
| `--mp-button-xl-font-size` | `var(--mp-sys-font-size-xl)` |
| `--mp-button-content-gap` | `var(--mp-sys-space-3)` |
| `--mp-button-line-height` | `1.2` |
| `--mp-button-stacked-height` | `48px` |
| `--mp-button-focus-width` | `2px` |
| `--mp-button-focus-color` | `var(--mp-sys-color-content-brand)` |
| `--mp-button-focus-offset` | `2px` |
| `--mp-button-icon-container-padding` | `var(--mp-sys-space-3)` |
| `--mp-button-loading-line-height` | `3px` |
| `--mp-button-loading-line-width` | `40%` |
| `--mp-button-loading-duration` | `1s` |
| `--mp-button-loading-static-opacity` | `0.5` |
| `--mp-button-secondary-icon-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-button-secondary-icon-container-color` | `rgb(var(--mp-gray-2))` |
| `--mp-button-tertiary-icon-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-button-tertiary-icon-container-color` | `rgb(var(--mp-gray-1))` |
| `--mp-button-mini-stacked-height` | `36px` |
| `--mp-button-small-stacked-height` | `44px` |
| `--mp-button-normal-stacked-height` | `var(--mp-button-stacked-height)` |
| `--mp-button-large-stacked-height` | `56px` |
| `--mp-button-xl-stacked-height` | `64px` |
| `--mp-button-stacked-gap` | `var(--mp-sys-space-2)` |
| `--mp-button-stacked-padding` | `var(--mp-sys-space-2)` |
| `--mp-button-stacked-border-radius` | `var(--mp-sys-radius-md)` |
| `--mp-button-group-border-radius` | `var(--mp-sys-radius-md)` |
| `--mp-button-default-state-layer-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-button-primary-state-layer-color` | `var(--mp-sys-color-content-on-dark)` |
| `--mp-button-info-state-layer-color` | `var(--mp-sys-color-content-on-dark)` |
| `--mp-button-success-state-layer-color` | `var(--mp-sys-color-content-on-dark)` |
| `--mp-button-warning-state-layer-color` | `var(--mp-sys-color-content-on-dark)` |
| `--mp-button-danger-state-layer-color` | `var(--mp-sys-color-content-on-dark)` |
| `--mp-button-secondary-state-layer-color` | `var(--mp-sys-color-content-on-dark)` |
| `--mp-button-tertiary-state-layer-color` | `var(--mp-sys-color-content-on-bright)` |
| `--mp-button-state-layer-color` | `var(--mp-sys-color-surface-page)` |
| `--mp-button-state-opacity-hover` | `0.08` |
| `--mp-button-state-opacity-active` | `0.12` |
| `--mp-button-plain-state-opacity-hover` | `0.5` |
| `--mp-button-plain-state-opacity-active` | `1` |

### Motion variables

Built-in effects respect `prefers-reduced-motion: reduce`; loading and closing still update state immediately.

| Token | Default |
| --- | --- |
| `--mp-button-transition-duration` | `var(--mp-sys-motion-duration-standard)` |
