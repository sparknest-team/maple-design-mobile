# Date 日期

年份面板仅在内部滚动区域定位已选年份（无选中时定位当前年），不会滚动外层页面。定位在挂载完成后执行，并换算弹层缩放过渡中的布局坐标；卸载和停用取消待执行的定位。

展开时，原生 combobox 通过 `aria-controls` 关联当前实例的命名弹层；关闭后同步更新状态并移除关联。`aria-label`、`aria-describedby` 可传递给原生控件。自定义 selected/触发插槽需自行保留可访问名称、键盘操作和状态关联。

## 案例

### 基本使用

```demo
../example/demos/basic-usage.vue
```

### 禁用

```demo
../example/demos/disabled.vue
```

### 表单控件尺寸对照

切换五档 size 和三种字段变体，比较 Input、Button、Select、日期时间及其他单行表单控件的高度。Button 在这里固定使用 outline。DatePicker/TimePicker 是面板，此处使用带输入框的 Date/Time 字段。示例同时展示有值、可清空、标签删除与长标签多选；Select/Cascader 设置 tag-nowrap 时保持同档高度，长标签文字省略、删除图标保留；标签行可横向滚动，清空按钮和箭头固定在外侧。被省略的标签正文支持悬停、键盘聚焦或点按查看完整文字，点外部或按 Esc 关闭，不改变选中值。可清空后恢复选中值重复比较。多行文本和允许换行的多选内容按内容撑高。

```demo
../../field-decorator/example/demos/control-sizes.vue
```

### 日期值格式

两端使用独立复制的值、校验和提交逻辑。年、月、日模型默认格式为 `YYYY`、`YYYY-MM`、`YYYY-MM-DD`，日期时间默认包含秒；分钟精度设置 `:use-seconds="false"`。`format` 控制显示，`value-format` 控制模型，支持自定义格式、`Date` 与 `timestamp`。Maple 展示支持年/月/日及移动端日历和滚轮；周/季度面板仍是 Cedar 的展示能力。

### 介绍

表单日期字段。inline 使用锚定输入框的 popover；presentation="popup" / "dialog" 使用统一编辑外壳，关闭丢弃草稿，底部确认后写回模型。

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

### 搭配 FormItem

```demo
../example/demos/with-form-item.vue
```

### 模型格式与显示格式

```demo
../example/demos/value-formats.vue
```

### 外观组合

适用于选择单个日期。调整变体、尺寸，用相同数据观察变化。内容保持一致，便于比较不同设置的实际效果。

```demo
../example/demos/appearance-lab.vue
```

### 交互状态切换

适用于选择单个日期。调整禁用、只读、错误反馈，用相同数据观察变化。控制区始终可用，可以随时恢复编辑；错误外观本身不会触发表单校验。

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
| `panel-type`      | 面板模式，可选值 `picker` `calendar` `calendarPicker` | _string_                     | `calendar`   |
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

本例纯面板显式设置 `:disable-confirm="false"`：点击日期只修改草稿，“已提交”在确认后更新。切换周起点或移除边界不提交新值；恢复边界不会清除已有模型，超出新边界的草稿不能确认，请重新选择合法日期。

日历面板箭头的可访问名称跟随全局 Locale，局部 LocaleProvider 可以覆盖对应文案，缺少的导航键回退全局语言。日面板为上一月/下一月，月份面板为上一年/下一年，年份列表为上一组/下一组年份；按钮仍遵守日期边界，预览变化不等于提交日期。

```demo
../example/demos/entry-boundary.vue
```

## DatePicker 日期面板
纯面板不接收 open/default-open、popup-container、placement、trigger-props、placeholder、variant、clearable。确认区由 disable-confirm 控制；actions 插槽提供 { confirm, disabled }。DatePicker/DateRangePicker 可以单独 app.use 安装，根入口和 date/date-range 子路径导出组件、Props、Instance、Type、Options、Emits；没有独立 date-picker/date-range-picker npm 子路径。


> 源码已并入 `date/`，安装父组件时一并注册。静态成员：`Date.Picker`。

### 介绍

日期选择**面板**，可单独嵌入页面使用。本页聚合 DatePicker 示例，没有独立的 date-picker 文档路由。日期范围面板请参阅 [`DateRangePicker`](#/zh-CN/date-range) 所在的范围文档；表单字段请使用 [`Date`](#/zh-CN/date) / [`DateRange`](#/zh-CN/date-range)。

### 基本使用

```demo
../example/demos/picker-basic.vue
```

### 日历模式

独立面板和字段弹层默认使用日历；单值面板不显示顶部摘要。带时间时，日历右侧显示每半小时一项的快捷时间 Picker，底部显示当前日期、时间和一个时钟按钮。点击时钟打开详细时间 Picker，图标变为日历，点击可返回日期面板。设置 `presentation="picker"` 可显式使用日期列滚轮。

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

-：底部左右按钮切换日历与时钟
- `calendarPicker`：底部左右按钮切换日历与时/分（秒）列
- `picker`：底部左右按钮切换年/月/日列与时/分（秒）列，编辑其中一部分会保留另一部分

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
| `presentation`      | 面板形态：`calendar` `picker` `calendarPicker` | _string_                      | `calendarPicker`    |
| `show-time`         | 是否选择时间                                                   | _boolean_                     | `false`     |
| `use-seconds` | 默认时间精度，显式 format 优先 | boolean | true |
| `disabled-date` | true 为禁用；side 为 start 或 end | (date: Date, side: DateSide) => boolean | — |
| `disabled-time` | 当前日期和端点的禁用时分秒列表 | (date: Date, side: DateSide) => DateDisabledTime | — |
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
| `--mp-date-picker-title-hint-color` | `var(--mp-color-text-3)` |
| `--mp-date-picker-title-hint-font-size`         | `var(--mp-font-size-md)`  |
| `--mp-date-picker-title-height`                 | `105px`                |
| `--mp-date-picker-title-padding`                | `16px`                 |
| `--mp-date-picker-title-background` | `var(--mp-date-picker-body-background-color)` |
| `--mp-date-picker-title-color` | `var(--mp-color-text-1)` |
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

`picker-value` 管理日历视口，不是选中值；`default-picker-value` 仅初始化读取。范围视口为两个日期。导航发出 `update:picker-value` 和 `picker-value-change(value, dates, texts)`，不触发 `change` 或 `select`；受控更新不被接纳时保留原视口。`select-shortcut(shortcut)` 仅在快捷项通过校验并被接受后触发。移动端滚轮展示不提供日历月份导航。字段通过 `date-picker-props` 配置这些选项，转发上述三个事件。

### 当前日期与范围策略

```demo
../example/demos/current-range.vue
```

| 属性 | 说明 | 默认值 |
| --- | --- | --- |
| `show-current` | 日历中高亮当前日/月/年，不产生选择或提交 | true |
| `show-now-button` | 显示此刻按钮；多选不显示，范围更新当前端 | true |

“此刻”按面板 type、时间精度与 value-format 生成候选，遵守 disabled/readonly、min/max、日期和时间禁用规则。点击只更新草稿，即使开启 disable-confirm，后续调整也需确认才提交；取消会丢弃草稿。日期、日期时间及其范围的独立面板与弹层行为一致，范围仅更新当前端，不交换。挂载或改变高亮均不写模型。旧 showNowBtn 名称已删除，不保留别名。

actions 插槽提供 `{ confirm, disabled, selectNow, nowDisabled }`。自定义按钮应调用这两个受保护动作，不应直接写模型。

日期范围与日期时间范围始终只修改当前端：手动选择和“此刻”均不交换起止值。起止倒置时保留草稿，在底部显示红色提示并禁用确认；修正后提示消失，仍需显式确认。取消弹层会恢复已确认值。日期边界、禁用日期／时间和锁定端点限制仍生效。时间范围组件保留“次日”逻辑。

## 月份标签

字段通过 `date-picker-props` / `date-range-picker-props` 配置面板选项。

`abbreviation`（boolean，默认 `true`）控制日历月份网格的缩写；`false` 使用当前 Locale 的完整月份名。运行时修改立即生效，不改变值，也不触发选择事件。此开关不影响星期标签、标题、滚轮列或值格式。范围日历以顶层选项为准，嵌套日历参数不能覆盖。

```demo
../example/demos/month-labels.vue
```

### 语言与嵌套日历参数

日期标签、标题和动作接入各库的全局 Locale 与既有 Provider。Cedar 删除日期组件级 `locale`，不保留覆盖字典或兼容别名。切换语言不会选择或提交日期。

### 内嵌时间与滚轮展示


`picker-props` 使用 `DateWheelOptions`：`optionHeight`、`optionCount`、`class`、`style`，对单值/范围的日期和时间滚轮生效。不能覆盖内部生成的列、模型、工具条、字段映射或弹层状态。打开时间入口后明确展示时钟。

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

`Date` / `DateRange` 字段通过根 `panel-type` 选择内容，纯面板通过根 `presentation` 选择内容；独立面板内容默认 `calendarPicker`，不带时间时显示日历；字段的 popup 内容默认 `calendar`。字段的 `DatePickerOptions` / `DateRangePickerOptions` 已移除无效 `presentation`，JS 运行时也过滤，不能通过嵌套对象覆盖根模式。周起始、视口、快捷项和合法外观仍可嵌套配置。单值根支持 picker/calendar/calendarPicker，范围根支持 picker/calendar；Cedar 只有桌面日历，不提供这些空模式。

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

### 独立面板窄屏与组合布局

面板随容器宽度收缩；可切换快捷项位置及时间形式，检查导航、时间与确认操作。

```demo
../example/demos/responsive-panels.vue
```

### 编辑容器与面板复用

DatePicker / DateRangePicker 独立使用时自带表面背景和操作区；actions 插槽替换整个默认操作区。嵌入 Form 的弹层时，统一外壳负责标题、关闭与底部确认，日期面板只贡献此刻等辅助操作，避免重复确认。关闭放弃草稿，确认失败仍保留草稿。


独立 DatePicker / DateRangePicker 与 inline 共用面板尺寸：单个日历基准宽度为 265px，带时间时宽屏左右布局、窄屏换行。独立面板保留自身的确认按钮和 actions 插槽，不继承 Form 的 presentation。

`read-pretty` 为独立布尔属性，与 `readonly`、`disabled` 同级；字段 > FormItem > Form 继承，显式 `false` 覆盖父级。默认 `false`。纯阅读不显示编辑器。


### 移动端统一面板

单值面板不显示顶部摘要；范围摘要保留浅灰底槽和白色当前项，点击起止摘要切换编辑对象。

摘要下方不再重复显示提示和年份。点击日历中间带下拉图标的年月标题，依次进入月份、年份选择；通过底部日历按钮返回日期面板。年月标题和底部按钮支持键盘操作，切换视图不会提交值。

共享样式变量：

| Token | Default |
| --- | --- |
| `--mp-temporal-panel-inset` | `12px` |
| `--mp-temporal-panel-column-label-height` | `36px` |
| `--mp-temporal-panel-column-label-font-size` | `13px` |
| `--mp-temporal-panel-radius` | `12px` |
| `--mp-temporal-panel-group-gap` | `24px` |
| `--mp-temporal-panel-touch-height` | `44px` |
| `--mp-temporal-panel-summary-background` | `var(--mp-color-fill-1)` |
| `--mp-temporal-panel-summary-height` | `56px` |
| `--mp-temporal-panel-quick-time-width` | `84px` |
| `--mp-temporal-panel-selection-background` | `var(--mp-color-fill-2)` |
| `--mp-temporal-panel-active-background` | `color-mix(in srgb, var(--mp-color-primary) 8%, transparent)` |

单日期、单日期时间面板在独立面板、字段浮层和弹层中均不显示顶部摘要；日期时间的当前日期、时间和时钟／日历切换保留在底部。范围组件仍通过顶部摘要切换起止端。
