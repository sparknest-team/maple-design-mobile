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

Button 使用 `html-type="submit"` / `html-type="reset"` 触发原生表单事件。示例同时展示校验结果和当前模型；重置恢复初始值并清除错误。

通过 `submit` 与 `reset` 事件处理原生表单提交和重置行为。

```demo
../example/demos/events.vue
```

### 清空时校验

`validate-trigger="clear"` 只在用户点击控件的清空按钮时校验；普通输入不会触发。

```demo
../example/demos/clear-trigger.vue
```

### 响应式标签栅格

horizontal 默认标签占 5/24、内容占 19/24；Cedar 默认 horizontal，Maple 默认 vertical。只有横向布局使用栅格比例和自动宽度，响应式参数按视口断点生效。FormItem 显式覆盖 Form，Col/style 对象整项替换。label-col-flex 优先于 auto-label-width：带单位字符串表示宽度，数字表示 Col 伸缩比例，并非 px；内容填满剩余空间。隐藏标签后内容占满。自动宽度随标签变化、字段移除更新，各表单独立计算。窄屏长标签可用 vertical 或固定宽度。

```demo
../example/demos/label-columns.vue
```

### 固定标签宽度

```demo
../example/demos/fixed-label-width.vue
```

### 自动标签宽度

```demo
../example/demos/auto-label-width.vue
```

## API

### 属性

#### Form Props

| 参数 | 说明                                        | 类型 | 默认值 |
| --- |-------------------------------------------| --- | -- |
| `id` | 表单原生 id；显式设置时作为字段容器 id 前缀（嵌套路径归一化） | _string_ | `-` |
| `model` | 表单数据对象，`FormItem` 通过 `field` 从中读取和写入数据 | _Record<string, any>_ | `-` |
| `layout` | 表单项布局方式，可选值为 `vertical` `horizontal` `inline`；可被 `FormItem.layout` 覆盖 | _'vertical' \| 'horizontal' \| 'inline'_ | `'vertical'` |
| `label-align` | 标签对齐 | _'left' \| 'right'_ | `'right'` |
| `label-col-props` | 横向标签 Col 参数，支持响应式断点 | _FormColProps_ | `{ span: 5, offset: 0 }` |
| `wrapper-col-props` | 横向内容 Col 参数 | _FormColProps_ | `{ span: 19, offset: 0 }` |
| `label-col-style` | 标签列逐实例样式 | _CSSProperties_ | `-` |
| `wrapper-col-style` | 内容列逐实例样式 | _CSSProperties_ | `-` |
| `label-col-flex` | 标签 flex；单位字符串为宽度，数字为伸缩比例 | _number \| string_ | `-` |
| `auto-label-width` | 对齐参与自动计算的横向标签最大自然宽度 | _boolean_ | `false` |
| `size` | 表单控件尺寸，由 FormItem 和控件继承 | _'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'_ | `-` |
| `rules` | 按字段名配置的表单校验规则 | _Record<string, rule \| rule[]>_ | `-` |
| `readonly` | 是否只读                                      | _boolean_ | `-` |
| `disabled` | 是否禁用                                      | _boolean_ | `-` |
| `scroll-to-error` | 是否在校验不通过时滚动到不通过的表单项，可选值为 `start` `end` | _string_ | `-` |
| `scroll-to-error-offset-y` | 滚动到校验不通过的表单项的位置偏移量 | _number \| string_ | `0` |

### 方法

#### Form Methods

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| `validate` | 触发表单组件的校验 | `callback?: (errors) => void` | `Promise<undefined \| Record<string, ValidatedError>>` |
| `validateField` | 触发指定表单项的校验 | `field: string \| string[]`、`callback?: (errors) => void` | `Promise<undefined \| Record<string, ValidatedError>>` |
| `resetFields` | 重置表单项的值和校验信息为初始值，不传 `field` 则重置所有表单项 | `field?: string \| string[]` | `-` |
| `clearValidate` | 清空表单项的校验信息，不传 `field` 则清空所有表单项 | `field?: string \| string[]` | `-` |
| `setFields` | 批量设置表单项的值或错误状态 | `Record<string, { value?; status?; message? }>` | `-` |
| `scrollToField` | 滚动到指定的表单项 | `field: string` | `-` |

### 事件

#### Form Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `submit` | 表单提交时触发 | `data: { values; errors }`、`event: Event` |
| `submit-success` | 校验成功时触发 | `values`、`event: Event` |
| `submit-failed` | 校验失败时触发 | `data: { values; errors }`、`event: Event` |
| `reset` | 表单重置时触发 | `event: Event` |

### 插槽

#### Form Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 表单内容 | `-` |

### 标签与内容装饰

```demo
../example/demos/decoration.vue
```

### 校验展示状态

显式 validate-status 优先于自动状态；仅 error 显示错误，其他状态显示 help。它不改变 validate 的真实结果。自动校验经过 validating → success/error；clearValidate 恢复未校验状态。setFields 仅传 message 设为 error，status=''、message='' 可清空。

```demo
../example/demos/presentation-status.vue
```

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

示例使用原生按钮提供 Enter/Space 操作与 checkbox 语义，读取 `mergedDisabled` / `mergedReadonly` 继承 Form 和 FormItem 状态。未传的布尔配置使用 `undefined`，避免覆盖父级；点击切换值后通知 `eventHandlers.onChange`，焦点事件也交给表单。

```demo
../example/demos/custom-control.vue
```

### API

### 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `field` | 对应 `Form.model` 中的字段路径，支持 `a.b` | _string_ | `''` |
| `label` | 标签文本；有值时渲染外置标签，并自动关闭控件浮动 hint | _string_ | `-` |
| `tooltip` | 标签提示；支持悬停、键盘聚焦和触摸点击 | _string_ | `-` |
| `show-colon` | 标签后显示冒号 | _boolean_ | `false` |
| `label-component` | 标签原生元素名 | _string_ | `'label'` |
| `label-attrs` | 标签原生属性；for 应指向控件的真实 id | _HTMLAttributes & Record<string, unknown>_ | `-` |
| `content-class` | 内容容器 class | _string \| array \| object_ | `-` |
| `content-flex` | 内容层启用 flex；业务 Grid 布局可关闭 | _boolean_ | `true` |
| `layout` | 布局方式，可选值为 `vertical` `horizontal` `inline`；未传时继承 `Form.layout` | _'vertical' \| 'horizontal' \| 'inline'_ | `-` |
| `label-align` | 标签对齐 | _'left' \| 'right'_ | `-` |
| `label-col-props` | 横向标签 Col 参数，支持响应式断点 | _FormColProps_ | `-` |
| `wrapper-col-props` | 横向内容 Col 参数 | _FormColProps_ | `-` |
| `label-col-style` | 标签列逐实例样式 | _CSSProperties_ | `-` |
| `wrapper-col-style` | 内容列逐实例样式 | _CSSProperties_ | `-` |
| `label-col-flex` | 标签 flex；单位字符串为宽度，数字为伸缩比例 | _number \| string_ | `-` |
| `row-props` | 表单项 Row 参数；支持 gutter、align、justify、wrap | _RowProps_ | `-` |
| `row-class` | 布局容器 class | _string \| array \| object_ | `-` |
| `required` | 是否必填（显示星号，并自动追加必填规则） | _boolean_ | `false` |
| `hide-label` | 是否隐藏标签 | _boolean_ | `false` |
| `feedback` | 在输入框显示校验反馈图标，异步校验期间显示加载状态 | _boolean_ | `false` |
| `validate-status` | 手动指定反馈状态；省略时由校验结果决定 | _'success' \| 'warning' \| 'error' \| 'validating'_ | `-` |
| `hide-asterisk` | 是否隐藏必填星号 | _boolean_ | `false` |
| `asterisk-position` | 星号位置 | _'start' \| 'end'_ | `'start'` |
| `help` | 帮助文案（无错误时展示） | _string_ | `-` |
| `extra` | 额外文案 | _string_ | `-` |
| `disabled` | 是否禁用；未传时继承 Form | _boolean_ | `-` |
| `readonly` | 是否只读；未传时继承 Form | _boolean_ | `-` |
| `size` | 控件尺寸；未传时继承 Form | _'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'_ | `-` |
| `no-style` | 去除标签与错误信息样式，仅保留校验能力 | _boolean_ | `false` |
| `rules` | 校验规则（函数 / Zod / 数组） | _any_ | `-` |
| `validate-trigger` | 触发校验的时机；`clear` 仅由控件清空动作触发，不等同于 `change` | _FormItemValidateTrigger \| FormItemValidateTrigger[]_ | `'change'` |

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
| `validate` | 触发校验 | `-` | `Promise<undefined \| ValidatedError>` |
| `clearValidate` | 清空校验状态 | `-` | `-` |
| `resetField` | 重置字段值到初始值并清空校验 | `-` | `-` |

### 样式变量

| 变量名 | 默认值 |
| --- | --- |
| `--mp-form-item-label-width` | `88px`（`inline` 布局下标签宽度） |
| `--mp-form-item-label-gap` | `12px` |

### 类型定义

```ts
type FormItemValidateTrigger = 'change' | 'input' | 'focus' | 'blur' | 'clear'
type FormItemLayout = 'vertical' | 'horizontal'
```
