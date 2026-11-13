# 级联选择器

多选时，`inline` 下拉只显示选项；已选内容、单项移除和清空由输入框承担。`popup` 编辑面板保留“已选／清空”，选择为草稿，确认后提交。

关联多选时，切换父项只影响可选择的后代；已选中的禁用后代会保留。

点击复选框只切换选中状态，点击选项文字或展开箭头进入下一级。多选复用 Checkbox 组件；关联多选中，部分可选子项被选中时，父项显示半选状态。

## 阅读方向

继承来源 dir；子列沿阅读方向展开，展开图标及列分隔线随方向变化。左右键按可见方向进入已加载子级或返回父级，并跳过禁用子项；上下键保持逻辑顺序。搜索状态保留原生左右光标编辑，不反转路径或多选数组。关闭状态清空最后值后，重开从根级恢复导航。

`empty-value` 指定当前组件已有清空动作的输出；省略时采用该组件默认返回。具体类型以组件 API 为准。它不改变 empty-values 的识别规则，也不改变 Form reset 的初始值。

`empty-value` 可显式设为 `null`（或 `() => null`），清空时原样提交 null；省略时保留组件原默认值。界面把 null 显示为空，不会把普通输入的空字符串自动转成 null。确认式弹出编辑中，清空先修改草稿并在确认后提交；无需确认时清空会直接提交。

候选属性 `options` 支持数组或 `(query, { signal }) => 数组/Promise`。加载、取消、过期结果隔离由组件内部处理，失败触发 load-error。单选/多选分组初始化以空字符串查询，搜索型字段在查询变化时调用；树形字段根数据与原有 load-more 子节点懒加载独立。

## 基础示例

### 请选择地区

```demo
../example/demos/placeholder.vue
```

## 外观与状态

### 外观组合

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置          | 作用                                                   | 相关示例                   |
| ------------- | ------------------------------------------------------ | -------------------------- |
| `options`     | 树形选项；叶值模式要求叶值唯一，路径模式可区分不同分支 | 外观组合、表单控件尺寸对照 |
| `clearable`   | 允许清除，保留禁用的已选项                             | 外观组合、表单控件尺寸对照 |
| `edit-mode`   | 字段展示；未指定时继承 FormItem / Form                 | 表单控件尺寸对照           |
| `size`        | 完整支持 xs、sm、md、lg、xl，未设置时继承分组与表单    | 表单控件尺寸对照           |
| `variant`     | filled、outline、standard；未设置时继承 InputGroup     | 表单控件尺寸对照           |
| `placeholder` | 占位文本                                               | 表单控件尺寸对照           |

<!-- demo-config-notes:end -->

适用于地区等层级选项。调整变体、尺寸，用相同数据观察变化。内容保持一致，便于比较不同设置的实际效果。

```demo
../example/demos/appearance-lab.vue
```

### 表单控件尺寸对照

切换 size 和字段变体，对比有值、可清空、多选不换行的 Cascader、Select、Input 与 Button。长标签文字省略，删除图标保留，标签行可横向滚动；清空按钮和箭头固定在外侧。被省略的标签正文支持悬停、键盘聚焦或点按查看完整文字，点外部或按 Esc 关闭，不改变选中值。

```demo
../../field-decorator/example/demos/control-sizes.vue
```

## 选择模式与路径

### 级联多选

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置          | 作用                                                   | 相关示例                          |
| ------------- | ------------------------------------------------------ | --------------------------------- |
| `path-mode`   | true 返回完整路径；false 返回选中节点的值              | 级联多选、Dialog 多选、Popup 多选 |
| `placeholder` | 占位文本                                               | 级联多选、Dialog 多选、Popup 多选 |
| `options`     | 树形选项；叶值模式要求叶值唯一，路径模式可区分不同分支 | 级联多选、Dialog 多选、Popup 多选 |
| `multiple`    | 多选；默认启用搜索                                     | 级联多选、Dialog 多选、Popup 多选 |
| `show-tags`   | 多选值以标签展示；false 改用分隔文本                   | 级联多选、Dialog 多选、Popup 多选 |
| `edit-mode`   | 字段展示；未指定时继承 FormItem / Form                 | Dialog 多选、Popup 多选           |

<!-- demo-config-notes:end -->

```demo
../example/demos/placeholder-multiple.vue
```

### Dialog 多选

```demo
../example/demos/placeholder-picker-multiple.vue
```

### Popup 多选

```demo
../example/demos/placeholder-list-multiple.vue
```

### 展示与提交规则

inline 即选即提交；弹层单选默认即选即提交，多选或显式开启 need-confirm 时先编辑草稿再确认。取消、遮罩关闭、Escape、切换展示方式都丢弃草稿；外部 modelValue 更新优先。搜索在弹层内，沿用本地过滤、search 事件和 loadMore 异步加载。

### 管理已选项

多选面板顶部提供已选数量与清空。Cedar 在列表上方显示可删除标签；Maple 点击数量查看已选明细，支持逐项移除并返回可选项。popup/popover 与 dialog 共用该内容。移除和清空先修改草稿，关闭取消会恢复原值，确认后才提交；禁用项保留，异步确认期间禁用操作。面板的清空入口独立于字段清空图标。

### 非路径模式

```demo
../example/demos/placeholder-path-mode.vue
```

## 搜索与展示

### Popup 模式

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置             | 作用                                                   | 相关示例                              |
| ---------------- | ------------------------------------------------------ | ------------------------------------- |
| `placeholder`    | 占位文本                                               | Popup 模式、搜索匹配规则、Dialog 模式 |
| `options`        | 树形选项；叶值模式要求叶值唯一，路径模式可区分不同分支 | Popup 模式、搜索匹配规则、Dialog 模式 |
| `path-mode`      | true 返回完整路径；false 返回选中节点的值              | Popup 模式、Dialog 模式               |
| `edit-mode`      | 字段展示；未指定时继承 FormItem / Form                 | Popup 模式、Dialog 模式               |
| `case-sensitive` | 内置本地过滤是否区分大小写，自定义过滤函数优先         | 搜索匹配规则                          |
| `filterable`     | 开启搜索                                               | 搜索匹配规则                          |

<!-- demo-config-notes:end -->

```demo
../example/demos/placeholder-list.vue
```

### 搜索匹配规则

`case-sensitive` 默认 false，只控制内置本地匹配是否区分大小写；自定义过滤函数优先。保留原有路径标签和 checkStrictly 行为；远程结果不需本地筛选时可使用 `:filter-option="() => true"`，该属性仍是原有函数协议。

```demo
../example/demos/case-sensitive.vue
```

### Dialog 模式

```demo
../example/demos/placeholder-picker.vue
```

### 子面板组合审查

```demo
../example/demos/panel-review.vue
```

## 交互与控制

### 交互状态切换

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置        | 作用                                                   | 相关示例     |
| ----------- | ------------------------------------------------------ | ------------ |
| `options`   | 树形选项；叶值模式要求叶值唯一，路径模式可区分不同分支 | 交互状态切换 |
| `clearable` | 允许清除，保留禁用的已选项                             | 交互状态切换 |

<!-- demo-config-notes:end -->

适用于地区等层级选项。调整禁用、只读、错误反馈，用相同数据观察变化。控制区始终可用，可以随时恢复编辑；错误外观本身不会触发表单校验。

```demo
../example/demos/state-lab.vue
```

## 配置与组合

### 透传配置边界与优先级

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置                  | 作用                                                                                                             | 相关示例                         |
| --------------------- | ---------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| `edit-mode`           | 字段展示；未指定时继承 FormItem / Form                                                                           | 透传配置边界与优先级、复制与编辑 |
| `options`             | 树形选项；叶值模式要求叶值唯一，路径模式可区分不同分支                                                           | 透传配置边界与优先级、复制与编辑 |
| `trigger-props`       | Menu 的 Trigger 属性；展开状态由字段控制                                                                         | 透传配置边界与优先级             |
| `open-trigger-target` | 打开面板的点击区域：field 为整个字段，icon 仅右侧选择按钮。清除、移除等独立操作除外；不影响键盘展开和受控 open。 | 复制与编辑                       |
| `filterable`          | 开启搜索                                                                                                         | 复制与编辑                       |

<!-- demo-config-notes:end -->

建议使用 `CascaderTriggerOptions` 声明 trigger-props。open/defaultOpen、disabled 和展开更新归 Cascader 管理。popup-container 顶层明确传入时优先（包括 false），否则回退 triggerProps.popupContainer。Trigger 的普通配置保留原顺序，嵌套 unmountOnClose 仍可覆盖顶层 unmount-on-close；默认的定位/交互配置也仍可被有效嵌套字段覆盖。内部展开监听继续执行，通知使用 Cascader 事件。

建议使用本页列出的专用配置类型；展开状态、模型和事件由组件管理，不能通过嵌套配置接管。

```ts
import type { CascaderTriggerOptions } from '@maple-design/ui-vue'
```

```demo
../example/demos/passthrough-options.vue
```

### 复制与编辑

通过 open-trigger-target 独立控制打开区域；icon 模式下点击、聚焦和输入不会自动展开。input-editable / filterable 仍负责是否可编辑或搜索。右侧按钮、显式键盘展开和受控 open 可打开面板。

```demo
../example/demos/open-trigger-target.vue
```

## 异步加载与回显

### 回调懒加载

```demo
../example/demos/load-more.vue
```

### 异步设备与 ID 回显

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置         | 作用                                                   | 相关示例           |
| ------------ | ------------------------------------------------------ | ------------------ |
| `edit-mode`  | 字段展示；未指定时继承 FormItem / Form                 | 异步设备与 ID 回显 |
| `options`    | 树形选项；叶值模式要求叶值唯一，路径模式可区分不同分支 | 异步设备与 ID 回显 |
| `loading`    | 加载状态；禁止选择和确认                               | 异步设备与 ID 回显 |
| `path-mode`  | true 返回完整路径；false 返回选中节点的值              | 异步设备与 ID 回显 |
| `filterable` | 开启搜索                                               | 异步设备与 ID 回显 |
| `clearable`  | 允许清除，保留禁用的已选项                             | 异步设备与 ID 回显 |

<!-- demo-config-notes:end -->

```demo
../example/demos/async-devices.vue
```

### 介绍

通过下拉菜单或底部弹窗的形式进行级联选择。

单选已选项在右侧显示内置主色对勾。多选使用 Checkbox：可选后代全部未选为未选，部分选中为半选，全部可选叶子选中为全选；禁用叶子不参与全选计算。checkStrictly 开启时父子独立选择，不汇总半选。确认式编辑面板中的选择先作为草稿，确认后才提交。

### 共享字段加载

`loading` 控制共享字段加载状态；`loading-mode` 为 `default`（指示器）或 `line`（底部不定进度线），默认 `default`。渲染统一由 FieldDecorator 负责，不隐式改变 disabled/readonly；需要禁止编辑时单独设置。

### 懒加载结束与异常

聚焦尚未加载子项的可展开选项时，按 Enter、空格或展开方向键会触发懒加载；等待期间选项会显示加载状态。方向键仅在焦点仍停留在按键触发的输入框或选项上时进入子级。搜索结果不触发子项展开。

字段和独立 Panel 的 `loadMore(option, done)` 均保留回调协议：`done(children)` 接收子项，`done()` 结束等待并允许重试。只接受首次回调；返回值（包括已完成的 Promise）不替代 `done`。加载函数同步抛错时结束等待，并进入 Vue 的 `errorCaptured` / 应用 `errorHandler`。`load-error` 仍仅报告 `options` 候选数据源错误，不重复报告 `loadMore` 异常。业务中的异步请求失败需自行处理并调用 `done()`。

替换选项（包括嵌套原地修改）、字段映射或加载函数会使旧请求和懒加载缓存失效。卸载、停用会取消待处理回调；旧结果不能写入替换后的节点或清除新请求的等待。

## 使用说明

### 编辑方式
通过 `edit-mode` 选择直接编辑或移动端编辑面板。

### 编辑与确认
本组件支持 `edit-mode`，字段 > FormItem > Form 逐层继承；未指定时为 `popup`，点击值区域打开编辑面板。支持值：`direct / popup`。非 direct 编辑模式通过字段值入口打开编辑面板。单选默认选中即提交；设置 need-confirm 时先编辑草稿并确认，多选默认需要确认。取消、重置或启用 readPretty 时丢弃未提交的草稿。

Maple 使用 edit-mode="popup" 点击值区域打开编辑面板；direct 直接编辑。 readPretty 为纯阅读属性，与 readonly、disabled 独立。

`before-commit({ value, previousValue }, done, { signal })` 可拦截弹层保存；FormItem 先校验候选值，失败保持编辑。`open / default-open / update:open` 控制编辑层。`#read="{ value, text }"` 可自定义阅读内容。集中示例见 Form 的“各类字段统一展示”。

字段编辑统一使用 edit-mode：Cedar 支持 direct/click/dblclick，Maple 支持 direct/popup；不保留 menu/list/picker 这些旧编辑枚举。弹层复用原选项索引、搜索、异步加载与虚拟列表算法。

`read-pretty` 为独立布尔属性，与 `readonly`、`disabled` 同级；字段 > FormItem > Form 继承，显式 `false` 覆盖父级。默认 `false`。纯阅读不显示编辑器。

### 搜索字段
`searchFields` / `search-fields` 是只读 `('label' | 'value')[]`，默认 `['label']`；多字段为 OR 匹配，大小写默认不敏感。配置 `['value', 'label']` 可同时搜索编码和名称，fieldNames 将语义字段映射到业务字段；空数组对非空查询不匹配任何项。value 采用字符串比较，不做对象深层搜索，对象值或拼音等复杂规则仍用自定义回调。自定义回调优先并自行决定大小写；远程结果使用原有关闭本地过滤协议。Cascader 保留路径语义，会检查路径各节点的配置字段。

公共 focus/blur 从首次挂载即可调用。focus 会打开可编辑的延迟编辑器，等待其就绪后定位；禁用、只读或纯阅读时不因此打开。blur 只失焦当前目标，不重新打开。保存的方法不会绑定旧编辑器，关闭、切换模式、停用或卸载会取消排队调用。

refresh 可在编辑器未打开时重试组件自有的异步选项读取，沿用既有 AbortSignal、loading 和 load-error 协议，不自动打开编辑器；静态数组不产生额外请求。

### 加载期间的选择动作
手动 loading 或当前候选请求处于加载状态时，纯选择字段保留已有值，暂停新选择、清空与标签移除。被阻止的动作不发送业务通知，也不提交模型。字段搜索仍可输入，disabled/readonly 不因此改写；需要禁止搜索时单独设置。

延迟编辑层的清空和确认在此期间不可用，仍可取消或关闭。手动标记和当前请求都结束后，操作按正常规则恢复，并继续尊重禁用选项。Input、AutoComplete 等自由文本字段的 loading 继续允许文本编辑与清空，不套用选择值的暂停规则。

option({ data }) 接收规范化 CascaderOptionInfo，data.raw 是原始选项，data.path 是根到当前的规范化路径；label({ data }) 接收字段展示项 key/value/label/closable/tagProps。arrow-icon({ focus, menuOpen }) 接收真实字段的聚焦和展开状态。read({ value, text }) 的 value 保留 null/undefined 及原模型形状。

公开类型包含 CascaderBaseValue、CascaderOptionInfo、CascaderReadScope、CascaderEmits、CascaderSlots、CascaderExpose，可从根入口及 cascader 子入口导入。纯 CascaderPanel 只接收选项数组，不接管根候选加载函数。

## API

面板分支的 `aria-expanded` 表示其子列是否实际显示；聚焦或悬停尚未打开子列时不会标记为已展开。叶节点没有 `aria-expanded`。 单选分层菜单的可选叶节点和严格模式可选分支使用 `menuitemradio` 与 `aria-checked`；仅用于展开的分支保持 `menuitem`，多选仍使用复选框。 单选分层面板的菜单项共有一个 Tab 入口；方向键在列和选项间移动，Tab 或 Shift+Tab 离开菜单。虚拟滚动时入口保持在当前渲染的选项中，选项插槽内的自定义交互控件仍自行管理焦点。 搜索结果不会声明其未显示的子菜单。 直接模式的单选搜索使用 `listbox` 和 `option`，输入框关联弹层与活动项；编辑器单选搜索使用 `menuitemradio` 和 `aria-checked`，菜单内保留一个 Tab 入口；选项持有焦点时，悬停其他选项不会转移该入口。多选搜索保留复选框。 直接单选搜索时，弹层图标不占用额外 Tab 停靠点；可点击图标或在输入框按方向下键展开。

虚拟列中，末尾增删其他选项时，仍在渲染范围内的选项会保留其节点与焦点；切换父级时不会沿用旧列的滚动位置。选项移出虚拟窗口或被删除时可能卸载，插槽中需要长期保留的输入状态应由业务保存。

### 空值识别与阅读空文案

`empty-values` 用于空值识别，`empty-value` 保留原清空输出；`empty-text` 仅在 `read-pretty` 空内容下展示，默认 `'-'`，字段 > FormItem > Form，自定义 read 插槽优先。显式配置 empty-values 后，内置 required 接入该策略，自定义校验仍收到原值。详见[统一说明](#/zh-CN/emptyValues)。

| 参数         | 类型               | 缺省与范围                                            |
| ------------ | ------------------ | ----------------------------------------------------- |
| empty-values | readonly unknown[] | 字段 > FormItem > Form > 组件族默认；完整覆盖，不合并 |
| empty-text   | string             | 字段 > FormItem > Form > '-'；显式 '' 有效            |

以上是字段展示层 API；纯面板不因此新增阅读模式。Form 与 FormItem 提供继承配置。empty-value 的现有类型与默认输出仍按该组件原 API 执行。

### Cascader Props

分别使用 `v-model`、`v-model:open` 和 `v-model:input-value` 控制选中值、展开状态和搜索词。单选清空为 `''`，多选为 `[]`；Select 存在真实空字符串选项时，清空值为 `undefined`。

| 属性 | 说明 | 类型 | 默认值 |
| --------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------ |
| need-confirm | 仅弹出编辑模式生效。单选默认点选即提交并关闭，设为 true 时先编辑草稿、再点确认；多选默认保留确认。提交仍执行表单校验和 before-commit，拒绝时不关闭。 | `boolean` | 单选 `false`；多选 `true` |
| `model-value` | 受控选中值，支持 v-model | `CascaderBaseValue` | `undefined` |
| `default-value` | 非受控初始选中值，仅初始化时读取 | `CascaderBaseValue` | 单选：path-mode 时为 `undefined`，否则为 `''`；多选：`[]` |
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
| `loading-mode` | 字段加载展示：默认指示器或底部不定进度线。 | `default / line` | `default` |
| `search-fields` | 内置路径搜索字段，默认 label；自定义过滤回调优先。 | `readonly OptionSearchField[]`<br>`OptionSearchField: 'label' \| 'value'` | `['label']` |
| `read-pretty` | 统一纯阅读状态，省略时继承 FormItem / Form；独立于只读和禁用。 | `boolean` | `undefined` |
| `empty-value` | 清空输出覆盖，不改变空值识别策略。 | `CascaderProps['emptyValue']` | `undefined` |
| `before-commit` | 确认前调用 ({ value, previousValue }, done, { signal })；布尔、Promise 或 done 完成，同步 undefined 等待 done。 | `BeforeFieldCommit` | `undefined` |
| `show-tags` | 多选值以标签展示；false 改用分隔文本 | `boolean` | `true` |
| `separator` | show-tags=false 时的多选分隔符 | `string` | `,` |
| `text-align` | 文字对齐 left / center / right；未设置时继承 FormItem 的 content-align，独立使用默认阅读起点 start | `'left' \| 'center' \| 'right'` | `-` |
| `max-tag-count` | 有限非负整数；0 不限制标签展示数量。 | `number` | `0` |
| `tag-nowrap` | 标签单行显示；长文字省略、删除图标保留，标签行可横向滚动；悬停、聚焦或点按省略正文查看全文 | `boolean` | `false` |
| `popup-container` | 选择器、元素、返回元素的函数或 false（原地渲染） | `PopupContainer` | `—` |
| `trigger-props` | Menu 的 Trigger 属性；展开状态由字段控制 | `TriggerProps` | `—` |
| `virtual-list-props` | Menu / List 的虚拟列表参数 | `VirtualListProps` | `—` |
| `search-delay` | 有限非负搜索防抖毫秒数。 | `number` | `500` |
| `format-label` | 格式化已选标签；VNode 使用 label 插槽 | `function` | `—` |
| `clearable` | 允许清除，保留禁用的已选项 | `boolean` | `false` |
| `options` | 树形选项；叶值模式要求叶值唯一，路径模式可区分不同分支 | `CascaderOption[]` / `(query, { signal }) => Array / Promise` | `undefined` |
| `field-names` | value、label、disabled、children、isLeaf、tagProps、render 的字段映射 | `CascaderFieldNames` | `—` |
| `path-mode` | true 返回完整路径；false 返回选中节点的值 | `boolean` | `false` |
| `check-strictly` | 允许选中父节点；多选不关联父子节点 | `boolean` | `false` |
| `filterable` | 开启搜索 | `boolean` | `单选 false / 多选 true` |
| case-sensitive | 内置本地过滤是否区分大小写，自定义过滤函数优先 | boolean | false |
| `filter-option` | 接收搜索词和原始节点 | `(input, option) => boolean` | `—` |
| `expand-trigger` | Menu / List 的展开交互：click 或 hover | `string` | `click` |
| `expand-child` | 展开到首个子节点 | `boolean` | `false` |
| `load-more` | 异步加载子节点；完成后调用 done(children)，失败调用 done() 以允许重试 | `(option, done) => void` | `—` |
| `fallback-option` | 尚未加载的值如何反显 | `boolean or (value) => { value, label }` | `true` |
| `search-option-only-label` | 搜索结果仅显示节点标签，不显示路径 | `boolean` | `false` |
| `auto-fit-popup-width` | Menu 是否与字段等宽 | `boolean` | `false` |
| `edit-mode` | 字段展示；未指定时继承 FormItem / Form | `direct / popup` | `popup` |
| `popup-props` | 弹层外观；展开状态、底部位置和挂载时机由扩展接管 | `PopupProps` | `{}` |

### Cascader Events / Methods

直接编辑模式下，字段关闭时按方向下键请求展开；展开后若焦点仍在字段且没有活动项，会激活首个可用选项；选项异步到达时也适用。等待期间失焦、关闭或再次操作会取消本次激活。受控 `open` 仅在父组件接受请求后改变。

菜单选项获得焦点时，按 Enter 或空格可操作该选项；搜索输入框和选项内复选框保留各自的键盘行为。

- `keydown(event)`：字段、候选菜单或编辑面板按键事件；调用 `preventDefault()` 可阻止内部键盘处理。

- `update:modelValue`、`change(value)`：提交时触发，编辑草稿不触发。
- `update:open`、`open-change(open)`：请求改变展开状态。
- `update:inputValue`、`input-value-change(text)`、`search(text)`：搜索状态。
- `focus(event)`、`blur(event)`、`clear(event)`：原生字段事件；只有字段所有者通知 Form。
- `load-error(error)`：当前 options 候选源失败通知，不收集监听器 Promise。
- 方法：`focus()`、`blur()`、`refresh(): Promise<void>`；refresh 不自动打开编辑器。

### 插槽与选项数据

使用 `label({ data })` 自定义已选标签，`selected` 替换整个已选区域。还支持 `prefix`、`suffix`、`clear-icon({ clear })`、`arrow-icon`、`loading-icon`、`search-icon`、`empty`、`option({ data })`。

选项 `label` 是用于搜索的纯文本；自定义选项内容使用 `render` 或 `option` 插槽，自定义反显使用 `format-label` 或 `label` 插槽。以 value 而非 label 识别选项。选项的 `disabled` 禁止选择和删除，`tagProps` 可定制已选标签。

自定义选项中的按钮、链接、输入控件、列表选项、树节点、网格单元格、非负 tabindex 元素、带 controls 的音视频和嵌套 Cascader 管理各自的点击，不会选择外层选项；普通内容仍可点击选择。多个 `role` 词元按组件支持的首个有效角色判断。 独立面板放在 Shadow DOM 内时，方向键按面板所在根节点移动选项焦点。已调用 `preventDefault` 的点击不会触发选项动作，事件继续按 DOM 规则冒泡。

也可以独立使用 `CascaderPanel`（`mp-cascader-panel`），或 `Cascader.CascaderPanel`。这是无输入框、无弹层的 Menu 面板；支持 options、modelValue/defaultValue、multiple、pathMode、checkStrictly、fieldNames、loadMore、disabled、expandTrigger 和 expandChild。事件为 update:modelValue、change；empty 插槽自定义空状态。

### CascaderPanel Props

| 参数名 | 描述 | 类型 | 默认值 |
| ------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :---------------------: |
| path-mode | 绑定值是否为路径 | `boolean` | `false` |
| multiple | 是否为多选状态（多选模式默认开启搜索） | `boolean` | `false` |
| model-value **(v-model)** | 绑定值 | `string\| number\| Record<string, any>\| (    \| string    \| number    \| Record<string, any>    \| (string \| number \| Record<string, any>)[]  )[]\| undefined` | `-` |
| default-value | 默认值（非受控状态） | `string\| number\| Record<string, any>\| (    \| string    \| number    \| Record<string, any>    \| (string \| number \| Record<string, any>)[]  )[]\| undefined` | `'' \| undefined \| []` |
| options | 级联选择器的选项 | `CascaderOption[]` | `[]` |
| expand-trigger | 展开下一级的触发方式 | `string` | `'click'` |
| check-strictly | 是否开启严格选择模式 | `boolean` | `false` |
| load-more | 数据懒加载函数，传入时开启懒加载功能 | `(  option: CascaderOption,  done: (children?: CascaderOption[]) => void) => void` | `-` |
| field-names | 自定义 `CascaderOption` 中的字段；当选项值为对象时，也用其中的 `value` 作为键属性 | `CascaderFieldNames` | `-` |
| expand-child | 是否展开子菜单 | `boolean` | `false` |

### CascaderPanel Events

| 事件名 | 描述             | 参数                                                                                   |
| ------ | ---------------- | -------------------------------------------------------------------------------------- |
| change | 选中值改变时触发 | value: `string \| number \| (string \| number \| (string \| number)[])[] \| undefined` |

### CascaderPanel Slots

| 插槽名 |         描述         | 参数 |
| ------ | :------------------: | ---- |
| empty  | 选项为空时的显示内容 | -    |

异步搜索时应在新请求开始时清除旧候选，并只采纳当前搜索词的最后一次响应。可使用 `update:input-value` 立即响应输入，通过 `loading` 和 `filter-option` 展示远程过滤结果。popup 内方向键与 Enter 操作当前候选；确认模式通过底部按钮提交，单选即时模式选中即提交。确认模式校验失败保留草稿；确认期间锁定编辑和关闭，表单重置会关闭 popup 并中止提交。请求归属应在关闭和重置时失效，完整示例见 Form 的“各类字段统一展示”。

后续验收（尚未完成）：使用真实读屏器（如 VoiceOver、NVDA）及受支持的浏览器，检查字段名称、层级导航与展开状态、搜索与选择、单选和多选、虚拟列表及表单错误的实际播报。

## CSS Variables

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-cascader-checkbox-bg-hover` | `var(--mp-color-fill-3)` | `background-color` |
| `--mp-cascader-font-item-size` | `var(--mp-sys-font-size-md)` | `font-size` |
| `--mp-cascader-item-bg-active` | `transparent` | `background`, `background-color` |
| `--mp-cascader-item-bg-disabled` | `transparent` | `background-color` |
| `--mp-cascader-item-bg-disabled-active` | `var(--mp-color-fill-2)` | `background-color` |
| `--mp-cascader-item-bg-hover` | `var(--mp-color-fill-2)` | `background`, `background-color` |
| `--mp-cascader-item-check-color` | `var(--mp-sys-color-action-primary)` | `color` |
| `--mp-cascader-item-check-size` | `var(--mp-sys-font-size-md)` | `height`, `width` |
| `--mp-cascader-item-icon-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-cascader-item-text-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-cascader-item-text-color-active` | `var(--mp-sys-color-action-primary)` | `color` |
| `--mp-cascader-item-text-color-disabled` | `var(--mp-sys-color-content-disabled)` | `color` |
| `--mp-cascader-item-text-color-disabled-active` | `var(--mp-sys-color-content-disabled)` | `color` |
| `--mp-cascader-item-text-color-hover` | `var(--mp-cascader-item-text-color)` | `color` |
| `--mp-cascader-margin-checkbox-right` | `var(--mp-sys-space-4)` | `margin-inline-end` |
| `--mp-cascader-margin-item-icon-left` | `var(--mp-sys-space-5)` | `margin-inline-start` |
| `--mp-cascader-option-min-width` | `100px` | `min-width` |
| `--mp-cascader-padding-item-left` | `var(--mp-sys-space-5)` | `padding-inline-end`, `padding-inline-start` |
| `--mp-cascader-padding-item-right` | `var(--mp-sys-space-5)` | `margin-inline-end`, `padding-inline-end` |
| `--mp-cascader-panel-column-max-height` | `200px` | `max-height` |
| `--mp-cascader-panel-column-min-width` | `120px` | `min-width` |
| `--mp-cascader-popup-border-radius` | `var(--mp-sys-radius-md)` | `border-radius` |
| `--mp-cascader-popup-box-shadow` | `0 4px 10px rgb(0 0 0%)` | `box-shadow` |
| `--mp-cascader-popup-color-border` | `var(--mp-color-fill-3)` | `border`, `border-inline-end`, `border-top` |
| `--mp-cascader-popup-max-height` | `200px` | `height` |
| `--mp-cascader-popup-padding-vertical` | `var(--mp-sys-space-2)` | `padding`, `padding-block-end` |
| `--mp-cascader-size-item-height` | `36px` | `height`, `line-height` |
| `--mp-cascader-size-item-icon` | `12px` | `height`, `width` |
| `--mp-cascader-slide-margin` | `120px` | `margin-inline-start` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-cascader-font-item-size: var(--mp-sys-font-size-md);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
