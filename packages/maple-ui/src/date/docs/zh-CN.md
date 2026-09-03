# Date 日期

### 介绍

表单日期字段，点击后底部弹出 `DatePicker`。交互对齐 Select 的 picker 模式：取消丢弃草稿，确认后才写回 `v-model`。

### 基本使用

```html
<script setup>
  import { ref } from 'vue'

  const date = ref()
</script>

<template>
  <mp-date v-model="date" placeholder="请选择日期" clearable />
</template>
```

### 日历模式

默认使用列滚轮，设置 `presentation="calendar"` 可切换为日历面板。

```html
<script setup>
  import { ref } from 'vue'

  const date = ref()
</script>

<template>
  <mp-date v-model="date" presentation="calendar" placeholder="使用日历选择日期" clearable />
</template>
```

### 选择类型

```html
<script setup>
  import { ref } from 'vue'

  const year = ref()
  const month = ref()
  const date = ref()
</script>

<template>
  <mp-space direction="column" size="large">
    <mp-date v-model="year" type="year" placeholder="选择年" />
    <mp-date v-model="month" type="month" placeholder="选择月" />
    <mp-date v-model="date" type="date" placeholder="选择日" />
  </mp-space>
</template>
```

### 多选

```html
<script setup>
  import { ref } from 'vue'

  const multiple = ref([])
</script>

<template>
  <mp-date v-model="multiple" multiple placeholder="多选日期" />
</template>
```

日期范围请使用 [`DateRange`](/zh-CN/date-range)。

### 日期时间

通过 `show-time` 开启日期+时间（对齐 Cedar）。

```html
<script setup>
  import { ref } from 'vue'

  const dateTime = ref()
</script>

<template>
  <mp-date v-model="dateTime" show-time placeholder="请选择日期时间" clearable />
</template>
```

### 搭配 FormItem

```html
<script setup>
  import { reactive, ref } from 'vue'

  const form = ref(null)
  const formData = reactive({
    birthday: undefined,
  })
</script>

<template>
  <mp-form ref="form" :model="formData">
    <mp-form-item field="birthday" label="生日" required>
      <mp-date v-model="formData.birthday" placeholder="请选择" clearable />
    </mp-form-item>
  </mp-form>
</template>
```

## API

### 属性

| 参数                | 说明                                                                  | 类型                         | 默认值     |
| ------------------- | --------------------------------------------------------------------- | ---------------------------- | ---------- |
| `v-model`           | 绑定值；`show-time` 时为日期时间字符串                                | _string \| string[]_         | `-`        |
| `open`              | 弹层显隐受控                                                          | _boolean_                    | `-`        |
| `presentation`      | 面板模式，可选值 `picker` `calendar` `calendarClock` `calendarPicker` | _string_                     | `picker`   |
| `type`              | 选择类型，可选值 `year` `month` `date`                                | _string_                     | `date`     |
| `show-time`         | 是否选择时间                                                          | _boolean_                    | `false`    |
| `use-seconds`       | `show-time` 时是否显示秒                                              | _boolean_                    | `false`    |
| `multiple`          | 是否多选                                                              | _boolean_                    | `false`    |
| `min`               | 可选最小日期                                                          | _string_                     | `-`        |
| `max`               | 可选最大日期                                                          | _string_                     | `-`        |
| `disabled-date`     | 判断日期是否禁用，返回 `true` 表示不可选                              | _(val: string) => boolean_   | `-`        |
| `disabled-time`     | `show-time` 时禁用的时间（回调返回 true 表示禁用）                    | _DisabledTime_               | `-`        |
| `separator`         | 多选展示分隔符                                                        | _string_                     | `, `       |
| `date-picker-props` | 透传给 `mp-date-picker` 的属性                                        | _Partial\<DatePickerProps\>_ | `{}`       |
| `popup-props`       | 透传给弹窗的属性                                                      | _Partial\<PopupProps\>_      | `{}`       |
| `placeholder`       | 占位符                                                                | _string_                     | `-`        |
| `clearable`         | 是否可清除                                                            | _boolean_                    | `false`    |
| `disabled`          | 是否禁用                                                              | _boolean_                    | `false`    |
| `readonly`          | 是否只读                                                              | _boolean_                    | `false`    |
| `size`              | 尺寸，可选值 `xs` `sm` `md` `lg` `xl`                                 | _ComponentSize_              | `md`       |
| `variant`           | 风格，可选值 `filled` `standard` `outlined`                           | _string_                     | `standard` |

### 事件

| 事件名   | 说明           | 参数           |
| -------- | -------------- | -------------- |
| `focus`  | 聚焦时触发     | `-`            |
| `blur`   | 失焦时触发     | `-`            |
| `click`  | 点击时触发     | `event: Event` |
| `clear`  | 清除时触发     | `value`        |
| `close`  | 弹层关闭时触发 | `value`        |
| `change` | 确认选择后触发 | `value`        |

### 方法

| 方法名  | 说明 | 参数 | 返回值 |
| ------- | ---- | ---- | ------ |
| `focus` | 聚焦 | `-`  | `-`    |
| `blur`  | 失焦 | `-`  | `-`    |

### 插槽

| 插槽名       | 说明         | 参数                                 |
| ------------ | ------------ | ------------------------------------ |
| `selected`   | 选择区域内容 | `-`                                  |
| `prefix`     | 前缀         | `-`                                  |
| `clear-icon` | 清除图标     | `clear: (e: Event) => void`          |
| `suffix`     | 后缀         | `-`                                  |
| `arrow-icon` | 箭头图标     | `focus: boolean, popupOpen: boolean` |

# DatePicker 日期面板

> 源码已并入 `date/`，安装父组件时一并注册。静态成员：`Date.Picker`。

### 介绍

日期选择**面板**，可单独嵌入页面使用。日期范围面板请使用 [`DateRangePicker`](/zh-CN/date-range-picker)；表单字段请使用 [`Date`](/zh-CN/date) / [`DateRange`](/zh-CN/date-range)。

### 基本使用

```html
<script setup>
  import { ref } from 'vue'

  const date = ref('2021-04-08')
</script>

<template>
  <mp-date-picker v-model="date" />
</template>
```

### 日历模式

普通单选默认使用列滚轮。设置 `presentation="calendar"` 可切换为日历；`multiple` 和 `range` 会自动使用日历。

```html
<mp-date-picker v-model="date" presentation="calendar" />
```

### 月份选择器

使用 `type` 属性切换选择器的类型，`type` 默认值为 `date`

```html
<script setup>
  import { ref } from 'vue'

  const date = ref('2021-04-08')
</script>

<template>
  <mp-date-picker type="month" v-model="date" elevation />
</template>
```

### 多选

通过 `multiple` 属性选择多个日期，此时 `date` 为一个数组。

```html
<script setup>
  import { ref } from 'vue'

  const date = ref([])
</script>

<template>
  <mp-date-picker v-model="date" multiple />
</template>
```

### 选择范围

通过 `range` 属性选择一个日期范围，此时 `date` 为 `[startDate, endDate]`。

```html
<script setup>
  import { ref } from 'vue'

  const date = ref(['2021-04-08', '2021-04-20'])
</script>

<template>
  <mp-date-picker type="date" v-model="date" range />
</template>
```

### 日期限制

通过 `min` 和 `max` 属性来控制可选择的日期范围，使用 `disabled-date` 属性禁用不可选择的日期。

```html
<script setup>
  import { ref } from 'vue'

  const date = ref('2020-11-11')

  const disabledDate = (val) => parseInt(val.split('-')[2], 10) % 2 === 0
</script>

<template>
  <mp-date-picker v-model="date" min="2020-10-15" max="2021-01-15" :disabled-date="disabledDate" />
</template>
```

### 日期时间

通过 `show-time` 开启日期+时间。`presentation` 决定形态：

- `calendarClock`（`show-time` 且未指定时，`calendar` 也会解析为此）：**顶部切日期，底部切时间**；日历 + 时钟
- `calendarPicker`：顶部切日期，底部切时间；日历 + 时/分（秒）列
- `picker`：年/月/日/时/分整列滚轮

```html
<script setup>
  import { ref } from 'vue'

  const clock = ref('2025-01-15 10:29')
  const calendarPicker = ref('2025-01-15 10:29')
  const picker = ref('2025-01-15 10:29')
</script>

<template>
  <mp-date-picker v-model="clock" show-time presentation="calendarClock" />
  <mp-date-picker v-model="calendarPicker" show-time presentation="calendarPicker" />
  <mp-date-picker v-model="picker" show-time presentation="picker" />
</template>
```

## API

### 属性

| 参数                | 说明                                                           | 类型                          | 默认值      |
| ------------------- | -------------------------------------------------------------- | ----------------------------- | ----------- |
| `v-model`           | 被选择的日期；`show-time` 时为日期时间字符串                   | _string[] \| string_          | `undefined` |
| `type`              | 选择器类型，可选值为 `date month year`                         | _string_                      | `date`      |
| `presentation`      | 面板形态：`calendar` `picker` `calendarClock` `calendarPicker` | _string_                      | `picker`    |
| `show-time`         | 是否选择时间                                                   | _boolean_                     | `false`     |
| `use-seconds`       | `show-time` 时是否显示秒                                       | _boolean_                     | `false`     |
| `disabled-date`     | 判断日期是否禁用，返回 `true` 表示不可选                       | _function_                    | `-`         |
| `disabled-time`     | `show-time` 时禁用的时间（回调返回 true 表示禁用）             | _DisabledTime_                | `-`         |
| `time-picker-props` | 透传给 `mp-time-picker`（`calendarClock`）                     | _Partial\<TimePickerProps\>_  | `{}`        |
| `color`             | 选择器的颜色                                                   | _string_                      | `-`         |
| `title-color`       | 标题背景色。如果未指定，将使用 `color` 属性或默认颜色。        | _string_                      | `-`         |
| `hint`              | 选择器提示语                                                   | _string_                      | `选择日期`  |
| `elevation`         | 海拔高度，可选值为 `true` `false` 和 `0-24` 的等级             | _string \| number \| boolean_ | `false`     |
| `button-elevation`  | Button 的海拔高度                                              | _string \| number \| boolean_ | `true`      |
| `first-day-of-week` | 设置一周的第一天，从周日的 0 开始。                            | _string \| number_            | `0`         |
| `min`               | 允许的最小日期/月份（ISO 8601格式）                            | _string_                      | `-`         |
| `max`               | 允许的最大日期/月份（ISO 8601格式）                            | _string_                      | `-`         |
| `show-current`      | 是否显示当前日期                                               | _boolean_                     | `true`      |
| `readonly`          | 是否只读                                                       | _boolean_                     | `false`     |
| `multiple`          | 是否支持选择多个日期                                           | _boolean_                     | `false`     |
| `range`             | 是否支持选择一个范围                                           | _boolean_                     | `false`     |
| `touchable`         | 是否支持拖动切换面板                                           | _boolean_                     | `true`      |

### 事件

| 事件名    | 说明           | 回调参数                                              |
| --------- | -------------- | ----------------------------------------------------- |
| `preview` | 日期切换时触发 | `year: number` <br>`month: number` <br>`day?: number` |
| `change`  | 日期改变时触发 | `value: string \| string[]`                           |

### 插槽

`weekIndex` 表示一周的第 `n` 天，从周末的 `0` 开始

| 名称       | 说明               | 参数                                                                 |
| ---------- | ------------------ | -------------------------------------------------------------------- |
| `year`     | 自定义标题中的年   | `year: YYYY`                                                         |
| `month`    | 自定义标题中的月   | `year: YYYY` <br> `month: MM`                                        |
| `date`     | 自定义标题中的日期 | `year: YYYY` <br> `month: MM` <br> `date: DD` <br> `week: weekIndex` |
| `range`    | 自定义标题中的范围 | `choose: [startData, endDate]`                                       |
| `multiple` | 自定义标题中的多选 | `choose: ['YYYY-MM-DD' \| 'YYYY-MM']`                                |
| `actions`  | 自定义操作面板     | `-`                                                                  |

### 样式变量

以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

| 变量名                                       | 默认值                 |
| -------------------------------------------- | ---------------------- |
| `--date-picker-border-radius`                | `4px`                  |
| `--date-picker-font-size`                    | `var(--font-size-md)`  |
| `--date-picker-min-width`                    | `290px`                |
| `--date-picker-main-color`                   | `rgba(0, 0, 0, .87)`   |
| `--date-picker-title-hint-color`             | `#fff`                 |
| `--date-picker-title-hint-font-size`         | `var(--font-size-md)`  |
| `--date-picker-title-height`                 | `105px`                |
| `--date-picker-title-padding`                | `16px`                 |
| `--date-picker-title-background`             | `var(--color-primary)` |
| `--date-picker-title-color`                  | `#fff`                 |
| `--date-picker-title-year-font-size`         | `var(--font-size-md)`  |
| `--date-picker-title-year-font-weight`       | `500`                  |
| `--date-picker-title-year-margin-bottom`     | `8px`                  |
| `--date-picker-title-year-min-height`        | `21px`                 |
| `--date-picker-title-date-height`            | `48px`                 |
| `--date-picker-title-date-font-size`         | `34px`                 |
| `--date-picker-title-date-font-weight`       | `500`                  |
| `--date-picker-title-date-range-font-size`   | `20px`                 |
| `--date-picker-title-date-justify-content`   | `normal`               |
| `--date-picker-header-arrow-filter`          | `opacity(0.54)`        |
| `--date-picker-body-background-color`        | `#fff`                 |
| `--date-picker-body-height`                  | `280px`                |
| `--date-picker-body-padding`                 | `0`                    |
| `--date-picker-header-padding`               | `4px 16px`             |
| `--date-picker-actions-padding`              | `0 8px 12px 8px`       |
| `--date-picker-header-color`                 | `#555`                 |
| `--month-picker-padding`                     | `0 12px`               |
| `--month-picker-item-width`                  | `33%`                  |
| `--month-picker-item-height`                 | `56px`                 |
| `--month-picker-item-button-max-width`       | `140px`                |
| `--year-picker-padding`                      | `0 12px`               |
| `--year-picker-item-width`                   | `33%`                  |
| `--year-picker-item-height`                  | `56px`                 |
| `--year-picker-item-button-max-width`        | `140px`                |
| `--day-picker-content-item-width`            | `14.28%`               |
| `--day-picker-content-item-min-height`       | `21px`                 |
| `--day-picker-content-item-font-size`        | `var(--font-size-sm)`  |
| `--day-picker-content-item-padding`          | `2px 0`                |
| `--day-picker-content-item-button-width`     | `32px`                 |
| `--day-picker-content-item-button-height`    | `32px`                 |
| `--day-picker-content-item-button-font-size` | `var(--font-size-sm)`  |
| `--day-picker-head-item-color`               | `rgba(0, 0, 0, 0.38)`  |
| `--day-picker-head-item-padding`             | `8px 0`                |
| `--day-picker-head-item-font-weight`         | `600`                  |
