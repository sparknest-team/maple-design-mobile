# Date 日期

### 日期值格式

两端使用独立复制的值、校验和提交逻辑。年、月、日模型默认格式为 `YYYY`、`YYYY-MM`、`YYYY-MM-DD`，日期时间默认包含秒；分钟精度设置 `:use-seconds="false"`。`format` 控制显示，`value-format` 控制模型，支持自定义格式、`Date` 与 `timestamp`。Maple 展示支持年/月/日及移动端日历、滚轮、时钟；周/季度面板仍是 Cedar 的展示能力。

### 介绍

表单日期字段，点击后底部弹出 `DatePicker`。交互对齐 Select 的 picker 模式：取消丢弃草稿，确认后才写回 `v-model`。

### 统一字段与提交

Date / DateRange / Time / TimeRange 使用同源的 PickerField → FieldDecorator 字段层。移动端字段不弹出软键盘，由面板编辑草稿；确认才写回，取消或外部关闭不改变值。清除立即写入空值并关闭面板，不恢复旧草稿。日期和时间范围显示两个独立输入位置，跨日时间保留“次日”提示。

```demo
../example/demos/field-protocol.vue
```

### 基本使用

```demo
../example/demos/basic-usage.vue
```

### 日历模式

```demo
../example/demos/calendar-mode.vue
```

### 选择类型

```demo
../example/demos/type.vue
```

### 多选

```demo
../example/demos/multiple.vue
```

### 日期时间

```demo
../example/demos/date-time.vue
```

### 禁用

```demo
../example/demos/disabled.vue
```

### 搭配 FormItem

```demo
../example/demos/with-form-item.vue
```

### 模型格式与显示格式

```demo
../example/demos/value-formats.vue
```

## API

### 同源规则与事件

`DateValue = Date | string | number`。无效日期、不完整或逆序范围不能提交。min/max 包含边界，字符串按 value-format 解析，也可直接传 Date 或时间戳。确认时重新校验规则。`disabledTime` 返回 `disabledHours()`、`disabledMinutes(hour)`、`disabledSeconds(hour, minute)` 数字列表。纯面板通过校验后触发 `confirm(value, date(s), text(s))`；字段展开使用 `update:open` / `open-change`，不再使用 close。嵌套面板和弹层 props 只配置展示，不能覆盖顶层模型、规则与状态事件。范围 disabled 支持 `[起点禁用, 终点禁用]`，锁定端点不能被清除或修改。


### 属性

| 参数                | 说明                                                                  | 类型                         | 默认值     |
| ------------------- | --------------------------------------------------------------------- | ---------------------------- | ---------- |
| `model-value` | 受控值 | DateValue / DateValue[] (multiple/range) | `undefined` |
| `default-value` | 非受控初始值，仅初始化读取 | DateValue / DateValue[] (multiple/range) | `undefined` |
| `format` | 展示格式或格式化函数 | string / (date: Date) => string | — |
| `value-format` | 模型格式、Date 或 timestamp | string | — |
| `disable-confirm` | 选择后立即提交 | boolean | 字段 false；面板 true |
| `open`              | 弹层显隐受控                                                          | _boolean_                    | `-`        |
| `default-open` | 非受控初始展开 | boolean | false |
| `popup-container` | 浮层挂载目标，顶层优先且支持 false | string / HTMLElement / (() => HTMLElement) / false | — |
| `presentation`      | 面板模式，可选值 `picker` `calendar` `calendarClock` `calendarPicker` | _string_                     | `picker`   |
| `type`              | 选择类型，可选值 `year` `month` `date`                                | _string_                     | `date`     |
| `show-time`         | 是否选择时间                                                          | _boolean_                    | `false`    |
| `use-seconds` | 默认时间精度，显式 format 优先 | boolean | true |
| `multiple`          | 是否多选                                                              | _boolean_                    | `false`    |
| `min`               | 可选最小日期                                                          | DateValue                     | `-`        |
| `max`               | 可选最大日期                                                          | DateValue                     | `-`        |
| `disabled-date` | true 为禁用；side 为 start 或 end | (date: Date, side: DateSide) => boolean | — |
| `disabled-time` | 当前日期和端点的禁用时分秒列表 | (date: Date, side: DateSide) => DateDisabledTime | — |
| `separator`         | 多选展示分隔符                                                        | _string_                     | `, `       |
| `date-picker-props` | 透传给 `mp-date-picker` 的属性                                        | _Partial\<DatePickerProps\>_ | `{}`       |
| `popup-props`       | 透传给弹窗的属性                                                      | _Partial\<PopupProps\>_      | `{}`       |
| `placeholder`       | 占位符                                                                | _string_                     | `-`        |
| `clearable`         | 是否可清除                                                            | _boolean_                    | `true`    |
| `disabled`          | 是否禁用                                                              | _boolean_                    | `false`    |
| `readonly`          | 是否只读                                                              | _boolean_                    | `false`    |
| `size`              | 尺寸，可选值 `xs` `sm` `md` `lg` `xl`                                 | _ComponentSize_              | `md`       |
| `variant`           | 风格，可选值 `filled` `standard` `outline`                           | _string_                     | `standard` |

### 事件

| 事件名   | 说明           | 参数           |
| -------- | -------------- | -------------- |
| `focus`  | 聚焦时触发     | `-`            |
| `blur`   | 失焦时触发     | `-`            |
| `click`  | 点击时触发     | `event: Event` |
| `clear` | 清除：单值为 undefined，多选/范围为 [] | — |
| `open-change` | 展开状态改变 | open: boolean |
| `change` | 通过校验并正式提交 | value, date(s), formatted text(s) |
| `select` | 选择草稿，不代表已提交 | value, date(s), formatted text(s) |

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
| `suffix-icon` | 箭头图标     | `focus: boolean, popupOpen: boolean` |

## DatePicker 日期面板

> 源码已并入 `date/`，安装父组件时一并注册。静态成员：`Date.Picker`。

### 介绍

日期选择**面板**，可单独嵌入页面使用。日期范围面板请使用 [`DateRangePicker`](/zh-CN/date-range-picker)；表单字段请使用 [`Date`](/zh-CN/date) / [`DateRange`](/zh-CN/date-range)。

### 基本使用

```demo
../example/demos/picker-basic.vue
```

### 日历模式

普通单选默认使用列滚轮。设置 `presentation="calendar"` 可切换为日历；`multiple` 和 `range` 会自动使用日历。

```demo
../example/demos/picker-calendar.vue
```

### 月份选择器

使用 `type` 属性切换选择器的类型，`type` 默认值为 `date`

```demo
../example/demos/picker-month.vue
```

### 多选

通过 `multiple` 属性选择多个日期，此时 `date` 为一个数组。

```demo
../example/demos/picker-multiple.vue
```

### 选择范围

通过 `range` 属性选择一个日期范围，此时 `date` 为 `[startDate, endDate]`。

```demo
../example/demos/picker-range.vue
```

### 日期限制

通过 `min` 和 `max` 属性来控制可选择的日期范围，使用 `disabled-date` 属性禁用不可选择的日期。

```demo
../example/demos/picker-limit.vue
```

### 日期时间

通过 `show-time` 开启日期+时间。`presentation` 决定形态：

- `calendarClock`（`show-time` 且未指定时，`calendar` 也会解析为此）：**顶部切日期，底部切时间**；日历 + 时钟
- `calendarPicker`：顶部切日期，底部切时间；日历 + 时/分（秒）列
- `picker`：年/月/日/时/分整列滚轮

```demo
../example/demos/picker-date-time.vue
```

### API

### 属性

| 参数                | 说明                                                           | 类型                          | 默认值      |
| ------------------- | -------------------------------------------------------------- | ----------------------------- | ----------- |
| `model-value` | 受控值 | DateValue / DateValue[] (multiple/range) | `undefined` |
| `default-value` | 非受控初始值，仅初始化读取 | DateValue / DateValue[] (multiple/range) | `undefined` |
| `format` | 展示格式或格式化函数 | string / (date: Date) => string | — |
| `value-format` | 模型格式、Date 或 timestamp | string | — |
| `disable-confirm` | 选择后立即提交 | boolean | 字段 false；面板 true |
| `type`              | 选择器类型，可选值为 `date month year`                         | _string_                      | `date`      |
| `presentation`      | 面板形态：`calendar` `picker` `calendarClock` `calendarPicker` | _string_                      | `picker`    |
| `show-time`         | 是否选择时间                                                   | _boolean_                     | `false`     |
| `use-seconds` | 默认时间精度，显式 format 优先 | boolean | true |
| `disabled-date` | true 为禁用；side 为 start 或 end | (date: Date, side: DateSide) => boolean | — |
| `disabled-time` | 当前日期和端点的禁用时分秒列表 | (date: Date, side: DateSide) => DateDisabledTime | — |
| `time-picker-props` | 透传给 `mp-time-picker`（`calendarClock`）                     | _Partial\<TimePickerProps\>_  | `{}`        |
| `color`             | 选择器的颜色                                                   | _string_                      | `-`         |
| `title-color`       | 标题背景色。如果未指定，将使用 `color` 属性或默认颜色。        | _string_                      | `-`         |
| `hint`              | 选择器提示语                                                   | _string_                      | `选择日期`  |
| `elevation`         | 海拔高度，可选值为 `true` `false` 和 `0-24` 的等级             | _number \| boolean_ | `false`     |
| `button-elevation`  | Button 的海拔高度                                              | _string \| number \| boolean_ | `true`      |
| `first-day-of-week` | 设置一周的第一天，从周日的 0 开始。                            | _string \| number_            | `0`         |
| `min`               | 允许的最小日期/月份（ISO 8601格式）                            | DateValue                      | `-`         |
| `max`               | 允许的最大日期/月份（ISO 8601格式）                            | DateValue                      | `-`         |
| `show-current`      | 是否显示当前日期                                               | _boolean_                     | `true`      |
| `readonly`          | 是否只读                                                       | _boolean_                     | `false`     |
| `multiple`          | 是否支持选择多个日期                                           | _boolean_                     | `false`     |
| `range`             | 是否支持选择一个范围                                           | _boolean_                     | `false`     |
| `touchable`         | 是否支持拖动切换面板                                           | _boolean_                     | `true`      |

### 事件

| 事件名    | 说明           | 回调参数                                              |
| --------- | -------------- | ----------------------------------------------------- |
| `preview` | 日期切换时触发 | `year: number` <br>`month: number` <br>`day?: number` |
| `change` | 通过校验并正式提交 | value, date(s), formatted text(s) |
| `select` | 选择草稿，不代表已提交 | value, date(s), formatted text(s) |

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
| `--mp-date-picker-border-radius`                | `4px`                  |
| `--mp-date-picker-font-size`                    | `var(--mp-font-size-md)`  |
| `--mp-date-picker-min-width`                    | `290px`                |
| `--mp-date-picker-main-color`                   | `rgba(0, 0, 0, .87)`   |
| `--mp-date-picker-title-hint-color`             | `#fff`                 |
| `--mp-date-picker-title-hint-font-size`         | `var(--mp-font-size-md)`  |
| `--mp-date-picker-title-height`                 | `105px`                |
| `--mp-date-picker-title-padding`                | `16px`                 |
| `--mp-date-picker-title-background`             | `var(--mp-color-primary)` |
| `--mp-date-picker-title-color`                  | `#fff`                 |
| `--mp-date-picker-title-year-font-size`         | `var(--mp-font-size-md)`  |
| `--mp-date-picker-title-year-font-weight`       | `500`                  |
| `--mp-date-picker-title-year-margin-bottom`     | `8px`                  |
| `--mp-date-picker-title-year-min-height`        | `21px`                 |
| `--mp-date-picker-title-date-height`            | `48px`                 |
| `--mp-date-picker-title-date-font-size`         | `34px`                 |
| `--mp-date-picker-title-date-font-weight`       | `500`                  |
| `--mp-date-picker-title-date-range-font-size`   | `20px`                 |
| `--mp-date-picker-title-date-justify-content`   | `normal`               |
| `--mp-date-picker-header-arrow-filter`          | `opacity(0.54)`        |
| `--mp-date-picker-body-background-color`        | `#fff`                 |
| `--mp-date-picker-body-height`                  | `280px`                |
| `--mp-date-picker-body-padding`                 | `0`                    |
| `--mp-date-picker-header-padding`               | `4px 16px`             |
| `--mp-date-picker-actions-padding`              | `0 8px 12px 8px`       |
| `--mp-date-picker-header-color`                 | `#555`                 |
| `--mp-month-picker-padding`                     | `0 12px`               |
| `--mp-month-picker-item-width`                  | `33%`                  |
| `--mp-month-picker-item-height`                 | `56px`                 |
| `--mp-month-picker-item-button-max-width`       | `140px`                |
| `--mp-year-picker-padding`                      | `0 12px`               |
| `--mp-year-picker-item-width`                   | `33%`                  |
| `--mp-year-picker-item-height`                  | `56px`                 |
| `--mp-year-picker-item-button-max-width`        | `140px`                |
| `--mp-day-picker-content-item-width`            | `14.28%`               |
| `--mp-day-picker-content-item-min-height`       | `21px`                 |
| `--mp-day-picker-content-item-font-size`        | `var(--mp-font-size-sm)`  |
| `--mp-day-picker-content-item-padding`          | `2px 0`                |
| `--mp-day-picker-content-item-button-width`     | `32px`                 |
| `--mp-day-picker-content-item-button-height`    | `32px`                 |
| `--mp-day-picker-content-item-button-font-size` | `var(--mp-font-size-sm)`  |
| `--mp-day-picker-head-item-color`               | `rgba(0, 0, 0, 0.38)`  |
| `--mp-day-picker-head-item-padding`             | `8px 0`                |
| `--mp-day-picker-head-item-font-weight`         | `600`                  |
