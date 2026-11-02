# 单选框

### 介绍

基础示例随站点语言切换显示文案，业务值和选中状态不会随语言变化。分组示例覆盖父级接受/拒绝更新、只读和异步选项回显；移除选项不会清空业务值。外层 Space 纵向布局使用 `direction="column"`，选择组自身纵向使用 `orientation="vertical"`。

在一组备选项中进行单选。

## 阅读方向

单选组继承来源 dir。RTL 的左右方向键按可见方向移动，跳过禁用项；上下键、Home/End 保持逻辑顺序。普通与按钮式单选组均保留单一 Tab 入口，方向切换不修改已选业务值。

## 基础示例

### 基本使用

```demo
../example/demos/basic-usage.vue
```

## 外观与状态

### 禁用

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置       | 作用                   | 相关示例 |
| ---------- | ---------------------- | -------- |
| `disabled` | 禁用，未设置时继承表单 | 禁用     |
| `readonly` | 只读，未设置时继承表单 | 只读     |

<!-- demo-config-notes:end -->

```demo
../example/demos/disabled.vue
```

### 只读

```demo
../example/demos/readonly.vue
```

## 分组与布局

### 单选组声明方式

比较子项与 options 声明，选择不同项观察组值；自定义字段与异步数据仍单独展示。

<details>
<summary>配置说明与使用限制</summary>

#### 单选框组

在单选框组中，需要给 `radio` 设置 `value` 用来标识，
单选框组会绑定选择的标识。

#### 选项式 API

通过 `options` 属性设置子元素。

</details>

```demo
../example/demos/group-declaration-comparison.vue
```

### 垂直布局

> 单选框及单选框组的表单校验请使用 [FormItem 组件](#/zh-CN/form-item)。

```demo
../example/demos/vertical.vue
```

### 分组状态与只读

`model-value !== undefined` 表示受控，父级不回写时保留原值；`default-value` 只初始化非受控值。分组内只由 Group 发出 `update:model-value → change(value, event?)`，并通知 FormItem 一次，子项不重复发值变化事件。
原生输入的选中值、ARIA 状态和选中样式与模型保持一致。受控分组拒绝选择时，同时恢复原选中项和被点击项；标签、Enter 和空格激活各只提出一次更新。
Group 的 `disabled`、`readonly`、`error` 未设置时继承表单，显式 `false` 可以覆盖表单；子项不能绕过 Group 的禁用或只读限制。

```demo
../example/demos/group-state.vue
```

### 按钮尺寸

两端均支持 `variant="button"`。RadioGroup 的 `size` 支持 `xs / sm / md / lg / xl`，只调整按钮高度；普通圆形 Radio 不随 size 缩放。未设置时继承表单/全局尺寸，最终默认为 md。Group 的 variant 优先于子项。

```demo
../example/demos/button-sizes.vue
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

### 自定义字段

通过 `field-names` 属性自定义 `options` 中数据的格式。

```demo
../example/demos/custom-fields.vue
```

### 设置状态值

```demo
../example/demos/set-state.vue
```

## 交互与键盘

### 交互状态切换

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置       | 作用                     | 相关示例     |
| ---------- | ------------------------ | ------------ |
| `value`    | 选项标识                 | 交互状态切换 |
| `disabled` | 禁用，未设置时继承表单   | 交互状态切换 |
| `readonly` | 只读，未设置时继承表单   | 交互状态切换 |
| `error`    | 错误态，未设置时继承表单 | 交互状态切换 |

<!-- demo-config-notes:end -->

适用于互斥选项。调整禁用、只读、错误反馈，用相同数据观察变化。控制区始终可用，可以随时恢复编辑；错误外观本身不会触发表单校验。

```demo
../example/demos/state-lab.vue
```

### 键盘导航

Tab 进入已选项（没有已选项时进入第一个可用项）；方向键循环，Home / End 跳到首尾，跳过禁用项。只读项可聚焦但不改变值。导航仅作用于当前分组，不拦截面板内其他按钮的键盘事件。

```demo
../example/demos/keyboard-navigation.vue
```

## 控件与内容定制

### 原生控件与自定义图标

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置              | 作用                   | 相关示例                             |
| ----------------- | ---------------------- | ------------------------------------ |
| `checked-color`   | 选中状态的颜色         | 原生控件与自定义图标、修改图标和颜色 |
| `value`           | 选项标识               | 原生控件与自定义图标                 |
| `icon-size`       | 图标尺寸               | 原生控件与自定义图标                 |
| `readonly`        | 只读，未设置时继承表单 | 原生控件与自定义图标                 |
| `unchecked-color` | 未选中状态的颜色       | 修改图标和颜色                       |

<!-- demo-config-notes:end -->

两端均使用原生 radio input。Group 的 name 供原生表单提交，子项可覆盖。aria-label/input-attrs 作用于 input；组件管理的 type、checked、disabled、tabindex 不允许覆盖。图标插槽仅替换图标；#radio 替换全部可见内容，使用时须提供可访问名称。

```demo
../example/demos/native-control.vue
```

### 修改图标和颜色

```demo
../example/demos/set-style.vue
```

## 异步选项

### 异步选项

开启“手动返回”后使用真实本地Promise，不走默认定时器。连续加载两次，分别按新旧或旧新顺序返回：只有当前请求版本可替换选项、结束加载。移除选项使在途版本失效但保留业务选值；旧任务仍可手动返回。Applied/Ignored/Pending显示应用、忽略及等待数，加载/返回不增加用户变更次数。版本保护和等待清理由示例业务加载器负责，不代表Radio自动解决网络竞争，也不访问外部服务。

选项载入、移除和外部值更新均不会反向触发值变化；未载入的已选值不会自动清理。重复选择当前值不再触发 change，false、0、空字符串按实际值比较。

示例以 800ms 本地延迟模拟加载。等待期间可设为设备 A 或清空选择，选项到达后按最新模型反显；这些外部操作不会增加用户变更次数。加载中移除选项会取消待完成任务，避免旧选项重新显示。

等待期间仍可用方向键选择已加载的选项；同值选项重新加载后保留当前焦点。加载提示保持稳定节点，避免提示显隐导致分组重新挂载；重复激活当前值不会增加 change 次数。

```demo
../example/demos/async-options.vue
```

## API

### 空值识别与阅读空文案

`empty-values` 用于空值识别，`empty-value` 保留原清空输出；`empty-text` 仅在 `read-pretty` 空内容下展示，默认 `'-'`，字段 > FormItem > Form，自定义 read 插槽优先。显式配置 empty-values 后，内置 required 接入该策略，自定义校验仍收到原值。详见[统一说明](#/zh-CN/emptyValues)。

| 参数         | 类型               | 缺省与范围                                            |
| ------------ | ------------------ | ----------------------------------------------------- |
| empty-values | readonly unknown[] | 字段 > FormItem > Form > 组件族默认；完整覆盖，不合并 |
| empty-text   | string             | 字段 > FormItem > Form > '-'；显式 '' 有效            |

以上是字段展示层 API；纯面板不因此新增阅读模式。Form 与 FormItem 提供继承配置。empty-value 的现有类型与默认输出仍按该组件原 API 执行。

`ChoiceValue = string | number | boolean`；`CheckboxModel = boolean | ChoiceValue[]`；`RadioModel = ChoiceValue | null`。

### 属性

#### RadioGroup Props

| 参数                     | 说明                                                        | 类型                                                                                                    | 默认值       |
| ------------------------ | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ------------ |
| model-value (v-model)    | 受控值                                                      | RadioModel                                                                                              | undefined    |
| default-value            | 非受控初始值                                                | RadioModel                                                                                              | null         |
| `disabled`               | 禁用，未设置时继承表单                                      | _boolean_                                                                                               | `undefined`  |
| `readonly`               | 只读，未设置时继承表单                                      | _boolean_                                                                                               | `undefined`  |
| `error`                  | 错误态，未设置时继承表单                                    | _boolean_                                                                                               | `undefined`  |
| variant                  | 分组外观                                                    | radio \| button                                                                                         | radio        |
| size                     | 仅调整按钮高度                                              | ComponentSize                                                                                           | undefined    |
| `orientation`            | 单选组内选项的横纵排列，默认 horizontal；不表示文字阅读方向 | _string_                                                                                                | `horizontal` |
| options                  | 选项；传入时替代默认插槽                                    | Array<ChoiceValue \| RadioOption \| Record<string, unknown>> / `(query, { signal }) => Array / Promise` | `undefined`  |
| `aria-label` _**3.8.5**_ | 单选框组的标签                                              | _string_                                                                                                | `-`          |
| field-names              | 选项字段映射                                                | ChoiceFieldNames                                                                                        | undefined    |

#### RadioOption

| 字段     | 说明           | 类型                                                              |
| -------- | -------------- | ----------------------------------------------------------------- |
| value    | 选项标识       | ChoiceValue                                                       |
| label    | 标签或渲染函数 | VNodeChild \| (data: RadioOption, checked: boolean) => VNodeChild |
| disabled | 禁用           | boolean                                                           |
| readonly | 只读           | boolean                                                           |

#### Radio Props

| 参数                  | 说明                  | 类型                        | 默认值      |
| --------------------- | --------------------- | --------------------------- | ----------- |
| model-value (v-model) | 受控值                | ChoiceValue \| null         | undefined   |
| default-value         | 非受控初始值          | ChoiceValue \| null         | null        |
| variant               | 外观，分组设置优先    | radio \| button             | radio       |
| value                 | 选项标识              | string \| number \| boolean | true        |
| `checked-color`       | 选中状态的颜色        | _string_                    | `-`         |
| `unchecked-color`     | 未选中状态的颜色      | _string_                    | `-`         |
| `icon-size`           | 图标尺寸              | _string \| number_          | `-`         |
| `disabled`            | 未设置时继承分组/表单 | _boolean_                   | `undefined` |
| `readonly`            | 未设置时继承分组/表单 | _boolean_                   | `undefined` |
| `error`               | 错误态，继承分组/表单 | _boolean_                   | `undefined` |
| `ripple`              | 是否开启水波纹        | _boolean_                   | `true`      |

### 方法

#### Radio Methods

| 方法名 | 说明                        | 参数                   | 返回值 |
| ------ | --------------------------- | ---------------------- | ------ |
| select | 请求选择；遵守禁用/只读限制 | -                      | void   |
| focus  | 聚焦控件                    | options?: FocusOptions | void   |
| blur   | 失焦控件                    | -                      | void   |

### 事件

#### RadioGroup Events

| 事件名               | 说明                    | 参数                        |
| -------------------- | ----------------------- | --------------------------- |
| `update:model-value` | 提议新值                | `value: any`                |
| `change`             | 值变化，只由 Group 触发 | `value: any, event?: Event` |

#### Radio Events

| 事件名             | 说明       | 参数                              |
| ------------------ | ---------- | --------------------------------- |
| `click`            | 点击时触发 | `e: Event`                        |
| update:model-value | 提议新值   | value: ChoiceValue                |
| change             | 值变化     | value: ChoiceValue, event?: Event |
| focus              | 聚焦       | event: FocusEvent                 |
| blur               | 失焦       | event: FocusEvent                 |

### 插槽

#### RadioGroup Slots

| 插槽    | 说明                  | 参数                                |
| ------- | --------------------- | ----------------------------------- |
| default | 未传 options 时的子项 | -                                   |
| label   | 选项标签              | data: RadioOption, checked: boolean |

#### Radio Slots

| 插槽名           | 说明       | 参数 |
| ---------------- | ---------- | ---- |
| `checked-icon`   | 选中图标   | `-`  |
| `unchecked-icon` | 未选中图标 | `-`  |
| `default`        | 显示的文本 | `-`  |

### 样式变量

| 变量名                                 | 默认值                                   |
| -------------------------------------- | ---------------------------------------- |
| `--mp-radio-control-color-checked`     | `var(--mp-sys-color-content-brand)`      |
| `--mp-radio-control-color`             | `var(--mp-sys-color-content-secondary)`  |
| `--mp-radio-control-color-disabled`    | `var(--mp-sys-color-content-disabled)`   |
| `--mp-radio-control-color-error`       | `var(--mp-sys-color-content-danger)`     |
| `--mp-radio-control-size`              | `24px`                                   |
| `--mp-radio-action-padding`            | `6px`                                    |
| `--mp-radio-label-text-color`          | `var(--mp-sys-color-content-primary)`    |
| `--mp-radio-label-text-color-disabled` | `var(--mp-sys-color-content-disabled)`   |
| `--mp-radio-label-font-size`           | `var(--mp-font-size-md)`                 |
| `--mp-radio-label-gap`                 | `0`                                      |
| `--mp-radio-group-gap`                 | `0`                                      |
| `--mp-radio-animation-duration`        | `var(--mp-sys-motion-duration-standard)` |

### ChoiceFieldNames

`{ label?: string; value?: string; disabled?: string; readonly?: string; indeterminate?: string }`

公开导出类型：`RadioOption`、`ChoiceFieldNames`。

### 原生属性与外观补齐

| 组件               | 属性        | 说明                     | 类型                | 默认值    |
| ------------------ | ----------- | ------------------------ | ------------------- | --------- |
| Radio / RadioGroup | name        | 原生字段名，子项覆盖分组 | string              | undefined |
| Radio              | aria-label  | 原生控件的无障碍名称     | string              | undefined |
| Radio              | input-attrs | 原生 input 属性          | InputHTMLAttributes | undefined |

### Form 字段展示与确认

本组件支持 `edit-mode`，字段 > FormItem > Form 逐层继承；未指定时为 `direct`，保留直接编辑。支持值：`direct / popup`。非 direct 编辑模式通过字段值入口打开编辑面板，并维护单份草稿；确认后才更新 v-model，取消、重置或启用 readPretty 时丢弃草稿。

Maple 使用 edit-mode="popup" 点击值区域打开编辑面板；direct 直接编辑。 readPretty 为纯阅读属性，与 readonly、disabled 独立。

`before-commit(value, { previousValue, signal })` 可拦截弹层保存；FormItem 先校验候选值，失败保持编辑。`open / default-open / update:open` 控制编辑层。`#read="{ value, text }"` 可自定义阅读内容。集中示例见 Form 的“各类字段统一展示”。

`read-pretty` 为独立布尔属性，与 `readonly`、`disabled` 同级；字段 > FormItem > Form 继承，显式 `false` 覆盖父级。默认 `false`。纯阅读不显示编辑器。

`empty-value` 可显式设为 `null`（或 `() => null`），清空时原样提交 null；省略时保留组件原默认值。界面把 null 显示为空，不会把普通输入的空字符串自动转成 null。支持弹出编辑的字段中，清空先修改草稿，确认后提交，取消则保留原值。

候选属性 `options` 支持数组或 `(query, { signal }) => 数组/Promise`。加载、取消、过期结果隔离由组件内部处理，失败触发 load-error。单选/多选分组初始化以空字符串查询，搜索型字段在查询变化时调用；树形字段根数据与原有 load-more 子节点懒加载独立。
