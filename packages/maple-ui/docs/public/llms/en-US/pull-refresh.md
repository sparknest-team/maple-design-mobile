<!-- Source: src/pull-refresh/docs/en-US.md; locale: en-US; page: /en-US/pull-refresh -->

# PullRefresh

## Examples

### Basic Usage

Example source: src/pull-refresh/example/demos/basic.vue

```vue
<script setup>
import { onBeforeUnmount, onDeactivated, ref } from 'vue'
import { onThemeChange } from '@maple-design/cli/client'

const data1 = Array(30).fill('列表项')
const data2 = Array(30).fill('新的列表项')
const isRefresh = ref(false)
const data = ref(data1)
let refreshTimer

function cancelRefresh() {
  clearTimeout(refreshTimer)
  refreshTimer = undefined
  isRefresh.value = false
}
onBeforeUnmount(cancelRefresh)
onDeactivated(cancelRefresh)

onThemeChange()

function refresh() {
  clearTimeout(refreshTimer)
  refreshTimer = setTimeout(() => {
    refreshTimer = undefined
    data.value = data.value[0] === '列表项' ? data2 : data1
    isRefresh.value = false
  }, 2000)
}
</script>

<template>
  <div class="pull-refresh-demo__scroller">
    <mp-pull-refresh v-model="isRefresh" :success-duration="2000" @refresh="refresh">
      <mp-cell v-for="(item, index) in data" :key="index" border> {{ item }} {{ index + 1 }} </mp-cell>
    </mp-pull-refresh>
  </div>
</template>

<style scoped>
.pull-refresh-demo__scroller {
  height: 360px;
  overflow: auto;
  overscroll-behavior: contain;
}
</style>
```

## Timing and lifecycle

Provides pull-to-refresh at the top of a list.

## API

### Model and default value

Use ordinary `v-model`. `modelValue` is the refresh loading state; the parent sets its bound value to false when asynchronous work completes. `defaultValue` initializes uncontrolled state only at creation; changing it later does not reset the current state. A supplied model takes precedence. Initialization emits no `update:modelValue`.

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `v-model` | Loading status | `boolean` | `-` |
| `disabled` | Disable pull-to-refresh | `boolean` | `false` |
| `target` | Scroll container. Defaults to the nearest scrollable ancestor | `string \| HTMLElement` | `-` |
| `animation-duration` | Rebound animation duration (ms) | `number \| string` | `300` |
| `success-duration` | Success state duration (ms) | `number \| string` | `2000` |
| `bg-color` | Indicator background | `string` | `-` |
| `color` | Indicator color | `string` | `-` |
| `success-bg-color` | Success indicator background | `string` | `-` |
| `success-color` | Success indicator color | `string` | `-` |

### Events

| Event | Description | Arguments |
| --- | --- | --- |
| `refresh` | Fired when refresh starts | `-` |
| `update:model-value` | Fired when loading status changes | `(value: boolean)` |

### Slots

| Name | Description |
| --- | --- |
| `default` | List content |

## Style Variables

| Variable | Default |
| --- | --- |
| `--mp-pull-refresh-size` | `40px` |
| `--mp-pull-refresh-background` | `#fff` |
| `--mp-pull-refresh-color` | `var(--mp-color-primary)` |
| `--mp-pull-refresh-success-color` | `var(--mp-color-success)` |
| `--mp-pull-refresh-icon-size` | `25px` |
