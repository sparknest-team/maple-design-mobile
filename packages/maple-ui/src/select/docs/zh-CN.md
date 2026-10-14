# 选择框

活动选项nextTick滚动只等渲染，不等CSS动画完成。关闭／重开、新导航、停用、卸载使旧任务失效；回调只消费一次，空列表也不重放。保留选择／键盘／滚动入口在停用／卸载后无效，激活允许新命令；晚登记下拉仍支持。虚拟回调后再核对状态才写DOM。两端专项各14、共享消费者Cedar93／Maple96回归通过，受控队列不算浏览器／OS或完整下游认证；API与CSS变量不变。

### 异步设备与 ID 回显

```demo
../example/demos/async-devices.vue
```

### 介绍

通过下拉菜单展示并选择内容。


### 同名选项

选项可以具有相同的 label，但 value 必须唯一。删除标签按 value 定位，不按标题匹配。以下三种展示方式删除第二个“设备”都只会移除 ID 2。

```demo
../example/demos/same-label.vue
```

### 标准外观

```demo
../example/demos/standard.vue
```

### 外边框外观

```demo
../example/demos/outline.vue
```

### Picker 模式

将 `presentation` 设置为 `picker` 即可使用底部弹窗的滚轮选择器。





```demo
../example/demos/picker.vue
```

### Picker 多选

与 Cascader 一致：弹层内用「添加」把当前项放入草稿，点「完成」才写回 `v-model`；「取消」丢弃草稿。

```html
<script setup>
  import { ref } from 'vue'

  const pickerMultiple = ref([])
  const pickerOptions = ref([
    { label: '吃饭', value: 1 },
    { label: '睡觉', value: 2 },
    { label: '打游戏', value: 3 },
    { label: '写文档', value: 4 },
  ])
</script>

<template>
  <mp-select
    presentation="picker"
    multiple show-tags
    clearable
    placeholder="请选择多个选项"
    v-model="pickerMultiple"
    :options="pickerOptions"
  />
</template>
```

### List 模式

将 `presentation` 设置为 `list`，底部弹窗以列表展示选项，选中项右侧显示对号。

单选：点击即选中并关闭。多选：点击切换勾选（草稿），点「完成」提交，「取消」丢弃。





```demo
../example/demos/list.vue
```


### 展示与提交规则

Menu 即选即提交。List 单选即选即提交，多选编辑草稿；Picker 单选、多选都编辑草稿。确认只提交一次；取消、遮罩关闭、Escape、切换展示方式都丢弃草稿。外部更新 modelValue 优先于草稿。Cedar 仅支持 Menu；Maple 在独立复制的控制器与 Menu 上增加 List、Picker 扩展，不共享运行时或实例。

### 交互调度生命周期

```demo
../example/demos/scheduler-lifecycle.vue
```

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
| `tag-nowrap` | 标签内容不换行 | `boolean` | `false` |
| `popup-container` | 选择器、元素、返回元素的函数或 false（原地渲染） | `PopupContainer` | `—` |
| `trigger-props` | Menu 的 Trigger 属性；展开状态由字段控制 | `TriggerProps` | `—` |
| `virtual-list-props` | Menu / List 的虚拟列表参数 | `VirtualListProps` | `—` |
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
| `default-active-first-option` | 默认激活首个可用选项（不会自动提交） | `boolean` | `true` |
| `unmount-on-close` | 关闭 Menu 后销毁内容 | `boolean` | `false` |
| `scrollbar` | Menu / List 滚动条配置 | `boolean 或 ScrollbarProps` | `true` |
| `show-header-on-empty / show-footer-on-empty` | 空状态仍展示 header / footer | `boolean` | `false` |
| `presentation` | 展示方式 | `menu / list / picker` | `menu` |
| `picker-props` | 滚轮外观与工具条文案；值、列、字段映射和工具条由扩展接管 | `PickerProps` | `{}` |
| `popup-props` | 弹层外观；展开状态、底部位置和挂载时机由扩展接管 | `PopupProps` | `{}` |

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

Select 还支持 `header`、`footer`、`trigger` 和默认插槽中的 `Option / Optgroup`。Option 属性为 `value`、`label`、`disabled`、`tagProps`、`index`；默认插槽提供 `selected`。分组数据为 `{ isGroup: true, label, options }`。Maple 的 List、Picker 同样支持插槽选项；Picker 展示选项的纯文本标签。

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
| `--mp-select-popup-group-title-padding-horizontal` | `var(--mp-sys-space-5)` |
| `--mp-select-popup-group-title-padding-top` | `var(--mp-sys-space-4)` |
| `--mp-select-popup-group-title-font-size` | `var(--mp-sys-font-size-xs)` |
| `--mp-select-popup-group-title-text-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-select-popup-option-suffix-icon-margin-left` | `var(--mp-sys-space-5)` |
| `--mp-select-popup-loading-min-height` | `50px` |
| `--mp-select-popup-option-icon-margin-right` | `var(--mp-sys-space-4)` |

单选和多选选项统一使用 popup-option-padding-horizontal。组件没有隐式搜索高亮 DOM；自定义选项插槽负责其高亮片段样式。已删除无效的 multi-popup-option-padding-horizontal 与 popup-option-highlight-* 变量。

### 字段与移动展示的样式边界

同源字段外壳的 Token 声明与 Cedar 保持一致。移动展示专属变量放在独立的 `src/_components/selection-field/presentation/style/token.less`，随本地 presentation 样式加载，不混入公共字段声明。名称与默认值不变：`--mp-selection-presentation-max-height` 为 `65vh`、`--mp-selection-presentation-bg` 为 `var(--mp-sys-color-surface-overlay)`、`--mp-selection-presentation-padding` 为 `var(--mp-sys-space-5)`；不向 Cedar 添加移动展示能力。
