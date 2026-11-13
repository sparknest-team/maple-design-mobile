# 选择框

多选时，`inline` 下拉只显示选项；已选内容、单项移除和清空由输入框承担。`popup` 编辑面板保留“已选／清空”，选择为草稿，确认后提交。

## 阅读方向

选择框继承来源 `dir`；独立使用时默认按阅读起点对齐，在 FormItem 内继续继承其 content-align。显式 left/right 保持物理对齐；标签保持业务数组顺序，空搜索时 Backspace 删除最后一个可关闭值。下拉与选择面板携带来源方向，自定义 popup-container 不覆盖该方向。

## 基础示例

### 基础用法

点击展开选项，选中后回填并收起；清除后可重新选择。本例只演示单选。

```demo
../example/demos/standard.vue
```

## 外观与状态

### 外观配置对比

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置        | 作用                                                | 相关示例                       |
| ----------- | --------------------------------------------------- | ------------------------------ |
| `options`   | 原始值、对象、分组均支持；三种展示使用同一数据源    | 外观配置对比、表单控件尺寸对照 |
| `clearable` | 允许清除，保留禁用的已选项                          | 外观配置对比、表单控件尺寸对照 |
| `disabled`  | 禁止选择与移除                                      | 表单控件尺寸对照               |
| `edit-mode` | 字段展示；未指定时继承 FormItem/Form                | 表单控件尺寸对照               |
| `size`      | 完整支持 xs、sm、md、lg、xl，未设置时继承分组与表单 | 表单控件尺寸对照               |
| `variant`   | filled、outline、standard；未设置时继承 InputGroup  | 表单控件尺寸对照               |

<!-- demo-config-notes:end -->

选择一个对比维度后，同屏展示它的全部可选值；其余配置和内容保持一致。可切换其他配置检查组合效果；输入类预览共享一个值。

<details>
<summary>配置说明与使用限制</summary>

#### 外观组合

适用于选项数据明确的单选输入。调整变体、尺寸，用相同数据观察变化。内容保持一致，便于比较不同设置的实际效果。

</details>

```demo
../example/demos/appearance-lab.vue
```

### 表单控件尺寸对照

切换五档 size 和三种字段变体，比较 Input、Button、Select、日期时间及其他单行表单控件的高度。Button 在这里固定使用 outline。DatePicker/TimePicker 是面板，此处使用带输入框的 Date/Time 字段。示例同时展示有值、可清空、标签删除与长标签多选；Select/Cascader 设置 tag-nowrap 时保持同档高度，长标签文字省略、删除图标保留；标签行可横向滚动，清空按钮和箭头固定在外侧。被省略的标签正文支持悬停、键盘聚焦或点按查看完整文字，点外部或按 Esc 关闭，不改变选中值。可清空后恢复选中值重复比较。多行文本和允许换行的多选内容按内容撑高。

```demo
../../field-decorator/example/demos/control-sizes.vue
```

## 选择模式与选项

### 多选

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置          | 作用                                               | 相关示例                         |
| ------------- | -------------------------------------------------- | -------------------------------- |
| `placeholder` | 占位文本                                           | 多选、同名选项、标签与绑定值     |
| `variant`     | filled、outline、standard；未设置时继承 InputGroup | 多选、同名选项、标签与绑定值     |
| `multiple`    | 多选；默认启用搜索                                 | 多选、同名选项、子组件选项与分组 |
| `options`     | 原始值、对象、分组均支持；三种展示使用同一数据源   | 同名选项、分组间距、选项数据     |
| `show-tags`   | 多选值以标签展示；false 改用分隔文本               | 多选、同名选项                   |
| `clearable`   | 允许清除，保留禁用的已选项                         | 同名选项、子组件选项与分组       |

<!-- demo-config-notes:end -->

```demo
../example/demos/multiple.vue
```

### 单选确认方式

仅弹出编辑模式生效。单选默认点选即提交并关闭，设为 true 时先编辑草稿、再点确认；多选默认保留确认。提交仍执行表单校验和 before-commit，拒绝时不关闭。

```demo
../example/demos/confirmation.vue
```

### 同名选项

选项可以具有相同的 label，但 value 必须唯一。删除标签按 value 定位，不按标题匹配。以下三种展示方式删除第二个“设备”都只会移除 ID 2。

```demo
../example/demos/same-label.vue
```

### 标签与绑定值

```demo
../example/demos/value-mapping.vue
```

### 分组间距

```demo
../example/demos/group-spacing.vue
```

### 子组件选项与分组

使用 Option、Optgroup 子组件配置候选，演示分组标题插槽、选项内容与前后缀，以及禁用和多选状态。

```demo
../example/demos/options-review.vue
```

### 管理已选项

多选面板顶部提供已选数量与清空。Cedar 在列表上方显示可删除标签；Maple 点击数量查看已选明细，支持逐项移除并返回可选项。popup/popover 与 dialog 共用该内容。移除和清空先修改草稿，关闭取消会恢复原值，确认后才提交；禁用项保留，异步确认期间禁用操作。面板的清空入口独立于字段清空图标。

单选和多选的已选行右侧均显示主色对勾；仅候选高亮时不显示对勾。确认式编辑面板内的对勾表示当前草稿选择，确认后提交表单；禁用已选项保持禁用外观。

### 选项数据

```demo
../example/demos/options.vue
```

### 字段映射

```demo
../example/demos/field-names.vue
```

## 搜索与过滤

### 搜索匹配规则

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置             | 作用                                             | 相关示例     |
| ---------------- | ------------------------------------------------ | ------------ |
| `options`        | 原始值、对象、分组均支持；三种展示使用同一数据源 | 搜索匹配规则 |
| `case-sensitive` | 内置本地过滤是否区分大小写，自定义过滤函数优先   | 搜索匹配规则 |
| `search-delay`   | search 事件防抖时长（毫秒）                      | 搜索匹配规则 |
| `filterable`     | 开启搜索，可设置 retainInputValue                | 搜索匹配规则 |
| `placeholder`    | 占位文本                                         | 搜索匹配规则 |

<!-- demo-config-notes:end -->

`case-sensitive` 默认 false，只控制内置本地匹配是否区分大小写；自定义过滤函数优先。远程结果可设置 `:filter-option="false"`，不再执行本地筛选。

同时匹配 value 和 label 可直接配置 `:search-fields="['value', 'label']"`；下面的示例不再需要自定义过滤函数。

```demo
../example/demos/search-matching.vue
```

## 内容与下拉定制

### 自定义图标

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置          | 作用                                               | 相关示例                                 |
| ------------- | -------------------------------------------------- | ---------------------------------------- |
| `placeholder` | 占位文本                                           | 自定义图标、弹层与阅读展示、复杂插槽组合 |
| `options`     | 原始值、对象、分组均支持；三种展示使用同一数据源   | 弹层与阅读展示、复杂插槽组合             |
| `multiple`    | 多选；默认启用搜索                                 | 弹层与阅读展示、复杂插槽组合             |
| `clearable`   | 允许清除，保留禁用的已选项                         | 弹层与阅读展示、复杂插槽组合             |
| `variant`     | filled、outline、standard；未设置时继承 InputGroup | 自定义图标                               |
| `edit-mode`   | 字段展示；未指定时继承 FormItem/Form               | 弹层与阅读展示                           |

<!-- demo-config-notes:end -->

```demo
../example/demos/custom-icons.vue
```

### 弹层与阅读展示

```demo
../example/demos/dialog.vue
```

```demo
../example/demos/popup.vue
```

统一对比见 Form 文档中的“字段展示与确认提交”。inline 使用普通字段；popup 使用底部列表；dialog 使用对话框；read 只展示名称。

### 展示与提交规则

inline 默认即选即提交；popup 单选默认即选即提交，多选或显式开启 need-confirm 时确认后提交，取消、遮罩关闭、Escape 或切换展示方式均丢弃未提交的草稿。外部 modelValue 更新优先于草稿。Cedar 支持 direct / click / dblclick，Maple 支持 direct / popup。

### 复杂插槽组合

```demo
../example/demos/slots-review.vue
```

### 介绍

通过下拉菜单展示并选择内容。

## 值模型与联动

### 候选高亮与表单数据流

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置                          | 作用                                                                                                                    | 相关示例                                               |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `options`                     | 原始值、对象、分组均支持；三种展示使用同一数据源                                                                        | 候选高亮与表单数据流、空值识别与清空输出、交互状态对比 |
| `clearable`                   | 允许清除，保留禁用的已选项                                                                                              | 空值识别与清空输出、清除选择、交互状态对比             |
| `placeholder`                 | 占位文本                                                                                                                | 候选高亮与表单数据流、清除选择                         |
| `edit-mode`                   | 字段展示；未指定时继承 FormItem/Form                                                                                    | 候选高亮与表单数据流                                   |
| `default-active-first-option` | 打开选项列表时，无有效选中项则默认激活首个可用候选；仅高亮，不更新 modelValue 或触发 change。已有有效选中项优先激活该项 | 候选高亮与表单数据流                                   |
| `empty-value`                 | 清空输出覆盖；多选返回数组，保留不可清除项                                                                              | 空值识别与清空输出                                     |

<!-- demo-config-notes:end -->

初始 `form.city` 为 `undefined`。打开面板只激活候选行，不触发 `update:modelValue` 或 `change`，表单仍为空。inline 点击选项或按 Enter 后提交；popup 在面板内选择只是草稿，确认后才提交，取消不改变表单。两个示例分别显示已提交值、更新次数和真实事件日志；日志按最新在前排列。

```demo
../example/demos/selection-data-flow.vue
```

### 空值识别与清空输出

本例把空字符串保留为合法的“全部”选项，清空按钮返回 null。先观察“全部”已选，再点击清空；两种状态在模型输出中分别是空字符串和 null。搜索框删空不会删除已选值。下方另列多选清空返回 []、单选用工厂明确返回 undefined 的情况，分别显示模型值。

```demo
../example/demos/empty-value.vue
```

### 清除选择

```demo
../example/demos/clearable.vue
```

### 交互状态对比

在同一实例上切换禁用、只读和错误状态后再操作控件，比较可编辑性和交互反馈。恢复开关位于目标控件外；错误外观本身不会执行校验。

<details>
<summary>配置说明与使用限制</summary>

#### 交互状态切换

适用于选项数据明确的单选输入。调整禁用、只读、错误反馈，用相同数据观察变化。控制区始终可用，可以随时恢复编辑；错误外观本身不会触发表单校验。

</details>

```demo
../example/demos/state-lab.vue
```

## 异步数据与搜索

### 加载状态

切换加载状态，对比默认指示器与底部加载线。加载期间保留已选值，暂停选择与确认；关闭加载后恢复。

```demo
../example/demos/loading.vue
```

### 异步设备与 ID 回显

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置                 | 作用                                                                      | 相关示例                                                               |
| -------------------- | ------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `options`            | 原始值、对象、分组均支持；三种展示使用同一数据源                          | 异步设备与 ID 回显、共用异步数据源（进阶可选）、函数属性：初始化与搜索 |
| `filterable`         | 开启搜索，可设置 retainInputValue                                         | 异步设备与 ID 回显、共用异步数据源（进阶可选）、函数属性：初始化与搜索 |
| `loading`            | 加载状态；禁止选择和确认                                                  | 异步设备与 ID 回显、共用异步数据源（进阶可选）                         |
| `edit-mode`          | 字段展示；未指定时继承 FormItem/Form                                      | 异步设备与 ID 回显                                                     |
| `field-names`        | value、label、disabled、tagProps、render 字段映射；对象值须有唯一标识字段 | 异步设备与 ID 回显                                                     |
| `virtual-list-props` | 选项面板 的虚拟列表参数                                                   | 异步设备与 ID 回显                                                     |

<!-- demo-config-notes:end -->

```demo
../example/demos/async-devices.vue
```

### 共用异步数据源（进阶可选）

常规使用给 options 直接传入加载函数，组件内部负责异步状态。只有需要多个组件共享同一份结果、或组合不同控件时，才在业务层选用公开 useAsyncData；这不是组件的必需接入步骤。options/data 同时支持数组和加载函数，组件不解析业务响应。

```demo
../example/demos/async-source.vue
```

### 函数属性：初始化与搜索

```demo
../example/demos/async-data.vue
```

## 配置与生命周期

### 透传配置边界与优先级

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置                  | 作用                                                                                                                 | 相关示例                                                                        |
| --------------------- | -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `edit-mode`           | 字段展示；未指定时继承 FormItem/Form                                                                                 | 透传配置边界与优先级、交互调度生命周期、Thumb drag lifecycle / 滑块拖动生命周期 |
| `options`             | 原始值、对象、分组均支持；三种展示使用同一数据源                                                                     | 透传配置边界与优先级、交互调度生命周期、Thumb drag lifecycle / 滑块拖动生命周期 |
| `trigger-props`       | 可选的下拉浮层 Trigger 配置；placement 默认 bottom-start，空间不足时自动调整；字段拥有展开状态，不提供顶层 placement | 透传配置边界与优先级                                                            |
| `scrollbar`           | 选项面板 滚动条配置                                                                                                  | Thumb drag lifecycle / 滑块拖动生命周期                                         |
| `open-trigger-target` | 打开面板的点击区域：field 为整个字段，icon 仅右侧选择按钮。清除、移除等独立操作除外；不影响键盘展开和受控 open。     | 复制与编辑                                                                      |
| `filterable`          | 开启搜索，可设置 retainInputValue                                                                                    | 复制与编辑                                                                      |

<!-- demo-config-notes:end -->

建议使用 `SelectTriggerOptions` 声明 trigger-props。open/defaultOpen、disabled 和展开更新归 Select 管理。popup-container 顶层明确传入时优先（包括 false），否则回退 triggerProps.popupContainer。其他属性保持现有顺序：Trigger 默认配置 → 顶层 auto-fit-popup-width / unmount-on-close → trigger-props；因此旧嵌套配置仍可覆盖后两项。此兼容阶段不改为“顶层永远优先”。内部展开监听继续执行，通知使用 Select 事件。

建议使用本页列出的专用配置类型；展开状态、模型和事件由组件管理，不能通过嵌套配置接管。

```ts
import type { SelectTriggerOptions } from '@maple-design/ui-vue'
```

```demo
../example/demos/passthrough-options.vue
```

### 交互调度生命周期

```demo
../example/demos/scheduler-lifecycle.vue
```

选项分组与 Menu 使用一致的间距逻辑：标题行高 20px，上下各 4px 留白（总高 28px）；后续分组前额外留 8px，首组不添加组间距。标题与选项文字左对齐；AutoComplete 的标题缩进跟随其选项水平 padding 配置。

### Thumb drag lifecycle / 滑块拖动生命周期

拖动期间改变方向或滑块尺寸会结束当前拖动；只替换内容相同的 data 对象不会中断。setOffset 将偏移限制在有效范围内，拖动期间调用不会覆盖正在进行的拖动。非鼠标主键不启动操作，轨道点击按一个滑块长度步进。

```demo
../example/demos/thumb-lifecycle.vue
```

### Scrollbar consumer lifecycle / 滚动条消费者生命周期

scrollTo(0,0)／单轴0是合法坐标，不用真值判断；恢复零位置也同步thumb，不保留上次偏移。水平滚动按横向可滚动范围计算。零／无效视口用有限、非负thumb数据，不显示该零尺寸轴；正常最小thumb20px与track15px布局策略不变。禁用／隐藏轴的旧thumb命令无效，但禁用条不等于禁止内容或公开原生滚动。对象选项直接透传、不模拟JS动画；公开方法签名／样式变量不变。

```demo
../example/demos/scrollbar-lifecycle.vue
```

### 复制与编辑

通过 open-trigger-target 独立控制打开区域；icon 模式下点击、聚焦和输入不会自动展开。input-editable / filterable 仍负责是否可编辑或搜索。右侧按钮、显式键盘展开和受控 open 可打开面板。

```demo
../example/demos/open-trigger-target.vue
```

### 共享字段加载

`loading` 控制共享字段加载状态；`loading-mode` 为 `default`（指示器）或 `line`（底部不定进度线），默认 `default`。渲染统一由 FieldDecorator 负责；Select 原有 loading 语义仍会暂停选择和确认，允许搜索。

## 使用说明

### 编辑方式
展示容器使用内部 `src/_components/field-presentation/token.less`，复用系统表面色、间距与尺寸变量。选项列表继续使用 Select 的现有 Token。

`read-pretty` 为独立布尔属性，与 `readonly`、`disabled` 同级；字段 > FormItem > Form 继承，显式 `false` 覆盖父级。默认 `false`。纯阅读不显示编辑器。

### 搜索字段
`searchFields` / `search-fields` 是只读 `('label' | 'value')[]`，默认 `['label']`；多字段为 OR 匹配，大小写默认不敏感。配置 `['value', 'label']` 可同时搜索编码和名称，fieldNames 将语义字段映射到业务字段；空数组对非空查询不匹配任何项。value 采用字符串比较，不做对象深层搜索，对象值或拼音等复杂规则仍用自定义回调。自定义回调优先并自行决定大小写；远程结果使用原有关闭本地过滤协议。Cascader 保留路径语义，会检查路径各节点的配置字段。

### 配置说明

单选和多选选项统一使用 popup-option-padding-horizontal。组件没有隐式搜索高亮 DOM；自定义选项插槽负责其高亮片段样式。

## API

### 空值识别与阅读空文案

`empty-values` 用于空值识别，`empty-value` 保留原清空输出；`empty-text` 仅在 `read-pretty` 空内容下展示，默认 `'-'`，字段 > FormItem > Form，自定义 read 插槽优先。显式配置 empty-values 后，内置 required 接入该策略，自定义校验仍收到原值。详见[统一说明](#/zh-CN/emptyValues)。

| 参数         | 类型               | 缺省与范围                                            |
| ------------ | ------------------ | ----------------------------------------------------- |
| empty-values | readonly unknown[] | 字段 > FormItem > Form > 组件族默认；完整覆盖，不合并 |
| empty-text   | string             | 字段 > FormItem > Form > '-'；显式 '' 有效            |

以上是字段展示层 API；纯面板不因此新增阅读模式。Form 与 FormItem 提供继承配置。empty-value 的现有类型与默认输出仍按该组件原 API 执行。

### 清空值

`SelectValue` 包含 `undefined`。默认单选清空发出 `''`；当前候选中有 `value: ''` 时发出 `undefined`，用于区分清空与选中空字符串选项。`change` 和 `update:modelValue` 均使用 `SelectValue` 类型。

`empty-value` 指定清空输出；省略时保留原有默认值。单选可使用 `() => undefined` 明确返回 undefined；多选应返回符合模型形状的数组。存在不可清除的禁用选中项时，优先保留这些项，不执行清空覆盖。受控模式仍需父级接受更新。

根入口与组件入口均导出 `SelectValue`、`SelectEmptyValue`。

### Select Props

分别使用 `v-model`、`v-model:open` 和 `v-model:input-value` 控制选中值、展开状态和搜索词。单选清空为 `''`，多选为 `[]`；Select 存在真实空字符串选项时，清空值为 `undefined`。

| 属性 | 说明 | 类型 | 默认值 |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ---------------------------- |
| need-confirm | 仅弹出编辑模式生效。单选默认点选即提交并关闭，设为 true 时先编辑草稿、再点确认；多选默认保留确认。提交仍执行表单校验和 before-commit，拒绝时不关闭。 | `boolean` | 单选 `false`；多选 `true` |
| `model-value` | 受控选中值，支持 v-model | `Value \| null` | `undefined` |
| `default-value` | 非受控初始选中值，仅初始化时读取 | `Value` | 单选：`''`；多选：`[]` |
| `open` | 受控展开状态，支持 v-model:open | `boolean` | `undefined` |
| `default-open` | 非受控初始展开状态，仅初始化时读取 | `boolean` | `false` |
| `open-trigger-target` | 打开面板的点击区域：field 为整个字段，icon 仅右侧选择按钮。清除、移除等独立操作除外；不影响键盘展开和受控 open。 | `'field' \| 'icon'` | `'field'` |
| `input-value` | 受控搜索文本，独立于选中值，支持 v-model:input-value | `string` | `undefined` |
| `default-input-value` | 非受控初始搜索文本，独立于选中值，仅初始化时读取 | `string` | `''` |
| `multiple` | 多选；默认启用搜索 | `boolean` | `false` |
| `size` | 完整支持 xs、sm、md、lg、xl，未设置时继承分组与表单 | `ComponentSize`<br>`'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `md` |
| `variant` | filled、outline、standard；未设置时继承 InputGroup | `FieldDecoratorVariant`<br>`'filled' \| 'outline' \| 'standard'` | `outline` |
| `disabled` | 禁用状态；显式值优先于继承的 Form / Group 状态 | `boolean` | `undefined` |
| `readonly` | 只读状态；显式值优先于继承的 Form / Group 状态 | `boolean` | `undefined` |
| `error` | 错误状态；显式值优先于继承的 Form / Group 状态 | `boolean` | `undefined` |
| `placeholder` | 占位文本 | `string` | `—` |
| `hint` | 是否启用浮动提示 | `boolean` | `true` |
| `line` | 是否显示 standard 变体的下划线 | `boolean` | `true` |
| `text-color` | 逐实例自定义文字颜色；静态主题优先使用 token | `string` | `—` |
| `focus-color` | 逐实例自定义聚焦颜色；静态主题优先使用 token | `string` | `—` |
| `blur-color` | 逐实例自定义未聚焦颜色；静态主题优先使用 token | `string` | `—` |
| `loading` | 加载时暂停选择、清空、标签移除与确认；保留已有值，搜索和关闭仍可用。 | `boolean` | `false` |
| `loading-mode` | 加载布局：默认指示器或底部加载线 | `default / line` | `default` |
| `show-tags` | 多选值以标签展示；false 改用分隔文本 | `boolean` | `true` |
| `separator` | show-tags=false 时的多选分隔符 | `string` | `,` |
| `text-align` | 文字对齐 left / center / right；未设置时继承 FormItem 的 content-align，独立使用默认阅读起点 start | `'left' \| 'center' \| 'right'` | `-` |
| `max-tag-count` | 有限非负整数；0 不限制标签展示数量。 | `number` | `0` |
| `tag-nowrap` | 标签单行显示；长文字省略、删除图标保留，标签行可横向滚动；悬停、聚焦或点按省略正文查看全文 | `boolean` | `false` |
| `popup-container` | 选择器、元素、返回元素的函数或 false（原地渲染） | `PopupContainer` | `—` |
| `trigger-props` | 可选的下拉浮层 Trigger 配置；placement 默认 bottom-start，空间不足时自动调整；字段拥有展开状态，不提供顶层 placement | `TriggerProps` | `—` |
| `virtual-list-props` | 选项面板 的虚拟列表参数 | `VirtualListProps` | `—` |
| `search-delay` | 有限非负搜索防抖毫秒数。 | `number` | `500` |
| `format-label` | 格式化已选标签；VNode 使用 label 插槽 | `function` | `—` |
| `clearable` | 允许清除，保留禁用的已选项 | `boolean` | `true` |
| `empty-value` | 清空覆盖值；多选接受数组或已识别空值，非法标量回退为空数组；优先保留禁用选中项。 | `SelectEmptyValue` | `undefined` |
| `options` | 原始值、对象、分组均支持；三种展示使用同一数据源 | `SelectOption[]` / `(query, { signal }) => Array / Promise` | `undefined` |
| `field-names` | value、label、disabled、tagProps、render 字段映射；对象值须有唯一标识字段 | `SelectFieldNames` | `—` |
| `filterable` | 开启搜索，可设置 retainInputValue | `boolean 或 { retainInputValue?: boolean }` | `单选 false / 多选 true` |
| case-sensitive | 内置本地过滤是否区分大小写，自定义过滤函数优先 | boolean | false |
| `filter-option` | false 关闭本地过滤；函数接收搜索词和原始选项 | `boolean 或 (input, option) => boolean` | 自动：数组开启，加载函数关闭 |
| `creatable` | 允许创建不存在的选项 | `boolean` | `false` |
| `fallback-option` | 异步选项未到达时反显值，或返回完整回退选项 | `boolean 或 (value) => SelectOptionData` | `true` |
| `show-extra-options` | 菜单中展示回退/创建选项 | `boolean` | `true` |
| `limit` | 有限非负整数；0 不限制多选数量。 | `number` | `0` |
| `auto-fit-popup-width` | Menu 与字段等宽 | `boolean` | `true` |
| `default-active-first-option` | 打开选项列表时，无有效选中项则默认激活首个可用候选；仅高亮，不更新 modelValue 或触发 change。已有有效选中项优先激活该项 | `boolean` | `true` |
| `unmount-on-close` | 关闭 Menu 后销毁内容 | `boolean` | `false` |
| `scrollbar` | 选项面板 滚动条配置 | `boolean 或 ScrollbarProps` | `true` |
| `show-header-on-empty` | 空状态下仍显示 header | `boolean` | `false` |
| `show-footer-on-empty` | 空状态下仍显示 footer | `boolean` | `false` |
| `edit-mode` | 字段展示；未指定时继承 FormItem/Form | `direct / popup` | `popup` |
| `before-commit` | 确认前调用 ({ value, previousValue }, done, { signal })；布尔、Promise 或 done 完成，同步 undefined 等待 done。 | `BeforeFieldCommit` | — |

### Select Events / Methods

- `update:modelValue`、`change(value)`：提交时触发，编辑草稿不触发。
- `update:open`、`open-change(open)`：请求改变展开状态。
- `update:inputValue`、`input-value-change(text)`、`search(text)`：搜索状态。
- `focus(event)`、`blur(event)`、`clear(event)`：原生字段事件；只有字段所有者通知 Form。
- 方法：`focus()`、`blur()`。

Select 还提供 `remove(value)`、`exceed-limit(value, event)`、`dropdown-scroll(event)`、`dropdown-reach-bottom(event)`。

### 插槽与选项数据

使用 `label({ data })` 自定义已选标签，`selected` 替换整个已选区域。还支持 `prefix`、`suffix`、`clear-icon({ clear })`、`arrow-icon`、`loading-icon`、`search-icon`、`empty`、`option({ data })`。

选项 `label` 是用于搜索的纯文本；自定义选项内容使用 `render` 或 `option` 插槽，自定义反显使用 `format-label` 或 `label` 插槽。以 value 而非 label 识别选项。选项的 `disabled` 禁止选择和删除，`tagProps` 可定制已选标签。 它支持 `style` 和 `onClose` 等监听；标签的显示和可移除状态由 Select 根据当前状态控制，关闭事件同时参与 Select 的移除流程。

Select 还支持 `header`、`footer`、`trigger` 和默认插槽中的 `Option / Optgroup`。Option 属性为 `value`、`label`、`disabled`、`tagProps`、`index`；默认插槽提供 `selected`。分组数据为 `{ isGroup: true, label, options }`。所有编辑展示共用相同选项模型；read 插槽可自定义阅读内容。

### Option Props

| 属性 | 说明 | 类型 | 默认值 |
| --------- | ------------------------------------- | ------------------------------------------------------ | --------- |
| value | 选项值，未传时取 label 或默认插槽文本 | string \| number \| boolean \| Record<string, unknown> | undefined |
| label | 搜索与已选标签使用的文本 | string | undefined |
| disabled | 禁止选择与移除 | boolean | false |
| tag-props | 已选标签属性、原生属性和 Tag 事件监听 | SelectOptionTagProps | undefined |
| index | 手动指定选项顺序 | number | undefined |

### Option Slots

| 插槽    | 说明           | 参数                  |
| ------- | -------------- | --------------------- |
| default | 自定义选项内容 | { selected: boolean } |
| icon    | 选项图标       | -                     |
| suffix  | 选项后缀       | -                     |

### Optgroup Props

| 属性 | 说明 | 类型 | 默认值 |
| ----- | -------- | ------ | --------- |
| label | 分组标题 | string | undefined |

### Optgroup Slots

| 插槽    | 说明                   | 参数 |
| ------- | ---------------------- | ---- |
| label   | 自定义分组标题         | -    |
| default | 分组下的 Option 子组件 | -    |

### Select Slots

| 插槽         | 说明                     | 参数            |
| ------------ | ------------------------ | --------------- |
| default      | Option / Optgroup 子组件 | -               |
| option       | 自定义选项内容           | { data }        |
| label        | 自定义已选标签           | { data }        |
| selected     | 替换整个已选区域         | -               |
| header       | 菜单页头                 | -               |
| footer       | 菜单页脚                 | -               |
| trigger      | 自定义选择器触发器       | -               |
| prefix       | 字段前缀                 | -               |
| suffix       | 字段后缀                 | -               |
| clear-icon   | 自定义清空操作           | { clear }       |
| arrow-icon   | 下拉箭头                 | -               |
| search-icon  | 搜索图标                 | -               |
| loading-icon | 加载图标                 | -               |
| empty        | 无选项内容               | -               |
| read         | 阅读展示                 | { value, text } |

### Select Events

| 事件                  | 说明         | 参数         |
| --------------------- | ------------ | ------------ |
| update:model-value    | 更新绑定值   | value        |
| change                | 提交选择     | value        |
| update:open           | 请求展开状态 | open         |
| open-change           | 展开状态改变 | open         |
| update:input-value    | 更新搜索文本 | text         |
| input-value-change    | 搜索文本改变 | text         |
| search                | 搜索通知     | text         |
| focus                 | 字段获得焦点 | event        |
| blur                  | 字段失去焦点 | event        |
| keydown               | 字段或编辑器搜索按键；`preventDefault()` 阻止内部键盘处理 | event: KeyboardEvent |
| clear                 | 清空选择     | event        |
| remove                | 移除已选项   | value        |
| exceed-limit          | 超过多选上限 | value, event |
| dropdown-scroll       | 菜单滚动     | event        |
| dropdown-reach-bottom | 菜单滚到底部 | event        |

### Select Methods

| 方法  | 说明             | 参数 |
| ----- | ---------------- | ---- |
| focus | 聚焦实际字段     | -    |
| blur  | 移出实际字段焦点 | -    |

异步搜索时应在新请求开始时清除旧候选，并只采纳当前搜索词的最后一次响应。远程结果可配合 `loading`、`:filter-option="false"`、`show-extra-options="false"` 使用，避免将 ID 回显项当作搜索候选。popup 内方向键与 Enter 操作当前候选；确认模式通过底部按钮提交，单选即时模式选中即提交。确认模式校验失败保留草稿；确认期间锁定编辑和关闭，表单重置会关闭 popup 并中止提交。请求归属应在关闭和重置时失效，完整示例见 Form 的“各类字段统一展示”。

## Types

### 类型导入
根入口和组件入口均导出 `SelectEmits`、`SelectSlots`、`SelectExpose`，与 Props、Instance 配套。可通过实例调用 `focus()`、`blur()`。

## 函数属性加载候选

直接传 options(query, { signal })，无需调用 useAsyncData。options 继续接收数组，显式数组（包括 []）优先。组件内部管理 loading、旧结果隔离与请求取消；load-error 通知失败，实例 refresh() 重试。业务函数可只接收 query，忽略第二参数。

filterable 表示允许输入搜索词。filterOption 只控制本地候选匹配，从不发请求。使用 options 加载函数时默认不再二次过滤远程结果；仅传数组时默认启用本地匹配。业务通常无需设置 filter-option。

```vue
<mp-select v-model="value" :options="loadOptions" filterable />
```

`empty-value` 可显式设为 `null`（或 `() => null`），清空时原样提交 null；省略时保留组件原默认值。界面把 null 显示为空，不会把普通输入的空字符串自动转成 null。确认式弹出编辑中，清空先修改草稿并在确认后提交；无需确认时清空会直接提交。

守卫统一使用 `(payload, done, context)`：关闭 payload 为 `{ action }`，切换和提交为 `{ value, previousValue }`，Popup 为 `{ reason }`。context 提供 `signal` 和可选原始 `event`。返回 boolean/Promise，或调用 done()/done(false)；同步 void 等待 done，Promise&lt;void&gt; 放行。首次完成生效。等待期间自动管理 loading/disabled，取消后旧结果失效，不暴露内部按钮 refs。

focus() 在 direct 模式聚焦原生输入；延迟模式关闭时聚焦引用而不打开，打开后聚焦当前编辑器。blur() 使当前输入或编辑器失焦，不重新打开或模拟选择；缓存复用和重新挂载都查找当前目标。

公开实例类型 SelectInstance/SelectExpose 与 PeopleSelectInstance/PeopleSelectExpose 对齐既有方法；PeopleSelectExpose 可从根入口及组件子入口导入。refresh() 返回 `Promise<void>`；选项为函数时按既有协议重读选项，不表示保存或业务动作完成。

SelectEditMode 在根入口和 select 子入口一致导出，值沿用各端 edit-mode 的公开枚举。

### 加载期间的选择动作

手动 loading 或当前候选请求处于加载状态时，纯选择字段保留已有值，暂停新选择、清空与标签移除。被阻止的动作不发送业务通知，也不提交模型。字段搜索仍可输入，disabled/readonly 不因此改写；需要禁止搜索时单独设置。

延迟编辑层的清空和确认在此期间不可用，仍可取消或关闭。手动标记和当前请求都结束后，操作按正常规则恢复，并继续尊重禁用选项。Input、AutoComplete 等自由文本字段的 loading 继续允许文本编辑与清空，不套用选择值的暂停规则。

通过对象 `value` 或 `options` 传递业务数据。

多选 empty-value 支持数组、null/undefined 和 empty-values 识别的空值；不接受其他标量。工厂仅在实际清空且无禁用保留项时执行，非法结果开发期提示并回退为 []，不向模型写入非法标量。

后续验收（尚未完成）：使用真实读屏器（如 VoiceOver、NVDA）及受支持的浏览器，检查字段名称、单选与多选、分组和虚拟列表、键盘导航、加载及表单错误的实际播报。

## CSS Variables

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-select-popup-bg` | `var(--mp-sys-color-surface-overlay)` | `background-color` |
| `--mp-select-popup-border-color` | `var(--mp-sys-color-border-subtle)` | `border`, `border-bottom`, `border-top` |
| `--mp-select-popup-border-radius` | `var(--mp-sys-radius-lg)` | `border-radius` |
| `--mp-select-popup-box-shadow` | `0 8px 24px rgba(0, 0, 0, 0.08)` | `box-shadow` |
| `--mp-select-popup-font-size` | `var(--mp-sys-font-size-md)` | `font-size` |
| `--mp-select-popup-group-title-font-size` | `var(--mp-sys-font-size-xs)` | `font-size` |
| `--mp-select-popup-group-title-height` | `20px` | `line-height` |
| `--mp-select-popup-group-title-padding-horizontal` | `var(--mp-select-popup-option-padding-horizontal)` | `padding` |
| `--mp-select-popup-group-title-padding-top` | `var(--mp-sys-space-4)` | `margin-top` |
| `--mp-select-popup-group-title-text-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-select-popup-loading-min-height` | `50px` | `min-height` |
| `--mp-select-popup-max-height` | `200px` | `max-height` |
| `--mp-select-popup-option-bg` | `transparent` | `background-color` |
| `--mp-select-popup-option-bg-disabled` | `transparent` | `background-color` |
| `--mp-select-popup-option-bg-hover` | `var(--mp-sys-color-state-hover)` | `background`, `background-color` |
| `--mp-select-popup-option-bg-selected` | `transparent` | `background`, `background-color` |
| `--mp-select-popup-option-bg-selected-hover` | `var(--mp-select-popup-option-bg-hover)` | `background`, `background-color` |
| `--mp-select-popup-option-border-radius` | `0` | `border-radius` |
| `--mp-select-popup-option-check-color` | `var(--mp-sys-color-action-primary)` | `color` |
| `--mp-select-popup-option-check-gap` | `var(--mp-sys-space-4)` | `margin-inline-start` |
| `--mp-select-popup-option-check-size` | `var(--mp-sys-font-size-md)` | `height`, `width` |
| `--mp-select-popup-option-font-weight-selected` | `var(--mp-sys-font-weight-medium)` | `font-weight` |
| `--mp-select-popup-option-height` | `36px` | `line-height` |
| `--mp-select-popup-option-icon-margin-right` | `var(--mp-sys-space-4)` | `margin-inline-end` |
| `--mp-select-popup-option-padding-horizontal` | `var(--mp-sys-space-4)` | `padding`, `padding-inline` |
| `--mp-select-popup-option-suffix-icon-margin-left` | `var(--mp-sys-space-5)` | `margin-inline-start` |
| `--mp-select-popup-option-text-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-select-popup-option-text-color-disabled` | `var(--mp-sys-color-content-disabled)` | `color` |
| `--mp-select-popup-option-text-color-hover` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-select-popup-option-text-color-selected` | `var(--mp-sys-color-action-primary)` | `color` |
| `--mp-select-popup-padding-horizontal` | `0` | `padding-inline` |
| `--mp-select-popup-padding-vertical` | `var(--mp-sys-space-2)` | `padding`, `padding-block`, `padding-block-end`, `padding-block-start` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-select-popup-border-color: var(--mp-sys-color-border-subtle);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
