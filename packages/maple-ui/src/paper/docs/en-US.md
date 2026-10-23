# Paper

## Examples

### Intro

An easier container using elevation and water effects.

### Basic Usage

```demo
../example/demos/basic-usage.vue
```

### Border / Border with shadow

```demo
../example/demos/bordered.vue
```

### Ripple Effect

```demo
../example/demos/ripple.vue
```

### Rounded Paper

```demo
../example/demos/round.vue
```

### Custom Border Radius

```demo
../example/demos/radius.vue
```

### Use Slot


Paper is a low-level surface, not a structured Card. It has no variant/status and no default padding. Borders and elevation are independent. Use it for custom panels, form sections or the surface inside a popup; positioning, focus and button semantics remain outside Paper.

```demo
../example/demos/slot.vue
```

## Live properties

Border and shadow are independent. An explicit radius overrides round. The inner native button provides keyboard semantics; its click bubbles to Paper and updates parent-owned feedback.

```demo
../example/demos/live-properties.vue
```

<!-- api-review:start -->
### Feature playground

```demo
../example/demos/api-review.vue
```

<!-- api-review:end -->

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `bordered` | Show a border independently of elevation | _boolean_ | `false` |
| `elevation` | Elevation level, options `true` `false` and level of `0-24` | _number \| boolean_|   `false`    |
| `ripple` | Whether to enable ripple effect | _boolean_ | `false` |
| `radius` | Paper border radius | _string \| number_ | `-` |
| `width` | Paper width | _string \| number_ | `-` |
| `height` | Paper height | _string \| number_ | `-` |
| `round` | Whether to enable round paper | _boolean_ | `false` |
| `inline` | Whether to use inline paper | _boolean_ | `false` |

### Events

| Event | Description | Arguments |
| ------- | -------------- | -------------- |
| `click` | Triggered when the paper is clicked | `event: MouseEvent` |

### Slots

| Name | Description | SlotProps |
| --- | ----| ---- |
| `default` | Paper content | `-` |

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable | Default |
| ------ | -------------|
| `--mp-paper-background`    | `var(--mp-sys-color-surface-default)` |
| `--mp-paper-border-radius` | `4px` |
| `--mp-paper-border-width` | `1px` |
| `--mp-paper-border-color` | `var(--mp-sys-color-border-default)` |
| `--mp-paper-transition-duration` | `var(--mp-sys-motion-duration-slow)` |

Numeric dimensions/radius (including numeric strings) use px; CSS lengths are preserved. Explicit radius overrides round. Themes may override background/radius.

Both libraries maintain independent copies of the implementation, Props, styles, tokens and tests; no shared runtime core or instances. Maple migration: default background uses the theme surface; pointer cursor is opt-in with ripple; inline now uses mp-paper--inline. Existing APIs remain supported.

### Governed defaults

| Token | Default |
| --- | --- |
| `--mp-paper-background` | `var(--mp-sys-color-surface-default)` |
| `--mp-paper-border-radius` | `var(--mp-sys-radius-md)` |
| `--mp-paper-border-width` | `1px` |
| `--mp-paper-border-color` | `var(--mp-sys-color-border-default)` |
| `--mp-paper-transition-duration` | `var(--mp-sys-motion-duration-slow)` |

Built-in motion honors prefers-reduced-motion: reduce. State/content remain visible; decorative spin, shimmer and ripple are suppressed. Icon name changes skip delays and cancel pending transitions. Ripple duration tokens control CSS only: its 250ms lifecycle timers are unchanged, so keep each visual duration at or below 250ms. Custom animation classes remain the caller’s responsibility.
