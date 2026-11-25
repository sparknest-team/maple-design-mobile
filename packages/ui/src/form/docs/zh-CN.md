# 表单


横向 FormItem 默认不启用 Row 的栅格 gutter，表单项各尺寸均保留默认 16px 间距，size 控制控件高度和字号；显式 `row-props.gutter` 仍优先。表单输入与选择字段默认使用 `outline`，可按需指定 `filled` 或 `standard`。

## 字段名称

客户端挂载后，默认标签会关联内容区中唯一的文本输入框、文本域或下拉框。点击标签可聚焦该字段。增加第二个独立控件时，内容区使用可见标签作为分组名称，各控件应分别提供自己的名称。显式设置 `label-attrs.for` 与字段 `id` 可在服务端首屏就建立关联，也适用于需要指定目标的复合字段。同时传入 `for` 和 `htmlFor` 时优先使用 `for`；只读展示会清除该目标。 流式渲染时，标签可能先于异步子组件的字段送达浏览器。需要首屏即可点击标签时，在父组件中确定稳定 ID，通过子组件传给实际输入元素；列表中的每一行使用各自的 ID。

显式 `validate-status="error"` 且没有自动校验错误时，字段会通过 `aria-describedby` 关联可见的 `help` 文案或插槽；业务已有的描述会保留。自动错误出现时优先关联自动错误。

在 Vue 3.2.47 的 SSR 场景中，如果多个异步表单项在服务端和客户端的完成顺序相反，后续单独更新某一项时，自动错误描述可能重复 ID 或指向其他字段。仅为 Input 设置稳定 `id` 不能避免此问题；Vue 3.5.45 的同场景对照正常。

在 Shadow DOM 中使用延迟编辑 Slider 时，即使将弹层传送到 `body`，滑块和数字输入也能关联当前表单校验错误，或显式错误状态下的纯文本 `help`。若使用 `#help` 插槽或原 ShadowRoot 内的业务提示，可设置 `:popup-container="false"`，或将同一根内的元素传给 `popup-container`。

嵌套的 `no-style` 字段进入 `read-pretty` 展示后，该字段的校验反馈会隐藏。此时用 `setFields` 更新它的错误，父项的错误描述只保留其他可编辑字段仍需展示的错误。

用 `KeepAlive` 缓存嵌套的 `no-style` 字段时，字段停用期间父项会撤下它的错误说明。重新激活后，父项会展示该字段当前的错误，包括停用期间通过 `setFields` 更新的消息。

FormItem 中只有一个延迟编辑的 Input 时，可见标签在关闭状态下关联触发按钮，打开后关联原生输入框。加入第二个输入框时，请分别提供字段名称，FormItem 标签用于命名整组。

直接编辑模式下，为单个字段设置可见标签时，可将 FormItem 的 `label-attrs` 中的 `for` 与控件的 `id` 对应；选择、日期和时间字段的原生输入不会用 placeholder 覆盖已关联的标签。显式 `aria-label` 或 `aria-labelledby` 仍按原生无障碍名称规则优先。placeholder 只是未提供标签时的回退，不能替代清晰的字段标签。日期和时间范围字段在 FormItem 中会将表单标签关联到范围分组；仍需通过 `input-attrs` 分别提供能够区分起止端点的名称。若 `label-attrs.for` 指向其他控件，不会将该标签误关联到范围分组。 默认标签与单个范围字段关联。客户端识别到范围字段与独立输入并列时，可见标签命名整组，各字段应提供独立名称。单值 Slider 在 `for` 匹配组件 `id` 时为滑块及可选数字输入关联该标签；点击默认原生标签可聚焦未禁用的滑块；阻止标签点击默认行为可取消该聚焦。范围 Slider 的 `id` 与 `for` 匹配时，表单标签命名整个分组；仍应使用 `aria-label` 数组分别命名两个端点。 `tooltip` 提示按钮可单独聚焦，其名称不会合并到字段标签中。

## 基础示例

### 基础表单

```demo
../example/demos/example.vue
```

## 阅读方向

### 紧凑账户表单

Form 与 FormItem 的 content-align 支持 start、end、left、center、right，label-align 支持 start、end、left、right；默认内容 start、标签 end。默认 LTR 位置保持不变，RTL 按阅读方向排列；显式 left/right 均为物理对齐。字段覆盖优先于 Form，逐实例标签列样式保持最高优先级。切换方向不重置业务值、校验结果或只读/禁用状态。

在已绑定 `model` 的 Form 中，编辑时可用 `compact` 联动外层 FormItem 的 `layout` 与 `hide-label`。内层字段保持挂载，隐藏外层标签时，输入框仍需有可访问名称。

```demo
../example/demos/compact-account.vue
```

## 表单外观与布局

### 布局切换与单项覆盖

`edit-mode` 表示编辑模式：`direct` 始终显示控件；`popup` 打开移动编辑弹层。`readPretty` 是独立布尔属性。FormItem 和字段未设置时继承上层。

组合切换 `vertical`、`horizontal`、`inline` 布局与 `direct / popup` 编辑方式及独立的 `readPretty` 阅读开关，对比标签、控件、字段值及长文字换行的对齐效果，已有数据保持不变。备注项可单独覆盖布局或恢复继承。`popup` 点击字段值进入弹层并确认保存；`readPretty` 通过 `read-pretty` 展示纯文字。

`content-align` 可切换 left、center、right，在各字段模式下保持一致。FormItem 默认继承 Form，也可单独覆盖；紧凑控件在内容区内移动，输入与展示值按指定方向对齐。标签、帮助和错误信息独立排列。字段显式设置的 `text-align` 优先于继承值。

```demo
../example/demos/layout-comparison.vue
```

### 标签与内容装饰

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置               | 作用                                                                                   | 相关示例                                             |
| ------------------ | -------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `model`            | 表单数据对象，`FormItem` 通过 `field` 从中读取和写入数据                               | 布局切换与单项覆盖、标签与内容装饰、标签宽度方案对比 |
| `layout`           | 表单项布局方式，可选值为 `vertical` `horizontal` `inline`；可被 `FormItem.layout` 覆盖 | 布局切换与单项覆盖、标签与内容装饰、标签宽度方案对比 |
| `label-align`      | 标签对齐                                                                               | 标签宽度方案对比                                     |
| `auto-label-width` | 对齐参与自动计算的横向标签最大自然宽度                                                 | 标签宽度方案对比                                     |
| `label-col-flex`   | 标签 flex；单位字符串为宽度，数字为伸缩比例                                            | 标签宽度方案对比                                     |
| `label-col-props`  | 横向标签 Col 参数，支持响应式断点                                                      | 标签宽度方案对比                                     |

<!-- demo-config-notes:end -->

```demo
../example/demos/decoration.vue
```

### 局部表单分区

仅将现场处置 SOP、安全须知和处置要点放入分区，页面使用 Divider 分隔后续字段。切换标题线、仅标题、描边分区三种风格或切换标题标记时，已填内容会保留。MpSection 中的字段继续使用父 Form 的布局、标签宽度、禁用状态和校验。标题可省略。当前不提供折叠与分区级布局覆盖。

```demo
../example/demos/section.vue
```

### 分区标题操作

通过 extra 插槽在标题右侧放置操作。“引用模板”填充现场处置字段，“清空”只清空当前分区。可先修改分区外的技能等级，再点击操作，观察该值保持不变。

```demo
../example/demos/section-actions.vue
```

### 标签宽度方案对比

先输入数据，再切换自动测量、响应式栅格和固定宽度，三种方案使用同一份表单数据。修改最长标签或隐藏联系方式，观察自动测量更新。响应式方案在 576px 以下上下排列；固定宽度默认 6rem，联系方式单项覆盖为 8rem。

<details>
<summary>配置说明与使用限制</summary>

#### 响应式标签栅格

horizontal 默认标签占 5/24、内容占 19/24；Cedar 默认 horizontal，Maple 默认 vertical。只有横向布局使用栅格比例和自动宽度，响应式参数按视口断点生效。FormItem 显式覆盖 Form，Col/style 对象整项替换。label-col-flex 优先于 auto-label-width：带单位字符串表示宽度，数字表示 Col 伸缩比例，并非 px；内容填满剩余空间。隐藏标签后内容占满。自动宽度随标签变化、字段移除更新，各表单独立计算。窄屏长标签可用 vertical 或固定宽度。

</details>

```demo
../example/demos/label-width-comparison.vue
```

## 字段与数据模型

### 同一标签下的多个控件

混合使用多个控件时，为可见标签设置唯一 ID，并用它显式命名分组；每个控件也需要自己的名称。每个 FormItem 实例应使用不同的 ID。

```demo
../example/demos/mixed-field-label.vue
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

### 直接／弹窗编辑的已选区域对照

```demo
../example/demos/selection-summary.vue
```

### 介绍

提供了对所有表单组件进行控制的能力，需要搭配 `FormItem` 组件使用。

- `FormItem` 写了 `label`：外置标签（上下 / 左右），并自动关闭 Input / Select 的浮动 placeholder。
- `FormItem` 未写 `label`：控件继续使用浮动 placeholder（`placeholder` + `hint`）。

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

## 校验与提交

### 跨字段校验与原生提交

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置       | 作用                                                     | 相关示例                                   |
| ---------- | -------------------------------------------------------- | ------------------------------------------ |
| `model`    | 表单数据对象，`FormItem` 通过 `field` 从中读取和写入数据 | 跨字段校验与原生提交、清空时校验、表单控制 |
| `disabled` | 是否禁用                                                 | 表单控制                                   |
| `readonly` | 是否只读                                                 | 表单控制                                   |

<!-- demo-config-notes:end -->

“暂停跨字段校验”示例通过手动返回结果模拟异步校验。提交等待期间修改依赖字段、重置表单或卸载组件，会使该次提交失效；确认当前输入后可重新提交。

未暂停时确认规则立即比较当前源代码。先匹配通过，再修改源代码，主动只校验确认值或重新提交会显示依赖错误；改正确认值后可按 Enter 或提交按钮提交。原生重置清空模型、反馈和上次提交值，提交次数累计不清零。依赖由业务主动复验，单纯编辑不保证已有成功态仍有效；本地示例不等于任意异步提交竞争或外部持久化。

```demo
../example/demos/cross-field.vue
```

### 清空时校验

`validate-trigger="clear"` 只在用户点击控件的清空按钮时校验；普通输入不会触发。清空后重新输入不会自动清除错误，可主动校验或重置表单。

```demo
../example/demos/clear-trigger.vue
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

## 字段呈现与交互

### 字段展示与确认提交

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置     | 作用                                                                                   | 相关示例                         |
| -------- | -------------------------------------------------------------------------------------- | -------------------------------- |
| `layout` | 表单项布局方式，可选值为 `vertical` `horizontal` `inline`；可被 `FormItem.layout` 覆盖 | 字段展示与确认提交、校验展示状态 |
| `model`  | 表单数据对象，`FormItem` 通过 `field` 从中读取和写入数据                               | 字段展示与确认提交               |

<!-- demo-config-notes:end -->

Form、FormItem、Input、Select 支持 edit-mode 继承：字段 > FormItem > Form。未设置时保留字段各自的默认值；Maple 支持 direct / popup。选择字段单选默认即选即提交、多选默认确认；其他字段保留各自确认方式，readPretty 只阅读。普通 v-model 和默认插槽保持不变。Select、Cascader、AutoComplete、Date／DateRange、Time／TimeRange 默认 popup，其余字段默认 direct。

`edit-mode` 只控制字段编辑方式，不改变 `layout`、标签宽度或栅格比例。非 `vertical` 布局中，标签与右侧字段内容垂直居中，错误提示和帮助文字不参与居中。

<demo src="../example/demos/field-presentation.vue" />

### edit-mode 继承规则

Form 支持 `direct / popup`，未设置时保留字段各自的默认值；FormItem 和字段继承显式设置的值，显式值覆盖。readPretty 是阅读展示，与 readonly/disabled 分开。确认编辑未结束时整表提交会失败并保留草稿；reset 取消编辑。原有默认插槽与 v-model 保持不变，不需要 editor 插槽。

### 校验展示状态

显式 validate-status 优先于自动状态；仅 error 显示错误，其他状态显示 help。它不改变 validate 的真实结果。自动校验经过 validating → success/error；clearValidate 恢复未校验状态。setFields 仅传 message 设为 error，status=''、message='' 可清空。

```demo
../example/demos/presentation-status.vue
```

### 独立面板操作区

```demo
../example/demos/field-panel-actions.vue
```

### 确认事件来源

```demo
../example/demos/change-source.vue
```

## 动态与异步字段

### 多字段异步聚合

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置       | 作用                                                     | 相关示例                                                 |
| ---------- | -------------------------------------------------------- | -------------------------------------------------------- |
| `model`    | 表单数据对象，`FormItem` 通过 `field` 从中读取和写入数据 | 多字段异步聚合、禁用、只读与异步确认、异步校验的返回顺序 |
| `disabled` | 是否禁用                                                 | 禁用、只读与异步确认、异步校验的返回顺序                 |
| `readonly` | 是否只读                                                 | 禁用、只读与异步确认、异步校验的返回顺序                 |
| `rules`    | 按字段名配置的表单校验规则                               | 禁用、只读与异步确认                                     |

<!-- demo-config-notes:end -->

显式调用validate()或validateField()会使等待中的旧原生submit失效：命令校验有自己的结果，不应让旧submit在完成后把旧错误或成功与当前模型混发。此后新的原生submit仍正常等待自己的字段校验并通知一次。该规则仅逻辑失效、不取消真实请求，不清空历史提交计数。等待中修改模型或规则也会使本次提交失效，需重新提交校验。

“返回最新用户名结果 / 返回最新代码结果”优先结清对应字段最新任务，可让新submit先完成、旧结果最后返回。新成功后旧失败不追加提交或恢复错误；新失败后旧成功不追加提交或清除新错误。仍须等最新提交的两个字段都返回，单个字段返回不提交；默认“返回用户名/代码结果”继续返回最早任务。

原生submit采用最新提交生效：旧提交仍等待时再次提交，使旧提交的submit/submit-success/submit-failed续体失效。用guest/bad提交后改为admin/1234再提交；先返回旧两个结果，原生提交计数应仍0，新提交仍等自己的两个结果。反向旧成功/新失败同理，旧成功不能提前报通过。这个规则不取消真实请求；等待中修改模型或规则同样使旧提交失效。

原生submit等待中调用resetFields（含原生reset）会使该提交失效；旧Promise结清后不得再发submit、submit-success或submit-failed。停用/卸载同样使旧提交失效，后续新提交仍正常校验。此为逻辑失效，不是取消远端请求；并发submit和跨字段异步依赖不在这个重置协议内。

“原生异步提交”是表单内的原生submit按钮，也可聚焦后按Enter。独立“原生提交”计数须等两个本地异步字段都返回才增加：用户名失败先返回时暂不提交，代码返回后记录失败；修正为admin再提交，反序返回代码/用户名后记录成功并清错。下方“结果”仍只表示命令式校验，两个计数/结果互不冒充。完成后重置清空字段、保留历史提交计数。此顺序重试不代表并发submit或跨字段异步依赖已覆盖。

同一示例可连续点击两次“校验两个字段”：先输入旧值并发起，再改值发起新一轮。“返回用户名结果 / 返回代码结果”各返回该字段最早任务。旧整表先完成时，新一轮仍须等它自己的两个字段；旧成功或失败都不应覆盖最新字段反馈。结果文案由示例序号单独保护，不是 Form 自动取消旧请求，也不是原生提交并发协议。

两个字段分别返回独立本地 Promise。先返回任一字段可更新该字段反馈，但整表须等两个字段都完成。重置使旧反馈和示例结果失效，旧任务仍可手动返回以观察迟到结果。这里演示命令式 validate()，不是原生提交事件并发或跨字段依赖。

也可在用户名结果已返回、代码仍等待时重置，立即输入新值并再次校验。此时返回最早代码只会结清旧任务，不能恢复旧错误或提前完成新整表；必须返回新一轮自己的两个结果。分别用旧失败/新成功、旧成功/新失败核对字段反馈；结果文案仍由示例版本号单独保护，不等于取消真实请求。

```demo
../example/demos/async-fields.vue
```

### 禁用、只读与异步确认

```demo
../example/demos/presentation-state.vue
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

### 日期范围的跨页边界

比较日期、月份、年份范围：禁用 2027-01-01、2026-12、2100 年。禁用项不能作为端点，范围可以跨过它们；翻页后检查禁用项仍保持灰态。

```demo
../example/demos/field-range-boundaries.vue
```

### 异步提交的输入归属

原生提交只接受本次校验期间保持有效的响应式模型和规则。等待中修改任意模型字段（包括其他字段或改后恢复）、替换模型/规则、修改 FormItem 的规则/required/field，或增删已注册字段，会使本次提交失效。旧校验成功或失败都不再触发 submit、submit-success、submit-failed，也不触发自动错误滚动；需重新提交校验最新输入。这是逻辑失效，不取消请求、不自动重试，也不改变命令式 validate 的返回约定；已有提交历史保留。业务模型应使用响应式状态，让 Vue 能观察到输入变化。普通事件监听器返回的 Promise 不被收集。

```demo
../example/demos/submit-inputs.vue
```

### 动态字段与重置初值

复用同一个 FormItem 时，field 变化会自动释放旧字段注册，并注册新的非空字段；清空 field 会取消注册。每个字段路径在该实例内保留首次可用初值，重访字段不会用当前编辑值覆盖初值。reset 按字段克隆初值，0、false、null 和缺失的 undefined 都保留。切换身份会取消旧编辑器、清理旧反馈，并使旧字段集合的校验回调失效；已经启动的命令式校验 Promise 仍独立结算，调用方管理自己的结果文案。

已有模型对象中的缺失属性会记录为 undefined；替换模型或规则不重新建立已缓存初值。异步数据若应作为初值，可在数据就绪后绑定 field 或渲染 FormItem；重新创建实例会建立新的初值基线。

```demo
../example/demos/field-identity.vue
```

## FormItem 表单项

### 介绍

表单项组件，负责渲染标签、校验规则和错误信息。需与 `Form`、表单控件配合使用。

- 传入 `label`：外置标签布局，Input / Select 会自动关闭浮动 `hint`。
- 不传 `label`：不渲染外置标签，控件继续使用浮动 placeholder。

### 外置标签

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

在 `setup` 中调用 `useFormErrorDescription()`，将返回的 `describe(existingIds)` 绑定到实际交互元素的 `aria-describedby`，可保留已有描述并随 FormItem 错误显示或清除同步错误 ID。控件不在 FormItem 内时仅保留已有描述。

示例使用原生按钮提供 Enter/Space 操作与 checkbox 语义，读取 `mergedDisabled` / `mergedReadonly` 继承 Form 和 FormItem 状态。未传的布尔配置使用 `undefined`，避免覆盖父级；点击切换值后通知 `eventHandlers.onChange`，焦点事件也交给表单。

```demo
../example/demos/custom-control.vue
```

### 交互状态切换

适用于整张表单的状态继承。调整禁用、只读，用相同数据观察变化。控制区始终可用，可以随时恢复编辑；错误外观本身不会触发表单校验。

```demo
../example/demos/state-lab.vue
```

### 桌面与移动的同场景展示

点击部门、日期或时间，打开 Popup。先修改后取消，再修改并确认，比较下方已提交模型。

```demo
../example/demos/platform-presentation.vue
```

### 巡检任务完整流程

填写、校验、确认、模拟失败与重试；返回修改不会覆盖已提交记录。

```demo
../example/demos/task-workflow.vue
```

### 空值标记与必填校验

接口用 -1 表示未选择。点击“校验”会显示必填错误；选择部门后再次校验通过。点击清空返回 -1，再次校验失败。Form 统一提供识别列表，字段单独指定清空输出；自定义校验仍收到原值。

```demo
../example/demos/empty-values-validation.vue
```

### 阅读空文案与配置继承

初始为阅读模式，姓名继承 Form 的默认“-”，编号使用 FormItem 的“未分配”，昵称使用字段的“匿名”，数量 0 保持可见。切换空文案只影响继承的字段；切换阅读/编辑不改模型。优先级为字段 > FormItem > Form；自定义 read 插槽优先。

```demo
../example/demos/empty-text.vue
```

## 使用说明

### 校验结果与异常

函数规则返回 true 表示通过，返回错误文字或 false 表示业务校验不通过。意外 throw 或 Promise 拒绝仍会使公开 `validate()` 拒绝，调用方需要处理该异常；当前任务会释放 validating，不合成新的业务错误，之前已有的业务错误消息继续保留。旧任务异常不会清理更新任务的等待状态。

## API

通过 edit-mode 设置编辑方式，通过 read-pretty 设置阅读状态。内部描述符名称 fieldEditModeProp 不是 Form 或 FormItem 的公开属性。

### 空值识别与阅读空文案

Form / FormItem 通过 `empty-values` 提供空值识别策略；字段自己的 `empty-value` 决定清空输出。`empty-text` 仅在 `read-pretty` 空内容下展示，默认 `'-'`，字段 > FormItem > Form，自定义 read 插槽优先。显式配置 empty-values 后，内置 required 接入该策略，自定义校验仍收到原值。详见[统一说明](#/zh-CN/emptyValues)。

| 参数         | 类型               | 缺省与范围                                            |
| ------------ | ------------------ | ----------------------------------------------------- |
| empty-values | readonly unknown[] | 字段 > FormItem > Form > 组件族默认；完整覆盖，不合并 |
| empty-text   | string             | 字段 > FormItem > Form > '-'；显式 '' 有效            |

以上是字段展示层 API；纯面板不因此新增阅读模式。Form 与 FormItem 提供继承配置。empty-value 的现有类型与默认输出仍按该组件原 API 执行。

### Form Props

| 参数                       | 说明                                                                                                    | 类型                                     | 默认值                    |
| -------------------------- | ------------------------------------------------------------------------------------------------------- | ---------------------------------------- | ------------------------- |
| `id`                       | 表单原生 id；显式设置时作为字段容器 id 前缀（嵌套路径归一化）                                           | _string_                                 | `-`                       |
| `model`                    | 表单数据对象，`FormItem` 通过 `field` 从中读取和写入数据                                                | _Record<string, any>_                    | `-`                       |
| `layout`                   | 表单项布局方式，可选值为 `vertical` `horizontal` `inline`；可被 `FormItem.layout` 覆盖                  | _'vertical' \| 'horizontal' \| 'inline'_ | `'vertical'`              |
| `label-align`              | 标签对齐                                                                                                | _'start' \| 'end' \| 'left' \| 'right'_                      | `'end'`                 |
| `content-align`            | 内容对齐，统一控制 direct 字段、弹出入口及 readPretty；与 label-align 独立                              | `'start' \| 'end' \| 'left' \| 'center' \| 'right'`          | `'start'`                  |
| `read-pretty`              | 独立的阅读开关；为 true 时展示已保存的值，关闭后恢复当前 edit-mode 的编辑方式；FormItem 未传时继承 Form | `boolean`                                | `-`                       |
| `edit-mode`                | 表单内字段的统一编辑模式；未设置时保留各字段默认值                                                      | `'direct' \| 'popup'`                    | `-`                       |
| `label-col-props`          | 横向标签 Col 参数，支持响应式断点                                                                       | _FormColProps_                           | `{ span: 5, offset: 0 }`  |
| `wrapper-col-props`        | 横向内容 Col 参数                                                                                       | _FormColProps_                           | `{ span: 19, offset: 0 }` |
| `label-col-style`          | 标签列逐实例样式                                                                                        | _CSSProperties_                          | `-`                       |
| `wrapper-col-style`        | 内容列逐实例样式                                                                                        | _CSSProperties_                          | `-`                       |
| `label-col-flex`           | 标签 flex；单位字符串为宽度，数字为伸缩比例                                                             | _number \| string_                       | `-`                       |
| `auto-label-width`         | 对齐参与自动计算的横向标签最大自然宽度                                                                  | _boolean_                                | `false`                   |
| `size`                     | 表单控件尺寸，由 FormItem 和控件继承                                                                    | _'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'_   | `-`                       |
| `rules`                    | 按字段名配置的表单校验规则                                                                              | `FormRules`         | `-`                       |
| `readonly`                 | 是否只读                                                                                                | _boolean_                                | `-`                       |
| `disabled`                 | 是否禁用                                                                                                | _boolean_                                | `-`                       |
| `scroll-to-error`          | 校验失败后滚动到页面顺序的第一个（`start`）或最后一个（`end`）错误字段；不是视口对齐方式                | _'start' \| 'end'_                       | `-`                       |
| `scroll-to-error-offset-y` | 滚动到校验不通过的表单项的位置偏移量                                                                    | _number \| string_                       | `0`                       |

### Form Methods

| 方法名          | 说明                                                            | 参数                                                       | 返回值                                                 |
| --------------- | --------------------------------------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------ |
| `validate`      | 触发表单组件的校验                                              | `callback?: (errors) => void`                              | `Promise<undefined \| Record<string, ValidatedError>>` |
| `validateField` | 触发指定表单项的校验                                            | `field: string \| string[]`、`callback?: (errors) => void` | `Promise<undefined \| Record<string, ValidatedError>>` |
| `resetFields`   | 重置表单项的值和校验信息为初始值，不传 `field` 则重置所有表单项 | `field?: string \| string[]`                               | `-`                                                    |
| `clearValidate` | 清空表单项的校验信息，不传 `field` 则清空所有表单项             | `field?: string \| string[]`                               | `-`                                                    |
| `setFields`     | 批量设置表单项的值或错误状态                                    | `Record<string, { value?; status?; message? }>`            | `-`                                                    |
| `scrollToField` | 滚动到指定的表单项                                              | `field: string`                                            | `-`                                                    |

### Form Events

| 事件名           | 说明           | 参数                                       |
| ---------------- | -------------- | ------------------------------------------ |
| `submit`         | 表单提交时触发 | `data: { values; errors }`、`event: Event` |
| `submit-success` | 校验成功时触发 | `values`、`event: Event`                   |
| `submit-failed`  | 校验失败时触发 | `data: { values; errors }`、`event: Event` |
| `reset`          | 表单重置时触发 | `event: Event`                             |

### Form Slots

| 插槽名    | 说明     | 参数 |
| --------- | -------- | ---- |
| `default` | 表单内容 | `-`  |

### FormItem Props

| 参数                | 说明                                                                                                    | 类型                                                   | 默认值           |
| ------------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ | ---------------- |
| `field`             | 对应 `Form.model` 中的字段路径，支持 `a.b`                                                              | _string_                                               | `''`             |
| `label`             | 标签文本；有值时渲染外置标签，并自动关闭控件浮动 hint                                                   | _string_                                               | `-`              |
| `tooltip`           | 标签提示；支持悬停、键盘聚焦和触摸点击                                                                  | _string_                                               | `-`              |
| `show-colon`        | 标签后显示冒号                                                                                          | _boolean_                                              | `false`          |
| `label-component`   | 标签原生元素名                                                                                          | _string_                                               | `'label'`        |
| `label-attrs`       | 标签原生属性；for 应指向控件的真实 id                                                                   | _HTMLAttributes & Record<string, unknown>_             | `-`              |
| `content-class`     | 内容容器 class                                                                                          | _string \| array \| object_                            | `-`              |
| `content-flex`      | 内容层启用 flex；业务 Grid 布局可关闭                                                                   | _boolean_                                              | `true`           |
| `layout`            | 布局方式，可选值为 `vertical` `horizontal` `inline`；未传时继承 `Form.layout`                           | _'vertical' \| 'horizontal' \| 'inline'_               | `-`              |
| `label-align`       | 标签对齐                                                                                                | _'start' \| 'end' \| 'left' \| 'right'_                                    | `-`              |
| `content-align`     | 内容对齐，统一控制 direct 字段、弹出入口及 readPretty；与 label-align 独立                              | `'start' \| 'end' \| 'left' \| 'center' \| 'right'`                        | `-`（继承 Form） |
| `read-pretty`       | 独立的阅读开关；为 true 时展示已保存的值，关闭后恢复当前 edit-mode 的编辑方式；FormItem 未传时继承 Form | `boolean`                                              | `-`              |
| `edit-mode`         | 编辑模式；未设置时继承 Form，字段可单独覆盖                                                             | `'direct' \| 'popup'`                                  | `-`              |
| `label-col-props`   | 横向标签 Col 参数，支持响应式断点                                                                       | _FormColProps_                                         | `-`              |
| `wrapper-col-props` | 横向内容 Col 参数                                                                                       | _FormColProps_                                         | `-`              |
| `label-col-style`   | 标签列逐实例样式                                                                                        | _CSSProperties_                                        | `-`              |
| `wrapper-col-style` | 内容列逐实例样式                                                                                        | _CSSProperties_                                        | `-`              |
| `label-col-flex`    | 标签 flex；单位字符串为宽度，数字为伸缩比例                                                             | _number \| string_                                     | `-`              |
| `row-props`         | 表单项 Row 参数；支持 gutter、align、justify、wrap                                                      | _RowProps_                                             | `-`              |
| `row-class`         | 布局容器 class                                                                                          | _string \| array \| object_                            | `-`              |
| `required`          | 是否必填（显示星号，并自动追加必填规则）                                                                | _boolean_                                              | `false`          |
| `hide-label`        | 是否隐藏标签                                                                                            | _boolean_                                              | `false`          |
| `feedback`          | 在输入框显示校验反馈图标，异步校验期间显示加载状态                                                      | _boolean_                                              | `false`          |
| `validate-status`   | 手动指定反馈状态；省略时由校验结果决定                                                                  | _'success' \| 'warning' \| 'error' \| 'validating'_    | `-`              |
| `hide-asterisk`     | 是否隐藏必填星号                                                                                        | _boolean_                                              | `false`          |
| `asterisk-position` | 必填星号在字段标签中的逻辑 start/end 位置，默认 start；不是表单或浮层位置                               | _'start' \| 'end'_                                     | `'start'`        |
| `help`              | 帮助文案（无错误时展示）                                                                                | _string_                                               | `-`              |
| `extra`             | 额外文案                                                                                                | _string_                                               | `-`              |
| `disabled`          | 是否禁用；未传时继承 Form                                                                               | _boolean_                                              | `-`              |
| `readonly`          | 是否只读；未传时继承 Form                                                                               | _boolean_                                              | `-`              |
| `size`              | 控件尺寸；未传时继承 Form                                                                               | _'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'_                 | `-`              |
| `no-style`          | 隐藏本项的标签和反馈区域，保留布局容器与字段注册。单独切换此属性时，默认插槽中的字段保持挂载。                                                                  | _boolean_                                              | `false`          |
| `rules`             | 校验规则（函数 / Zod / 数组）                                                                           | `FormRule \| FormRule[]`                                                  | `-`              |
| `validate-trigger`  | 触发校验的时机；`clear` 仅由控件清空动作触发，不等同于 `change`                                         | _FormItemValidateTrigger \| FormItemValidateTrigger[]_<br>`FormItemValidateTrigger: 'input' \| 'change' \| 'focus' \| 'blur' \| 'clear'` | `'change'`       |

### FormItem Events

| 事件名     | 说明           | 参数             |
| ---------- | -------------- | ---------------- |
| `validate` | 校验完成时触发 | `valid: boolean` |

### FormItem Slots

在服务端渲染默认插槽中的输入列表时，使用 `v-for` 并为每项提供稳定的 `:key`。同一节点叠加 `v-memo` 可能导致首屏 HTML 缺少这些输入框。两种 `no-style` 设置下都会出现这个问题。需要保留 `v-memo` 时，可将列表模板放到独立的 `FieldList.vue` 中，在插槽内使用 `<FieldList :rows="rows" />`。把 `v-for`、`:key` 和 `v-memo` 都写在子组件的列表项上。

| 插槽名    | 说明           |
| --------- | -------------- |
| `default` | 表单控件       |
| `label`   | 自定义标签     |
| `help`    | 自定义帮助信息 |
| `extra`   | 自定义额外信息 |

### FormItem Methods

| 方法名          | 说明                         | 参数 | 返回值                                 |
| --------------- | ---------------------------- | ---- | -------------------------------------- |
| `validate`      | 触发校验                     | `-`  | `Promise<undefined \| ValidatedError>` |
| `clearValidate` | 清空校验状态                 | `-`  | `-`                                    |
| `resetField`    | 重置字段值到初始值并清空校验 | `-`  | `-`                                    |

## Types

```ts
type FormItemValidateTrigger = 'change' | 'input' | 'focus' | 'blur' | 'clear'
type FormItemLayout = 'vertical' | 'horizontal' | 'inline'
```

`read-pretty` 为独立布尔属性，与 `readonly`、`disabled` 同级；字段 > FormItem > Form 继承，显式 `false` 覆盖父级。默认 `false`。纯阅读不显示编辑器。

### Maple 规则协议

FormRules 是按字段名组织的 FormRule 或其数组。FormRule 支持函数或 Zod schema，不接受 Cedar FieldRule 规则对象；开发环境对不支持的规则结构给出属性诊断。必填校验和星号使用 FormItem.required，不使用只有装饰、没有实际校验的 rules.required 对象。函数接收 `(value, context)`，context 含当前 model 和 field；候选保存校验使用候选模型。正常返回 true 才表示通过，其他返回值按 String 转为错误文字；可返回 Promise。Zod 通过 safeParseAsync 运行，取首条 issue 的 message。

意外 throw 或 Promise 拒绝会让公开 validate 拒绝，调用方用 try/catch 处理；最新任务会释放 validating，保留之前的业务错误，不转成业务失败通知。旧任务异常不会清除新任务的等待状态。FormItem 的 validate 事件仅通知最新正常结算的布尔结果，不承担任务执行。Form.useValidation、Form.useForm、Form.useFormItem 和 FormItem.useFormItem 保持现有组合扩展职责。

```ts
import type { FormRule, FormRules, FormRuleContext } from '@maple-design/ui-vue'
const nameRule: FormRule<string> = async (value, context) => {
  await Promise.resolve()
  return value.length > 0 || `${context.field} is required`
}
const rules: FormRules = { name: nameRule }
```

### 公开校验与通知合同

Form 与 FormItem 的默认插槽没有作用域参数；FormItem 还提供 label、help、extra 插槽，均不通过参数操作模型。Form 使用 model 对象及字段路径管理状态，不以插槽参数替代业务模型。

`validate(callback?)` 和 `validateField(fields, callback?)` 等待对应规则，成功返回 undefined，业务失败返回按字段聚合的错误对象；回调只通知当前有效任务。错误记录包含 field、message、label、value、type、isRequiredError。value 保留原字段值，不先转换成显示文字。

submit-success 先于 submit 通知，业务校验失败时 submit-failed 先于 submit。编辑会话未完成的阻止分支只通知 submit-failed，其 errors.editing 只有 field="editing" 与 message，不伪造字段校验信息；公开类型 FormSubmitError 区分该提示与完整 ValidatedError。

这些事件是通知，不等待监听器 Promise，也不自动执行请求或切换 loading。业务异步保存自行控制 loading。原生 reset 会阻止默认行为、执行 resetFields 后通知 reset；Form 的 resetFields 会写回 model，与 FilterForm 内部 Form 的职责不同。

`beforeCommit` 属于支持编辑事务的字段组件，签名为 `(payload, done, context) => void | boolean | Promise<void | boolean>`；payload 含 value、previousValue，context 含 signal 和可选 event。返回 undefined 表示等待 done；返回布尔或 Promise 按结果结算。它不是 Form 的 submit 事件或通用加载入口。

```ts
import type {
  FormProps, FormItemProps, FormInstance, FormItemInstance,
  ValidatedError, FormValidateErrors, FieldData,
  FormEmits, FormSlots, FormItemSlots, FormSubmitError,
  BeforeFieldCommit,
} from '@maple-design/ui-vue'
```

分区的属性和插槽见 [Section 内容分区](#/zh-CN/section)。

## CSS Variables

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-form-extra-margin-top` | `6px` | `margin-top` |
| `--mp-form-extra-text-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-form-extra-text-font-size` | `12px` | `font-size` |
| `--mp-form-help-line-height` | `1.4` | `line-height` |
| `--mp-form-item-asterisk-margin` | `4px` | `margin-inline-end`, `margin-inline-start` |
| `--mp-form-item-label-gap` | `12px` | `margin-inline-end`, `padding-inline-end` |
| `--mp-form-item-label-width` | `88px` | `flex`, `width` |
| `--mp-form-label-line-height` | `1.4` | `line-height` |
| `--mp-form-label-min-height` | `24px` | `min-height` |
| `--mp-form-label-text-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-form-required-symbol-color` | `var(--mp-sys-color-content-danger)` | `color` |
| `--mp-form-size-md-item-margin-bottom` | `16px` | `margin-bottom`, `padding-block-start` |
| `--mp-form-size-md-label-font-size` | `14px` | `font-size` |
| `--mp-form-tooltip-margin-left` | `var(--mp-sys-space-2)` | `padding-inline-start` |
| `--mp-form-tooltip-text-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-form-vertical-label-margin-bottom` | `8px` | `margin-bottom` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-form-extra-text-color: var(--mp-sys-color-content-secondary);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
