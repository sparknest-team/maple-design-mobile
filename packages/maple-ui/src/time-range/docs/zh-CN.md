# TimeRange 时间范围

### 介绍

表单时间范围**字段**，点击后底部弹出选择面板。交互与 `Time` 一致：取消丢弃草稿，确认后才写回 `v-model`。

弹层内使用 [`TimeRangePicker`](/zh-CN/time-range-picker) 作为选择面板。顶部展示开始 / 结束时间，点击可切换当前编辑项。

- 默认使用列滚轮面板（时 / 分 / 秒）
- `presentation="clock"`：时钟面板

### 基本使用

```html
<script setup>
  import { ref } from 'vue'

  const range = ref([])
</script>

<template>
  <mp-time-range v-model="range" placeholder="请选择时间范围" clearable />
</template>
```

### 时钟模式

```html
<script setup>
  import { ref } from 'vue'

  const range = ref(['09:00', '18:00'])
</script>

<template>
  <mp-time-range v-model="range" presentation="clock" format="24hr" placeholder="时钟时间范围" clearable />
</template>
```

### 列滚轮含秒

```html
<script setup>
  import { ref } from 'vue'

  const range = ref(['09:00:00', '18:00:00'])
</script>

<template>
  <mp-time-range v-model="range" format="24hr" use-seconds placeholder="列滚轮含秒" clearable />
</template>
```

### 24 小时制与秒

```html
<script setup>
  import { ref } from 'vue'

  const range = ref([])
</script>

<template>
  <mp-time-range v-model="range" format="24hr" use-seconds placeholder="含秒的时间范围" clearable />
</template>
```

### 自定义分隔符

```html
<script setup>
  import { ref } from 'vue'

  const range = ref(['09:00', '18:00'])
</script>

<template>
  <mp-time-range v-model="range" separator=" 至 " format="24hr" placeholder="自定义分隔符" clearable />
</template>
```

### 次日标记

当结束时间早于开始时间（跨天）时，开启 `show-next-day` 会在字段与面板结束侧显示「次日」，且确认时**不再交换**起止。未开启时，仅在点击确认后按时间先后交换。

```html
<script setup>
  import { ref } from 'vue'

  const range = ref(['22:00', '06:00'])
</script>

<template>
  <mp-time-range v-model="range" show-next-day format="24hr" placeholder="跨天时段" clearable />
</template>
```

### 禁用

```html
<script setup>
  import { ref } from 'vue'

  const range = ref(['09:00', '18:00'])
</script>

<template>
  <mp-time-range v-model="range" format="24hr" disabled />
</template>
```

### 搭配 FormItem

```html
<script setup>
  import { reactive, ref } from 'vue'

  const form = ref(null)
  const formData = reactive({
    period: [],
  })
</script>

<template>
  <mp-form ref="form" :model="formData">
    <mp-form-item field="period" label="时段" required>
      <mp-time-range v-model="formData.period" placeholder="请选择" clearable />
    </mp-form-item>
  </mp-form>
</template>
```

## API

### 属性

| 参数                      | 说明                                                                                                   | 类型                              | 默认值     |
| ------------------------- | ------------------------------------------------------------------------------------------------------ | --------------------------------- | ---------- |
| `v-model`                 | 绑定值                                                                                                 | _string[]_                        | `[]`       |
| `open`                    | 弹层显隐受控                                                                                           | _boolean_                         | `-`        |
| `presentation`            | 面板模式，可选值 `clock` `picker`                                                                      | _string_                          | `picker`   |
| `format`                  | 展示格式，可选值 `ampm` `24hr`（主要用于 clock）                                                       | _string_                          | `ampm`     |
| `use-seconds`             | 是否选择秒                                                                                             | _boolean_                         | `false`    |
| `min`                     | 可选最小时间                                                                                           | _string_                          | `-`        |
| `max`                     | 可选最大时间                                                                                           | _string_                          | `-`        |
| `disabled-time`           | 禁用的时间（回调返回 true 表示禁用）                                                                   | _DisabledTime_                    | `-`        |
| `separator`               | 展示分隔符                                                                                             | _string_                          | `~`        |
| `show-next-day`           | 结束早于开始时，在字段与面板结束侧显示「次日」；开启后确认时不交换起止。未开启时在确认时按时间先后交换 | _boolean_                         | `false`    |
| `time-picker-props`       | 透传给 `mp-time-picker`（clock 模式）                                                                  | _Partial\<TimePickerProps\>_      | `{}`       |
| `picker-props`            | 透传给 `mp-picker`（picker 模式）                                                                      | _Partial\<PickerProps\>_          | `{}`       |
| `time-range-picker-props` | 透传给 `mp-time-range-picker`                                                                          | _Partial\<TimeRangePickerProps\>_ | `{}`       |
| `popup-props`             | 透传给弹窗的属性                                                                                       | _Partial\<PopupProps\>_           | `{}`       |
| `placeholder`             | 占位符                                                                                                 | _string_                          | `-`        |
| `clearable`               | 是否可清除                                                                                             | _boolean_                         | `false`    |
| `disabled`                | 是否禁用                                                                                               | _boolean_                         | `false`    |
| `readonly`                | 是否只读                                                                                               | _boolean_                         | `false`    |
| `size`                    | 尺寸，可选值 `xs` `sm` `md` `lg` `xl`                                                                  | _ComponentSize_                   | `md`       |
| `variant`                 | 风格，可选值 `filled` `standard` `outlined`                                                            | _string_                          | `standard` |

### 事件

| 事件名   | 说明         | 参数              |
| -------- | ------------ | ----------------- |
| `focus`  | 获得焦点     | `-`               |
| `blur`   | 失去焦点     | `-`               |
| `change` | 确认后值变化 | _value: string[]_ |
| `clear`  | 清除         | _value: string[]_ |
| `close`  | 弹层关闭     | _value: string[]_ |

### 样式变量

| 变量                                     | 默认值                                                          |
| ---------------------------------------- | --------------------------------------------------------------- |
| `--time-range-label-font-size`           | `16px`                                                          |
| `--time-range-arrow-size`                | `20px`                                                          |
| `--time-range-toolbar-height`            | `var(--picker-toolbar-height, 44px)`                            |
| `--time-range-toolbar-padding`           | `var(--picker-toolbar-padding, 0 4px)`                          |
| `--time-range-title-text-color`          | `var(--picker-title-text-color, #555)`                          |
| `--time-range-title-font-size`           | `var(--picker-title-font-size, 16px)`                           |
| `--time-range-cancel-button-text-color`  | `var(--picker-cancel-button-text-color, #888)`                  |
| `--time-range-confirm-button-text-color` | `var(--picker-confirm-button-text-color, var(--color-primary))` |

面板样式变量见 [`TimeRangePicker`](/zh-CN/time-range-picker)。
