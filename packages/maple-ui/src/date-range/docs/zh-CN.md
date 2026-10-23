# DateRange 日期范围

端点锁定由本地移动展示适配层响应式传给日历和滚轮；嵌套锁定与当前锁定合并，不会因切换展示或解锁另一端而丢失。共享草稿/确认所有者不依赖移动端注入，外部模型更新和确认/取消语义不变。

## 案例

### 日期值格式

两端使用独立复制的值、校验和提交逻辑。年、月、日模型默认格式为 `YYYY`、`YYYY-MM`、`YYYY-MM-DD`，日期时间默认包含秒；分钟精度设置 `:use-seconds="false"`。`format` 控制显示，`value-format` 控制模型，支持自定义格式、`Date` 与 `timestamp`。Maple 展示支持年/月/日及移动端日历和滚轮；周/季度面板仍是 Cedar 的展示能力。

### 介绍

表单日期范围**字段**，点击后底部弹出 DateRangePicker。范围面板示例聚合在本页下方，没有独立 date-range-picker 文档路由。交互与 `Date` 一致：取消丢弃草稿，确认后才写回 `v-model`。

- 默认使用日历面板；`panel-type="picker"` 使用列滚轮（年 / 月 / 日，由 `type` 决定）
- `panel-type="calendar"`：日历面板
- `show-time`：日历右侧提供每半小时一项的快捷时间 Picker，底部时钟按钮打开详细时间滚轮

### 基本使用

点击任一输入打开范围面板，点击顶部摘要选择要编辑的起点或终点，日历和滚轮只修改当前端点。确认后才提交草稿，起止输入之间的焦点移动不触发整个字段的 blur。

顶部摘要保留背景块分组，不增加起止提示文字；点击后高亮当前端点。摘要和底部视图按钮支持 Tab、Enter 和空格，通过 `aria-pressed` 表示选中状态。底部显示当前端点的日期和时间，时钟按钮切换到详细时间 Picker，日历按钮切回日期面板；切换不提交，取消恢复已提交值。

### 禁用

```demo
../example/demos/disabled.vue
```

### 受控关闭被拒绝

父级拒绝关闭时，范围面板会保留展开；同一选择重复确认不会再次提交或请求关闭，修改起止日期后则可以开启新的确认事务。日历模式通过顶部摘要选择编辑端点；等值的受控数组重新渲染不会清掉草稿。

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

日期时间范围的确认按钮左侧提供闪电入口，点击后显示中文快捷范围：今天、本周、最近15分钟、最近30分钟、最近1小时、最近24小时、最近7天、最近30天、最近90天、最近1年。今天、本周从相应起点到此刻，其他项为截至此刻的滚动区间，点击时重新计算。点击任一合法项仅更新草稿，点击确认后才提交并关闭弹层，仍遵守禁用、端点锁定及 `before-commit` 校验；再次点击闪电返回编辑，不改动草稿。

配置 `shortcuts` 时，快捷面板使用自定义项替换内置项；独立面板、字段浮层和 Popup 编辑层行为一致。“此刻”仅选择草稿，默认仍需确认，设置 `:show-now-button="false"` 可隐藏。

### 选择类型

```demo
../example/demos/type.vue
```

### 自定义分隔符

```demo
../example/demos/separator.vue
```

### 搭配 FormItem

```demo
../example/demos/with-form-item.vue
```

### 边界和端点禁用

移动端可单独调整结束端；确认后才回写范围模型，取消会丢弃草稿。示例仅允许九月，且结束端不能选周日。

```demo
../example/demos/boundaries.vue
```

### 端点锁定

双锁不拦截父级主动更新模型，但日期与确认保持禁用；外部更新后解锁起点，只恢复起点编辑，不自动提交。此时选择16并确认保留新终点22，不恢复旧终点15。

点击“外部改为18~22”直接更新父模型：未确认的旧草稿随之同步，锁定端以新模型为基准；外部更新不增加选择或确认次数。之后选择24并确认，只提交18~24，不恢复旧起点。

先编辑草稿再锁定该端，不代表授权草稿覆盖已提交端点：只要锁定端草稿与模型不同，确认保持不可用。解除锁定保留草稿并恢复确认，但本身不提交，仍需显式确认。

锁定端点始终保持原值。修改另一端导致起止倒置时，保留草稿并提示错误，禁止确认；修正后可正常确认。

本例显式设置 disable-confirm=false。仅一端锁定时，单次日期选择只编辑未锁端，不重新开始两次点击选范围；双锁时日期候选同步禁用语义，确认不可用。解除锁定恢复编辑，本身不提交。

使用 disabled=[起点锁定, 终点锁定] 保留已提交端点，只修改另一端草稿；确认后才回写模型。切换锁定本身不提交，两端都锁定时不能选择。此独立面板不提供弹层取消链。

```demo
../example/demos/endpoint-lock.vue
```

### 外观组合

适用于预订或查询的起止日期。调整变体、尺寸，用相同数据观察变化。内容保持一致，便于比较不同设置的实际效果。

```demo
../example/demos/appearance-lab.vue
```

### 交互状态切换

适用于预订或查询的起止日期。调整只读、错误反馈，用相同数据观察变化。控制区始终可用，可以随时恢复编辑；错误外观本身不会触发表单校验。

```demo
../example/demos/state-lab.vue
```

<!-- api-review:start -->
### 功能调试

```demo
../example/demos/api-review.vue
```

<!-- api-review:end -->

## API

日期范围与日期时间范围始终只修改当前选中的一端，手动选择和“此刻”均不交换起止值。起止倒置时保留草稿，在底部显示红色提示并禁用确认；切换顶部摘要修正任意一端后仍需确认。取消弹层会丢弃未确认草稿。独立面板、内嵌和弹层行为一致，并继续遵守日期边界、禁用日期／时间及端点锁定规则。

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
| `panel-type`            | 面板模式，可选值 `calendar` `picker`               | _string_                          | `calendar`   |
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

本例通过 `actions` 插槽调用 `confirm`，并把 `disabled` 绑定到提交按钮。选择草稿不更新“已提交”，确认后才写回；动态收紧边界不会清除已有模型，但不合法草稿不能提交，重新选择合法起止日期后可再次提交。

“禁用20日结束”动态改变 `disabled-date` 回调：先选10~20草稿，再启用禁用，提交不可用且已提交值不变；解除禁用只恢复确认资格，不自动提交。禁用只作用于结束端，不应误禁起点20日。

```demo
../example/demos/entry-boundary.vue
```

## DateRangePicker 日期范围面板
纯面板不接收 open/default-open、popup-container、placement、trigger-props、placeholder、variant、clearable。确认区由 disable-confirm 控制；actions 插槽提供 { confirm, disabled }。DatePicker/DateRangePicker 可以单独 app.use 安装，根入口和 date/date-range 子路径导出组件、Props、Instance、Type、Options、Emits；没有独立 date-picker/date-range-picker npm 子路径。


> 源码已并入 `date-range/`，安装父组件时一并注册。静态成员：`DateRange.Picker`。

### 介绍

日期范围选择**面板**，可单独嵌入页面使用。

顶部摘要左右展示起点和终点，使用统一浅色容器和选中色区分，不显示起止提示文字和箭头。点击摘要切换当前编辑端点并高亮，已有日期会定位到对应月份；未选端点保留当前视口。

- 默认 `calendarPicker`（`calendar` 同样适用）：日历采用单选状态，只高亮当前端点，不显示范围连线；启用 `show-time` 后，右侧同时显示每半小时一项的快捷时间 Picker。
- `presentation="picker"`：显示当前端点的日期列，年/月/日分别使用 1/2/3 列。
- 底部显示当前端点的提示和日期；有时间时，右侧显示时间及切换按钮。时钟按钮打开当前端点的详细时/分/秒滚轮，图标变为日历后可切回日期。
- 详细时间不含秒时 2 列，含秒时 3 列，列名保持统一。切换端点保留当前视图和另一端的值，切换视图不会自动取整时间或提交值。
- 纯日期范围不显示快捷时间和视图切换按钮。

表单字段：[`DateRange`](/zh-CN/date-range)。单日期面板：[`DatePicker`](/zh-CN/date-picker)。

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
| `presentation`      | 面板模式：`calendar` `picker` `calendarPicker` | _string_                      | `calendarPicker` |
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
| `--mp-date-range-picker-value-date-font-size`   | `var(--mp-sys-font-size-md)` |
| `--mp-date-range-picker-value-time-font-size`   | `22px`                                  |
| `--mp-date-range-picker-time-group-gap` | `24px` |
| `--mp-date-range-picker-time-group-radius` | `12px` |
| `--mp-date-range-picker-time-selection-background` | `var(--mp-color-fill-2)` |
| `--mp-date-range-picker-summary-background` | `var(--mp-temporal-panel-summary-background)` |
| `--mp-date-range-picker-summary-active-background` | `var(--mp-temporal-panel-summary-active-background)` |
| `--mp-date-range-picker-summary-touch-height` | `44px` |
| `--mp-date-range-picker-quick-time-width` | `var(--mp-temporal-panel-quick-time-width)` |
| `--mp-date-range-picker-column-label-height`    | `var(--mp-temporal-panel-column-label-height)` |
| `--mp-date-range-picker-column-label-font-size` | `var(--mp-temporal-panel-column-label-font-size)` |
| `--mp-date-range-picker-column-label-color`     | `var(--mp-color-text-3)`                   |
| `--mp-date-range-picker-border-radius`          | `var(--mp-date-picker-border-radius, 4px)` |
| `--mp-date-range-picker-background`             | `var(--mp-sys-color-surface-overlay)`                   |

### 快捷选项与日历视口

DateRangePicker 同样支持 shortcuts、shortcuts-position、preview-shortcut、picker-value/default-picker-value。范围视口包含两个日期，锁定端点不能被快捷项改变；预览不提交。事件为 update:picker-value、picker-value-change(value, dates, texts)、select-shortcut(shortcut)。详见 [Date 日期](../date/) 的快捷选项示例；DateRange 字段通过 date-range-picker-props 配置并转发事件。

### 当前端点选择

show-current 仅控制高亮。范围默认提供“此刻”，通过顶层 `show-now-button` 控制，只修改顶部当前选中的端点；起止倒置时显示红色提示并禁用确认，违反日期／时间禁用规则时禁用“此刻”。详见 Date 的当前日期与范围策略示例。

高亮统一由顶层 show-current 控制，嵌套 date-picker-props 不接受 showCurrent/showNowButton，避免无效或相互覆盖的设置。

## 月份标签

字段通过 `date-picker-props`（Date）或 `date-range-picker-props`（DateRange）配置面板的该选项。

`abbreviation`（boolean，默认 `true`）控制日历月份网格的缩写；`false` 使用当前 Locale 的完整月份名。运行时修改立即生效，不改变值，也不触发选择事件。此开关不影响星期标签、标题、滚轮列或值格式。范围日历以顶层选项为准，嵌套日历参数不能覆盖。

### 语言与嵌套日历参数

日期标签、标题和动作接入各库的全局 Locale 与既有 Provider。Cedar 删除日期组件级 `locale`，不保留覆盖字典或兼容别名。切换语言不会选择或提交日期。

`DateRangePicker.datePickerProps` 与 `DateRange.datePickerProps` 仅接受 `DateRangeCalendarOptions`：`hint`、`color`、`titleColor`、`buttonElevation`、`touchable`。值、校验、视口、presentation、elevation、abbreviation 和动作由范围顶层管理；运行时未知键及监听函数不向内部日历转发。日历分支明确使用日历展示。

字段外观与 `dateRangePickerProps.datePickerProps` 合并；空默认对象不再覆盖嵌套设置，字段显式传入的键优先。

### 内嵌时间与滚轮展示


### 真实端侧能力

Cedar 不公开 `Date.pickerProps`、`DateRange.pickerProps` 或 `DateRange.datePickerProps`：PC 字段不渲染移动滚轮或范围内部的移动日历插件，原无效参数已删除且无兼容别名。Maple 保留这些真实扩展，使用 DateWheelOptions 与 DateRangeCalendarOptions。两端通过 `Date.datePickerProps` / `DateRange.dateRangePickerProps` 配置完整面板。范围的时间滚轮使用 `picker-props` 配置，初始日期时间放在顶层 `defaultValue`。

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

`Date` / `DateRange` 字段通过根 `panel-type` 选择内容，纯面板通过根 `presentation` 选择内容；独立面板内容默认 `calendarPicker`，不带时间时显示日历；Date 和 DateRange 字段的 popup 内容默认 `calendar`。字段的 `DatePickerOptions` / `DateRangePickerOptions` 已移除无效 `presentation`，JS 运行时也过滤，不能通过嵌套对象覆盖根模式。周起始、视口、快捷项和合法外观仍可嵌套配置。单值根支持 picker/calendar/calendarPicker，范围根支持 picker/calendar；Cedar 只有桌面日历，不提供这些空模式。

### 周起始日的响应式展示

`dayStartOfWeek` 更新时，日历表头与日期列位置同步更新，不改变选中值或提交草稿。纯面板使用根属性，字段通过 `datePickerProps` / `dateRangePickerProps` 配置；滚轮视图不使用星期列。

### 动态日期限制

更新或移除 `min` / `max` 只影响可选日期，不自动修改已有模型或草稿。日历的日/月/年导航状态根据当前视口和两端限制派生；移除一端限制只恢复对应方向，不释放另一端，也不触发选择或提交。

### Form 字段展示与确认

本组件支持 `presentation`，字段 > FormItem > Form 逐层继承；未指定时为 `inline`，保留原有交互。支持值：`inline / popup`。其他编辑展示使用 Cell 入口和一份草稿，确认后才更新 v-model；取消、重置或启用 readPretty 丢弃草稿。

Maple 使用 presentation="popup" 点击值区域打开编辑面板；inline 直接编辑。 readPretty 为纯阅读属性，与 readonly、disabled 独立。

`before-commit(value, { previousValue, signal })` 可拦截弹层保存；FormItem 先校验候选值，失败保持编辑。`open / default-open / update:open` 控制编辑层。`#read="{ value, text }"` 可自定义阅读内容。集中示例见 Form 的“各类字段统一展示”。

日期／时间字段在 inline 下沿用原确认策略；在 popover/popup 中，内部纯面板隐藏确认工具栏，由编辑层提供唯一一组确认／取消。独立 DatePicker、DateRangePicker、TimePicker、TimeRangePicker 保留原有面板 API 和确认行为，不继承 Form 的字段展示。

移动端字段原日历／滚轮的选择迁至 `panel-type`，支持集合和缺省内容不变；`presentation` 仅表示字段展示。纯 Picker 的 `presentation` 仍表示面板内容。

### 范围面板的交互规则

移动端日历保留单月视图，翻月不修改选中范围；可从一个月选择起点，翻到另一个月选择终点。只有一个端点或起止倒置的草稿不能确认；完整且顺序合法后才可确认。取消恢复先前已提交值，锁定端点不能被改写。


### 范围中的禁用项

`disabled-date` 限制起止端点，范围可以跨过中间的禁用项；不会逐项扫描或自动截断范围。日期、月份、年份均采用此规则。中间禁用项保持灰色，翻页保留已选起点并清除悬浮预览；反向点选保留起止值，底部显示红色提示并禁用确认。

### 独立面板窄屏与组合布局

面板随容器宽度收缩；可切换快捷项位置及时间形式，检查导航、时间与确认操作。

```demo
../../date/example/demos/responsive-panels.vue
```

inline 日期字段使用日历面板，单日期与范围日历的基准宽度均为 265px。带时间的范围面板通过点击日期或时间切换内容，起止时间共用 4 列或 6 列滚轮。滚轮展示用于 popup 编辑层及独立 Picker 面板。

独立 DatePicker / DateRangePicker 与 inline 共用面板尺寸：单个日历基准宽度为 265px，带时间时宽屏左右布局、窄屏换行。独立面板保留自身的确认按钮和 actions 插槽，不继承 Form 的 presentation。

`read-pretty` 为独立布尔属性，与 `readonly`、`disabled` 同级；字段 > FormItem > Form 继承，显式 `false` 覆盖父级。默认 `false`。纯阅读不显示编辑器。

日期范围与日期时间范围的“此刻”仅更新当前端的草稿，不交换起止值。即使开启 `disable-confirm`，点击此刻后继续调整也仍需确认；取消会丢弃草稿。独立面板、inline 和弹层行为一致，起止倒置时显示红字提示并禁用确认。
