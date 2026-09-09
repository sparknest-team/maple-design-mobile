# 进度条

### 介绍

展示操作的当前进度。

### 基本使用

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

### 其他样式

通过 `status`、`stroke-width`、`color`、`track-color` 属性设置线宽、进度条颜色、轨道颜色。

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

### 环形进度条

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

### 不间断动画

当加载进度未知时，通过 `indeterminate` 属性开启不间断动画。

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

### 属性

| 参数            | 说明                                                              | 类型       | 默认值       |
|---------------|-----------------------------------------------------------------|----------|-----------|
| `mode`        | `progress` 的模式，可选值为 `line, circle`                            | _string_ | `line`  |
| `status` | default / primary / secondary / tertiary / info / success / warning / danger | _string_ | `default` |
| percent | Percentage, 0–100; numeric strings accepted; decimal precision retained | number / string | 0 |
| stroke-width | 显式线宽优先于 size 的预设厚度 | `number \| string` | 按 size 档位 |
| `color`       | `progress` 的颜色 (环形进度条设置渐变色请使用object, 渐变同svg的linearGradient元素)                                                  | _string \| object_ | `-` |
| `track-color` | `progress` 轨道的颜色                                                | _string_ | `-` |
| `show-text`       | 是否显示百分比文本                                                    | _boolean_ | `false`   |
| `text-class` | 自定义文本的类名                                                 | _string_ | `-`       |
| `track`       | 是否显示 `progress` 的轨道                                             | _boolean_ | `true`    |
| `indeterminate` | 是否显示不间断动画                                                        | _boolean_ | `false` |
| size | circle 外径 / line 轨道厚度；数字按 px，字符串可用 CSS 长度 | `ComponentSize \| number \| string` | `md` |
| `rotate`      | `progress` 的原点（仅支持环形进度条）                                        | _number_ | `0`       |

### 插槽

| 名称 | 说明 | 参数 |
| ----- | -------------- | -------- |
| `default` | 自定义文本 | `-` |

### 样式变量
以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

| 变量名 | 默认值 |
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
