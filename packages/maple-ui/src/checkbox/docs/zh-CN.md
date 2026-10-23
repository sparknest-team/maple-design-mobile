# 复选框

## 案例

### 介绍

基础示例随站点语言切换显示文案，业务值和选中状态不会随语言变化。分组示例覆盖父级接受/拒绝更新、只读和异步选项回显；移除选项不会清空业务值。外层 Space 纵向布局使用 `direction="column"`，选择组自身纵向使用 `direction="vertical"`。

在一组备选项中进行多选。

### 基本使用

```demo
../example/demos/basic-usage.vue
```

### 禁用

```demo
../example/demos/disabled.vue
```

### 只读

```demo
../example/demos/readonly.vue
```

### 设置状态值

```demo
../example/demos/set-state.vue
```

### 修改图标和颜色

```demo
../example/demos/set-style.vue
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

### 原生控件与外观

两端主体均独立复制为原生 checkbox + label。Tab 聚焦，空格/Enter 切换；只读可聚焦，禁用不可聚焦。半选通过 aria-checked="mixed" 表达，点击标签只激活一次。没有可见标签时设置 aria-label；name 传到原生输入，子项未设置时继承 Group。

icon-size 接受像素数字或 CSS 长度字符串，不是 ComponentSize 档位；默认图标 Cedar 为 14px、Maple 为 24px。实例颜色仅作用于普通状态，错误和禁用颜色优先。checkbox 插槽覆盖整个控件外观（也可在 Group 上统一设置），checked-icon、unchecked-icon、indeterminate-icon 仅替换对应图标。以上图标槽是装饰内容，不应放置另一个独立可聚焦控件。

```demo
../example/demos/native-control.vue
```

### 自定义控件插槽

通过控件插槽替换外观，仍使用相同的值模型和键盘操作。

```demo
../example/demos/custom-control.vue
```

### 交互状态切换

适用于协议确认和独立勾选。调整禁用、只读、错误反馈，用相同数据观察变化。控制区始终可用，可以随时恢复编辑；错误外观本身不会触发表单校验。

```demo
../example/demos/state-lab.vue
```

### 异步选项

开启手动返回后，每次加载创建本地 Promise，可分别返回最早或最新任务验证两种乱序。示例业务加载器用版本保护忽略旧响应：旧结果不结束新加载、不清空选择、不释放 `max=2` 名额，也不增加用户变更次数。移除使在途结果失效，新加载仍按保留模型反显；停用或卸载会结清等待并取消定时器。此保护属于示例业务逻辑，不代表组件自动处理网络竞争；不访问外部接口。

选项载入、移除和外部值更新均不会反向触发值变化；未载入的已选值不会自动清理。示例使用 800ms 本地延迟模拟请求；加载中移除选项会取消待完成的加载，避免旧结果重新显示。已选 remote 占一个名额，再选设备 A 后达到 `max=2`，设备 B 将不可选；取消任一已选项会释放名额。外部超限值不会自动裁剪。

等待期间可用空格或 Enter 操作已有选项；同值选项重载后保留键盘焦点和最新选择。加载提示保持稳定节点，避免显隐导致分组重新挂载，取消已选项后仍可继续选择并释放名额。

```demo
../example/demos/async-options.vue
```

<!-- api-review:start -->
### 功能调试

```demo
../example/demos/api-review.vue
```

<!-- api-review:end -->

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
| name | 组内原生输入字段名 | string | undefined |
| aria-label | 分组无障碍名称 | string | undefined |

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
| uninject-group-context | 脱离外层 CheckboxGroup，仍参与表单 | boolean | false |
| name | 原生字段名，未设置时继承 Group | string | undefined |
| aria-label | 无可见标签时的无障碍名称 | string | undefined |
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

组件与分组都支持 checkbox 插槽，参数为 { checked, disabled, indeterminate }。


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

### Form 字段展示与确认

本组件支持 `presentation`，字段 > FormItem > Form 逐层继承；未指定时为 `inline`，保留原有交互。支持值：`inline / popup`。其他编辑展示使用 Cell 入口和一份草稿，确认后才更新 v-model；取消、重置或启用 readPretty 丢弃草稿。

Maple 使用 presentation="popup" 点击值区域打开编辑面板；inline 直接编辑。 readPretty 为纯阅读属性，与 readonly、disabled 独立。

`before-commit(value, { previousValue, signal })` 可拦截弹层保存；FormItem 先校验候选值，失败保持编辑。`open / default-open / update:open` 控制编辑层。`#read="{ value, text }"` 可自定义阅读内容。集中示例见 Form 的“各类字段统一展示”。

`read-pretty` 为独立布尔属性，与 `readonly`、`disabled` 同级；字段 > FormItem > Form 继承，显式 `false` 覆盖父级。默认 `false`。纯阅读不显示编辑器。
