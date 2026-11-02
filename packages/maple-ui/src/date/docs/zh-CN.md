# Date 日期

年份面板仅在内部滚动区域定位已选年份（无选中时定位当前年），不会滚动外层页面。定位在挂载完成后执行，并换算弹层缩放过渡中的布局坐标；卸载和停用取消待执行的定位。

展开时，原生 combobox 通过 `aria-controls` 关联当前实例的命名弹层；关闭后同步更新状态并移除关联。`aria-label`、`aria-describedby` 可传递给原生控件。自定义 selected/触发插槽需自行保留可访问名称、键盘操作和状态关联。

浮动面板按可视视口限制高度，不再固定为半屏。正常高度完整展示日历；横屏或矮窗口仅在内容确实放不下时滚动，确认操作保持可见。可用 `--mp-date-picker-popover-max-height` 限制面板最大高度（默认 `100dvh - 32px`）。品牌样式通过主题变量注入，切回默认／Maple 时移除品牌覆盖。

纯面板不接收 open/default-open、popup-container、placement、trigger-props、placeholder、variant、clearable。确认区由 disable-confirm 控制；actions 插槽提供 { confirm, disabled }。DatePicker/DateRangePicker 可以单独 app.use 安装，根入口和 date/date-range 子路径导出组件、Props、Instance、Type、Options、Emits；没有独立 date-picker/date-range-picker npm 子路径。

> 源码已并入 `date/`，安装父组件时一并注册。静态成员：`Date.Picker`。

## 基础示例

### 基本使用

```demo
../example/demos/basic-usage.vue
```

## 外观与日期展示

### 外观组合

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置           | 作用                                           | 相关示例                     |
| -------------- | ---------------------------------------------- | ---------------------------- |
| `value-format` | 模型格式、Date 或 timestamp                    | 外观组合、日期语言的实例隔离 |
| `placeholder`  | 占位符                                         | 表单控件尺寸对照、选择类型   |
| `disabled`     | 是否禁用                                       | 表单控件尺寸对照             |
| `readonly`     | 是否只读                                       | 表单控件尺寸对照             |
| `presentation` | 面板形态：`calendar` `picker` `calendarPicker` | 表单控件尺寸对照             |
| `size`         | 尺寸，可选值 `xs` `sm` `md` `lg` `xl`          | 表单控件尺寸对照             |

<!-- demo-config-notes:end -->

适用于选择单个日期。调整变体、尺寸，用相同数据观察变化。内容保持一致，便于比较不同设置的实际效果。

```demo
../example/demos/appearance-lab.vue
```

### 表单控件尺寸对照

切换五档 size 和三种字段变体，比较 Input、Button、Select、日期时间及其他单行表单控件的高度。Button 在这里固定使用 outline。DatePicker/TimePicker 是面板，此处使用带输入框的 Date/Time 字段。示例同时展示有值、可清空、标签删除与长标签多选；Select/Cascader 设置 tag-nowrap 时保持同档高度，长标签文字省略、删除图标保留；标签行可横向滚动，清空按钮和箭头固定在外侧。被省略的标签正文支持悬停、键盘聚焦或点按查看完整文字，点外部或按 Esc 关闭，不改变选中值。可清空后恢复选中值重复比较。多行文本和允许换行的多选内容按内容撑高。

```demo
../../field-decorator/example/demos/control-sizes.vue
```

### 日期值格式

两端使用独立复制的值、校验和提交逻辑。年、月、日模型默认格式为 `YYYY`、`YYYY-MM`、`YYYY-MM-DD`，日期时间默认包含秒；分钟精度设置 `time-fields="['hour', 'minute']"`。`format` 控制显示，`value-format` 控制模型，支持自定义格式、`Date` 与 `timestamp`。Maple 展示支持年/月/日及移动端日历和滚轮；周/季度面板仍是 Cedar 的展示能力。

### 介绍

表单日期字段。direct 使用锚定输入框的 popover；edit-mode="popup" / "dialog" 使用统一编辑外壳，关闭丢弃草稿，底部确认后写回模型。

### 选择类型

```demo
../example/demos/type.vue
```

### 月份标签

字段通过 `date-picker-props` / `date-range-picker-props` 配置面板选项。

`abbreviation`（boolean，默认 `true`）控制日历月份网格的缩写；`false` 使用当前 Locale 的完整月份名。运行时修改立即生效，不改变值，也不触发选择事件。此开关不影响星期标签、标题、滚轮列或值格式。范围日历以顶层选项为准，嵌套日历参数不能覆盖。

```demo
../example/demos/month-labels.vue
```

### 语言与嵌套日历参数

日期标签、标题和动作接入各库的全局 Locale 与既有 Provider。Cedar 删除日期组件级 `locale`，不保留覆盖字典或兼容别名。切换语言不会选择或提交日期。

### 日期语言的实例隔离

日期所有者读取本库全局 Locale/Provider，周起始日由各实例 `day-start-of-week` 管理。不切换宿主 Dayjs 默认语言，也不覆盖宿主基础语言配置；只在各库命名空间下注册日期语言元数据，组件实例与源码不跨库共享。

`value-format` 是稳定英文日期协议（包括月份名称 token），`format` 的显示及手输文本使用界面语言。切换语言不会改写模型，也不会令英文月份名称模型失效。默认数字协议、Date 对象、时间戳不变。中文核心语言与 Maple 内置语言数据已接入；其他日期格式优先使用已注册 Dayjs 语言数据，未加载的语言安全回退英文。

```demo
../example/demos/locale-isolation.vue
```

### 手输格式的边界

公共日期解析器按展示 `format` 严格解析，再以 `value-format` 序列化并执行原有禁用/范围校验。日期单值/范围字段已接入真实原生输入；默认允许手输，点击输入只编辑，日历按钮或 ArrowDown 打开面板，Enter/失焦提交。设置 `input-editable=false` 可仅使用面板；multiple 和函数 format 不提供文本逆解析，输入保持 readonly。`format` 为函数没有逆解析协议，应关闭 `input-editable` 并使用选择面板。Maple 暂无周/季度展示模式，不为保持解析逻辑同源而暴露无效类型。

## 时间与选择规则

### 内嵌时间与滚轮展示

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置             | 作用                                                   | 相关示例                             |
| ---------------- | ------------------------------------------------------ | ------------------------------------ |
| `value-format`   | 模型格式、Date 或 timestamp                            | 时区、夏令时与三种日历视图、日期时间 |
| `show-time`      | 是否选择时间                                           | 时区、夏令时与三种日历视图、日期时间 |
| `clearable`      | 是否可清除                                             | 多选、日期时间                       |
| `input-editable` | 是否允许手输；默认 true，函数 format/multiple 保持只读 | 时区、夏令时与三种日历视图           |
| `presentation`   | 面板形态：`calendar` `picker` `calendarPicker`         | 时区、夏令时与三种日历视图           |
| `min`            | 可选最小日期                                           | 时区、夏令时与三种日历视图           |

<!-- demo-config-notes:end -->

`picker-props` 使用 `DateWheelOptions`：`optionHeight`、`optionCount`、`class`、`style`，对单值/范围的日期和时间滚轮生效。不能覆盖内部生成的列、模型、工具条、字段映射或弹层状态。打开时间入口后明确展示时钟。

```demo
../example/demos/time-presentation.vue
```

### 真实端侧能力

Cedar 不公开 `Date.pickerProps`、`DateRange.pickerProps` 或 `DateRange.datePickerProps`：PC 字段不渲染移动滚轮或范围内部的移动日历插件，原无效参数已删除且无兼容别名。Maple 保留这些真实扩展，使用 DateWheelOptions 与 DateRangeCalendarOptions。两端通过 `Date.datePickerProps` / `DateRange.dateRangePickerProps` 配置完整面板，`timePickerProps` 配置内嵌时间展示。初始日期时间放在顶层 `defaultValue`，不要放在 `timePickerProps.defaultValue` 中。

### 时区、夏令时与三种日历视图

```demo
../example/demos/time-zone-views.vue
```

### 多选

```demo
../example/demos/multiple.vue
```

### 日期时间

```demo
../example/demos/date-time.vue
```

## 值模型与输入

### 模型格式与显示格式

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置             | 作用                                                   | 相关示例                                                               |
| ---------------- | ------------------------------------------------------ | ---------------------------------------------------------------------- |
| `format`         | 展示格式或格式化函数                                   | 模型格式与显示格式、字符串模型：年月日、年月与月日范围、手输与面板选择 |
| `value-format`   | 模型格式、Date 或 timestamp                            | 模型格式与显示格式、字符串模型：年月日、年月与月日范围                 |
| `type`           | 选择类型，可选值 `year` `month` `date`                 | 字符串模型：年月日、年月与月日范围                                     |
| `min`            | 可选最小日期                                           | 手输与面板选择                                                         |
| `max`            | 可选最大日期                                           | 手输与面板选择                                                         |
| `input-editable` | 是否允许手输；默认 true，函数 format/multiple 保持只读 | 手输与面板选择                                                         |

<!-- demo-config-notes:end -->

```demo
../example/demos/value-formats.vue
```

### 字符串模型：年月日、年月与月日范围

`format` 决定显示，`value-format` 决定提交值。下面直接得到 `"2026-09-10"`、`"2026-09"` 或 `["09-10", "10-10"]`，无需将 Date 再转换。日期范围使用数组。`MM-DD` 没有年份，解析时使用当前年，不能表示跨年先后或某个明确年份的 2 月 29 日；有跨年、时区或闰年要求时保留 `YYYY-MM-DD`，在业务提交时单独映射月日。默认仍是 page，未指定 timeZone 使用浏览器本地时区。

```demo
../example/demos/string-values.vue
```

### 手输与面板选择

```demo
../example/demos/text-entry.vue
```

移动日历按钮使用以下本地扩展变量：

| 变量                                     | 默认值                              |
| ---------------------------------------- | ----------------------------------- |
| `--mp-date-input-trigger-padding`        | `0`                                 |
| `--mp-date-input-trigger-outline-width`  | `var(--mp-sys-space-1)`             |
| `--mp-date-input-trigger-outline-color`  | `var(--mp-sys-color-content-brand)` |
| `--mp-date-input-trigger-outline-offset` | `var(--mp-sys-space-1)`             |

## 布局与排列

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

| Token                                        | Default                                                       |
| -------------------------------------------- | ------------------------------------------------------------- |
| `--mp-temporal-panel-inset`                  | `12px`                                                        |
| `--mp-temporal-panel-column-label-height`    | `36px`                                                        |
| `--mp-temporal-panel-column-label-font-size` | `13px`                                                        |
| `--mp-temporal-panel-radius`                 | `12px`                                                        |
| `--mp-temporal-panel-group-gap`              | `24px`                                                        |
| `--mp-temporal-panel-touch-height`           | `44px`                                                        |
| `--mp-temporal-panel-summary-background`     | `var(--mp-color-fill-1)`                                      |
| `--mp-temporal-panel-summary-height`         | `56px`                                                        |
| `--mp-temporal-panel-quick-time-width`       | `84px`                                                        |
| `--mp-temporal-panel-selection-background`   | `var(--mp-color-fill-2)`                                      |
| `--mp-temporal-panel-active-background`      | `color-mix(in srgb, var(--mp-color-primary) 8%, transparent)` |

单日期、单日期时间面板在独立面板、字段浮层和弹层中均不显示顶部摘要；日期时间的当前日期、时间和时钟／日历切换保留在底部。范围组件仍通过顶部摘要切换起止端。

# 时区与多月日历

`time-zone="Asia/Shanghai"` 使用 IANA 时区名。`Date`、毫秒时间戳表示真实时刻，切换时区只改变展示；字符串按目标时区的当地时间解释。`min`、`max`、手输、快捷项、事件和禁用规则使用相同协议；事件中的 `Date` 仍是真实时刻。未设置时保持浏览器本地时区行为。夏令时不存在的时间拒绝选择，重复出现的时间取第一次，非法时区禁止提交。

`interactive-mode` 支持 `page`（默认）、`scroll`、`line`。`scroll` 在 `min` / `max` 间展示多月，默认开启 `use-virtual-scroll`，只渲染视口附近月份；未提供边界时使用初始视口前后各一年。`line` 使用独立星期表头和一行日期，复用日历日期按钮的圆形选中态；标题显示本周起止日期，前后按钮按周切换。浏览和翻周不会提交表单；选择、取消、确认仍沿用 Maple 字段草稿机制。

这两个视图支持日精度日期与日期时间，日期时间继续使用原有快捷时间和详细时间滚轮；范围端点摘要、单端点锁定、反序反馈及确认／取消继续由原封装管理。年／月／周精度沿用原有面板。设置 `use-virtual-scroll="false"` 会渲染全部月份，大范围建议保持虚拟滚动。

布局可覆盖 `--mp-date-calendar-scroll-height`、`--mp-date-calendar-month-height`、`--mp-date-calendar-row-height` 和 `--mp-date-calendar-line-height`；月份使用固定六周网格。虚拟滚动要求月份等高，调整行高时同步调整月高度，避免内容溢出。颜色复用日历既有主题 token，支持 Alps / Firefly 亮暗主题。

## 内容与展示

### 日历模式

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置          | 作用                                                  | 相关示例                |
| ------------- | ----------------------------------------------------- | ----------------------- |
| `placeholder` | 占位符                                                | 日历模式、搭配 FormItem |
| `clearable`   | 是否可清除                                            | 日历模式、搭配 FormItem |
| `panel-type`  | 面板模式，可选值 `picker` `calendar` `calendarPicker` | 日历模式                |

<!-- demo-config-notes:end -->

```demo
../example/demos/calendar-mode.vue
```

### 搭配 FormItem

```demo
../example/demos/with-form-item.vue
```

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

| 属性              | 说明                                     | 默认值 |
| ----------------- | ---------------------------------------- | ------ |
| `show-current`    | 日历中高亮当前日/月/年，不产生选择或提交 | true   |
| `show-now-button` | 显示此刻按钮；多选不显示，范围更新当前端 | true   |

“此刻”按面板 type、时间精度与 value-format 生成候选，遵守 disabled/readonly、min/max、日期和时间禁用规则。点击只更新草稿，即使开启 disable-confirm，后续调整也需确认才提交；取消会丢弃草稿。日期、日期时间及其范围的独立面板与弹层行为一致，范围仅更新当前端，不交换。挂载或改变高亮均不写模型。旧 showNowBtn 名称已删除，不保留别名。

actions 插槽提供 `{ confirm, disabled, selectNow, nowDisabled }`。自定义按钮应调用这两个受保护动作，不应直接写模型。

日期范围与日期时间范围始终只修改当前端：手动选择和“此刻”均不交换起止值。起止倒置时保留草稿，在底部显示红色提示并禁用确认；修正后提示消失，仍需显式确认。取消弹层会恢复已确认值。日期边界、禁用日期／时间和锁定端点限制仍生效。时间范围组件保留“次日”逻辑。

## 独立日期面板

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

通过 `show-time` 开启日期+时间。字段通过 `panel-type`、独立 DatePicker 通过 `presentation` 选择内容形态：

- `calendar`：日历内容，带时间时使用相应的时间选择工具

- `calendarPicker`：底部左右按钮切换日历与时/分（秒）列
- `picker`：底部左右按钮切换年/月/日列与时/分（秒）列，编辑其中一部分会保留另一部分

```demo
../example/demos/picker-date-time.vue
```

## 交互与字段配置

### 交互状态对比

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置                | 作用                                                   | 相关示例                                               |
| ------------------- | ------------------------------------------------------ | ------------------------------------------------------ |
| `panel-type`        | 面板模式，可选值 `picker` `calendar` `calendarPicker`  | 受控关闭被拒绝、字段视口与快捷项事件、字段与嵌入式面板 |
| `disabled`          | 是否禁用                                               | 交互状态对比、统一字段与提交                           |
| `open`              | 弹层显隐受控                                           | 受控关闭被拒绝、透传配置边界与优先级                   |
| `input-editable`    | 是否允许手输；默认 true，函数 format/multiple 保持只读 | 字段视口与快捷项事件、复制与编辑                       |
| `date-picker-props` | 透传给 `mp-date-picker` 的属性                         | 字段视口与快捷项事件、字段与嵌入式面板                 |
| `placeholder`       | 占位符                                                 | 统一字段与提交、字段与嵌入式面板                       |

<!-- demo-config-notes:end -->

在同一实例上切换禁用、只读和错误状态后再操作控件，比较可编辑性和交互反馈。恢复开关位于目标控件外；错误外观本身不会执行校验。

<details>
<summary>配置说明与使用限制</summary>

#### 交互状态切换

适用于选择单个日期。调整禁用、只读、错误反馈，用相同数据观察变化。控制区始终可用，可以随时恢复编辑；错误外观本身不会触发表单校验。

</details>

```demo
../example/demos/state-lab.vue
```

### 受控关闭被拒绝

父级可以拒绝 `update:open(false)`，面板继续展开。同一选择重复确认不会再次提交或请求关闭；受控模型回写相同值不重置已确认状态。选择新日期后会开启新事务，可以再次确认。示例显示模型、提交次数和关闭请求次数。

```demo
../example/demos/rejected-close.vue
```

### 字段视口与快捷项事件

通过嵌套 `datePickerProps` / `dateRangePickerProps` 配置 pickerValue、defaultPickerValue 和快捷项；嵌套监听器会过滤，在字段组件上监听并回写嵌套视口。拒绝受控请求时保持原月份，导航不选择、不提交。有效快捷项仍按字段原确认策略进入草稿。

| 事件                  | 说明               | 参数                              |
| --------------------- | ------------------ | --------------------------------- |
| `update:picker-value` | 请求日历视口更新   | value: DateSelection              |
| `picker-value-change` | 视口请求及展示通知 | value, date(s), formatted text(s) |
| `select-shortcut`     | 接受的原快捷项对象 | shortcut: DateShortcut            |

```demo
../example/demos/field-panel-tools.vue
```

### 展示模式只在根设置

`Date` / `DateRange` 字段通过根 `panel-type` 选择内容，独立日期面板通过根 `presentation` 选择内容；独立面板内容默认 `calendarPicker`，不带时间时显示日历；字段的 popup 内容默认 `calendar`。字段的 `DatePickerOptions` / `DateRangePickerOptions` 已移除由根拥有的 `presentation`，JS 运行时也过滤，不能通过嵌套对象覆盖根模式。周起始、视口、快捷项和合法外观仍可嵌套配置。单值根支持 picker/calendar/calendarPicker，范围根支持 picker/calendar/calendarPicker；Cedar 只有桌面日历，不提供这些空模式。

### 周起始日的响应式展示

`dayStartOfWeek` 更新时，日历表头与日期列位置同步更新，不改变选中值或提交草稿。纯面板使用根属性，字段通过 `datePickerProps` / `dateRangePickerProps` 配置；滚轮视图不使用星期列。

### 动态日期限制

更新或移除 `min` / `max` 只影响可选日期，不自动修改已有模型或草稿。日历的日/月/年导航状态根据当前视口和两端限制派生；移除一端限制只恢复对应方向，不释放另一端，也不触发选择或提交。

### Form 字段展示与确认

本组件支持 `edit-mode`，字段 > FormItem > Form 逐层继承；未指定时为 `popup`，点击值区域打开编辑面板。支持值：`direct / popup`。非 direct 编辑模式通过字段值入口打开编辑面板，并维护单份草稿；确认后才更新 v-model，取消、重置或启用 readPretty 时丢弃草稿。

Maple 使用 edit-mode="popup" 点击值区域打开编辑面板；direct 直接编辑。 readPretty 为纯阅读属性，与 readonly、disabled 独立。

`before-commit(value, { previousValue, signal })` 可拦截弹层保存；FormItem 先校验候选值，失败保持编辑。`open / default-open / update:open` 控制编辑层。`#read="{ value, text }"` 可自定义阅读内容。集中示例见 Form 的“各类字段统一展示”。

日期／时间字段在 inline 下沿用原确认策略；在 popover/popup 中，内部纯面板隐藏确认工具栏，由编辑层提供唯一一组确认／取消。独立 DatePicker、DateRangePicker、TimePicker、TimeRangePicker 保留原有面板 API 和确认行为，不继承 Form 的字段展示。

移动端日期字段通过 `panel-type` 选择日历／滚轮内容；`edit-mode` 仅表示字段编辑方式。独立面板的内容形态以各自 API 为准，不由字段 edit-mode 控制。

### 统一字段与提交

Date / DateRange / Time / TimeRange 使用同源的 PickerField → FieldDecorator 字段层。Date/DateRange 默认允许手输（可关闭）；Time 是否手输由其 inputEditable 控制。面板编辑草稿，确认才写回，取消或外部关闭不改变值。清除立即写入空值并关闭面板，不恢复旧草稿。日期和时间范围显示两个独立输入位置，跨日时间保留“次日”提示。

```demo
../example/demos/field-protocol.vue
```

### 介绍

日期选择**面板**，可单独嵌入页面使用。本页聚合 DatePicker 示例，没有独立的 date-picker 文档路由。日期范围面板请参阅 [`DateRangePicker`](#/zh-CN/date-range) 所在的范围文档；表单字段请使用 [`Date`](#/zh-CN/date) / [`DateRange`](#/zh-CN/date-range)。

### 字段与嵌入式面板

字段负责输入与浮层，纯面板直接嵌入页面。day-start-of-week 统一为数字 0～6，0 为周日；范围日历也支持动态更新。嵌套 Options 只配置展示，不覆盖顶层值、格式、边界或禁用规则。

本例纯面板显式设置 `:disable-confirm="false"`：点击日期只修改草稿，“已提交”在确认后更新。切换周起点或移除边界不提交新值；恢复边界不会清除已有模型，超出新边界的草稿不能确认，请重新选择合法日期。

日历面板箭头的可访问名称跟随全局 Locale，局部 LocaleProvider 可以覆盖对应文案，缺少的导航键回退全局语言。日面板为上一月/下一月，月份面板为上一年/下一年，年份列表为上一组/下一组年份；按钮仍遵守日期边界，预览变化不等于提交日期。

```demo
../example/demos/entry-boundary.vue
```

### 透传配置边界与优先级

建议使用 `DatePopupOptions` 声明 popup-props；仅用于 inline 锚定弹层的允许展示/定位配置。open/defaultOpen、disabled/readonly、modelValue、值格式、日期规则及通知监听由字段管理，已有 datePresentationOptions 会过滤托管字段和 onXxx 监听。popup-container 顶层明确传入时优先（包括 false），否则回退 popupProps.popupContainer；popupClass 与内部类合并。trigger、closeOnClickReference、preventFocus、popupOffset 由字段展示层固定（偏移当前为 4）；Maple 还固定 unmountOnClose=true。新类型为两端共同的安全子集，不能设置这些固定项；Cedar 旧配置可透传的 unmountOnClose 不受本次影响。可使用 popupTranslate 定制附加平移。其他有效展示字段保持原透传。

本次仅新增可主动选用的专用类型，不收窄已发布的宽属性类型，不增加运行时过滤、不改变覆盖顺序；旧业务写法继续可编译。若直接使用旧宽属性，内部托管字段仍可能通过类型检查，但不代表能控制内部状态。

```ts
import type { DatePopupOptions } from '@maple-design/ui'
```

```demo
../example/demos/passthrough-options.vue
```

夏令时跳过的整小时或半小时会从时间候选中排除，仍然存在的分钟保持可选。新的当地时间选择遇到重复小时默认取第一次；已有 Date／时间戳即使位于第二次重复小时，切换时区展示、无修改确认以及编辑另一个范围端点都保留原始时刻和未显示的毫秒。字符串不携带重复小时的发生次数，如需保留明确时刻应使用 Date 或 timestamp。

### 复制与编辑

通过 open-trigger-target 独立控制打开区域；icon 模式下点击、聚焦和输入不会自动展开。input-editable / filterable 仍负责是否可编辑或搜索。右侧按钮、显式键盘展开和受控 open 可打开面板。

```demo
../example/demos/open-trigger-target.vue
```

### 共享字段加载

`loading` 控制共享字段加载状态；`loading-mode` 为 `default`（指示器）或 `line`（底部不定进度线），默认 `default`。渲染统一由 FieldDecorator 负责，不隐式改变 disabled/readonly；需要禁止编辑时单独设置。

## 阅读方向

组件继承最近的 `dir="ltr|rtl"`，支持运行时切换与局部方向覆盖。日历日期、月份、年份按阅读顺序排列，前后翻页图形随方向调整，日期值与起止顺序保持原义。分页网格中左右键按视觉方向移动焦点，上下键移动一行，Home/End 移至当前行首尾并跳过禁用项；焦点移动不提交，Enter/Space 沿用选值行为，边界停留在当前显示网格。快捷区 `shortcuts-position="left|right"` 保持物理侧，底部使用 `bottom`。弹层继承字段来源方向。

## API

### 空值识别与阅读空文案

`empty-values` 用于空值识别，`empty-value` 保留原清空输出；`empty-text` 仅在 `read-pretty` 空内容下展示，默认 `'-'`，字段 > FormItem > Form，自定义 read 插槽优先。显式配置 empty-values 后，内置 required 接入该策略，自定义校验仍收到原值。详见[统一说明](#/zh-CN/emptyValues)。

| 参数         | 类型               | 缺省与范围                                            |
| ------------ | ------------------ | ----------------------------------------------------- |
| empty-values | readonly unknown[] | 字段 > FormItem > Form > 组件族默认；完整覆盖，不合并 |
| empty-text   | string             | 字段 > FormItem > Form > '-'；显式 '' 有效            |

以上是字段展示层 API；纯面板不因此新增阅读模式。Form 与 FormItem 提供继承配置。empty-value 的现有类型与默认输出仍按该组件原 API 执行。

### 同源规则与事件

`DateValue = Date | string | number`。无效日期、不完整或逆序范围不能提交。min/max 包含边界，字符串按 value-format 解析，也可直接传 Date 或时间戳。确认时重新校验规则。`disabledTime` 返回 `disabledHours()`、`disabledMinutes(hour)`、`disabledSeconds(hour, minute)` 数字列表。纯面板通过校验后触发 `confirm(value, date(s), text(s))`；字段展开使用 `update:open` / `open-change`，不再使用 close。嵌套面板和弹层 props 只配置展示，不能覆盖顶层模型、规则与状态事件。范围 disabled 支持 `[起点禁用, 终点禁用]`，锁定端点不能被清除或修改。

### 属性

| 参数                  | 说明                                                                                                                                           | 类型                                               | 默认值                |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | --------------------- |
| `model-value`         | 受控值                                                                                                                                         | DateValue / DateValue[] (multiple/range)           | `undefined`           |
| `default-value`       | 非受控初始值，仅初始化读取                                                                                                                     | DateValue / DateValue[] (multiple/range)           | `undefined`           |
| `input-editable`      | 是否允许手输；默认 true，函数 format/multiple 保持只读                                                                                         | boolean                                            | true                  |
| `open-trigger-target` | 打开面板的点击区域：field 为整个字段，icon 仅右侧选择按钮。清除、移除等独立操作除外；不影响键盘展开和受控 open。                               | `'field' \| 'icon'`                                | `'field'`             |
| `format`              | 展示格式或格式化函数                                                                                                                           | string / (date: Date) => string                    | —                     |
| `value-format`        | 模型格式、Date 或 timestamp                                                                                                                    | string                                             | —                     |
| `disable-confirm`     | 选择后立即提交                                                                                                                                 | boolean                                            | 字段 false；面板 true |
| `open`                | 弹层显隐受控                                                                                                                                   | _boolean_                                          | `-`                   |
| `default-open`        | 非受控初始展开                                                                                                                                 | boolean                                            | false                 |
| `popup-container`     | 浮层挂载目标，顶层优先且支持 false                                                                                                             | string / HTMLElement / (() => HTMLElement) / false | —                     |
| `panel-type`          | 面板模式，可选值 `picker` `calendar` `calendarPicker`                                                                                          | _string_                                           | `calendar`            |
| `type`                | 选择类型，可选值 `year` `month` `date`                                                                                                         | _string_                                           | `date`                |
| `show-time`           | 是否选择时间                                                                                                                                   | _boolean_                                          | `false`               |
| `multiple`            | 是否多选                                                                                                                                       | _boolean_                                          | `false`               |
| `min`                 | 可选最小日期                                                                                                                                   | DateValue                                          | `-`                   |
| `max`                 | 可选最大日期                                                                                                                                   | DateValue                                          | `-`                   |
| `disabled-date`       | true 为禁用；side 为 start 或 end                                                                                                              | (date: Date, side: DateSide) => boolean            | —                     |
| `disabled-time`       | 当前日期和端点的禁用时分秒列表                                                                                                                 | (date: Date, side: DateSide) => DateDisabledTime   | —                     |
| `separator`           | 多选展示分隔符                                                                                                                                 | _string_                                           | `, `                  |
| `date-picker-props`   | 透传给 `mp-date-picker` 的属性                                                                                                                 | _DatePickerOptions_                                | `{}`                  |
| `popup-props`         | 可选的字段浮层展示配置，placement 默认 bottom-start；交给底层 Trigger 自动定位，可覆盖首选方位；不增加顶层 placement，不允许覆盖字段状态和规则 | _Partial\<PopupProps\>_                            | `{}`                  |
| `placeholder`         | 占位符                                                                                                                                         | _string_                                           | `-`                   |
| `clearable`           | 是否可清除                                                                                                                                     | _boolean_                                          | `true`                |
| `disabled`            | 是否禁用                                                                                                                                       | _boolean_                                          | `false`               |
| `readonly`            | 是否只读                                                                                                                                       | _boolean_                                          | `false`               |
| `size`                | 尺寸，可选值 `xs` `sm` `md` `lg` `xl`                                                                                                          | _ComponentSize_                                    | `md`                  |
| `variant`             | 风格，可选值 `filled` `standard` `outline`                                                                                                     | _string_                                           | `standard`            |

### 事件

| 事件名        | 说明                                   | 参数                              |
| ------------- | -------------------------------------- | --------------------------------- |
| `focus`       | 聚焦时触发                             | `-`                               |
| `blur`        | 失焦时触发                             | `-`                               |
| `click`       | 点击时触发                             | `event: Event`                    |
| `clear`       | 清除：单值为 undefined，多选/范围为 [] | —                                 |
| `open-change` | 展开状态改变                           | open: boolean                     |
| `change`      | 通过校验并正式提交                     | value, date(s), formatted text(s) |
| `select`      | 选择草稿，不代表已提交                 | value, date(s), formatted text(s) |

### 方法

| 方法名  | 说明 | 参数 | 返回值 |
| ------- | ---- | ---- | ------ |
| `focus` | 聚焦 | `-`  | `-`    |
| `blur`  | 失焦 | `-`  | `-`    |

### 插槽

| 插槽名        | 说明         | 参数                                 |
| ------------- | ------------ | ------------------------------------ |
| `selected`    | 选择区域内容 | `-`                                  |
| `prefix`      | 前缀         | `-`                                  |
| `clear-icon`  | 清除图标     | `clear: (e: Event) => void`          |
| `suffix`      | 后缀         | `-`                                  |
| `suffix-icon` | 箭头图标     | `focus: boolean, popupOpen: boolean` |

## 配置清空后的值

`empty-value` 指定当前组件已有清空动作的输出；省略时采用该组件默认返回。具体类型以组件 API 为准。它不改变 empty-values 的识别规则，也不改变 Form reset 的初始值。

## 滚轮可见字段

`date-fields` 与 `time-fields` 分别控制日期、时间滚轮列的显隐及顺序，两组不会交错排列。范围起止两端共用配置，字段与独立面板使用相同属性。

| 属性          | 类型                       | 默认值                   | 说明                                                        |
| ------------- | -------------------------- | ------------------------ | ----------------------------------------------------------- |
| `date-fields` | readonly DatePickerField[] | 按 type 生成年、月、日列 | 可选 year、month、day；只影响列式日期选择，不改变日历网格。 |
| `time-fields` | readonly TimePickerField[] | 时、分、秒               | 可选 hour、minute、second；也控制日历内的时间滚轮。         |

数组需非空、无重复，显式数组严格决定可见列与顺序；未传属性时采用默认列。两组字段各自校验，不能混用。隐藏字段保留已有值，编辑合并回完整草稿；更改字段配置不会提交主值。嵌套展示配置不能覆盖根属性。

Date/DateRange 的时间区域仅在 show-time 开启时生效。`format` 控制输入显示，`value-format` 控制保存格式，均不决定面板列。未指定格式时日期时间默认保存到秒；只需分钟字符串时，另行设置 format 与 value-format。隐藏年份仍使用完整草稿中的年份；仅保存 MM-DD 无法表达跨年范围，闰年和跨年业务应保存完整日期。

## DatePicker API

### 属性

| 参数                | 说明                                                    | 类型                                             | 默认值                |
| ------------------- | ------------------------------------------------------- | ------------------------------------------------ | --------------------- |
| `model-value`       | 受控值                                                  | DateValue / DateValue[] (multiple/range)         | `undefined`           |
| `default-value`     | 非受控初始值，仅初始化读取                              | DateValue / DateValue[] (multiple/range)         | `undefined`           |
| `format`            | 展示格式或格式化函数                                    | string / (date: Date) => string                  | —                     |
| `value-format`      | 模型格式、Date 或 timestamp                             | string                                           | —                     |
| `disable-confirm`   | 选择后立即提交                                          | boolean                                          | 字段 false；面板 true |
| `type`              | 选择器类型，可选值为 `date month year`                  | _string_                                         | `date`                |
| `presentation`      | 面板形态：`calendar` `picker` `calendarPicker`          | _string_                                         | `calendarPicker`      |
| `show-time`         | 是否选择时间                                            | _boolean_                                        | `false`               |
| `disabled-date`     | true 为禁用；side 为 start 或 end                       | (date: Date, side: DateSide) => boolean          | —                     |
| `disabled-time`     | 当前日期和端点的禁用时分秒列表                          | (date: Date, side: DateSide) => DateDisabledTime | —                     |
| `color`             | 选择器的颜色                                            | _string_                                         | `-`                   |
| `title-color`       | 标题背景色。如果未指定，将使用 `color` 属性或默认颜色。 | _string_                                         | `-`                   |
| `hint`              | 选择器提示语                                            | _string_                                         | `选择日期`            |
| `elevation`         | 海拔高度，可选值为 `true` `false` 和 `0-24` 的等级      | _number \| boolean_                              | `false`               |
| `button-elevation`  | Button 的海拔高度                                       | _string \| number \| boolean_                    | `true`                |
| `day-start-of-week` | 设置一周的第一天，从周日的 0 开始。                     | _DateWeekStart_                                  | `0`                   |
| `min`               | 允许的最小日期/月份（ISO 8601格式）                     | DateValue                                        | `-`                   |
| `max`               | 允许的最大日期/月份（ISO 8601格式）                     | DateValue                                        | `-`                   |
| `show-current`      | 是否显示当前日期                                        | _boolean_                                        | `true`                |
| `readonly`          | 是否只读                                                | _boolean_                                        | `false`               |
| `multiple`          | 是否支持选择多个日期                                    | _boolean_                                        | `false`               |
| `range`             | 是否支持选择一个范围                                    | _boolean_                                        | `false`               |
| `touchable`         | 是否支持拖动切换面板                                    | _boolean_                                        | `true`                |

### 事件

| 事件名    | 说明                   | 回调参数                                              |
| --------- | ---------------------- | ----------------------------------------------------- |
| `preview` | 日期切换时触发         | `year: number` <br>`month: number` <br>`day?: number` |
| `change`  | 通过校验并正式提交     | value, date(s), formatted text(s)                     |
| `select`  | 选择草稿，不代表已提交 | value, date(s), formatted text(s)                     |

### 插槽

`weekIndex` 表示一周的第 `n` 天，从周末的 `0` 开始

| 名称       | 说明               | 参数                                                                 |
| ---------- | ------------------ | -------------------------------------------------------------------- |
| `year`     | 自定义标题中的年   | `year: YYYY`                                                         |
| `month`    | 自定义标题中的月   | `year: YYYY` <br> `month: MM`                                        |
| `date`     | 自定义标题中的日期 | `year: YYYY` <br> `month: MM` <br> `date: DD` <br> `week: weekIndex` |
| `range`    | 自定义标题中的范围 | `choose: [startData, endDate]`                                       |
| `multiple` | 自定义标题中的多选 | `choose: ['YYYY-MM-DD' \| 'YYYY-MM']`                                |
| `actions`  | 自定义确认操作     | `{ confirm, disabled }`                                              |

### 样式变量

以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

| 变量名                                          | 默认值                                        |
| ----------------------------------------------- | --------------------------------------------- |
| `--mp-date-picker-border-radius`                | `4px`                                         |
| `--mp-date-picker-font-size`                    | `var(--mp-font-size-md)`                      |
| `--mp-date-picker-min-width`                    | `290px`                                       |
| `--mp-date-picker-main-color`                   | `rgba(0, 0, 0, .87)`                          |
| `--mp-date-picker-title-hint-color`             | `var(--mp-color-text-3)`                      |
| `--mp-date-picker-title-hint-font-size`         | `var(--mp-font-size-md)`                      |
| `--mp-date-picker-title-height`                 | `105px`                                       |
| `--mp-date-picker-title-padding`                | `16px`                                        |
| `--mp-date-picker-title-background`             | `var(--mp-date-picker-body-background-color)` |
| `--mp-date-picker-title-color`                  | `var(--mp-color-text-1)`                      |
| `--mp-date-picker-title-year-font-size`         | `var(--mp-font-size-md)`                      |
| `--mp-date-picker-title-year-font-weight`       | `500`                                         |
| `--mp-date-picker-title-year-margin-bottom`     | `8px`                                         |
| `--mp-date-picker-title-year-min-height`        | `21px`                                        |
| `--mp-date-picker-title-date-height`            | `48px`                                        |
| `--mp-date-picker-title-date-font-size`         | `34px`                                        |
| `--mp-date-picker-title-date-font-weight`       | `500`                                         |
| `--mp-date-picker-title-date-range-font-size`   | `20px`                                        |
| `--mp-date-picker-title-date-justify-content`   | `normal`                                      |
| `--mp-date-picker-header-arrow-filter`          | `opacity(0.54)`                               |
| `--mp-date-picker-body-background-color`        | `#fff`                                        |
| `--mp-date-picker-body-height`                  | `280px`                                       |
| `--mp-date-picker-body-padding`                 | `0`                                           |
| `--mp-date-picker-header-padding`               | `4px 16px`                                    |
| `--mp-date-picker-actions-padding`              | `0 8px 12px 8px`                              |
| `--mp-date-picker-header-color`                 | `#555`                                        |
| `--mp-month-picker-padding`                     | `0 12px`                                      |
| `--mp-month-picker-item-width`                  | `33%`                                         |
| `--mp-month-picker-item-height`                 | `56px`                                        |
| `--mp-month-picker-item-button-max-width`       | `140px`                                       |
| `--mp-year-picker-padding`                      | `0 12px`                                      |
| `--mp-year-picker-item-width`                   | `33%`                                         |
| `--mp-year-picker-item-height`                  | `56px`                                        |
| `--mp-year-picker-item-button-max-width`        | `140px`                                       |
| `--mp-day-picker-content-item-width`            | `14.28%`                                      |
| `--mp-day-picker-content-item-min-height`       | `21px`                                        |
| `--mp-day-picker-content-item-font-size`        | `var(--mp-font-size-sm)`                      |
| `--mp-day-picker-content-item-padding`          | `2px 0`                                       |
| `--mp-day-picker-content-item-button-width`     | `32px`                                        |
| `--mp-day-picker-content-item-button-height`    | `32px`                                        |
| `--mp-day-picker-content-item-button-font-size` | `var(--mp-font-size-sm)`                      |
| `--mp-day-picker-head-item-color`               | `rgba(0, 0, 0, 0.38)`                         |
| `--mp-day-picker-head-item-padding`             | `8px 0`                                       |
| `--mp-day-picker-head-item-font-weight`         | `600`                                         |

### 方位语义与配置入口

Date 字段默认从输入框下方 bottom-start 打开。需要时通过 popupProps.placement 覆盖首选方位，由底层 Trigger 定位；不是透传给 Popup 或 Popover。DatePicker 是独立日期面板，没有输入框锚点，不能把旧 date/picker 目录中的 placement 当成当前 DatePicker 的公开属性。
