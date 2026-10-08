# Time 时间

### 介绍

表单时间**字段**，点击后底部弹出 `TimePicker`。交互对齐 Select 的 picker 模式：取消丢弃草稿，确认后才写回 `v-model`。

时间范围请使用 [`TimeRange`](/zh-CN/time-range)；纯面板请使用 [`TimePicker`](/zh-CN/time-picker)；时间范围面板请使用 [`TimeRangePicker`](/zh-CN/time-range-picker)。

### 基本使用

```demo
../example/demos/basic-usage.vue
```

### 24 小时制

```demo
../example/demos/hour24.vue
```

### 显示秒

```demo
../example/demos/show-second.vue
```

### 时钟选择器

时钟和滚轮模式下，`min` / `max` 为包含边界的同日时间限制。分钟仍有合法秒数时保持可选；秒数按完整的时、分、秒比较，不会套用其他小时的秒数限制。跨日范围由 TimeRange 的 `show-next-day` 表达，不通过颠倒 min/max 表达。

```demo
../example/demos/clock-presentation.vue
```

### 禁用

```demo
../example/demos/disabled.vue
```

### 只读

```demo
../example/demos/readonly.vue
```

### 搭配 FormItem

```demo
../example/demos/with-form-item.vue
```



禁用 API 与 Cedar 一致：`disabled-hours`、`disabled-minutes`、`disabled-seconds`，不再支持旧 `disabled-time`。两种面板均遵守包含边界的同日 `min/max`；跨日范围使用 `show-next-day`。不显示秒时按秒为 0 判断。打开字段时草稿对齐到最近合法候选，不自动写回外部值；确认前再次校验。无候选时不可确认，运行中修改限制后非法草稿不会提交。

### 滚轮约束与动态禁用

```demo
../example/demos/wheel-limits.vue
```

### AM/PM 与午夜/中午

```demo
../example/demos/ampm.vue
```

### 时分秒步长

```demo
../example/demos/step.vue
```

### 多个独立字段

示例分别展示单时间与范围的模型值。取消只丢弃当前字段的草稿，清除只影响当前字段；各字段不共享模型或草稿。

```demo
../example/demos/multiple-fields.vue
```

`format` 与 Cedar 一致：用于字符串模型的解析、显示和提交格式。默认 `HH:mm:ss`；仅开启 `use12-hours` 时默认 `hh:mm:ss a`。不选秒使用 `HH:mm`，大写 AM/PM 使用 `hh:mm A`，固定文字使用 `[Time] HH:mm`。模型支持格式化字符串、按本地时间读取的 Date 和毫秒时间戳；输出始终为格式化字符串（范围为数组）。非法输入不自动纠正或回写。`min/max` 仍使用 24 小时 `HH:mm[:ss]` 字符串，禁用回调始终接收真实的 0–23 小时。Time 旧 `use-seconds` 和 format 枚举已删除，不保留别名。

### 模型类型与固定文字

```demo
../example/demos/format-model.vue
```

### 默认值与受控值

`defaultValue` 初始化字段/纯面板的非受控值，仅读取一次；后续选择保存在各自实例。传入 `modelValue` 后以父级值为准。字段 `defaultOpen` 只初始化一次；受控 `open` 需父级接收 `update:open`，`open-change(open: boolean)` 通知显隐请求。`clear` 不携带参数。纯面板支持 `disabled`，同时禁用范围两端。

```demo
../example/demos/default-state.vue
```

### 选择与提交

移动端触发器内可用 Enter / ArrowDown 展开，空格在松开时展开，Escape 取消。Tab 从触发器离开时请求关闭但不阻止原生焦点移动；弹层内部由 Popup 管理焦点约束。不监听页面全局键盘，其他输入框、组合输入和自定义按钮不触发这些快捷键。

字段的 `focus` / `blur` 事件均无参数，同一次聚焦或失焦只通知一次；范围两端切换不产生额外整字段事件。只读字段仍可聚焦，但不能展开修改；禁用字段不能聚焦，已聚焦时动态禁用会释放焦点状态并通知失焦。

字段和纯面板提交时按当前格式、步长及禁用规则重新校验；Cedar 手动输入也遵守相同规则。规则变化不会自动改写已提交值。范围提交默认按时间排序，开启 `show-next-day` 保留输入顺序。清空仍提交 `undefined`，不受候选时间限制，但遵守只读/禁用状态。

`select(value, date)` 表示用户选择草稿，`change(value, date)` 表示提交。单值和范围字段清除均返回 `undefined`，对应 Date 参数也为 `undefined`，`clear` 不带参数。Date 参数是本地时间表示（不自动进行次日日期运算）。字段默认确认后提交；`disable-confirm` 开启后有效选择立即提交并请求关闭。范围提交会排序，开启 `show-next-day` 后保留端点顺序。受控 `open` 仍需父级接受更新。独立纯面板同样默认确认后提交；开启 disable-confirm 后立即提交，但不会关闭面板。

```demo
../example/demos/selection-events.vue
```

父级直接替换模型会重置草稿，但不会触发 `select` 或 `change`。示例提供“外部更新”按钮，可与用户选择、确认提交分别观察。

### 纯面板确认与禁用选项

纯面板默认确认后提交：选择时仅发 select，确认后才更新模型并发 change；disable-confirm 开启后有效选择立即提交。hide-disabled-options 默认 false，开启后隐藏禁用项；时钟保留原刻度角度。字段和日期组件内部显式跳过子面板确认，由外层负责提交。外部模型替换会重置草稿，不主动派发事件。

```demo
../example/demos/panel-behavior.vue
```

独立面板直接管理自己的草稿与提交状态。外部替换模型会重置草稿，不触发选择或变更事件；只读、禁用均阻止选择和确认。Cedar 使用列表，Maple 使用滚轮或时钟，展示层不另建一份草稿。

## API

`popup-props` 配置本地 Popup 的定位和外观，Cedar 同名入口配置 Trigger；两端都不能通过它替换 open、disabled 或触发方式，顶层 popup-container（包括 false）优先。面板配置与浮层配置分开。`click(event)` 在非禁用字段点击时通知一次，只读可通知但不展开。关闭统一监听 `open-change(false)`，表示请求而非受控状态已改变；字段 close 事件已移除，不保留别名。

字段图标插槽为 `suffix-icon`，参数为 `focus: boolean`、`popupOpen: boolean`，不再使用 arrow-icon。实例方法 `focus(index = 0)` 聚焦指定端点而不提交值；`blur()` 失焦并请求关闭。

### 字段外壳与配置边界

`hint` 控制浮动提示（Cedar 默认 false，Maple 默认 true），有 Form 外置标签时不启用。`line` 默认 true；`text-color / focus-color / blur-color` 为可选颜色字符串。`error` 未设置时继承 Form，显式 false 覆盖错误态。TimeRange 的 `separator` 默认 ` ~ `，允许空字符串。默认 variant 保留 Cedar filled、Maple standard，可显式指定同一变体。

字段顶层负责值、默认值、展开、格式、步长、边界、禁用规则和只读/禁用状态。请直接在字段上设置这些属性，不放进 timePickerProps/timeRangePickerProps。嵌套配置只允许对应面板的展示属性；不能通过模型/确认/选择事件替换字段流程。类型会拒绝此类配置，运行时也过滤，且不会把嵌套规则作为顶层未设置时的回退。

Maple 的 pickerProps 可配置 optionHeight/optionCount 等外观，不可替换 columns、fieldNames、选中值、toolbar 或展开状态。popupProps 可设置定位、外观和生命周期回调，但不能设置 open/defaultOpen 或覆盖展开更新事件；顶层 popupContainer（包括 false）优先。纯时间面板内部的嵌套配置遵循相同规则。

```demo
../example/demos/field-appearance.vue
```


字段交互由本库的一份实例控制器编排：select 暂存草稿，确认时按当前规则校验后提交并通知 Form。清除通过相同提交路径写入 undefined，再通知 clear；只读、禁用或未开启 clearable 时不能清除。只读仍可聚焦，focus/blur 去重；受控关闭请求尚未被接受时，不会重复提交。

面板主体统一管理草稿和确认，展示内容只渲染这一份状态。上方示例展示 extra 插槽及有效确认次数；重复确认相同值会触发 confirm，不会重复触发 change。

### 时间上下限

`min` / `max` 的类型为 `string`，默认不限制；格式固定为 24 小时制 `HH:mm` 或 `HH:mm:ss`，不受 `format` 或 `use12Hours` 影响，包含端点。`HH:mm` 的秒视为 00。范围的两个端点分别校验；`showNextDay` 不把边界变成跨午夜区间。`min > max` 时没有可提交时间。无法解析的边界按未设置处理。

动态修改边界不会改写外部模型。提交须同时满足边界、步长和禁用回调；不显示秒时按秒为 00 校验。列表粗粒度列在整个小时/分钟都越界时禁用，最终确认仍校验完整时间。隐藏禁用项使用 `hide-disabled-options`。

```demo
../example/demos/bounds.vue
```

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

| 参数                | 说明                                        | 类型                         | 默认值     |
| ------------------- | ------------------------------------------- | ---------------------------- | ---------- |
| `v-model` | 绑定值 | _TimeValue_ | `-` |
| `default-value` | 非受控初始值 | _TimeValue_ | `-` |
| `hide-disabled-options` | 隐藏禁用时间选项，时钟保留刻度位置 | _boolean_ | `false` |
| `open`              | 弹层显隐受控                                | _boolean_                    | `-`        |
| `default-open` | 初始显隐 | _boolean_ | `false` |
| `disable-confirm` | 有效选择后立即提交并请求关闭 | _boolean_ | `false` |
| `presentation`      | 面板模式，可选值 `clock` `picker`           | _string_                     | `picker`   |
| `format` | 字符串解析、显示及输出格式 | _string_ | `HH:mm:ss` |
| `use12-hours` | 十二小时面板；未传 format 时默认 hh:mm:ss a | _boolean_ | `false` |
| `step` | 候选步长以 0 点为起点；无效值回退为 1 | `{ hour?: number; minute?: number; second?: number }` | `{ hour: 1, minute: 1, second: 1 }` |
| `min`               | 可选最小时间                                | _string_                     | `-`        |
| `max`               | 可选最大时间                                | _string_                     | `-`        |
| `disabled-hours` | 返回禁用小时（0–23） | `() => number[]` | `-` |
| `disabled-minutes` | 根据小时返回禁用分钟 | `(hour?: number) => number[]` | `-` |
| `disabled-seconds` | 根据小时、分钟返回禁用秒 | `(hour?: number, minute?: number) => number[]` | `-` |
| `time-picker-props` | 透传给 `mp-time-picker` 的属性              | _Partial\<TimePickerProps\>_ | `{}`       |
| `picker-props`      | 透传给 `mp-picker` 的属性                   | _Partial\<PickerProps\>_     | `{}`       |
| `popup-props`       | 透传给弹窗的属性                            | _Partial\<PopupProps\>_      | `{}`       |
| `placeholder`       | 占位符                                      | _string_                     | `-`        |
| `clearable`         | 是否可清除                                  | _boolean_                    | `false`    |
| `disabled`          | 是否禁用                                    | _boolean_                    | `false`    |
| `readonly`          | 是否只读                                    | _boolean_                    | `false`    |
| `size`              | 尺寸，可选值 `xs` `sm` `md` `lg` `xl`       | _ComponentSize_              | `md`       |
| `variant`           | 风格，可选值 `filled` `standard` `outline` | _string_                     | `standard` |

### 事件

| 事件名   | 说明         | 参数                         |
| -------- | ------------ | ---------------------------- |
| `focus`  | 获得焦点     | `-`                          |
| `blur`   | 失去焦点     | `-`                          |
| `change` | 值提交 | _value: string \| undefined, date: Date \| undefined_ |
| `select` | 用户选择草稿 | _value: string, date: Date_ |
| `clear` | 清除 | `-` |
| `open-change` | 显隐请求 | _open: boolean_ |
| `click` | 非禁用字段点击（只读可通知） | `event: Event` |

## TimePicker 时间面板

> 源码已并入 `time/`，安装父组件时一并注册。静态成员：`Time.Picker`。

### 介绍

时间选择**面板**，默认使用列滚轮，也可切换为时钟面板。

表单字段请使用 [`Time`](/zh-CN/time)；时间范围字段请使用 [`TimeRange`](/zh-CN/time-range)；时间范围面板请使用 [`TimeRangePicker`](/zh-CN/time-range-picker)。

### 基本使用

```demo
../example/demos/picker-basic.vue
```

### 时钟模式

设置 `presentation="clock"` 切换为时钟面板。

```demo
../example/demos/picker-clock.vue
```

### 24小时格式

使用 `format="HH:mm"` 选择时和分。

```demo
../example/demos/picker-hour24.vue
```

### 显示秒

使用 `format="HH:mm:ss"` 显示秒。

时钟模式下，选择完时 / 分 / 秒会自动进入下一项。若要改回某一项，点击标题栏对应的数字即可切换。

```demo
../example/demos/picker-seconds.vue
```

### 只读

```demo
../example/demos/picker-readonly.vue
```

### 时间限制

通过 `min`、`max` 与三个禁用回调共同控制可选时间，时钟和滚轮均生效。

```demo
../example/demos/picker-limit.vue
```

### 操作栏

```demo
../example/demos/picker-actions.vue
```

### API

纯面板属性 `disable-confirm: boolean = false`：跳过确认并立即提交。`actions` 插槽替换默认确认按钮时，请调用插槽提供的 `confirm()`，并使用 `canConfirm` 禁用无效提交。

### 属性

| 参数            | 说明                                                            | 类型                          | 默认值     |
| --------------- | --------------------------------------------------------------- | ----------------------------- | ---------- |
| `v-model` | 绑定值 | _TimeValue_ | `-` |
| `default-value` | 非受控初始值 | _TimeValue_ | `-` |
| `hide-disabled-options` | 隐藏禁用时间选项，时钟保留刻度位置 | _boolean_ | `false` |
| `disabled` | 禁用面板编辑 | _boolean_ | `false` |
| `disable-confirm` | 不显示确认按钮，有效选择立即提交 | _boolean_ | `false` |
| `presentation`  | 面板模式，可选值为 `picker` `clock`                             | _string_                      | `picker`   |
| `picker-props`  | 列滚轮模式下传递给 `Picker` 的属性                              | _object_                      | `-`        |
| `format` | 字符串解析、显示及输出格式 | _string_ | `HH:mm:ss` |
| `color`         | 选择器的颜色                                                    | _string_                      | `-`        |
| `title-color`   | 选择器标题栏背景色，如果未指定，将使用 `color` 属性或默认颜色。 | _string_                      | `-`        |
| `hint`          | 选择器提示语                                                    | _string_                      | `选择时间` |
| `elevation`     | 海拔高度，可选值为 `true` `false` 和 `0-24` 的等级              | _number \| boolean_ | `false`    |
| `min`           | 允许的最小时间（ISO 8601格式）                                  | _string_                      | `-`        |
| `max`           | 允许的最大时间（ISO 8601格式）                                  | _string_                      | `-`        |
| `disabled-hours` | 返回禁用小时（0–23） | `() => number[]` | `-` |
| `disabled-minutes` | 根据小时返回禁用分钟 | `(hour?: number) => number[]` | `-` |
| `disabled-seconds` | 根据小时、分钟返回禁用秒 | `(hour?: number, minute?: number) => number[]` | `-` |
| `readonly`      | 是否只读                                                        | _boolean_                     | `false`    |
| `use12-hours` | 十二小时面板；未传 format 时默认 hh:mm:ss a | _boolean_ | `false` |
| `step` | 候选步长以 0 点为起点；无效值回退为 1 | `{ hour?: number; minute?: number; second?: number }` | `{ hour: 1, minute: 1, second: 1 }` |

### 禁用规则

时钟和滚轮使用相同的三个回调，返回禁用值数组；小时始终为 0–23。无合法下级候选的小时/分钟不出现在滚轮中。

### 事件

| 事件名   | 说明           | 回调参数        |
| -------- | -------------- | --------------- |
| `change` | 值提交 | _value: string \| undefined, date: Date \| undefined_ |
| `select` | 用户选择草稿 | _value: string, date: Date_ |

### 插槽

| 名称      | 说明           | 参数 |
| --------- | -------------- | ---- |
| `actions` | 替换面板确认操作 | _{ confirm: () => void, canConfirm: boolean, value }_ |

### 样式变量

以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

| 变量名                                               | 默认值                      |
| ---------------------------------------------------- | --------------------------- |
| `--time-picker-border-radius`                        | `4px`                       |
| `--time-picker-font-size`                            | `var(--font-size-md)`       |
| `--time-picker-min-width`                            | `290px`                     |
| `--time-picker-title-height`                         | `105px`                     |
| `--time-picker-title-padding`                        | `16px`                      |
| `--time-picker-title-margin-bottom`                  | `8px`                       |
| `--time-picker-title-color`                          | `#fff`                      |
| `--time-picker-title-background`                     | `var(--color-primary)`      |
| `--time-picker-title-hint-color`                     | `'#fff'`                    |
| `--time-picker-title-hint-font-size`                 | `14px`                      |
| `--time-picker-title-hint-min-height`                | `21px`                      |
| `--time-picker-title-inactive-opacity`               | `0.6`                       |
| `--time-picker-title-time-font-size`                 | `50px`                      |
| `--time-picker-title-time-margin`                    | `0 5px`                     |
| `--time-picker-title-time-border-radius`             | `4px`                       |
| `--time-picker-title-time-padding`                   | `4px 6px`                   |
| `--time-picker-title-time-background`                | `rgba(255, 255, 255, 0.12)` |
| `--time-picker-title-time-active-background`         | `rgba(255, 255, 255, 0.28)` |
| `--time-picker-title-time-container-justify-content` | `flex-end`                  |
| `--time-picker-title-ampm-button-active-background`  | `transparent`               |
| `--time-picker-title-ampm-margin-left`               | `10px`                      |
| `--time-picker-title-ampm-border-radius`             | `0`                         |
| `--time-picker-title-ampm-border`                    | `none`                      |
| `--time-picker-title-ampm-button-padding`            | `2px`                       |
| `--time-picker-clock-left`                           | `27px`                      |
| `--time-picker-clock-right`                          | `27px`                      |
| `--time-picker-clock-top`                            | `27px`                      |
| `--time-picker-clock-bottom`                         | `27px`                      |
| `--time-picker-clock-container-width`                | `256px`                     |
| `--time-picker-clock-container-height`               | `256px`                     |
| `--time-picker-clock-container-background`           | `#e0e0e0`                   |
| `--time-picker-clock-hand-height`                    | `calc(50% - 4px)`           |
| `--time-picker-clock-hand-width`                     | `2px`                       |
| `--time-picker-clock-hand-bottom`                    | `50%`                       |
| `--time-picker-clock-hand-left`                      | `calc(50% - 1px)`           |
| `--time-picker-clock-hand-background`                | `var(--color-primary)`      |
| `--time-picker-clock-hand-border-color`              | `var(--color-primary)`      |
| `--time-picker-clock-hand-before-width`              | `10px`                      |
| `--time-picker-clock-hand-before-height`             | `10px`                      |
| `--time-picker-clock-hand-before-border-width`       | `2px`                       |
| `--time-picker-clock-hand-after-width`               | `4px`                       |
| `--time-picker-clock-hand-after-height`              | `4px`                       |
| `--time-picker-clock-item-height`                    | `32px`                      |
| `--time-picker-clock-item-width`                     | `32px`                      |
| `--time-picker-clock-item-active-background`         | `var(--color-primary)`      |
| `--time-picker-clock-item-active-color`              | `var(--color-white)`        |
| `--time-picker-clock-item-disable-color`             | `rgba(0, 0, 0, 0.26)`       |
| `--time-picker-clock-item-disable-background`        | `#bdbdbd`                   |
| `--time-picker-clock-item-text-color`                | `#555`                      |
| `--time-picker-inner-left`                           | `36px`                      |
| `--time-picker-inner-right`                          | `36px`                      |
| `--time-picker-inner-top`                            | `36px`                      |
| `--time-picker-inner-bottom`                         | `36px`                      |
| `--time-picker-body-background`                      | `#fff`                      |
| `--time-picker-body-height`                          | `288px`                     |
| `--time-picker-actions-padding`                      | `0 8px 12px 8px`            |


### 值类型

```ts
export type TimeValue = string | number | Date
```
