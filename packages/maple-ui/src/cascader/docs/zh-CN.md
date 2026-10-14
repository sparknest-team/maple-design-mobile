# 级联选择器

### 异步设备与 ID 回显

```demo
../example/demos/async-devices.vue
```

### 介绍

通过下拉菜单或底部弹窗的形式进行级联选择。

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

### Picker 模式

```demo
../example/demos/placeholder-picker.vue
```

### Picker 多选

```demo
../example/demos/placeholder-picker-multiple.vue
```

### List 模式

```demo
../example/demos/placeholder-list.vue
```

### List 多选

```demo
../example/demos/placeholder-list-multiple.vue
```


### 展示与提交规则

Menu 即选即提交。List 单选即选即提交，多选编辑草稿；Picker 单选、多选都编辑草稿。确认只提交一次；取消、遮罩关闭、Escape、切换展示方式都丢弃草稿。外部更新 modelValue 优先于草稿。Cedar 仅支持 Menu；Maple 在独立复制的控制器与 Menu 上增加 List、Picker 扩展，不共享运行时或实例。

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
| `tag-nowrap` | 标签内容不换行 | `boolean` | `false` |
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
| `presentation` | 展示方式 | `menu / list / picker` | `menu` |
| `picker-props` | 滚轮外观与工具条文案；值、列、字段映射和工具条由扩展接管 | `PickerProps` | `{}` |
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

同源字段外壳的 Token 声明与 Cedar 保持一致。移动展示专属变量放在独立的 `src/_components/selection-field/presentation/style/token.less`，随本地 presentation 样式加载，不混入公共字段声明。名称与默认值不变：`--mp-selection-presentation-max-height` 为 `65vh`、`--mp-selection-presentation-bg` 为 `var(--mp-sys-color-surface-overlay)`、`--mp-selection-presentation-padding` 为 `var(--mp-sys-space-5)`；不向 Cedar 添加移动展示能力。
