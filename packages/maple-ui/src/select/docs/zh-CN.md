# 选择框

## 案例

### 基础用法

点击展开选项，选中后回填并收起；清除后可重新选择。本例只演示单选。

```demo
../example/demos/standard.vue
```

### 候选高亮与表单数据流

初始 `form.city` 为 `undefined`。打开面板只激活候选行，不触发 `update:modelValue` 或 `change`，表单仍为空。inline 点击选项或按 Enter 后提交；popup 在面板内选择只是草稿，确认后才提交，取消不改变表单。两个示例分别显示已提交值、更新次数和真实事件日志；日志按最新在前排列。

```demo
../example/demos/selection-data-flow.vue
```

### 禁用与只读

```demo
../example/demos/state.vue
```

### 小尺寸

```demo
../example/demos/size.vue
```

### 表单控件尺寸对照

切换五档 size 和三种字段变体，比较 Input、Button、Select、日期时间及其他单行表单控件的高度。Button 在这里固定使用 outline。DatePicker/TimePicker 是面板，此处使用带输入框的 Date/Time 字段。示例同时展示有值、可清空、标签删除与长标签多选；Select/Cascader 设置 tag-nowrap 时保持同档高度，长标签文字省略、删除图标保留；标签行可横向滚动，清空按钮和箭头固定在外侧。被省略的标签正文支持悬停、键盘聚焦或点按查看完整文字，点外部或按 Esc 关闭，不改变选中值。可清空后恢复选中值重复比较。多行文本和允许换行的多选内容按内容撑高。

```demo
../../field-decorator/example/demos/control-sizes.vue
```

### 边框外观

```demo
../example/demos/outline.vue
```

### 标签与绑定值

```demo
../example/demos/value-mapping.vue
```

### 清除选择

```demo
../example/demos/clearable.vue
```

### 多选

```demo
../example/demos/multiple.vue
```

### 选项数据

```demo
../example/demos/options.vue
```

### 字段映射

```demo
../example/demos/field-names.vue
```

### 自定义图标

```demo
../example/demos/custom-icons.vue
```

### 同名选项

选项可以具有相同的 label，但 value 必须唯一。删除标签按 value 定位，不按标题匹配。以下三种展示方式删除第二个“设备”都只会移除 ID 2。

```demo
../example/demos/same-label.vue
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

inline 默认即选即提交；popup/dialog 确认后提交。确认只提交一次；取消、遮罩关闭、Escape、切换展示方式都丢弃草稿。外部更新 modelValue 优先于草稿。两端控制器独立同源，容器分别适配 popover/popup/dialog。

### 分组间距

```demo
../example/demos/group-spacing.vue
```

### 外观组合

适用于选项数据明确的单选输入。调整变体、尺寸，用相同数据观察变化。内容保持一致，便于比较不同设置的实际效果。

```demo
../example/demos/appearance-lab.vue
```

### 交互状态切换

适用于选项数据明确的单选输入。调整禁用、只读、错误反馈，用相同数据观察变化。控制区始终可用，可以随时恢复编辑；错误外观本身不会触发表单校验。

```demo
../example/demos/state-lab.vue
```

### 异步设备与 ID 回显

```demo
../example/demos/async-devices.vue
```

### Thumb drag lifecycle / 滑块拖动生命周期

方向、max、thumbSize、ratio的有效值变化取消当前手势；仅替换等值data对象不取消连续拖动。最终偏移仍由父级新测量／setOffset结算。几何读取与响应式写入后重新核对会话，防止同步卸载后绑定或通知。停用／卸载保留按下／轨道点击／setOffset入口无效且不preventDefault；非左键不启动／跳转。当前setOffset夹取、拖动期间忽略外部setOffset和轨道一thumb-size步进保持。没有Pointer／touch拖动协议迁移或原生滚动回滚承诺。

```demo
../example/demos/thumb-lifecycle.vue
```

### Scrollbar consumer lifecycle / 滚动条消费者生命周期

scrollTo(0,0)／单轴0是合法坐标，不用真值判断；恢复零位置也同步thumb，不保留上次偏移。水平测量使用水平比例（旧代码误用了垂直比例）。零／无效视口用有限、非负thumb数据，不显示该零尺寸轴；正常最小thumb20px与track15px布局策略不变。禁用／隐藏轴的旧thumb命令无效，但禁用条不等于禁止内容或公开原生滚动。对象选项直接透传、不模拟JS动画；公开方法签名／样式变量不变。

```demo
../example/demos/scrollbar-lifecycle.vue
```

### 复杂插槽组合

```demo
../example/demos/slots-review.vue
```

### 介绍

通过下拉菜单展示并选择内容。

### 交互调度生命周期

```demo
../example/demos/scheduler-lifecycle.vue
```

选项分组与 Menu 使用一致的间距逻辑：标题行高 20px，上下各 4px 留白（总高 28px）；后续分组前额外留 8px，首组不添加组间距。标题与选项文字左对齐；AutoComplete 的标题缩进跟随其选项水平 padding 配置。

### 子组件选项与分组

使用 Option、Optgroup 子组件配置候选，演示分组标题插槽、选项内容与前后缀，以及禁用和多选状态。

```demo
../example/demos/options-review.vue
```

### 管理已选项

多选面板顶部提供已选数量与清空。Cedar 在列表上方显示可删除标签；Maple 点击数量查看已选明细，支持逐项移除并返回可选项。popup/popover 与 dialog 共用该内容。移除和清空先修改草稿，关闭取消会恢复原值，确认后才提交；禁用项保留，异步确认期间禁用操作。面板的清空入口独立于字段清空图标。

<!-- api-review:start -->
### 功能调试

```demo
../example/demos/api-review.vue
```

<!-- api-review:end -->

单选和多选的已选行右侧均显示主色对勾；仅候选高亮时不显示对勾。popup/编辑面板内的对勾表示当前草稿选择，确认后才提交表单；禁用已选项保持禁用外观。

## API

### Select 属性

分别使用 `v-model`、`v-model:open` 和 `v-model:input-value` 控制选中值、展开状态和搜索词。单选清空为 `''`，多选为 `[]`；Select 存在真实空字符串选项时，清空值为 `undefined`。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `model-value / default-value` | 受控值 / 非受控初始值 | `Value` | `单选 ''，多选 []` |
| `open / default-open` | 受控展开 / 默认展开 | `boolean` | `undefined / false` |
| `input-value / default-input-value` | 搜索文本，独立于选中值 | `string` | `undefined / ''` |
| `multiple` | 多选；默认启用搜索 | `boolean` | `false` |
| `size` | 完整支持 xs、sm、md、lg、xl，未设置时继承分组与表单 | `ComponentSize` | `md` |
| `variant` | filled、outline、standard；未设置时继承 InputGroup | `FormControlVariant` | `filled` |
| `disabled / readonly / error` | 未设置时继承表单；显式 false 可覆盖 | `boolean` | `undefined` |
| `placeholder` | 占位文本 | `string` | `—` |
| `hint / line` | 浮动提示 / standard 变体下划线 | `boolean` | `true` |
| `text-color / focus-color / blur-color` | 字段颜色 | `string` | `—` |
| `loading` | 加载状态；禁止选择和确认 | `boolean` | `false` |
| `show-tags` | 多选值以标签展示；false 改用分隔文本 | `boolean` | `true` |
| `separator` | show-tags=false 时的多选分隔符 | `string` | `,` |
| `text-align` | left、center、right | `string` | `left` |
| `max-tag-count` | 标签数量上限，0 不限制 | `number` | `0` |
| `tag-nowrap` | 标签单行显示；长文字省略、删除图标保留，标签行可横向滚动；悬停、聚焦或点按省略正文查看全文 | `boolean` | `false` |
| `popup-container` | 选择器、元素、返回元素的函数或 false（原地渲染） | `PopupContainer` | `—` |
| `trigger-props` | Menu 的 Trigger 属性；展开状态由字段控制 | `TriggerProps` | `—` |
| `virtual-list-props` | 选项面板 的虚拟列表参数 | `VirtualListProps` | `—` |
| `search-delay` | search 事件防抖时长（毫秒） | `number` | `500` |
| `format-label` | 格式化已选标签；VNode 使用 label 插槽 | `function` | `—` |
| `clearable` | 允许清除，保留禁用的已选项 | `boolean` | `true` |
| `options` | 原始值、对象、分组均支持；三种展示使用同一数据源 | `SelectOption[]` | `[]` |
| `field-names` | value、label、disabled、tagProps、render 字段映射；对象值须有唯一标识字段 | `SelectFieldNames` | `—` |
| `filterable` | 开启搜索，可设置 retainInputValue | `boolean 或 { retainInputValue?: boolean }` | `单选 false / 多选 true` |
| `filter-option` | false 关闭本地过滤；函数接收搜索词和原始选项 | `boolean 或 (input, option) => boolean` | `true` |
| `creatable` | 允许创建不存在的选项 | `boolean` | `false` |
| `fallback-option` | 异步选项未到达时反显值，或返回完整回退选项 | `boolean 或 (value) => SelectOptionData` | `true` |
| `show-extra-options` | 菜单中展示回退/创建选项 | `boolean` | `true` |
| `limit` | 多选数量上限，0 不限制 | `number` | `0` |
| `auto-fit-popup-width` | Menu 与字段等宽 | `boolean` | `true` |
| `default-active-first-option` | 打开选项列表时，无有效选中项则默认激活首个可用候选；仅高亮，不更新 modelValue 或触发 change。已有有效选中项优先激活该项 | `boolean` | `true` |
| `unmount-on-close` | 关闭 Menu 后销毁内容 | `boolean` | `false` |
| `scrollbar` | 选项面板 滚动条配置 | `boolean 或 ScrollbarProps` | `true` |
| `show-header-on-empty / show-footer-on-empty` | 空状态仍展示 header / footer | `boolean` | `false` |
| `presentation` | 字段展示；未指定时继承 FormItem/Form | `inline / popup` | `inline` |
| `before-commit` | 确认校验后可等待的保存拦截钩子 | `(value, context) => void / false / Promise` | — |

### 事件与方法

- `update:modelValue`、`change(value)`：提交时触发，编辑草稿不触发。
- `update:open`、`open-change(open)`：请求改变展开状态。
- `update:inputValue`、`input-value-change(text)`、`search(text)`：搜索状态。
- `focus(event)`、`blur(event)`、`clear(event)`：原生字段事件；只有字段所有者通知 Form。
- 方法：`focus()`、`blur()`。

Select 还提供 `remove(value)`、`exceed-limit(value, event)`、`dropdown-scroll(event)`、`dropdown-reach-bottom(event)`。

### 插槽与选项数据

使用 `label({ data })` 自定义已选标签，`selected` 替换整个已选区域。还支持 `prefix`、`suffix`、`clear-icon({ clear })`、`arrow-icon`、`loading-icon`、`search-icon`、`empty`、`option({ data })`。

选项 `label` 是用于搜索的纯文本；自定义选项内容使用 `render` 或 `option` 插槽，自定义反显使用 `format-label` 或 `label` 插槽。以 value 而非 label 识别选项。选项的 `disabled` 禁止选择和删除，`tagProps` 可定制已选标签。

Select 还支持 `header`、`footer`、`trigger` 和默认插槽中的 `Option / Optgroup`。Option 属性为 `value`、`label`、`disabled`、`tagProps`、`index`；默认插槽提供 `selected`。分组数据为 `{ isGroup: true, label, options }`。所有编辑展示共用相同选项模型；read 插槽可自定义阅读内容。

### CSS 变量

| Token | Default |
| --- | --- |
| `--mp-select-popup-max-height` | `200px` |
| `--mp-select-popup-border-radius` | `var(--mp-sys-radius-md)` |
| `--mp-select-popup-padding-vertical` | `var(--mp-sys-space-2)` |
| `--mp-select-popup-font-size` | `var(--mp-sys-font-size-md)` |
| `--mp-select-popup-bg` | `var(--mp-sys-color-surface-overlay)` |
| `--mp-select-popup-border-color` | `var(--mp-sys-color-border-default)` |
| `--mp-select-popup-box-shadow` | `0 4px 10px rgb(0 0 0 / 10%)` |
| `--mp-select-popup-option-height` | `36px` |
| `--mp-select-popup-option-font-weight-selected` | `var(--mp-sys-font-weight-medium)` |
| `--mp-select-popup-option-padding-horizontal` | `var(--mp-sys-space-5)` |
| `--mp-select-popup-option-bg` | `var(--mp-sys-color-surface-overlay)` |
| `--mp-select-popup-option-bg-hover` | `var(--mp-sys-color-state-hover)` |
| `--mp-select-popup-option-bg-selected` | `var(--mp-sys-color-surface-overlay)` |
| `--mp-select-popup-option-bg-disabled` | `var(--mp-sys-color-surface-overlay)` |
| `--mp-select-popup-option-text-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-select-popup-option-text-color-hover` | `var(--mp-sys-color-content-primary)` |
| `--mp-select-popup-option-text-color-selected` | `var(--mp-sys-color-content-primary)` |
| `--mp-select-popup-option-text-color-disabled` | `var(--mp-sys-color-content-disabled)` |
| `--mp-select-popup-group-title-height` | `20px` |
| `--mp-select-popup-group-title-padding-horizontal` | `var(--mp-select-popup-option-padding-horizontal)` |
| `--mp-select-popup-group-title-padding-top` | `var(--mp-sys-space-4)` |
| `--mp-select-popup-group-title-font-size` | `var(--mp-sys-font-size-xs)` |
| `--mp-select-popup-group-title-text-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-select-popup-option-suffix-icon-margin-left` | `var(--mp-sys-space-5)` |
| `--mp-select-popup-loading-min-height` | `50px` |
| `--mp-select-popup-option-icon-margin-right` | `var(--mp-sys-space-4)` |

单选和多选选项统一使用 popup-option-padding-horizontal。组件没有隐式搜索高亮 DOM；自定义选项插槽负责其高亮片段样式。已删除无效的 multi-popup-option-padding-horizontal 与 popup-option-highlight-* 变量。

### 字段与移动展示的样式边界

展示容器使用内部 `src/_components/field-presentation/token.less`，复用系统表面色、间距与尺寸变量。选项列表继续使用 Select 的现有 Token。

`read-pretty` 为独立布尔属性，与 `readonly`、`disabled` 同级；字段 > FormItem > Form 继承，显式 `false` 覆盖父级。默认 `false`。纯阅读不显示编辑器。

### Option Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 选项值，未传时取 label 或默认插槽文本 | string \| number \| boolean \| Record<string, unknown> | undefined |
| label | 搜索与已选标签使用的文本 | string | undefined |
| disabled | 禁止选择与移除 | boolean | false |
| tag-props | 已选标签属性 | TagProps | undefined |
| index | 手动指定选项顺序 | number | undefined |

### Option Slots

| 插槽 | 说明 | 参数 |
| --- | --- | --- |
| default | 自定义选项内容 | { selected: boolean } |
| icon | 选项图标 | - |
| suffix | 选项后缀 | - |

### Optgroup Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 分组标题 | string | undefined |

### Optgroup Slots

| 插槽 | 说明 | 参数 |
| --- | --- | --- |
| label | 自定义分组标题 | - |
| default | 分组下的 Option 子组件 | - |

### Select Slots

| 插槽 | 说明 | 参数 |
| --- | --- | --- |
| default | Option / Optgroup 子组件 | - |
| option | 自定义选项内容 | { data } |
| label | 自定义已选标签 | { data } |
| selected | 替换整个已选区域 | - |
| header | 菜单页头 | - |
| footer | 菜单页脚 | - |
| trigger | 自定义选择器触发器 | - |
| prefix | 字段前缀 | - |
| suffix | 字段后缀 | - |
| clear-icon | 自定义清空操作 | { clear } |
| arrow-icon | 下拉箭头 | - |
| search-icon | 搜索图标 | - |
| loading-icon | 加载图标 | - |
| empty | 无选项内容 | - |
| read | 阅读展示 | { value, text } |

### Select Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| update:model-value | 更新绑定值 | value |
| change | 提交选择 | value |
| update:open | 请求展开状态 | open |
| open-change | 展开状态改变 | open |
| update:input-value | 更新搜索文本 | text |
| input-value-change | 搜索文本改变 | text |
| search | 搜索通知 | text |
| focus | 字段获得焦点 | event |
| blur | 字段失去焦点 | event |
| clear | 清空选择 | event |
| remove | 移除已选项 | value |
| exceed-limit | 超过多选上限 | value, event |
| dropdown-scroll | 菜单滚动 | event |
| dropdown-reach-bottom | 菜单滚到底部 | event |

### Select Methods

| 方法 | 说明 | 参数 |
| --- | --- | --- |
| focus | 聚焦实际字段 | - |
| blur | 移出实际字段焦点 | - |

异步搜索时应在新请求开始时清除旧候选，并只采纳当前搜索词的最后一次响应。远程结果可配合 `loading`、`filter-option="false"`、`show-extra-options="false"` 使用，避免将 ID 回显项当作搜索候选。popup 内方向键与 Enter 只操作当前候选，保存由底部确认按钮完成。校验失败保留草稿；确认期间锁定编辑和关闭，表单重置会关闭 popup 并中止提交。请求归属应在关闭和重置时失效，完整示例见 Form 的“各类字段统一展示”。

### 选中对勾样式变量

| 变量 | 默认值 |
| --- | --- |
| `--mp-select-popup-option-check-color` | `var(--mp-sys-color-action-primary)` |
| `--mp-select-popup-option-check-size` | `var(--mp-sys-font-size-md)` |
| `--mp-select-popup-option-check-gap` | `var(--mp-sys-space-4)` |
