# TimeRange 时间范围

## 基础示例

### 基本使用

点击任一输入打开同屏双组滚轮。编辑只改草稿，确认后才提交。起止输入之间的焦点移动不触发整个字段的 blur。

```demo
../example/demos/basic-usage.vue
```

## 外观与展示

### 字段外壳与配置边界

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置            | 作用                                                                               | 相关示例                                               |
| --------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `format`        | 字符串解析、显示及输出格式                                                         | 字段外壳与配置边界、范围格式与十二小时制、滚轮可见字段 |
| `placeholder`   | 起止占位符；字符串用于两端，数组分别设置                                           | 字段外壳与配置边界、范围格式与十二小时制、自定义分隔符 |
| `clearable`     | 是否可清除                                                                         | 范围格式与十二小时制、自定义分隔符、次日标记           |
| `separator`     | 展示分隔符                                                                         | 字段外壳与配置边界、自定义分隔符                       |
| `show-next-day` | 允许结束早于开始并按次日处理；关闭时逆序草稿显示红字提示并禁用确认，起止始终不交换 | 范围格式与十二小时制、次日标记                         |
| `variant`       | 风格，可选值 `filled` `standard` `outline`                                         | 字段外壳与配置边界                                     |

<!-- demo-config-notes:end -->

`hint` 控制浮动提示（Cedar 与 Maple 默认均为 false），有 Form 外置标签时不启用。`line` 默认 true；`text-color / focus-color / blur-color` 为可选颜色字符串。`error` 未设置时继承 Form，显式 false 覆盖错误态。TimeRange 的 `separator` 默认 `~`，允许空字符串。Cedar 与 Maple 的字段默认均为 outline；可显式指定 filled 或 standard。

字段顶层负责值、默认值、展开、格式、步长、边界、禁用规则和只读/禁用状态。请直接在字段上设置这些属性，不放进 timeRangePickerProps。嵌套配置只允许对应面板的展示属性；不能通过模型/确认/选择事件替换字段流程。类型会拒绝此类配置，运行时也过滤，且不会把嵌套规则作为顶层未设置时的回退。

Maple 的 pickerProps 可配置 optionHeight/optionCount 等外观，不可替换 columns、fieldNames、选中值、toolbar 或展开状态。popupProps 可设置定位、外观和生命周期回调，但不能设置 open/defaultOpen 或覆盖展开更新事件；顶层 popupContainer（包括 false）优先。纯时间面板内部的嵌套配置遵循相同规则。

```demo
../example/demos/field-appearance.vue
```

字段交互由本库的一份实例控制器编排：select 暂存草稿，确认时按当前规则校验后提交并通知 Form。清除通过相同提交路径写入 undefined，再通知 clear；只读、禁用或未开启 clearable 时不能清除。只读仍可聚焦，focus/blur 去重；受控关闭请求尚未被接受时，不会重复提交。

面板主体统一管理草稿和确认，展示内容只渲染这一份状态。上方示例展示 extra 插槽及有效确认次数；重复确认相同值会触发 confirm，不会重复触发 change。

### 范围格式与十二小时制

比较范围的分钟、秒与十二小时制显示，操作起止端点观察格式；跨日判断和值格式独立展示。

```demo
../example/demos/format-comparison.vue
```

### 滚轮可见字段

```demo
../../time/example/demos/time-fields.vue
```

### 自定义分隔符

```demo
../example/demos/separator.vue
```

### 次日标记

当结束时间早于开始时间时，开启 `show-next-day` 会按次日处理并显示「次日」，保持起止顺序。未开启时保留草稿，在底部显示红色提示并禁用确认。“此刻”只更新当前操作的一端，不交换起止。独立面板、内嵌和弹层行为一致。

```demo
../example/demos/next-day.vue
```

此示例开启文本编辑并显示模型，保留 22:00→次日06:00 的端点顺序；清除为 `undefined`，可通过重置按钮恢复。`show-next-day` 表示时间顺序与标签，不将模型自动转换为下一日日期。

## 值模型与选择规则

### 模型类型与固定文字

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置           | 作用                                        | 相关示例                                   |
| -------------- | ------------------------------------------- | ------------------------------------------ |
| `format`       | 字符串解析、显示及输出格式                  | 模型类型与固定文字、时分秒步长、时间上下限 |
| `min`          | 可选最小时间                                | 时间上下限、滚轮约束与动态禁用             |
| `max`          | 可选最大时间                                | 时间上下限、滚轮约束与动态禁用             |
| `presentation` | 面板模式，可选值 `picker`                   | 时分秒步长                                 |
| `use12-hours`  | 十二小时面板；未传 format 时默认 hh:mm:ss a | 时分秒步长                                 |
| `step`         | 候选步长以 0 点为起点；无效值回退为 1       | 时分秒步长                                 |

<!-- demo-config-notes:end -->

```demo
../example/demos/format-model.vue
```

### 时分秒步长

```demo
../example/demos/step.vue
```

可切换十二小时面板，分钟/秒步长保持不变；显式 `HH:mm:ss` 仍决定模型格式，AM/PM 选择转换为对应的 24 小时值。

`format` 与 Cedar 一致：用于字符串模型的解析、显示和提交格式。默认 `HH:mm:ss`；仅开启 `use12-hours` 时默认 `hh:mm:ss a`。仅保存时分使用 `HH:mm`；面板隐藏秒使用 `time-fields="['hour', 'minute']"`，大写 AM/PM 使用 `hh:mm A`，固定文字使用 `[Time] HH:mm`。模型支持格式化字符串、按本地时间读取的 Date 和毫秒时间戳；输出始终为格式化字符串（范围为数组）。非法输入不自动纠正或回写。`min/max` 仍使用 24 小时 `HH:mm[:ss]` 字符串，禁用回调始终接收真实的 0–23 小时。

### 时间上下限

`min` / `max` 的类型为 `string`，默认不限制；格式固定为 24 小时制 `HH:mm` 或 `HH:mm:ss`，不受 `format` 或 `use12Hours` 影响，包含端点。`HH:mm` 的秒视为 00。范围的两个端点分别校验；`showNextDay` 不把边界变成跨午夜区间。`min > max` 时没有可提交时间。无法解析的边界按未设置处理。

动态修改边界不会改写外部模型。提交须同时满足边界、步长和禁用回调；不显示秒时按秒为 00 校验。列表粗粒度列在整个小时/分钟都越界时禁用，最终确认仍校验完整时间。隐藏禁用项使用 `hide-disabled-options`。

```demo
../example/demos/bounds.vue
```

### 滚轮约束与动态禁用

```demo
../example/demos/wheel-limits.vue
```

## 内容与展示

### 搭配 FormItem

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置          | 作用                                     | 相关示例      |
| ------------- | ---------------------------------------- | ------------- |
| `format`      | 字符串解析、显示及输出格式               | 搭配 FormItem |
| `placeholder` | 起止占位符；字符串用于两端，数组分别设置 | 搭配 FormItem |
| `clearable`   | 是否可清除                               | 搭配 FormItem |

<!-- demo-config-notes:end -->

```demo
../example/demos/with-form-item.vue
```

禁用 API 与 Cedar 一致：`disabled-hours`、`disabled-minutes`、`disabled-seconds`，不再支持旧 `disabled-time`。两种面板均遵守包含边界的同日 `min/max`；跨日范围使用 `show-next-day`。不显示秒时按秒为 0 判断。打开字段时草稿对齐到最近合法候选，不自动写回外部值；确认前再次校验。无候选时不可确认，运行中修改限制后非法草稿不会提交。

## 独立时间面板

### 纯面板确认与禁用选项

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置          | 作用                                     | 相关示例   |
| ------------- | ---------------------------------------- | ---------- |
| `format`      | 字符串解析、显示及输出格式               | 列滚轮含秒 |
| `placeholder` | 起止占位符；字符串用于两端，数组分别设置 | 列滚轮含秒 |
| `clearable`   | 是否可清除                               | 列滚轮含秒 |

<!-- demo-config-notes:end -->

纯面板默认确认后提交：选择时仅发 select，确认后才更新模型并发 change；disable-confirm 开启后有效选择立即提交。hide-disabled-options 默认 false，开启后隐藏禁用项；时钟保留原刻度角度。字段和日期组件内部显式跳过子面板确认，由外层负责提交。外部模型替换会重置草稿，不主动派发事件。

```demo
../example/demos/panel-behavior.vue
```

切换只读、隐藏禁用项或开启 `disable-confirm` 不会自动提交此前的草稿；解除只读也不会自动回写。开启立即提交后，下一次合法用户选择才触发提交。只读期间保留当前草稿，禁用项隐藏仅改变候选展示，不代表清空模型。

Maple 在滚轮之间切换时保留起止草稿和当前编辑端，不隐式确认；切换后的展示仍遵守只读。外部替换模型会同步到两种展示，不能保留替换前的旧草稿。

独立面板直接管理自己的草稿与提交状态。外部替换模型会重置草稿，不触发选择或变更事件；只读、禁用均阻止选择和确认。Cedar 使用列表，Maple 使用滚轮，展示层不另建一份草稿。

### 列滚轮含秒

```demo
../example/demos/picker-seconds.vue
```

## 输入与状态控制

### 交互状态对比

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置             | 作用                             | 相关示例                                     |
| ---------------- | -------------------------------- | -------------------------------------------- |
| `format`         | 字符串解析、显示及输出格式       | 交互状态对比、手输与面板选择、默认值与受控值 |
| `clearable`      | 是否可清除                       | 手输与面板选择、默认值与受控值、选择与提交   |
| `disabled`       | 是否禁用                         | 交互状态对比、选择与提交                     |
| `readonly`       | 是否只读                         | 交互状态对比、选择与提交                     |
| `input-editable` | 是否允许手输；关闭后仍可面板选择 | 手输与面板选择、复制与编辑                   |
| `presentation`   | 面板模式，可选值 `picker`        | 默认值与受控值、复制与编辑                   |

<!-- demo-config-notes:end -->

在同一实例上切换禁用、只读和错误状态后再操作控件，比较可编辑性和交互反馈。恢复开关位于目标控件外；错误外观本身不会执行校验。

<details>
<summary>配置说明与使用限制</summary>

#### 交互状态切换

适用于营业时段等时间范围。调整禁用、只读、错误反馈，用相同数据观察变化。控制区始终可用，可以随时恢复编辑；错误外观本身不会触发表单校验。

</details>

```demo
../example/demos/state-lab.vue
```

### 手输与面板选择

`input-editable` 默认为 `false`（Cedar 为 `true`）。开启后点击输入区手输，点击时钟按钮或按 ↓ 打开 picker 面板。回车或失焦提交，Esc 撤销；格式、步长、边界和禁用规则与面板一致。无效输入或父级拒绝受控更新时回到模型值。切换为不可编辑、只读或禁用会丢弃未提交输入；输入法组合期间以及范围两端切换焦点时不提交。

```demo
../example/demos/text-entry.vue
```

### 介绍

表单时间范围**字段**，点击后底部弹出选择面板。交互与 `Time` 一致：取消丢弃草稿，确认后才写回 `v-model`。

弹层内使用 [`TimeRangePicker`](/zh-CN/time-range-picker) 作为选择面板。不显示顶部摘要，左右两组滚轮同时编辑开始和结束时间。

- 默认使用列滚轮面板（时 / 分 / 秒）

### 默认值与受控值

`defaultValue` 初始化字段/纯面板的非受控值，仅读取一次；后续选择保存在各自实例。传入 `modelValue` 后以父级值为准。字段 `defaultOpen` 只初始化一次；受控 `open` 需父级接收 `update:open`，`open-change(open: boolean)` 通知显隐请求。`clear` 不携带参数。纯面板支持 `disabled`，同时禁用范围两端。

```demo
../example/demos/default-state.vue
```

示例可分别拒绝值更新与展开更新：拒绝时保留父级模型/显隐，提案单独显示；重新打开从父级模型恢复。关闭请求不代表父级已接受。

父级拒绝关闭、面板保持展开时，没有新选择的重复确认不会重复提交；再次选择新时间会开启新事务，可重新确认提交。

### 选择与提交

字段的 `focus` / `blur` 事件均无参数，同一次聚焦或失焦只通知一次；范围两端切换不产生额外整字段事件。只读字段仍可聚焦，但不能展开修改；禁用字段不能聚焦，已聚焦时动态禁用会释放焦点状态并通知失焦。

字段和纯面板提交时按当前格式、步长及禁用规则重新校验；手动输入也遵守相同规则。规则变化不会自动改写已提交值。范围始终保留起止顺序；结束早于开始时仅在开启 `show-next-day` 后允许提交，否则底部红字提示并禁用确认。清空仍提交 `undefined`，不受候选时间限制，但遵守只读/禁用状态。

`select(value, date)` 表示用户选择草稿，`change(value, date)` 表示提交。未配置 empty-value 时，单值和范围字段清除返回 `undefined`，对应 Date 参数也为 `undefined`；显式配置时保留允许的清空输出，`clear` 不带参数。Date 参数是本地时间表示（不自动进行次日日期运算）。字段默认确认后提交；`disable-confirm` 开启后仅有效选择立即提交并请求关闭，不允许次日时的逆序草稿仍不能提交。受控 `open` 仍需父级接受更新。独立纯面板同样默认确认后提交；开启 disable-confirm 后有效选择立即提交，但不会关闭面板。

```demo
../example/demos/selection-events.vue
```

父级直接替换模型会重置草稿，但不会触发 `select` 或 `change`。示例提供“外部更新”按钮，可与用户选择、确认提交分别观察。

### 复制与编辑

通过 open-trigger-target 独立控制打开区域；icon 模式下点击、聚焦和输入不会自动展开。input-editable / filterable 仍负责是否可编辑或搜索。右侧按钮、显式键盘展开和受控 open 可打开面板。

```demo
../example/demos/open-trigger-target.vue
```

### 共享字段加载

`loading` 控制共享字段加载状态；`loading-mode` 为 `default`（指示器）或 `line`（底部不定进度线），默认 `default`。渲染统一由 FieldDecorator 负责，不隐式改变 disabled/readonly；需要禁止编辑时单独设置。

## 阅读方向

范围值始终保持 `[开始, 结束]`，LTR/RTL 切换只调整布局，不交换端点或修改跨日语义。时间列与起止面板按阅读顺序排列，左右键沿视觉方向移动焦点，可跨起止时间列；Cedar 上下键移动焦点、Enter/Space 选择，Maple 上下键保留滚轮选值语义。草稿与确认行为沿用原有配置，弹层继承字段来源方向。

## 使用说明

### 编辑与确认

本组件支持 `edit-mode`，字段 > FormItem > Form 逐层继承；未指定时为 `popup`，点击值区域打开编辑面板。支持值：`direct / popup`。非 direct 编辑模式通过字段值入口打开编辑面板，并维护单份草稿；确认后才更新 v-model，取消、重置或启用 readPretty 时丢弃草稿。

Maple 使用 edit-mode="popup" 点击值区域打开编辑面板；direct 直接编辑。 readPretty 为纯阅读属性，与 readonly、disabled 独立。

`before-commit(payload, done, context)` 可拦截弹层保存；FormItem 先校验候选值，失败保持编辑。`open / default-open / update:open` 控制编辑层。`#read="{ value, text }"` 可自定义阅读内容。集中示例见 Form 的“各类字段统一展示”。

日期／时间字段在 inline 下沿用原确认策略；在 popover/popup 中，内部纯面板隐藏确认工具栏，由编辑层提供唯一一组确认／取消。独立 DatePicker、DateRangePicker、TimePicker、TimeRangePicker 保留原有面板 API 和确认行为，不继承 Form 的字段展示。

移动端日期字段通过 `panel-type` 选择日历／滚轮内容；`edit-mode` 仅表示字段编辑方式。独立面板的内容形态以各自 API 为准，不由字段 edit-mode 控制。

`read-pretty` 为独立布尔属性，与 `readonly`、`disabled` 同级；字段 > FormItem > Form 继承，显式 `false` 覆盖父级。默认 `false`。纯阅读不显示编辑器。

### 面板操作

滚轮上方按实际格式显示时、分、秒列名，并与两组滚轮对齐；十二小时制额外显示 AM/PM。不显示顶部摘要和可视的起止提示；左组编辑开始时间，右组编辑结束时间，跨日时在右组滚轮下方显示“次日”。

共享样式变量：


范围面板默认提供“此刻”，初次打开编辑开始时间；操作右侧滚轮后改为编辑结束时间。点击只修改当前端的草稿，另一端保留；即使开启 `disable-confirm`，点击此刻及后续调整仍需确认，取消则丢弃草稿。遵守格式、步长和禁用规则，次日提示与起止校验实时更新。字段、独立面板及弹层行为一致，均可用顶层 `:show-now-button="false"` 隐藏。自定义 `actions` 插槽可使用 `selectNow()` 和 `nowDisabled`。

### 透传配置边界

open/defaultOpen、disabled、trigger、closeOnClickReference、preventFocus 和对应展开更新由时间字段管理。顶层 popup-container 明确设置时优先，否则使用嵌套配置；popupClass 会合并。inline 展示层固定 popupOffset=4；Maple 还固定 unmountOnClose=true，因此嵌套配置中的这些字段不保证能控制最终值。

### 配置说明

面板样式变量见 [`TimeRangePicker`](/zh-CN/time-range-picker)。

## API

### 空值识别与阅读空文案

`empty-values` 用于空值识别，`empty-value` 保留原清空输出；`empty-text` 仅在 `read-pretty` 空内容下展示，默认 `'-'`，字段 > FormItem > Form，自定义 read 插槽优先。显式配置 empty-values 后，内置 required 接入该策略，自定义校验仍收到原值。详见[统一说明](#/zh-CN/emptyValues)。

| 参数         | 类型               | 缺省与范围                                            |
| ------------ | ------------------ | ----------------------------------------------------- |
| empty-values | readonly unknown[] | 字段 > FormItem > Form > 组件族默认；完整覆盖，不合并 |
| empty-text   | string             | 字段 > FormItem > Form > '-'；显式 '' 有效            |

以上是字段展示层 API；纯面板不因此新增阅读模式。Form 与 FormItem 提供继承配置。empty-value 的现有类型与默认输出仍按该组件原 API 执行。

`popup-props` 配置锚定字段的 Trigger popover 定位和外观（两端一致）；两端都不能通过它替换 open、disabled 或触发方式，顶层 popup-container（包括 false）优先。面板配置与浮层配置分开。`click(event)` 在非禁用字段点击时通知一次，只读可通知但不展开。关闭统一监听 `open-change(false)`，表示请求而非受控状态已改变；

字段图标插槽为 `suffix-icon`，参数为 `focus: boolean`、`popupOpen: boolean`，不再使用 arrow-icon。实例方法 `focus(index = 0)` 聚焦起点（0）或终点（1）而不提交值；`blur()` 失焦并请求关闭。

`placeholder` 支持 `string | string[]`：字符串用于两端；数组分别指定起止文案，缺项为空；显式空字符串不会回退默认文案。

### 纯面板事件与插槽边界

`TimePicker` / `TimeRangePicker` 不管理字段或弹层；`open`、`size`、`variant`、清除和浮层配置应传给 `Time` / `TimeRange`。

- `select(value, date)`：修改草稿。
- `change(value, date)`：有效确认且值变化时触发，并更新模型。
- `confirm(value, date)`：每次有效确认均触发，包括值未变化；`disableConfirm` 模式在有效选择提交时也触发。禁用、只读或无效草稿不会触发。
- `extra`：附加说明内容。
- `actions({ confirm, canConfirm, value })`：替换默认操作栏；`value` 是草稿，调用 `confirm()` 提交，并根据 `canConfirm` 禁用按钮。

单时间事件值为格式化字符串及 Date；范围事件值为对应数组。纯面板不再派发 `open-change`、`update:open` 或 `clear`。

面板编辑草稿，确认才写回；取消或关闭不写回，清除立即提交空值并关闭。移动端时间字段不唤起软键盘。四类字段的组合示例见 Date 文档“统一字段与提交”。

### TimeRange Props

`input-attrs` 作用于两个直接输入框。例如 `:input-attrs="[{ 'aria-label': '出发' }, { 'aria-label': '返回' }]"` 可分别命名起止输入。值、禁用、只读、占位符、角色和弹层状态由组件管理；公共描述、单项描述和表单错误会合并到对应输入中；组件报错时优先标记无效，否则保留单项 `aria-invalid`。`RangeInputAttributes` 从组件子入口及库根入口导出，包含原生属性和 `Once` 事件类型。

当 FormItem 的 `label-attrs.for` 明确指向其中一个输入时，未单独命名的起止输入会使用表单标签和本地化的起止名称；`input-attrs` 或字段上的显式无障碍名称优先。旧自定义语言包可提供 `fieldPresentation.rangeStart` 和 `fieldPresentation.rangeEnd`；缺少时回退原日期或时间起止文案。

| 参数 | 说明 | 类型 | 缺省说明 |
| --- | --- | --- | --- |
| `before-commit` | 显式字段保存守卫，使用 payload、done、context | `BeforeFieldCommit` | `undefined` |
| `blur-color` | 失焦时的颜色 | `string` | 主题缺省 |
| `clearable` | 允许清除；不会绕过禁用、只读或等待状态 | `boolean` | `false` |
| `default-open` | 非受控初始开关，仅创建时读取 | `boolean` | `false` |
| `default-value` | 非受控初始值，仅创建时读取 | `TimeValue[]` | `undefined` |
| `disable-confirm` | 有效选择后立即提交；字段还请求关闭 | `boolean` | `false` |
| `disabled` | 禁用交互；字段未设时继承 FormItem/Form | `boolean` | 继承，最终 false |
| `disabled-hours` | 返回禁用小时，小时始终为 0–23 | `() => number[]` | `undefined` |
| `disabled-minutes` | 按已选小时返回禁用分钟 | `(hour?: number) => number[]` | `undefined` |
| `disabled-seconds` | 按已选小时和分钟返回禁用秒 | `(hour?: number, minute?: number) => number[]` | `undefined` |
| `edit-mode` | 字段编辑模式；未设时继承 FormItem/Form | `FieldEditMode`<br>`'direct' \| 'popup'` | 继承，最终 popup |
| `empty-text` | 纯阅读模式的空内容文字 | `string` | 继承，最终 '-' |
| `empty-value` | 清空输出或工厂，不改变空值识别策略 | `TimeValue[] \| null \| (() => TimeValue[] \| null \| undefined)` | `undefined` |
| `empty-values` | 空值识别列表，覆盖而不合并 | `readonly unknown[]` | 继承/组件族默认 |
| `error` | 字段错误展示；未设时继承 | `boolean` | 继承，最终 false |
| `focus-color` | 聚焦时的颜色 | `string` | 主题缺省 |
| `format` | 字符串解析、显示及输出格式；十二小时缺省带 a | `string` | 按 use12Hours |
| `hide-disabled-options` | 隐藏禁用时间选项；时钟保留刻度位置 | `boolean` | `false` |
| `hint` | 浮动占位提示；存在 Form 外置标签时不浮动 | `boolean` | `false` |
| `input-editable` | 允许手输；不影响面板选择入口 | `boolean` | `false` |
| `input-attrs` | 按顺序设置起点、终点原生输入属性；单项名称优先于公共名称 | `RangeInputAttributes[]` | `undefined` |
| `line` | 显示外壳边框或底线 | `boolean` | `true` |
| `loading` | 手动加载反馈，不从事件返回值推导 | `boolean` | `false` |
| `loading-mode` | 字段加载展示模式 | `default \| line` | `default` |
| `max` | 最大可选钟点，HH:mm 或 HH:mm:ss，包含端点 | `string` | `undefined` |
| `min` | 最小可选钟点，HH:mm 或 HH:mm:ss，包含端点 | `string` | `undefined` |
| `model-value` | 外部值；数值和 Date 保留原值，正常提交输出格式化字符串 | `TimeRangeModelValue` | `undefined` |
| `open` | 受控编辑层开关 | `boolean` | `undefined` |
| `open-trigger-target` | 点击整个字段或仅图标打开；不限制键盘打开 | `field \| icon` | `field` |
| `panel-type` | 移动范围字段的面板形态 | `picker` | `picker` |
| `picker-props` | 滚轮展示配置，不能覆盖拥有者模型和规则 | `TimeWheelPresentationProps` | `{}` |
| `placeholder` | 占位文字；范围可使用起止数组 | `string \| string[]` | `undefined` |
| `popup-container` | 编辑层挂载容器，false 保持原位 | `PopupContainer` | 共享容器缺省 |
| `popup-props` | 浮层展示配置，不接管模型、状态和事件 | `TimePopupPresentationProps` | `{}` |
| `read-pretty` | 纯阅读展示，不渲染编辑器；独立于 readonly | `boolean` | 继承，最终 false |
| `readonly` | 只读；字段可聚焦复制，不改值或展开编辑 | `boolean` | 继承，最终 false |
| `separator` | 范围起止之间的分隔文字，允许空串 | `string` | ` ~ ` |
| `show-next-day` | 仅范围：允许结束早于开始并显示次日，不交换起止 | `boolean` | `false` |
| `show-now-button` | 显示此刻操作，只改草稿并要求确认 | `boolean` | `true` |
| `size` | 五档尺寸；字段遵循表单继承 | `ComponentSize`<br>`'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | 继承，最终 md |
| `step` | 以 0 点为起点的时分秒步长，无效步长回退为 1 | `TimeStep` | 有效步长均 1 |
| `text-color` | 内容文字颜色 | `string` | 主题缺省 |
| `time-fields` | 滚轮列及顺序；显式列表决定可见列，不改格式或模型 | `readonly TimePickerField[]`<br>`TimePickerField: 'hour' \| 'minute' \| 'second'` | 按格式推导 |
| `time-range-picker-props` | 范围面板展示配置，根拥有模型、规则和状态 | `TimePanelPresentationProps` | `{}` |
| `use12-hours` | 十二小时面板；小时禁用回调仍用 0–23 | `boolean` | `false` |
| `variant` | 字段外观 | `filled \| outline \| standard` | `outline` |

### TimeRange Events

字段事件完整列表见本页“字段事件与插槽（完整）”。

纯面板属性 `disable-confirm: boolean = false`：跳过确认并立即提交。`actions` 插槽替换默认确认按钮时，请调用插槽提供的 `confirm()`，并使用 `canConfirm` 禁用无效提交。

### TimeRangePicker Props

| 参数 | 说明 | 类型 | 缺省说明 |
| --- | --- | --- | --- |
| `default-value` | 非受控初始值，仅创建时读取 | `TimeValue[]` | `undefined` |
| `disable-confirm` | 有效选择后立即提交；字段还请求关闭 | `boolean` | `false` |
| `disabled` | 禁用面板选择和确认 | `boolean` | `false` |
| `disabled-hours` | 返回禁用小时，小时始终为 0–23 | `() => number[]` | `undefined` |
| `disabled-minutes` | 按已选小时返回禁用分钟 | `(hour?: number) => number[]` | `undefined` |
| `disabled-seconds` | 按已选小时和分钟返回禁用秒 | `(hour?: number, minute?: number) => number[]` | `undefined` |
| `elevation` | 面板阴影等级，false 关闭 | `boolean \| number` | `false` |
| `format` | 字符串解析、显示及输出格式；十二小时缺省带 a | `string` | 按 use12Hours |
| `hide-disabled-options` | 隐藏禁用时间选项；时钟保留刻度位置 | `boolean` | `false` |
| `max` | 最大可选钟点，HH:mm 或 HH:mm:ss，包含端点 | `string` | `undefined` |
| `min` | 最小可选钟点，HH:mm 或 HH:mm:ss，包含端点 | `string` | `undefined` |
| `model-value` | 面板外部值，初始化草稿并响应后续变化 | `TimeValue[]` | `undefined` |
| `picker-props` | 滚轮展示配置，不能覆盖拥有者模型和规则 | `TimeWheelPresentationProps` | `{}` |
| `presentation` | 移动范围独立面板的展示方式 | `picker` | `picker` |
| `readonly` | 只读面板，不改草稿或确认 | `boolean` | `false` |
| `show-next-day` | 仅范围：允许结束早于开始并显示次日，不交换起止 | `boolean` | `false` |
| `show-now-button` | 显示此刻操作，只改草稿并要求确认 | `boolean` | `true` |
| `step` | 以 0 点为起点的时分秒步长，无效步长回退为 1 | `TimeStep` | 有效步长均 1 |
| `time-fields` | 滚轮列及顺序；显式列表决定可见列，不改格式或模型 | `readonly TimePickerField[]`<br>`TimePickerField: 'hour' \| 'minute' \| 'second'` | 按格式推导 |
| `use12-hours` | 十二小时面板；小时禁用回调仍用 0–23 | `boolean` | `false` |

### 禁用规则

时钟和滚轮使用相同的三个回调，返回禁用值数组；小时始终为 0–23。无合法下级候选的小时/分钟不出现在滚轮中。

### TimeRangePicker Events

面板事件完整列表见本页“纯面板事件（完整）”。

### TimeRangePicker Slots

| 名称      | 说明             | 参数                                                  |
| --------- | ---------------- | ----------------------------------------------------- |
| `actions` | 替换面板确认操作 | _{ confirm: () => boolean, canConfirm: boolean, value }_ |

## Types

### 值类型

```ts
export type TimeValue = string | number | Date
```

## TimeRangePicker 时间范围面板

安装 TimeRange 时会一并注册 TimeRangePicker，也可通过静态成员 `TimeRange.Picker` 使用。

### 介绍

时间范围选择**面板**，可单独嵌入页面使用。不显示顶部摘要，左右两组滚轮同时编辑开始和结束时间。

- 默认使用列滚轮面板（时 / 分 / 秒）

表单字段请使用 [`TimeRange`](/zh-CN/time-range)；单时间面板请使用 [`TimePicker`](/zh-CN/time-picker)。

### 基本使用

```html
<script setup>
  import { ref } from 'vue'

  const range = ref(['09:00', '18:00'])
</script>

<template>
  <mp-time-range-picker format="HH:mm" v-model="range" />
</template>
```

### 24小时格式与秒

```html
<script setup>
  import { ref } from 'vue'

  const range = ref(['09:00:00', '18:00:00'])
</script>

<template>
  <mp-time-range-picker format="HH:mm:ss" v-model="range" />
</template>
```

### 只读

```html
<script setup>
  import { ref } from 'vue'

  const range = ref(['09:00', '18:00'])
</script>

<template>
  <mp-time-range-picker format="HH:mm" v-model="range" readonly />
</template>
```

### 次日标记

```html
<script setup>
  import { ref } from 'vue'

  const range = ref(['22:00', '06:00'])
</script>

<template>
  <mp-time-range-picker format="HH:mm" v-model="range" show-next-day />
</template>
```

开启 `show-next-day` 后，结束早于开始时按次日处理并显示「次日」。关闭时在底部红字提示并禁用确认。选择和确认均不交换起止；“此刻”只更新当前端。

### 操作栏

```html
<script setup>
  import { ref } from 'vue'

  const range = ref(['09:00', '18:00'])
</script>

<template>
  <mp-time-range-picker format="HH:mm" v-model="range">
    <template #actions="{ confirm, canConfirm }">
      <mp-button status="primary" variant="text" :disabled="!canConfirm" @click="confirm">确认</mp-button>
    </template>
  </mp-time-range-picker>
</template>
```

## 配置清空后的值

`empty-value` 指定当前组件已有清空动作的输出；省略时采用该组件默认返回。具体类型以组件 API 为准。它不改变 empty-values 的识别规则，也不改变 Form reset 的初始值。

## 滚轮可见字段

`time-fields` 控制时间滚轮列的显隐及顺序，范围起止两端共用配置，字段与独立面板使用相同属性。

| 属性          | 类型                       | 默认值             | 说明                                                |
| ------------- | -------------------------- | ------------------ | --------------------------------------------------- |
| `time-fields` | readonly TimePickerField[]<br>`TimePickerField: 'hour' \| 'minute' \| 'second'` | 按时间格式协议生成 | 可选 hour、minute、second；也控制日历内的时间滚轮。 |

数组需非空、无重复，显式数组严格决定可见列与顺序；未传属性时采用默认列。两组字段各自校验，不能混用。隐藏字段保留已有值，编辑合并回完整草稿；更改字段配置不会提交主值。嵌套展示配置不能覆盖根属性。

Time/TimeRange 的 format 沿用时间字符串解析、显示、输出协议；time-fields 只控制面板列，不改变该协议。隐藏但存在于模型中的单位保留原值。十二小时制显示 hour 时自动附带 AM/PM。

```vue
../../time/example/demos/time-fields.vue
```

公共 focus/blur 从首次挂载即可调用。focus 会打开可编辑的延迟编辑器，等待其就绪后定位；禁用、只读或纯阅读时不因此打开。blur 只失焦当前目标，不重新打开。保存的方法不会绑定旧编辑器，关闭、切换模式、停用或卸载会取消排队调用。

延迟编辑中，清空会保留配置的合法 empty-value，确认后提交该空值；例如 null 不会被重新替换成午夜。首次创建的空滚轮面板可以初始化可视候选，但这不是用户选择，也不提交模型；同一面板之后明确清空的草稿不再自动补候选。重新打开后取消不会额外提交。

### 字段通知与公开类型

字段 update:modelValue/change 使用 TimeModelValue（范围字段为 TimeRangeModelValue）：普通选择提交格式化字符串，显式清空可保留 null、时间戳、Date 或范围数组等属性允许的配置值。清空的辅助 Date 可以是 undefined；范围为空数组时辅助值也是空数组。清空不发送 select，select 仍表示用户选择的格式化草稿，范围选择可以暂时不完整。

导出 TimeEmits、TimeModelValue、TimeReadScope、TimeSuffixIconScope、TimeSlots、TimeActionsScope、TimeExpose，以及对应的 TimeRangeEmits、TimeRangeModelValue、TimeRangeReadScope、TimeRangeSlots、TimeRangeActionsScope、TimeRangeExpose。根入口与各自子入口均可导入，实例关联公开 Expose。

字段 read 接收 { value, text }，保留 nullable 模型；suffix-icon 接收 { focus, popupOpen }；clear-icon 接收受保护的 clear(event?)。范围字段还支持 separator。Cedar 的 direct 模式支持 default 自定义触发区，Maple 不支持该槽；两端尚未接通字段 loading-icon，不在类型中承诺。actions/extra 属于面板草稿：Cedar direct 转发，Maple direct 不转发、延迟编辑转发，不把内层 confirm 当作外层最终保存入口。


<!-- time-contract:start -->

### 属性缺省与格式

属性表的继承、按格式或有效步长说明是有效缺省，原始 Props 可为 undefined。format 未设置时为 HH:mm:ss，use12Hours=true 时为 hh:mm:ss a。时间边界使用 24 小时钟点，不使用日期族的 valueFormat 或时区协议。

### 字段事件与插槽参数类型

事件只通知，不收集监听器 Promise。update:modelValue 与 change 包含当前清空策略允许的 null、0、Date 或范围数组；select 只表示格式化草稿，不把选择等同于保存。字段 update:open/open-change 表示开关请求，初始化不自动通知。

| 事件 | 参数 |
| --- | --- |
| `update:modelValue` | `TimeRangeModelValue` |
| `change` | `TimeRangeModelValue, (Date \| undefined)[] \| undefined` |
| `select` | `(string \| undefined)[] \| undefined, (Date \| undefined)[] \| undefined` |
| `clear` | `()` |
| `click` | `Event` |
| `focus` | `()` |
| `blur` | `()` |
| `update:open` | `boolean` |
| `open-change` | `boolean` |

字段 focus(index?)、blur() 作用于真实输入或触发区，不改变模型。read 插槽接收 value、text；suffix-icon 接收 focus、popupOpen；clear-icon 接收受保护的 clear(event?)。prefix、selected、suffix 和 extra 无作用域参数，范围另有 separator。Cedar direct 模式支持 default 自定义触发区；Maple 不支持。

actions 和 extra 属于面板草稿，Cedar direct 转发；Maple direct 不转发，延迟编辑转发。面板 confirm() 不是外层字段最终保存入口。纯面板只有 actions/extra 插槽，没有字段 read、clear-icon 或 loading-icon 插槽；独立面板没有公开 ref.confirm() 方法，定制确认使用 actions.confirm。

### 面板事件参数类型

参数为对应公开事件类型的元组；日期参数由格式化钟点解析，不承诺保留输入 Date 的原日期。

| 事件 | 参数 |
| --- | --- |
| `update:modelValue` | `TimeRangePickerEmits['update:modelValue']` |
| `change` | `TimeRangePickerEmits['change']` |
| `select` | `TimeRangePickerEmits['select']` |
| `confirm` | `TimeRangePickerEmits['confirm']` |

### 面板事件

纯面板业务事件为 update:modelValue、change、select、confirm。select 通知候选，确认有效后通知 confirm；值实际改变时才通知 update:modelValue 和 change。关闭、清空、焦点等字段事件不属于纯面板。

面板 actions 的完整作用域如下；extra 无参数。

```ts
import type { TimeValue } from '@maple-design/ui-vue'
type PanelActionsScope = { confirm: () => boolean; canConfirm: boolean; value: Array<TimeValue | undefined> | undefined; selectNow: () => boolean; nowDisabled: boolean }
```

### 显式保存守卫

beforeCommit(payload, done, context) 仅属于字段保存。payload 含 value、previousValue，context 含 signal 和可选 event。返回 undefined 等待 done；返回 boolean 或 Promise 按结果结算。FormItem 先校验候选；失败保留草稿。普通 select、change、confirm 和 click 监听器返回值不会执行该任务协议。

### 类型导入

```ts
import { TimeRange, TimeRangePicker, type TimeRangeProps, type TimeRangeEmits,
  type TimeRangeSlots, type TimeRangeInstance, type TimeRangePickerProps,
  type TimeRangePickerEmits, type TimeRangePickerSlots } from '@maple-design/ui-vue'
```

<!-- time-contract:end -->

## CSS Variables

以下为组件使用的 css 变量，可以使用 [ThemeProvider 组件](#/zh-CN/theme-provider) 进行样式定制。

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-time-range-picker-background` | `var(--mp-sys-color-surface-overlay)` | `background`, `background-image` |
| `--mp-time-range-picker-border-radius` | `var(--mp-time-picker-border-radius, 4px)` | `border-radius` |
| `--mp-time-range-picker-column-label-height` | `var(--mp-internal-temporal-panel-column-label-height)` | `height` |
| `--mp-time-range-picker-next-day-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-time-range-title-font-size` | `var(--mp-picker-title-font-size, 16px)` | `font-size` |
| `--mp-time-range-title-text-color` | `var(--mp-picker-title-text-color, #555)` | `color` |
| `--mp-time-range-toolbar-height` | `var(--mp-picker-toolbar-height, 44px)` | `height` |
| `--mp-time-range-toolbar-padding` | `var(--mp-picker-toolbar-padding, 0 4px)` | `padding` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-time-range-picker-background: var(--mp-sys-color-surface-overlay);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
