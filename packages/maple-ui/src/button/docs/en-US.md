# Button

Disabled colors depend on the variant: colored solid fills use a lighter status background; text and outline remain transparent with muted status text; tonal keeps its light background. Neutral buttons use disabled neutral colors. Custom color/text-color is suspended while disabled; hover/active feedback and elevation are suppressed.

Both libraries use the same implementation and examples; package prefixes, themes and registration stay local.

## Examples

### Eight statuses

```demo
../example/demos/basic.vue
```

### Variants, statuses and sizes

Choose a variant and size to compare eight semantic colors. Filled buttons suit primary actions; text and outline suit secondary actions. This example has three appearance dimensions.

```demo
../example/demos/variants.vue
```

### Five sizes

Horizontal buttons and inputs of the same size share the default height and font size within each platform. Cedar heights are 24/28/32/36/44px; Maple heights are 32/40/48/56/64px. Horizontal button padding is 8/12/16/20/24px per side, with a 6px icon-label gap. Stacked buttons keep their separate content-based height. Component-level overrides remain independent.

```demo
../example/demos/size.vue
```

### Disabled buttons and links

```demo
../example/demos/disabled.vue
```

### Loading animations, layouts and sizes

Choose a loading layout and indicator size to compare five animations. Click a select arrow to open its menu, then choose an option to close it. Loading buttons keep their label and prevent repeated actions.

```demo
../example/demos/loading.vue
```

### Loading indicator appearance

```demo
../example/demos/loading-appearance.vue
```

### Sync, async and rejection recovery

```demo
../example/demos/auto-loading.vue
```

### Block buttons

```demo
../example/demos/block.vue
```

### Custom colors

```demo
../example/demos/custom-color.vue
```

### Group inheritance and overrides

Change the group size and disabled state. Children inherit group settings and can explicitly override color or disabled state.

```demo
../example/demos/button-group.vue
```

### Group layouts

Compare variants and sizes in horizontal and vertical groups: three related appearance dimensions.

```demo
../example/demos/button-group-layout.vue
```

### Group icons and loading

Compare stacked labels and group direction, then load the first button while the other action remains available. Vertical groups align horizontal icon/text content at the start so different label lengths keep icons aligned.

```demo
../example/demos/button-group-content.vue
```

### Native form, focus and touch events

```demo
../example/demos/native-events.vue
```

### Ripple and elevation feedback

Click to observe ripple feedback and adjust elevation to compare depth. Disabling the ripple does not disable clicks.

```demo
../example/demos/feedback.vue
```

### Icons and label layouts

Use built-in icons to compare icon-only, inline and stacked labels across four variants and five sizes. Stacked buttons grow with content and keep at least 8px of top and bottom padding. Omit the default slot for icon-only buttons; round controls shape and stacked controls label layout.

```demo
../example/demos/icons.vue
```

### Form control size comparison

Compare Input, Button, Select, date/time fields and other single-line controls at the same size. Field variants share the height scale; Button uses outline here. DatePicker/TimePicker are panels; this example uses Date/Time fields. The example includes selected and clearable values, removable tags and long multiple selections. Select/Cascader keep the same size height with tag-nowrap. Long tag text uses ellipsis while removal icons remain available; tags scroll horizontally while clear and arrow controls stay outside the scrolling area. Hover, focus or tap truncated tag text to read its full content; dismiss with an outside click or Escape without changing the selected value. Restore values after clearing to repeat the comparison. Multiline text and wrapping multiple selections can grow with content.

```demo
../../field-decorator/example/demos/control-sizes.vue
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
| status | Semantic color; inherits group, otherwise default | `SemanticStatus` | `undefined` |
| variant | Appearance; inherits group, otherwise default | `default / text / outline / tonal` | `undefined` |
| size | Size; inherits group, otherwise md | `xs / sm / md / lg / xl` | `undefined` |
| html-type | Native button type | `button / submit / reset` | `button` |
| component | Root tag; link attributes fall through | `button / a` | `button` |
| round | Round button | `boolean` | `false` |
| block | Full available width | `boolean` | `false` |
| loading | Loading; blocks activation and navigation | `boolean` | `false` |
| loading-type | Spinner animation; same as Loading.type; not used in line mode | `circle / wave / cube / rect / disappear` | `circle` |
| loading-mode | Inline, covering, or bottom progress line; line only uses loading-color | `default / fill / line` | `default` |
| loading-size | Indicator size; xs/sm/md/lg/xl map to 12/14/16/18/20px; numbers are px; follows button size when omitted; not used in line mode | `ComponentSize / number` | `undefined` |
| loading-color | Loading indicator color | `string` | `currentColor` |
| auto-loading | Wait for click/touchstart Promise results; sync callbacks do not flash loading | `boolean` | `false` |
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

## Types

ButtonProps、ButtonVariant、ButtonLoadingMode、ButtonHandler、ButtonInstance、ButtonGroupProps、ButtonGroupInstance。

## CSS variable roles and defaults

Button exposes 58 appearance tokens. `{status}-color` controls the solid background, `{status}-foreground-color` controls text/outline/tonal foreground, and `{status}-tonal-color` controls soft backgrounds. `solid-text-color` and `solid-state-layer-color` are shared by semantic statuses; default/tertiary foregrounds and primary/tertiary state layers retain theme-specific roles.

Size names use xs/sm/md/lg/xl. Typography, transition duration, focus width/offset and stacked height increments inherit system tokens; group and stacked corners reuse border-radius. The four state opacity tokens keep hover/active distinct. Loading duration applies to the bottom progress line; spinner animation is owned by Loading. Internal variables and fixed animation geometry are implementation details.


| Variable | Default |
| --- | --- |
| `--mp-button-border-radius` | `var(--mp-sys-radius-md)` |
| `--mp-button-content-gap` | `var(--mp-sys-space-3)` |
| `--mp-button-danger-color` | `var(--mp-sys-color-status-danger)` |
| `--mp-button-danger-disabled-color` | `rgb(var(--mp-danger-3))` |
| `--mp-button-danger-foreground-color` | `var(--mp-sys-color-content-danger)` |
| `--mp-button-danger-tonal-color` | `rgb(var(--mp-danger-1))` |
| `--mp-button-default-color` | `var(--mp-sys-color-surface-default)` |
| `--mp-button-default-foreground-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-button-default-tonal-color` | `var(--mp-sys-color-surface-muted)` |
| `--mp-button-disabled-color` | `var(--mp-color-fill-2)` |
| `--mp-button-disabled-solid-text-color` | `var(--mp-sys-color-content-on-dark)` |
| `--mp-button-disabled-text-color` | `var(--mp-sys-color-content-disabled)` |
| `--mp-button-focus-color` | `var(--mp-sys-color-content-brand)` |
| `--mp-button-info-color` | `var(--mp-sys-color-status-info)` |
| `--mp-button-info-disabled-color` | `rgb(var(--mp-blue-3))` |
| `--mp-button-info-foreground-color` | `var(--mp-sys-color-content-info)` |
| `--mp-button-info-tonal-color` | `rgb(var(--mp-blue-1))` |
| `--mp-button-lg-height` | `56px` |
| `--mp-button-lg-padding` | `0 var(--mp-sys-space-7)` |
| `--mp-button-loading-duration` | `1s` |
| `--mp-button-loading-line-height` | `3px` |
| `--mp-button-md-height` | `48px` |
| `--mp-button-md-padding` | `0 var(--mp-sys-space-6)` |
| `--mp-button-plain-state-opacity-active` | `1` |
| `--mp-button-plain-state-opacity-hover` | `0.5` |
| `--mp-button-primary-color` | `var(--mp-sys-color-action-primary)` |
| `--mp-button-primary-disabled-color` | `rgb(var(--mp-primary-3))` |
| `--mp-button-primary-foreground-color` | `var(--mp-sys-color-content-brand)` |
| `--mp-button-primary-state-layer-color` | `var(--mp-button-solid-state-layer-color)` |
| `--mp-button-primary-tonal-color` | `rgb(var(--mp-primary-1))` |
| `--mp-button-secondary-color` | `rgb(var(--mp-gray-6))` |
| `--mp-button-secondary-foreground-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-button-secondary-tonal-color` | `rgb(var(--mp-gray-2))` |
| `--mp-button-sm-height` | `40px` |
| `--mp-button-sm-padding` | `0 var(--mp-sys-space-5)` |
| `--mp-button-solid-state-layer-color` | `var(--mp-sys-color-content-on-dark)` |
| `--mp-button-solid-text-color` | `var(--mp-sys-color-content-on-dark)` |
| `--mp-button-stacked-gap` | `var(--mp-sys-space-2)` |
| `--mp-button-state-layer-color` | `var(--mp-sys-color-surface-page)` |
| `--mp-button-state-opacity-active` | `0.12` |
| `--mp-button-state-opacity-hover` | `0.08` |
| `--mp-button-success-color` | `var(--mp-sys-color-status-success)` |
| `--mp-button-success-disabled-color` | `rgb(var(--mp-success-3))` |
| `--mp-button-success-foreground-color` | `var(--mp-sys-color-content-success)` |
| `--mp-button-success-tonal-color` | `rgb(var(--mp-success-1))` |
| `--mp-button-tertiary-color` | `rgb(var(--mp-gray-7))` |
| `--mp-button-tertiary-foreground-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-button-tertiary-state-layer-color` | `var(--mp-sys-color-content-on-bright)` |
| `--mp-button-tertiary-text-color` | `var(--mp-sys-color-content-on-dark)` |
| `--mp-button-tertiary-tonal-color` | `rgb(var(--mp-gray-1))` |
| `--mp-button-warning-color` | `var(--mp-sys-color-status-warning)` |
| `--mp-button-warning-disabled-color` | `rgb(var(--mp-warning-3))` |
| `--mp-button-warning-foreground-color` | `var(--mp-sys-color-content-warning)` |
| `--mp-button-warning-tonal-color` | `rgb(var(--mp-warning-1))` |
| `--mp-button-xl-height` | `64px` |
| `--mp-button-xl-padding` | `0 var(--mp-sys-space-8)` |
| `--mp-button-xs-height` | `32px` |
| `--mp-button-xs-padding` | `0 var(--mp-sys-space-4)` |
