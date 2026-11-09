# 复选框

独立 Checkbox 的 modelValue 在布尔模式下表示是否选中，在数组模式下表示选中选项的集合；value 是当前选项的标识。CheckboxGroup 的 modelValue 是选中值数组。defaultValue 只初始化非受控状态，不会回写父级绑定值。

### 介绍

基础示例随站点语言切换显示文案，业务值和选中状态不会随语言变化。分组示例覆盖父级接受/拒绝更新、只读和异步选项回显；移除选项不会清空业务值。外层 Space 纵向布局使用 `direction="column"`，选择组自身纵向使用 `orientation="vertical"`。

在一组备选项中进行多选。

## 阅读方向

复选框标签及分组按来源 dir 排列，业务数组顺序不变。Space 保持切换语义，禁用/只读状态不因方向变化失效；切换 LTR/RTL 不自动勾选或清空选项。

## 基础示例

### 基本使用

```demo
../example/demos/basic-usage.vue
```

## 分组与布局

### 选项声明方式对比

比较子组件声明和 options 数据声明；两种方式都使用组值，字段映射和异步选项另见对应示例。

<details>
<summary>配置说明与使用限制</summary>

#### 复选框组

在复选框组中，必须给 `checkbox` 设置 `value` 用来标识，
复选框组会收集所有选择的标识。

#### 选项式 API

通过 `options` 属性设置子元素。

</details>

```demo
../example/demos/group-declaration-comparison.vue
```

### 分组状态与只读

`model-value !== undefined` 表示受控，父级不回写时保留原值；`default-value` 只初始化非受控值。分组内只由 Group 发出 `update:modelValue → change(value, event?)`，并通知 FormItem 一次，子项不重复发值变化事件。
Group 的 `disabled`、`readonly`、`error` 未设置时继承表单，显式 `false` 可以覆盖表单；子项不能绕过 Group 的禁用或只读限制。

```demo
../example/demos/group-state.vue
```

### 垂直布局

```demo
../example/demos/vertical.vue
```

## 选项与值模型

### 独立值模型与方法

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置            | 作用                   | 相关示例                     |
| --------------- | ---------------------- | ---------------------------- |
| `value`         | 选项标识               | 独立值模型与方法、设置状态值 |
| `default-value` | 非受控初始值           | 独立值模型与方法             |
| `readonly`      | 只读，未设置时继承表单 | 独立值模型与方法             |
| `disabled`      | 禁用，未设置时继承表单 | 独立值模型与方法             |

<!-- demo-config-notes:end -->

Checkbox 的布尔模型始终返回 boolean；数组模型按 value 增删选项，不修改传入数组。indeterminate 只用于展示，由业务方计算，不会自动回写。
两端统一使用 `default-value` 初始化非受控值；受控提议被拒绝时保持原值。用户选择按 `update:modelValue → change(value, event?)` 通知，命令式调用的 event 为 undefined。
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

### 自定义字段

通过 `field-names` 属性自定义 `options` 中数据的格式。

```demo
../example/demos/custom-fields.vue
```

### 设置状态值

```demo
../example/demos/set-state.vue
```

## 选择与批量操作

### 最大选中数量

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置            | 作用                               | 相关示例     |
| --------------- | ---------------------------------- | ------------ |
| `value`         | 选项标识                           | 最大选中数量 |
| `indeterminate` | 是否为不确定状态（样式优先级最高） | 不确定状态   |
| `disabled`      | 禁用，未设置时继承表单             | 交互状态对比 |
| `readonly`      | 只读，未设置时继承表单             | 交互状态对比 |
| `error`         | 错误态，未设置时继承表单           | 交互状态对比 |

<!-- demo-config-notes:end -->

在复选框组中，可以通过设置 `max` 属性来限制最大选中数量。

> 复选框及复选框组的表单校验请使用 [FormItem 组件](#/zh-CN/form-item)。

```demo
../example/demos/max.vue
```

### 不确定状态

```demo
../example/demos/indeterminate.vue
```

### 分组批量方法

两端提供 `checkAll()` 和 `inverseAll()`，返回独立数组副本。仅操作已挂载且可编辑的子项，保留禁用、只读及未加载的已选值；重复值只要有一项被锁定，该值就不参与批量修改。
`checkAll` 保留原模型顺序，按当前 DOM 顺序追加未选值；`inverseAll` 先移除可编辑的已选值，再按 DOM 顺序加入此前未选值。新增选择遵守 `max`，不裁剪外部传入的超限值。
受控模式返回提议，需父级回写；拒绝的提议不保存。分组禁用/只读时只返回当前值副本。有实际变化才按 `update:modelValue → change(value, undefined) → FormItem` 通知一次，无变化不发事件。
子项重排、挂载、卸载及 KeepAlive 激活/停用会同步更新候选；变更渲染子项后应等待 `nextTick` 再调用方法。

```demo
../example/demos/group-methods.vue
```

### 交互状态对比

在同一实例上切换禁用、只读和错误状态后再操作控件，比较可编辑性和交互反馈。恢复开关位于目标控件外；错误外观本身不会执行校验。

<details>
<summary>配置说明与使用限制</summary>

#### 交互状态切换

适用于协议确认和独立勾选。调整禁用、只读、错误反馈，用相同数据观察变化。控制区始终可用，可以随时恢复编辑；错误外观本身不会触发表单校验。

</details>

```demo
../example/demos/state-lab.vue
```

## 控件与插槽定制

### 原生控件与外观

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置              | 作用                               | 相关示例                       |
| ----------------- | ---------------------------------- | ------------------------------ |
| `unchecked-color` | 未选中状态的颜色                   | 修改图标和颜色、自定义控件插槽 |
| `checked-color`   | 选中状态的颜色                     | 修改图标和颜色、自定义控件插槽 |
| `name`            | 组内原生输入字段名                 | 原生控件与外观                 |
| `indeterminate`   | 是否为不确定状态（样式优先级最高） | 原生控件与外观                 |
| `aria-label`      | 分组无障碍名称                     | 原生控件与外观                 |
| `default-value`   | 非受控初始值                       | 原生控件与外观                 |

<!-- demo-config-notes:end -->

Tab 聚焦，空格/Enter 切换；只读可聚焦，禁用不可聚焦。半选通过 aria-checked="mixed" 表达，点击标签只激活一次。没有可见标签时设置 aria-label；name 传到原生输入，子项未设置时继承 Group。

icon-size 接受像素数字或 CSS 长度字符串，不是 ComponentSize 档位；默认图标 Cedar 为 14px、Maple 为 24px。实例颜色仅作用于普通状态，错误和禁用颜色优先。checkbox 插槽覆盖整个控件外观（也可在 Group 上统一设置），checked-icon、unchecked-icon、indeterminate-icon 仅替换对应图标。以上图标槽是装饰内容，不应放置另一个独立可聚焦控件。

```demo
../example/demos/native-control.vue
```

### 修改图标和颜色

```demo
../example/demos/set-style.vue
```

### 自定义控件插槽

通过控件插槽替换外观，仍使用相同的值模型和键盘操作。

```demo
../example/demos/custom-control.vue
```

## 异步选项

### 异步选项

开启手动返回后，每次加载创建本地 Promise，可分别返回最早或最新任务验证两种乱序。示例业务加载器用版本保护忽略旧响应：旧结果不结束新加载、不清空选择、不释放 `max=2` 名额，也不增加用户变更次数。移除使在途结果失效，新加载仍按保留模型反显；停用或卸载会结清等待并取消定时器。此保护属于示例业务逻辑，不代表组件自动处理网络竞争；不访问外部接口。

选项载入、移除和外部值更新均不会反向触发值变化；未载入的已选值不会自动清理。示例使用 800ms 本地延迟模拟请求；加载中移除选项会取消待完成的加载，避免旧结果重新显示。已选 remote 占一个名额，再选设备 A 后达到 `max=2`，设备 B 将不可选；取消任一已选项会释放名额。外部超限值不会自动裁剪。

等待期间可用空格或 Enter 操作已有选项；同值选项重载后保留键盘焦点和最新选择。加载提示保持稳定节点，避免显隐导致分组重新挂载，取消已选项后仍可继续选择并释放名额。

```demo
../example/demos/async-options.vue
```

## 原生输入属性与键盘拦截

`id`、`form`、`required`、其他原生约束、`aria-*`、`data-*` 和键盘监听器传给实际 input；`class` / `style` 和其他外壳属性保留在 label。未提供 id 时生成稳定且唯一的原生 id；外部 label[for] 可以关联显式 id。HTML required 参与浏览器原生表单验证，与 Form 的业务校验规则分开。

原生监听的 Once / Capture / Passive 修饰符保留在 input，不会因插槽中嵌套按钮而错误触发。原生键盘监听 preventDefault() 可以阻止 Enter / Space 的组件激活及 RadioGroup 方向键导航；被取消的 Space 不留下延迟释放动作。组件仍管理 checked、disabled、输入类型及分组的 Tab 焦点规则。

Checkbox 的 null 模型仍表示空状态；default / checkbox 插槽中的 checked 始终为 boolean，null 对应 false，不会仅为渲染而提交新模型。

## 使用说明

### 编辑与确认

通过 `edit-mode` 配置编辑方式；未指定时依次继承 FormItem、Form，默认 `direct`。支持值：`direct / popup`。非 direct 编辑模式通过字段值入口打开编辑面板，并维护单份草稿；确认后才更新 v-model，取消、重置或启用 readPretty 时丢弃草稿。

Maple 使用 edit-mode="popup" 点击值区域打开编辑面板；direct 直接编辑。 readPretty 为纯阅读属性，与 readonly、disabled 独立。

`before-commit(payload, done, context)` 可拦截弹层保存；FormItem 先校验候选值，失败保持编辑。`open / default-open / update:open` 控制编辑层。`#read="{ value, text }"` 可自定义阅读内容。集中示例见 Form 的“各类字段统一展示”。

`read-pretty` 为独立布尔属性，与 `readonly`、`disabled` 同级；字段 > FormItem > Form 继承，显式 `false` 覆盖父级。默认 `false`。纯阅读不显示编辑器。

`empty-value` 可显式设为 `null`（或 `() => null`），清空时原样提交 null；省略时保留组件原默认值。界面把 null 显示为空，不会把普通输入的空字符串自动转成 null。支持弹出编辑的字段中，清空先修改草稿，确认后提交，取消则保留原值。

候选属性 `options` 支持数组或 `(query, { signal }) => 数组/Promise`。加载、取消、过期结果隔离由组件内部处理，失败触发 load-error。单选/多选分组初始化以空字符串查询，搜索型字段在查询变化时调用；树形字段根数据与原有 load-more 子节点懒加载独立。

公共 focus/blur 从首次挂载即可调用。focus 会打开可编辑的延迟编辑器，等待其就绪后定位；禁用、只读或纯阅读时不因此打开。blur 只失焦当前目标，不重新打开。保存的方法不会绑定旧编辑器，关闭、切换模式、停用或卸载会取消排队调用。

CheckboxGroup 的 checkAll/inverseAll 仅由活动编辑器执行变更；延迟编辑器关闭、停用或卸载后调用，返回当前业务值的独立数组副本，不打开编辑器或发布模型变化。

## API

### 参数、展示清空与挂载边界

orientation 仅接受 horizontal / vertical，非法值诊断后按 horizontal 展示。max 仅用于 CheckboxGroup：合法值为有限非负整数，0 表示不能新增选择，省略为不限；不裁剪已有外部模型。非法 JS 值诊断后保留既有归一化：负数按 0、小数向下取整、NaN 按不限，Infinity 仍按不限处理。

icon-size 接受正长度，数值和纯数字字符串按 px，允许 0.5 这样的正小数；无效、非正或非有限数值诊断并回退主题，不套用 Divider 的最小 1。CSS 表达式的最终解析值由业务样式负责。

uninject-group-context 在挂载时决定是否接入分组；运行中修改不会重新注入，需改变 key 或重新挂载，脱离分组后仍参与 Form。clearable / empty-value 只控制延迟展示层的显式清空；原生取消勾选仍输出 false 或从数组移除该值，不会使用 empty-value。普通事件返回 Promise 不参与等待；before-commit 仅在延迟保存时按 payload / done / context 协议执行。

显式 options 加载期间，两端分组通过 aria-busy 通知等待，失败发一次 load-error；不增加 loading 属性或额外图形，也不因加载或失败提议新模型。

### 空值识别与阅读空文案

`empty-values` 用于空值识别，`empty-value` 保留原清空输出；`empty-text` 仅在 `read-pretty` 空内容下展示，默认 `'-'`，字段 > FormItem > Form，自定义 read 插槽优先。显式配置 empty-values 后，内置 required 接入该策略，自定义校验仍收到原值。详见[统一说明](#/zh-CN/emptyValues)。

| 参数         | 类型               | 缺省与范围                                            |
| ------------ | ------------------ | ----------------------------------------------------- |
| empty-values | readonly unknown[] | 字段 > FormItem > Form > 组件族默认；完整覆盖，不合并 |
| empty-text   | string             | 字段 > FormItem > Form > '-'；显式 '' 有效            |

以上是字段展示层 API；纯面板不因此新增阅读模式。Form 与 FormItem 提供继承配置。empty-value 的现有类型与默认输出仍按该组件原 API 执行。

`ChoiceValue = string | number | boolean`；`CheckboxModel = boolean | ChoiceValue[] | null`；`RadioModel = ChoiceValue | null`。

### Checkbox Props

| 属性                   | 说明                               | 类型                     | 默认值    |
| ---------------------- | ---------------------------------- | ------------------------ | --------- |
| model-value (v-model) | 受控值 | CheckboxModel | undefined |
| default-value | 非受控初始值 | CheckboxModel | false |
| value                  | 数组/分组模式的选项标识            | string\|number\|boolean  | true      |
| disabled               | 是否禁用；未设置时继承表单/分组    | boolean                  | undefined |
| readonly               | 是否只读；未设置时继承表单/分组    | boolean                  | undefined |
| error                  | 错误态；未设置时继承表单/分组      | boolean                  | undefined |
| indeterminate          | 是否为半选状态                     | boolean                  | false     |
| checked-color          | 实例选中颜色；错误/禁用优先        | string                   | undefined |
| unchecked-color        | 实例未选中颜色；错误/禁用优先      | string                   | undefined |
| icon-size | 正长度；非法值诊断并回退主题 | number \| string | undefined |
| ripple                 | 是否启用波纹                       | boolean                  | true      |
| uninject-group-context | 脱离外层 CheckboxGroup，仍参与表单 | boolean                  | false     |
| name                   | 原生字段名，未设置时继承 Group     | string                   | undefined |
| aria-label             | 无可见标签时的无障碍名称           | string                   | undefined |
| edit-mode | 编辑模式，继承 FormItem 和 Form | `'direct' \| 'popup'` | `'direct'` |
| read-pretty | 独立阅读状态，显式 false 覆盖父级 | `boolean` | `false` |
| clearable | 延迟编辑层清空操作，不改变原生取消选择 | `boolean` | `false` |
| empty-value | 展示层显式清空输出，不控制原生取消勾选 | `CheckboxModel \| (() => CheckboxModel)` | `false` |
| empty-values | 空值识别策略，字段优先于 FormItem 和 Form | `readonly unknown[]` | `-` |
| empty-text | 阅读空文案，显式空字符串有效 | `string` | `'-'` |
| before-commit | 延迟编辑保存前守卫；返回布尔值、Promise 或通过 done 完成 | `(payload: { value: unknown; previousValue: unknown }, done: (allow?: boolean) => void, context: { signal: AbortSignal; event?: Event }) => void \| boolean \| Promise<void \| boolean>` | `-` |
| open | 受控编辑层开关，不是内部原生输入焦点 | `boolean` | `-` |
| default-open | 非受控编辑层初始开关 | `boolean` | `false` |
| popup-container | 编辑层挂载容器 | `string \| HTMLElement \| false` | `-` |

### CheckboxGroup Props

| 属性                  | 说明                                                        | 类型                                                                                                       | 默认值       |
| --------------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------ |
| model-value (v-model) | 受控值 | ChoiceValue[] \| null | undefined |
| default-value         | 非受控初始值                                                | ChoiceValue[]                                                                                              | []           |
| max                   | 最多可选数量                                                | number                                                                                                     | undefined    |
| options               | 选项；传入时替代默认插槽                                    | Array<ChoiceValue \| CheckboxOption \| Record<string, unknown>> / `(query, { signal }) => Array / Promise` | `undefined`  |
| orientation           | 复选组内选项的横纵排列，默认 horizontal；不表示文字阅读方向 | Orientation<br>`'horizontal' \| 'vertical'` | 'horizontal' |
| disabled              | 是否禁用；未设置时继承表单/分组                             | boolean                                                                                                    | undefined    |
| readonly              | 是否只读；未设置时继承表单/分组                             | boolean                                                                                                    | undefined    |
| error                 | 错误态；未设置时继承表单/分组                               | boolean                                                                                                    | undefined    |
| field-names           | 选项字段映射                                                | ChoiceFieldNames                                                                                           | undefined    |
| name                  | 组内原生输入字段名                                          | string                                                                                                     | undefined    |
| aria-label            | 分组无障碍名称                                              | string                                                                                                     | undefined    |
| edit-mode | 编辑模式，继承 FormItem 和 Form | `'direct' \| 'popup'` | `'direct'` |
| read-pretty | 独立阅读状态，显式 false 覆盖父级 | `boolean` | `false` |
| clearable | 延迟编辑层清空操作，不改变原生取消选择 | `boolean` | `false` |
| empty-value | 展示层显式清空输出，不控制原生取消勾选 | `ChoiceValue[] \| null \| (() => ChoiceValue[] \| null)` | `[]` |
| empty-values | 空值识别策略，字段优先于 FormItem 和 Form | `readonly unknown[]` | `-` |
| empty-text | 阅读空文案，显式空字符串有效 | `string` | `'-'` |
| before-commit | 延迟编辑保存前守卫；返回布尔值、Promise 或通过 done 完成 | `(payload: { value: unknown; previousValue: unknown }, done: (allow?: boolean) => void, context: { signal: AbortSignal; event?: Event }) => void \| boolean \| Promise<void \| boolean>` | `-` |
| open | 受控编辑层开关，不是内部原生输入焦点 | `boolean` | `-` |
| default-open | 非受控编辑层初始开关 | `boolean` | `false` |
| popup-container | 编辑层挂载容器 | `string \| HTMLElement \| false` | `-` |

### Checkbox Methods

| 方法名 | 说明                        | 参数                   | 返回值 |
| ------ | --------------------------- | ---------------------- | ------ |
| toggle | 请求选择；遵守禁用/只读限制 | checked?: boolean      | void   |
| focus  | 聚焦控件                    | options?: FocusOptions | void   |
| blur   | 失焦控件                    | -                      | void   |

### CheckboxGroup Methods

| 方法       | 参数 | 返回值        |
| ---------- | ---- | ------------- |
| checkAll   | -    | ChoiceValue[] |
| inverseAll | -    | ChoiceValue[] |

### Checkbox Events

| 事件名             | 说明             | 参数                                |
| ------------------ | ---------------- | ----------------------------------- |
| update:modelValue | 提议新值         | value: CheckboxModel                |
| change             | 值变化           | value: CheckboxModel, event?: Event |
| click              | 点击；禁用不触发 | event: MouseEvent                   |
| focus              | 聚焦             | event: FocusEvent                   |
| blur               | 失焦             | event: FocusEvent                   |
| update:open | 编辑层受控开关更新 | open: boolean |
| open-change | 编辑层实际开关变化 | open: boolean |

### CheckboxGroup Events

| 事件名             | 说明                        | 参数                                               |
| ------------------ | --------------------------- | -------------------------------------------------- |
| update:modelValue | 提议新值 | value: ChoiceValue[] \| null |
| change | 值变化提案 | value: ChoiceValue[] \| null, event?: Event |
| update:open | 编辑层受控开关更新 | open: boolean |
| open-change | 编辑层实际开关变化 | open: boolean |
| load-error | 显式选项加载失败，不改变模型 | error: unknown |

### Checkbox Slots

| 插槽名             | 说明               | 参数                                                        |
| ------------------ | ------------------ | ----------------------------------------------------------- |
| checkbox           | 自定义完整控件外观 | checked: boolean, disabled: boolean, indeterminate: boolean |
| checked-icon       | 选中图标           | -                                                           |
| unchecked-icon     | 未选中图标         | -                                                           |
| indeterminate-icon | 半选图标           | -                                                           |
| default            | 标签               | checked: boolean                                            |
| read | 自定义阅读内容，优先于 empty-text | value: CheckboxModel, text: string |

### CheckboxGroup Slots

| 插槽名   | 说明              | 参数                                   |
| -------- | ----------------- | -------------------------------------- |
| checkbox | 自定义复选框      | checked: boolean<br/>disabled: boolean<br/>indeterminate: boolean |
| label    | checkbox 文案内容 | data: CheckboxOption, checked: boolean |
| read | 自定义阅读内容，优先于 empty-text | value: ChoiceValue[] \| null, text: string |
| default | 未提供 options 时的原生子选项 | - |

## Types

### CheckboxOption

| 字段          | 说明           | 类型                                                                 |
| ------------- | -------------- | -------------------------------------------------------------------- |
| value         | 选项标识       | ChoiceValue                                                          |
| label         | 标签或渲染函数 | VNodeChild \| (data: CheckboxOption, checked: boolean) => VNodeChild |
| disabled      | 禁用           | boolean                                                              |
| readonly      | 只读           | boolean                                                              |
| indeterminate | 仅展示半选状态 | boolean                                                              |

### ChoiceFieldNames

`{ label?: string; value?: string; disabled?: string; readonly?: string; indeterminate?: string }`

公开导出类型：`CheckboxOption`、`ChoiceFieldNames`、`CheckboxSlots`、`CheckboxGroupSlots`；根入口和子入口保持一致。

公开方法类型：`CheckboxGroupMethods`；`CheckboxGroupInstance` 包含上述方法。

## CSS Variables

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-checkbox-action-padding` | `6px` | `padding` |
| `--mp-checkbox-animation-duration` | `var(--mp-sys-motion-duration-standard)` | `transition` |
| `--mp-checkbox-control-border-radius` | `2px` | `border-radius` |
| `--mp-checkbox-control-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-checkbox-control-color-checked` | `var(--mp-sys-color-content-brand)` | `color`, `outline` |
| `--mp-checkbox-control-color-disabled` | `var(--mp-sys-color-content-disabled)` | `color` |
| `--mp-checkbox-control-color-error` | `var(--mp-sys-color-content-danger)` | `color` |
| `--mp-checkbox-control-size` | `24px` | `height`, `width` |
| `--mp-checkbox-group-gap` | `0` | `gap` |
| `--mp-checkbox-label-font-size` | `var(--mp-font-size-md)` | `font-size` |
| `--mp-checkbox-label-gap` | `0` | `margin-inline-start` |
| `--mp-checkbox-label-text-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-checkbox-label-text-color-disabled` | `var(--mp-sys-color-content-disabled)` | `color` |
| `--mp-checkbox-mark-color` | `var(--mp-sys-color-content-on-bright)` | `background-color`, `color` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-checkbox-action-padding: 6px;
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->

### 减少动态效果

内置 CSS 过渡遵循 `prefers-reduced-motion: reduce`。关闭过渡不改变最终显隐、选中／展开状态及事件语义；插槽内自定义动画由应用自行控制。
