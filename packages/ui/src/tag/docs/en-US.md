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


Close buttons support Space / Enter without selecting the tag. Selectable tags also support Space / Enter. Controlled checked is accepted by the parent; otherwise the component stores its state. Loading blocks selection.

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


Loading preserves the checked state and exposes disabled and busy semantics on checkable tags. If loading starts while the close control has focus, focus moves to the tag. Independent interactive controls in the content do not toggle the tag.

The close button name defaults to the current locale’s close text and can be overridden with `close-button-aria-label`. The tag root remains single-line; `nowrap` mainly enables the inner truncation wrapper and does not control multiline wrapping.

### Value and default value

Use ordinary `v-model`. `modelValue` is a selectable tag's boolean checked state. `defaultValue` initializes uncontrolled state once; later changes do not reset it. Explicit binding takes precedence, without initialization `update:modelValue`.

### Tag Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `status` | Theme color: `default` `primary` `secondary` `tertiary` `info` `success` `warning` `danger` | _string_ | `default` |
| `variant` | Variant: `default` (filled) / `outline` | _string_ | `default` |
| `size` | Size: `xs` `sm` `md` `lg` `xl` | _string_ | `md` |
| `round` | Whether to use a pill shape | _boolean_ | `false` |
| `show` | Visibility (v-model) | _boolean_ | `true` |
| `default-show` | Default visibility | _boolean_ | `true` |
| `loading` | Loading state | _boolean_ | `false` |
| `closable` | Whether closable | _boolean_ | `false` |
| `close-button-aria-label` | Accessible name of the close button; defaults to the current locale | `string` | `—` |
| `checkable` | Whether checkable | _boolean_ | `false` |
| `model-value` | Checked state when checkable (v-model) | _boolean_ | `true` |
| `default-value` | Default checked state when checkable | _boolean_ | `true` |
| `nowrap` | Whether to enable the content truncation wrapper; the root remains single-line | _boolean_ | `false` |
| `color` | Custom background (border color when outline) | _string_ | `-` |
| `text-color` | Custom text color | _string_ | `-` |

### Tag Events

| Event | Description | Arguments |
| --- | --- | --- |
| `update:show` | Visibility changed | `(show: boolean)` |
| `update:model-value` | Checked state changed (checkable) | `(checked: boolean)` |
| `close` | Close button clicked | `(event: MouseEvent)` |
| `check` | Checked state toggled (checkable) | `(checked: boolean, event: MouseEvent)` |

### Tag Slots

| Slot | Description |
| --- | --- |
| `default` | Tag content |
| `icon` | The prepend icon of alert |
| `close-icon` | Custom close icon |

## Types

```ts
type TagStatus = 'default' | 'primary' | 'secondary' | 'tertiary' | 'info' | 'success' | 'warning' | 'danger'
type TagSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type TagVariant = 'default' | 'outline'
```

## Usage notes



The application updates controlled show / checked values. Hiding retains the fade-out effect; class / style apply to the actual tag. CSS variables customize mobile touch sizing.

### Color override boundaries

Preset outline stays transparent; loading does not trigger preset fill hover. Dark backgrounds consume bg/bg-hover with instance overrides. Preset icon-color is separate from text-color. Unchecked presets remain neutral, while an explicit color still applies. Preset/custom colors do not guarantee contrast on arbitrary backgrounds.

## CSS Variables

The complete public contract is the `--mp-tag-*` set in `style/token.less`. Customize it with [ThemeProvider](#/en-US/theme-provider). Cedar uses the same logical names with a different brand prefix.

Status text and outline borders use the corresponding theme semantic colors with light colored fills. Unselected tags remain neutral; selected status colors take precedence over hover. The neutral background switches between fill-2 and fill-3. color takes precedence over status. Keep text readable on custom backgrounds and set text-color when needed.

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-tag-bg-not-checked-hover` | `var(--mp-sys-color-state-hover)` | `background-color` |
| `--mp-tag-blue-bg` | `rgb(var(--mp-blue-1))`<br>`rgba(var(--mp-blue-6), 0.2)` (`:root[maple-theme='dark']`) | `background-color` |
| `--mp-tag-blue-bg-hover` | `rgb(var(--mp-blue-2))`<br>`rgba(var(--mp-blue-6), 0.35)` (`:root[maple-theme='dark']`) | `background-color` |
| `--mp-tag-blue-border-color` | `transparent` | `border` |
| `--mp-tag-blue-border-color-hover` | `transparent` | `border-color` |
| `--mp-tag-blue-icon-color` | `rgb(var(--mp-blue-6))` | `color` |
| `--mp-tag-blue-text-color` | `rgb(var(--mp-blue-6))` | `border-color`, `color` |
| `--mp-tag-border-radius` | `var(--mp-sys-radius-md)` | `border-radius` |
| `--mp-tag-border-type` | `solid` | `border` |
| `--mp-tag-border-width` | `1px` | `border`, `line-height` |
| `--mp-tag-brand-bg` | `rgb(var(--mp-brand-1))`<br>`rgba(var(--mp-brand-6), 0.2)` (`:root[maple-theme='dark']`) | `background-color` |
| `--mp-tag-brand-bg-hover` | `rgb(var(--mp-brand-2))`<br>`rgba(var(--mp-brand-6), 0.35)` (`:root[maple-theme='dark']`) | `background-color` |
| `--mp-tag-brand-border-color` | `transparent` | `border` |
| `--mp-tag-brand-border-color-hover` | `transparent` | `border-color` |
| `--mp-tag-brand-icon-color` | `rgb(var(--mp-brand-6))` | `color` |
| `--mp-tag-brand-text-color` | `rgb(var(--mp-brand-6))` | `border-color`, `color` |
| `--mp-tag-close-font-size` | `var(--mp-tag-size-md-font-size)` | `font-size` |
| `--mp-tag-close-margin-left` | `var(--mp-sys-space-3)` | `margin-left`, `margin-right` |
| `--mp-tag-custom-text-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-tag-cyan-bg` | `rgb(var(--mp-cyan-1))`<br>`rgba(var(--mp-cyan-6), 0.2)` (`:root[maple-theme='dark']`) | `background-color` |
| `--mp-tag-cyan-bg-hover` | `rgb(var(--mp-cyan-2))`<br>`rgba(var(--mp-cyan-6), 0.35)` (`:root[maple-theme='dark']`) | `background-color` |
| `--mp-tag-cyan-border-color` | `transparent` | `border` |
| `--mp-tag-cyan-border-color-hover` | `transparent` | `border-color` |
| `--mp-tag-cyan-icon-color` | `rgb(var(--mp-cyan-6))` | `color` |
| `--mp-tag-cyan-text-color` | `rgb(var(--mp-cyan-6))` | `border-color`, `color` |
| `--mp-tag-default-bg` | `var(--mp-sys-color-state-hover)` | `background-color` |
| `--mp-tag-default-bg-hover` | `var(--mp-color-fill-3)` | `background-color` |
| `--mp-tag-default-border-color` | `transparent` | `border-color` |
| `--mp-tag-default-border-color-hover` | `transparent` | `border-color` |
| `--mp-tag-default-icon-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-tag-default-text-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-tag-fade-duration` | `var(--mp-sys-motion-duration-fast)` | `transition` |
| `--mp-tag-gold-bg` | `rgb(var(--mp-gold-1))`<br>`rgba(var(--mp-gold-6), 0.2)` (`:root[maple-theme='dark']`) | `background-color` |
| `--mp-tag-gold-bg-hover` | `rgb(var(--mp-gold-2))`<br>`rgba(var(--mp-gold-6), 0.35)` (`:root[maple-theme='dark']`) | `background-color` |
| `--mp-tag-gold-border-color` | `transparent` | `border` |
| `--mp-tag-gold-border-color-hover` | `transparent` | `border-color` |
| `--mp-tag-gold-icon-color` | `rgb(var(--mp-gold-6))` | `color` |
| `--mp-tag-gold-text-color` | `rgb(var(--mp-gold-6))` | `border-color`, `color` |
| `--mp-tag-gray-bg` | `rgb(var(--mp-gray-2))`<br>`rgba(var(--mp-gray-6), 0.2)` (`:root[maple-theme='dark']`) | `background-color` |
| `--mp-tag-gray-bg-hover` | `rgb(var(--mp-gray-3))`<br>`rgba(var(--mp-gray-6), 0.35)` (`:root[maple-theme='dark']`) | `background-color` |
| `--mp-tag-gray-border-color` | `transparent` | `border` |
| `--mp-tag-gray-border-color-hover` | `transparent` | `border-color` |
| `--mp-tag-gray-icon-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-tag-gray-text-color` | `var(--mp-sys-color-content-secondary)` | `border-color`, `color` |
| `--mp-tag-green-bg` | `rgb(var(--mp-green-1))`<br>`rgba(var(--mp-green-6), 0.2)` (`:root[maple-theme='dark']`) | `background-color` |
| `--mp-tag-green-bg-hover` | `rgb(var(--mp-green-2))`<br>`rgba(var(--mp-green-6), 0.35)` (`:root[maple-theme='dark']`) | `background-color` |
| `--mp-tag-green-border-color` | `transparent` | `border` |
| `--mp-tag-green-border-color-hover` | `transparent` | `border-color` |
| `--mp-tag-green-icon-color` | `rgb(var(--mp-green-6))` | `color` |
| `--mp-tag-green-text-color` | `rgb(var(--mp-green-6))` | `border-color`, `color` |
| `--mp-tag-icon-margin-right` | `var(--mp-sys-space-3)` | `margin-left`, `margin-right` |
| `--mp-tag-lime-bg` | `rgb(var(--mp-lime-1))`<br>`rgba(var(--mp-lime-6), 0.2)` (`:root[maple-theme='dark']`) | `background-color` |
| `--mp-tag-lime-bg-hover` | `rgb(var(--mp-lime-2))`<br>`rgba(var(--mp-lime-6), 0.35)` (`:root[maple-theme='dark']`) | `background-color` |
| `--mp-tag-lime-border-color` | `transparent` | `border` |
| `--mp-tag-lime-border-color-hover` | `transparent` | `border-color` |
| `--mp-tag-lime-icon-color` | `rgb(var(--mp-lime-6))` | `color` |
| `--mp-tag-lime-text-color` | `rgb(var(--mp-lime-6))` | `border-color`, `color` |
| `--mp-tag-magenta-bg` | `rgb(var(--mp-magenta-1))`<br>`rgba(var(--mp-magenta-6), 0.2)` (`:root[maple-theme='dark']`) | `background-color` |
| `--mp-tag-magenta-bg-hover` | `rgb(var(--mp-magenta-2))`<br>`rgba(var(--mp-magenta-6), 0.35)` (`:root[maple-theme='dark']`) | `background-color` |
| `--mp-tag-magenta-border-color` | `transparent` | `border` |
| `--mp-tag-magenta-border-color-hover` | `transparent` | `border-color` |
| `--mp-tag-magenta-icon-color` | `rgb(var(--mp-magenta-6))` | `color` |
| `--mp-tag-magenta-text-color` | `rgb(var(--mp-magenta-6))` | `border-color`, `color` |
| `--mp-tag-orange-bg` | `rgb(var(--mp-orange-1))`<br>`rgba(var(--mp-orange-6), 0.2)` (`:root[maple-theme='dark']`) | `background-color` |
| `--mp-tag-orange-bg-hover` | `rgb(var(--mp-orange-2))`<br>`rgba(var(--mp-orange-6), 0.35)` (`:root[maple-theme='dark']`) | `background-color` |
| `--mp-tag-orange-border-color` | `transparent` | `border` |
| `--mp-tag-orange-border-color-hover` | `transparent` | `border-color` |
| `--mp-tag-orange-icon-color` | `rgb(var(--mp-orange-6))` | `color` |
| `--mp-tag-orange-text-color` | `rgb(var(--mp-orange-6))` | `border-color`, `color` |
| `--mp-tag-orangered-bg` | `rgb(var(--mp-orangered-1))`<br>`rgba(var(--mp-orangered-6), 0.2)` (`:root[maple-theme='dark']`) | `background-color` |
| `--mp-tag-orangered-bg-hover` | `rgb(var(--mp-orangered-2))`<br>`rgba(var(--mp-orangered-6), 0.35)` (`:root[maple-theme='dark']`) | `background-color` |
| `--mp-tag-orangered-border-color` | `transparent` | `border` |
| `--mp-tag-orangered-border-color-hover` | `transparent` | `border-color` |
| `--mp-tag-orangered-icon-color` | `rgb(var(--mp-orangered-6))` | `color` |
| `--mp-tag-orangered-text-color` | `rgb(var(--mp-orangered-6))` | `border-color`, `color` |
| `--mp-tag-padding-horizontal` | `8px` | `padding` |
| `--mp-tag-padding-vertical` | `0` | `line-height`, `padding` |
| `--mp-tag-pinkpurple-bg` | `rgb(var(--mp-pinkpurple-1))`<br>`rgba(var(--mp-pinkpurple-6), 0.2)` (`:root[maple-theme='dark']`) | `background-color` |
| `--mp-tag-pinkpurple-bg-hover` | `rgb(var(--mp-pinkpurple-2))`<br>`rgba(var(--mp-pinkpurple-6), 0.35)` (`:root[maple-theme='dark']`) | `background-color` |
| `--mp-tag-pinkpurple-border-color` | `transparent` | `border` |
| `--mp-tag-pinkpurple-border-color-hover` | `transparent` | `border-color` |
| `--mp-tag-pinkpurple-icon-color` | `rgb(var(--mp-pinkpurple-6))` | `color` |
| `--mp-tag-pinkpurple-text-color` | `rgb(var(--mp-pinkpurple-6))` | `border-color`, `color` |
| `--mp-tag-purple-bg` | `rgb(var(--mp-purple-1))`<br>`rgba(var(--mp-purple-6), 0.2)` (`:root[maple-theme='dark']`) | `background-color` |
| `--mp-tag-purple-bg-hover` | `rgb(var(--mp-purple-2))`<br>`rgba(var(--mp-purple-6), 0.35)` (`:root[maple-theme='dark']`) | `background-color` |
| `--mp-tag-purple-border-color` | `transparent` | `border` |
| `--mp-tag-purple-border-color-hover` | `transparent` | `border-color` |
| `--mp-tag-purple-icon-color` | `rgb(var(--mp-purple-6))` | `color` |
| `--mp-tag-purple-text-color` | `rgb(var(--mp-purple-6))` | `border-color`, `color` |
| `--mp-tag-red-bg` | `rgb(var(--mp-red-1))`<br>`rgba(var(--mp-red-6), 0.2)` (`:root[maple-theme='dark']`) | `background-color` |
| `--mp-tag-red-bg-hover` | `rgb(var(--mp-red-2))`<br>`rgba(var(--mp-red-6), 0.35)` (`:root[maple-theme='dark']`) | `background-color` |
| `--mp-tag-red-border-color` | `transparent` | `border` |
| `--mp-tag-red-border-color-hover` | `transparent` | `border-color` |
| `--mp-tag-red-icon-color` | `rgb(var(--mp-red-6))` | `color` |
| `--mp-tag-red-text-color` | `rgb(var(--mp-red-6))` | `border-color`, `color` |
| `--mp-tag-round-radius` | `100px` | `border-radius` |
| `--mp-tag-size-lg` | `30px` | `height`, `line-height` |
| `--mp-tag-size-lg-font-size` | `var(--mp-sys-font-size-md)` | `font-size` |
| `--mp-tag-size-md` | `26px` | `height`, `line-height` |
| `--mp-tag-size-md-font-size` | `var(--mp-sys-font-size-sm)` | `font-size` |
| `--mp-tag-size-sm` | `22px` | `height`, `line-height` |
| `--mp-tag-size-sm-font-size` | `var(--mp-sys-font-size-xs)` | `font-size` |
| `--mp-tag-size-xl` | `34px` | `height`, `line-height` |
| `--mp-tag-size-xl-font-size` | `var(--mp-sys-font-size-lg)` | `font-size` |
| `--mp-tag-size-xs` | `18px` | `height`, `line-height` |
| `--mp-tag-size-xs-font-size` | `var(--mp-sys-font-size-xs)` | `font-size` |
| `--mp-tag-status-danger-bg-color` | `rgb(var(--mp-danger-1))` | `background-color` |
| `--mp-tag-status-danger-text-color` | `var(--mp-sys-color-content-danger)` | `color` |
| `--mp-tag-status-info-bg-color` | `rgb(var(--mp-blue-1))` | `background-color` |
| `--mp-tag-status-info-text-color` | `var(--mp-sys-color-content-info)` | `color` |
| `--mp-tag-status-primary-bg-color` | `rgb(var(--mp-primary-1))` | `background-color` |
| `--mp-tag-status-primary-text-color` | `var(--mp-sys-color-content-brand)` | `color` |
| `--mp-tag-status-secondary-bg-color` | `rgb(var(--mp-gray-2))` | `background-color` |
| `--mp-tag-status-secondary-text-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-tag-status-success-bg-color` | `rgb(var(--mp-success-1))` | `background-color` |
| `--mp-tag-status-success-text-color` | `var(--mp-sys-color-content-success)` | `color` |
| `--mp-tag-status-tertiary-bg-color` | `rgb(var(--mp-gray-1))` | `background-color` |
| `--mp-tag-status-tertiary-text-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-tag-status-warning-bg-color` | `rgb(var(--mp-warning-1))` | `background-color` |
| `--mp-tag-status-warning-text-color` | `var(--mp-sys-color-content-warning)` | `color` |
| `--mp-tag-text-font-weight` | `var(--mp-sys-font-weight-medium)` | `font-weight` |
| `--mp-tag-variant-outline-default-border-color` | `var(--mp-sys-color-border-default)` | `border` |
| `--mp-tag-variant-outline-default-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-tag-variant-outline-status-danger-color` | `var(--mp-sys-color-content-danger)` | `border`, `color` |
| `--mp-tag-variant-outline-status-info-color` | `var(--mp-sys-color-content-info)` | `border`, `color` |
| `--mp-tag-variant-outline-status-primary-color` | `var(--mp-sys-color-content-brand)` | `border`, `color` |
| `--mp-tag-variant-outline-status-secondary-color` | `var(--mp-sys-color-content-secondary)` | `border`, `color` |
| `--mp-tag-variant-outline-status-success-color` | `var(--mp-sys-color-content-success)` | `border`, `color` |
| `--mp-tag-variant-outline-status-tertiary-color` | `var(--mp-sys-color-content-secondary)` | `border`, `color` |
| `--mp-tag-variant-outline-status-warning-color` | `var(--mp-sys-color-content-warning)` | `border`, `color` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-tag-blue-border-color: transparent;
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->

### Motion

Built-in motion follows `prefers-reduced-motion: reduce`. Reduced motion does not prevent loading-state or close-event updates.
