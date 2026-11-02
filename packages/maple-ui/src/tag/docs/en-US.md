# Tag

### Intro

Tag is used for marking, categorizing, and filtering. The API aligns with Cedar Design Web (PC) Tag, with mobile-friendly extras such as round shape and custom text color.

## Basic examples

### Theme Color

Set the theme color with `status`. Options match Button: `default` `primary` `secondary` `tertiary` `info` `success` `warning` `danger`.

```demo
../example/demos/theme-color-tag.vue
```

## Appearance and states

### Round

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `variant` | Variant: `default` (filled) / `outline` | Round, Custom Color |
| `round` | Whether to use a pill shape | Round |
| `status` | Theme color: `default` `primary` `secondary` `tertiary` `info` `success` `warning` `danger` | Round |
| `closable` | Whether closable | Round |
| `color` | Custom background (border color when outline) | Custom Color |
| `text-color` | Custom text color | Custom Color |
<!-- demo-config-notes:end -->


Enable the pill shape with `round`.

```demo
../example/demos/round-tag.vue
```

### Custom Color

Override status colors with `color` and `text-color`. With `variant="outline"`, `color` is used as the border color.

```demo
../example/demos/custom-color-tag.vue
```

### Appearance configuration comparison

Choose a dimension to compare all its values side by side while keeping other settings and content identical. Change the other settings to inspect combinations; input specimens share one model.

<details>
<summary>Configuration details and limits</summary>

#### Size

Set size with `size`: `xs` `sm` `md` `lg` `xl`.

#### Outline

Use `variant="outline"` for the outline style.

#### Appearance combinations

Use this example for short labels and category markers. Adjust variant, status, size and compare the component with the same data. Keep the content unchanged while comparing the available settings.

</details>

```demo
../example/demos/appearance-lab.vue
```

## Content and presentation

### Checkable

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `status` | Theme color: `default` `primary` `secondary` `tertiary` `info` `success` `warning` `danger` | Checkable, Icon |
| `checkable` | Whether checkable | Checkable |
| `default-value` | Default checked state when checkable | Checkable |
| `variant` | Variant: `default` (filled) / `outline` | Checkable |
| `loading` | Loading state | Checkable |
<!-- demo-config-notes:end -->


Make the tag toggleable with `checkable` and `v-model`.

```demo
../example/demos/checkable-tag.vue
```

### Icon

Customize the leading icon with the `icon` slot, and the close icon with `close-icon`.

```demo
../example/demos/icon-tag.vue
```

## Interaction and control

### Closable

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `status` | Theme color: `default` `primary` `secondary` `tertiary` `info` `success` `warning` `danger` | Closable, Loading |
| `show` | Visibility (v-model) | Closable |
| `closable` | Whether closable | Closable |
| `round` | Whether to use a pill shape | Closable |
| `loading` | Loading state | Loading |
<!-- demo-config-notes:end -->


The close button supports Space and Enter without bubbling into selection. Checkable tags support both keys; controlled checked values still require parent acceptance, while omitted checked uses local state. Loading blocks selection, rather than acting as a disabled API. Each library maintains independent state. These basic interactions do not certify held-key, asynchronous or physical-touch combinations.

Show a close button with `closable`. Use `v-model:show` or manage a list yourself.

```demo
../example/demos/closable-tag.vue
```

### Loading

Show a loading state with `loading`.

```demo
../example/demos/loading-tag.vue
```

## API

### Value and default value

Use ordinary `v-model`. `modelValue` is a selectable tag's boolean checked state. `defaultValue` initializes uncontrolled state once; later changes do not reset it. Explicit binding takes precedence, without initialization `update:modelValue`.

### Props

#### Tag Props

| Arguments | Description | Type | Default |
| --- | --- | --- | --- |
| `status` | Theme color: `default` `primary` `secondary` `tertiary` `info` `success` `warning` `danger` | _string_ | `default` |
| `variant` | Variant: `default` (filled) / `outline` | _string_ | `default` |
| `size` | Size: `xs` `sm` `md` `lg` `xl` | _string_ | `md` |
| `round` | Whether to use a pill shape | _boolean_ | `false` |
| `show` | Visibility (v-model) | _boolean_ | `true` |
| `default-show` | Default visibility | _boolean_ | `true` |
| `loading` | Loading state | _boolean_ | `false` |
| `closable` | Whether closable | _boolean_ | `false` |
| `checkable` | Whether checkable | _boolean_ | `false` |
| `model-value` | Checked state when checkable (v-model) | _boolean_ | `true` |
| `default-value` | Default checked state when checkable | _boolean_ | `true` |
| `nowrap` | Whether content is nowrap with ellipsis | _boolean_ | `false` |
| `color` | Custom background (border color when outline) | _string_ | `-` |
| `text-color` | Custom text color | _string_ | `-` |

### Events

#### Tag Events

| Event | Description | Arguments |
| --- | --- | --- |
| `update:show` | Visibility changed | `(show: boolean)` |
| `update:model-value` | Checked state changed (checkable) | `(checked: boolean)` |
| `close` | Close button clicked | `(event: MouseEvent)` |
| `check` | Checked state toggled (checkable) | `(checked: boolean, event: MouseEvent)` |

### Slots

#### Tag Slots

| Slot | Description |
| --- | --- |
| `default` | Tag content |
| `icon` | The prepend icon of alert |
| `close-icon` | Custom close icon |

### Type definitions

```ts
type TagStatus = 'default' | 'primary' | 'secondary' | 'tertiary' | 'info' | 'success' | 'warning' | 'danger'
type TagSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type TagVariant = 'default' | 'outline'
```

### Style variables

The complete public contract is the `--mp-tag-*` set in `style/token.less`. Customize it with [StyleProvider](#/en-US/style-provider). Cedar uses the same logical names with a different brand prefix.

## Shared implementation and platform boundaries

Each platform maintains a complete local implementation. They do not import a common core or share component instances or reactive state. Changes must update both implementations. Component bodies, props, key styles and paired tests have read-only source consistency checks; theme tokens and installation entries remain local to each library.

Both retain independent show/checked state, with controlled values updated by callers. Fade-out remains; class/style fall through explicitly to the actual tag. Size configuration, RTL context and icons are locally adapted. Mobile touch dimensions remain in tokens.

### Complete variable defaults and boundaries

Status text and outline borders use readable system content colors; colored fills use palette level 1. Unchecked stays neutral; checked status colors override generic hover. Neutral fills use fill-2 → fill-3. color overrides status; preset colors are outside this contrast guarantee. Callers must check custom backgrounds and set text-color if needed. Platform dimensions remain distinct. All public declarations are listed; 15 unused preset-icon hover-background/size variables, custom-icon-bg-hover and old InputTag references are removed without aliases.

| Variable | Default |
| --- | --- |
| `--mp-tag-status-primary-bg-color` | `rgb(var(--mp-primary-1))` |
| `--mp-tag-status-primary-text-color` | `var(--mp-sys-color-content-brand)` |
| `--mp-tag-status-secondary-bg-color` | `rgb(var(--mp-gray-2))` |
| `--mp-tag-status-secondary-text-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-tag-status-tertiary-bg-color` | `rgb(var(--mp-gray-1))` |
| `--mp-tag-status-tertiary-text-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-tag-status-info-bg-color` | `rgb(var(--mp-blue-1))` |
| `--mp-tag-status-info-text-color` | `var(--mp-sys-color-content-info)` |
| `--mp-tag-status-success-bg-color` | `rgb(var(--mp-success-1))` |
| `--mp-tag-status-success-text-color` | `var(--mp-sys-color-content-success)` |
| `--mp-tag-status-warning-bg-color` | `rgb(var(--mp-warning-1))` |
| `--mp-tag-status-warning-text-color` | `var(--mp-sys-color-content-warning)` |
| `--mp-tag-status-danger-bg-color` | `rgb(var(--mp-danger-1))` |
| `--mp-tag-status-danger-text-color` | `var(--mp-sys-color-content-danger)` |
| `--mp-tag-variant-outline-status-primary-color` | `var(--mp-sys-color-content-brand)` |
| `--mp-tag-variant-outline-status-secondary-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-tag-variant-outline-status-tertiary-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-tag-variant-outline-status-info-color` | `var(--mp-sys-color-content-info)` |
| `--mp-tag-variant-outline-status-success-color` | `var(--mp-sys-color-content-success)` |
| `--mp-tag-variant-outline-status-warning-color` | `var(--mp-sys-color-content-warning)` |
| `--mp-tag-variant-outline-status-danger-color` | `var(--mp-sys-color-content-danger)` |
| `--mp-tag-variant-outline-default-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-tag-variant-outline-default-border-color` | `var(--mp-sys-color-border-default)` |
| `--mp-tag-border-width` | `1px` |
| `--mp-tag-border-type` | `solid` |
| `--mp-tag-padding-horizontal` | `10px` |
| `--mp-tag-padding-vertical` | `0` |
| `--mp-tag-icon-margin-right` | `var(--mp-sys-space-3)` |
| `--mp-tag-text-font-weight` | `var(--mp-sys-font-weight-medium)` |
| `--mp-tag-border-radius` | `var(--mp-sys-radius-md)` |
| `--mp-tag-round-radius` | `100px` |
| `--mp-tag-size-xs` | `24px` |
| `--mp-tag-size-sm` | `28px` |
| `--mp-tag-size-md` | `32px` |
| `--mp-tag-size-lg` | `36px` |
| `--mp-tag-size-xl` | `40px` |
| `--mp-tag-size-xs-font-size` | `var(--mp-sys-font-size-xs)` |
| `--mp-tag-size-sm-font-size` | `var(--mp-sys-font-size-xs)` |
| `--mp-tag-size-md-font-size` | `var(--mp-sys-font-size-md)` |
| `--mp-tag-size-lg-font-size` | `var(--mp-sys-font-size-md)` |
| `--mp-tag-size-xl-font-size` | `var(--mp-sys-font-size-lg)` |
| `--mp-tag-bg-not-checked-hover` | `var(--mp-sys-color-state-hover)` |
| `--mp-tag-custom-text-color` | `var(--mp-sys-color-content-on-dark)` |
| `--mp-tag-default-bg` | `var(--mp-sys-color-state-hover)` |
| `--mp-tag-default-bg-hover` | `var(--mp-color-fill-3)` |
| `--mp-tag-default-icon-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-tag-default-text-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-tag-default-border-color` | `transparent` |
| `--mp-tag-default-border-color-hover` | `transparent` |
| `--mp-tag-red-bg` | `rgb(var(--mp-red-1))` |
| `--mp-tag-red-bg-hover` | `rgb(var(--mp-red-2))` |
| `--mp-tag-red-border-color` | `transparent` |
| `--mp-tag-red-border-color-hover` | `transparent` |
| `--mp-tag-red-icon-color` | `rgb(var(--mp-red-9))` |
| `--mp-tag-red-text-color` | `rgb(var(--mp-red-9))` |
| `--mp-tag-orangered-bg` | `rgb(var(--mp-orangered-1))` |
| `--mp-tag-orangered-bg-hover` | `rgb(var(--mp-orangered-2))` |
| `--mp-tag-orangered-border-color` | `transparent` |
| `--mp-tag-orangered-border-color-hover` | `transparent` |
| `--mp-tag-orangered-icon-color` | `rgb(var(--mp-orangered-9))` |
| `--mp-tag-orangered-text-color` | `rgb(var(--mp-orangered-9))` |
| `--mp-tag-orange-bg` | `rgb(var(--mp-orange-1))` |
| `--mp-tag-orange-bg-hover` | `rgb(var(--mp-orange-2))` |
| `--mp-tag-orange-border-color` | `transparent` |
| `--mp-tag-orange-border-color-hover` | `transparent` |
| `--mp-tag-orange-icon-color` | `rgb(var(--mp-orange-9))` |
| `--mp-tag-orange-text-color` | `rgb(var(--mp-orange-9))` |
| `--mp-tag-gold-bg` | `rgb(var(--mp-gold-1))` |
| `--mp-tag-gold-bg-hover` | `rgb(var(--mp-gold-2))` |
| `--mp-tag-gold-border-color` | `transparent` |
| `--mp-tag-gold-border-color-hover` | `transparent` |
| `--mp-tag-gold-icon-color` | `rgb(var(--mp-gold-9))` |
| `--mp-tag-gold-text-color` | `rgb(var(--mp-gold-9))` |
| `--mp-tag-lime-bg` | `rgb(var(--mp-lime-1))` |
| `--mp-tag-lime-bg-hover` | `rgb(var(--mp-lime-2))` |
| `--mp-tag-lime-border-color` | `transparent` |
| `--mp-tag-lime-border-color-hover` | `transparent` |
| `--mp-tag-lime-icon-color` | `rgb(var(--mp-lime-9))` |
| `--mp-tag-lime-text-color` | `rgb(var(--mp-lime-9))` |
| `--mp-tag-green-bg` | `rgb(var(--mp-green-1))` |
| `--mp-tag-green-bg-hover` | `rgb(var(--mp-green-2))` |
| `--mp-tag-green-border-color` | `transparent` |
| `--mp-tag-green-border-color-hover` | `transparent` |
| `--mp-tag-green-icon-color` | `rgb(var(--mp-green-9))` |
| `--mp-tag-green-text-color` | `rgb(var(--mp-green-9))` |
| `--mp-tag-cyan-bg` | `rgb(var(--mp-cyan-1))` |
| `--mp-tag-cyan-bg-hover` | `rgb(var(--mp-cyan-2))` |
| `--mp-tag-cyan-border-color` | `transparent` |
| `--mp-tag-cyan-border-color-hover` | `transparent` |
| `--mp-tag-cyan-icon-color` | `rgb(var(--mp-cyan-9))` |
| `--mp-tag-cyan-text-color` | `rgb(var(--mp-cyan-9))` |
| `--mp-tag-blue-bg` | `rgb(var(--mp-blue-1))` |
| `--mp-tag-blue-bg-hover` | `rgb(var(--mp-blue-2))` |
| `--mp-tag-blue-border-color` | `transparent` |
| `--mp-tag-blue-border-color-hover` | `transparent` |
| `--mp-tag-blue-icon-color` | `rgb(var(--mp-blue-9))` |
| `--mp-tag-blue-text-color` | `rgb(var(--mp-blue-9))` |
| `--mp-tag-brand-bg` | `rgb(var(--mp-brand-1))` |
| `--mp-tag-brand-bg-hover` | `rgb(var(--mp-brand-2))` |
| `--mp-tag-brand-border-color` | `transparent` |
| `--mp-tag-brand-border-color-hover` | `transparent` |
| `--mp-tag-brand-icon-color` | `rgb(var(--mp-brand-9))` |
| `--mp-tag-brand-text-color` | `rgb(var(--mp-brand-9))` |
| `--mp-tag-purple-bg` | `rgb(var(--mp-purple-1))` |
| `--mp-tag-purple-bg-hover` | `rgb(var(--mp-purple-2))` |
| `--mp-tag-purple-border-color` | `transparent` |
| `--mp-tag-purple-border-color-hover` | `transparent` |
| `--mp-tag-purple-icon-color` | `rgb(var(--mp-purple-9))` |
| `--mp-tag-purple-text-color` | `rgb(var(--mp-purple-9))` |
| `--mp-tag-pinkpurple-bg` | `rgb(var(--mp-pinkpurple-1))` |
| `--mp-tag-pinkpurple-bg-hover` | `rgb(var(--mp-pinkpurple-2))` |
| `--mp-tag-pinkpurple-border-color` | `transparent` |
| `--mp-tag-pinkpurple-border-color-hover` | `transparent` |
| `--mp-tag-pinkpurple-icon-color` | `rgb(var(--mp-pinkpurple-9))` |
| `--mp-tag-pinkpurple-text-color` | `rgb(var(--mp-pinkpurple-9))` |
| `--mp-tag-magenta-bg` | `rgb(var(--mp-magenta-1))` |
| `--mp-tag-magenta-bg-hover` | `rgb(var(--mp-magenta-2))` |
| `--mp-tag-magenta-border-color` | `transparent` |
| `--mp-tag-magenta-border-color-hover` | `transparent` |
| `--mp-tag-magenta-icon-color` | `rgb(var(--mp-magenta-9))` |
| `--mp-tag-magenta-text-color` | `rgb(var(--mp-magenta-9))` |
| `--mp-tag-gray-bg` | `rgb(var(--mp-gray-2))` |
| `--mp-tag-gray-bg-hover` | `rgb(var(--mp-gray-3))` |
| `--mp-tag-gray-border-color` | `transparent` |
| `--mp-tag-gray-border-color-hover` | `transparent` |
| `--mp-tag-gray-icon-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-tag-gray-text-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-tag-close-margin-left` | `var(--mp-sys-space-3)` |
| `--mp-tag-close-font-size` | `var(--mp-tag-size-md-font-size)` |

### Color override boundaries

Preset outline stays transparent; loading does not trigger preset fill hover. Dark backgrounds consume bg/bg-hover with instance overrides. Preset icon-color is separate from text-color. Unchecked presets remain neutral, while an explicit color still applies. Preset/custom colors do not guarantee contrast on arbitrary backgrounds.

### Motion variables

Built-in motion follows `prefers-reduced-motion: reduce`. Reduced motion does not prevent loading-state or close-event updates.

| Token | Default |
| --- | --- |
| `--mp-tag-fade-duration` | `var(--mp-sys-motion-duration-fast)` |
