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

面板起止标题与日期/时间切换均为原生按钮，支持 Tab 聚焦及 Enter/空格激活，并通过 `aria-pressed` 表示当前编辑端或视图。重开可能保留上次激活端，编辑前可显式选择起点或终点；取消恢复已提交值，切换编辑端本身不提交。

### 受控关闭被拒绝

父级拒绝关闭时，范围面板会保留展开；同一选择重复确认不会再次提交或请求关闭，修改起止日期后则可以开启新的确认事务。日历模式下，第一次点击确定新起点、第二次点击确定终点；等值的受控数组重新渲染不会清掉第一次点击。

```demo
../example/demos/rejected-close.vue
```

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


字段使用两端独立同源的 PickerField → FieldDecorator。面板编辑草稿，确认才写回；取消或关闭不写回，清除立即提交空值并关闭。DateRange 默认允许手输，设置 `input-editable=false` 可只通过面板选择。四类字段的组合示例见 Date 文档“统一字段与提交”。

### 属性

| 参数                      | 说明                                               | 类型                              | 默认值     |
| ------------------------- | -------------------------------------------------- | --------------------------------- | ---------- |
| `model-value` | 受控值 | DateValue[] | `undefined` |
| `default-value` | 非受控初始值，仅初始化读取 | DateValue[] | `undefined` |
| `input-editable` | 是否允许手输；默认 true，函数 format/multiple 保持只读 | boolean | true |
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
| `date-picker-props`       | 范围内部日历外观（白名单）                | _DateRangeCalendarOptions_      | `{}`       |
| `picker-props`            | 透传给 `mp-picker`（picker）                       | _DateWheelOptions_          | `{}`       |
| `date-range-picker-props` | 透传给 `mp-date-range-picker`                      | _DateRangePickerOptions_ | `{}`       |
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

### 字段与嵌入式面板

字段负责输入与浮层，纯面板直接嵌入页面。day-start-of-week 统一为数字 0～6，0 为周日；范围日历也支持动态更新。嵌套 Options 只配置展示，不覆盖顶层值、格式、边界或禁用规则。

```demo
../example/demos/entry-boundary.vue
```

## DateRangePicker 日期范围面板
纯面板不接收 open/default-open、popup-container、placement、trigger-props、placeholder、variant、clearable。确认区由 disable-confirm 控制；actions 插槽提供 { confirm, disabled }。DatePicker/DateRangePicker 可以单独 app.use 安装，根入口和 date/date-range 子路径导出组件、Props、Instance、Type、Options、Emits；没有独立 date-picker/date-range-picker npm 子路径。


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
| `day-start-of-week` | 每周第一天；仅日历展示，整数 0～6 | _DateWeekStart_ | `0` |
| `show-time`         | 是否选择时间                                                   | _boolean_                     | `false`  |
| `use-seconds` | 默认时间精度，显式 format 优先 | boolean | true |
| `min`               | 可选最小日期                                                   | DateValue                      | `-`      |
| `max`               | 可选最大日期                                                   | DateValue                      | `-`      |
| `disabled-date` | true 为禁用；side 为 start 或 end | (date: Date, side: DateSide) => boolean | — |
| `disabled-time` | 当前日期和端点的禁用时分秒列表 | (date: Date, side: DateSide) => DateDisabledTime | — |
| `date-picker-props` | 范围内部日历外观（白名单）                       | _DateRangeCalendarOptions_  | `{}`     |
| `picker-props`      | 透传给 `mp-picker`（picker 模式）                              | _DateWheelOptions_      | `{}`     |
| `time-picker-props` | 透传给 `mp-time-picker`（calendar + show-time）                | _DateTimePickerOptions_  | `{}`     |
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

### 快捷选项与日历视口

DateRangePicker 同样支持 shortcuts、shortcuts-position、preview-shortcut、picker-value/default-picker-value。范围视口包含两个日期，锁定端点不能被快捷项改变；预览不提交。事件为 update:picker-value、picker-value-change(value, dates, texts)、select-shortcut(shortcut)。详见 [Date 日期](../date/) 的快捷选项示例；DateRange 字段通过 date-range-picker-props 配置并转发事件。

### 交互时间交换

exchange-time 默认 true，反序交互交换整个日期时间端点；false 只交换日期，保留起止时间位置。重排后继续检查端点规则和锁定端点；模型、手输与快捷项不自动重排。show-current 仅控制高亮，范围不提供 show-now-button。DateRange 字段通过 date-range-picker-props 配置。详见 Date 的当前日期与范围策略示例。

高亮统一由顶层 show-current 控制，嵌套 date-picker-props 不接受 showCurrent/showNowButton，避免无效或相互覆盖的设置。

## 月份标签

字段通过 `date-picker-props`（Date）或 `date-range-picker-props`（DateRange）配置面板的该选项。

`abbreviation`（boolean，默认 `true`）控制日历月份网格的缩写；`false` 使用当前 Locale 的完整月份名。运行时修改立即生效，不改变值，也不触发选择事件。此开关不影响星期标签、标题、滚轮列或值格式。范围日历以顶层选项为准，嵌套日历参数不能覆盖。

### 语言与嵌套日历参数

日期标签、标题和动作接入各库的全局 Locale 与既有 Provider。Cedar 删除日期组件级 `locale`，不保留覆盖字典或兼容别名。切换语言不会选择或提交日期。

`DateRangePicker.datePickerProps` 与 `DateRange.datePickerProps` 仅接受 `DateRangeCalendarOptions`：`hint`、`color`、`titleColor`、`buttonElevation`、`touchable`。值、校验、视口、presentation、elevation、abbreviation 和动作由范围顶层管理；运行时未知键及监听函数不向内部日历转发。日历分支明确使用日历展示。

字段外观与 `dateRangePickerProps.datePickerProps` 合并；空默认对象不再覆盖嵌套设置，字段显式传入的键优先。

### 内嵌时间与滚轮展示

`time-picker-props` 使用 `DateTimePickerOptions`：`use12Hours`、`step`、`hideDisabledOptions`、`class`、`style`。仅配置时间展示；日期值、格式/秒精度、约束和确认仍由日期所有者管理。`step` 负责展示采样，不静默修正外部值。未知参数及监听函数不转发。

`picker-props` 使用 `DateWheelOptions`：`optionHeight`、`optionCount`、`class`、`style`，对单值/范围的日期和时间滚轮生效。不能覆盖内部生成的列、模型、工具条、字段映射或弹层状态。`calendarClock` 打开时间入口后明确展示时钟。

### 真实端侧能力

Cedar 不公开 `Date.pickerProps`、`DateRange.pickerProps` 或 `DateRange.datePickerProps`：PC 字段不渲染移动滚轮或范围内部的移动日历插件，原无效参数已删除且无兼容别名。Maple 保留这些真实扩展，使用 DateWheelOptions 与 DateRangeCalendarOptions。两端通过 `Date.datePickerProps` / `DateRange.dateRangePickerProps` 配置完整面板，`timePickerProps` 配置内嵌时间展示。初始日期时间放在顶层 `defaultValue`，不要放在 `timePickerProps.defaultValue` 中。

### 日期语言的实例隔离

日期所有者读取本库全局 Locale/Provider，周起始日由各实例 `day-start-of-week` 管理。不切换宿主 Dayjs 默认语言，也不覆盖宿主基础语言配置；只在各库命名空间下注册日期语言元数据，组件实例与源码不跨库共享。

`value-format` 是稳定英文日期协议（包括月份名称 token），`format` 的显示及手输文本使用界面语言。切换语言不会改写模型，也不会令英文月份名称模型失效。默认数字协议、Date 对象、时间戳不变。中文核心语言与 Maple 内置语言数据已接入；其他日期格式优先使用已注册 Dayjs 语言数据，未加载的语言安全回退英文。

### 手输格式的边界

公共日期解析器按展示 `format` 严格解析，再以 `value-format` 序列化并执行原有禁用/范围校验。日期单值/范围字段已接入真实原生输入；默认允许手输，点击输入只编辑，日历按钮或 ArrowDown 打开面板，Enter/失焦提交。设置 `input-editable=false` 可仅使用面板；multiple 和函数 format 不提供文本逆解析，输入保持 readonly。`format` 为函数没有逆解析协议，应关闭 `input-editable` 并使用选择面板。Maple 暂无周/季度展示模式，不为保持解析逻辑同源而暴露无效类型。

### 手输与面板选择

```demo
../example/demos/text-entry.vue
```

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
