# 复选框

### 介绍

在一组备选项中进行多选。

### 基本使用

```demo
../example/demos/basic-usage.vue
```

### 设置状态值

```demo
../example/demos/set-state.vue
```

### 修改图标和颜色

```demo
../example/demos/set-style.vue
```

### 禁用

```demo
../example/demos/disabled.vue
```

### 只读

```demo
../example/demos/readonly.vue
```

### 不确定状态

```demo
../example/demos/indeterminate.vue
```

### 复选框组

在复选框组中，必须给 `checkbox` 设置 `value` 用来标识，
复选框组会收集所有选择的标识。

```demo
../example/demos/checkbox-group.vue
```

### 选项式 API

通过 `options` 属性设置子元素。

```demo
../example/demos/checkbox-group-options.vue
```

### 自定义字段

通过 `field-names` 属性自定义 `options` 中数据的格式。

```demo
../example/demos/custom-fields.vue
```

### 垂直布局

```demo
../example/demos/vertical.vue
```

### 最大选中数量

在复选框组中，可以通过设置 `max` 属性来限制最大选中数量。

> 复选框及复选框组的表单校验请使用 [FormItem 组件](#/zh-CN/form-item)。

```demo
../example/demos/max.vue
```

### 分组状态与只读

`model-value !== undefined` 表示受控，父级不回写时保留原值；`default-value` 只初始化非受控值。分组内只由 Group 发出 `update:model-value → change(value, event?)`，并通知 FormItem 一次，子项不重复发值变化事件。
Group 的 `disabled`、`readonly`、`error` 未设置时继承表单，显式 `false` 可以覆盖表单；子项不能绕过 Group 的禁用或只读限制。

```demo
../example/demos/group-state.vue
```

### 异步选项

选项载入、移除和外部值更新均不会反向触发值变化；未载入的已选值不会自动清理。达到 max 仍可取消已选项；外部超限值不会自动裁剪。

```demo
../example/demos/async-options.vue
```

### 独立值模型与方法

Checkbox 的布尔模型始终返回 boolean；数组模型按 value 增删选项，不修改传入数组。indeterminate 只用于展示，由业务方计算，不会自动回写。
两端统一使用 `default-value` 初始化非受控值；受控提议被拒绝时保持原值。用户选择按 `update:model-value → change(value, event?)` 通知，命令式调用的 event 为 undefined。
提供 `toggle(checked?: boolean)`、`focus(options?)`、`blur()`。禁用禁止选择和聚焦，只读允许聚焦、禁止改值。Enter 按下与空格释放激活当前控件，长按不重复激活，失焦/停用会取消待处理的空格操作。

```demo
../example/demos/control-value.vue
```

### 选项数据与标签

两端均支持原始值或对象选项。`field-names` 映射 `label/value/disabled/readonly/indeterminate`；只读选项允许聚焦但不能改值，Checkbox 的半选仅用于展示。
`label` 插槽接收 `{ data, checked }`，优先于标签渲染函数 `(data, checked) => VNodeChild`。data 为保留业务字段的归一化副本，不修改输入对象；未提供标签时显示值的文字。
显式传入 `options` 时替代默认插槽，包括 `[]`；不传时使用默认插槽。选项值限字符串、有限数字或布尔值；缺失/非法值及同类型重复值被忽略（保留第一项）。`false`、`0`、`''` 和 `'0'` 是不同选项。异步选项变更不反向修改模型。
CheckboxGroup 使用 `ChoiceValue[]`，`max` 只接受 number，请使用 `:max="2"`。

```demo
../example/demos/option-data.vue
```

### 分组批量方法

两端提供 `checkAll()` 和 `inverseAll()`，返回独立数组副本。仅操作已挂载且可编辑的子项，保留禁用、只读及未加载的已选值；重复值只要有一项被锁定，该值就不参与批量修改。
`checkAll` 保留原模型顺序，按当前 DOM 顺序追加未选值；`inverseAll` 先移除可编辑的已选值，再按 DOM 顺序加入此前未选值。新增选择遵守 `max`，不裁剪外部传入的超限值。
受控模式返回提议，需父级回写；拒绝的提议不保存。分组禁用/只读时只返回当前值副本。有实际变化才按 `update:model-value → change(value, undefined) → FormItem` 通知一次，无变化不发事件。
子项重排、挂载、卸载及 KeepAlive 激活/停用会同步更新候选；变更渲染子项后应等待 `nextTick` 再调用方法。

```demo
../example/demos/group-methods.vue
```

## API

`ChoiceValue = string | number | boolean`；`CheckboxModel = boolean | ChoiceValue[]`；`RadioModel = ChoiceValue | null`。

### 属性

#### CheckboxGroup Props

| 参数                   | 说明                                       | 类型                                       | 默认值       |
| ---------------------- | ------------------------------------------ | ------------------------------------------ | ------------ |
| model-value (v-model) | 受控值 | ChoiceValue[] | undefined |
| default-value | 非受控初始值 | ChoiceValue[] | [] |
| `disabled` | 禁用，未设置时继承表单 | _boolean_ | `undefined` |
| `readonly` | 只读，未设置时继承表单 | _boolean_ | `undefined` |
| `error` | 错误态，未设置时继承表单 | _boolean_ | `undefined` |
| max | 最多可选数量 | number | undefined |
| `direction`            | 布局方向，可选值为 `horizontal` `vertical` | _string_                                   | `horizontal` |
| options | 选项；传入时替代默认插槽 | Array<ChoiceValue \| CheckboxOption \| Record<string, unknown>> | undefined |
| field-names | 选项字段映射 | ChoiceFieldNames | undefined |

#### CheckboxOption

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| value | 选项标识 | ChoiceValue |
| label | 标签或渲染函数 | VNodeChild \| (data: CheckboxOption, checked: boolean) => VNodeChild |
| disabled | 禁用 | boolean |
| readonly | 只读 | boolean |
| indeterminate | 仅展示半选状态 | boolean |


#### Checkbox Props

| 参数              | 说明                               | 类型               | 默认值  |
| ----------------- | ---------------------------------- | ------------------ | ------- |
| model-value (v-model) | 受控值 | boolean \| ChoiceValue[] | undefined |
| default-value | 非受控初始值 | boolean \| ChoiceValue[] | false |
| value | 选项标识 | string \| number \| boolean | true |
| `checked-color`   | 选中状态的颜色                     | _string_           | `-`     |
| `unchecked-color` | 未选中状态的颜色                   | _string_           | `-`     |
| `icon-size`       | 图标尺寸                           | _string \| number_ | `-`     |
| `disabled` | 未设置时继承分组/表单 | _boolean_ | `undefined` |
| `readonly` | 未设置时继承分组/表单 | _boolean_ | `undefined` |
| `error` | 错误态，继承分组/表单 | _boolean_ | `undefined` |
| `indeterminate`   | 是否为不确定状态（样式优先级最高） | _boolean_          | `false` |
| `ripple`          | 是否开启水波纹                     | _boolean_          | `true`  |

### 方法

#### CheckboxGroup Methods

| 方法 | 参数 | 返回值 |
| --- | --- | --- |
| checkAll | - | ChoiceValue[] |
| inverseAll | - | ChoiceValue[] |


#### Checkbox Methods

| 方法名   | 说明                                                                       | 参数          | 返回值 |
| -------- | -------------------------------------------------------------------------- | ------------- | ------ |
| toggle | 请求选择；遵守禁用/只读限制 | checked?: boolean | void |
| focus | 聚焦控件 | options?: FocusOptions | void |
| blur | 失焦控件 | - | void |

### 事件

#### CheckboxGroup Events

| 事件名   | 说明       | 参数           |
| -------- | ---------- | -------------- |
| `update:model-value` | 提议新值 | `value: ChoiceValue[]` |
| `change` | 值变化，只由 Group 触发 | `value: ChoiceValue[], event?: Event` |

#### Checkbox Events

| 事件名   | 说明           | 参数         |
| -------- | -------------- | ------------ |
| `click`  | 点击时触发     | `e: Event`   |
| update:model-value | 提议新值 | value: CheckboxModel |
| change | 值变化 | value: CheckboxModel, event?: Event |
| focus | 聚焦 | event: FocusEvent |
| blur | 失焦 | event: FocusEvent |

### 插槽

#### CheckboxGroup Slots

| 插槽 | 说明 | 参数 |
| --- | --- | --- |
| default | 未传 options 时的子项 | - |
| label | 选项标签 | data: CheckboxOption, checked: boolean |

#### Checkbox Slots

| 插槽名               | 说明           | 参数                        |
| -------------------- | -------------- | --------------------------- |
| `checked-icon`       | 选中图标       | `-`                         |
| `unchecked-icon`     | 未选中图标     | `-`                         |
| `indeterminate-icon` | 不确定状态图标 | `-`                         |
| `default`            | 显示的文本     | `checked: boolean` 是否选中 |

### 样式变量

| 变量名 | 默认值 |
| --- | --- |
| `--mp-checkbox-control-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-checkbox-control-color-checked` | `var(--mp-sys-color-content-brand)` |
| `--mp-checkbox-control-color-disabled` | `var(--mp-sys-color-content-disabled)` |
| `--mp-checkbox-control-color-error` | `var(--mp-sys-color-content-danger)` |
| `--mp-checkbox-control-size` | `24px` |
| `--mp-checkbox-label-text-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-checkbox-label-text-color-disabled` | `var(--mp-sys-color-content-disabled)` |
| `--mp-checkbox-label-font-size` | `var(--mp-font-size-md)` |
| `--mp-checkbox-label-gap` | `0` |
| `--mp-checkbox-action-padding` | `6px` |
| `--mp-checkbox-group-gap` | `0` |
| `--mp-checkbox-animation-duration` | `var(--mp-sys-motion-duration-standard)` |

### ChoiceFieldNames

`{ label?: string; value?: string; disabled?: string; readonly?: string; indeterminate?: string }`

公开导出类型：`CheckboxOption`、`ChoiceFieldNames`。

公开方法类型：`CheckboxGroupMethods`；`CheckboxGroupInstance` 包含上述方法。

### 减少动态效果

内置 CSS 过渡遵循 `prefers-reduced-motion: reduce`。关闭过渡不改变最终显隐、选中／展开状态及事件语义；插槽内自定义动画由应用自行控制。
