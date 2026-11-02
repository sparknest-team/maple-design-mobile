# Time 时间

父级在确认后保持弹层展开时，没有新选择的重复确认不会重复提交；新的时间选择会开启新事务，可以再次确认。

展开时，原生 combobox 通过 `aria-controls` 关联当前实例的命名弹层；关闭后同步更新状态并移除关联。`aria-label`、`aria-describedby` 可传递给原生控件。自定义 selected/触发插槽需自行保留可访问名称、键盘操作和状态关联。

> 源码已并入 `time/`，安装父组件时一并注册。静态成员：`Time.Picker`。

## 基础示例

### 基本使用

```demo
../example/demos/basic-usage.vue
```

## 外观与展示

### 表单控件尺寸对照

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置          | 作用                                        | 相关示例                                                   |
| ------------- | ------------------------------------------- | ---------------------------------------------------------- |
| `format`      | 字符串解析、显示及输出格式                  | 字段外壳与配置边界、时间格式与十二小时制、滚轮可见字段     |
| `placeholder` | 占位符                                      | 表单控件尺寸对照、字段外壳与配置边界、时间格式与十二小时制 |
| `variant`     | 风格，可选值 `filled` `standard` `outline`  | 表单控件尺寸对照、字段外壳与配置边界                       |
| `use12-hours` | 十二小时面板；未传 format 时默认 hh:mm:ss a | 时间格式与十二小时制、AM / PM                              |
| `disabled`    | 是否禁用                                    | 表单控件尺寸对照                                           |
| `readonly`    | 是否只读                                    | 表单控件尺寸对照                                           |

<!-- demo-config-notes:end -->

切换五档 size 和三种字段变体，比较 Input、Button、Select、日期时间及其他单行表单控件的高度。Button 在这里固定使用 outline。DatePicker/TimePicker 是面板，此处使用带输入框的 Date/Time 字段。示例同时展示有值、可清空、标签删除与长标签多选；Select/Cascader 设置 tag-nowrap 时保持同档高度，长标签文字省略、删除图标保留；标签行可横向滚动，清空按钮和箭头固定在外侧。被省略的标签正文支持悬停、键盘聚焦或点按查看完整文字，点外部或按 Esc 关闭，不改变选中值。可清空后恢复选中值重复比较。多行文本和允许换行的多选内容按内容撑高。

```demo
../../field-decorator/example/demos/control-sizes.vue
```

### 字段外壳与配置边界

`hint` 控制浮动提示（Cedar 默认 false，Maple 默认 true），有 Form 外置标签时不启用。`line` 默认 true；`text-color / focus-color / blur-color` 为可选颜色字符串。`error` 未设置时继承 Form，显式 false 覆盖错误态。TimeRange 的 `separator` 默认 `~`，允许空字符串。默认 variant 保留 Cedar filled、Maple standard，可显式指定同一变体。

字段顶层负责值、默认值、展开、格式、步长、边界、禁用规则和只读/禁用状态。请直接在字段上设置这些属性，不放进 timePickerProps/timeRangePickerProps。嵌套配置只允许对应面板的展示属性；不能通过模型/确认/选择事件替换字段流程。类型会拒绝此类配置，运行时也过滤，且不会把嵌套规则作为顶层未设置时的回退。

Maple 的 pickerProps 可配置 optionHeight/optionCount 等外观，不可替换 columns、fieldNames、选中值、toolbar 或展开状态。popupProps 可设置定位、外观和生命周期回调，但不能设置 open/defaultOpen 或覆盖展开更新事件；顶层 popupContainer（包括 false）优先。纯时间面板内部的嵌套配置遵循相同规则。

```demo
../example/demos/field-appearance.vue
```

字段交互由本库的一份实例控制器编排：select 暂存草稿，确认时按当前规则校验后提交并通知 Form。清除通过相同提交路径写入 undefined，再通知 clear；只读、禁用或未开启 clearable 时不能清除。只读仍可聚焦，focus/blur 去重；受控关闭请求尚未被接受时，不会重复提交。

面板主体统一管理草稿和确认，展示内容只渲染这一份状态。上方示例展示 extra 插槽及有效确认次数；重复确认相同值会触发 confirm，不会重复触发 change。

### 时间格式与十二小时制

比较分钟、秒和十二小时显示；注意午夜 12 AM 与中午 12 PM 的区别。值格式和步长边界仍独立展示。

<details>
<summary>配置说明与使用限制</summary>

#### 显示秒

时钟和滚轮模式下，`min` / `max` 为包含边界的同日时间限制。分钟仍有合法秒数时保持可选；秒数按完整的时、分、秒比较，不会套用其他小时的秒数限制。跨日范围由 TimeRange 的 `show-next-day` 表达，不通过颠倒 min/max 表达。

</details>

```demo
../example/demos/format-comparison.vue
```

### 滚轮可见字段

`time-fields` 控制时间滚轮列的显隐及顺序，范围起止两端共用配置，字段与独立面板使用相同属性。

| 属性          | 类型                       | 默认值             | 说明                                                |
| ------------- | -------------------------- | ------------------ | --------------------------------------------------- |
| `time-fields` | readonly TimePickerField[] | 按时间格式协议生成 | 可选 hour、minute、second；也控制日历内的时间滚轮。 |

数组需非空、无重复，显式数组严格决定可见列与顺序；未传属性时采用默认列。两组字段各自校验，不能混用。隐藏字段保留已有值，编辑合并回完整草稿；更改字段配置不会提交主值。嵌套展示配置不能覆盖根属性。

Time/TimeRange 的 format 沿用时间字符串解析、显示、输出协议；time-fields 只控制面板列，不改变该协议。隐藏但存在于模型中的单位保留原值。十二小时制显示 hour 时自动附带 AM/PM。

```demo
../example/demos/time-fields.vue
```

### AM / PM

```demo
../example/demos/ampm-formats.vue
```

## 值模型与选择规则

### 模型类型与固定文字

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置             | 作用                                        | 相关示例                                   |
| ---------------- | ------------------------------------------- | ------------------------------------------ |
| `format`         | 字符串解析、显示及输出格式                  | 模型类型与固定文字、时分秒步长、时间上下限 |
| `disabled-hours` | 返回禁用小时（0–23）                        | 时分秒步长、滚轮约束与动态禁用             |
| `min`            | 可选最小时间                                | 时间上下限、滚轮约束与动态禁用             |
| `max`            | 可选最大时间                                | 时间上下限、滚轮约束与动态禁用             |
| `use12-hours`    | 十二小时面板；未传 format 时默认 hh:mm:ss a | 时分秒步长                                 |
| `step`           | 候选步长以 0 点为起点；无效值回退为 1       | 时分秒步长                                 |

<!-- demo-config-notes:end -->

```demo
../example/demos/format-model.vue
```

### 时分秒步长

十二小时显示与5小时步长组合：步长仍以24小时的0点为起点，合法小时为0/5/10/15/20，而不是在中午重新起算。AM候选12/05/10，PM候选03/08；显示为03 PM时提交模型仍为15:30:00（示例format保持HH:mm:ss）。切换规则不改旧09:30:00，取消也不提交候选对齐值；确认合法候选后才写回。可再开启“禁用15点”叠加disabled-hours回调，此时03 PM不可选而08 PM仍对应20点。“父级接受更新”关闭时只记录提议，不改业务值；重新接受后确认才回写。提议次数不是模型接受次数。其他非整除步长和物理触屏仍需单独验收。

```demo
../example/demos/step.vue
```

### 时间上下限

单值示例收紧下限至10:30:40后，字段仍反显10:30:38、纯面板禁止确认。滚轮跨到31分钟会将秒草稿对齐合法候选，显式选择02并确认后才回写包含上界10:31:02。再打开字段把秒草稿改00并取消，模型仍02；滚轮候选对齐不等于外部模型已提交。此处鼠标/键盘证据不代表物理触屏惯性。

`min` / `max` 的类型为 `string`，默认不限制；格式固定为 24 小时制 `HH:mm` 或 `HH:mm:ss`，不受 `format` 或 `use12Hours` 影响，包含端点。`HH:mm` 的秒视为 00。范围的两个端点分别校验；`showNextDay` 不把边界变成跨午夜区间。`min > max` 时没有可提交时间。无法解析的边界按未设置处理。

动态修改边界不会改写外部模型。提交须同时满足边界、步长和禁用回调；不显示秒时按秒为 00 校验。列表粗粒度列在整个小时/分钟都越界时禁用，最终确认仍校验完整时间。隐藏禁用项使用 `hide-disabled-options`。

```demo
../example/demos/bounds.vue
```

### 滚轮约束与动态禁用

```demo
../example/demos/wheel-limits.vue
```

## 独立时间面板

### 基本使用

```demo
../example/demos/picker-basic.vue
```

### 纯面板确认与禁用选项

纯面板默认确认后提交：选择时仅发 select，确认后才更新模型并发 change；disable-confirm 开启后有效选择立即提交。hide-disabled-options 默认 false，开启后隐藏禁用项；时钟保留原刻度角度。字段和日期组件内部显式跳过子面板确认，由外层负责提交。外部模型替换会重置草稿，不主动派发事件。

单值面板未确认草稿中打开只读、隐藏禁用小时或切立即提交，不会隐式提交旧草稿；解除只读也不提交，下一次有效选择才提交一次。Maple滚轮展示切换保留同一草稿，不回写父模型；鼠标/键盘验收不等于物理触屏惯性行为通过。

```demo
../example/demos/panel-behavior.vue
```

独立面板直接管理自己的草稿与提交状态。外部替换模型会重置草稿，不触发选择或变更事件；只读、禁用均阻止选择和确认。Cedar 使用列表，Maple 使用滚轮，展示层不另建一份草稿。

### 只读

```demo
../example/demos/picker-readonly.vue
```

### 24小时格式

使用 `format="HH:mm"` 选择时和分。

```demo
../example/demos/picker-hour24.vue
```

### 显示秒

使用 `format="HH:mm:ss"` 显示秒。

```demo
../example/demos/picker-seconds.vue
```

### 时间限制

时钟示例显示已提交模型。10:30时的35秒低于下限、45秒被回调禁用，点击均不改变草稿；选择50秒并确认才提交。切换18时并选40分时，秒草稿会对齐到包含上限22秒，但确认前模型不变；25秒不可选。此处说明鼠标刻度选择，不代表真机触屏惯性或全部边界组合。

通过 `min`、`max` 与三个禁用回调共同控制可选时间，时钟和滚轮均生效。

```demo
../example/demos/picker-limit.vue
```

### 操作栏

```demo
../example/demos/picker-actions.vue
```

## 输入与状态控制

### 交互状态对比

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置             | 作用                             | 相关示例                                     |
| ---------------- | -------------------------------- | -------------------------------------------- |
| `format`         | 字符串解析、显示及输出格式       | 交互状态对比、手输与面板选择、默认值与受控值 |
| `clearable`      | 是否可清除                       | 手输与面板选择、默认值与受控值、选择与提交   |
| `readonly`       | 是否只读                         | 交互状态对比、选择与提交、多个独立字段       |
| `disabled`       | 是否禁用                         | 交互状态对比、选择与提交                     |
| `input-editable` | 是否允许手输；关闭后仍可面板选择 | 手输与面板选择、复制与编辑                   |
| `placeholder`    | 占位符                           | 多个独立字段、搭配 FormItem                  |

<!-- demo-config-notes:end -->

在同一实例上切换禁用、只读和错误状态后再操作控件，比较可编辑性和交互反馈。恢复开关位于目标控件外；错误外观本身不会执行校验。

<details>
<summary>配置说明与使用限制</summary>

#### 交互状态切换

适用于选择时间点。调整禁用、只读、错误反馈，用相同数据观察变化。控制区始终可用，可以随时恢复编辑；错误外观本身不会触发表单校验。

</details>

```demo
../example/demos/state-lab.vue
```

### 手输与面板选择

`input-editable` 默认为 `false`（Cedar 为 `true`）。开启后点击输入区手输，点击时钟按钮或按 ↓ 打开 picker/clock 面板。回车或失焦提交，Esc 撤销；格式、步长、边界和禁用规则与面板一致。无效输入或父级拒绝受控更新时回到模型值。切换为不可编辑、只读或禁用会丢弃未提交输入；输入法组合期间以及范围两端切换焦点时不提交。

```demo
../example/demos/text-entry.vue
```

### 介绍

表单时间**字段**，点击后底部弹出 `TimePicker`。交互对齐 Select 的 picker 模式：取消丢弃草稿，确认后才写回 `v-model`。

时间范围请使用 [`TimeRange`](/zh-CN/time-range)；纯面板请使用 [`TimePicker`](/zh-CN/time-picker)；时间范围面板请使用 [`TimeRangePicker`](/zh-CN/time-range-picker)。

### 默认值与受控值

`defaultValue` 初始化字段/纯面板的非受控值，仅读取一次；后续选择保存在各自实例。传入 `modelValue` 后以父级值为准。字段 `defaultOpen` 只初始化一次；受控 `open` 需父级接收 `update:open`，`open-change(open: boolean)` 通知显隐请求。`clear` 不携带参数。纯面板支持 `disabled`，同时禁用范围两端。

```demo
../example/demos/default-state.vue
```

### 选择与提交

移动端触发器内可用 Enter / ArrowDown 展开，空格在松开时展开，Escape 取消。Tab 从触发器离开时请求关闭但不阻止原生焦点移动；inline 使用锚定字段的 popover，点击外部取消草稿。不监听页面全局键盘，其他输入框、组合输入和自定义按钮不触发这些快捷键。

字段的 `focus` / `blur` 事件均无参数，同一次聚焦或失焦只通知一次；范围两端切换不产生额外整字段事件。只读字段仍可聚焦，但不能展开修改；禁用字段不能聚焦，已聚焦时动态禁用会释放焦点状态并通知失焦。

字段和纯面板提交时按当前格式、步长及禁用规则重新校验；手动输入也遵守相同规则。规则变化不会自动改写已提交值。范围始终保留端点顺序，结束早于开始时仅在开启 `show-next-day` 后允许提交，否则底部红字提示并禁用确认。清空仍提交 `undefined`，不受候选时间限制，但遵守只读/禁用状态。

`select(value, date)` 表示用户选择草稿，`change(value, date)` 表示提交。单值和范围字段清除均返回 `undefined`，对应 Date 参数也为 `undefined`，`clear` 不带参数。Date 参数是本地时间表示（不自动进行次日日期运算）。字段默认确认后提交；`disable-confirm` 开启后仅有效选择立即提交并请求关闭，范围不自动排序。受控 `open` 仍需父级接受更新。独立纯面板同样默认确认后提交；开启 disable-confirm 后有效选择立即提交，但不会关闭面板。

```demo
../example/demos/selection-events.vue
```

父级直接替换模型会重置草稿，但不会触发 `select` 或 `change`。示例提供“外部更新”按钮，可与用户选择、确认提交分别观察。

### 多个独立字段

示例分别展示单时间与范围的模型值。取消只丢弃当前字段的草稿，清除只影响当前字段；各字段不共享模型或草稿。

```demo
../example/demos/multiple-fields.vue
```

`format` 与 Cedar 一致：用于字符串模型的解析、显示和提交格式。默认 `HH:mm:ss`；仅开启 `use12-hours` 时默认 `hh:mm:ss a`。仅保存时分使用 `HH:mm`；面板隐藏秒使用 `time-fields="['hour', 'minute']"`，大写 AM/PM 使用 `hh:mm A`，固定文字使用 `[Time] HH:mm`。模型支持格式化字符串、按本地时间读取的 Date 和毫秒时间戳；输出始终为格式化字符串（范围为数组）。非法输入不自动纠正或回写。`min/max` 仍使用 24 小时 `HH:mm[:ss]` 字符串，禁用回调始终接收真实的 0–23 小时。Time 旧 `use-seconds` 和 format 枚举已删除，不保留别名。

### 搭配 FormItem

```demo
../example/demos/with-form-item.vue
```

禁用 API 与 Cedar 一致：`disabled-hours`、`disabled-minutes`、`disabled-seconds`，不再支持旧 `disabled-time`。两种面板均遵守包含边界的同日 `min/max`；跨日范围使用 `show-next-day`。不显示秒时按秒为 0 判断。打开字段时草稿对齐到最近合法候选，不自动写回外部值；确认前再次校验。无候选时不可确认，运行中修改限制后非法草稿不会提交。

### 复制与编辑

通过 open-trigger-target 独立控制打开区域；icon 模式下点击、聚焦和输入不会自动展开。input-editable / filterable 仍负责是否可编辑或搜索。右侧按钮、显式键盘展开和受控 open 可打开面板。

```demo
../example/demos/open-trigger-target.vue
```

### 介绍

表单字段请使用 [`Time`](/zh-CN/time)；时间范围字段请使用 [`TimeRange`](/zh-CN/time-range)；时间范围面板请使用 [`TimeRangePicker`](/zh-CN/time-range-picker)。

### 共享字段加载

`loading` 控制共享字段加载状态；`loading-mode` 为 `default`（指示器）或 `line`（底部不定进度线），默认 `default`。渲染统一由 FieldDecorator 负责，不隐式改变 disabled/readonly；需要禁止编辑时单独设置。

## 阅读方向

继承最近的 `dir="ltr|rtl"`，方向切换不修改时间或提交草稿。小时、分钟、秒等列按阅读顺序排列；左右键沿视觉方向跨列移动焦点。Cedar 的上下键与 Home/End 在当前时间列移动焦点，Enter/Space 选择，禁用项跳过；Maple 滚轮保留上下键和 Home/End 的选值行为。是否即时提交仍由原有确认配置决定。弹层继承字段来源方向。

## API

### 空值识别与阅读空文案

`empty-values` 用于空值识别，`empty-value` 保留原清空输出；`empty-text` 仅在 `read-pretty` 空内容下展示，默认 `'-'`，字段 > FormItem > Form，自定义 read 插槽优先。显式配置 empty-values 后，内置 required 接入该策略，自定义校验仍收到原值。详见[统一说明](#/zh-CN/emptyValues)。

| 参数         | 类型               | 缺省与范围                                            |
| ------------ | ------------------ | ----------------------------------------------------- |
| empty-values | readonly unknown[] | 字段 > FormItem > Form > 组件族默认；完整覆盖，不合并 |
| empty-text   | string             | 字段 > FormItem > Form > '-'；显式 '' 有效            |

以上是字段展示层 API；纯面板不因此新增阅读模式。Form 与 FormItem 提供继承配置。empty-value 的现有类型与默认输出仍按该组件原 API 执行。

`popup-props` 配置锚定字段的 Trigger popover 定位和外观（两端一致）；两端都不能通过它替换 open、disabled 或触发方式，顶层 popup-container（包括 false）优先。面板配置与浮层配置分开。`click(event)` 在非禁用字段点击时通知一次，只读可通知但不展开。关闭统一监听 `open-change(false)`，表示请求而非受控状态已改变；字段 close 事件已移除，不保留别名。

字段图标插槽为 `suffix-icon`，参数为 `focus: boolean`、`popupOpen: boolean`，不再使用 arrow-icon。实例方法 `focus(index = 0)` 聚焦指定端点而不提交值；`blur()` 失焦并请求关闭。

### 纯面板事件与插槽边界

`TimePicker` / `TimeRangePicker` 不管理字段或弹层；`open`、`size`、`variant`、清除和浮层配置应传给 `Time` / `TimeRange`。

- `select(value, date)`：修改草稿。
- `change(value, date)`：有效确认且值变化时触发，并更新模型。
- `confirm(value, date)`：每次有效确认均触发，包括值未变化；`disableConfirm` 模式在有效选择提交时也触发。禁用、只读或无效草稿不会触发。
- `extra`：附加说明内容。
- `actions({ confirm, canConfirm, value })`：替换默认操作栏；`value` 是草稿，调用 `confirm()` 提交，并根据 `canConfirm` 禁用按钮。

单时间事件值为格式化字符串及 Date；范围事件值为对应数组。纯面板不再派发 `open-change`、`update:open` 或 `clear`。

字段使用两端独立同源的 PickerField → FieldDecorator。面板编辑草稿，确认才写回；取消或关闭不写回，清除立即提交空值并关闭。移动端字段不唤起软键盘。四类字段的组合示例见 Date 文档“统一字段与提交”。

### 属性

| 参数                    | 说明                                                                                                             | 类型                                                  | 默认值                              |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | ----------------------------------- |
| `v-model`               | 绑定值                                                                                                           | _TimeValue_                                           | `-`                                 |
| `default-value`         | 非受控初始值                                                                                                     | _TimeValue_                                           | `-`                                 |
| `hide-disabled-options` | 隐藏禁用时间选项，时钟保留刻度位置                                                                               | _boolean_                                             | `false`                             |
| `open`                  | 弹层显隐受控                                                                                                     | _boolean_                                             | `-`                                 |
| `default-open`          | 初始显隐                                                                                                         | _boolean_                                             | `false`                             |
| `open-trigger-target`   | 打开面板的点击区域：field 为整个字段，icon 仅右侧选择按钮。清除、移除等独立操作除外；不影响键盘展开和受控 open。 | `'field' \| 'icon'`                                   | `'field'`                           |
| `disable-confirm`       | 有效选择后立即提交并请求关闭                                                                                     | _boolean_                                             | `false`                             |
| `show-now-button`       | 显示此刻按钮；只更新草稿，仍需确认                                                                               | _boolean_                                             | `true`                              |
| `format`                | 字符串解析、显示及输出格式                                                                                       | _string_                                              | `HH:mm:ss`                          |
| `use12-hours`           | 十二小时面板；未传 format 时默认 hh:mm:ss a                                                                      | _boolean_                                             | `false`                             |
| `step`                  | 候选步长以 0 点为起点；无效值回退为 1                                                                            | `{ hour?: number; minute?: number; second?: number }` | `{ hour: 1, minute: 1, second: 1 }` |
| `min`                   | 可选最小时间                                                                                                     | _string_                                              | `-`                                 |
| `max`                   | 可选最大时间                                                                                                     | _string_                                              | `-`                                 |
| `disabled-hours`        | 返回禁用小时（0–23）                                                                                             | `() => number[]`                                      | `-`                                 |
| `disabled-minutes`      | 根据小时返回禁用分钟                                                                                             | `(hour?: number) => number[]`                         | `-`                                 |
| `disabled-seconds`      | 根据小时、分钟返回禁用秒                                                                                         | `(hour?: number, minute?: number) => number[]`        | `-`                                 |
| `time-picker-props`     | 透传给 `mp-time-picker` 的属性                                                                                   | _Partial\<TimePickerProps\>_                          | `{}`                                |
| `picker-props`          | 透传给 `mp-picker` 的属性                                                                                        | _Partial\<PickerProps\>_                              | `{}`                                |
| `popup-props`           | 透传给弹窗的属性                                                                                                 | _Partial\<TriggerProps\>_                             | `{}`                                |
| `input-editable`        | 是否允许手输；关闭后仍可面板选择                                                                                 | _boolean_                                             | `false`                             |
| `placeholder`           | 占位符                                                                                                           | _string_                                              | `-`                                 |
| `clearable`             | 是否可清除                                                                                                       | _boolean_                                             | `false`                             |
| `disabled`              | 是否禁用                                                                                                         | _boolean_                                             | `false`                             |
| `readonly`              | 是否只读                                                                                                         | _boolean_                                             | `false`                             |
| `size`                  | 尺寸，可选值 `xs` `sm` `md` `lg` `xl`                                                                            | _ComponentSize_                                       | `md`                                |
| `variant`               | 风格，可选值 `filled` `standard` `outline`                                                                       | _string_                                              | `standard`                          |

### 事件

| 事件名        | 说明                         | 参数                                                  |
| ------------- | ---------------------------- | ----------------------------------------------------- |
| `focus`       | 获得焦点                     | `-`                                                   |
| `blur`        | 失去焦点                     | `-`                                                   |
| `change`      | 值提交                       | _value: string \| undefined, date: Date \| undefined_ |
| `select`      | 用户选择草稿                 | _value: string, date: Date_                           |
| `clear`       | 清除                         | `-`                                                   |
| `open-change` | 显隐请求                     | _open: boolean_                                       |
| `click`       | 非禁用字段点击（只读可通知） | `event: Event`                                        |

## 配置清空后的值

`empty-value` 指定当前组件已有清空动作的输出；省略时采用该组件默认返回。具体类型以组件 API 为准。它不改变 empty-values 的识别规则，也不改变 Form reset 的初始值。

## TimePicker API

纯面板属性 `disable-confirm: boolean = false`：跳过确认并立即提交。`actions` 插槽替换默认确认按钮时，请调用插槽提供的 `confirm()`，并使用 `canConfirm` 禁用无效提交。

### 属性

| 参数                    | 说明                                               | 类型                                                  | 默认值                              |
| ----------------------- | -------------------------------------------------- | ----------------------------------------------------- | ----------------------------------- |
| `v-model`               | 绑定值                                             | _TimeValue_                                           | `-`                                 |
| `default-value`         | 非受控初始值                                       | _TimeValue_                                           | `-`                                 |
| `hide-disabled-options` | 隐藏禁用时间选项，时钟保留刻度位置                 | _boolean_                                             | `false`                             |
| `disabled`              | 禁用面板编辑                                       | _boolean_                                             | `false`                             |
| `disable-confirm`       | 不显示确认按钮，有效选择立即提交                   | _boolean_                                             | `false`                             |
| `show-now-button`       | 显示此刻按钮；只更新草稿，仍需确认                 | _boolean_                                             | `true`                              |
| `picker-props`          | 列滚轮模式下传递给 `Picker` 的属性                 | _object_                                              | `-`                                 |
| `format`                | 字符串解析、显示及输出格式                         | _string_                                              | `HH:mm:ss`                          |
| `elevation`             | 海拔高度，可选值为 `true` `false` 和 `0-24` 的等级 | _number \| boolean_                                   | `false`                             |
| `min`                   | 允许的最小时间（ISO 8601格式）                     | _string_                                              | `-`                                 |
| `max`                   | 允许的最大时间（ISO 8601格式）                     | _string_                                              | `-`                                 |
| `disabled-hours`        | 返回禁用小时（0–23）                               | `() => number[]`                                      | `-`                                 |
| `disabled-minutes`      | 根据小时返回禁用分钟                               | `(hour?: number) => number[]`                         | `-`                                 |
| `disabled-seconds`      | 根据小时、分钟返回禁用秒                           | `(hour?: number, minute?: number) => number[]`        | `-`                                 |
| `readonly`              | 是否只读                                           | _boolean_                                             | `false`                             |
| `use12-hours`           | 十二小时面板；未传 format 时默认 hh:mm:ss a        | _boolean_                                             | `false`                             |
| `step`                  | 候选步长以 0 点为起点；无效值回退为 1              | `{ hour?: number; minute?: number; second?: number }` | `{ hour: 1, minute: 1, second: 1 }` |

### 禁用规则

时钟和滚轮使用相同的三个回调，返回禁用值数组；小时始终为 0–23。无合法下级候选的小时/分钟不出现在滚轮中。

### 事件

| 事件名   | 说明         | 回调参数                                              |
| -------- | ------------ | ----------------------------------------------------- |
| `change` | 值提交       | _value: string \| undefined, date: Date \| undefined_ |
| `select` | 用户选择草稿 | _value: string, date: Date_                           |

### 插槽

| 名称      | 说明           | 参数                                                                                                  |
| --------- | -------------- | ----------------------------------------------------------------------------------------------------- |
| `actions` | 替换面板操作栏 | _{ confirm: () => void, canConfirm: boolean, value, selectNow: () => boolean, nowDisabled: boolean }_ |

### 样式变量

以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

| 变量名                          | 默认值                |
| ------------------------------- | --------------------- |
| `--time-picker-border-radius`   | `4px`                 |
| `--time-picker-font-size`       | `var(--font-size-md)` |
| `--time-picker-min-width`       | `290px`               |
| `--time-picker-body-background` | `#fff`                |
| `--time-picker-actions-padding` | `0 8px 12px 8px`      |

### 值类型

```ts
export type TimeValue = string | number | Date
```

### Form 字段展示与确认

本组件支持 `edit-mode`，字段 > FormItem > Form 逐层继承；未指定时为 `popup`，点击值区域打开编辑面板。支持值：`direct / popup`。非 direct 编辑模式通过字段值入口打开编辑面板，并维护单份草稿；确认后才更新 v-model，取消、重置或启用 readPretty 时丢弃草稿。

Maple 使用 edit-mode="popup" 点击值区域打开编辑面板；direct 直接编辑。 readPretty 为纯阅读属性，与 readonly、disabled 独立。

`before-commit(value, { previousValue, signal })` 可拦截弹层保存；FormItem 先校验候选值，失败保持编辑。`open / default-open / update:open` 控制编辑层。`#read="{ value, text }"` 可自定义阅读内容。集中示例见 Form 的“各类字段统一展示”。

日期／时间字段在 inline 下沿用原确认策略；在 popover/popup 中，内部纯面板隐藏确认工具栏，由编辑层提供唯一一组确认／取消。独立 DatePicker、DateRangePicker、TimePicker、TimeRangePicker 保留原有面板 API 和确认行为，不继承 Form 的字段展示。

移动端日期字段通过 `panel-type` 选择日历／滚轮内容；`edit-mode` 仅表示字段编辑方式。独立面板的内容形态以各自 API 为准，不由字段 edit-mode 控制。

`read-pretty` 为独立布尔属性，与 `readonly`、`disabled` 同级；字段 > FormItem > Form 继承，显式 `false` 覆盖父级。默认 `false`。纯阅读不显示编辑器。

### 移动端统一面板

移动端滚轮使用圆角选中带，单时间面板不显示顶部摘要；字段浮层与独立面板使用相同外观。

单时间的“此刻”位于确认区左侧，按当前格式、步长及禁用规则更新草稿，不会提交或关闭弹层。即使开启 `disable-confirm`，点击“此刻”后继续调整滚轮也仍需点击确认；取消则丢弃草稿。可用 `:show-now-button="false"` 隐藏按钮。自定义 `actions` 插槽可使用 `selectNow()` 和 `nowDisabled` 渲染此刻操作。

滚轮上方按实际格式显示时、分、秒列名；十二小时制额外显示 AM/PM，与时间范围面板保持一致。

面板样式变量：

| Token                                        | Default                                                       |
| -------------------------------------------- | ------------------------------------------------------------- |
| `--mp-temporal-panel-inset`                  | `12px`                                                        |
| `--mp-temporal-panel-column-label-height`    | `36px`                                                        |
| `--mp-temporal-panel-column-label-font-size` | `13px`                                                        |
| `--mp-temporal-panel-radius`                 | `12px`                                                        |
| `--mp-time-picker-column-label-height`       | `var(--mp-temporal-panel-column-label-height)`                |
| `--mp-temporal-panel-group-gap`              | `24px`                                                        |
| `--mp-temporal-panel-touch-height`           | `44px`                                                        |
| `--mp-temporal-panel-summary-background`     | `var(--mp-color-fill-1)`                                      |
| `--mp-temporal-panel-selection-background`   | `var(--mp-color-fill-2)`                                      |
| `--mp-temporal-panel-active-background`      | `color-mix(in srgb, var(--mp-color-primary) 8%, transparent)` |

### 透传配置边界核对（F07）

现有 TimePopupPresentationProps 与运行时过滤保持；open/defaultOpen、disabled、trigger、closeOnClickReference、preventFocus 和对应展开更新归字段管理。顶层 popup-container 明确设置时优先，否则嵌套回退，popupClass 合并内部类。inline 展示层固定 popupOffset=4；Maple 还固定 unmountOnClose=true，这些旧类型中的字段不保证能控制最终值。本轮不收窄既有 Time 类型，也不改变运行行为。
