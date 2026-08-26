# TimeRangePicker 时间范围面板

### 介绍

时间范围选择**面板**，可单独嵌入页面使用。顶部展示开始 / 结束时间，点击切换当前编辑项。

- 默认使用列滚轮面板（时 / 分 / 秒）
- `presentation="clock"`：时钟面板

表单字段请使用 [`TimeRange`](/zh-CN/time-range)；单时间面板请使用 [`TimePicker`](/zh-CN/time-picker)。

### 基本使用

```html
<script setup>
  import { ref } from 'vue'

  const range = ref(['09:00', '18:00'])
</script>

<template>
  <mp-time-range-picker v-model="range" />
</template>
```

### 时钟模式

```html
<script setup>
  import { ref } from 'vue'

  const range = ref(['09:00', '18:00'])
</script>

<template>
  <mp-time-range-picker v-model="range" presentation="clock" format="24hr" />
</template>
```

### 24小时格式与秒

```html
<script setup>
  import { ref } from 'vue'

  const range = ref(['09:00:00', '18:00:00'])
</script>

<template>
  <mp-time-range-picker v-model="range" format="24hr" use-seconds />
</template>
```

### 只读

```html
<script setup>
  import { ref } from 'vue'

  const range = ref(['09:00', '18:00'])
</script>

<template>
  <mp-time-range-picker v-model="range" readonly />
</template>
```

### 次日标记

```html
<script setup>
  import { ref } from 'vue'

  const range = ref(['22:00', '06:00'])
</script>

<template>
  <mp-time-range-picker v-model="range" show-next-day format="24hr" />
</template>
```

开启 `show-next-day` 后，结束早于开始时显示「次日」。面板选择过程中不会交换起止；未开启时由 `TimeRange` 在确认时按时间先后交换。

### 操作栏

```html
<script setup>
  import { ref } from 'vue'

  const range = ref(['09:00', '18:00'])
</script>

<template>
  <mp-time-range-picker v-model="range">
    <template #actions>
      <mp-space size="small">
        <mp-button type="primary" text>操作</mp-button>
        <mp-button type="primary" text>操作</mp-button>
      </mp-space>
    </template>
  </mp-time-range-picker>
</template>
```

## API

### 属性

| 参数                | 说明                                                                                                        | 类型                          | 默认值   |
| ------------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------- | -------- |
| `v-model`           | 绑定值                                                                                                      | _string[]_                    | `[]`     |
| `presentation`      | 面板模式，可选值 `clock` `picker`                                                                           | _string_                      | `picker` |
| `format`            | 展示格式，可选值 `ampm` `24hr`（主要用于 clock）                                                            | _string_                      | `ampm`   |
| `use-seconds`       | 是否选择秒                                                                                                  | _boolean_                     | `false`  |
| `min`               | 可选最小时间                                                                                                | _string_                      | `-`      |
| `max`               | 可选最大时间                                                                                                | _string_                      | `-`      |
| `disabled-time`     | 禁用的时间（回调返回 true 表示禁用）                                                                        | _DisabledTime_                | `-`      |
| `show-next-day`     | 结束早于开始时在结束侧显示「次日」。面板选择过程中不交换；交换仅发生在 `TimeRange` 确认时（且未开启本属性） | _boolean_                     | `false`  |
| `time-picker-props` | 透传给 `mp-time-picker`（clock 模式）                                                                       | _Partial\<TimePickerProps\>_  | `{}`     |
| `picker-props`      | 透传给 `mp-picker`（picker 模式）                                                                           | _Partial\<PickerProps\>_      | `{}`     |
| `readonly`          | 是否只读                                                                                                    | _boolean_                     | `false`  |
| `elevation`         | 海拔高度，可选值为 `true` `false` 和 `0-24` 的等级                                                          | _string \| number \| boolean_ | `false`  |

### TimeRangePicker DisabledTime

| 参数      | 说明                                  | 类型                          | 默认值 |
| --------- | ------------------------------------- | ----------------------------- | ------ |
| `hours`   | 是否禁用该 `hour`（返回 true 禁用）   | _Function: hour => boolean_   | `-`    |
| `minutes` | 是否禁用该 `minute`（返回 true 禁用） | _Function: minute => boolean_ | `-`    |
| `seconds` | 是否禁用该 `second`（返回 true 禁用） | _Function: second => boolean_ | `-`    |

### 事件

| 事件名   | 说明               | 回调参数          |
| -------- | ------------------ | ----------------- |
| `change` | 时间范围变化时触发 | `value: string[]` |

### 插槽

| 名称      | 说明           | 参数 |
| --------- | -------------- | ---- |
| `actions` | 自定义操作面板 | `-`  |

### 样式变量

以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

| 变量名                                   | 默认值                                  |
| ---------------------------------------- | --------------------------------------- |
| `--time-range-picker-values-height`      | `56px`                                  |
| `--time-range-picker-values-font-size`   | `20px`                                  |
| `--time-range-picker-values-font-weight` | `500`                                   |
| `--time-range-picker-value-color`        | `var(--color-text-3)`                   |
| `--time-range-picker-value-active-color` | `var(--color-primary)`                  |
| `--time-range-picker-value-arrow-color`  | `var(--color-border-2)`                 |
| `--time-range-picker-value-arrow-size`   | `18px`                                  |
| `--time-range-picker-next-day-color`     | `var(--color-border-2)`                 |
| `--time-range-picker-border-radius`      | `var(--time-picker-border-radius, 4px)` |
| `--time-range-picker-background`         | `var(--color-fill-2)`                   |
