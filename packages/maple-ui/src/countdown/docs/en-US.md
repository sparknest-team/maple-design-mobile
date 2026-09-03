# Countdown

### Intro

For real-time display of countdown values, with millisecond precision.

`time` is remaining duration in milliseconds. To align with a deadline, pass `deadline - Date.now()`.

### Basic Usage

```html
<template>
  <mp-countdown :time="2 * 60 * 60 * 1000" />
</template>
```

### Custom Format

Use `format` to set time text. Higher units not present in the format roll down to the next unit.

```html
<template>
  <mp-countdown :time="4 * 24 * 60 * 60 * 1000" format="DD Day, HH:mm:ss" />
</template>
```

### Show Millisecond

Use `S` / `SS` / `SSS` to show milliseconds.

```html
<template>
  <mp-countdown :time="2 * 60 * 60 * 1000" format="HH:mm:ss.SSS" />
</template>
```

### Custom Style

Use `slot` to set custom countdown style.

```html
<template>
  <mp-countdown :time="108000000">
    <template #default="{ hours, minutes, seconds }">
      <span class="countdown-example-block">{{ hours }}</span>
      <span class="countdown-example-colon">:</span>
      <span class="countdown-example-block">{{ minutes }}</span>
      <span class="countdown-example-colon">:</span>
      <span class="countdown-example-block">{{ seconds }}</span>
    </template>
  </mp-countdown>
</template>

<style>
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

### Manual Control

Set `auto-start` to `false`, then control with `start`, `pause`, and `reset`. The `end` event fires when the countdown finishes.

```html
<script setup>
import { ref } from 'vue'
import { Message } from '@maplejs/maple-ui'

const countdownRef = ref()
const time = ref(5000)

function handleEnd() {
  Message.info('end!')
}
</script>

<template>
  <mp-countdown
    ref="countdownRef"
    :time="time"
    :auto-start="false"
    format="ss.SSS"
    @end="handleEnd"
  />
  <mp-row justify="space-between" align="center" style="margin-top: 10px">
    <mp-button status="primary" @click="countdownRef.start()">Start</mp-button>
    <mp-button @click="countdownRef.pause()">Pause</mp-button>
    <mp-button @click="countdownRef.reset()">Reset</mp-button>
  </mp-row>
</template>
```

### Embed in Statistic

When `value` is omitted, Statistic can embed Countdown in the default slot.

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

| Prop         | Description                      | Type               | Default        |
| ------------ | -------------------------------- | ------------------ | -------------- |
| `time`       | Total time(ms)                   | _string \| number_ | `0`            |
| `format`     | Time format                      | _string_           | `HH:mm:ss`     |
| `auto-start` | Whether to auto start count down | _boolean_          | `true`         |

### Available formats

| Format | Description          |
| ------ | -------------------- |
| `DD`   | Day                  |
| `HH`   | Hour                 |
| `mm`   | Minute               |
| `ss`   | Second               |
| `S`    | Millisecond, 1-digit |
| `SS`   | Millisecond, 2-digit |
| `SSS`  | Millisecond, 3-digit |

### Events

| Event    | Description                     | Arguments            |
| -------- | ------------------------------- | -------------------- |
| `end`    | Emitted after countdown ended   | `-`                  |
| `change` | Emitted after countdown changed | `timeData: TimeData` |

### Slots

| Name      | Description    | SlotProps            |
| --------- | -------------- | -------------------- |
| `default` | Custom content | `timeData: TimeData` |

### TimeData Structure

| Name           | Description         | Type     |
| -------------- | ------------------- | -------- |
| `days`         | Remain days         | `number` |
| `hours`        | Remain hours        | `number` |
| `minutes`      | Remain minutes      | `number` |
| `seconds`      | Remain seconds      | `number` |
| `milliseconds` | Remain milliseconds | `number` |

### Methods

Use ref to get Countdown instance and call instance methods.

| Method | Description	 | Arguments | Return |
| ---- | ------- | -------- |--------|
| `start` | Start countdown | `-`       | `-` |
| `pause` | Pause countdown | `-`       | `-` |
| `reset` | Reset countdown | `-`       | `-` |

### Style Variables
Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable | Default |
| --- | --- |
| `--mp-countdown-text-color`     | `var(--mp-color-text)`   |
| `--mp-countdown-text-font-size` | `var(--mp-font-size-lg)` |
