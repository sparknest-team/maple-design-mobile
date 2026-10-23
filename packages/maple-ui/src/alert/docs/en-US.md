# Alert

## 案例

### Intro

Alerts display brief messages for the user without interrupting their use.

### Variant

```demo
../example/demos/variant.vue
```

### Title

```demo
../example/demos/title.vue
```

### Message

```demo
../example/demos/message.vue
```

### Type

`type`: `info` / `success` / `warning` / `danger` / `default`. `default` has no built-in icon; use `#icon` to customize.

```demo
../example/demos/type.vue
```

### Custom Icon

```demo
../example/demos/custom-icon.vue
```

### Allow To Close

Activate Close with a click, Space or Enter. The close event starts closing; closed follows the leave transition. Unmounting the component in close prevents observing its completed transition. This Demo retains the instance, counts both events, and reopens with a fresh key without changing other Alert instances.

```demo
../example/demos/allow-to-close.vue
```

### Custom Close Icon

```demo
../example/demos/custom-close-icon.vue
```

### Action

```demo
../example/demos/action.vue
```

### center

```demo
../example/demos/center.vue
```

### banner

```demo
../example/demos/banner.vue
```

### Hide Icon

```demo
../example/demos/show-icon.vue
```

### Appearance combinations

Use this example for the emphasis of informational messages. Adjust variant, status and compare the component with the same data. Keep the content unchanged while comparing the available settings.

```demo
../example/demos/appearance-lab.vue
```

<!-- api-review:start -->
### Feature playground

```demo
../example/demos/api-review.vue
```

<!-- api-review:end -->

## API

### Props

| Prop        | Description                                                                 | Type                | Default    |
| ----------- | --------------------------------------------------------------------------- | ------------------- | ---------- |
| status      | Type, optional values are `info`, `success`, `warning`, `danger`, `default` | _string_            | `info`     |
| `variant`   | Variant, optional values are `standard` `outline` `tonal`                   | _string_            | `standard` |
| `color`     | Background color                                                            | string              | `-`        |
| `title`     | Title                                                                       | string              | `-`        |
| `message`   | Message                                                                     | string              | `-`        |
| `elevation` | Elevation, optional values are true, false, and levels from 0-24            | _number \| boolean_ | `false`    |
| `closable` | Whether the alert is closeable                                              | boolean             | `false`    |

### Slots

| Name         | Description               | SlotProps |
| ------------ | ------------------------- | --------- |
| `default`    | The message of alert      | `-`       |
| `title`      | The title of alert        | `-`       |
| `icon`       | The prepend icon of alert | `-`       |
| `close-icon` | The close icon of alert   | `-`       |

### Events

| Event   | Description                                                                                        | Arguments      |
| ------- | -------------------------------------------------------------------------------------------------- | -------------- |
| `close` | Triggered when the Close button is clicked and can only be used when the Close button is displayed | `event: Event` |
| `closed` | Triggered after the leave transition completes | `-` |

### Style Variables

See `style/token.less` for the complete `--mp-alert-*` contract. Override these variables with [StyleProvider](#/en-US/style-provider). The public names are shared with Cedar; only the `--mp-` / `--c-` brand prefix differs.

### Complete token defaults

Colored title/content/icon and outline borders use readable system content roles. Standard and tonal share palette step 1 backgrounds, with only standard showing a weak decorative border. Neutral title uses content-primary; content/icon use content-secondary. The content token also supplies inherited close/action colors. Maple dark inherits the same color defaults, while keeping its existing geometry overrides (padding 16px, icon 22px, icon/close margins 12px, line-height 1.5). Custom color only changes the background; verify all foregrounds when overriding it. The table lists root defaults, not theme overrides.

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

Built-in effects respect `prefers-reduced-motion: reduce`; loading and closing still update state immediately.

| Token | Default |
| --- | --- |
| `--mp-alert-close-duration` | `var(--mp-sys-motion-duration-slow)` |
