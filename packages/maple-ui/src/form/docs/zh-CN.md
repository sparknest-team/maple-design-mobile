# 表单

### 介绍

提供了对所有表单组件进行控制的能力，需要搭配 `FormItem` 组件使用。

- `FormItem` 写了 `label`：外置标签（上下 / 左右），并自动关闭 Input / Select 的浮动 placeholder。
- `FormItem` 未写 `label`：控件继续使用浮动 placeholder（`placeholder` + `hint`）。


### 基础表单

```demo
../example/demos/example.vue
```

### 表单控制

通过 Form 实例重置字段、清空校验、主动校验，并统一切换禁用或只读状态。

```demo
../example/demos/controller.vue
```

### 表单事件

通过 `submit` 与 `reset` 事件处理原生表单提交和重置行为。

```demo
../example/demos/events.vue
```

## API

### 属性

#### Form Props

| 参数 | 说明                                        | 类型 | 默认值 |
| --- |-------------------------------------------| --- | -- |
| `model` | 表单数据对象，`FormItem` 通过 `field` 从中读取和写入数据 | _Record<string, any>_ | `-` |
| `layout` | 表单项布局方式，可选值为 `vertical` `horizontal`；可被 `FormItem.layout` 覆盖 | _'vertical' \| 'horizontal'_ | `'vertical'` |
| `readonly` | 是否只读                                      | _boolean_ | `false` |
| `disabled` | 是否禁用                                      | _boolean_ | `false` |
| `scroll-to-error` | 是否在校验不通过时滚动到不通过的表单项，可选值为 `start` `end` | _string_ | `-` |
| `scroll-to-error-offset-y` | 滚动到校验不通过的表单项的位置偏移量 | _number \| string_ | `0` |

### 方法

#### Form Methods

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| `validate` | 触发表单组件的校验，不传 `field` 则校验所有表单项 | `field?: string \| string[]` | `valid: Promise<boolean>` |
| `validateField` | 触发指定表单项的校验 | `field: string \| string[]` | `valid: Promise<boolean>` |
| `resetFields` | 重置表单项的值和校验信息为初始值，不传 `field` 则重置所有表单项 | `field?: string \| string[]` | `-` |
| `clearValidate` | 清空表单项的校验信息，不传 `field` 则清空所有表单项 | `field?: string \| string[]` | `-` |
| `scrollToField` | 滚动到指定的表单项 | `field: string` | `-` |

### 事件

#### Form Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `submit` | 表单提交时触发 | `valid: boolean` 是否通过表单验证 |
| `reset` | 表单清空时触发 | `-` |

### 插槽

#### Form Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 表单内容 | `-` |

## FormItem 表单项

### 介绍

表单项组件，负责渲染标签、校验规则和错误信息。需与 `Form`、表单控件配合使用。

- 传入 `label`：外置标签布局，Input / Select 会自动关闭浮动 `hint`。
- 不传 `label`：不渲染外置标签，控件继续使用浮动 placeholder。

### 外置标签（推荐与 Cedar 对齐）

传入 `label` 后使用外置标签，并可通过 `layout="vertical"` 纵向排列。

```demo
../example/demos/vertical-label.vue
```

### 左右布局

使用 `layout="horizontal"` 横向排列标签与控件，也可在单个 `FormItem` 上覆盖布局。

```demo
../example/demos/horizontal-layout.vue
```

### 浮动 Placeholder（不写 label）

不传 `label` 时不渲染外置标签，Input 继续使用浮动 placeholder。

```demo
../example/demos/floating-placeholder.vue
```

### 帮助与额外信息

`help` 展示帮助说明，`extra` 展示额外信息。

```demo
../example/demos/help-extra.vue
```

### 自定义表单控件

自定义控件通过 `FormItem.useFormItem`（或 `Form.useFormItem`）接入错误态和校验触发器。

```demo
../example/demos/custom-control.vue
```

### API

### 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `field` | 对应 `Form.model` 中的字段路径，支持 `a.b` | _string_ | `''` |
| `label` | 标签文本；有值时渲染外置标签，并自动关闭控件浮动 hint | _string_ | `-` |
| `layout` | 布局方式，可选值为 `vertical` `horizontal`；未传时继承 `Form.layout` | _'vertical' \| 'horizontal'_ | `-` |
| `required` | 是否必填（显示星号，并自动追加必填规则） | _boolean_ | `false` |
| `hide-label` | 是否隐藏标签 | _boolean_ | `false` |
| `hide-asterisk` | 是否隐藏必填星号 | _boolean_ | `false` |
| `asterisk-position` | 星号位置 | _'start' \| 'end'_ | `'start'` |
| `help` | 帮助文案（无错误时展示） | _string_ | `-` |
| `extra` | 额外文案 | _string_ | `-` |
| `disabled` | 是否禁用 | _boolean_ | `false` |
| `no-style` | 去除标签与错误信息样式，仅保留校验能力 | _boolean_ | `false` |
| `rules` | 校验规则（函数 / Zod / 数组） | _any_ | `-` |
| `validate-trigger` | 触发校验的时机 | _FormItemValidateTrigger \| FormItemValidateTrigger[]_ | `'change'` |

### 事件

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `validate` | 校验完成时触发 | `valid: boolean` |

### 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | 表单控件 |
| `label` | 自定义标签 |
| `help` | 自定义帮助信息 |
| `extra` | 自定义额外信息 |

### 方法

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| `validate` | 触发校验 | `-` | `Promise<boolean>` |
| `clearValidate` | 清空校验状态 | `-` | `-` |
| `resetField` | 重置字段值到初始值并清空校验 | `-` | `-` |

### 样式变量

| 变量名 | 默认值 |
| --- | --- |
| `--mp-form-item-label-width` | `88px`（`horizontal` 布局下标签宽度） |
| `--mp-form-item-label-gap` | `12px` |

### 类型定义

```ts
type FormItemValidateTrigger = 'change' | 'input' | 'focus' | 'blur' | 'clear'
type FormItemLayout = 'vertical' | 'horizontal'
```
