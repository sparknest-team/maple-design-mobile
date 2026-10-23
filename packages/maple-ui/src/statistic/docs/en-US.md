# Statistic

## Examples

### Introduction

Highlight a number or a group of numbers with an optional description.

Use the standalone [Countdown](#/en-US/countdown) component for timers. You can also embed [CountTo](#/en-US/count-to) as the value.

### Basic Usage

Use `title` for the description and `value` for the number. `value` accepts a number or a string.

```demo
../example/demos/basic-usage.vue
```

### Prefix / Suffix

Add a unit, currency symbol, or trend with `prefix` / `suffix` or the same-named slots.

```demo
../example/demos/prefix-suffix.vue
```

### Tabular Numbers

Enable `tabular-nums` so every digit occupies the same width. This is useful for frequently changing values and vertically aligned numbers. Compare equal-length values such as `1111` and `8888`: proportional numbers may change total width, while tabular numbers remain stable.

```demo
../example/demos/tabular-nums.vue
```

### Extra

Show extra information below the value with `extra` or the `extra` slot.

```demo
../example/demos/extra.vue
```

### Animation

Turn on `animation` to tween the number. Control playback with `start`.

The demo's Start button changes the parent's `start` from `false` to `true`, playing from `value-from` to the target. Repeated clicks do not replay it. Setting `start=false` pauses; switching back to `true` restarts from `value-from`, not the paused position. A replay button should set it to `false`, wait for one Vue update, then set it to `true`.

```demo
../example/demos/animation.vue
```

### Custom Value

When `value` is omitted, the default slot can render custom content such as `CountTo`.

```demo
../example/demos/custom-value.vue
```

### Countdown

When `value` is omitted, the default slot can embed [Countdown](#/en-US/countdown).

```demo
../example/demos/countdown.vue
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
| `title` | Title of the statistic | _string_ | `-` |
| `value` | Displayed value | _number \| string \| Date_ | `-` |
| `prefix` | Prefix of the value | _string_ | `-` |
| `suffix` | Suffix of the value | _string_ | `-` |
| `format` | Date format (date mode) | _string_ | `HH:mm:ss` |
| `extra` | Extra content | _string_ | `-` |
| `start` | Whether to start the animation | _boolean_ | `true` |
| `precision` | Decimal places (number mode) | _number_ | `0` |
| `separator` | Group separator (number mode) | _string_ | `-` |
| `show-group-separator` | Whether to show the group separator | _boolean_ | `false` |
| `tabular-nums` | Whether to use tabular numbers | _boolean_ | `false` |
| `animation` | Whether to enable animation | _boolean_ | `false` |
| `animation-duration` | Animation duration | _number_ | `2000` |
| `value-from` | Animation start value | _number_ | `-` |
| `placeholder` | Placeholder when `value` is `undefined` and the default slot is unused | _string_ | `-` |
| `value-style` | Custom style of the value | _CSSProperties_ | `-` |

### Slots

| Name | Description | SlotProps |
| --- | --- | --- |
| `default` | Custom value, used when `value` is not provided | `-` |
| `title` | Title | `-` |
| `prefix` | Prefix | `-` |
| `suffix` | Suffix | `-` |
| `extra` | Extra content | `-` |

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable | Default |
| --- | --- |
| `--mp-statistic-title-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-statistic-title-font-size` | `var(--mp-font-size-sm)` |
| `--mp-statistic-title-margin-bottom` | `8px` |
| `--mp-statistic-value-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-statistic-value-font-size` | `28px` |
| `--mp-statistic-value-font-weight` | `500` |
| `--mp-statistic-decimal-font-size` | `inherit` |
| `--mp-statistic-prefix-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-statistic-prefix-font-size` | `var(--mp-font-size-md)` |
| `--mp-statistic-prefix-spacing` | `4px` |
| `--mp-statistic-suffix-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-statistic-suffix-font-size` | `var(--mp-font-size-md)` |
| `--mp-statistic-suffix-spacing` | `4px` |
| `--mp-statistic-extra-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-statistic-extra-font-size` | `var(--mp-font-size-sm)` |
| `--mp-statistic-extra-margin-top` | `8px` |
