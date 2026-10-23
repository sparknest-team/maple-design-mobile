# 表单

## 案例

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

`validate-trigger="clear"` 只在用户点击控件的清空按钮时校验；普通输入不会触发。清空后重新输入不会自动清除错误，可主动校验或重置表单。

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

### 跨字段校验与原生提交

“暂停跨字段校验”将确认规则挂起到“返回跨字段结果”，返回时比较本次确认值与当前源代码（不是远端接口或提交开始时的源快照）。匹配值提交后等待中修改源代码，会返回依赖错误；修正确认值并Enter重试后通过。等待中原生重置会结清本地任务、清空模型与提交快照、保留历史计数，不产生迟到提交；停用/卸载也清理等待。不代表异步循环依赖或多请求顺序均已覆盖。

未暂停时确认规则立即比较当前源代码。先匹配通过，再修改源代码，主动只校验确认值或重新提交会显示依赖错误；改正确认值后可按 Enter 或提交按钮提交。原生重置清空模型、反馈和上次提交值，提交次数累计不清零。依赖由业务主动复验，单纯编辑不保证已有成功态仍有效；本地示例不等于任意异步提交竞争或外部持久化。

```demo
../example/demos/cross-field.vue
```

### 文本与数值字段

```demo
../example/demos/field-components.vue
```

### 开关与勾选字段

```demo
../example/demos/field-choice.vue
```

### 下拉选择字段

```demo
../example/demos/field-selection.vue
```

### 层级选择字段

```demo
../example/demos/field-tree.vue
```

### 日期字段

```demo
../example/demos/field-date.vue
```

### 时间字段

```demo
../example/demos/field-time.vue
```

### 进度与评分字段

```demo
../example/demos/field-rating.vue
```

### 附件字段

```demo
../example/demos/field-upload.vue
```

### 独立面板操作区

```demo
../example/demos/field-panel-actions.vue
```

### 标签与内容装饰

```demo
../example/demos/decoration.vue
```

### 禁用、只读与异步确认

```demo
../example/demos/presentation-state.vue
```

### 日期范围的跨页边界

比较日期、月份、年份范围：禁用 2027-01-01、2026-12、2100 年。禁用项不能作为端点，范围可以跨过它们；翻页后检查禁用项仍保持灰态。

```demo
../example/demos/field-range-boundaries.vue
```

### 字段展示与确认提交

Form、FormItem、Input、Select 支持 presentation 继承：字段 > FormItem > Form。默认 inline；Maple 支持 popup。弹层默认确认后提交，readPretty 只阅读。普通 v-model 和默认插槽保持不变。搜索位置自动随展示形式切换。

<demo src="../example/demos/field-presentation.vue" />

### presentation 继承规则

Form 支持 `inline / popup`，默认 inline；FormItem 和字段未设置时继承，显式值覆盖。read 是阅读展示，与 readonly/disabled 分开。确认编辑未结束时整表提交会失败并保留草稿；reset 取消编辑。原有默认插槽与 v-model 保持不变，不需要 editor 插槽。

### 校验展示状态

显式 validate-status 优先于自动状态；仅 error 显示错误，其他状态显示 help。它不改变 validate 的真实结果。自动校验经过 validating → success/error；clearValidate 恢复未校验状态。setFields 仅传 message 设为 error，status=''、message='' 可清空。

```demo
../example/demos/presentation-status.vue
```

### 多字段异步聚合

显式调用validate()或validateField()会使等待中的旧原生submit失效：命令校验有自己的结果，不应让旧submit在完成后把旧错误或成功与当前模型混发。此后新的原生submit仍正常等待自己的字段校验并通知一次。该规则仅逻辑失效、不取消真实请求，不清空历史提交计数；既有方法签名不变，不保留旧的混发行为。仅编辑但未重新校验的快照协议仍未覆盖。

“返回最新用户名结果 / 返回最新代码结果”优先结清对应字段最新任务，可让新submit先完成、旧结果最后返回。新成功后旧失败不追加提交或恢复错误；新失败后旧成功不追加提交或清除新错误。仍须等最新提交的两个字段都返回，单个字段返回不提交；默认“返回用户名/代码结果”继续返回最早任务。

原生submit采用最新提交生效：旧提交仍等待时再次提交，使旧提交的submit/submit-success/submit-failed续体失效。用guest/bad提交后改为admin/1234再提交；先返回旧两个结果，原生提交计数应仍0，新提交仍等自己的两个结果。反向旧成功/新失败同理，旧成功不能提前报通过。这个规则不取消真实请求，也不处理仅编辑但没有再次提交的业务快照。

原生submit等待中调用resetFields（含原生reset）会使该提交失效；旧Promise结清后不得再发submit、submit-success或submit-failed。停用/卸载同样使旧提交失效，后续新提交仍正常校验。此为逻辑失效，不是取消远端请求；并发submit和跨字段异步依赖不在这个重置协议内。

“原生异步提交”是表单内的原生submit按钮，也可聚焦后按Enter。独立“原生提交”计数须等两个本地异步字段都返回才增加：用户名失败先返回时暂不提交，代码返回后记录失败；修正为admin再提交，反序返回代码/用户名后记录成功并清错。下方“结果”仍只表示命令式校验，两个计数/结果互不冒充。完成后重置清空字段、保留历史提交计数。此顺序重试不代表并发submit或跨字段异步依赖已覆盖。

同一示例可连续点击两次“校验两个字段”：先输入旧值并发起，再改值发起新一轮。“返回用户名结果 / 返回代码结果”各返回该字段最早任务。旧整表先完成时，新一轮仍须等它自己的两个字段；旧成功或失败都不应覆盖最新字段反馈。结果文案由示例序号单独保护，不是 Form 自动取消旧请求，也不是原生提交并发协议。

两个字段分别返回独立本地 Promise。先返回任一字段可更新该字段反馈，但整表须等两个字段都完成。重置使旧反馈和示例结果失效，旧任务仍可手动返回以观察迟到结果。这里演示命令式 validate()，不是原生提交事件并发或跨字段依赖。

也可在用户名结果已返回、代码仍等待时重置，立即输入新值并再次校验。此时返回最早代码只会结清旧任务，不能恢复旧错误或提前完成新整表；必须返回新一轮自己的两个结果。分别用旧失败/新成功、旧成功/新失败核对字段反馈；结果文案仍由示例版本号单独保护，不等于取消真实请求。

```demo
../example/demos/async-fields.vue
```

### 异步校验的返回顺序

主动调用 `validateField` 后可继续修改字段并发起新校验。本例用真实 Promise 规则且不访问网络，关闭自动触发，只通过按钮发起。先校验 guest，再校验 admin，先返回最新结果再返回最早结果，观察旧错误不会覆盖最新字段状态。结果文案由示例请求序号保护，“本次校验值”是校验快照，不是服务端提交。

清空校验或重置后，仍可返回等待中的旧结果；卸载和停用会结清本地等待。真实接口应取消请求，并由业务保护提交快照和版本。

等待中可切换表单 disabled / readonly：它们限制控件交互，不自动取消已发起校验，也不清除已有错误。外部校验控制按钮不在被禁用的 Form 内。需要使旧结果失效时主动清空校验或重置；解除限制后可再次输入并校验。

关闭 Mount async field 会移除字段但保留业务模型和待返回任务。重新挂载后可发起新校验，再按新旧顺序返回结果，核对旧实例的错误不会污染新字段；这不是删除业务数据，也不是整表并发提交协议。

等待中可通过“写入服务端错误”调用 `setFields` 设置显式错误；之前的异步成功或失败不应覆盖它。示例仍保留旧任务供手动返回，结果文案单独做版本保护。清空校验可移除错误，重新发起校验后以新结果为准；不代表真实接口已取消。

“校验整表”调用 `validate()`，“校验字段”调用 `validateField('name')`。可交错发起并按不同顺序返回，分别观察字段反馈和示例最新结果；重置使旧结果失效，不等于取消真实服务。当前示例只有一个异步字段，不代表多字段聚合、跨字段依赖或原生 submit 事件并发均已覆盖。

```demo
../example/demos/async-race.vue
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

### 交互状态切换

适用于整张表单的状态继承。调整禁用、只读，用相同数据观察变化。控制区始终可用，可以随时恢复编辑；错误外观本身不会触发表单校验。

```demo
../example/demos/state-lab.vue
```

<!-- api-review:start -->
### 功能调试

```demo
../example/demos/api-review.vue
```

<!-- api-review:end -->

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
| `scroll-to-error` | 校验失败后滚动到页面顺序的第一个（`start`）或最后一个（`end`）错误字段；不是视口对齐方式 | _'start' \| 'end'_ | `-` |
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

## FormItem API

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

`read-pretty` 为独立布尔属性，与 `readonly`、`disabled` 同级；字段 > FormItem > Form 继承，显式 `false` 覆盖父级。默认 `false`。纯阅读不显示编辑器。
