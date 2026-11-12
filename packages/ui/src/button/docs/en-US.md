# Button

Disabled colors depend on the variant: colored solid fills use a lighter status background; text and outline remain transparent with muted status text; tonal keeps its light background. Neutral buttons use disabled neutral colors. Custom color/text-color is suspended while disabled; hover/active feedback and elevation are suppressed.

Both libraries use the same implementation and examples; package prefixes, themes and registration stay local.

## Basic examples

### Eight statuses

```demo
../example/demos/basic.vue
```

## Appearance and states

### Variants, statuses and sizes

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `variant` | Appearance; inherits group, otherwise default | Variants, statuses and sizes, Custom colors |
| `size` | Size; inherits group, otherwise md | Variants, statuses and sizes, Five sizes |
| `status` | Semantic color; inherits group, otherwise default | Variants, statuses and sizes |
| `disabled` | Disabled; inherits group, explicit false overrides | Disabled buttons and links |
| `component` | Root tag; link attributes fall through | Disabled buttons and links |
| `loading` | Loading; blocks activation and navigation | Disabled buttons and links |
<!-- demo-config-notes:end -->


Choose a variant and size to compare eight semantic colors. Filled buttons suit primary actions; text and outline suit secondary actions. The few variant, size and background options are shown directly with button-style RadioGroups. Form/FormItem provide standard field layout; Card carries the background comparison.

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

### Custom colors

```demo
../example/demos/custom-color.vue
```

## Icons and layout

### Icons and label layouts

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `status` | Semantic color; inherits group, otherwise default | Icons and label layouts |
| `variant` | Appearance; inherits group, otherwise default | Icons and label layouts |
| `size` | Size; inherits group, otherwise md | Icons and label layouts |
| `stacked` | Stack icon and text; inherits group when omitted | Icons and label layouts |
| `round` | Round button | Icons and label layouts |
| `block` | Full available width | Block buttons |
<!-- demo-config-notes:end -->


Use built-in icons to compare icon-only, inline and stacked labels across four variants and five sizes. Stacked buttons grow with content and keep at least 8px of top and bottom padding. Omit the default slot for icon-only buttons; round controls shape and stacked controls label layout.

```demo
../example/demos/icons.vue
```

### Block buttons

```demo
../example/demos/block.vue
```

## Button groups

### Group inheritance and overrides

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `status` | Semantic color; inherits group, otherwise default | Group inheritance and overrides |
| `disabled` | Disabled; inherits group, explicit false overrides | Group inheritance and overrides |
| `loading` | Loading; blocks activation and navigation | Group icons and loading |
<!-- demo-config-notes:end -->


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

## Forms and events

### Form control size comparison

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `size` | Size; inherits group, otherwise md | Form control size comparison |
| `variant` | Appearance; inherits group, otherwise default | Form control size comparison |
| `html-type` | Native button type | Native form, focus and touch events |
| `focusable` | Allow sequential Tab focus; does not prevent programmatic focus | Native form, focus and touch events |
<!-- demo-config-notes:end -->


Compare Input, Button, Select, date/time fields and other single-line controls at the same size. Field variants share the height scale; Button uses outline here. DatePicker/TimePicker are panels; this example uses Date/Time fields. The example includes selected and clearable values, removable tags and long multiple selections. Select/Cascader keep the same size height with tag-nowrap. Long tag text uses ellipsis while removal icons remain available; tags scroll horizontally while clear and arrow controls stay outside the scrolling area. Hover, focus or tap truncated tag text to read its full content; dismiss with an outside click or Escape without changing the selected value. Restore values after clearing to repeat the comparison. Multiline text and wrapping multiple selections can grow with content.

```demo
../../field-decorator/example/demos/control-sizes.vue
```

### Native form, focus and touch events

```demo
../example/demos/native-events.vue
```

## Loading and action feedback

### Loading animations, layouts and sizes

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `loading` | Loading; blocks activation and navigation | Loading animations, layouts and sizes, Loading indicator appearance |
| `loading-size` | Indicator size; xs/sm/md/lg/xl map to 12/14/16/18/20px; numbers are px; follows button size when omitted; not used in line mode | Loading animations, layouts and sizes, Loading indicator appearance |
| `loading-type` | Spinner animation; same as Loading.type; not used in line mode | Loading animations, layouts and sizes |
| `loading-mode` | Inline, covering, or bottom progress line; line only uses loading-color | Loading animations, layouts and sizes |
| `loading-color` | Loading indicator color | Loading indicator appearance |
| `ripple` | Click ripple | Ripple and elevation feedback |
<!-- demo-config-notes:end -->


Choose a loading layout and indicator size to compare five animations. Click a select arrow to open its menu, then choose an option to close it. Loading buttons keep their label and prevent repeated actions.

```demo
../example/demos/loading.vue
```

### Loading indicator appearance

```demo
../example/demos/loading-appearance.vue
```

### Ripple and elevation feedback

Click to observe ripple feedback and adjust elevation to compare depth. Disabling the ripple does not disable clicks.

```demo
../example/demos/feedback.vue
```

### Controlled loading and failure recovery

```demo
../example/demos/controlled-loading.vue
```

## Reading direction

Inherits the nearest `dir="ltr|rtl"`, including runtime changes and local overrides. Icons and content follow reading order; stacked content remains top to bottom without mirroring custom graphics. ButtonGroup uses its direction for horizontal arrangement, joined borders and end radii; individual buttons may override text direction. Single buttons retain full radii, and vertical groups keep top-to-bottom order. Native Tab, Enter and Space remain available; ordinary groups do not intercept arrow keys. Disabled and loading behavior is unchanged.

## API

<!-- same-source-api:start -->

### Button Props

| Prop | Description | Type | Default |
| ------------- | ------------------------------------------------------------------------------------------------ | ----------------------------------------- | -------------- |
| status | Semantic color; inherits group, otherwise default | `SemanticStatus`<br>`'default' \| 'primary' \| 'secondary' \| 'tertiary' \| 'info' \| 'success' \| 'warning' \| 'danger'` | `undefined` |
| variant | Appearance; inherits group, otherwise default | `default / text / outline / tonal` | `undefined` |
| size | Size; inherits group, otherwise md | `xs / sm / md / lg / xl` | `undefined` |
| html-type | Native button type | `button / submit / reset` | `button` |
| component | Root tag; link attributes fall through | `button / a` | `button` |
| round | Round button | `boolean` | `false` |
| block | Full available width | `boolean` | `false` |
| loading | Loading; blocks activation and navigation | `boolean` | `false` |
| loading-type | Spinner animation; same as Loading.type; not used in line mode | `circle / wave / cube / rect / disappear` | `circle` |
| loading-mode | Inline, covering, or bottom progress line; line only uses loading-color | `default / fill / line` | `default` |
| loading-size | Indicator size; xs/sm/md/lg/xl map to 12/14/16/18/20px; numbers are px; follows button size when omitted; not used in line mode | `ComponentSize / number`<br>`ComponentSize: 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `undefined` |
| loading-color | Loading indicator color | `string` | `currentColor` |
| disabled | Disabled; inherits group, explicit false overrides | `boolean` | `undefined` |
| ripple | Click ripple | `boolean` | `true` |
| focusable | Allow sequential Tab focus; does not prevent programmatic focus | `boolean` | `true` |
| autofocus | Native autofocus | `boolean` | `false` |
| text-color | Custom text color | `string` | `undefined` |
| color | Custom background or variant base color | `string` | `undefined` |
| elevation | Default variant shadow; true=2, false=off, rounded/clamped 0–24; group owns grouped elevation | `boolean / number` | `true` |
| stacked | Stack icon and text; inherits group when omitted | `boolean` | `undefined` |

### Button Events

| Event | Arguments and behavior |
| ---------- | ------------------------------------------- |
| click | `(event: MouseEvent) => void` |

`click` is a notification event. The component does not process listener return values or switch loading automatically. Business code controls `loading` and should restore it in `finally` after asynchronous work. Disabled or loading links have their effective `href` removed.

### Button Slots

| Slot | Description | Prop |
| ------- | -------------------------------- | ---- |
| default | Button label; retained while loading | — |
| icon | Leading icon; above label when stacked | — |

### Button Methods

No custom public methods.
<!-- same-source-api:end -->

### ButtonGroup Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| status | Default semantic status for child buttons; individual buttons may override it | `SemanticStatus`<br>`'default' \| 'primary' \| 'secondary' \| 'tertiary' \| 'info' \| 'success' \| 'warning' \| 'danger'` | default |
| size | Default child button size; individual buttons may override it | xs / sm / md / lg / xl | undefined |
| variant | Default child appearance; adjacent buttons join using their effective variants, including mixed variants | default / text / outline / tonal | default |
| color | Default custom child color; individual buttons may override it | string | undefined |
| text-color | Default child text color; individual buttons may override it | string | undefined |
| disabled | Default disabled state; an explicit child false overrides group true | boolean | false |
| stacked | Stack child icon and text vertically by default; a child may explicitly override with false | boolean | false |
| vertical | Vertical group layout, independent of button content stacking | boolean | false |
| elevation | Group elevation; true means 2, numbers normalize to 0–24, and it applies only to an enabled group using the default variant | boolean / number | true |

The root defaults to `role="group"`. Supply `aria-label` or `aria-labelledby` when the action group needs a name. Native attributes can override role. Ordinary groups retain native Tab / Enter / Space handling without arrow-key focus management.

**Inheritance:** explicit child status, size, variant, color, text-color, disabled and stacked values take precedence. The group always owns elevation; individual button elevation is ignored. Nested groups use their nearest group's configuration and defaults without automatically accumulating outer disabled state.

### ButtonGroup Events

No custom events. `@click` forwards a native root event and may receive descendant bubbling; listen to each Button's click for its action. The group does not collect event Promises or manage tasks or selection.

### ButtonGroup Slots

| Slot | Description | Prop |
| --- | --- | --- |
| default | Joined styling supports directly adjacent Button DOM nodes under the group root | — |

**Composition:** extra DOM wrappers, surrounding text and other controls are outside the joined appearance contract. Wrapped buttons may inherit configuration but do not receive the same joined styling. The group owns outer radii and does not preserve a standalone round button's circular appearance. Use Space for separate buttons or mixed content. In narrow areas, business code chooses scrolling, shorter labels or vertical layout; groups do not wrap automatically.

### ButtonGroup Methods

| Name | Description |
| --- | --- |
| buttonGroupProvider | Reactive group configuration with readonly ComputedRef fields; elevation is boolean / number and other fields match the Props |

No additional group action methods.

## Types

ButtonProps、ButtonVariant、ButtonLoadingMode、ButtonInstance、ButtonGroupProps、ButtonGroupInstance。

## CSS Variables

Button exposes 58 appearance tokens. `{status}-color` controls the solid background, `{status}-foreground-color` controls text/outline/tonal foreground, and `{status}-tonal-color` controls soft backgrounds. `solid-text-color` and `solid-state-layer-color` are shared by semantic statuses; default/tertiary foregrounds and primary/tertiary state layers retain theme-specific roles.

Sizes use xs/sm/md/lg/xl. Font sizes, transition duration, focus width/offset and stacked-height increments reuse system variables. Button groups and stacked buttons share border-radius. Four state opacity variables preserve hover/active differences. loading-duration controls only the bottom progress line; Loading controls other loading animations. Internal variables and fixed animation geometry are not public customization points.

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-button-border-radius` | `var(--mp-sys-radius-md)` | `border-bottom-left-radius`, `border-bottom-right-radius`, `border-radius`, `border-top-left-radius`, `border-top-right-radius` |
| `--mp-button-content-gap` | `var(--mp-sys-space-3)` | `gap` |
| `--mp-button-danger-color` | `var(--mp-sys-color-status-danger)` | `background-color` |
| `--mp-button-danger-disabled-color` | `rgb(var(--mp-danger-3))`<br>`rgba(var(--mp-danger-6), 0.5)` (`:root[maple-theme='dark']`) | `background-color`, `color` |
| `--mp-button-danger-foreground-color` | `var(--mp-sys-color-content-danger)` | `color` |
| `--mp-button-danger-tonal-color` | `rgb(var(--mp-danger-1))` | `background-color` |
| `--mp-button-default-color` | `var(--mp-sys-color-surface-default)` | `background-color` |
| `--mp-button-default-foreground-color` | `var(--mp-sys-color-content-primary)` | `background`, `background-color`, `color` |
| `--mp-button-default-tonal-color` | `var(--mp-sys-color-surface-muted)` | `background-color` |
| `--mp-button-disabled-color` | `var(--mp-color-fill-2)` | `background-color` |
| `--mp-button-disabled-solid-text-color` | `var(--mp-sys-color-content-on-dark)`<br>`rgba(255, 255, 255, 0.3)` (`:root[maple-theme='dark']`) | `color` |
| `--mp-button-disabled-text-color` | `var(--mp-sys-color-content-disabled)` | `color` |
| `--mp-button-focus-color` | `var(--mp-sys-color-action-primary)` | `outline` |
| `--mp-button-info-color` | `var(--mp-sys-color-status-info)` | `background-color` |
| `--mp-button-info-disabled-color` | `rgb(var(--mp-blue-3))`<br>`rgba(var(--mp-blue-6), 0.5)` (`:root[maple-theme='dark']`) | `background-color`, `color` |
| `--mp-button-info-foreground-color` | `var(--mp-sys-color-content-info)` | `color` |
| `--mp-button-info-tonal-color` | `rgb(var(--mp-blue-1))` | `background-color` |
| `--mp-button-lg-height` | `56px` | `height`, `min-width`, `width` |
| `--mp-button-lg-padding` | `0 var(--mp-sys-space-7)` | `padding` |
| `--mp-button-loading-duration` | `1s` | `animation` |
| `--mp-button-loading-line-height` | `3px` | `height` |
| `--mp-button-md-height` | `48px` | `height`, `min-width`, `width` |
| `--mp-button-md-padding` | `0 var(--mp-sys-space-6)` | `padding` |
| `--mp-button-plain-state-opacity-active` | `1` | `opacity` |
| `--mp-button-plain-state-opacity-hover` | `0.5` | `opacity` |
| `--mp-button-primary-color` | `var(--mp-sys-color-action-primary)` | `background-color` |
| `--mp-button-primary-disabled-color` | `rgb(var(--mp-primary-3))`<br>`rgba(var(--mp-primary-6), 0.5)` (`:root[maple-theme='dark']`) | `background-color`, `color` |
| `--mp-button-primary-foreground-color` | `var(--mp-sys-color-content-brand)` | `color` |
| `--mp-button-primary-state-layer-color` | `var(--mp-button-solid-state-layer-color)` | `background-color` |
| `--mp-button-primary-tonal-color` | `rgb(var(--mp-primary-1))` | `background-color` |
| `--mp-button-secondary-color` | `rgb(var(--mp-gray-6))` | `background-color` |
| `--mp-button-secondary-foreground-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-button-secondary-tonal-color` | `rgb(var(--mp-gray-2))` | `background-color` |
| `--mp-button-sm-height` | `40px` | `height`, `min-width`, `width` |
| `--mp-button-sm-padding` | `0 var(--mp-sys-space-5)` | `padding` |
| `--mp-button-solid-state-layer-color` | `var(--mp-sys-color-content-on-dark)` | `background-color` |
| `--mp-button-solid-text-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-button-stacked-gap` | `var(--mp-sys-space-2)` | `gap`, `min-height`, `min-width` |
| `--mp-button-state-layer-color` | `var(--mp-sys-color-surface-page)` | `background-color` |
| `--mp-button-state-opacity-active` | `0.12` | `opacity` |
| `--mp-button-state-opacity-hover` | `0.08` | `opacity` |
| `--mp-button-success-color` | `var(--mp-sys-color-status-success)` | `background-color` |
| `--mp-button-success-disabled-color` | `rgb(var(--mp-success-3))`<br>`rgba(var(--mp-success-6), 0.5)` (`:root[maple-theme='dark']`) | `background-color`, `color` |
| `--mp-button-success-foreground-color` | `var(--mp-sys-color-content-success)` | `color` |
| `--mp-button-success-tonal-color` | `rgb(var(--mp-success-1))` | `background-color` |
| `--mp-button-tertiary-color` | `rgb(var(--mp-gray-7))` | `background-color` |
| `--mp-button-tertiary-foreground-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-button-tertiary-state-layer-color` | `var(--mp-sys-color-content-on-bright)`<br>`var(--mp-sys-color-content-on-dark)` (`:root[maple-theme='dark']`) | `background-color` |
| `--mp-button-tertiary-text-color` | `var(--mp-sys-color-content-on-dark)`<br>`var(--mp-sys-color-content-on-bright)` (`:root[maple-theme='dark']`) | `color` |
| `--mp-button-tertiary-tonal-color` | `rgb(var(--mp-gray-1))` | `background-color` |
| `--mp-button-warning-color` | `var(--mp-sys-color-status-warning)` | `background-color` |
| `--mp-button-warning-disabled-color` | `rgb(var(--mp-warning-3))`<br>`rgba(var(--mp-warning-6), 0.5)` (`:root[maple-theme='dark']`) | `background-color`, `color` |
| `--mp-button-warning-foreground-color` | `var(--mp-sys-color-content-warning)` | `color` |
| `--mp-button-warning-tonal-color` | `rgb(var(--mp-warning-1))` | `background-color` |
| `--mp-button-xl-height` | `64px` | `height`, `min-width`, `width` |
| `--mp-button-xl-padding` | `0 var(--mp-sys-space-8)` | `padding` |
| `--mp-button-xs-height` | `32px` | `height`, `min-width`, `width` |
| `--mp-button-xs-padding` | `0 var(--mp-sys-space-4)` | `padding` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-button-border-radius: var(--mp-sys-radius-md);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
