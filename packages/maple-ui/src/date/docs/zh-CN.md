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
