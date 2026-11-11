<!-- Source: src/statistic/docs/en-US.md; locale: en-US; page: /en-US/statistic -->

# Statistic

### Introduction

Highlight a number or a group of numbers with an optional description.

Use the standalone [Countdown](#/en-US/countdown) component for timers. You can also embed [CountTo](#/en-US/count-to) as the value.

## Basic examples

### Basic Usage

Use `title` for the description and `value` for the number. `value` accepts a number or a string.

Example source: src/statistic/example/demos/basic-usage.vue

```vue
<script setup></script>

<template>
  <mp-space direction="column" size="lg">
    <mp-statistic title="下载量" :value="125670" show-group-separator />
    <mp-statistic title="评论数" extra="较昨日" :value="40509" :precision="2" />
    <mp-statistic title="活跃用户" value="1.28k" />
  </mp-space>
</template>

<style scoped>
.statistic-example__hint {
  margin: 0 0 12px;
  color: var(--mp-color-text-3);
  font-size: var(--mp-font-size-sm);
  line-height: 1.5;
}
</style>
```

## Content and presentation

### Tabular Numbers

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `title` | Displayed-value title | Tabular Numbers, Extra, Animation |
| `value` | Displayed value | Tabular Numbers, Extra, Animation |
| `suffix` | Value suffix | Tabular Numbers, Animation |
| `value-style` | Custom style of the value | Tabular Numbers |
| `tabular-nums` | Whether to use tabular numbers | Tabular Numbers |
| `prefix` | Value prefix | Extra |
<!-- demo-config-notes:end -->


Enable `tabular-nums` so every digit occupies the same width. This is useful for frequently changing values and vertically aligned numbers. Compare equal-length values such as `1111` and `8888`: proportional numbers may change total width, while tabular numbers remain stable.

Example source: src/statistic/example/demos/tabular-nums.vue

```vue
<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const values = [1111, 8888, 1010, 9090]
const count = ref(values[0])
const index = ref(0)
let timer

onMounted(() => {
  timer = window.setInterval(() => {
    index.value = (index.value + 1) % values.length
    count.value = values[index.value]
  }, 800)
})

onUnmounted(() => {
  window.clearInterval(timer)
})
</script>

<template>
  <p class="statistic-example__hint">数值始终保持四位，请观察右侧竖线的位置。</p>
  <mp-space direction="column" size="lg">
    <mp-statistic
      title="比例数字（右侧标记会跳动）"
      :value="count"
      suffix="|"
      :value-style="{ fontVariantNumeric: 'proportional-nums' }"
    />
    <mp-statistic title="等宽数字（右侧标记保持稳定）" :value="count" suffix="|" tabular-nums />
  </mp-space>
</template>

<style scoped>
.statistic-example__hint {
  margin: 0 0 12px;
  color: var(--mp-color-text-3);
  font-size: var(--mp-font-size-sm);
  line-height: 1.5;
}
</style>
```

### Extra

Show extra information below the value with `extra` or the `extra` slot.

Example source: src/statistic/example/demos/extra.vue

```vue
<script setup></script>

<template>
  <mp-space direction="column" size="lg">
    <mp-statistic title="营收" :value="9280" prefix="$" show-group-separator extra="较昨日 +12.8%" />
    <mp-statistic title="新用户" :value="1280" show-group-separator>
      <template #extra>
        <span style="color: var(--mp-color-success)">较上周 +8.4%</span>
      </template>
    </mp-statistic>
  </mp-space>
</template>

<style scoped>
.statistic-example__hint {
  margin: 0 0 12px;
  color: var(--mp-color-text-3);
  font-size: var(--mp-font-size-sm);
  line-height: 1.5;
}
</style>
```

### Animation

Turn on `animation` to tween the number. Control playback with `start`.

The demo's Start button changes the parent's `start` from `false` to `true`, playing from `value-from` to the target. Repeated clicks do not replay it. Setting `start=false` pauses; switching back to `true` restarts from `value-from`, not the paused position. A replay button should set it to `false`, wait for one Vue update, then set it to `true`.

Example source: src/statistic/example/demos/animation.vue

```vue
<script setup>
import { ref } from 'vue'

const started = ref(false)
const enabled = ref(false)
const origin = ref(0)
const duration = ref(800)
</script>

<template>
  <mp-space align="flex-end" size="lg">
    <mp-statistic title="增长率" :value="50.52" :precision="2" :value-from="0" :start="started" suffix="%" animation>
      <template #prefix>▲</template>
    </mp-statistic>
    <mp-button status="primary" @click="started = true">开始</mp-button>
  </mp-space>

  <mp-space direction="column" style="margin-top: 16px">
    <h4>动态开关与配置 / Dynamic animation</h4>
    <mp-statistic
      title="动态目标 / Dynamic target"
      :value="100"
      :animation="enabled"
      :value-from="origin"
      :animation-duration="duration"
    />
    <mp-space wrap>
      <mp-button @click="enabled = !enabled">{{
        enabled ? '关闭动画 / Disable animation' : '启用动画 / Enable animation'
      }}</mp-button>
      <mp-button @click="origin = origin === 0 ? 20 : 0">切换起点 / Change origin</mp-button>
      <mp-button @click="duration = duration === 800 ? 1600 : 800">切换时长 / Change duration</mp-button>
    </mp-space>
    <p>起点 / From: {{ origin }}；时长 / Duration: {{ duration }}ms</p>
  </mp-space>
</template>

<style scoped>
.statistic-example__hint {
  margin: 0 0 12px;
  color: var(--mp-color-text-3);
  font-size: var(--mp-font-size-sm);
  line-height: 1.5;
}
</style>
```

### Countdown

When `value` is omitted, the default slot can embed [Countdown](#/en-US/countdown).

Example source: src/statistic/example/demos/countdown.vue

```vue
<script setup></script>

<template>
  <mp-space direction="column" size="lg">
    <mp-statistic title="倒计时">
      <mp-countdown :time="2 * 60 * 60 * 1000" />
    </mp-statistic>
    <mp-statistic title="活动倒计时">
      <mp-countdown :time="4 * 24 * 60 * 60 * 1000" format="DD 天 HH 时 mm 分 ss 秒" />
    </mp-statistic>
  </mp-space>
</template>

<style scoped>
.statistic-example__hint {
  margin: 0 0 12px;
  color: var(--mp-color-text-3);
  font-size: var(--mp-font-size-sm);
  line-height: 1.5;
}
</style>
```

## Customization and slots

### Prefix / Suffix

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `title` | Displayed-value title | Prefix / Suffix, Custom Value |
| `suffix` | Value suffix | Prefix / Suffix, Custom Value |
| `value` | Displayed value | Prefix / Suffix |
| `prefix` | Value prefix | Prefix / Suffix |
| `show-group-separator` | Whether to show the group separator | Prefix / Suffix |
| `precision` | Decimal places (number mode) | Prefix / Suffix |
<!-- demo-config-notes:end -->


Add a unit, currency symbol, or trend with `prefix` / `suffix` or the same-named slots.

Example source: src/statistic/example/demos/prefix-suffix.vue

```vue
<script setup></script>

<template>
  <mp-space direction="column" size="lg">
    <mp-statistic title="账户余额" :value="125670" prefix="$" show-group-separator />
    <mp-statistic
      title="增长率"
      :value="12.8"
      :precision="1"
      suffix="%"
      :value-style="{ color: 'var(--mp-color-success)' }"
    >
      <template #prefix>▲</template>
    </mp-statistic>
    <mp-statistic
      title="跳出率"
      :value="3.2"
      :precision="1"
      suffix="%"
      :value-style="{ color: 'var(--mp-color-danger)' }"
    >
      <template #prefix>▼</template>
    </mp-statistic>
  </mp-space>
</template>

<style scoped>
.statistic-example__hint {
  margin: 0 0 12px;
  color: var(--mp-color-text-3);
  font-size: var(--mp-font-size-sm);
  line-height: 1.5;
}
</style>
```

### Custom Value

When `value` is omitted, the default slot can render custom content such as `CountTo`.

Example source: src/statistic/example/demos/custom-value.vue

```vue
<script setup></script>

<template>
  <mp-space direction="column" size="lg">
    <mp-statistic title="活跃用户">
      <mp-count-to :from="0" :to="125670" :duration="2000" />
    </mp-statistic>
    <mp-statistic title="转化率" suffix="%">
      <mp-count-to :from="0" :to="36.8" :duration="2000" :precision="1" />
    </mp-statistic>
  </mp-space>
</template>

<style scoped>
.statistic-example__hint {
  margin: 0 0 12px;
  color: var(--mp-color-text-3);
  font-size: var(--mp-font-size-sm);
  line-height: 1.5;
}
</style>
```

## Animation duration boundaries

Duration is finite nonnegative milliseconds. Zero reaches the target on the next frame. Negative, NaN and infinite values produce development prop diagnostics and safely behave as zero without continuing to request frames. Pausing or unmounting before that frame cancels completion. Changing animation-duration replays enabled numeric animation according to the existing rules.

## API

`precision` accepts integers from 0 to 100; invalid values fall back to 0. Numeric formatting uses JavaScript binary numbers and rounding and is not exact financial arithmetic. Very large values may use exponential notation; when the difference between animation endpoints overflows, the final value is shown directly. Numeric grouping follows en-US rules, `separator` replaces grouping commas, and the decimal point remains a dot; dates use local time. Non-finite numeric values produce a warning, display literally, and do not animate. An invalid animation start falls back to 0 and an invalid duration to 0 with completion on the next frame.

### Statistic Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `title` | Displayed-value title | _string_ | `-` |
| `value` | Displayed value | _number \| string \| Date_ | `-` |
| `prefix` | Value prefix | _string_ | `-` |
| `suffix` | Value suffix | _string_ | `-` |
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

### Statistic Slots

| Slot | Description | Prop |
| --- | --- | --- |
| `default` | Custom `value`, used when `value` is not provided | `-` |
| `title` | Title | `-` |
| `prefix` | The prepend icon of alert | `-` |
| `suffix` | Suffix | `-` |
| `extra` | Extra content | `-` |

## Usage notes



Placeholder text updates when the default slot appears/disappears. Animation pauses on unmount/KeepAlive deactivation.

### Animation configuration and lifecycle

With `start=true`, dynamically enabling `animation` or changing the numeric target, `valueFrom` or `animationDuration` replays from the currently configured start. Formatting-only changes, such as precision or separators, do not replay. Disabling `animation` or switching to string/date immediately shows the target and stops frames. `start=false` pauses the current number; explicitly returning to `true` replays. Configuration changes while paused prepare a new start without scheduling frames. KeepAlive deactivation pauses; activation resumes unchanged configuration or resynchronizes changed configuration. Unmount releases frames.

## CSS Variables

Customize these CSS variables through [ThemeProvider](#/en-US/theme-provider).

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-statistic-decimal-font-size` | `inherit` | `font-size` |
| `--mp-statistic-extra-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-statistic-extra-font-size` | `var(--mp-font-size-sm)` | `font-size` |
| `--mp-statistic-extra-margin-top` | `8px` | `margin-top` |
| `--mp-statistic-prefix-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-statistic-prefix-font-size` | `var(--mp-font-size-md)` | `font-size` |
| `--mp-statistic-prefix-spacing` | `4px` | `margin-inline-end` |
| `--mp-statistic-suffix-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-statistic-suffix-font-size` | `var(--mp-font-size-md)` | `font-size` |
| `--mp-statistic-suffix-spacing` | `4px` | `margin-inline-start` |
| `--mp-statistic-title-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-statistic-title-font-size` | `var(--mp-font-size-sm)` | `font-size` |
| `--mp-statistic-title-margin-bottom` | `8px` | `margin-bottom` |
| `--mp-statistic-value-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-statistic-value-font-size` | `28px` | `font-size` |
| `--mp-statistic-value-font-weight` | `500` | `font-weight` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-statistic-decimal-font-size: inherit;
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
