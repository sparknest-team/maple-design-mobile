# 级联选择器

## 案例

### 请选择地区

```demo
../example/demos/placeholder.vue
```

### 非路径模式

```demo
../example/demos/placeholder-path-mode.vue
```

### 级联多选

```demo
../example/demos/placeholder-multiple.vue
```

### 表单控件尺寸对照

切换 size 和字段变体，对比有值、可清空、多选不换行的 Cascader、Select、Input 与 Button。长标签文字省略，删除图标保留，标签行可横向滚动；清空按钮和箭头固定在外侧。被省略的标签正文支持悬停、键盘聚焦或点按查看完整文字，点外部或按 Esc 关闭，不改变选中值。

```demo
../../field-decorator/example/demos/control-sizes.vue
```

### Dialog 模式

```demo
../example/demos/placeholder-picker.vue
```

### Dialog 多选

```demo
../example/demos/placeholder-picker-multiple.vue
```

### Popup 模式

```demo
../example/demos/placeholder-list.vue
```

### Popup 多选

```demo
../example/demos/placeholder-list-multiple.vue
```

### 展示与提交规则

inline 即选即提交；popup、dialog 单选和多选都编辑草稿，外层确认一次后提交。取消、遮罩关闭、Escape、切换展示方式都丢弃草稿；外部 modelValue 更新优先。搜索在弹层内，沿用本地过滤、search 事件和 loadMore 异步加载。

### 管理已选项

多选面板顶部提供已选数量与清空。Cedar 在列表上方显示可删除标签；Maple 点击数量查看已选明细，支持逐项移除并返回可选项。popup/popover 与 dialog 共用该内容。移除和清空先修改草稿，关闭取消会恢复原值，确认后才提交；禁用项保留，异步确认期间禁用操作。面板的清空入口独立于字段清空图标。

### 外观组合

适用于地区等层级选项。调整变体、尺寸，用相同数据观察变化。内容保持一致，便于比较不同设置的实际效果。

```demo
../example/demos/appearance-lab.vue
```

### 交互状态切换

适用于地区等层级选项。调整禁用、只读、错误反馈，用相同数据观察变化。控制区始终可用，可以随时恢复编辑；错误外观本身不会触发表单校验。

```demo
../example/demos/state-lab.vue
```

### 异步设备与 ID 回显

```demo
../example/demos/async-devices.vue
```

### 介绍

通过下拉菜单或底部弹窗的形式进行级联选择。

<!-- api-review:start -->
### 功能调试

```demo
../example/demos/api-review.vue
```

<!-- api-review:end -->

单选已选项在右侧显示内置主色对勾。多选使用 Checkbox：可选后代全部未选为未选，部分选中为半选，全部可选叶子选中为全选；禁用叶子不参与全选计算。checkStrictly 开启时父子独立选择，不汇总半选。确认式编辑面板中的选择先作为草稿，确认后才提交。

## API

### Cascader 属性

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
| `virtual-list-props` | Menu / List 的虚拟列表参数 | `VirtualListProps` | `—` |
| `search-delay` | search 事件防抖时长（毫秒） | `number` | `500` |
| `format-label` | 格式化已选标签；VNode 使用 label 插槽 | `function` | `—` |
| `clearable` | 允许清除，保留禁用的已选项 | `boolean` | `false` |
| `options` | 树形选项；叶值模式要求叶值唯一，路径模式可区分不同分支 | `CascaderOption[]` | `[]` |
| `field-names` | value、label、disabled、children、isLeaf、tagProps、render 的字段映射 | `CascaderFieldNames` | `—` |
| `path-mode` | true 返回完整路径；false 返回选中节点的值 | `boolean` | `false` |
| `check-strictly` | 允许选中父节点；多选不关联父子节点 | `boolean` | `false` |
| `filterable` | 开启搜索 | `boolean` | `单选 false / 多选 true` |
| `filter-option` | 接收搜索词和原始节点 | `(input, option) => boolean` | `—` |
| `expand-trigger` | Menu / List 的展开交互：click 或 hover | `string` | `click` |
| `expand-child` | 展开到首个子节点 | `boolean` | `false` |
| `load-more` | 异步加载子节点；完成后调用 done(children)，失败调用 done() 以允许重试 | `(option, done) => void` | `—` |
| `fallback` | 尚未加载的值如何反显 | `boolean 或 (value) => string` | `true` |
| `search-option-only-label` | 搜索结果仅显示节点标签，不显示路径 | `boolean` | `false` |
| `auto-fit-popup-width` | Menu 是否与字段等宽 | `boolean` | `false` |
| `presentation` | 字段展示；未指定时继承 FormItem / Form | `inline / popup` | `inline` |
| `popup-props` | 弹层外观；展开状态、底部位置和挂载时机由扩展接管 | `PopupProps` | `{}` |

### 事件与方法

- `update:modelValue`、`change(value)`：提交时触发，编辑草稿不触发。
- `update:open`、`open-change(open)`：请求改变展开状态。
- `update:inputValue`、`input-value-change(text)`、`search(text)`：搜索状态。
- `focus(event)`、`blur(event)`、`clear(event)`：原生字段事件；只有字段所有者通知 Form。
- 方法：`focus()`、`blur()`。

### 插槽与选项数据

使用 `label({ data })` 自定义已选标签，`selected` 替换整个已选区域。还支持 `prefix`、`suffix`、`clear-icon({ clear })`、`arrow-icon`、`loading-icon`、`search-icon`、`empty`、`option({ data })`。

选项 `label` 是用于搜索的纯文本；自定义选项内容使用 `render` 或 `option` 插槽，自定义反显使用 `format-label` 或 `label` 插槽。以 value 而非 label 识别选项。选项的 `disabled` 禁止选择和删除，`tagProps` 可定制已选标签。

### CSS 变量

| Token | Default |
| --- | --- |
| `--mp-cascader-popup-max-height` | `200px` |
| `--mp-cascader-popup-border-radius` | `var(--mp-sys-radius-md)` |
| `--mp-cascader-popup-padding-vertical` | `var(--mp-sys-space-2)` |
| `--mp-cascader-popup-color-border` | `var(--mp-color-fill-3)` |
| `--mp-cascader-popup-box-shadow` | `0 4px 10px rgb(0 0 0 / 10%)` |
| `--mp-cascader-size-item-height` | `36px` |
| `--mp-cascader-font-item-size` | `var(--mp-sys-font-size-md)` |
| `--mp-cascader-margin-item-icon-left` | `var(--mp-sys-space-5)` |
| `--mp-cascader-item-text-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-cascader-item-icon-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-cascader-padding-item-left` | `var(--mp-sys-space-5)` |
| `--mp-cascader-padding-item-right` | `var(--mp-sys-space-5)` |
| `--mp-cascader-size-item-icon` | `12px` |
| `--mp-cascader-item-text-color-hover` | `var(--mp-cascader-item-text-color)` |
| `--mp-cascader-item-text-color-active` | `var(--mp-cascader-item-text-color)` |
| `--mp-cascader-item-text-color-disabled` | `var(--mp-sys-color-content-disabled)` |
| `--mp-cascader-item-text-color-disabled-active` | `var(--mp-sys-color-content-disabled)` |
| `--mp-cascader-item-bg-active` | `var(--mp-color-fill-2)` |
| `--mp-cascader-item-bg-hover` | `var(--mp-cascader-item-bg-active)` |
| `--mp-cascader-item-bg-disabled` | `transparent` |
| `--mp-cascader-item-bg-disabled-active` | `var(--mp-color-fill-2)` |
| `--mp-cascader-checkbox-bg-hover` | `var(--mp-color-fill-3)` |
| `--mp-cascader-margin-checkbox-right` | `var(--mp-sys-space-4)` |
| `--mp-cascader-panel-column-min-width` | `120px` |
| `--mp-cascader-panel-column-max-height` | `200px` |
| `--mp-cascader-option-min-width` | `100px` |
| `--mp-cascader-slide-margin` | `120px` |


### CascaderPanel

也可以独立使用 `CascaderPanel`（`mp-cascader-panel`），或 `Cascader.CascaderPanel`。这是无输入框、无弹层的 Menu 面板；支持 options、modelValue/defaultValue、multiple、pathMode、checkStrictly、fieldNames、loadMore、disabled、expandTrigger 和 expandChild。事件为 update:modelValue、change；empty 插槽自定义空状态。

### 字段与移动展示的样式边界

字段外壳与菜单 Token 保持两端同源；popup / dialog 的容器和工具栏统一复用内部 FieldPresentation。

### Form 字段展示与确认

本组件支持 `presentation`，字段 > FormItem > Form 逐层继承；未指定时为 `inline`，保留原有交互。支持值：`inline / popup`。其他编辑展示使用 Cell 入口和一份草稿，确认后才更新 v-model；取消、重置或启用 readPretty 丢弃草稿。

Maple 使用 presentation="popup" 点击值区域打开编辑面板；inline 直接编辑。 readPretty 为纯阅读属性，与 readonly、disabled 独立。

`before-commit(value, { previousValue, signal })` 可拦截弹层保存；FormItem 先校验候选值，失败保持编辑。`open / default-open / update:open` 控制编辑层。`#read="{ value, text }"` 可自定义阅读内容。集中示例见 Form 的“各类字段统一展示”。

原 menu/list/picker 展示改为 inline/popup（PC 使用 popover）；不保留旧枚举别名。弹层复用原选项索引、搜索、异步加载与虚拟列表算法。

`read-pretty` 为独立布尔属性，与 `readonly`、`disabled` 同级；字段 > FormItem > Form 继承，显式 `false` 覆盖父级。默认 `false`。纯阅读不显示编辑器。

### 子面板组合审查

```demo
../example/demos/panel-review.vue
```

### `<CascaderPanel>` Props

| 参数名                    | 描述                                   | 类型                                                                                                                                                               |         默认值          |
| ------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :---------------------: |
| path-mode                 | 绑定值是否为路径                       | `boolean`                                                                                                                                                          |         `false`         |
| multiple                  | 是否为多选状态（多选模式默认开启搜索） | `boolean`                                                                                                                                                          |         `false`         |
| model-value **(v-model)** | 绑定值                                 | `string\| number\| Record<string, any>\| (    \| string    \| number    \| Record<string, any>    \| (string \| number \| Record<string, any>)[]  )[]\| undefined` |           `-`           |
| default-value             | 默认值（非受控状态）                   | `string\| number\| Record<string, any>\| (    \| string    \| number    \| Record<string, any>    \| (string \| number \| Record<string, any>)[]  )[]\| undefined` | `'' \| undefined \| []` |
| options                   | 级联选择器的选项                       | `CascaderOption[]`                                                                                                                                                 |          `[]`           |
| expand-trigger            | 展开下一级的触发方式                   | `string`                                                                                                                                                           |        `'click'`        |
| check-strictly            | 是否开启严格选择模式                   | `boolean`                                                                                                                                                          |         `false`         |
| load-more                 | 数据懒加载函数，传入时开启懒加载功能   | `(  option: CascaderOption,  done: (children?: CascaderOption[]) => void) => void`                                                                                 |           `-`           |
| field-names               | 自定义 `CascaderOption` 中的字段；当选项值为对象时，也用其中的 `value` 作为键属性 | `CascaderFieldNames`                                                                                                                                               |           `-`           |
| expand-child              | 是否展开子菜单                         | `boolean`                                                                                                                                                          |         `false`         |

### `<CascaderPanel>` Events

| 事件名 | 描述             | 参数                                                                                   |
| ------ | ---------------- | -------------------------------------------------------------------------------------- |
| change | 选中值改变时触发 | value: `string \| number \| (string \| number \| (string \| number)[])[] \| undefined` |

### `<CascaderPanel>` Slots

| 插槽名 |         描述         | 参数 |
| ------ | :------------------: | ---- |
| empty  | 选项为空时的显示内容 | -    |


异步搜索时应在新请求开始时清除旧候选，并只采纳当前搜索词的最后一次响应。可使用 `update:input-value` 立即响应输入，通过 `loading` 和 `filter-option` 展示远程过滤结果。popup 内方向键与 Enter 只操作当前候选，保存由底部确认按钮完成。校验失败保留草稿；确认期间锁定编辑和关闭，表单重置会关闭 popup 并中止提交。请求归属应在关闭和重置时失效，完整示例见 Form 的“各类字段统一展示”。

### 单选对勾样式变量

| 变量 | 默认值 |
| --- | --- |
| `--mp-cascader-item-check-color` | `var(--mp-sys-color-action-primary)` |
| `--mp-cascader-item-check-size` | `var(--mp-sys-font-size-md)` |
