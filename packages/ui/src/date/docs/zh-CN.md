# Date 日期

年份面板仅在内部滚动区域定位已选年份（无选中时定位当前年），不会滚动外层页面。定位在挂载完成后执行，并换算弹层缩放过渡中的布局坐标；卸载和停用取消待执行的定位。

展开时，原生 combobox 通过 `aria-controls` 关联当前实例的命名弹层；关闭后同步更新状态并移除关联。`aria-label`、`aria-describedby` 可传递给原生控件。自定义 selected/触发插槽需自行保留可访问名称、键盘操作和状态关联。

浮动面板按可视视口限制高度。正常高度完整展示日历；横屏或矮窗口仅在内容确实放不下时滚动，确认操作保持可见。可用 `--mp-date-picker-popover-max-height` 限制面板最大高度（默认 `100dvh - 32px`）。品牌样式通过主题变量注入，切回默认／Maple 时移除品牌覆盖。

纯面板不接收 open/default-open、popup-container、placement、trigger-props、placeholder、variant、clearable。确认区由 disable-confirm 控制；actions 插槽提供 { confirm, disabled }。DatePicker/DateRangePicker 可以单独 app.use 安装，根入口和 date/date-range 子路径导出组件、Props、Instance、Type、Options、Emits；没有独立 date-picker/date-range-picker npm 子路径。

安装 Date 时会一并注册 DatePicker，也可通过静态成员 `Date.Picker` 使用。

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

年、月、日模型默认格式为 `YYYY`、`YYYY-MM`、`YYYY-MM-DD`，日期时间默认包含秒；分钟精度设置 `time-fields="['hour', 'minute']"`。`format` 控制显示，`value-format` 控制模型，支持自定义格式、`Date` 与 `timestamp`。Maple 提供年/月/日面板和移动端日历、滚轮；周/季度面板仅由 Cedar 提供。

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

日期标签、标题和操作按钮的语言由全局 Locale 和 Provider 配置。切换语言不会选择或提交日期。

### 日期语言的实例隔离

日期组件使用当前库的 Locale/Provider 配置，周起始日由各实例的 `day-start-of-week` 控制，不会修改应用中 Dayjs 的默认语言或基础语言配置。

`value-format` 是稳定英文日期协议（包括月份名称 token），`format` 的显示及手输文本使用界面语言。切换语言不会改写模型，也不会令英文月份名称模型失效。默认数字协议、Date 对象、时间戳不变。中文核心语言与 Maple 内置语言数据已接入；其他日期格式优先使用已注册 Dayjs 语言数据，未加载的语言安全回退英文。

```demo
../example/demos/locale-isolation.vue
```

### 手输格式的边界

日期输入按 `format` 严格解析，再按 `value-format` 输出，并校验禁用规则及范围。默认允许手输，点击输入编辑，日历按钮或 ArrowDown 打开面板，Enter / 失焦提交。设置 `input-editable=false` 可仅通过面板选择。multiple 模式或函数 format 不支持文本逆解析，输入保持只读；函数 format 应配合关闭 `input-editable` 使用。Maple 不提供周/季度展示模式。

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

Cedar 字段使用桌面日历，通过 `date-picker-props` 或 `date-range-picker-props` 配置面板。Maple 使用 DateWheelOptions 与 DateRangeCalendarOptions 配置滚轮和范围内嵌日历。两端通过 `Date.datePickerProps` / `DateRange.dateRangePickerProps` 配置完整面板；Cedar 使用 `timePickerProps` 配置内嵌时间展示，Maple 使用 `pickerProps` 配置滚轮。初始日期时间放在顶层 `defaultValue`。

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
| `--mp-date-input-trigger-outline-color`  | `var(--mp-sys-color-action-primary)` |
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

### 面板操作

单值面板不显示顶部摘要；范围摘要保留浅灰底槽和白色当前项，点击起止摘要切换编辑对象。

点击日历中间带下拉图标的年月标题，依次进入月份、年份选择；通过底部日历按钮返回日期面板。年月标题和底部按钮支持键盘操作，切换视图不会提交值。


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

“此刻”按面板 type、时间精度与 value-format 生成候选，遵守 disabled/readonly、min/max、日期和时间禁用规则。点击只更新草稿，即使开启 disable-confirm，后续调整也需确认才提交；取消会丢弃草稿。日期、日期时间及其范围的独立面板与弹层行为一致，范围仅更新当前端，不交换。挂载或改变高亮均不写模型。

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

`Date` / `DateRange` 字段通过根 `panel-type` 选择内容，独立日期面板通过根 `presentation` 选择内容；独立面板内容默认 `calendarPicker`，不带时间时显示日历；字段的 popup 内容默认 `calendar`。`DatePickerOptions` / `DateRangePickerOptions` 不能覆盖根组件选择的面板模式。周起始、视口、快捷项和合法外观仍可嵌套配置。单值根支持 picker/calendar/calendarPicker，范围根支持 picker/calendar/calendarPicker；Cedar 只有桌面日历，不提供这些空模式。

### 周起始日的响应式展示

`dayStartOfWeek` 更新时，日历表头与日期列位置同步更新，不改变选中值或提交草稿。纯面板使用根属性，字段通过 `datePickerProps` / `dateRangePickerProps` 配置；滚轮视图不使用星期列。

### 动态日期限制

更新或移除 `min` / `max` 只影响可选日期，不自动修改已有模型或草稿。日历的日/月/年导航状态根据当前视口和两端限制派生；移除一端限制只恢复对应方向，不释放另一端，也不触发选择或提交。

### 编辑与确认

本组件支持 `edit-mode`，字段 > FormItem > Form 逐层继承；未指定时为 `popup`，点击值区域打开编辑面板。支持值：`direct / popup`。非 direct 编辑模式通过字段值入口打开编辑面板，并维护单份草稿；确认后才更新 v-model，取消、重置或启用 readPretty 时丢弃草稿。

Maple 使用 edit-mode="popup" 点击值区域打开编辑面板；direct 直接编辑。 readPretty 为纯阅读属性，与 readonly、disabled 独立。

`before-commit(payload, done, context)` 可拦截弹层保存；FormItem 先校验候选值，失败保持编辑。`open / default-open / update:open` 控制编辑层。`#read="{ value, text }"` 可自定义阅读内容。集中示例见 Form 的“各类字段统一展示”。

日期／时间字段在 inline 下沿用原确认策略；在 popover/popup 中，内部纯面板隐藏确认工具栏，由编辑层提供唯一一组确认／取消。独立 DatePicker、DateRangePicker、TimePicker、TimeRangePicker 保留原有面板 API 和确认行为，不继承 Form 的字段展示。

移动端日期字段通过 `panel-type` 选择日历／滚轮内容；`edit-mode` 仅表示字段编辑方式。独立面板的内容形态以各自 API 为准，不由字段 edit-mode 控制。

### 统一字段与提交

Date / DateRange 默认允许手输，可通过 input-editable 关闭；Time 是否手输由 inputEditable 控制。面板编辑草稿，确认才写回，取消或外部关闭不改变值。清除立即提交空值并关闭面板。日期和时间范围分别显示两个输入位置，跨日时间保留“次日”提示。

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

使用 `DatePopupOptions` 配置 `popup-props`，调整锚定弹层的外观和定位。open/defaultOpen、disabled/readonly、modelValue、值格式、日期规则及通知监听由字段管理，组件会过滤由字段管理的配置和通知监听器。popup-container 顶层明确传入时优先（包括 false），否则回退 popupProps.popupContainer；popupClass 与内部类合并。trigger、closeOnClickReference、preventFocus、popupOffset 由字段展示层固定（偏移当前为 4）；Maple 还固定 unmountOnClose=true。这些固定项由字段管理；Cedar 的 `unmountOnClose` 可通过现有浮层配置设置。可使用 popupTranslate 定制附加平移。其他有效展示字段保持原透传。

建议使用本页列出的专用配置类型；展开状态、模型和事件由组件管理，不能通过嵌套配置接管。

```ts
import type { DatePopupOptions } from '@maple-design/ui-vue'
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

## 触发与定位

### 弹层定位

Date 字段默认从输入框下方 bottom-start 打开。需要时通过 popupProps.placement 覆盖首选方位，由底层 Trigger 定位；不是透传给 Popup 或 Popover。DatePicker 是独立日期面板，没有输入框锚点；弹层位置通过 Date 字段配置。

公共 focus/blur 从首次挂载即可调用。focus 会打开可编辑的延迟编辑器，等待其就绪后定位；禁用、只读或纯阅读时不因此打开。blur 只失焦当前目标，不重新打开。保存的方法不会绑定旧编辑器，关闭、切换模式、停用或卸载会取消排队调用。

## 使用说明

### 面板配置

DatePicker 与 DateRangePicker 用于独立日期选择。通过 `show-current` 控制当前日期高亮，使用 `picker-value` 或 `default-picker-value` 设置面板显示的日期。

控制当前日期高亮使用 showCurrent，选择当前按钮使用 showNowButton；定位面板视口使用 pickerValue 或 defaultPickerValue，约束可选值使用 min、max 和 disabledDate。已有的列字段、缩写、滚轮配置、外观和真实面板功能继续保留。loading-icon 没有接通到该面板或日期字段的公共插槽，不列为可用能力。


<!-- date-contract:start -->

### 值与格式

DateValue 为 string、number 或原生 Date。数值按时间戳处理，0 不按空值处理；modelValue=null 是显式空值。范围使用宽数组并允许不完整端点，不把现有协议强制改成二元组；提交仍校验完整性与合法性。Maple 通用 DatePicker/Date 的多选能力不扩展到 Cedar 单值 Props。

属性表列出实际公开集合；继承及按精度说明表示有效缺省，原始 Props 可为 undefined。format 控制显示与手输，valueFormat 控制模型协议。week/quarter 的显示标签与模型格式不同；函数 format 无反向解析，不能据此开启手输。

min/max 包含端点；非法的已提供边界阻止确认，不静默当作未设置。动态收紧规则不清空已有业务模型。disabledDate/disabledTime 是明确校验回调，不是异步事件任务，时间禁用回调返回 DateDisabledTime 的禁用列表。

### Date Slots / Methods

字段 default 可替换触发区；prefix/selected/suffix 替换相应内容，范围还支持 separator。替换原生控件时保留名称、起止区别及键盘入口。read 接收 { value, text }，suffix-icon 接收 { focus, popupOpen }，clear-icon 接收受保护的 clear(event?)；不直接绕过 emptyValue 或禁用/只读守卫。

actions 的参数为 { confirm, disabled, selectNow, nowDisabled }，两个动作返回 void；没有时间面板的 canConfirm/value 参数。disabled=true 时不能确认。独立面板可以替换整块操作区；托管编辑的最终保存由外层编辑壳负责，面板只贡献辅助操作，不把其 confirm 当作外层保存方法。

此刻能力按面板定义：Cedar 单值面板支持，Cedar 范围面板没有此刻入口；Maple 范围面板对当前端暂存此刻，另一端保留并仍需确认。不要只因 scope 中存在 selectNow 就假定所有模式都支持此刻。

Cedar cell 定制日历格，参数含 date，范围另含 type=start/end；extra 是附加内容。Maple Date/DatePicker 在 page 日历摘要中支持 year({year})、month({year,month})、date({week,year,month,date})、range({choose})、multiple({choose})；后两者按实际模式使用。Maple DateRange/DateRangePicker 不转发这些单值摘要槽，scroll/line 视口也不承诺摘要槽。

loading-icon 尚未接通到日期字段或纯面板，不因底层装饰器支持而列为可用槽。字段 focus(index?)、blur() 委托真实控件；Cedar/直接字段 blur 会关闭字段浮层，Maple 范围持久 reference 的 blur 只清其焦点，不冒充外层 Drawer 关闭。纯面板没有公开 focus/blur 方法。

### 展示配置与日期范围

datePickerProps/dateRangePickerProps 只配置展示，不能覆盖根模型、规则、类型或控制事件；Maple 范围内部 datePickerProps 另用日历白名单。popupProps 保留宽字典入口，推荐公开 DatePopupOptions/DateRangePopupOptions，运行时仍过滤所有者字段。Cedar timePickerProps 只配置内嵌时间展示；Maple 使用 pickerProps 配置滚轮。

范围 placeholder 字符串重复用于两端，数组分别指定起止且缺项为空；readonly 与 disabled 分开，未设置字段值时继承表单。Cedar 范围面板 exchangeTime 只处理交互候选反序：true 连时间交换，false 保留端点时间；不会重排外部模型、手输或快捷值。Maple 未公开该属性。

## API

### 空值识别与阅读空文案

`empty-values` 用于空值识别，`empty-value` 保留原清空输出；`empty-text` 仅在 `read-pretty` 空内容下展示，默认 `'-'`，字段 > FormItem > Form，自定义 read 插槽优先。显式配置 empty-values 后，内置 required 接入该策略，自定义校验仍收到原值。详见[统一说明](#/zh-CN/emptyValues)。

| 参数         | 类型               | 缺省与范围                                            |
| ------------ | ------------------ | ----------------------------------------------------- |
| empty-values | readonly unknown[] | 字段 > FormItem > Form > 组件族默认；完整覆盖，不合并 |
| empty-text   | string             | 字段 > FormItem > Form > '-'；显式 '' 有效            |

以上是字段展示层 API；纯面板不因此新增阅读模式。Form 与 FormItem 提供继承配置。empty-value 的现有类型与默认输出仍按该组件原 API 执行。

### 值与事件

`DateValue = Date | string | number`。无效日期、不完整或逆序范围不能提交。min/max 包含边界，字符串按 value-format 解析，也可直接传 Date 或时间戳。确认时重新校验规则。`disabledTime` 返回 `disabledHours()`、`disabledMinutes(hour)`、`disabledSeconds(hour, minute)` 数字列表。纯面板通过校验后触发 `confirm(value, date(s), text(s))`；字段展开使用 `update:open` / `open-change`。嵌套面板和弹层 props 只配置展示，不能覆盖顶层模型、规则与状态事件。范围 disabled 支持 `[起点禁用, 终点禁用]`，锁定端点不能被清除或修改。

### Date Props

| 参数 | 说明 | 类型 | 缺省说明 |
| --- | --- | --- | --- |
| `before-commit` | 显式字段保存守卫，使用 payload、done、context | `BeforeFieldCommit` | `undefined` |
| `blur-color` | 失焦时的颜色 | `string` | 主题缺省 |
| `clearable` | 允许清除；不会绕过禁用、只读或等待状态 | `boolean` | `true` |
| `date-fields` | 日期滚轮列及顺序；显式列表决定可见列 | `readonly DatePickerField[]`<br>`DatePickerField: 'month' \| 'year' \| 'day'` | 按精度推导 |
| `date-picker-props` | 日期面板展示选项，根拥有模型、规则和类型 | `DatePickerOptions` | `{}` |
| `default-open` | 非受控初始开关，仅创建时读取 | `boolean` | `false` |
| `default-value` | 非受控初始值，仅创建时读取 | `DateValue \| DateValue[]` | `undefined` |
| `disable-confirm` | 选择后立即提交；false 保留草稿待确认 | `boolean` | `false` |
| `disabled` | 禁用交互；字段未设时继承 FormItem/Form | `boolean` | 继承，最终 false |
| `disabled-date` | 返回 true 禁用当前日期，side 为 start/end | `(date: Date, side: DateSide) => boolean`<br>`DateSide: 'end' \| 'start'` | `undefined` |
| `disabled-time` | 按日期与端点返回禁用小时、分钟、秒列表 | `(date: Date, side: DateSide) => DateDisabledTime`<br>`DateSide: 'end' \| 'start'` | `undefined` |
| `edit-mode` | 字段编辑模式；未设时继承 FormItem/Form | `FieldEditMode`<br>`'direct' \| 'popup'` | 继承，最终 popup |
| `empty-text` | 纯阅读模式的空内容文字 | `string` | 继承，最终 '-' |
| `empty-value` | 清空输出或同步工厂，不改变 emptyValues 识别 | `DateValue \| null \| (() => DateValue \| null \| undefined)` | `undefined` |
| `empty-values` | 空值识别列表，覆盖而不合并 | `readonly unknown[]` | 继承/组件族默认 |
| `error` | 字段错误展示；未设时继承 | `boolean` | 继承，最终 false |
| `focus-color` | 聚焦时的颜色 | `string` | 主题缺省 |
| `format` | 显示与手输格式；函数只展示，无反向手输解析 | `string \| ((date: Date) => string)` | 按精度/时间配置 |
| `hint` | 浮动占位提示；存在 Form 外置标签时不浮动 | `boolean` | `true` |
| `input-editable` | 允许手输；不影响面板选择入口 | `boolean` | `true` |
| `interactive-mode` | Maple 日历视口模式；不是字段编辑模式 | `page \| scroll \| line` | `page` |
| `line` | 显示外壳边框或底线 | `boolean` | `true` |
| `loading` | 手动加载反馈，不从事件返回值推导 | `boolean` | `false` |
| `loading-mode` | 字段加载展示模式 | `default \| line` | default |
| `max` | 包含上界，非法的已提供边界不会被静默忽略 | `DateValue` | `undefined` |
| `min` | 包含下界，非法的已提供边界不会被静默忽略 | `DateValue` | `undefined` |
| `model-value` | 外部日期值；undefined 为非受控，null 为显式空值 | `DateValue \| DateValue[] \| null` | `undefined` |
| `multiple` | Maple 多选；避免同时开启范围模式 | `boolean` | `false` |
| `open` | 受控编辑层开关 | `boolean` | `undefined` |
| `open-trigger-target` | 点击整个字段或仅图标打开；不限制键盘打开 | `field \| icon` | field |
| `panel-type` | Maple 字段面板形态，独立于 editMode | `calendar \| picker \| calendarPicker` | `calendar` |
| `picker-props` | Maple 日期/时间滚轮展示配置，不接管根模型与规则 | `DateWheelOptions` | `{}` |
| `placeholder` | 字段占位文字，未设跟随 Locale | `string` | `undefined` |
| `popup-container` | 编辑层挂载容器，false 保持原位 | `PopupContainer` | 共享容器缺省 |
| `popup-props` | Trigger 展示配置；运行时过滤根状态、模型、规则和控制监听器 | `Record<string, unknown>` | `{}` |
| `read-pretty` | 纯阅读展示，不渲染编辑器；独立于 readonly | `boolean` | 继承，最终 false |
| `readonly` | 只读；字段可聚焦复制，不改值或展开编辑 | `boolean` | 继承，最终 false |
| `separator` | 内容拼接或起止显示的分隔文字，允许空串 | `string` | `, ` |
| `show-time` | 启用时刻精度和时间选择，可见精度由格式决定 | `boolean` | `false` |
| `size` | 五档尺寸；字段遵循表单继承 | `ComponentSize`<br>`'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | 继承，最终 md |
| `text-color` | 内容文字颜色 | `string` | 主题缺省 |
| `time-fields` | 滚轮列及顺序；显式列表决定可见列，不改格式或模型 | `readonly TimePickerField[]`<br>`TimePickerField: 'hour' \| 'minute' \| 'second'` | 按格式推导 |
| `time-zone` | IANA 时区；无效时区不会回退成有效可选值 | `string` | 系统本地时区 |
| `type` | 日期精度；Cedar 支持周/季度，Maple 支持日期/月/年 | `date \| month \| year` | `date` |
| `use-virtual-scroll` | Maple scroll 视口使用虚拟渲染 | `boolean` | `true` |
| `value-format` | 序列化模型格式，支持 Date、timestamp 或格式字符串；独立于 format | `string` | 按精度/时间配置 |
| `variant` | 字段外观 | `filled \| outline \| standard` | `outline` |

### Date Events

字段与面板的完整事件分别见本页对应完整列表。

### Date Methods

| 方法名  | 说明 | 参数 | 返回值 |
| ------- | ---- | ---- | ------ |
| `focus` | 聚焦 | `-`  | `-`    |
| `blur`  | 失焦 | `-`  | `-`    |

### Date Slots

| 插槽名        | 说明         | 参数                                 |
| ------------- | ------------ | ------------------------------------ |
| `selected`    | 选择区域内容 | `-`                                  |
| `prefix`      | 前缀         | `-`                                  |
| `clear-icon`  | 清除图标     | `clear: (e: Event) => void`          |
| `suffix`      | 后缀         | `-`                                  |
| `suffix-icon` | 箭头图标     | `focus: boolean, popupOpen: boolean` |

### DatePicker Props

| 参数 | 说明 | 类型 | 缺省说明 |
| --- | --- | --- | --- |
| `abbreviation` | 月份网格使用缩写，false 使用完整月份名 | `boolean` | `true` |
| `button-elevation` | Maple 内部日历按钮阴影 | `boolean \| number` | `true` |
| `color` | Maple 日历主题色 | `string` | 主题缺省 |
| `date-fields` | 日期滚轮列及顺序；显式列表决定可见列 | `readonly DatePickerField[]`<br>`DatePickerField: 'month' \| 'year' \| 'day'` | 按精度推导 |
| `day-start-of-week` | 每周第一天，仅日历展示，整数 0～6 | `DateWeekStart` | `0` |
| `default-picker-value` | 初始日历视口，仅初始化读取；优先已选值，再用当前日期 | `DateSelection` | `undefined` |
| `default-value` | 非受控初始值，仅创建时读取 | `DateValue \| DateValue[]` | `undefined` |
| `disable-confirm` | 选择后立即提交；false 保留草稿待确认 | `boolean` | `true` |
| `disabled` | 禁用面板选择和提交 | `boolean` | `false` |
| `disabled-date` | 返回 true 禁用当前日期，side 为 start/end | `(date: Date, side: DateSide) => boolean`<br>`DateSide: 'end' \| 'start'` | `undefined` |
| `disabled-time` | 按日期与端点返回禁用小时、分钟、秒列表 | `(date: Date, side: DateSide) => DateDisabledTime`<br>`DateSide: 'end' \| 'start'` | `undefined` |
| `elevation` | 面板阴影等级，false 关闭 | `boolean \| number` | `false` |
| `empty-value` | 清空输出或同步工厂，不改变 emptyValues 识别 | `DateValue \| null \| (() => DateValue \| null \| undefined)` | `undefined` |
| `format` | 显示与手输格式；函数只展示，无反向手输解析 | `string \| ((date: Date) => string)` | 按精度/时间配置 |
| `hint` | Maple 摘要提示，摘要区域显示时生效 | `string` | `Locale` |
| `interactive-mode` | Maple 日历视口模式；不是字段编辑模式 | `page \| scroll \| line` | `page` |
| `max` | 包含上界，非法的已提供边界不会被静默忽略 | `DateValue` | `undefined` |
| `min` | 包含下界，非法的已提供边界不会被静默忽略 | `DateValue` | `undefined` |
| `model-value` | 外部日期值；undefined 为非受控，null 为显式空值 | `DateValue \| DateValue[] \| null` | `undefined` |
| `multiple` | Maple 多选；避免同时开启范围模式 | `boolean` | `false` |
| `picker-props` | Maple 日期/时间滚轮展示配置，不接管根模型与规则 | `DateWheelOptions` | `{}` |
| `picker-value` | 受控日历视口，不是选中值；范围视口含两个日期 | `DateSelection` | `undefined` |
| `presentation` | Maple 独立面板展示方式 | `calendar \| picker \| calendarPicker` | `calendarPicker` |
| `preview-shortcut` | 悬停/聚焦快捷项时预览，不提交 | `boolean` | `true` |
| `range` | Maple 通用独立面板的范围模式 | `boolean` | `false` |
| `readonly` | 只读面板，不改变候选或提交 | `boolean` | `false` |
| `shortcuts` | 快捷项；值或按需执行的同步值工厂，可含 format/disabled | `DateShortcut[]` | `[]` |
| `shortcuts-position` | 快捷项位置 | `left \| bottom \| right` | `bottom` |
| `show-current` | 仅高亮当前日期，不改变选择或模型 | `boolean` | `true` |
| `show-now-button` | 显示此刻操作；范围能力按各端实际面板定义 | `boolean` | `true` |
| `show-time` | 启用时刻精度和时间选择，可见精度由格式决定 | `boolean` | `false` |
| `time-fields` | 滚轮列及顺序；显式列表决定可见列，不改格式或模型 | `readonly TimePickerField[]`<br>`TimePickerField: 'hour' \| 'minute' \| 'second'` | 按格式推导 |
| `time-zone` | IANA 时区；无效时区不会回退成有效可选值 | `string` | 系统本地时区 |
| `title-color` | Maple 摘要标题背景色，优先于 color | `string` | 主题缺省 |
| `touchable` | Maple 日历的触摸翻页；仍受视口模式和只读约束 | `boolean` | `true` |
| `type` | 日期精度；Cedar 支持周/季度，Maple 支持日期/月/年 | `date \| month \| year` | `date` |
| `use-virtual-scroll` | Maple scroll 视口使用虚拟渲染 | `boolean` | `true` |
| `value-format` | 序列化模型格式，支持 Date、timestamp 或格式字符串；独立于 format | `string` | 按精度/时间配置 |

### DatePicker Events

字段与面板的完整事件分别见本页对应完整列表。

### DatePicker Slots

`weekIndex` 表示一周的第 `n` 天，从周末的 `0` 开始

| 名称       | 说明               | 参数                                                                 |
| ---------- | ------------------ | -------------------------------------------------------------------- |
| `year`     | 自定义标题中的年   | `year: YYYY`                                                         |
| `month`    | 自定义标题中的月   | `year: YYYY` <br> `month: MM`                                        |
| `date`     | 自定义标题中的日期 | `year: YYYY` <br> `month: MM` <br> `date: DD` <br> `week: weekIndex` |
| `range`    | 自定义标题中的范围 | `choose: [startData, endDate]`                                       |
| `multiple` | 自定义标题中的多选 | `choose: ['YYYY-MM-DD' \| 'YYYY-MM']`                                |
| `actions`  | 自定义确认操作     | `{ confirm, disabled }`                                              |

## 配置清空后的值

`empty-value` 指定当前组件已有清空动作的输出；省略时采用该组件默认返回。具体类型以组件 API 为准。它不改变 empty-values 的识别规则，也不改变 Form reset 的初始值。

## 滚轮可见字段

`date-fields` 与 `time-fields` 分别控制日期、时间滚轮列的显隐及顺序，两组不会交错排列。范围起止两端共用配置，字段与独立面板使用相同属性。

| 属性          | 类型                       | 默认值                   | 说明                                                        |
| ------------- | -------------------------- | ------------------------ | ----------------------------------------------------------- |
| `date-fields` | readonly DatePickerField[]<br>`DatePickerField: 'month' \| 'year' \| 'day'` | 按 type 生成年、月、日列 | 可选 year、month、day；只影响列式日期选择，不改变日历网格。 |
| `time-fields` | readonly TimePickerField[]<br>`TimePickerField: 'hour' \| 'minute' \| 'second'` | 时、分、秒               | 可选 hour、minute、second；也控制日历内的时间滚轮。         |

数组需非空、无重复，显式数组严格决定可见列与顺序；未传属性时采用默认列。两组字段各自校验，不能混用。隐藏字段保留已有值，编辑合并回完整草稿；更改字段配置不会提交主值。嵌套展示配置不能覆盖根属性。

Date/DateRange 的时间区域仅在 show-time 开启时生效。`format` 控制输入显示，`value-format` 控制保存格式，均不决定面板列。未指定格式时日期时间默认保存到秒；只需分钟字符串时，另行设置 format 与 value-format。隐藏年份仍使用完整草稿中的年份；仅保存 MM-DD 无法表达跨年范围，闰年和跨年业务应保存完整日期。

## Types

### 字段事件参数类型

| 事件 | 参数 |
| --- | --- |
| `update:modelValue` | `DateEmits['update:modelValue']` |
| `change` | `DateEmits['change']` |
| `select` | `DateEmits['select']` |
| `clear` | `DateEmits['clear']` |
| `click` | `DateEmits['click']` |
| `focus` | `DateEmits['focus']` |
| `blur` | `DateEmits['blur']` |
| `update:open` | `DateEmits['update:open']` |
| `open-change` | `DateEmits['open-change']` |
| `update:pickerValue` | `DateEmits['update:pickerValue']` |
| `picker-value-change` | `DateEmits['picker-value-change']` |
| `select-shortcut` | `DateEmits['select-shortcut']` |

字段值及视口通知参数使用对应公开 Emits 元组；DateChangeArgs 包含 value、date(s)、text(s)。普通监听器 Promise 不被等待，不驱动 loading。beforeCommit 使用 payload、done、context，payload 含 value/previousValue，context 含 signal/可选 event；返回 undefined 等待 done。

### 面板事件参数类型

独立面板只有下表七类事件，没有旧 preview 事件；导航使用 picker-value-change 和 update:pickerValue。导航、悬停/聚焦快捷预览不等于选中或提交。确认只有通过校验时才通知，选中草稿 select 与正式 change 分开。

| 事件 | 参数 |
| --- | --- |
| `update:modelValue` | `DatePickerEmits['update:modelValue']` |
| `change` | `DatePickerEmits['change']` |
| `select` | `DatePickerEmits['select']` |
| `confirm` | `DatePickerEmits['confirm']` |
| `update:pickerValue` | `DatePickerEmits['update:pickerValue']` |
| `picker-value-change` | `DatePickerEmits['picker-value-change']` |
| `select-shortcut` | `DatePickerEmits['select-shortcut']` |

### 类型导入

```ts
import { Date as DateField, DatePicker, type DateProps, type DatePickerProps,
  type DateEmits, type DatePickerEmits, type DateValue, type DateSelection,
  type DateChangeArgs, type DateRules, type DateShortcut } from '@maple-design/ui-vue'
```

<!-- date-contract:end -->

## CSS Variables

以下为组件使用的 css 变量，可以使用 [ThemeProvider 组件](#/zh-CN/theme-provider) 进行样式定制。

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-date-calendar-disabled-opacity` | `0.4` | `opacity` |
| `--mp-date-calendar-line-height` | `60px` | `grid-auto-rows` |
| `--mp-date-calendar-month-height` | `320px` | `height` |
| `--mp-date-calendar-row-height` | `38px` | `grid-auto-rows`, `line-height` |
| `--mp-date-calendar-scroll-height` | `320px` | `height` |
| `--mp-date-calendar-selected-background` | `var(--mp-sys-color-action-primary)` | `background` |
| `--mp-date-calendar-selected-color` | `var(--mp-button-solid-text-color)` | `color` |
| `--mp-date-calendar-today-color` | `var(--mp-button-default-foreground-color)` | `background`, `color` |
| `--mp-date-input-trigger-outline-color` | `var(--mp-sys-color-action-primary)` | `outline` |
| `--mp-date-input-trigger-outline-offset` | `var(--mp-sys-space-1)` | `outline-offset` |
| `--mp-date-input-trigger-outline-width` | `var(--mp-sys-space-1)` | `outline` |
| `--mp-date-input-trigger-padding` | `0` | `padding` |
| `--mp-date-picker-actions-padding` | `0 8px 12px 8px` | `padding` |
| `--mp-date-picker-body-background-color` | `#fff` | `background`, `background-color` |
| `--mp-date-picker-body-height` | `280px` | `height`, `min-height` |
| `--mp-date-picker-body-padding` | `0` | `padding` |
| `--mp-date-picker-border-radius` | `4px` | `border-radius` |
| `--mp-date-picker-font-size` | `var(--mp-font-size-md)` | `font-size` |
| `--mp-date-picker-header-arrow-filter` | `opacity(0.54)` | `filter` |
| `--mp-date-picker-header-color` | `#555` | `color` |
| `--mp-date-picker-header-padding` | `4px 16px` | `padding` |
| `--mp-date-picker-main-color` | `rgba(0, 0, 0, 0.87)` | `color` |
| `--mp-date-picker-min-width` | `290px` | `flex`, `min-width` |
| `--mp-date-picker-panel-background` | `var(--mp-sys-color-surface-overlay)` | `background` |
| `--mp-date-picker-panel-border` | `var(--mp-color-border-2)` | `border` |
| `--mp-date-picker-panel-date-width` | `265px` | `flex`, `min-width`, `width` |
| `--mp-date-picker-panel-preferred-width` | `var(--mp-date-picker-popover-width)` | `flex`, `width` |
| `--mp-date-picker-panel-radius` | `8px` | `border-radius` |
| `--mp-date-picker-popover-gap` | `32px` | `max-height`, `max-width` |
| `--mp-date-picker-popover-max-height` | `calc(100dvh - var(--mp-date-picker-popover-gap))` | `max-height` |
| `--mp-date-picker-popover-width` | `calc(var(--mp-date-picker-panel-date-width) + 2px)` | `flex`, `width` |
| `--mp-date-picker-range-background` | `var(--mp-color-primary-light-1)` | `background` |
| `--mp-date-picker-range-disabled-background` | `var(--mp-color-fill-1)` | `background` |
| `--mp-date-picker-range-preview-background` | `var(--mp-color-fill-2)` | `background` |
| `--mp-date-picker-range-preview-outline` | `1px dashed var(--mp-sys-color-action-primary)` | `outline` |
| `--mp-date-picker-shortcuts-column-width` | `128px` | `flex`, `width` |
| `--mp-date-picker-title-background` | `var(--mp-date-picker-body-background-color)` | `background` |
| `--mp-date-picker-title-color` | `var(--mp-color-text-1)` | `color` |
| `--mp-date-picker-title-date-font-size` | `34px` | `font-size` |
| `--mp-date-picker-title-date-font-weight` | `500` | `font-weight` |
| `--mp-date-picker-title-date-height` | `48px` | `min-height` |
| `--mp-date-picker-title-date-justify-content` | `normal` | `justify-content` |
| `--mp-date-picker-title-date-range-font-size` | `20px` | `font-size` |
| `--mp-date-picker-title-height` | `105px` | `min-height` |
| `--mp-date-picker-title-hint-color` | `var(--mp-color-text-3)` | `color` |
| `--mp-date-picker-title-hint-font-size` | `var(--mp-font-size-md)` | `font-size` |
| `--mp-date-picker-title-padding` | `16px` | `padding` |
| `--mp-date-picker-title-year-font-size` | `var(--mp-font-size-md)` | `font-size` |
| `--mp-date-picker-title-year-font-weight` | `500` | `font-weight` |
| `--mp-date-picker-title-year-margin-bottom` | `8px` | `margin-bottom` |
| `--mp-date-picker-title-year-min-height` | `21px` | `min-height` |
| `--mp-date-picker-wheel-font-size` | `5cqi` | `font-size` |
| `--mp-date-title-font-size` | `var(--mp-picker-title-font-size, 16px)` | `font-size` |
| `--mp-date-title-text-color` | `var(--mp-picker-title-text-color, #555)` | `color` |
| `--mp-date-toolbar-height` | `var(--mp-picker-toolbar-height, 44px)` | `height` |
| `--mp-date-toolbar-padding` | `var(--mp-picker-toolbar-padding, 0 4px)` | `padding` |
| `--mp-day-picker-content-item-button-font-size` | `var(--mp-font-size-sm)` | `font-size` |
| `--mp-day-picker-content-item-button-height` | `32px` | `height` |
| `--mp-day-picker-content-item-button-width` | `32px` | `width` |
| `--mp-day-picker-content-item-font-size` | `var(--mp-font-size-sm)` | `font-size` |
| `--mp-day-picker-content-item-min-height` | `21px` | `min-height` |
| `--mp-day-picker-content-item-padding` | `2px 0` | `padding` |
| `--mp-day-picker-content-item-width` | `14.28%` | `width` |
| `--mp-day-picker-head-item-color` | `rgba(0, 0, 0, 0.38)` | `color` |
| `--mp-day-picker-head-item-font-weight` | `600` | `font-weight` |
| `--mp-day-picker-head-item-padding` | `8px 0` | `padding` |
| `--mp-month-picker-item-button-max-width` | `140px` | `max-width` |
| `--mp-month-picker-item-height` | `56px` | `height` |
| `--mp-month-picker-item-width` | `33%` | `width` |
| `--mp-month-picker-padding` | `0 12px` | `padding` |
| `--mp-year-picker-item-button-max-width` | `140px` | `max-width` |
| `--mp-year-picker-item-height` | `56px` | `height` |
| `--mp-year-picker-item-width` | `33%` | `width` |
| `--mp-year-picker-padding` | `0 12px` | `padding` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-date-calendar-selected-background: var(--mp-sys-color-action-primary);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
