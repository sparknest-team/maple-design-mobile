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

### Props

| Arguments | Description | Type | Default |
| ----------- | -------------------------------------------------------------------- | ------------------- | ---------- |
| status | Type, optional values are `info`, `success`, `warning`, `danger`, `default` | _AlertStatus_ | `info` |
| `variant` | Variant, optional values are `standard` `outline` `tonal` | _AlertVariant_ | `standard` |
| `color` | Background color | _string_ | `-` |
| `title` | Title | _string_ | `-` |
| `message` | Content | _string_ | `-` |
| `show-icon` | Whether to show the left icon | _boolean_ | `true` |
| `closable` | Whether the alert is `closeable` | _boolean_ | `false` |
| `banner` | Full-width mode without rounded corners | _boolean_ | `false` |
| `center` | Whether to center content | _boolean_ | `false` |
| `elevation` | Elevation, optional values are `true`, `false`, and levels from `0-24` | _number \| boolean_ | `false` |

### Slots

| Name | Description |
| ------------ | ---------- |
| `default` | Content |
| `title` | Title |
| `icon` | The prepend icon of alert |
| `action` | Right action |
| `close-icon` | The close icon of alert |

### Events

| Event | Description | Callback arguments |
| -------- | ------------------ | -------------- |
| `close` | Triggered when the Close button is clicked and can only be used when the Close button is displayed | `event: Event` |
| `closed` | Triggered after the leave transition completes | `-` |

### Type definitions

```ts
import type { AlertInstance, AlertProps, AlertStatus, AlertVariant } from 'maple-ui'
```

### Style variables

See `--mp-alert-*` variables under `:root` in `style/token.less`. All use the `--mp-alert-` prefix and support customization through [StyleProvider](#/en-US/style-provider).

## Migration notes (breaking changes)

- `closeable` → `closable`
- Adds `default` status and `show-icon` / `banner` / `center` / `closed` APIs
- Removes `content` slot; its structure becomes `body`

## Shared implementation and platform boundaries

Each platform maintains a complete local implementation. They do not import a common core or share component instances or reactive state. Changes must update both implementations. Component bodies, props, key styles and paired tests have read-only source consistency checks; theme tokens and installation entries remain local to each library.

The close button supports keyboard activation. close fires once, and closed fires after the leave transition. Maple renamed its internal __close-icon class to __close-btn. Default icons are adapted locally in each library.

### Complete variable defaults

Colored titles, content, icons and outline borders use readable system content colors. standard and tonal share the same level-1 background; standard adds a subtle decorative border. Default titles use content-primary; body text and icons use content-secondary. The content variable also sets the root inherited color, used by close icons and actions without an explicit color. Maple dark mode inherits these colors while retaining its geometry overrides: 16px padding, 22px icons, 12px icon/close gaps and 1.5 body line height. color changes only the background; callers must also verify foreground contrast. The table lists :root defaults, not theme overrides.

| Variable | Default |
| --- | --- |
| `--mp-alert-padding-vertical` | `var(--mp-sys-space-4)` |
| `--mp-alert-padding-horizontal` | `var(--mp-sys-space-6)` |
| `--mp-alert-padding-vertical-with-title` | `var(--mp-sys-space-6)` |
| `--mp-alert-padding-horizontal-with-title` | `var(--mp-sys-space-6)` |
| `--mp-alert-border-radius` | `var(--mp-sys-radius-md)` |
| `--mp-alert-border-width` | `1px` |
| `--mp-alert-font-size-content` | `var(--mp-sys-font-size-md)` |
| `--mp-alert-font-size-title` | `var(--mp-sys-font-size-lg)` |
| `--mp-alert-font-weight-title` | `var(--mp-sys-font-weight-medium)` |
| `--mp-alert-line-height` | `1.5715` |
| `--mp-alert-line-height-title` | `1.5` |
| `--mp-alert-title-margin-bottom` | `var(--mp-sys-space-2)` |
| `--mp-alert-icon-size` | `16px` |
| `--mp-alert-icon-margin-right` | `var(--mp-sys-space-4)` |
| `--mp-alert-action-margin-left` | `var(--mp-sys-space-5)` |
| `--mp-alert-close-margin-left` | `var(--mp-sys-space-4)` |
| `--mp-alert-standard-info-bg` | `rgb(var(--mp-blue-1))` |
| `--mp-alert-standard-info-border` | `rgb(var(--mp-blue-3))` |
| `--mp-alert-standard-info-title` | `var(--mp-sys-color-content-info)` |
| `--mp-alert-standard-info-content` | `var(--mp-sys-color-content-info)` |
| `--mp-alert-standard-info-icon` | `var(--mp-sys-color-content-info)` |
| `--mp-alert-standard-success-bg` | `rgb(var(--mp-success-1))` |
| `--mp-alert-standard-success-border` | `rgb(var(--mp-success-3))` |
| `--mp-alert-standard-success-title` | `var(--mp-sys-color-content-success)` |
| `--mp-alert-standard-success-content` | `var(--mp-sys-color-content-success)` |
| `--mp-alert-standard-success-icon` | `var(--mp-sys-color-content-success)` |
| `--mp-alert-standard-warning-bg` | `rgb(var(--mp-warning-1))` |
| `--mp-alert-standard-warning-border` | `rgb(var(--mp-warning-3))` |
| `--mp-alert-standard-warning-title` | `var(--mp-sys-color-content-warning)` |
| `--mp-alert-standard-warning-content` | `var(--mp-sys-color-content-warning)` |
| `--mp-alert-standard-warning-icon` | `var(--mp-sys-color-content-warning)` |
| `--mp-alert-standard-danger-bg` | `rgb(var(--mp-danger-1))` |
| `--mp-alert-standard-danger-border` | `rgb(var(--mp-danger-3))` |
| `--mp-alert-standard-danger-title` | `var(--mp-sys-color-content-danger)` |
| `--mp-alert-standard-danger-content` | `var(--mp-sys-color-content-danger)` |
| `--mp-alert-standard-danger-icon` | `var(--mp-sys-color-content-danger)` |
| `--mp-alert-standard-default-bg` | `var(--mp-color-fill-2)` |
| `--mp-alert-standard-default-border` | `var(--mp-sys-color-border-default)` |
| `--mp-alert-standard-default-title` | `var(--mp-sys-color-content-primary)` |
| `--mp-alert-standard-default-content` | `var(--mp-sys-color-content-secondary)` |
| `--mp-alert-standard-default-icon` | `var(--mp-sys-color-content-secondary)` |
| `--mp-alert-tonal-info-bg` | `rgb(var(--mp-blue-1))` |
| `--mp-alert-tonal-info-title` | `var(--mp-sys-color-content-info)` |
| `--mp-alert-tonal-info-content` | `var(--mp-sys-color-content-info)` |
| `--mp-alert-tonal-info-icon` | `var(--mp-sys-color-content-info)` |
| `--mp-alert-tonal-success-bg` | `rgb(var(--mp-success-1))` |
| `--mp-alert-tonal-success-title` | `var(--mp-sys-color-content-success)` |
| `--mp-alert-tonal-success-content` | `var(--mp-sys-color-content-success)` |
| `--mp-alert-tonal-success-icon` | `var(--mp-sys-color-content-success)` |
| `--mp-alert-tonal-warning-bg` | `rgb(var(--mp-warning-1))` |
| `--mp-alert-tonal-warning-title` | `var(--mp-sys-color-content-warning)` |
| `--mp-alert-tonal-warning-content` | `var(--mp-sys-color-content-warning)` |
| `--mp-alert-tonal-warning-icon` | `var(--mp-sys-color-content-warning)` |
| `--mp-alert-tonal-danger-bg` | `rgb(var(--mp-danger-1))` |
| `--mp-alert-tonal-danger-title` | `var(--mp-sys-color-content-danger)` |
| `--mp-alert-tonal-danger-content` | `var(--mp-sys-color-content-danger)` |
| `--mp-alert-tonal-danger-icon` | `var(--mp-sys-color-content-danger)` |
| `--mp-alert-tonal-default-bg` | `var(--mp-color-fill-2)` |
| `--mp-alert-tonal-default-title` | `var(--mp-sys-color-content-primary)` |
| `--mp-alert-tonal-default-content` | `var(--mp-sys-color-content-secondary)` |
| `--mp-alert-tonal-default-icon` | `var(--mp-sys-color-content-secondary)` |
| `--mp-alert-outline-info-border` | `var(--mp-sys-color-content-info)` |
| `--mp-alert-outline-info-title` | `var(--mp-sys-color-content-info)` |
| `--mp-alert-outline-info-content` | `var(--mp-sys-color-content-info)` |
| `--mp-alert-outline-info-icon` | `var(--mp-sys-color-content-info)` |
| `--mp-alert-outline-success-border` | `var(--mp-sys-color-content-success)` |
| `--mp-alert-outline-success-title` | `var(--mp-sys-color-content-success)` |
| `--mp-alert-outline-success-content` | `var(--mp-sys-color-content-success)` |
| `--mp-alert-outline-success-icon` | `var(--mp-sys-color-content-success)` |
| `--mp-alert-outline-warning-border` | `var(--mp-sys-color-content-warning)` |
| `--mp-alert-outline-warning-title` | `var(--mp-sys-color-content-warning)` |
| `--mp-alert-outline-warning-content` | `var(--mp-sys-color-content-warning)` |
| `--mp-alert-outline-warning-icon` | `var(--mp-sys-color-content-warning)` |
| `--mp-alert-outline-danger-border` | `var(--mp-sys-color-content-danger)` |
| `--mp-alert-outline-danger-title` | `var(--mp-sys-color-content-danger)` |
| `--mp-alert-outline-danger-content` | `var(--mp-sys-color-content-danger)` |
| `--mp-alert-outline-danger-icon` | `var(--mp-sys-color-content-danger)` |
| `--mp-alert-outline-default-border` | `var(--mp-sys-color-border-default)` |
| `--mp-alert-outline-default-title` | `var(--mp-sys-color-content-primary)` |
| `--mp-alert-outline-default-content` | `var(--mp-sys-color-content-secondary)` |
| `--mp-alert-outline-default-icon` | `var(--mp-sys-color-content-secondary)` |

### Motion variables

Built-in motion follows `prefers-reduced-motion: reduce`. Reduced motion does not prevent loading-state or close-event updates.

| Token | Default |
| --- | --- |
| `--mp-alert-close-duration` | `var(--mp-sys-motion-duration-slow)` |
