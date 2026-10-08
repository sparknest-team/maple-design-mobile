# 单选框

### 介绍

在一组备选项中进行单选。

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

### 单选框组

在单选框组中，需要给 `radio` 设置 `value` 用来标识，
单选框组会绑定选择的标识。

```demo
../example/demos/radio-group.vue
```

### 选项式 API

通过 `options` 属性设置子元素。

```demo
../example/demos/radio-group-options.vue
```

### 自定义字段

通过 `field-names` 属性自定义 `options` 中数据的格式。

```demo
../example/demos/custom-fields.vue
```

### 垂直布局

> 单选框及单选框组的表单校验请使用 [FormItem 组件](#/zh-CN/form-item)。

```demo
../example/demos/vertical.vue
```

### 分组状态与只读

`model-value !== undefined` 表示受控，父级不回写时保留原值；`default-value` 只初始化非受控值。分组内只由 Group 发出 `update:model-value → change(value, event?)`，并通知 FormItem 一次，子项不重复发值变化事件。
Group 的 `disabled`、`readonly`、`error` 未设置时继承表单，显式 `false` 可以覆盖表单；子项不能绕过 Group 的禁用或只读限制。

```demo
../example/demos/group-state.vue
```

### 异步选项

选项载入、移除和外部值更新均不会反向触发值变化；未载入的已选值不会自动清理。重复选择当前值不再触发 change，false、0、空字符串按实际值比较。

```demo
../example/demos/async-options.vue
```

### 独立值模型与方法

Radio 的值为 string / number / boolean 或 null，null 表示未选中；重复点击已选项不会取消，父级可写 null 清空。
两端统一使用 `default-value` 初始化非受控值；受控提议被拒绝时保持原值。用户选择按 `update:model-value → change(value, event?)` 通知，命令式调用的 event 为 undefined。
提供 `select()`、`focus(options?)`、`blur()`。禁用禁止选择和聚焦，只读允许聚焦、禁止改值。Enter 按下与空格释放激活当前控件，长按不重复激活，失焦/停用会取消待处理的空格操作。

```demo
../example/demos/control-value.vue
```

### 选项数据与标签

两端均支持原始值或对象选项。`field-names` 映射 `label/value/disabled/readonly/indeterminate`；只读选项允许聚焦但不能改值，Checkbox 的半选仅用于展示。
`label` 插槽接收 `{ data, checked }`，优先于标签渲染函数 `(data, checked) => VNodeChild`。data 为保留业务字段的归一化副本，不修改输入对象；未提供标签时显示值的文字。
显式传入 `options` 时替代默认插槽，包括 `[]`；不传时使用默认插槽。选项值限字符串、有限数字或布尔值；缺失/非法值及同类型重复值被忽略（保留第一项）。`false`、`0`、`''` 和 `'0'` 是不同选项。异步选项变更不反向修改模型。
RadioGroup 默认 `null`，表示未选中；外部写入 `null` 清空。`''` 是有效选项，不再作为空状态标记。

```demo
../example/demos/option-data.vue
```

### 键盘导航

Tab 进入已选项（没有已选项时进入第一个可用项）；方向键循环，Home / End 跳到首尾，跳过禁用项。只读项可聚焦但不改变值。导航仅作用于当前分组，不拦截面板内其他按钮的键盘事件。

```demo
../example/demos/keyboard-navigation.vue
```

### 按钮尺寸

两端均支持 `variant="button"`。RadioGroup 的 `size` 支持 `xs / sm / md / lg / xl`，只调整按钮高度；普通圆形 Radio 不随 size 缩放。未设置时继承表单/全局尺寸，最终默认为 md。Group 的 variant 优先于子项。

```demo
../example/demos/button-sizes.vue
```

## API

`ChoiceValue = string | number | boolean`；`CheckboxModel = boolean | ChoiceValue[]`；`RadioModel = ChoiceValue | null`。

### 属性

#### RadioGroup Props

| 参数                     | 说明                                       | 类型                                       | 默认值       |
| ------------------------ | ------------------------------------------ | ------------------------------------------ | ------------ |
| model-value (v-model) | 受控值 | RadioModel | undefined |
| default-value | 非受控初始值 | RadioModel | null |
| `disabled` | 禁用，未设置时继承表单 | _boolean_ | `undefined` |
| `readonly` | 只读，未设置时继承表单 | _boolean_ | `undefined` |
| `error` | 错误态，未设置时继承表单 | _boolean_ | `undefined` |
| variant | 分组外观 | radio \| button | radio |
| size | 仅调整按钮高度 | ComponentSize | undefined |
| `direction`              | 布局方向，可选值为 `horizontal` `vertical` | _string_                                   | `horizontal` |
| options | 选项；传入时替代默认插槽 | Array<ChoiceValue \| RadioOption \| Record<string, unknown>> | undefined |
| `aria-label` _**3.8.5**_ | 单选框组的标签                             | _string_                                   | `-`          |
| field-names | 选项字段映射 | ChoiceFieldNames | undefined |

#### RadioOption

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| value | 选项标识 | ChoiceValue |
| label | 标签或渲染函数 | VNodeChild \| (data: RadioOption, checked: boolean) => VNodeChild |
| disabled | 禁用 | boolean |
| readonly | 只读 | boolean |


#### Radio Props

| 参数              | 说明             | 类型               | 默认值  |
| ----------------- | ---------------- | ------------------ | ------- |
| model-value (v-model) | 受控值 | ChoiceValue \| null | undefined |
| default-value | 非受控初始值 | ChoiceValue \| null | null |
| variant | 外观，分组设置优先 | radio \| button | radio |
| value | 选项标识 | string \| number \| boolean | true |
| `checked-color`   | 选中状态的颜色   | _string_           | `-`     |
| `unchecked-color` | 未选中状态的颜色 | _string_           | `-`     |
| `icon-size`       | 图标尺寸         | _string \| number_ | `-`     |
| `disabled` | 未设置时继承分组/表单 | _boolean_ | `undefined` |
| `readonly` | 未设置时继承分组/表单 | _boolean_ | `undefined` |
| `error` | 错误态，继承分组/表单 | _boolean_ | `undefined` |
| `ripple`          | 是否开启水波纹   | _boolean_          | `true`  |

### 方法

#### Radio Methods

| 方法名   | 说明                                                                      | 参数         | 返回值 |
| -------- | ------------------------------------------------------------------------- | ------------ | ------ |
| select | 请求选择；遵守禁用/只读限制 | - | void |
| focus | 聚焦控件 | options?: FocusOptions | void |
| blur | 失焦控件 | - | void |

### 事件

#### RadioGroup Events

| 事件名   | 说明       | 参数         |
| -------- | ---------- | ------------ |
| `update:model-value` | 提议新值 | `value: any` |
| `change` | 值变化，只由 Group 触发 | `value: any, event?: Event` |

#### Radio Events

| 事件名   | 说明           | 参数         |
| -------- | -------------- | ------------ |
| `click`  | 点击时触发     | `e: Event`   |
| update:model-value | 提议新值 | value: ChoiceValue |
| change | 值变化 | value: ChoiceValue, event?: Event |
| focus | 聚焦 | event: FocusEvent |
| blur | 失焦 | event: FocusEvent |

### 插槽

#### RadioGroup Slots

| 插槽 | 说明 | 参数 |
| --- | --- | --- |
| default | 未传 options 时的子项 | - |
| label | 选项标签 | data: RadioOption, checked: boolean |

#### Radio Slots

| 插槽名           | 说明       | 参数 |
| ---------------- | ---------- | ---- |
| `checked-icon`   | 选中图标   | `-`  |
| `unchecked-icon` | 未选中图标 | `-`  |
| `default`        | 显示的文本 | `-`  |

### 样式变量

| 变量名 | 默认值 |
| --- | --- |
| `--mp-radio-control-color-checked` | `var(--mp-sys-color-content-brand)` |
| `--mp-radio-control-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-radio-control-color-disabled` | `var(--mp-sys-color-content-disabled)` |
| `--mp-radio-control-color-error` | `var(--mp-sys-color-content-danger)` |
| `--mp-radio-control-size` | `24px` |
| `--mp-radio-action-padding` | `6px` |
| `--mp-radio-label-text-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-radio-label-text-color-disabled` | `var(--mp-sys-color-content-disabled)` |
| `--mp-radio-label-font-size` | `var(--mp-font-size-md)` |
| `--mp-radio-label-gap` | `0` |
| `--mp-radio-group-gap` | `0` |
| `--mp-radio-animation-duration` | `var(--mp-sys-motion-duration-standard)` |

### ChoiceFieldNames

`{ label?: string; value?: string; disabled?: string; readonly?: string; indeterminate?: string }`

公开导出类型：`RadioOption`、`ChoiceFieldNames`。
