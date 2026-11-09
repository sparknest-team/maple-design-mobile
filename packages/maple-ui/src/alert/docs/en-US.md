# Alert

### Intro

Alerts display brief messages for the user without interrupting their use.

## Basic examples

### Basic usage

```demo
../example/demos/basic.vue
```

## Appearance and states

### Appearance configuration comparison

Choose a dimension to compare all its values side by side while keeping other settings and content identical. Change the other settings to inspect combinations; input specimens share one model.

<details>
<summary>Configuration details and limits</summary>

#### Appearance combinations

Use this example for the emphasis of informational messages. Adjust variant, status and compare the component with the same data. Keep the content unchanged while comparing the available settings.

#### Type

`type`: `info` / `success` / `warning` / `danger` / `default`. `default` has no built-in icon; use `#icon` to customize.

</details>

```demo
../example/demos/appearance-lab.vue
```

## Content and presentation

### Title, alignment and banners

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `message` | Content | Title, alignment and banners, Hide Icon, Action |
| `title` | Title | Title, alignment and banners, Hide Icon, Action |
| `center` | Whether to center content | Title, alignment and banners |
| `banner` | Full-width mode without rounded corners | Title, alignment and banners |
| `show-icon` | Whether to show the left icon | Hide Icon |
<!-- demo-config-notes:end -->


Compare title hierarchy, centered content and page-wide banners. Actions and dismiss behavior have separate examples.

```demo
../example/demos/content-comparison.vue
```

### Hide Icon

```demo
../example/demos/show-icon.vue
```

### Action

```demo
../example/demos/action.vue
```

### Message

```demo
../example/demos/message.vue
```

## Customization and slots

### Custom Icon

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `title` | Title | Custom Icon |
| `message` | Content | Custom Icon |
<!-- demo-config-notes:end -->


```demo
../example/demos/custom-icon.vue
```

## Interaction and control

### Dismiss controls and custom icons

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `title` | Title | Dismiss controls and custom icons |
| `message` | Content | Dismiss controls and custom icons |
| `closable` | Whether the alert is `closeable` | Dismiss controls and custom icons |
<!-- demo-config-notes:end -->


Operate the default and custom dismiss controls to compare the same dismissal behavior.

<details>
<summary>Configuration details and limits</summary>

#### Allow To Close

Activate Close with a click, Space or Enter. The close event starts closing; closed follows the leave transition. Unmounting the component in close prevents observing its completed transition. This Demo retains the instance, counts both events, and reopens with a fresh key without changing other Alert instances.

</details>

```demo
../example/demos/dismiss-comparison.vue
```

## API

### Alert Props

| Prop | Description | Type | Default |
| ----------- | -------------------------------------------------------------------- | ------------------- | ---------- |
| status | Type, optional values are `info`, `success`, `warning`, `danger`, `default` | _AlertStatus_<br>`'default' \| 'success' \| 'info' \| 'warning' \| 'danger'` | `info` |
| `variant` | Variant, optional values are `standard` `outline` `tonal` | _AlertVariant_<br>`'standard' \| 'outline' \| 'tonal'` | `standard` |
| `color` | Background color | _string_ | `-` |
| `title` | Title | _string_ | `-` |
| `message` | Content | _string_ | `-` |
| `show-icon` | Whether to show the left icon | _boolean_ | `true` |
| `closable` | Whether the alert is `closeable` | _boolean_ | `false` |
| `banner` | Full-width mode without rounded corners | _boolean_ | `false` |
| `center` | Whether to center content | _boolean_ | `false` |
| `elevation` | Elevation, optional values are `true`, `false`, and levels from `0-24` | _number \| boolean_ | `false` |

### Alert Slots

| Name | Description |
| ------------ | ---------- |
| `default` | Content |
| `title` | Title |
| `icon` | The prepend icon of alert |
| `action` | Right action |
| `close-icon` | The close icon of alert |

### Alert Events

| Event | Description | Callback arguments |
| -------- | ------------------ | -------------- |
| `close` | Triggered when the Close button is clicked and can only be used when the Close button is displayed | `event: MouseEvent` |
| `closed` | Triggered after the leave transition completes | `-` |

## Types

```ts
import type { AlertInstance, AlertProps, AlertStatus, AlertVariant } from 'maple-ui'
```

## Usage notes



The close button supports keyboard activation. close fires once; closed fires after the leave transition finishes.

### Close labels and elevation types

The close control uses the shared `common.close` locale key and updates reactively with its language scope. The `close-icon` slot replaces only the graphic. Customize `locale.common.close` through Cedar ConfigProvider, or the `'common.close'` message through Maple LocaleProvider.

`elevation` accepts only booleans or numbers. Use `:elevation="4"` for a numeric level; the string `elevation="4"` is outside the public type. Keyboard activation and clicks emit a MouseEvent; `closed` still fires after the leave transition.

## CSS Variables

See `--mp-alert-*` variables under `:root` in `style/token.less`. All use the `--mp-alert-` prefix and support customization through [ThemeProvider](#/en-US/theme-provider).

Colored titles, content, icons and outline borders use readable system content colors. standard and tonal share the same level-1 background; standard adds a subtle decorative border. Default titles use content-primary; body text and icons use content-secondary. The content variable also sets the root inherited color, used by close icons and actions without an explicit color. Maple dark mode inherits these colors while retaining its geometry overrides: 16px padding, 22px icons, 12px icon/close gaps and 1.5 body line height. color changes only the background; callers must also verify foreground contrast. The table lists :root defaults, not theme overrides.

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-alert-action-margin-left` | `var(--mp-sys-space-5)` | `margin-inline-start` |
| `--mp-alert-border-radius` | `var(--mp-sys-radius-md)` | `border-radius` |
| `--mp-alert-border-width` | `1px` | `border` |
| `--mp-alert-close-duration` | `var(--mp-sys-motion-duration-slow)` | `transition` |
| `--mp-alert-close-margin-left` | `var(--mp-sys-space-4)` | `margin-inline-start` |
| `--mp-alert-font-size-content` | `var(--mp-sys-font-size-md)` | `font-size` |
| `--mp-alert-font-size-title` | `var(--mp-sys-font-size-lg)` | `font-size` |
| `--mp-alert-font-weight-title` | `var(--mp-sys-font-weight-medium)` | `font-weight` |
| `--mp-alert-icon-margin-right` | `var(--mp-sys-space-4)` | `margin-inline-end` |
| `--mp-alert-icon-size` | `16px` | `font-size` |
| `--mp-alert-line-height` | `1.5715` | `line-height` |
| `--mp-alert-line-height-title` | `1.5` | `line-height` |
| `--mp-alert-outline-danger-border` | `var(--mp-sys-color-content-danger)` | `border-color` |
| `--mp-alert-outline-danger-content` | `var(--mp-sys-color-content-danger)` | `color` |
| `--mp-alert-outline-danger-icon` | `var(--mp-sys-color-content-danger)` | `color` |
| `--mp-alert-outline-danger-title` | `var(--mp-sys-color-content-danger)` | `color` |
| `--mp-alert-outline-default-border` | `var(--mp-sys-color-border-default)` | `border-color` |
| `--mp-alert-outline-default-content` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-alert-outline-default-icon` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-alert-outline-default-title` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-alert-outline-info-border` | `var(--mp-sys-color-content-info)` | `border-color` |
| `--mp-alert-outline-info-content` | `var(--mp-sys-color-content-info)` | `color` |
| `--mp-alert-outline-info-icon` | `var(--mp-sys-color-content-info)` | `color` |
| `--mp-alert-outline-info-title` | `var(--mp-sys-color-content-info)` | `color` |
| `--mp-alert-outline-success-border` | `var(--mp-sys-color-content-success)` | `border-color` |
| `--mp-alert-outline-success-content` | `var(--mp-sys-color-content-success)` | `color` |
| `--mp-alert-outline-success-icon` | `var(--mp-sys-color-content-success)` | `color` |
| `--mp-alert-outline-success-title` | `var(--mp-sys-color-content-success)` | `color` |
| `--mp-alert-outline-warning-border` | `var(--mp-sys-color-content-warning)` | `border-color` |
| `--mp-alert-outline-warning-content` | `var(--mp-sys-color-content-warning)` | `color` |
| `--mp-alert-outline-warning-icon` | `var(--mp-sys-color-content-warning)` | `color` |
| `--mp-alert-outline-warning-title` | `var(--mp-sys-color-content-warning)` | `color` |
| `--mp-alert-padding-horizontal` | `var(--mp-sys-space-6)` | `padding` |
| `--mp-alert-padding-horizontal-with-title` | `var(--mp-sys-space-6)` | `padding` |
| `--mp-alert-padding-vertical` | `var(--mp-sys-space-4)` | `padding` |
| `--mp-alert-padding-vertical-with-title` | `var(--mp-sys-space-6)` | `padding` |
| `--mp-alert-standard-danger-bg` | `rgb(var(--mp-danger-1))` | `background-color` |
| `--mp-alert-standard-danger-border` | `rgb(var(--mp-danger-3))` | `border-color` |
| `--mp-alert-standard-danger-content` | `var(--mp-sys-color-content-danger)` | `color` |
| `--mp-alert-standard-danger-icon` | `var(--mp-sys-color-content-danger)` | `color` |
| `--mp-alert-standard-danger-title` | `var(--mp-sys-color-content-danger)` | `color` |
| `--mp-alert-standard-default-bg` | `var(--mp-color-fill-2)` | `background-color` |
| `--mp-alert-standard-default-border` | `var(--mp-sys-color-border-default)` | `border-color` |
| `--mp-alert-standard-default-content` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-alert-standard-default-icon` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-alert-standard-default-title` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-alert-standard-info-bg` | `rgb(var(--mp-blue-1))` | `background-color` |
| `--mp-alert-standard-info-border` | `rgb(var(--mp-blue-3))` | `border-color` |
| `--mp-alert-standard-info-content` | `var(--mp-sys-color-content-info)` | `color` |
| `--mp-alert-standard-info-icon` | `var(--mp-sys-color-content-info)` | `color` |
| `--mp-alert-standard-info-title` | `var(--mp-sys-color-content-info)` | `color` |
| `--mp-alert-standard-success-bg` | `rgb(var(--mp-success-1))` | `background-color` |
| `--mp-alert-standard-success-border` | `rgb(var(--mp-success-3))` | `border-color` |
| `--mp-alert-standard-success-content` | `var(--mp-sys-color-content-success)` | `color` |
| `--mp-alert-standard-success-icon` | `var(--mp-sys-color-content-success)` | `color` |
| `--mp-alert-standard-success-title` | `var(--mp-sys-color-content-success)` | `color` |
| `--mp-alert-standard-warning-bg` | `rgb(var(--mp-warning-1))` | `background-color` |
| `--mp-alert-standard-warning-border` | `rgb(var(--mp-warning-3))` | `border-color` |
| `--mp-alert-standard-warning-content` | `var(--mp-sys-color-content-warning)` | `color` |
| `--mp-alert-standard-warning-icon` | `var(--mp-sys-color-content-warning)` | `color` |
| `--mp-alert-standard-warning-title` | `var(--mp-sys-color-content-warning)` | `color` |
| `--mp-alert-title-margin-bottom` | `var(--mp-sys-space-2)` | `margin-bottom` |
| `--mp-alert-tonal-danger-bg` | `rgb(var(--mp-danger-1))` | `background-color` |
| `--mp-alert-tonal-danger-content` | `var(--mp-sys-color-content-danger)` | `color` |
| `--mp-alert-tonal-danger-icon` | `var(--mp-sys-color-content-danger)` | `color` |
| `--mp-alert-tonal-danger-title` | `var(--mp-sys-color-content-danger)` | `color` |
| `--mp-alert-tonal-default-bg` | `var(--mp-color-fill-2)` | `background-color` |
| `--mp-alert-tonal-default-content` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-alert-tonal-default-icon` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-alert-tonal-default-title` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-alert-tonal-info-bg` | `rgb(var(--mp-blue-1))` | `background-color` |
| `--mp-alert-tonal-info-content` | `var(--mp-sys-color-content-info)` | `color` |
| `--mp-alert-tonal-info-icon` | `var(--mp-sys-color-content-info)` | `color` |
| `--mp-alert-tonal-info-title` | `var(--mp-sys-color-content-info)` | `color` |
| `--mp-alert-tonal-success-bg` | `rgb(var(--mp-success-1))` | `background-color` |
| `--mp-alert-tonal-success-content` | `var(--mp-sys-color-content-success)` | `color` |
| `--mp-alert-tonal-success-icon` | `var(--mp-sys-color-content-success)` | `color` |
| `--mp-alert-tonal-success-title` | `var(--mp-sys-color-content-success)` | `color` |
| `--mp-alert-tonal-warning-bg` | `rgb(var(--mp-warning-1))` | `background-color` |
| `--mp-alert-tonal-warning-content` | `var(--mp-sys-color-content-warning)` | `color` |
| `--mp-alert-tonal-warning-icon` | `var(--mp-sys-color-content-warning)` | `color` |
| `--mp-alert-tonal-warning-title` | `var(--mp-sys-color-content-warning)` | `color` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-alert-border-radius: var(--mp-sys-radius-md);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->

### Motion

Built-in motion follows `prefers-reduced-motion: reduce`. Reduced motion does not prevent loading-state or close-event updates.
