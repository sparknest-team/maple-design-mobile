# Statistic

### Introduction

Highlight a number or a group of numbers with an optional description.

Use the standalone [Countdown](#/en-US/countdown) component for timers. You can also embed [CountTo](#/en-US/count-to) as the value.

### Basic Usage

Use `title` for the description and `value` for the number. `value` accepts a number or a string.

```html
<template>
  <mp-statistic title="Downloads" :value="125670" show-group-separator />
  <mp-statistic title="Comments" extra="Compared to yesterday" :value="40509" :precision="2" />
  <mp-statistic title="Active Users" value="1.28k" />
</template>
```

### Prefix / Suffix

Add a unit, currency symbol, or trend with `prefix` / `suffix` or the same-named slots.

```html
<template>
  <mp-statistic title="Account Balance" :value="125670" prefix="$" show-group-separator />
  <mp-statistic
    title="Growth Rate"
    :value="12.8"
    :precision="1"
    suffix="%"
    :value-style="{ color: 'var(--mp-color-success)' }"
  >
    <template #prefix>▲</template>
  </mp-statistic>
  <mp-statistic
    title="Bounce Rate"
    :value="3.2"
    :precision="1"
    suffix="%"
    :value-style="{ color: 'var(--mp-color-danger)' }"
  >
    <template #prefix>▼</template>
  </mp-statistic>
</template>
```

### Tabular Numbers

Enable `tabular-nums` to keep digit width stable when the value changes.

```html
<template>
  <mp-statistic title="Tabular nums" :value="12880" show-group-separator tabular-nums />
</template>
```

### Extra

Show extra information below the value with `extra` or the `extra` slot.

```html
<template>
  <mp-statistic title="Revenue" :value="9280" prefix="$" show-group-separator extra="Compared to yesterday +12.8%" />
  <mp-statistic title="New Users" :value="1280" show-group-separator>
    <template #extra>
      <span style="color: var(--mp-color-success)">vs last week +8.4%</span>
    </template>
  </mp-statistic>
</template>
```

### Animation

Turn on `animation` to tween the number. Control playback with `start`.

```html
<script setup>
import { ref } from 'vue'

const started = ref(false)
</script>

<template>
  <mp-statistic
    title="Growth Rate"
    :value="50.52"
    :precision="2"
    :value-from="0"
    :start="started"
    suffix="%"
    animation
  >
    <template #prefix>▲</template>
  </mp-statistic>
  <mp-button status="primary" @click="started = true">Start</mp-button>
</template>
```

### Custom Value

When `value` is omitted, the default slot can render custom content such as `CountTo`.

```html
<template>
  <mp-statistic title="Active Users">
    <mp-count-to :from="0" :to="125670" :duration="2000" />
  </mp-statistic>
  <mp-statistic title="Conversion Rate" suffix="%">
    <mp-count-to :from="0" :to="36.8" :duration="2000" :precision="1" />
  </mp-statistic>
</template>
```

### Countdown

When `value` is omitted, the default slot can embed [Countdown](#/en-US/countdown).

```html
<template>
  <mp-statistic title="Countdown">
    <mp-countdown :time="2 * 60 * 60 * 1000" />
  </mp-statistic>
  <mp-statistic title="Campaign">
    <mp-countdown :time="4 * 24 * 60 * 60 * 1000" format="DD 天 HH 时 mm 分 ss 秒" />
  </mp-statistic>
</template>
```

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
| `--mp-statistic-title-color` | `var(--mp-color-text-3)` |
| `--mp-statistic-title-font-size` | `var(--mp-font-size-sm)` |
| `--mp-statistic-title-margin-bottom` | `8px` |
| `--mp-statistic-value-color` | `var(--mp-color-text-1)` |
| `--mp-statistic-value-font-size` | `28px` |
| `--mp-statistic-value-font-weight` | `500` |
| `--mp-statistic-decimal-font-size` | `inherit` |
| `--mp-statistic-prefix-color` | `var(--mp-color-text-2)` |
| `--mp-statistic-prefix-font-size` | `var(--mp-font-size-md)` |
| `--mp-statistic-prefix-spacing` | `4px` |
| `--mp-statistic-suffix-color` | `var(--mp-color-text-2)` |
| `--mp-statistic-suffix-font-size` | `var(--mp-font-size-md)` |
| `--mp-statistic-suffix-spacing` | `4px` |
| `--mp-statistic-extra-color` | `var(--mp-color-text-3)` |
| `--mp-statistic-extra-font-size` | `var(--mp-font-size-sm)` |
| `--mp-statistic-extra-margin-top` | `8px` |
