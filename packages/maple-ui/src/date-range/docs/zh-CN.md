# DateRange 日期范围

### 日期值格式

两端使用独立复制的值、校验和提交逻辑。年、月、日模型默认格式为 `YYYY`、`YYYY-MM`、`YYYY-MM-DD`，日期时间默认包含秒；分钟精度设置 `:use-seconds="false"`。`format` 控制显示，`value-format` 控制模型，支持自定义格式、`Date` 与 `timestamp`。Maple 展示支持年/月/日及移动端日历、滚轮、时钟；周/季度面板仍是 Cedar 的展示能力。

### 介绍

表单日期范围**字段**，点击后底部弹出 [`DateRangePicker`](/zh-CN/date-range-picker)。交互与 `Date` 一致：取消丢弃草稿，确认后才写回 `v-model`。

- 默认使用列滚轮面板（年 / 月 / 日，由 `type` 决定）
- `presentation="calendar"`：日历面板
- `show-time`：日期+时间列滚轮（对齐 Cedar）

### 基本使用

滚轮模式下，点击结束输入会激活面板的结束端；切换两端只改草稿，确认后才提交。起止输入之间的焦点移动不触发整个字段的 blur。日历模式仍按两次日期选择组成范围。

```demo
../example/demos/basic-usage.vue
```

### 日历模式

```demo
../example/demos/calendar-mode.vue
```

### 日期时间

```demo
../example/demos/date-time.vue
```

### 选择类型

```demo
../example/demos/type.vue
```

### 自定义分隔符

```demo
../example/demos/separator.vue
```

### 禁用

```demo
../example/demos/disabled.vue
```

### 搭配 FormItem

```demo
../example/demos/with-form-item.vue
```

### 边界和端点禁用

```demo
../example/demos/boundaries.vue
```

## API

### 同源规则与事件

`DateValue = Date | string | number`。无效日期、不完整或逆序范围不能提交。min/max 包含边界，字符串按 value-format 解析，也可直接传 Date 或时间戳。确认时重新校验规则。`disabledTime` 返回 `disabledHours()`、`disabledMinutes(hour)`、`disabledSeconds(hour, minute)` 数字列表。纯面板通过校验后触发 `confirm(value, date(s), text(s))`；字段展开使用 `update:open` / `open-change`，不再使用 close。嵌套面板和弹层 props 只配置展示，不能覆盖顶层模型、规则与状态事件。范围 disabled 支持 `[起点禁用, 终点禁用]`，锁定端点不能被清除或修改。


字段使用两端独立同源的 PickerField → FieldDecorator。面板编辑草稿，确认才写回；取消或关闭不写回，清除立即提交空值并关闭。移动端字段不唤起软键盘。四类字段的组合示例见 Date 文档“统一字段与提交”。

### 属性

| 参数                      | 说明                                               | 类型                              | 默认值     |
| ------------------------- | -------------------------------------------------- | --------------------------------- | ---------- |
| `model-value` | 受控值 | DateValue[] | `undefined` |
| `default-value` | 非受控初始值，仅初始化读取 | DateValue[] | `undefined` |
| `format` | 展示格式或格式化函数 | string / (date: Date) => string | — |
| `value-format` | 模型格式、Date 或 timestamp | string | — |
| `disable-confirm` | 选择后立即提交 | boolean | 字段 false；面板 true |
| `open`                    | 弹层显隐受控                                       | _boolean_                         | `-`        |
| `default-open` | 非受控初始展开 | boolean | false |
| `popup-container` | 浮层挂载目标，顶层优先且支持 false | string / HTMLElement / (() => HTMLElement) / false | — |
| `presentation`            | 面板模式，可选值 `calendar` `picker`               | _string_                          | `picker`   |
| `type`                    | 选择类型，可选值 `year` `month` `date`             | _string_                          | `date`     |
| `show-time`               | 是否选择时间                                       | _boolean_                         | `false`    |
| `use-seconds` | 默认时间精度，显式 format 优先 | boolean | true |
| `min`                     | 可选最小日期                                       | DateValue                          | `-`        |
| `max`                     | 可选最大日期                                       | DateValue                          | `-`        |
| `disabled-date` | true 为禁用；side 为 start 或 end | (date: Date, side: DateSide) => boolean | — |
| `disabled-time` | 当前日期和端点的禁用时分秒列表 | (date: Date, side: DateSide) => DateDisabledTime | — |
| `separator`               | 展示分隔符                                         | _string_                          | `~`        |
| `date-picker-props`       | 透传给 `mp-date-picker`（calendar）                | _Partial\<DatePickerProps\>_      | `{}`       |
| `picker-props`            | 透传给 `mp-picker`（picker）                       | _Partial\<PickerProps\>_          | `{}`       |
| `date-range-picker-props` | 透传给 `mp-date-range-picker`                      | _Partial\<DateRangePickerProps\>_ | `{}`       |
| `popup-props`             | 透传给弹窗的属性                                   | _Partial\<PopupProps\>_           | `{}`       |
| `placeholder`             | 占位符                                             | _string_                          | `-`        |
| `clearable`               | 是否可清除                                         | _boolean_                         | `true`    |
| `disabled` | 禁用整体或单独端点 | boolean / boolean[] | false |
| `readonly`                | 是否只读                                           | _boolean_                         | `false`    |
| `size`                    | 尺寸，可选值 `xs` `sm` `md` `lg` `xl`              | _ComponentSize_                   | `md`       |
| `variant`                 | 风格，可选值 `filled` `standard` `outline`        | _string_                          | `standard` |

### 事件

| 事件名   | 说明           | 参数              |
| -------- | -------------- | ----------------- |
| `focus`  | 聚焦时触发     | `-`               |
| `blur`   | 失焦时触发     | `-`               |
| `click`  | 点击时触发     | `event: Event`    |
| `clear` | 清除：单值为 undefined，多选/范围为 [] | — |
| `open-change` | 展开状态改变 | open: boolean |
| `change` | 通过校验并正式提交 | value, date(s), formatted text(s) |
| `select` | 选择草稿，不代表已提交 | value, date(s), formatted text(s) |

### 方法

| 方法名  | 说明 | 参数 | 返回值 |
| ------- | ---- | ---- | ------ |
| `focus` | 聚焦 | `-`  | `-`    |
| `blur`  | 失焦 | `-`  | `-`    |

## DateRangePicker 日期范围面板

> 源码已并入 `date-range/`，安装父组件时一并注册。静态成员：`DateRange.Picker`。

### 介绍

日期范围选择**面板**，可单独嵌入页面使用。

- 默认使用列滚轮；`show-time` 时为年/月/日/时/分整列
- `presentation="calendar"`：日历面板（内部 `DatePicker` + `range`）
- `show-time` + `calendarClock`（`calendar` 也会解析为此）：顶部展示日期范围（日历直接选范围），底部切换起止时间；时间用时钟
- `show-time` + `calendarPicker`：同上，时间用时/分（秒）列滚轮

表单字段请使用 [`DateRange`](/zh-CN/date-range)；单日期面板请使用 [`DatePicker`](/zh-CN/date-picker)。

### 基本使用

```demo
../example/demos/picker-basic.vue
```

### 日历模式

```demo
../example/demos/picker-calendar.vue
```

### 日期时间范围

```demo
../example/demos/picker-date-time.vue
```

### 年 / 月范围

```demo
../example/demos/picker-type.vue
```

### 只读

```demo
../example/demos/picker-readonly.vue
```

### API

### 属性

| 参数                | 说明                                                           | 类型                          | 默认值   |
| ------------------- | -------------------------------------------------------------- | ----------------------------- | -------- |
| `model-value` | 受控值 | DateValue[] | `undefined` |
| `default-value` | 非受控初始值，仅初始化读取 | DateValue[] | `undefined` |
| `format` | 展示格式或格式化函数 | string / (date: Date) => string | — |
| `value-format` | 模型格式、Date 或 timestamp | string | — |
| `disable-confirm` | 选择后立即提交 | boolean | 字段 false；面板 true |
| `presentation`      | 面板模式：`calendar` `picker` `calendarClock` `calendarPicker` | _string_                      | `picker` |
| `type`              | 选择类型，可选值 `date` `month` `year`                         | _string_                      | `date`   |
| `show-time`         | 是否选择时间                                                   | _boolean_                     | `false`  |
| `use-seconds` | 默认时间精度，显式 format 优先 | boolean | true |
| `min`               | 可选最小日期                                                   | DateValue                      | `-`      |
| `max`               | 可选最大日期                                                   | DateValue                      | `-`      |
| `disabled-date` | true 为禁用；side 为 start 或 end | (date: Date, side: DateSide) => boolean | — |
| `disabled-time` | 当前日期和端点的禁用时分秒列表 | (date: Date, side: DateSide) => DateDisabledTime | — |
| `date-picker-props` | 透传给 `mp-date-picker`（calendar 模式）                       | _Partial\<DatePickerProps\>_  | `{}`     |
| `picker-props`      | 透传给 `mp-picker`（picker 模式）                              | _Partial\<PickerProps\>_      | `{}`     |
| `time-picker-props` | 透传给 `mp-time-picker`（calendar + show-time）                | _Partial\<TimePickerProps\>_  | `{}`     |
| `readonly`          | 是否只读                                                       | _boolean_                     | `false`  |
| `elevation`         | 海拔高度                                                       | _number \| boolean_ | `false`  |

### 事件

| 事件名   | 说明               | 回调参数          |
| -------- | ------------------ | ----------------- |
| `change` | 通过校验并正式提交 | value, date(s), formatted text(s) |
| `select` | 选择草稿，不代表已提交 | value, date(s), formatted text(s) |

### 插槽

| 名称      | 说明           | 参数 |
| --------- | -------------- | ---- |
| `actions` | 自定义操作面板 | `-`  |

### 样式变量

| 变量名                                       | 默认值                                  |
| -------------------------------------------- | --------------------------------------- |
| `--mp-date-range-picker-values-height`          | `56px`                                  |
| `--mp-date-range-picker-values-font-size`       | `18px`                                  |
| `--mp-date-range-picker-values-font-weight`     | `500`                                   |
| `--mp-date-range-picker-value-color`            | `var(--mp-color-text-3)`                   |
| `--mp-date-range-picker-value-active-color`     | `var(--mp-color-primary)`                  |
| `--mp-date-range-picker-value-arrow-color`      | `var(--mp-color-border-2)`                 |
| `--mp-date-range-picker-value-arrow-size`       | `18px`                                  |
| `--mp-date-range-picker-value-date-font-size`   | `13px`                                  |
| `--mp-date-range-picker-value-time-font-size`   | `22px`                                  |
| `--mp-date-range-picker-column-label-height`    | `36px`                                  |
| `--mp-date-range-picker-column-label-font-size` | `13px`                                  |
| `--mp-date-range-picker-column-label-color`     | `var(--mp-color-text-3)`                   |
| `--mp-date-range-picker-border-radius`          | `var(--mp-date-picker-border-radius, 4px)` |
| `--mp-date-range-picker-background`             | `var(--mp-color-fill-2)`                   |
