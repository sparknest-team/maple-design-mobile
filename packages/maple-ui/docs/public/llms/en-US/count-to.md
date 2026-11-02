<!-- Source: src/count-to/docs/en-US.md; locale: en-US; page: /en-US/count-to -->

# CountTo

## Examples

### Introduction

Display a number animation transitioning from a start value to a target value.

### Basic Usage

The `from` and `to` attributes specify the start and target values.

Example source: src/count-to/example/demos/basic-usage.vue

```vue
<script setup></script>

<template>
  <mp-count-to :to="123456" />
</template>
```

### Precision

Controlling numerical precision with `precision`

Example source: src/count-to/example/demos/precision.vue

```vue
<script setup></script>

<template>
  <mp-count-to :to="123456" :precision="2" />
</template>
```

### Custom Duration

The `duration` attribute specifies the animation duration in milliseconds.

Example source: src/count-to/example/demos/custom-duration.vue

```vue
<script setup></script>

<template>
  <mp-count-to :to="123456" :duration="10000" />
</template>
```

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

### Custom Animation Curve

The `timing-function` attribute specifies the animation curve.

Example source: src/count-to/example/demos/custom-animation-curve.vue

```vue
<script setup></script>

<template>
  <mp-count-to :to="123456" :timing-function="(v) => 1 - Math.pow(1 - v, 3)" />
</template>
```

### Manual Control

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

## API

### Props

| Prop         | Description                      | Type               | Default        |
| ------------ | ---------------------------------------- | ------------------ | ------- |
| `from`       | Start value                              | _number \| string_ | `0`     |
| `to`         | Target value                             | _number \| string_ | `0`     |
| `duration`   | Animation duration (ms)                  | _number \| string_ | `2000` |
| `precision`   | Precision                  | _number \| string_ | `0` |
| `auto-start` | Whether to start animation automatically | _boolean_          | `true`  |
| `timing-function` | Animation curve      | _(v: number) => number_          | `-`  |

### Events

| Event    | Description                     | Arguments            |
| ---------- | ----------------------------- | ------------------- |
| `end` | Triggered when animation ends | `-`                 |

### Slots

| Name      | Description    | SlotProps            |
| --------- | -------------- | ------------------------ |
| `default` | Custom content | `value: number` |

### Methods

| Method | Description	 | Arguments | Return |
| ------- | ------------------------------------------------------------------------------------ | --------- | ------ |
| `start` | Start the animation                                                                  | `-`       | `-`    |
| `pause` | Pause the animation                                                                  | `-`       | `-`    |
| `reset` | Reset the animation. If `auto-start` is `true`, the animation will restart automatically | `-`       | `-`    |

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable | Default |
| --- | --- |
| `--mp-count-to-text-color`     | `var(--mp-sys-color-content-primary)` |
| `--mp-count-to-text-font-size` | `var(--mp-font-size-lg)` |
