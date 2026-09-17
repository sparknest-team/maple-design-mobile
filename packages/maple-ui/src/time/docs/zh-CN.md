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

## API

### 属性

| 参数                | 说明                                        | 类型                         | 默认值     |
| ------------------- | ------------------------------------------- | ---------------------------- | ---------- |
| `v-model`           | 绑定值（`HH:mm` 或 `HH:mm:ss`）             | _string_                     | `-`        |
| `open`              | 弹层显隐受控                                | _boolean_                    | `-`        |
| `presentation`      | 面板模式，可选值 `clock` `picker`           | _string_                     | `picker`   |
| `format`            | 展示格式，可选值 `ampm` `24hr`              | _string_                     | `ampm`     |
| `use-seconds`       | 是否选择秒                                  | _boolean_                    | `false`    |
| `min`               | 可选最小时间                                | _string_                     | `-`        |
| `max`               | 可选最大时间                                | _string_                     | `-`        |
| `disabled-time`     | 禁用的时间（回调返回 true 表示禁用）        | _DisabledTime_               | `-`        |
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
| `change` | 确认后值变化 | _value: string \| undefined_ |
| `clear`  | 清除         | _value: undefined_           |
| `close`  | 弹层关闭     | _value: string \| undefined_ |

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

使用 `format` 属性切换选择器的时间格式，`format` 默认值为 `ampm`。

```demo
../example/demos/picker-hour24.vue
```

### 显示秒

使用 `use-seconds` 属性显示秒。

时钟模式下，选择完时 / 分 / 秒会自动进入下一项。若要改回某一项，点击标题栏对应的数字即可切换。

```demo
../example/demos/picker-seconds.vue
```

### 只读

```demo
../example/demos/picker-readonly.vue
```

### 时间限制

通过 `min`、`max` 和 `disabled-time` 属性来控制可选择的时间范围（`disabled-time` 回调返回 `true` 表示禁用）。

```demo
../example/demos/picker-limit.vue
```

### 操作栏

```demo
../example/demos/picker-actions.vue
```

### API

### 属性

| 参数            | 说明                                                            | 类型                          | 默认值     |
| --------------- | --------------------------------------------------------------- | ----------------------------- | ---------- |
| `v-model`       | 被选择的时间（ISO 8601 格式，`HH:mm` 或 `HH:mm:ss`）            | _string_                      | `-`        |
| `presentation`  | 面板模式，可选值为 `picker` `clock`                             | _string_                      | `picker`   |
| `picker-props`  | 列滚轮模式下传递给 `Picker` 的属性                              | _object_                      | `-`        |
| `format`        | 选择器时间格式，可选值为 `ampm 24hr`                            | _string_                      | `ampm`     |
| `color`         | 选择器的颜色                                                    | _string_                      | `-`        |
| `title-color`   | 选择器标题栏背景色，如果未指定，将使用 `color` 属性或默认颜色。 | _string_                      | `-`        |
| `hint`          | 选择器提示语                                                    | _string_                      | `选择时间` |
| `elevation`     | 海拔高度，可选值为 `true` `false` 和 `0-24` 的等级              | _number \| boolean_ | `false`    |
| `min`           | 允许的最小时间（ISO 8601格式）                                  | _string_                      | `-`        |
| `max`           | 允许的最大时间（ISO 8601格式）                                  | _string_                      | `-`        |
| `disabled-time` | 禁用的时间（回调返回 true 表示禁用）                            | _DisabledTime_                | `-`        |
| `readonly`      | 是否只读                                                        | _boolean_                     | `false`    |
| `use-seconds`   | 是否显示秒                                                      | _boolean_                     | `false`    |

### TimePicker DisabledTime

| 参数      | 说明                                  | 类型                          | 默认值 |
| --------- | ------------------------------------- | ----------------------------- | ------ |
| `hours`   | 是否禁用该 `hour`（返回 true 禁用）   | _Function: hour => boolean_   | `-`    |
| `minutes` | 是否禁用该 `minute`（返回 true 禁用） | _Function: minute => boolean_ | `-`    |
| `seconds` | 是否禁用该 `second`（返回 true 禁用） | _Function: second => boolean_ | `-`    |

### 事件

| 事件名   | 说明           | 回调参数        |
| -------- | -------------- | --------------- |
| `change` | 时间变化时触发 | `value: string` |

### 插槽

| 名称      | 说明           | 参数 |
| --------- | -------------- | ---- |
| `actions` | 自定义操作面板 | `-`  |

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
