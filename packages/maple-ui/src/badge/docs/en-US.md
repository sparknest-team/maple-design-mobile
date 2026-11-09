# Badge

The same scenarios, parameters and interactions as Cedar. Only component prefixes differ; themes and site shells remain independent.

## Basic examples

### Basic usage

Badges use a red background and white text by default.

```demo
../example/demos/basic.vue
```

## Appearance and states

### Statuses and colors

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `content` | Badge content | Statuses and colors, Appearance configuration comparison |
| `status` | Semantic status | Statuses and colors |
| `mode` | Layout mode | Statuses and colors |
| `description` | Fallback description text | Statuses and colors |
| `color` | Custom color; outline uses it for border and text | Statuses and colors |
| `text-color` | Content text color | Statuses and colors |
<!-- demo-config-notes:end -->


```demo
../example/demos/color.vue
```

### Appearance configuration comparison

Choose a dimension to compare all its values side by side while keeping other settings and content identical. Change the other settings to inspect combinations; input specimens share one model.

<details>
<summary>Configuration details and limits</summary>

#### Appearance combinations

Use this example for notification counts and markers. Adjust variant, status, size and compare the component with the same data. Keep the content unchanged while comparing the available settings.

</details>

```demo
../example/demos/appearance-lab.vue
```

## Layout and arrangement

### Positions and offsets

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `position` | Physical corner or left/right midpoint inside the host box, default top-right. Only used in floating mode; RTL does not mirror it | Positions and offsets |
| `content` | Badge content | Positions and offsets |
| `dot` | Display a dot | Positions and offsets |
| `offset-x` | Horizontal offset; ignored in inline mode | Positions and offsets |
| `offset-y` | Vertical offset | Positions and offsets |
| `mode` | Layout mode | Positions and offsets |
<!-- demo-config-notes:end -->


```demo
../example/demos/position.vue
```

## Content and presentation

### Inline and standalone

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `content` | Badge content | Inline and standalone, Dot badges, Maximum and zero |
| `dot` | Display a dot | Inline and standalone, Dot badges, Show and hide |
| `description` | Fallback description text | Inline and standalone, Show and hide |
| `show-zero` | Show numeric zero | Maximum and zero, Show and hide |
| `mode` | Layout mode | Inline and standalone |
| `inline-position` | Inline badge at the logical start or end of the host content, default end. Only used in inline mode | Inline and standalone |
<!-- demo-config-notes:end -->


```demo
../example/demos/inline.vue
```

### Dot badges

```demo
../example/demos/dot.vue
```

### Maximum and zero

```demo
../example/demos/max.vue
```

### Show and hide

```demo
../example/demos/show.vue
```

## Customization and slots

### Custom content

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `content` | Badge content | Custom content |
| `mode` | Layout mode | Custom content |
| `inline-position` | Inline badge at the logical start or end of the host content, default end. Only used in inline mode | Custom content |
<!-- demo-config-notes:end -->


```demo
../example/demos/content.vue
```

## Usage notes

### Configuration

All public Badge variables and defaults:

## API

<!-- same-source-api:start -->
Numeric `content` supports finite nonnegative values. Zero appears only when `show-zero` is true; dot mode and the `content` slot follow the same rule. Strings are displayed verbatim, including `0`. Negative and non-finite numbers are hidden. `max=0` disables truncation and an invalid maximum falls back to 99. Offsets accept finite negative values; invalid offsets fall back to `0`. In floating mode positive offsets move inward from the anchored edge, while positive vertical offsets at side midpoints move downward. Inline mode ignores horizontal offset and applies vertical offset as a block margin selected by start/end. A provided default slot counts as a host even when empty. The `content` slot overrides the default badge but remains subject to `show` and numeric zero visibility.

### Badge Props

| Parameter | Description | Type | Default |
| --------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------- | :---------: |
| description | Fallback description text | `string` | `-` |
| content | Badge content | `number \| string` | `-` |
| max | Maximum displayed numeric badge value. Numeric content above this value is shown as `${max}+`. | `number` | `99` |
| dot | Display a dot | `boolean` | `false` |
| offset-x | Horizontal offset; ignored in inline mode | `number` | `0` |
| offset-y | Vertical offset | `number` | `0` |
| color | Custom color; outline uses it for border and text | `string` | `-` |
| text-color | Content text color | `string` | `-` |
| mode | Layout mode | `'floating' \| 'inline'` | `floating` |
| position | Physical corner or left/right midpoint inside the host box, default top-right. Only used in floating mode; RTL does not mirror it | `'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left' \| 'left' \| 'right'` | `top-right` |
| inline-position | Inline badge at the logical start or end of the host content, default end. Only used in inline mode | `'start' \| 'end'` | `end` |
| size | Size | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `md` |
| status | Semantic status | `SemanticStatus`<br>`'default' \| 'primary' \| 'secondary' \| 'tertiary' \| 'info' \| 'success' \| 'warning' \| 'danger'` | `danger` |
| show | Show the badge | `boolean` | `true` |
| show-zero | Show numeric zero | `boolean` | `false` |
| variant | Appearance | `'outline' \| 'default'` | `default` |

### Badge Events

No component-specific events.

### Badge Slots

| Slot | Description | Prop |
| ------- | ---------------- | ---- |
| default | Fallback description text | - |
| content | Content displayed inside the badge | - |

### Badge Methods

No public methods.

### Usage notes

Props and slots match across platforms. Without a default slot and with an empty description, the badge renders independently inline. Omitting content displays a dot. Each library reads text direction from its own configuration and supplies its own theme colors and CSS prefix.
<!-- same-source-api:end -->

## Types

```ts
type SemanticStatus = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'primary' | 'secondary' | 'tertiary'
type BadgeVariant = 'default' | 'outline'
type BadgeMode = 'floating' | 'inline'
type BadgePosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'left' | 'right'
type BadgeInlinePosition = 'start' | 'end'
type BadgeSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
```

## CSS Variables

Filled badge text follows Button: primary, info, success, warning, danger and secondary use `content-on-dark`; tertiary uses `content-on-dark` in light mode and `content-on-bright` in dark mode. Default notification badges use red backgrounds and white text; the neutral background remains `#e0e0e0`.

Colored outline text and borders follow Button, using the matching `content-brand`, `content-info`, `content-success`, `content-warning` and `content-danger` semantic roles; secondary and tertiary outlines use `content-secondary` for readability. `variant-outline-bg-color` works for every status and defaults to transparent. The `color` prop overrides outline text and border; `text-color` overrides text further. Both preserve control through the background variable. Recheck contrast after customizing foreground or background.

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-badge-bg-color` | `rgb(var(--mp-danger-7))` | `background-color` |
| `--mp-badge-border-color` | `var(--mp-sys-color-surface-default)` | `background-color`, `box-shadow` |
| `--mp-badge-description-size-lg-font-size` | `var(--mp-sys-font-size-lg)` | `font-size` |
| `--mp-badge-description-size-md-font-size` | `var(--mp-sys-font-size-md)` | `font-size` |
| `--mp-badge-description-size-sm-font-size` | `var(--mp-sys-font-size-xs)` | `font-size` |
| `--mp-badge-description-size-xl-font-size` | `var(--mp-sys-font-size-xl)` | `font-size` |
| `--mp-badge-description-size-xs-font-size` | `var(--mp-sys-font-size-xs)` | `font-size` |
| `--mp-badge-description-text-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-badge-font-weight` | `var(--mp-sys-font-weight-medium)` | `font-weight` |
| `--mp-badge-offset` | `2px` | `bottom`, `left`, `right`, `top` |
| `--mp-badge-ring-width` | `2px` | `box-shadow`, `line-height` |
| `--mp-badge-size-lg-border-radius` | `28px` | `border-radius` |
| `--mp-badge-size-lg-dot-height` | `7px` | `height` |
| `--mp-badge-size-lg-dot-width` | `7px` | `width` |
| `--mp-badge-size-lg-font-size` | `var(--mp-sys-font-size-md)` | `font-size` |
| `--mp-badge-size-lg-height` | `28px` | `line-height`, `min-width` |
| `--mp-badge-size-lg-padding` | `0 var(--mp-sys-space-4)` | `padding` |
| `--mp-badge-size-lg-scale` | `1` | `transform` |
| `--mp-badge-size-lg-space` | `var(--mp-sys-space-3)` | `margin-inline` |
| `--mp-badge-size-md-border-radius` | `24px` | `border-radius` |
| `--mp-badge-size-md-dot-height` | `6px` | `height` |
| `--mp-badge-size-md-dot-width` | `6px` | `width` |
| `--mp-badge-size-md-font-size` | `var(--mp-sys-font-size-xs)` | `font-size` |
| `--mp-badge-size-md-height` | `24px` | `line-height`, `min-width` |
| `--mp-badge-size-md-padding` | `0 var(--mp-sys-space-4)` | `padding` |
| `--mp-badge-size-md-scale` | `1` | `transform` |
| `--mp-badge-size-md-space` | `var(--mp-sys-space-3)` | `margin-inline` |
| `--mp-badge-size-sm-border-radius` | `20px` | `border-radius` |
| `--mp-badge-size-sm-dot-height` | `5px` | `height` |
| `--mp-badge-size-sm-dot-width` | `5px` | `width` |
| `--mp-badge-size-sm-font-size` | `var(--mp-sys-font-size-xs)` | `font-size` |
| `--mp-badge-size-sm-height` | `20px` | `line-height`, `min-width` |
| `--mp-badge-size-sm-padding` | `0 var(--mp-sys-space-3)` | `padding` |
| `--mp-badge-size-sm-scale` | `0.8333` | `transform` |
| `--mp-badge-size-sm-space` | `var(--mp-sys-space-1)` | `margin-inline` |
| `--mp-badge-size-xl-border-radius` | `32px` | `border-radius` |
| `--mp-badge-size-xl-dot-height` | `8px` | `height` |
| `--mp-badge-size-xl-dot-width` | `8px` | `width` |
| `--mp-badge-size-xl-font-size` | `var(--mp-sys-font-size-lg)` | `font-size` |
| `--mp-badge-size-xl-height` | `32px` | `line-height`, `min-width` |
| `--mp-badge-size-xl-padding` | `0 10px` | `padding` |
| `--mp-badge-size-xl-scale` | `1` | `transform` |
| `--mp-badge-size-xl-space` | `var(--mp-sys-space-4)` | `margin-inline` |
| `--mp-badge-size-xs-border-radius` | `20px` | `border-radius` |
| `--mp-badge-size-xs-dot-height` | `4px` | `height` |
| `--mp-badge-size-xs-dot-width` | `4px` | `width` |
| `--mp-badge-size-xs-font-size` | `var(--mp-sys-font-size-xs)` | `font-size` |
| `--mp-badge-size-xs-height` | `20px` | `line-height`, `min-width` |
| `--mp-badge-size-xs-padding` | `0 var(--mp-sys-space-3)` | `padding` |
| `--mp-badge-size-xs-scale` | `0.6667` | `transform` |
| `--mp-badge-size-xs-space` | `0px` | `margin-inline` |
| `--mp-badge-status-danger-bg-color` | `rgb(var(--mp-danger-7))` | `background-color` |
| `--mp-badge-status-danger-text-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-badge-status-default-bg-color` | `#e0e0e0` | `background-color` |
| `--mp-badge-status-default-text-color` | `var(--mp-sys-color-content-on-bright)` | `color` |
| `--mp-badge-status-info-bg-color` | `var(--mp-sys-color-status-info)` | `background-color` |
| `--mp-badge-status-info-text-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-badge-status-primary-bg-color` | `var(--mp-sys-color-action-primary)` | `background-color` |
| `--mp-badge-status-primary-text-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-badge-status-secondary-bg-color` | `rgb(var(--mp-gray-6))` | `background-color` |
| `--mp-badge-status-secondary-text-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-badge-status-success-bg-color` | `var(--mp-sys-color-status-success)` | `background-color` |
| `--mp-badge-status-success-text-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-badge-status-tertiary-bg-color` | `rgb(var(--mp-gray-7))` | `background-color` |
| `--mp-badge-status-tertiary-text-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-badge-status-warning-bg-color` | `var(--mp-sys-color-status-warning)` | `background-color` |
| `--mp-badge-status-warning-text-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-badge-text-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-badge-variant-outline-bg-color` | `transparent` | `background-color` |
| `--mp-badge-variant-outline-status-danger-text-color` | `var(--mp-sys-color-content-danger)` | `border`, `color` |
| `--mp-badge-variant-outline-status-default-text-color` | `var(--mp-sys-color-content-primary)` | `border`, `color` |
| `--mp-badge-variant-outline-status-info-text-color` | `var(--mp-sys-color-content-info)` | `border`, `color` |
| `--mp-badge-variant-outline-status-primary-text-color` | `var(--mp-sys-color-content-brand)` | `border`, `color` |
| `--mp-badge-variant-outline-status-secondary-text-color` | `var(--mp-sys-color-content-secondary)` | `border`, `color` |
| `--mp-badge-variant-outline-status-success-text-color` | `var(--mp-sys-color-content-success)` | `border`, `color` |
| `--mp-badge-variant-outline-status-tertiary-text-color` | `var(--mp-sys-color-content-secondary)` | `border`, `color` |
| `--mp-badge-variant-outline-status-warning-text-color` | `var(--mp-sys-color-content-warning)` | `border`, `color` |
| `--mp-badge-variant-outline-text-color` | `var(--mp-sys-color-content-danger)` | `border`, `color` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-badge-bg-color: rgb(var(--mp-danger-7));
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->

### Color override boundaries

The bg-color fallback and danger fill use red backgrounds with white text: danger level 7 in light mode and level 4 in dark mode. Fixed neutral light gray and secondary/tertiary gray levels are intentional component colors. Override the border-color isolation ring to match the host surface. Callers must ensure contrast for custom color/text-color values.
