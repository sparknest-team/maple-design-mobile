# DateRange 日期范围

### 介绍

表单日期范围**字段**，点击后底部弹出 [`DateRangePicker`](/zh-CN/date-range-picker)。交互与 `Date` 一致：取消丢弃草稿，确认后才写回 `v-model`。

- 默认使用列滚轮面板（年 / 月 / 日，由 `type` 决定）
- `presentation="calendar"`：日历面板
- `show-time`：日期+时间列滚轮（对齐 Cedar）

### 基本使用

```html
<script setup>
  import { ref } from 'vue'

  const range = ref([])
</script>

<template>
  <mp-date-range v-model="range" placeholder="请选择日期范围" clearable />
</template>
```

### 日历模式

```html
<script setup>
  import { ref } from 'vue'

  const range = ref(['2024-01-01', '2024-12-31'])
</script>

<template>
  <mp-date-range v-model="range" presentation="calendar" placeholder="日历日期范围" clearable />
</template>
```

### 日期时间范围

```html
<script setup>
  import { ref } from 'vue'

  const range = ref([])
</script>

<template>
  <mp-date-range v-model="range" show-time placeholder="请选择日期时间范围" clearable />
</template>
```

### 选择类型

```html
<script setup>
  import { ref } from 'vue'

  const yearRange = ref([])
  const monthRange = ref([])
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-date-range v-model="yearRange" type="year" placeholder="选择年范围" clearable />
    <mp-date-range v-model="monthRange" type="month" placeholder="选择月范围" clearable />
  </mp-space>
</template>
```

### 自定义分隔符

```html
<script setup>
  import { ref } from 'vue'

  const range = ref([])
</script>

<template>
  <mp-date-range v-model="range" separator=" 至 " placeholder="自定义分隔符" clearable />
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
    <mp-form-item field="period" label="时间段" required>
      <mp-date-range v-model="formData.period" placeholder="请选择" clearable />
    </mp-form-item>
  </mp-form>
</template>
```

## API

### 属性

| 参数                      | 说明                                               | 类型                              | 默认值     |
| ------------------------- | -------------------------------------------------- | --------------------------------- | ---------- |
| `v-model`                 | 绑定值；`show-time` 时为日期时间字符串数组         | _string[]_                        | `[]`       |
| `open`                    | 弹层显隐受控                                       | _boolean_                         | `-`        |
| `presentation`            | 面板模式，可选值 `calendar` `picker`               | _string_                          | `picker`   |
| `type`                    | 选择类型，可选值 `year` `month` `date`             | _string_                          | `date`     |
| `show-time`               | 是否选择时间                                       | _boolean_                         | `false`    |
| `use-seconds`             | `show-time` 时是否显示秒                           | _boolean_                         | `false`    |
| `min`                     | 可选最小日期                                       | _string_                          | `-`        |
| `max`                     | 可选最大日期                                       | _string_                          | `-`        |
| `disabled-date`           | 判断日期是否禁用，返回 `true` 表示不可选           | _(val: string) => boolean_        | `-`        |
| `disabled-time`           | `show-time` 时禁用的时间（回调返回 true 表示禁用） | _DisabledTime_                    | `-`        |
| `separator`               | 展示分隔符                                         | _string_                          | `~`        |
| `date-picker-props`       | 透传给 `mp-date-picker`（calendar）                | _Partial\<DatePickerProps\>_      | `{}`       |
| `picker-props`            | 透传给 `mp-picker`（picker）                       | _Partial\<PickerProps\>_          | `{}`       |
| `date-range-picker-props` | 透传给 `mp-date-range-picker`                      | _Partial\<DateRangePickerProps\>_ | `{}`       |
| `popup-props`             | 透传给弹窗的属性                                   | _Partial\<PopupProps\>_           | `{}`       |
| `placeholder`             | 占位符                                             | _string_                          | `-`        |
| `clearable`               | 是否可清除                                         | _boolean_                         | `false`    |
| `disabled`                | 是否禁用                                           | _boolean_                         | `false`    |
| `readonly`                | 是否只读                                           | _boolean_                         | `false`    |
| `size`                    | 尺寸，可选值 `xs` `sm` `md` `lg` `xl`              | _ComponentSize_                   | `md`       |
| `variant`                 | 风格，可选值 `filled` `standard` `outline`        | _string_                          | `standard` |

### 事件

| 事件名   | 说明           | 参数              |
| -------- | -------------- | ----------------- |
| `focus`  | 聚焦时触发     | `-`               |
| `blur`   | 失焦时触发     | `-`               |
| `click`  | 点击时触发     | `event: Event`    |
| `clear`  | 清除时触发     | `value: string[]` |
| `close`  | 弹层关闭时触发 | `value: string[]` |
| `change` | 确认选择后触发 | `value: string[]` |

### 方法

| 方法名  | 说明 | 参数 | 返回值 |
| ------- | ---- | ---- | ------ |
| `focus` | 聚焦 | `-`  | `-`    |
| `blur`  | 失焦 | `-`  | `-`    |

# DateRangePicker 日期范围面板

> 源码已并入 `date-range/`，安装父组件时一并注册。静态成员：`DateRange.Picker`。

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
| `elevation`         | 海拔高度                                                       | _number \| boolean_ | `false`  |

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
