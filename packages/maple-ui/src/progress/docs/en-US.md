# Progress

### Intro

Display the current progress of an operation flow.

### Basic Usage

```html
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const value = ref(0)
let timer

onMounted(() => {
  timer = window.setInterval(() => {
    if (value.value >= 100) {
      value.value = 0
      return
    }

    value.value += 20
  }, 1000)
})

onUnmounted(() => {
  window.clearInterval(timer)
})  
</script>

<template>
  <mp-space direction="column" :size="[12, 12]">
    <mp-progress :percent="20" />
    <mp-progress :percent="value" :track="false" show-text />
    <mp-progress :percent="100" show-text>success</mp-progress>
  </mp-space>
</template>
```

### Other Styles

Set the stroke width, progress bar color and track color through the attributes of `status`, `stroke-width`, `color`, `track-color`.

```html
<template>
  <mp-space direction="column" :size="[12, 12]">
    <mp-progress :percent="40" color="linear-gradient(131.53deg, #3fecff 0%, #6149f6 100%)"/>
    <mp-progress status="info" :percent="40" />
    <mp-progress status="success" :percent="60" />
    <mp-progress :percent="80" :stroke-width="8" color="#ff9f00" track-color="#f5cb90" />
  </mp-space>
</template>
```

### Progress Circle

```html
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const value = ref(0)
let timer

onMounted(() => {
  timer = window.setInterval(() => {
    if (value.value >= 100) {
      value.value = 0
      return
    }

    value.value += 20
  }, 1000)
})

onUnmounted(() => {
  window.clearInterval(timer)
})  
</script>

<template>
  <mp-space :size="[20, 20]">
    <mp-progress 
      mode="circle" 
      :percent="100" 
      :size="60"  
      :color="{
        '0%': '#3fecff',
        '100%': '#6149f6',
      }" 
    />
    <mp-progress mode="circle" :percent="75" :size="60" :track="false" />
    <mp-progress mode="circle" show-text :percent="value" :stroke-width="5" :size="60" />
    <mp-progress mode="circle" status="success" show-text :percent="100" :stroke-width="5" :size="60">
      success
    </mp-progress>
  </mp-space>
</template>
```

### Indeterminate Animation

Enable indeterminate animation through the `indeterminate` attribute when loading progress is unknown.

```html
<template>
  <mp-space direction="column" :size="[20, 20]">
    <mp-progress indeterminate />
    <mp-progress indeterminate status="info" />

    <mp-space justify="space-between">
      <mp-progress mode="circle" indeterminate :size="60" />
      <mp-progress mode="circle" status="info" indeterminate :size="60" />
    </mp-space>
  </mp-space>
</template>
```

## API

### Props

| prop          | Description                                                                         | Type     | Default   |
|---------------|-------------------------------------------------------------------------------------|----------|-----------|
| `mode`        | Mode of Progress. Optional value is `line, circle`                                | _string_ | `line`  |
| `status` | default / primary / secondary / tertiary / info / success / warning / danger | _string_ | `default` |
| percent | Percentage, 0–100; numeric strings accepted; decimal precision retained | number / string | 0 |
| stroke-width | 显式线宽优先于 size 的预设厚度 | `number \| string` | 按 size 档位 |
| `color`       | Color of the progress bar (The circular progress bar sets the gradient color, please use object. Gradient is the same as svg's linearGradient element)                                    | _string \| object_ | `-` |
| `track-color` | Color of the progress track                                                         | _string_ | `-` |
| `show-text`       | Whether the show-text is visible or not                                                 | _boolean_ | `false`   |
| `text-class` | Custom text class name                                                             | _string_ | `-`       |
| `track`       | Whether the progress track is visible or not                                        | _boolean_ | `true`    |
| `indeterminate` | Whether the indeterminate animation is visible or not                                     | _boolean_ | `false` |
| size | circle 外径 / line 轨道厚度；数字按 px，字符串可用 CSS 长度 | `ComponentSize \| number \| string` | `md` |
| `rotate`      | Origin of progress (only supports circle progress)                                  | _number_ | `0`       |

### Slots

| Name | Description | SlotProps |
| ----- | -------------- | -------- |
| `default` | Custom text | `-` |

### Style Variables
Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable | Default |
| --- | --- |
| `--progress-font-size` | `var(--font-size-sm)` |
| `--progress-track-color` | `#d8d8d8` |
| `--progress-label-color` | `#555` |
| `--progress-background` | `var(--color-primary)` |
| `--progress-default-color` | `#f5f5f5` |
| `--progress-primary-color` | `var(--color-primary)`|
| `--progress-danger-color` |  `var(--color-danger)`|
| `--progress-success-color` | `var(--color-success)`|
| `--progress-warning-color` |  `var(--color-warning)`|
| `--progress-info-color` | `var(--color-info)`|
| `--progress-line-border-radius` | `0px`|
尺寸与跨端迁移约定见仓库根目录 `API-MIGRATION.md`。只支持文档列出的档位，不代表支持全部 ComponentSize。

## Percent contract / 百分比契约

percent 使用 0～100，12.5 表示 12.5%；数字字符串可用，不接受百分号、CSS 单位或十六进制字符串。超范围截断，NaN/Infinity/非法值回退 0。
Cedar 旧值需要乘以 100（0.5 → 50）；不会自动猜测比例。文案插槽和 aria 值均为 0～100，Maple 圆环不再先取整计算。

percent uses 0–100, including decimal numeric strings. CSS units and percent signs are invalid. Finite out-of-range values are clamped; invalid/non-finite values become 0.
Migrate Cedar ratios by multiplying by 100; there is no automatic ratio detection. Slot and accessible values use percentages; Maple circle geometry no longer rounds first.
