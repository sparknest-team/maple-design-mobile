<!-- Source: src/count-to/docs/en-US.md; locale: en-US; page: /en-US/count-to -->

# CountTo

### Introduction

Display a number animation transitioning from a start value to a target value.

## Basic examples

### Basic Usage

The `from` and `to` attributes specify the start and target values.

Example source: src/count-to/example/demos/basic-usage.vue

```vue
<script setup></script>

<template>
  <mp-count-to :to="123456" />
</template>
```

## Content and presentation

### Precision, duration and easing

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `to` | Target value | Precision, duration and easing |
| `precision` | Precision | Precision, duration and easing |
| `duration` | Animation duration (ms) | Precision, duration and easing |
| `timing-function` | Animation curve | Precision, duration and easing |
<!-- demo-config-notes:end -->


Compare final precision and the effect of duration and easing on number transitions. Manual playback remains separate.

<details>
<summary>Configuration details and limits</summary>

#### Precision

Controlling numerical precision with `precision`

#### Custom Duration

The `duration` attribute specifies the animation duration in milliseconds.

#### Custom Animation Curve

The `timing-function` attribute specifies the animation curve.

</details>

Example source: src/count-to/example/demos/number-format-comparison.vue

```vue
<script setup lang="ts"></script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="precision">
      <h4><span lang="zh-CN">精度</span><span lang="en-US">Precision</span></h4>
      <mp-count-to :to="123456" :precision="2" />
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="custom-duration">
      <h4><span lang="zh-CN">自定义时长</span><span lang="en-US">Custom Duration</span></h4>
      <mp-count-to :to="123456" :duration="10000" />
    </section>

    <section class="demo-comparison-case demo-comparison-case--3" data-comparison-scene="custom-animation-curve">
      <h4><span lang="zh-CN">自定义动画曲线</span><span lang="en-US">Custom Animation Curve</span></h4>
      <mp-count-to :to="123456" :timing-function="(v: number) => 1 - Math.pow(1 - v, 3)" />
    </section>
  </div>
</template>

<style scoped lang="less">
.demo-comparison {
  display: grid;
  gap: 24px;
  min-width: 0;
  max-width: 100%;
}
.demo-comparison-case {
  min-width: 0;
  max-width: 100%;
}
.demo-comparison-case > h4 {
  margin: 0 0 12px;
  font-size: 14px;
}
html:not([lang='en-US']) .demo-comparison-case > h4 > [lang='en-US'],
html[lang='en-US'] .demo-comparison-case > h4 > [lang='zh-CN'] {
  display: none;
}
</style>
```

## Customization and slots

### Custom Styles

Example source: src/count-to/example/demos/custom-style.vue

```vue
<script setup></script>

<template>
  <mp-count-to :to="123456">
    <template #default="{ value }">
      {{ value.toLocaleString() }}
    </template>
  </mp-count-to>
</template>
```

## Interaction and control

### Manual Control

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `to` | Target value | Manual Control |
| `auto-start` | Whether to start animation automatically | Manual Control |
<!-- demo-config-notes:end -->


You can call the `start`, `pause`, and `reset` methods to manually control the start, pause, and reset of the animation.

Example source: src/count-to/example/demos/manual-control.vue

```vue
<script setup>
import { ref } from 'vue'

const countToRef = ref()
</script>

<template>
  <mp-count-to ref="countToRef" :to="123456" :auto-start="false" />
  <mp-row justify="space-between" align="center" style="margin-top: 10px">
    <mp-button status="primary" @click="countToRef.start()">开始</mp-button>
    <mp-button @click="countToRef.pause()">暂停</mp-button>
    <mp-button @click="countToRef.reset()">重置</mp-button>
  </mp-row>
</template>
```

## Numeric and animation boundaries

### Scientific notation and decimal floor

Precision is an integer from -292 to 292. Fractional and nonfinite precision falls back to 0; out-of-range integers are clamped. Unsupported inputs produce a development prop warning. String precision keeps the existing parseFloat conversion. Negative precision rounds at tens/hundreds and larger decimal places. The result is a number rounded toward negative infinity, without trailing-zero padding, and may use scientific notation. Changing precision only reformats the current value. IEEE-754 representability still applies; animation values are not decimal accounting values.

Example source: src/count-to/example/demos/decimal-floor.vue

```vue
<template>
  <mp-space direction="column">
    <p>微小数值 / Small value: -1.234e-7</p>
    <mp-count-to
      class="scientific-small"
      :from="-1.234e-7"
      :to="-1.234e-7"
      :precision="precision"
      :auto-start="false"
    />
    <mp-button @click="precision = precision === 9 ? 8 : 9">切换精度 / Toggle precision</mp-button>
    <p role="status">Precision: {{ precision }}. 仅改变展示精度，不重播。Changes formatting without replay.</p>
    <p>大数按十进制位取整 / Large value, precision -23:</p>
    <mp-count-to class="scientific-large" :from="-1.234e24" :to="-1.234e24" :precision="-23" :auto-start="false" />
    <p>向负无穷取整 / Floor toward negative infinity:</p>
    <mp-count-to class="negative-floor" :from="-12.351" :to="-12.351" :precision="2" :auto-start="false" />
  </mp-space>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const precision = ref(9)
</script>
```

### Zero duration and replay

Example source: src/count-to/example/demos/zero-duration.vue

```vue
<template>
  <mp-space direction="column">
    <mp-count-to ref="counter" :from="0" :to="100" :duration="duration" @end="ends++" />
    <mp-space>
      <mp-button @click="duration = duration === 0 ? 600 : 0">切换时长 / Toggle duration</mp-button>
      <mp-button @click="counter?.reset()">重新播放 / Replay</mp-button>
    </mp-space>
    <p role="status">Duration: {{ duration }}ms; end: {{ ends }}. 0 时长在下一帧完成，不占用持续动画帧。</p>
  </mp-space>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { CountToInstance } from '@maple-design/ui-vue'

const counter = ref<CountToInstance>()
const duration = ref(0)
const ends = ref(0)
</script>
```

### Change easing and replay

Changing timing-function affects the next reset, including resets caused by from, to or duration changes. It does not restart the current animation. Pause/start resumes the existing curve; reset creates a fresh playback using the latest function. Clearing the function restores linear easing. A curve may reach the target early, but end still reports completion of the configured duration.

Example source: src/count-to/example/demos/easing-replay.vue

```vue
<template>
  <mp-space direction="column">
    <mp-count-to ref="counter" :to="100" :duration="1200" :timing-function="curve" />
    <mp-space>
      <mp-button @click="cubic = !cubic">切换曲线 / Change curve</mp-button>
      <mp-button @click="replay">重新播放 / Replay</mp-button>
    </mp-space>
    <p role="status">Next: {{ cubic ? 'ease-out cubic' : 'linear' }}; current: {{ applied }}.</p>
    <p>切换曲线在下次播放生效；点击重新播放查看效果。Changing the curve applies on replay.</p>
  </mp-space>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import type { CountToInstance } from '@maple-design/ui-vue'

const counter = ref<CountToInstance>()
const cubic = ref(false)
const applied = ref('linear')
const linear = (value: number) => value
const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3)
const curve = computed(() => (cubic.value ? easeOutCubic : linear))
function replay() {
  applied.value = cubic.value ? 'ease-out cubic' : 'linear'
  counter.value?.reset()
}
</script>
```

## Animation duration boundaries

Duration is a finite nonnegative number of milliseconds. Zero reaches the target on the next frame. Negative, NaN and infinite values produce development prop diagnostics and safely behave as zero without continuing to request animation frames. Pausing or unmounting before that frame cancels completion. String durations retain parseFloat conversion. reset reads auto-start again. end remains a notification; its listener Promise is not awaited.

## API

String `from`, `to`, `duration`, and `precision` values use parseFloat, so `10px` parses as 10. Invalid or non-finite endpoints produce a warning and use 0. If the difference between finite endpoints overflows, the animation completes on the next frame. `precision` floors the numeric result toward negative infinity without padding zeros and accepts integers in the range [-292, 292]. `auto-start` is read on mount or reset; calling start after completion does not replay until reset.

### CountTo Props

| Prop | Description | Type | Default |
| ------------ | -------------------------- | ------------------ | ------- |
| `from` | Start value | _number \| string_ | `0` |
| `to` | Target value | _number \| string_ | `0` |
| `duration` | Animation duration (ms) | _number \| string_ | `2000` |
| `precision` | Precision | _number \| string_ | `0` |
| `auto-start` | Whether to start animation automatically | _boolean_ | `true` |
| `timing-function` | Animation curve | _(v: number) => number_ | `-` |

### CountTo Events

| Event | Description | Callback arguments |
| ---------- | -------------- | -------- |
| `end` | Triggered when animation ends | `-` |

### CountTo Slots

| Slot | Description | Prop |
| --------- | ---------- | ------------------------ |
| `default` | Custom content | `value: number` |

### CountTo Methods

| Method | Description | Arguments | Returns |
| ------- | --------------------------------------------------------- | ---- | ------ |
| `start` | Start the animation | `-` | `-` |
| `pause` | Pause the animation | `-` | `-` |
| `reset` | Reset the animation. If `auto-start` is `true`, the animation will restart automatically | `-` | `-` |

## Usage notes



Animation pauses on unmount and KeepAlive deactivation and resumes on reactivation. Each instance keeps independent values and animation state.

## CSS Variables

The following CSS variables support customization with [ThemeProvider](#/en-US/theme-provider).

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-count-to-text-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-count-to-text-font-size` | `var(--mp-font-size-lg)` | `font-size` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-count-to-text-color: var(--mp-sys-color-content-primary);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
