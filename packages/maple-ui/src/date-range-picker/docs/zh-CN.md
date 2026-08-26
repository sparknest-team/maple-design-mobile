# DateRangePicker 日期范围面板

### 介绍

日期范围选择**面板**，可单独嵌入页面使用。

- 默认使用列滚轮；`show-time` 时为年/月/日/时/分整列
- `presentation="calendar"`：日历面板（内部 `DatePicker` + `range`）
- `show-time` + `calendarClock`（`calendar` 也会解析为此）：顶部展示日期范围（日历直接选范围），底部切换起止时间；时间用时钟
- `show-time` + `calendarPicker`：同上，时间用时/分（秒）列滚轮

表单字段请使用 [`DateRange`](/zh-CN/date-range)；单日期面板请使用 [`DatePicker`](/zh-CN/date-picker)。

### 基本使用

```html
<script setup>
  import { ref } from 'vue'

  const range = ref(['2024-01-01', '2024-01-15'])
</script>

<template>
  <mp-date-range-picker v-model="range" />
</template>
```

### 日历模式

```html
<script setup>
  import { ref } from 'vue'

  const range = ref(['2024-01-01', '2024-12-31'])
</script>

<template>
  <mp-date-range-picker v-model="range" presentation="calendar" />
</template>
```

### 日期时间范围

```html
<script setup>
  import { ref } from 'vue'

  const clock = ref(['2025-01-15 10:29', '2025-01-16 11:29'])
  const calendarPicker = ref(['2025-01-15 10:29', '2025-01-16 11:29'])
  const picker = ref(['2025-01-15 10:29', '2025-01-16 11:29'])
</script>

<template>
  <mp-date-range-picker v-model="clock" show-time presentation="calendarClock" />
  <mp-date-range-picker v-model="calendarPicker" show-time presentation="calendarPicker" />
  <mp-date-range-picker v-model="picker" show-time presentation="picker" />
</template>
```

### 年 / 月范围

```html
<script setup>
  import { ref } from 'vue'

  const yearRange = ref(['2020', '2024'])
  const monthRange = ref(['2024-01', '2024-06'])
</script>

<template>
  <mp-date-range-picker v-model="yearRange" presentation="picker" type="year" />
  <mp-date-range-picker v-model="monthRange" presentation="picker" type="month" />
</template>
```

### 只读

```html
<script setup>
  import { ref } from 'vue'

  const range = ref(['2024-01-01', '2024-01-15'])
</script>

<template>
  <mp-date-range-picker v-model="range" readonly />
</template>
```

## API

### 属性

| 参数                | 说明                                                           | 类型                          | 默认值   |
| ------------------- | -------------------------------------------------------------- | ----------------------------- | -------- |
| `v-model`           | 绑定值；`show-time` 时为日期时间字符串数组                     | _string[]_                    | `[]`     |
| `presentation`      | 面板模式：`calendar` `picker` `calendarClock` `calendarPicker` | _string_                      | `picker` |
| `type`              | 选择类型，可选值 `date` `month` `year`                         | _string_                      | `date`   |
| `show-time`         | 是否选择时间                                                   | _boolean_                     | `false`  |
| `use-seconds`       | `show-time` 时是否显示秒                                       | _boolean_                     | `false`  |
| `min`               | 可选最小日期                                                   | _string_                      | `-`      |
| `max`               | 可选最大日期                                                   | _string_                      | `-`      |
| `disabled-date`     | 判断日期是否禁用，返回 `true` 表示不可选                       | _(val: string) => boolean_    | `-`      |
| `disabled-time`     | `show-time` 时禁用的时间（回调返回 true 表示禁用）             | _DisabledTime_                | `-`      |
| `date-picker-props` | 透传给 `mp-date-picker`（calendar 模式）                       | _Partial\<DatePickerProps\>_  | `{}`     |
| `picker-props`      | 透传给 `mp-picker`（picker 模式）                              | _Partial\<PickerProps\>_      | `{}`     |
| `time-picker-props` | 透传给 `mp-time-picker`（calendar + show-time）                | _Partial\<TimePickerProps\>_  | `{}`     |
| `readonly`          | 是否只读                                                       | _boolean_                     | `false`  |
| `elevation`         | 海拔高度                                                       | _string \| number \| boolean_ | `false`  |

### 事件

| 事件名   | 说明               | 回调参数          |
| -------- | ------------------ | ----------------- |
| `change` | 日期范围变化时触发 | `value: string[]` |

### 插槽

| 名称      | 说明           | 参数 |
| --------- | -------------- | ---- |
| `actions` | 自定义操作面板 | `-`  |

### 样式变量

| 变量名                                       | 默认值                                  |
| -------------------------------------------- | --------------------------------------- |
| `--date-range-picker-values-height`          | `56px`                                  |
| `--date-range-picker-values-font-size`       | `18px`                                  |
| `--date-range-picker-values-font-weight`     | `500`                                   |
| `--date-range-picker-value-color`            | `var(--color-text-3)`                   |
| `--date-range-picker-value-active-color`     | `var(--color-primary)`                  |
| `--date-range-picker-value-arrow-color`      | `var(--color-border-2)`                 |
| `--date-range-picker-value-arrow-size`       | `18px`                                  |
| `--date-range-picker-value-date-font-size`   | `13px`                                  |
| `--date-range-picker-value-time-font-size`   | `22px`                                  |
| `--date-range-picker-column-label-height`    | `36px`                                  |
| `--date-range-picker-column-label-font-size` | `13px`                                  |
| `--date-range-picker-column-label-color`     | `var(--color-text-3)`                   |
| `--date-range-picker-border-radius`          | `var(--date-picker-border-radius, 4px)` |
| `--date-range-picker-background`             | `var(--color-fill-2)`                   |
