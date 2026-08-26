# Time 时间

### 介绍

表单时间**字段**，点击后底部弹出 `TimePicker`。交互对齐 Select 的 picker 模式：取消丢弃草稿，确认后才写回 `v-model`。

时间范围请使用 [`TimeRange`](/zh-CN/time-range)；纯面板请使用 [`TimePicker`](/zh-CN/time-picker)；时间范围面板请使用 [`TimeRangePicker`](/zh-CN/time-range-picker)。

### 基本使用

```html
<script setup>
  import { ref } from 'vue'

  const time = ref()
</script>

<template>
  <mp-time v-model="time" placeholder="请选择时间" clearable />
</template>
```

### 24 小时制与秒

```html
<script setup>
  import { ref } from 'vue'

  const time = ref()
  const timeWithSeconds = ref()
</script>

<template>
  <mp-space direction="column" size="large">
    <mp-time v-model="time" format="24hr" placeholder="24 小时制" />
    <mp-time v-model="timeWithSeconds" format="24hr" use-seconds placeholder="含秒" />
  </mp-space>
</template>
```

### 时钟选择器

默认使用时、分、秒滚轮。设置 `presentation="clock"` 可切换为钟面。

```html
<script setup>
  import { ref } from 'vue'

  const time = ref()
</script>

<template>
  <mp-time v-model="time" presentation="clock" format="24hr" placeholder="时钟选择时间" clearable />
</template>
```

### 禁用与只读

```html
<script setup>
  import { ref } from 'vue'

  const disabledTime = ref('09:30')
  const readonlyTime = ref('09:30')
</script>

<template>
  <mp-space direction="column" size="large">
    <mp-time v-model="disabledTime" format="24hr" disabled />
    <mp-time v-model="readonlyTime" format="24hr" readonly />
  </mp-space>
</template>
```

### 搭配 FormItem

```html
<script setup>
  import { reactive, ref } from 'vue'

  const form = ref(null)
  const formData = reactive({
    alarm: undefined,
  })
</script>

<template>
  <mp-form ref="form" :model="formData">
    <mp-form-item field="alarm" label="闹钟" required>
      <mp-time v-model="formData.alarm" placeholder="请选择" clearable />
    </mp-form-item>
  </mp-form>
</template>
```

## API

### 属性

| 参数                | 说明                                        | 类型                         | 默认值     |
| ------------------- | ------------------------------------------- | ---------------------------- | ---------- |
| `v-model`           | 绑定值（`HH:mm` 或 `HH:mm:ss`）             | _string_                     | `-`        |
| `open`              | 弹层显隐受控                                | _boolean_                    | `-`        |
| `presentation`      | 面板模式，可选值 `clock` `picker`           | _string_                     | `picker`   |
| `format`            | 展示格式，可选值 `ampm` `24hr`              | _string_                     | `ampm`     |
| `use-seconds`       | 是否选择秒                                  | _boolean_                    | `false`    |
| `min`               | 可选最小时间                                | _string_                     | `-`        |
| `max`               | 可选最大时间                                | _string_                     | `-`        |
| `disabled-time`     | 禁用的时间（回调返回 true 表示禁用）        | _DisabledTime_               | `-`        |
| `time-picker-props` | 透传给 `mp-time-picker` 的属性              | _Partial\<TimePickerProps\>_ | `{}`       |
| `picker-props`      | 透传给 `mp-picker` 的属性                   | _Partial\<PickerProps\>_     | `{}`       |
| `popup-props`       | 透传给弹窗的属性                            | _Partial\<PopupProps\>_      | `{}`       |
| `placeholder`       | 占位符                                      | _string_                     | `-`        |
| `clearable`         | 是否可清除                                  | _boolean_                    | `false`    |
| `disabled`          | 是否禁用                                    | _boolean_                    | `false`    |
| `readonly`          | 是否只读                                    | _boolean_                    | `false`    |
| `size`              | 尺寸，可选值 `xs` `sm` `md` `lg` `xl`       | _ComponentSize_              | `md`       |
| `variant`           | 风格，可选值 `filled` `standard` `outlined` | _string_                     | `standard` |

### 事件

| 事件名   | 说明         | 参数                         |
| -------- | ------------ | ---------------------------- |
| `focus`  | 获得焦点     | `-`                          |
| `blur`   | 失去焦点     | `-`                          |
| `change` | 确认后值变化 | _value: string \| undefined_ |
| `clear`  | 清除         | _value: undefined_           |
| `close`  | 弹层关闭     | _value: string \| undefined_ |
