<!-- Source: src/countdown/docs/en-US.md; locale: en-US; page: /en-US/countdown -->

# Countdown

### Countdown business clock and deactivation

Countdown RAF refreshes business time, not visual interpolation; CSS duration/reduced motion must not alter the clock. Pause and KeepAlive deactivation freeze remaining duration; activation resumes that value without charging inactive time. Inactive time updates/reset may update data and emit change but schedule no RAF; auto-start is deferred to activation, and explicit pause cancels pending resume. Direct inactive start is ignored; disposed start/reset emit and schedule nothing.

Pause and deactivation synchronize the displayed and slot values with the frozen remaining time without emitting another `change`. If the deadline has passed before the next frame, pausing displays zero and resuming emits `end` once.

Pausing or resetting cancels pending countdown updates. A newer start or reset takes precedence over an earlier update. end fires once per round; reset permits a new completion.

### Intro

For real-time display of countdown values, with millisecond precision.

`time` is remaining duration in milliseconds. To align with a deadline, pass `deadline - Date.now()`.

## Basic examples

### Basic Usage

Example source: src/countdown/example/demos/basic-usage.vue

```vue
<script setup></script>

<template>
  <mp-countdown :time="2 * 60 * 60 * 1000" />
</template>

<style scoped>
.countdown-example-block {
  background: var(--mp-color-primary);
  color: var(--mp-color-white);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  padding: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.countdown-example-colon {
  margin: 0 5px;
  font-size: 18px;
  font-weight: 500;
}
</style>
```

## Content and presentation

### Embed in Statistic

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `time` | Total time(ms) | Embed in Statistic, Time format and custom content |
| `format` | Time format | Embed in Statistic, Time format and custom content |
<!-- demo-config-notes:end -->


When `value` is omitted, Statistic can embed Countdown in the default slot.

Example source: src/countdown/example/demos/embed-statistic.vue

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
.countdown-example-block {
  background: var(--mp-color-primary);
  color: var(--mp-color-white);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  padding: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.countdown-example-colon {
  margin: 0 5px;
  font-size: 18px;
  font-weight: 500;
}
</style>
```

### Time format and custom content

Compare unit formats, milliseconds and custom time fragments, independently of playback controls.

<details>
<summary>Configuration details and limits</summary>

#### Custom Format

Use `format` to set time text. Higher units not present in the format roll down to the next unit.

#### Custom Style

Use `slot` to set custom countdown style.

#### Show Millisecond

Use `S` / `SS` / `SSS` to show milliseconds.

</details>

Example source: src/countdown/example/demos/format-comparison.vue

```vue
<script setup lang="ts"></script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="custom-format">
      <h4><span lang="zh-CN">自定义格式</span><span lang="en-US">Custom Format</span></h4>
      <mp-countdown :time="4 * 24 * 60 * 60 * 1000" format="DD 天 HH 时 mm 分 ss 秒" />
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="show-millisecond">
      <h4><span lang="zh-CN">显示毫秒</span><span lang="en-US">Show Millisecond</span></h4>
      <mp-countdown :time="2 * 60 * 60 * 1000" format="HH:mm:ss.SSS" />
    </section>

    <section class="demo-comparison-case demo-comparison-case--3" data-comparison-scene="custom-style">
      <h4><span lang="zh-CN">自定义样式</span><span lang="en-US">Custom Style</span></h4>
      <mp-countdown :time="108000000">
        <template #default="{ hours, minutes, seconds }">
          <span class="countdown-example-block">{{ hours }}</span>
          <span class="countdown-example-colon">:</span>
          <span class="countdown-example-block">{{ minutes }}</span>
          <span class="countdown-example-colon">:</span>
          <span class="countdown-example-block">{{ seconds }}</span>
        </template>
      </mp-countdown>
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
.demo-comparison-case--1 {
  .countdown-example-block {
    background: var(--mp-color-primary);
    color: var(--mp-color-white);
    width: 30px;
    height: 30px;
    border-radius: 50%;
    padding: 18px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .countdown-example-colon {
    margin: 0 5px;
    font-size: 18px;
    font-weight: 500;
  }
}
.demo-comparison-case--2 {
  .countdown-example-block {
    background: var(--mp-color-primary);
    color: var(--mp-color-white);
    width: 30px;
    height: 30px;
    border-radius: 50%;
    padding: 18px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .countdown-example-colon {
    margin: 0 5px;
    font-size: 18px;
    font-weight: 500;
  }
}
.demo-comparison-case--3 {
  .countdown-example-block {
    background: var(--mp-color-primary);
    color: var(--mp-color-white);
    width: 30px;
    height: 30px;
    border-radius: 50%;
    padding: 18px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .countdown-example-colon {
    margin: 0 5px;
    font-size: 18px;
    font-weight: 500;
  }
}
</style>
```

## Interaction and control

### Manual Control

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `time` | Total time(ms) | Manual Control |
| `auto-start` | Whether to auto start count down | Manual Control |
| `format` | Time format | Manual Control |
<!-- demo-config-notes:end -->


Set `auto-start` to `false`, then control with `start`, `pause`, and `reset`. The `end` event fires when the countdown finishes.

Example source: src/countdown/example/demos/manual-control.vue

```vue
<script setup>
import { ref } from 'vue'
import { Message } from '@maple-design/ui-vue'

const countdownRef = ref()
function handleEnd() {
  Message.info('end!')
}
</script>

<template>
  <mp-countdown ref="countdownRef" :time="5000" :auto-start="false" format="ss.SSS" @end="handleEnd" />
  <mp-row justify="space-between" align="center" style="margin-top: 10px">
    <mp-button status="primary" @click="countdownRef.start()">开始</mp-button>
    <mp-button @click="countdownRef.pause()">暂停</mp-button>
    <mp-button @click="countdownRef.reset()">重置</mp-button>
  </mp-row>
</template>

<style scoped>
.countdown-example-block {
  background: var(--mp-color-primary);
  color: var(--mp-color-white);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  padding: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.countdown-example-colon {
  margin: 0 5px;
  font-size: 18px;
  font-weight: 500;
}
</style>
```

## API

`time` is a duration rather than an absolute deadline; the remaining duration freezes while paused or deactivated by KeepAlive. The default slot receives the five fields days, hours, minutes, seconds, and milliseconds directly. `change` fires on reset and animation frames and may be frequent. `auto-start` is read on mount or reset; changing it alone does not start or pause. Repeated format tokens are all replaced. Omitted larger units accumulate into smaller units, so `SSS` alone can exceed three digits.

### Countdown Props

| Prop | Description | Type | Default |
| ----- | -------------- | -------- | ---------- |
| `time` | Total time(ms) | _string \| number_ | `0` |
| `format` | Time format | _string_ | `HH:mm:ss` |
| `auto-start` | Whether to auto start count down | _boolean_ | `true` |

### format specification

| Format | Description |
| -- | --- |
| `DD` | Day |
| `HH` | Hour |
| `mm` | Minute |
| `ss` | Seconds |
| `S` | Millisecond, 1-digit |
| `SS` | Milliseconds: 2 digits |
| `SSS` | Millisecond, 3-digit |

### Countdown Events

| Event | Description | Callback arguments |
| ----- | -------------- | -------- |
| `end` | Emitted after countdown ended | `-` |
| `change` | Emitted after countdown changed | `timeData: TimeData` |

### Countdown Slots

| Name | Description | Prop |
| ----- | -------------- | -------- |
| `default` | Custom content | `timeData: TimeData` |

### TimeData format

| Name | Description | Type |
| ---- | ------- | -------- |
| `days` | Remain days | `number` |
| `hours` | Remain hours | `number` |
| `minutes` | Remain minutes | `number` |
| `seconds` | Remain seconds | `number` |
| `milliseconds` | Remain milliseconds | `number` |

### Countdown Methods

Access Countdown through ref to call instance methods.

| Method | Description | Arguments | Returns |
| --- | --- | --- | --- |
| `start` | Start countdown | `-` | `-` |
| `pause` | Pause countdown | `-` | `-` |
| `reset` | Reset the countdown; `auto-start`=`true` restarts it automatically | `-` | `-` |

## Usage notes



SSR renders the initial formatted time. Changing format while paused updates the display. The finish event fires once per round; reset starts another round. Unmounting cleans up animation frames.

## CSS Variables

The following CSS variables support customization with [ThemeProvider](#/en-US/theme-provider).

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-countdown-text-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-countdown-text-font-size` | `var(--mp-font-size-lg)` | `font-size` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-countdown-text-color: var(--mp-sys-color-content-primary);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
