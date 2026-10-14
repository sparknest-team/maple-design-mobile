# Date 日期

展开时，原生 combobox 通过 `aria-controls` 关联当前实例的命名弹层；关闭后同步更新状态并移除关联。`aria-label`、`aria-describedby` 可传递给原生控件。自定义 selected/触发插槽需自行保留可访问名称、键盘操作和状态关联。

### 日期值格式

两端使用独立复制的值、校验和提交逻辑。年、月、日模型默认格式为 `YYYY`、`YYYY-MM`、`YYYY-MM-DD`，日期时间默认包含秒；分钟精度设置 `:use-seconds="false"`。`format` 控制显示，`value-format` 控制模型，支持自定义格式、`Date` 与 `timestamp`。Maple 展示支持年/月/日及移动端日历、滚轮、时钟；周/季度面板仍是 Cedar 的展示能力。

### 介绍

表单日期字段，点击后底部弹出 `DatePicker`。交互对齐 Select 的 picker 模式：取消丢弃草稿，确认后才写回 `v-model`。

### 统一字段与提交

Date / DateRange / Time / TimeRange 使用同源的 PickerField → FieldDecorator 字段层。Date/DateRange 默认允许手输（可关闭）；Time 是否手输由其 inputEditable 控制。面板编辑草稿，确认才写回，取消或外部关闭不改变值。清除立即写入空值并关闭面板，不恢复旧草稿。日期和时间范围显示两个独立输入位置，跨日时间保留“次日”提示。

```demo
../example/demos/field-protocol.vue
```

### 受控关闭被拒绝

父级可以拒绝 `update:open(false)`，面板继续展开。同一选择重复确认不会再次提交或请求关闭；受控模型回写相同值不重置已确认状态。选择新日期后会开启新事务，可以再次确认。示例显示模型、提交次数和关闭请求次数。

```demo
../example/demos/rejected-close.vue
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
| `input-editable` | 是否允许手输；默认 true，函数 format/multiple 保持只读 | boolean | true |
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
| `date-picker-props` | 透传给 `mp-date-picker` 的属性                                        | _DatePickerOptions_ | `{}`       |
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

### 字段与嵌入式面板

字段负责输入与浮层，纯面板直接嵌入页面。day-start-of-week 统一为数字 0～6，0 为周日；范围日历也支持动态更新。嵌套 Options 只配置展示，不覆盖顶层值、格式、边界或禁用规则。

```demo
../example/demos/entry-boundary.vue
```

## DatePicker 日期面板
纯面板不接收 open/default-open、popup-container、placement、trigger-props、placeholder、variant、clearable。确认区由 disable-confirm 控制；actions 插槽提供 { confirm, disabled }。DatePicker/DateRangePicker 可以单独 app.use 安装，根入口和 date/date-range 子路径导出组件、Props、Instance、Type、Options、Emits；没有独立 date-picker/date-range-picker npm 子路径。


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
| `time-picker-props` | 透传给 `mp-time-picker`（`calendarClock`）                     | _DateTimePickerOptions_  | `{}`        |
| `color`             | 选择器的颜色                                                   | _string_                      | `-`         |
| `title-color`       | 标题背景色。如果未指定，将使用 `color` 属性或默认颜色。        | _string_                      | `-`         |
| `hint`              | 选择器提示语                                                   | _string_                      | `选择日期`  |
| `elevation`         | 海拔高度，可选值为 `true` `false` 和 `0-24` 的等级             | _number \| boolean_ | `false`     |
| `button-elevation`  | Button 的海拔高度                                              | _string \| number \| boolean_ | `true`      |
| `day-start-of-week` | 设置一周的第一天，从周日的 0 开始。                            | _DateWeekStart_            | `0`         |
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
| `actions`  | 自定义确认操作     | `{ confirm, disabled }`                                                                  |

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

### 快捷选项与日历视口

```demo
../example/demos/panel-tools.vue
```

两端均导出 `DateShortcut`、`DateShortcutsPosition`。快捷项包含 `label`、`value`（值或按需执行的函数）、可选 `format`（快捷值的输入格式）与 `disabled`；输出使用面板的 `value-format`。悬停或聚焦只预览，不提交；点击走普通日期选择的校验与确认流程。设置 `preview-shortcut=false` 仅关闭预览。`shortcuts-position` 支持 left/bottom/right，移动端建议 bottom。

`picker-value` 管理日历视口，不是选中值；`default-picker-value` 仅初始化读取。范围视口为两个日期。导航发出 `update:picker-value` 和 `picker-value-change(value, dates, texts)`，不触发 `change` 或 `select`；受控更新不被接纳时保留原视口。`select-shortcut(shortcut)` 仅在快捷项通过校验并被接受后触发。移动端滚轮/时钟展示不提供日历月份导航。字段通过 `date-picker-props` 配置这些选项，转发上述三个事件。

### 当前日期与范围策略

```demo
../example/demos/current-range.vue
```

| 属性 | 说明 | 默认值 |
| --- | --- | --- |
| `show-current` | 日历中高亮当前日/月/年，不产生选择或提交 | true |
| `show-now-button` | DatePicker 单选面板的选择当前按钮，多选/范围不显示 | true |

选择当前按面板 type、时间精度与 value-format 生成候选，遵守 disabled/readonly、min/max、日期和时间禁用规则及 disable-confirm。disable-confirm=false 时只选择草稿，确认才提交；挂载或改变高亮均不写模型。字段通过 date-picker-props 配置。旧 showNowBtn 名称已删除，不保留别名。

actions 插槽提供 `{ confirm, disabled, selectNow, nowDisabled }`。自定义按钮应调用这两个受保护动作，不应直接写模型。

DateRangePicker 的 `exchange-time` 默认 true。反序交互日期在 true 时交换整个日期时间端点；false 时只交换日期、保留起止位置的时分秒。结果仍须通过端点规则和锁定端点校验。外部模型、手输值和快捷项不静默重排；保留时间位置后同日时间仍逆序的候选不能提交。Cedar 原 ConfigProvider.exchangeTime 全局覆盖已移除。

## 月份标签

字段通过 `date-picker-props` / `date-range-picker-props` 配置面板选项。

`abbreviation`（boolean，默认 `true`）控制日历月份网格的缩写；`false` 使用当前 Locale 的完整月份名。运行时修改立即生效，不改变值，也不触发选择事件。此开关不影响星期标签、标题、滚轮列或值格式。范围日历以顶层选项为准，嵌套日历参数不能覆盖。

```demo
../example/demos/month-labels.vue
```

### 语言与嵌套日历参数

日期标签、标题和动作接入各库的全局 Locale 与既有 Provider。Cedar 删除日期组件级 `locale`，不保留覆盖字典或兼容别名。切换语言不会选择或提交日期。

### 内嵌时间与滚轮展示

`time-picker-props` 使用 `DateTimePickerOptions`：`use12Hours`、`step`、`hideDisabledOptions`、`class`、`style`。仅配置时间展示；日期值、格式/秒精度、约束和确认仍由日期所有者管理。`step` 负责展示采样，不静默修正外部值。未知参数及监听函数不转发。

`picker-props` 使用 `DateWheelOptions`：`optionHeight`、`optionCount`、`class`、`style`，对单值/范围的日期和时间滚轮生效。不能覆盖内部生成的列、模型、工具条、字段映射或弹层状态。`calendarClock` 打开时间入口后明确展示时钟。

```demo
../example/demos/time-presentation.vue
```

### 真实端侧能力

Cedar 不公开 `Date.pickerProps`、`DateRange.pickerProps` 或 `DateRange.datePickerProps`：PC 字段不渲染移动滚轮或范围内部的移动日历插件，原无效参数已删除且无兼容别名。Maple 保留这些真实扩展，使用 DateWheelOptions 与 DateRangeCalendarOptions。两端通过 `Date.datePickerProps` / `DateRange.dateRangePickerProps` 配置完整面板，`timePickerProps` 配置内嵌时间展示。初始日期时间放在顶层 `defaultValue`，不要放在 `timePickerProps.defaultValue` 中。

### 日期语言的实例隔离

日期所有者读取本库全局 Locale/Provider，周起始日由各实例 `day-start-of-week` 管理。不切换宿主 Dayjs 默认语言，也不覆盖宿主基础语言配置；只在各库命名空间下注册日期语言元数据，组件实例与源码不跨库共享。

`value-format` 是稳定英文日期协议（包括月份名称 token），`format` 的显示及手输文本使用界面语言。切换语言不会改写模型，也不会令英文月份名称模型失效。默认数字协议、Date 对象、时间戳不变。中文核心语言与 Maple 内置语言数据已接入；其他日期格式优先使用已注册 Dayjs 语言数据，未加载的语言安全回退英文。

```demo
../example/demos/locale-isolation.vue
```

### 手输格式的边界

公共日期解析器按展示 `format` 严格解析，再以 `value-format` 序列化并执行原有禁用/范围校验。日期单值/范围字段已接入真实原生输入；默认允许手输，点击输入只编辑，日历按钮或 ArrowDown 打开面板，Enter/失焦提交。设置 `input-editable=false` 可仅使用面板；multiple 和函数 format 不提供文本逆解析，输入保持 readonly。`format` 为函数没有逆解析协议，应关闭 `input-editable` 并使用选择面板。Maple 暂无周/季度展示模式，不为保持解析逻辑同源而暴露无效类型。

### 手输与面板选择

```demo
../example/demos/text-entry.vue
```

移动日历按钮使用以下本地扩展变量：

| 变量 | 默认值 |
| --- | --- |
| `--mp-date-input-trigger-padding` | `0` |
| `--mp-date-input-trigger-outline-width` | `var(--mp-sys-space-1)` |
| `--mp-date-input-trigger-outline-color` | `var(--mp-sys-color-content-brand)` |
| `--mp-date-input-trigger-outline-offset` | `var(--mp-sys-space-1)` |

### 字段视口与快捷项事件

通过嵌套 `datePickerProps` / `dateRangePickerProps` 配置 pickerValue、defaultPickerValue 和快捷项；嵌套监听器会过滤，在字段组件上监听并回写嵌套视口。拒绝受控请求时保持原月份，导航不选择、不提交。有效快捷项仍按字段原确认策略进入草稿。

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| `update:picker-value` | 请求日历视口更新 | value: DateSelection |
| `picker-value-change` | 视口请求及展示通知 | value, date(s), formatted text(s) |
| `select-shortcut` | 接受的原快捷项对象 | shortcut: DateShortcut |

```demo
../example/demos/field-panel-tools.vue
```

### 展示模式只在根设置

`Date` / `DateRange` 和各自纯面板通过根 `presentation` 选择模式；默认 `picker`。字段的 `DatePickerOptions` / `DateRangePickerOptions` 已移除无效 `presentation`，JS 运行时也过滤，不能通过嵌套对象覆盖根模式。周起始、视口、快捷项和合法外观仍可嵌套配置。单值根支持 picker/calendar/calendarClock/calendarPicker，范围根支持 picker/calendar；Cedar 只有桌面日历，不提供这些空模式。

### 周起始日的响应式展示

`dayStartOfWeek` 更新时，日历表头与日期列位置同步更新，不改变选中值或提交草稿。纯面板使用根属性，字段通过 `datePickerProps` / `dateRangePickerProps` 配置；滚轮视图不使用星期列。

### 动态日期限制

更新或移除 `min` / `max` 只影响可选日期，不自动修改已有模型或草稿。日历的日/月/年导航状态根据当前视口和两端限制派生；移除一端限制只恢复对应方向，不释放另一端，也不触发选择或提交。
