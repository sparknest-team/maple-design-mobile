# DateRange 日期范围

端点锁定由本地移动展示适配层响应式传给日历和滚轮；嵌套锁定与当前锁定合并，不会因切换展示或解锁另一端而丢失。共享草稿/确认所有者不依赖移动端注入，外部模型更新和确认/取消语义不变。

浮动面板按可视视口限制高度。正常高度完整展示日历；横屏或矮窗口仅在内容确实放不下时滚动，确认操作保持可见。可用 `--mp-date-picker-popover-max-height` 限制面板最大高度（默认 `100dvh - 32px`）。品牌样式通过主题变量注入，切回默认／Maple 时移除品牌覆盖。

纯面板不接收 open/default-open、popup-container、placement、trigger-props、placeholder、variant、clearable。确认区由 disable-confirm 控制；actions 插槽提供 { confirm, disabled }。DatePicker/DateRangePicker 可以单独 app.use 安装，根入口和 date/date-range 子路径导出组件、Props、Instance、Type、Options、Emits；没有独立 date-picker/date-range-picker npm 子路径。

安装 DateRange 时会一并注册 DateRangePicker，也可通过静态成员 `DateRange.Picker` 使用。

字段通过 `date-picker-props`（Date）或 `date-range-picker-props`（DateRange）配置面板的该选项。

`abbreviation`（boolean，默认 `true`）控制日历月份网格的缩写；`false` 使用当前 Locale 的完整月份名。运行时修改立即生效，不改变值，也不触发选择事件。此开关不影响星期标签、标题、滚轮列或值格式。范围日历以顶层选项为准，嵌套日历参数不能覆盖。

## 基础示例

### 基础用法

```demo
../example/demos/basic-usage.vue
```

## 外观与日期展示

### 外观组合

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置           | 作用                        | 相关示例     |
| -------------- | --------------------------- | ------------ |
| `value-format` | 模型格式、Date 或 timestamp | 外观组合     |
| `separator`    | 展示分隔符                  | 自定义分隔符 |
| `placeholder`  | 占位符                      | 自定义分隔符 |
| `clearable`    | 是否可清除                  | 自定义分隔符 |

<!-- demo-config-notes:end -->

适用于预订或查询的起止日期。调整变体、尺寸，用相同数据观察变化。内容保持一致，便于比较不同设置的实际效果。

```demo
../example/demos/appearance-lab.vue
```

### 自定义分隔符

```demo
../example/demos/separator.vue
```

## 时间与范围规则

### 边界和端点禁用

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置            | 作用                              | 相关示例       |
| --------------- | --------------------------------- | -------------- |
| `value-format`  | 模型格式、Date 或 timestamp       | 边界和端点禁用 |
| `format`        | 展示格式或格式化函数              | 边界和端点禁用 |
| `min`           | 可选最小日期                      | 边界和端点禁用 |
| `max`           | 可选最大日期                      | 边界和端点禁用 |
| `disabled-date` | true 为禁用；side 为 start 或 end | 边界和端点禁用 |

<!-- demo-config-notes:end -->

移动端可单独调整结束端；确认后才回写范围模型，取消会丢弃草稿。示例仅允许九月，且结束端不能选周日。

```demo
../example/demos/boundaries.vue
```

### 介绍

日期范围选择**面板**，可单独嵌入页面使用。

顶部摘要左右展示起点和终点，使用统一浅色容器和选中色区分，不显示起止提示文字和箭头。点击摘要切换当前编辑端点并高亮，已有日期会定位到对应月份；未选端点保留当前视口。

- 默认 `calendarPicker`（`calendar` 同样适用）：日历采用单选状态，只高亮当前端点，不显示范围连线；启用 `show-time` 后，右侧同时显示每半小时一项的快捷时间 Picker。
- `presentation="picker"`：显示当前端点的日期列，年/月/日分别使用 1/2/3 列。
- 底部显示当前端点的提示和日期；有时间时，右侧显示时间及切换按钮。时钟按钮打开当前端点的详细时/分/秒滚轮，图标变为日历后可切回日期。
- 详细时间不含秒时 2 列，含秒时 3 列，列名保持统一。切换端点保留当前视图和另一端的值，切换视图不会自动取整时间或提交值。
- 纯日期范围不显示快捷时间和视图切换按钮。

表单字段：[`DateRange`](/zh-CN/date-range)。单日期面板：[`DatePicker`](/zh-CN/date-picker)。

## 值模型与输入

### 字符串模型：年月日、年月与月日范围

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置             | 作用                                                   | 相关示例                                                     |
| ---------------- | ------------------------------------------------------ | ------------------------------------------------------------ |
| `format`         | 展示格式或格式化函数                                   | 字符串模型：年月日、年月与月日范围、手输与面板选择、日期时间 |
| `value-format`   | 模型格式、Date 或 timestamp                            | 字符串模型：年月日、年月与月日范围、日期时间                 |
| `panel-type`     | 面板模式，可选值 `calendar` `picker`                   | 字符串模型：年月日、年月与月日范围                           |
| `date-fields`    | readonly DatePickerField[]                             | 字符串模型：年月日、年月与月日范围                           |
| `disabled`       | 禁用整体或单独端点                                     | 手输与面板选择                                               |
| `input-editable` | 是否允许手输；默认 true，函数 format/multiple 保持只读 | 手输与面板选择                                               |

<!-- demo-config-notes:end -->

`format` 决定显示，`value-format` 决定提交值。下面直接得到 `"2026-09-10"`、`"2026-09"` 或 `["09-10", "10-10"]`，无需将 Date 再转换。日期范围使用数组。`MM-DD` 没有年份，解析时使用当前年，不能表示跨年先后或某个明确年份的 2 月 29 日；有跨年、时区或闰年要求时保留 `YYYY-MM-DD`，在业务提交时单独映射月日。默认仍是 page，未指定 timeZone 使用浏览器本地时区。

```demo
../example/demos/string-values.vue
```

### 手输与面板选择

```demo
../example/demos/text-entry.vue
```

### 日期时间

```demo
../example/demos/date-time.vue
```

日期时间范围的确认按钮左侧提供闪电入口，点击后显示中文快捷范围：今天、本周、最近15分钟、最近30分钟、最近1小时、最近24小时、最近7天、最近30天、最近90天、最近1年。今天、本周从相应起点到此刻，其他项为截至此刻的滚动区间，点击时重新计算。点击任一合法项仅更新草稿，点击确认后才提交并关闭弹层，仍遵守禁用、端点锁定及 `before-commit` 校验；再次点击闪电返回编辑，不改动草稿。

配置 `shortcuts` 时，快捷面板使用自定义项替换内置项；独立面板、字段浮层和 Popup 编辑层行为一致。“此刻”仅选择草稿，默认仍需确认，设置 `:show-now-button="false"` 可隐藏。

## 内容与展示

### 跨月、夏令时与端点锁定

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置             | 作用                                                   | 相关示例                         |
| ---------------- | ------------------------------------------------------ | -------------------------------- |
| `value-format`   | 模型格式、Date 或 timestamp                            | 跨月、夏令时与端点锁定、日历模式 |
| `show-time`      | 是否选择时间                                           | 跨月、夏令时与端点锁定、日历模式 |
| `placeholder`    | 占位符                                                 | 选择类型、搭配 FormItem          |
| `clearable`      | 是否可清除                                             | 选择类型、搭配 FormItem          |
| `disabled`       | 禁用整体或单独端点                                     | 跨月、夏令时与端点锁定           |
| `input-editable` | 是否允许手输；默认 true，函数 format/multiple 保持只读 | 跨月、夏令时与端点锁定           |

<!-- demo-config-notes:end -->

```demo
../example/demos/zoned-range.vue
```

### 日期值格式

年、月、日模型默认格式为 `YYYY`、`YYYY-MM`、`YYYY-MM-DD`，日期时间默认包含秒；分钟精度设置 `time-fields="['hour', 'minute']"`。`format` 控制显示，`value-format` 控制模型，支持自定义格式、`Date` 与 `timestamp`。Maple 提供年/月/日面板和移动端日历、滚轮；周/季度面板仅由 Cedar 提供。

### 介绍

表单日期范围**字段**，点击后底部弹出 DateRangePicker。范围面板示例聚合在本页下方，没有独立 date-range-picker 文档路由。交互与 `Date` 一致：取消丢弃草稿，确认后才写回 `v-model`。

- 默认使用日历面板；`panel-type="picker"` 使用列滚轮（年 / 月 / 日，由 `type` 决定）
- `panel-type="calendar"`：日历面板
- `show-time`：日历右侧提供每半小时一项的快捷时间 Picker，底部时钟按钮打开详细时间滚轮

### 基本使用

面板顶部保留开始／结束日期摘要，可点击摘要切换编辑端点；下方摘要显示当前编辑端点的日期和时间。每次打开面板默认编辑开始端并定位到摘要中的开始日期；开始端锁定而结束端可编辑时自动选择结束端。超出日期边界时定位到边界，显式受控 picker-value 仍由调用方管理。起止输入之间的焦点移动不触发整个字段的 blur。

顶部起止摘要保持可见，当前端点高亮，锁定端禁用。底部显示当前端点的日期和时间，时钟按钮切换到详细时间 Picker，日历按钮切回日期面板；切换不提交，取消恢复已提交值。空表单未选择时显示“选择开始 / 选择结束”；只选一端保留草稿，两端完整且顺序合法后才可确认。

### 日历模式

字段也支持 Picker 滚轮模式：通过 `panel-type="calendar | picker"` 切换内容，下例可切换并开启日期时间范围。`edit-mode` 用于选择字段容器。日历模式未选择的起止摘要显示“选择开始 / 选择结束”；确认要求两端完整且合法。

```demo
../example/demos/calendar-mode.vue
```

Picker 滚轮打开时会为缺失的端点建立候选草稿，摘要同步显示候选日期，不需要先滚动才能确认。空范围的起止默认取同一合法日期／时刻；只缺一端时优先沿用另一端，并遵守 min/max、禁用和端点锁定规则。没有合法候选时保持空值并禁用确认。初始化不会触发 select、change 或写回 v-model，确认才保存，取消丢弃候选。切换回日历保留当前草稿。

字段的 `edit-mode` 控制 `direct` / `popup` 等展示容器；`panel-type` 控制 `calendar` / `picker` 内容。独立 `DateRangePicker` 没有字段编辑容器，内容模式使用 `presentation`。

### 选择类型

```demo
../example/demos/type.vue
```

### 搭配 FormItem

```demo
../example/demos/with-form-item.vue
```

### 端点锁定

双锁不拦截父级主动更新模型，但日期与确认保持禁用；外部更新后解锁起点，只恢复起点编辑，不自动提交。此时选择16并确认保留新终点22，不恢复旧终点15。

点击“外部改为18~~22”直接更新父模型：未确认的旧草稿随之同步，锁定端以新模型为基准；外部更新不增加选择或确认次数。之后选择24并确认，只提交18~~24，不恢复旧起点。

先编辑草稿再锁定该端，不代表授权草稿覆盖已提交端点：只要锁定端草稿与模型不同，确认保持不可用。解除锁定保留草稿并恢复确认，但本身不提交，仍需显式确认。

锁定端点始终保持原值。修改另一端导致起止倒置时，保留草稿并提示错误，禁止确认；修正后可正常确认。

本例显式设置 disable-confirm=false。仅一端锁定时，单次日期选择只编辑未锁端，不重新开始两次点击选范围；双锁时日期候选同步禁用语义，确认不可用。解除锁定恢复编辑，本身不提交。

使用 disabled=[起点锁定, 终点锁定] 保留已提交端点，只修改另一端草稿；确认后才回写模型。切换锁定本身不提交，两端都锁定时不能选择。此独立面板不提供弹层取消链。

```demo
../example/demos/endpoint-lock.vue
```

## 布局与排列

### 独立面板窄屏与组合布局

面板随容器宽度收缩；可切换快捷项位置及时间形式，检查导航、时间与确认操作。

```demo
../../date/example/demos/responsive-panels.vue
```

direct 日期字段默认使用日历面板，也可通过 `panel-type="picker"` 使用滚轮；单日期与范围日历的基准宽度均为 265px。带时间的范围面板通过点击日期或时间切换内容，起止时间共用 4 列或 6 列滚轮。字段通过 `panel-type`、独立日期面板通过 `presentation` 切换日历与滚轮。

独立 DatePicker / DateRangePicker 与 inline 共用面板尺寸：单个日历基准宽度为 265px，带时间时宽屏左右布局、窄屏换行。独立面板保留自身的确认按钮和 actions 插槽，不继承 Form 的 presentation。

`read-pretty` 为独立布尔属性，与 `readonly`、`disabled` 同级；字段 > FormItem > Form 继承，显式 `false` 覆盖父级。默认 `false`。纯阅读不显示编辑器。

日期范围与日期时间范围的“此刻”仅更新当前端的草稿，不交换起止值。即使开启 `disable-confirm`，点击此刻后继续调整也仍需确认；取消会丢弃草稿。独立面板、inline 和弹层行为一致，起止倒置时显示红字提示并禁用确认。

## 独立日期面板

### 基本使用

```demo
../example/demos/picker-basic.vue
```

### 只读

```demo
../example/demos/picker-readonly.vue
```

### 日历模式

独立面板通过 `presentation="calendar | picker"` 切换日历与滚轮，下例还可开启日期时间范围。切换内容模式保留当前选择；日期与日期时间各自保留选择。

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

## 交互与字段配置

### 交互状态对比

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置                      | 作用                                                   | 相关示例                                               |
| ------------------------- | ------------------------------------------------------ | ------------------------------------------------------ |
| `panel-type`              | 面板模式，可选值 `calendar` `picker`                   | 受控关闭被拒绝、字段视口与快捷项事件、字段与嵌入式面板 |
| `presentation`            | 面板模式：`calendar` `picker` `calendarPicker`         | 字段与嵌入式面板、透传配置边界与优先级、复制与编辑     |
| `open`                    | 弹层显隐受控                                           | 受控关闭被拒绝、透传配置边界与优先级                   |
| `input-editable`          | 是否允许手输；默认 true，函数 format/multiple 保持只读 | 字段视口与快捷项事件、复制与编辑                       |
| `date-range-picker-props` | 透传给 `mp-date-range-picker`                          | 字段视口与快捷项事件、字段与嵌入式面板                 |
| `value-format`            | 模型格式、Date 或 timestamp                            | 交互状态对比                                           |

<!-- demo-config-notes:end -->

在同一实例上切换禁用、只读和错误状态后再操作控件，比较可编辑性和交互反馈。恢复开关位于目标控件外；错误外观本身不会执行校验。

<details>
<summary>配置说明与使用限制</summary>

#### 交互状态切换

适用于预订或查询的起止日期。调整只读、错误反馈，用相同数据观察变化。控制区始终可用，可以随时恢复编辑；错误外观本身不会触发表单校验。

</details>

```demo
../example/demos/state-lab.vue
```

### 受控关闭被拒绝

父级拒绝关闭时，面板会保留展开；同一选择重复确认不会再次提交或请求关闭，修改日期后则可以开启新的确认事务。打开后可点击面板顶部摘要切换编辑端点；等值的受控数组重新渲染不会清掉草稿。

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

`Date` / `DateRange` 字段通过根 `panel-type` 选择内容，独立日期面板通过根 `presentation` 选择内容；独立面板内容默认 `calendarPicker`，不带时间时显示日历；Date 和 DateRange 字段的 popup 内容默认 `calendar`。`DatePickerOptions` / `DateRangePickerOptions` 不能覆盖根组件选择的面板模式。周起始、视口、快捷项和合法外观仍可嵌套配置。单值根支持 picker/calendar/calendarPicker，范围根支持 picker/calendar/calendarPicker；Cedar 只有桌面日历，不提供这些空模式。

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

### 范围面板的交互规则

移动端日历保留单月视图，翻月不修改选中范围；可从一个月选择起点，翻到另一个月选择终点。只有一个端点或起止倒置的草稿不能确认；完整且顺序合法后才可确认。取消恢复先前已提交值，锁定端点不能被改写。

### 范围中的禁用项

`disabled-date` 限制起止端点，范围可以跨过中间的禁用项；不会逐项扫描或自动截断范围。日期、月份、年份均采用此规则。中间禁用项保持灰色，翻页保留已选起点并清除悬浮预览；反向点选保留起止值，底部显示红色提示并禁用确认。

### 字段与嵌入式面板

字段负责输入与浮层，纯面板直接嵌入页面。day-start-of-week 统一为数字 0～6，0 为周日；范围日历也支持动态更新。嵌套 Options 只配置展示，不覆盖顶层值、格式、边界或禁用规则。

本例通过 `actions` 插槽调用 `confirm`，并把 `disabled` 绑定到提交按钮。选择草稿不更新“已提交”，确认后才写回；动态收紧边界不会清除已有模型，但不合法草稿不能提交，重新选择合法起止日期后可再次提交。

“禁用20日结束”动态改变 `disabled-date` 回调：先选10~20草稿，再启用禁用，提交不可用且已提交值不变；解除禁用只恢复确认资格，不自动提交。禁用只作用于结束端，不应误禁起点20日。

```demo
../example/demos/entry-boundary.vue
```

### 快捷选项与日历视口

DateRangePicker 同样支持 shortcuts、shortcuts-position、preview-shortcut、picker-value/default-picker-value。范围视口包含两个日期，锁定端点不能被快捷项改变；预览不提交。事件为 update:picker-value、picker-value-change(value, dates, texts)、select-shortcut(shortcut)。详见 [Date 日期](../date/) 的快捷选项示例；DateRange 字段通过 date-range-picker-props 配置并转发事件。

### 当前端点选择

show-current 仅控制高亮。范围默认提供“此刻”，通过顶层 `show-now-button` 控制，只修改顶部当前选中的端点；起止倒置时显示红色提示并禁用确认，违反日期／时间禁用规则时禁用“此刻”。详见 Date 的当前日期与范围策略示例。

高亮统一由顶层 show-current 控制，嵌套 date-picker-props 不接受 showCurrent/showNowButton，避免无效或相互覆盖的设置。

### 语言与嵌套日历参数

日期标签、标题和操作按钮的语言由全局 Locale 和 Provider 配置。切换语言不会选择或提交日期。

`DateRangePicker.datePickerProps` 与 `DateRange.datePickerProps` 仅接受 `DateRangeCalendarOptions`：`hint`、`color`、`titleColor`、`buttonElevation`、`touchable`。值、校验、视口、presentation、elevation、abbreviation 和动作由范围顶层管理；运行时未知键及监听函数不向内部日历转发。日历分支明确使用日历展示。

字段外观与 `dateRangePickerProps.datePickerProps` 合并；空默认对象保留嵌套设置，字段显式传入的键优先。

### 真实端侧能力

Cedar 字段使用桌面日历，通过 `date-picker-props` 或 `date-range-picker-props` 配置面板。Maple 保留这些真实扩展，使用 DateWheelOptions 与 DateRangeCalendarOptions。两端通过 `Date.datePickerProps` / `DateRange.dateRangePickerProps` 配置完整面板。范围的时间滚轮使用 `picker-props` 配置，初始日期时间放在顶层 `defaultValue`。

### 日期语言的实例隔离

日期组件使用当前库的 Locale/Provider 配置，周起始日由各实例的 `day-start-of-week` 控制，不会修改应用中 Dayjs 的默认语言或基础语言配置。

`value-format` 是稳定英文日期协议（包括月份名称 token），`format` 的显示及手输文本使用界面语言。切换语言不会改写模型，也不会令英文月份名称模型失效。默认数字协议、Date 对象、时间戳不变。中文核心语言与 Maple 内置语言数据已接入；其他日期格式优先使用已注册 Dayjs 语言数据，未加载的语言安全回退英文。

### 手输格式的边界

日期输入按 `format` 严格解析，再按 `value-format` 输出，并校验禁用规则及范围。默认允许手输，点击输入编辑，日历按钮或 ArrowDown 打开面板，Enter / 失焦提交。设置 `input-editable=false` 可仅通过面板选择。multiple 模式或函数 format 不支持文本逆解析，输入保持只读；函数 format 应配合关闭 `input-editable` 使用。Maple 不提供周/季度展示模式。

### 延迟编辑中的清空

延迟编辑时，清空只改变草稿；确认后先执行表单校验和 `beforeCommit`，通过才发布配置的 `emptyValue`，取消恢复已提交范围。初始空范围和只选一个端点的范围仍需补全端点；从非空范围主动清空得到的空草稿可以确认。禁用、只读以及任一端点锁定时不能整体清空；受控打开未被接受时也不会直接清空模型。

### 透传配置边界与优先级

建议使用 `DateRangePopupOptions` 声明 popup-props，边界与 DatePopupOptions 一致。仅用于 inline 锚定弹层；范围值、规则、open/defaultOpen、禁用及通知归 DateRange 管理。popup-container 顶层优先、嵌套回退，popupClass 合并内部类；trigger、closeOnClickReference、preventFocus、popupOffset 由展示层固定，Maple 还固定 unmountOnClose=true。新类型不开放这些固定项，附加平移使用 popupTranslate。已有运行时字段/监听过滤和旧配置可用能力保持。

建议使用本页列出的专用配置类型；展开状态、模型和事件由组件管理，不能通过嵌套配置接管。

```ts
import type { DateRangePopupOptions } from '@maple-design/ui'
```

```demo
../example/demos/passthrough-options.vue
```

### 复制与编辑

通过 open-trigger-target 独立控制打开区域；icon 模式下点击、聚焦和输入不会自动展开。input-editable / filterable 仍负责是否可编辑或搜索。右侧按钮、显式键盘展开和受控 open 可打开面板。

```demo
../example/demos/open-trigger-target.vue
```

### 共享字段加载

`loading` 控制共享字段加载状态；`loading-mode` 为 `default`（指示器）或 `line`（底部不定进度线），默认 `default`。渲染统一由 FieldDecorator 负责，不隐式改变 disabled/readonly；需要禁止编辑时单独设置。

### 编辑草稿中的清空

```demo
../example/demos/reference-clear.vue
```

## 阅读方向

范围值始终保持 `[开始, 结束]`，切换阅读方向不会交换端点或提交草稿。日历范围连接线与边界圆角跟随阅读方向；分页网格的左右键按视觉方向移动焦点，上下键保持日期行序。Maple 的端点编辑和连续范围高亮是不同展示路径。显式 `shortcuts-position="left|right"` 保持物理侧；弹层继承字段来源方向。

## API

### DateRangePicker Props

| 参数 | 说明 | 类型 | 缺省说明 |
| --- | --- | --- | --- |
| `abbreviation` | 月份网格使用缩写，false 使用完整月份名 | `boolean` | `true` |
| `date-fields` | 日期滚轮列及顺序；显式列表决定可见列 | `readonly DatePickerField[]`<br>`DatePickerField: 'month' \| 'year' \| 'day'` | 按精度推导 |
| `date-picker-props` | 范围内部日历展示白名单，不覆盖根所有权 | `DateRangeCalendarOptions` | `{}` |
| `day-start-of-week` | 每周第一天，仅日历展示，整数 0～6 | `DateWeekStart` | `0` |
| `default-picker-value` | 初始日历视口，仅初始化读取；优先已选值，再用当前日期 | `DateSelection` | `undefined` |
| `default-value` | 非受控初始值，仅创建时读取 | `(DateValue \| undefined)[]` | `undefined` |
| `disable-confirm` | 选择后立即提交；false 保留草稿待确认 | `boolean` | `true` |
| `disabled` | 禁用整体或分别锁定起止；字段未设时继承 FormItem/Form | `boolean \| boolean[]` | `false` |
| `disabled-date` | 返回 true 禁用当前日期，side 为 start/end | `(date: Date, side: DateSide) => boolean`<br>`DateSide: 'end' \| 'start'` | `undefined` |
| `disabled-time` | 按日期与端点返回禁用小时、分钟、秒列表 | `(date: Date, side: DateSide) => DateDisabledTime`<br>`DateSide: 'end' \| 'start'` | `undefined` |
| `elevation` | 面板阴影等级，false 关闭 | `boolean \| number` | `false` |
| `empty-value` | 清空输出或同步工厂，不改变 emptyValues 识别 | `(DateValue \| undefined)[] \| null \| (() => (DateValue \| undefined)[] \| null \| undefined)` | `undefined` |
| `format` | 显示与手输格式；函数只展示，无反向手输解析 | `string \| ((date: Date) => string)` | 按精度/时间配置 |
| `interactive-mode` | Maple 日历视口模式；不是字段编辑模式 | `page \| scroll \| line` | `page` |
| `max` | 包含上界，非法的已提供边界不会被静默忽略 | `DateValue` | `undefined` |
| `min` | 包含下界，非法的已提供边界不会被静默忽略 | `DateValue` | `undefined` |
| `model-value` | 外部日期值；undefined 为非受控，null 为显式空值 | `(DateValue \| undefined)[] \| null` | `undefined` |
| `picker-props` | Maple 日期/时间滚轮展示配置，不接管根模型与规则 | `DateWheelOptions` | `{}` |
| `picker-value` | 受控日历视口，不是选中值；范围视口含两个日期 | `DateSelection` | `undefined` |
| `presentation` | Maple 独立面板展示方式 | `calendar \| picker \| calendarPicker` | `calendarPicker` |
| `preview-shortcut` | 悬停/聚焦快捷项时预览，不提交 | `boolean` | `true` |
| `readonly` | 只读面板，不改变候选或提交 | `boolean` | `false` |
| `shortcuts` | 快捷项；值或按需执行的同步值工厂，可含 format/disabled | `DateShortcut[]` | `[]` |
| `shortcuts-position` | 快捷项位置 | `left \| bottom \| right` | `bottom` |
| `show-current` | 仅高亮当前日期，不改变选择或模型 | `boolean` | `true` |
| `show-now-button` | 显示此刻操作；范围能力按各端实际面板定义 | `boolean` | `true` |
| `show-time` | 启用时刻精度和时间选择，可见精度由格式决定 | `boolean` | `false` |
| `time-fields` | 滚轮列及顺序；显式列表决定可见列，不改格式或模型 | `readonly TimePickerField[]`<br>`TimePickerField: 'hour' \| 'minute' \| 'second'` | 按格式推导 |
| `time-zone` | IANA 时区；无效时区不会回退成有效可选值 | `string` | 系统本地时区 |
| `type` | 日期精度；Cedar 支持周/季度，Maple 支持日期/月/年 | `date \| month \| year` | `date` |
| `use-virtual-scroll` | Maple scroll 视口使用虚拟渲染 | `boolean` | `true` |
| `value-format` | 序列化模型格式，支持 Date、timestamp 或格式字符串；独立于 format | `string` | 按精度/时间配置 |

### DateRangePicker Events

字段与面板的完整事件分别见本页对应完整列表。

### DateRangePicker Slots

| 名称      | 说明           | 参数 |
| --------- | -------------- | ---- |
| `actions` | 自定义操作面板 | `-`  |

### 空值识别与阅读空文案

`empty-values` 用于空值识别，`empty-value` 保留原清空输出；`empty-text` 仅在 `read-pretty` 空内容下展示，默认 `'-'`，字段 > FormItem > Form，自定义 read 插槽优先。显式配置 empty-values 后，内置 required 接入该策略，自定义校验仍收到原值。详见[统一说明](#/zh-CN/emptyValues)。

| 参数         | 类型               | 缺省与范围                                            |
| ------------ | ------------------ | ----------------------------------------------------- |
| empty-values | readonly unknown[] | 字段 > FormItem > Form > 组件族默认；完整覆盖，不合并 |
| empty-text   | string             | 字段 > FormItem > Form > '-'；显式 '' 有效            |

以上是字段展示层 API；纯面板不因此新增阅读模式。Form 与 FormItem 提供继承配置。empty-value 的现有类型与默认输出仍按该组件原 API 执行。

日期范围与日期时间范围字段始终只修改当前选中的端点，手动选择和“此刻”均不交换起止值。两端都有值且起止倒置时保留草稿，在底部显示提示并禁用确认，需修正当前端点或点击顶部摘要切换另一端修正。取消丢弃未确认草稿。空表单只选择一个端点时保留草稿并禁用确认；起止两端都完整且合法后才可提交。日期边界、禁用日期／时间及端点锁定继续生效。

### 值与事件

`DateValue = Date | string | number`。无效日期、不完整或逆序范围不能提交。min/max 包含边界，字符串按 value-format 解析，也可直接传 Date 或时间戳。确认时重新校验规则。`disabledTime` 返回 `disabledHours()`、`disabledMinutes(hour)`、`disabledSeconds(hour, minute)` 数字列表。纯面板通过校验后触发 `confirm(value, date(s), text(s))`；字段展开使用 `update:open` / `open-change`。嵌套面板和弹层 props 只配置展示，不能覆盖顶层模型、规则与状态事件。范围 disabled 支持 `[起点禁用, 终点禁用]`，锁定端点不能被清除或修改。

面板编辑草稿，确认才写回；取消或关闭不写回，清除立即提交空值并关闭。DateRange 默认允许手输，设置 `input-editable=false` 可只通过面板选择。四类字段的组合示例见 Date 文档“统一字段与提交”。

### DateRange Props

`input-attrs` 作用于两个直接输入框。例如 `:input-attrs="[{ 'aria-label': '出发' }, { 'aria-label': '返回' }]"` 可分别命名起止输入。值、禁用、只读、占位符、角色和弹层状态由组件管理；公共描述、单项描述和表单错误会合并到对应输入中；组件报错时优先标记无效，否则保留单项 `aria-invalid`。`RangeInputAttributes` 从组件子入口及库根入口导出，包含原生属性和 `Once` 事件类型。

| 参数 | 说明 | 类型 | 缺省说明 |
| --- | --- | --- | --- |
| `before-commit` | 显式字段保存守卫，使用 payload、done、context | `BeforeFieldCommit` | `undefined` |
| `blur-color` | 失焦时的颜色 | `string` | 主题缺省 |
| `clearable` | 允许清除；不会绕过禁用、只读或等待状态 | `boolean` | `true` |
| `date-fields` | 日期滚轮列及顺序；显式列表决定可见列 | `readonly DatePickerField[]`<br>`DatePickerField: 'month' \| 'year' \| 'day'` | 按精度推导 |
| `date-picker-props` | 范围内部日历展示白名单，不覆盖根所有权 | `DateRangeCalendarOptions` | `{}` |
| `date-range-picker-props` | 范围面板展示选项，根拥有模型、规则和类型 | `DateRangePickerOptions` | `{}` |
| `default-open` | 非受控初始开关，仅创建时读取 | `boolean` | `false` |
| `default-value` | 非受控初始值，仅创建时读取 | `(DateValue \| undefined)[]` | `undefined` |
| `disable-confirm` | 选择后立即提交；false 保留草稿待确认 | `boolean` | `false` |
| `disabled` | 禁用整体或分别锁定起止；字段未设时继承 FormItem/Form | `boolean \| boolean[]` | 继承，最终 false |
| `disabled-date` | 返回 true 禁用当前日期，side 为 start/end | `(date: Date, side: DateSide) => boolean`<br>`DateSide: 'end' \| 'start'` | `undefined` |
| `disabled-time` | 按日期与端点返回禁用小时、分钟、秒列表 | `(date: Date, side: DateSide) => DateDisabledTime`<br>`DateSide: 'end' \| 'start'` | `undefined` |
| `edit-mode` | 字段编辑模式；未设时继承 FormItem/Form | `FieldEditMode`<br>`'direct' \| 'popup'` | 继承，最终 popup |
| `empty-text` | 纯阅读模式的空内容文字 | `string` | 继承，最终 '-' |
| `empty-value` | 清空输出或同步工厂，不改变 emptyValues 识别 | `(DateValue \| undefined)[] \| null \| (() => (DateValue \| undefined)[] \| null \| undefined)` | `undefined` |
| `empty-values` | 空值识别列表，覆盖而不合并 | `readonly unknown[]` | 继承/组件族默认 |
| `error` | 字段错误展示；未设时继承 | `boolean` | 继承，最终 false |
| `focus-color` | 聚焦时的颜色 | `string` | 主题缺省 |
| `format` | 显示与手输格式；函数只展示，无反向手输解析 | `string \| ((date: Date) => string)` | 按精度/时间配置 |
| `hint` | 浮动占位提示；存在 Form 外置标签时不浮动 | `boolean` | `true` |
| `input-editable` | 允许手输；不影响面板选择入口 | `boolean` | `true` |
| `input-attrs` | 按顺序设置起点、终点原生输入属性；单项名称优先于公共名称 | `RangeInputAttributes[]` | `undefined` |
| `interactive-mode` | Maple 日历视口模式；不是字段编辑模式 | `page \| scroll \| line` | `page` |
| `line` | 显示外壳边框或底线 | `boolean` | `true` |
| `loading` | 手动加载反馈，不从事件返回值推导 | `boolean` | `false` |
| `loading-mode` | 字段加载展示模式 | `default \| line` | default |
| `max` | 包含上界，非法的已提供边界不会被静默忽略 | `DateValue` | `undefined` |
| `min` | 包含下界，非法的已提供边界不会被静默忽略 | `DateValue` | `undefined` |
| `model-value` | 外部日期值；undefined 为非受控，null 为显式空值 | `(DateValue \| undefined)[] \| null` | `undefined` |
| `open` | 受控编辑层开关 | `boolean` | `undefined` |
| `open-trigger-target` | 点击整个字段或仅图标打开；不限制键盘打开 | `field \| icon` | field |
| `panel-type` | Maple 字段面板形态，独立于 editMode | `calendar \| picker \| calendarPicker` | `calendar` |
| `picker-props` | Maple 日期/时间滚轮展示配置，不接管根模型与规则 | `DateWheelOptions` | `{}` |
| `placeholder` | 范围字符串重复用于两端，数组分别指定；未设跟随 Locale | `string \| string[]` | `undefined` |
| `popup-container` | 编辑层挂载容器，false 保持原位 | `PopupContainer` | 共享容器缺省 |
| `popup-props` | Trigger 展示配置；运行时过滤根状态、模型、规则和控制监听器 | `Record<string, unknown>` | `{}` |
| `read-pretty` | 纯阅读展示，不渲染编辑器；独立于 readonly | `boolean` | 继承，最终 false |
| `readonly` | 只读；字段可聚焦复制，不改值或展开编辑 | `boolean` | 继承，最终 false |
| `separator` | 内容拼接或起止显示的分隔文字，允许空串 | `string` | ` ~ ` |
| `show-now-button` | 显示此刻操作；范围能力按各端实际面板定义 | `boolean` | `true` |
| `show-time` | 启用时刻精度和时间选择，可见精度由格式决定 | `boolean` | `false` |
| `size` | 五档尺寸；字段遵循表单继承 | `ComponentSize`<br>`'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | 继承，最终 md |
| `text-color` | 内容文字颜色 | `string` | 主题缺省 |
| `time-fields` | 滚轮列及顺序；显式列表决定可见列，不改格式或模型 | `readonly TimePickerField[]`<br>`TimePickerField: 'hour' \| 'minute' \| 'second'` | 按格式推导 |
| `time-zone` | IANA 时区；无效时区不会回退成有效可选值 | `string` | 系统本地时区 |
| `type` | 日期精度；Cedar 支持周/季度，Maple 支持日期/月/年 | `date \| month \| year` | `date` |
| `use-virtual-scroll` | Maple scroll 视口使用虚拟渲染 | `boolean` | `true` |
| `value-format` | 序列化模型格式，支持 Date、timestamp 或格式字符串；独立于 format | `string` | 按精度/时间配置 |
| `variant` | 字段外观 | `filled \| outline \| standard` | `standard` |

### DateRange Events

字段与面板的完整事件分别见本页对应完整列表。

### DateRange Methods

| 方法名  | 说明 | 参数 | 返回值 |
| ------- | ---- | ---- | ------ |
| `focus` | 聚焦 | `-`  | `-`    |
| `blur`  | 失焦 | `-`  | `-`    |

## 时区与移动日历

`time-zone` 与 Date 共用 IANA 时区和真实时刻／当地字符串协议。`interactive-mode="scroll"` 支持多月虚拟滚动，`interactive-mode="line"` 展示单周，均支持日期时间及单端点锁定。从字段的开始或结束入口打开面板后，只选择当前端点的日期或时间；锁定入口禁用，另一端保留原始时刻。两端都有值后校验起止顺序。详情见 Date 的时区与多月日历说明。

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

公共 focus/blur 从首次挂载即可调用。focus 会打开可编辑的延迟编辑器，等待其就绪后定位；禁用、只读或纯阅读时不因此打开。blur 只失焦当前目标，不重新打开。保存的方法不会绑定旧编辑器，关闭、切换模式、停用或卸载会取消排队调用。

原生范围输入入口将字符串 placeholder（包括空字符串）应用到两端，数组则按端点保留文案；是否在输入框显示仍遵循 hint。只读原生输入保持可聚焦和复制，但不允许修改、展开或清空。disabled 的全局或单端禁用优先于只读；不改变各编辑模式省略 placeholder 时已有的默认文案。

原生日期范围引用区的 focus/blur 均无参数：首次进入输入组通知 focus，组内两端切换不重复，离开输入组通知 blur，并由 Form 按既有规则处理一次对应通知。只读 click 仍通知原始事件，但不展开或修改；disabled 点击不通知，也不提前消耗 click.once。普通事件监听器返回 Promise 不会产生 busy 或阻止展开，异步提交仍使用显式 before-commit。

### 面板配置

DatePicker 与 DateRangePicker 用于独立日期选择。通过 `show-current` 控制当前日期高亮，使用 `picker-value` 或 `default-picker-value` 设置面板显示的日期。

控制当前日期高亮使用 showCurrent，选择当前按钮使用 showNowButton；定位面板视口使用 pickerValue 或 defaultPickerValue，约束可选值使用 min、max 和 disabledDate。已有的列字段、缩写、滚轮配置、外观和真实面板功能继续保留。loading-icon 没有接通到该面板或日期字段的公共插槽，不列为可用能力。


<!-- date-contract:start -->

### 值与格式

DateValue 为 string、number 或原生 Date。数值按时间戳处理，0 不按空值处理；modelValue=null 是显式空值。范围使用宽数组并允许不完整端点，不把现有协议强制改成二元组；提交仍校验完整性与合法性。Maple 通用 DatePicker/Date 的多选能力不扩展到 Cedar 单值 Props。

属性表列出实际公开集合；继承及按精度说明表示有效缺省，原始 Props 可为 undefined。format 控制显示与手输，valueFormat 控制模型协议。week/quarter 的显示标签与模型格式不同；函数 format 无反向解析，不能据此开启手输。

min/max 包含端点；非法的已提供边界阻止确认，不静默当作未设置。动态收紧规则不清空已有业务模型。disabledDate/disabledTime 是明确校验回调，不是异步事件任务，时间禁用回调返回 DateDisabledTime 的禁用列表。

### 字段事件参数类型

| 事件 | 参数 |
| --- | --- |
| `update:modelValue` | `DateRangeEmits['update:modelValue']` |
| `change` | `DateRangeEmits['change']` |
| `select` | `DateRangeEmits['select']` |
| `clear` | `DateRangeEmits['clear']` |
| `click` | `DateRangeEmits['click']` |
| `focus` | `DateRangeEmits['focus']` |
| `blur` | `DateRangeEmits['blur']` |
| `update:open` | `DateRangeEmits['update:open']` |
| `open-change` | `DateRangeEmits['open-change']` |
| `update:pickerValue` | `DateRangeEmits['update:pickerValue']` |
| `picker-value-change` | `DateRangeEmits['picker-value-change']` |
| `select-shortcut` | `DateRangeEmits['select-shortcut']` |

字段值及视口通知参数使用对应公开 Emits 元组；DateChangeArgs 包含 value、date(s)、text(s)。普通监听器 Promise 不被等待，不驱动 loading。beforeCommit 使用 payload、done、context，payload 含 value/previousValue，context 含 signal/可选 event；返回 undefined 等待 done。

### 面板事件参数类型

独立面板只有下表七类事件，没有旧 preview 事件；导航使用 picker-value-change 和 update:pickerValue。导航、悬停/聚焦快捷预览不等于选中或提交。确认只有通过校验时才通知，选中草稿 select 与正式 change 分开。

| 事件 | 参数 |
| --- | --- |
| `update:modelValue` | `DateRangePickerEmits['update:modelValue']` |
| `change` | `DateRangePickerEmits['change']` |
| `select` | `DateRangePickerEmits['select']` |
| `confirm` | `DateRangePickerEmits['confirm']` |
| `update:pickerValue` | `DateRangePickerEmits['update:pickerValue']` |
| `picker-value-change` | `DateRangePickerEmits['picker-value-change']` |
| `select-shortcut` | `DateRangePickerEmits['select-shortcut']` |

### DateRange Slots / Methods

字段 default 可替换触发区；prefix/selected/suffix 替换相应内容，范围还支持 separator。替换原生控件时保留名称、起止区别及键盘入口。read 接收 { value, text }，suffix-icon 接收 { focus, popupOpen }，clear-icon 接收受保护的 clear(event?)；不直接绕过 emptyValue 或禁用/只读守卫。

actions 的参数为 { confirm, disabled, selectNow, nowDisabled }，两个动作返回 void；没有时间面板的 canConfirm/value 参数。disabled=true 时不能确认。独立面板可以替换整块操作区；托管编辑的最终保存由外层编辑壳负责，面板只贡献辅助操作，不把其 confirm 当作外层保存方法。

此刻能力按面板定义：Cedar 单值面板支持，Cedar 范围面板没有此刻入口；Maple 范围面板对当前端暂存此刻，另一端保留并仍需确认。不要只因 scope 中存在 selectNow 就假定所有模式都支持此刻。

Cedar cell 定制日历格，参数含 date，范围另含 type=start/end；extra 是附加内容。Maple Date/DatePicker 在 page 日历摘要中支持 year({year})、month({year,month})、date({week,year,month,date})、range({choose})、multiple({choose})；后两者按实际模式使用。Maple DateRange/DateRangePicker 不转发这些单值摘要槽，scroll/line 视口也不承诺摘要槽。

loading-icon 尚未接通到日期字段或纯面板，不因底层装饰器支持而列为可用槽。字段 focus(index?)、blur() 委托真实控件；Cedar/直接字段 blur 会关闭字段浮层，Maple 范围持久 reference 的 blur 只清其焦点，不冒充外层 Drawer 关闭。纯面板没有公开 focus/blur 方法。

### 展示配置与日期范围

datePickerProps/dateRangePickerProps 只配置展示，不能覆盖根模型、规则、类型或控制事件；Maple 范围内部 datePickerProps 另用日历白名单。popupProps 保留宽字典入口，推荐公开 DatePopupOptions/DateRangePopupOptions，运行时仍过滤所有者字段。Cedar timePickerProps 只配置内嵌时间展示；Maple 使用 pickerProps 配置滚轮。

范围 placeholder 字符串重复用于两端，数组分别指定起止且缺项为空；readonly 与 disabled 分开，未设置字段值时继承表单。Cedar 范围面板 exchangeTime 只处理交互候选反序：true 连时间交换，false 保留端点时间；不会重排外部模型、手输或快捷值。Maple 未公开该属性。

### 类型导入

```ts
import { DateRange, DateRangePicker, type DateRangeProps, type DateRangePickerProps,
  type DateRangeEmits, type DateRangePickerEmits, type DateValue, type DateSelection,
  type DateChangeArgs, type DateRules, type DateShortcut } from '@maple-design/ui'
```

<!-- date-contract:end -->

## CSS Variables

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-date-range-picker-background` | `var(--mp-sys-color-surface-overlay)` | `background`, `background-color`, `background-image` |
| `--mp-date-range-picker-border-radius` | `var(--mp-date-picker-border-radius, 4px)` | `border-radius` |
| `--mp-date-range-picker-column-label-color` | `var(--mp-color-text-3)` | `color` |
| `--mp-date-range-picker-column-label-font-size` | `var(--mp-internal-temporal-panel-column-label-font-size)` | `font-size` |
| `--mp-date-range-picker-column-label-height` | `var(--mp-internal-temporal-panel-column-label-height)` | `height` |
| `--mp-date-range-picker-quick-time-width` | `var(--mp-internal-temporal-panel-quick-time-width)` | `flex`, `width` |
| `--mp-date-range-picker-summary-active-background` | `var(--mp-internal-temporal-panel-summary-active-background)` | `background` |
| `--mp-date-range-picker-summary-background` | `var(--mp-internal-temporal-panel-summary-background)` | `background` |
| `--mp-date-range-picker-summary-touch-height` | `var(--mp-internal-temporal-panel-touch-height)` | `min-height` |
| `--mp-date-range-picker-value-active-color` | `var(--mp-internal-temporal-panel-summary-active-color)` | `color` |
| `--mp-date-range-picker-value-date-font-size` | `var(--mp-sys-font-size-md)` | `font-size` |
| `--mp-date-range-picker-values-font-weight` | `500` | `font-weight` |
| `--mp-date-range-title-font-size` | `var(--mp-picker-title-font-size, 16px)` | `font-size` |
| `--mp-date-range-title-text-color` | `var(--mp-picker-title-text-color, #555)` | `color` |
| `--mp-date-range-toolbar-height` | `var(--mp-picker-toolbar-height, 44px)` | `height` |
| `--mp-date-range-toolbar-padding` | `var(--mp-picker-toolbar-padding, 0 4px)` | `padding` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-date-range-picker-background: var(--mp-sys-color-surface-overlay);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
