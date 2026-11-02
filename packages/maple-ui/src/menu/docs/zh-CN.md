# Menu 菜单

用于收纳针对当前对象的临时命令，例如更多操作、右键菜单和按钮的附加操作。选择表单数据请使用 [Select](#/zh-CN/select)；选择层级数据请使用 [Cascader](#/zh-CN/cascader)。

弹出层基于无视觉样式的 [Trigger](#/zh-CN/trigger) 实现，使用统一十二方位和 `cover` 覆盖模式，默认 `bottom`。同宽、高度限制分别使用 `auto-fit-popup-width`、`popup-max-height`。

## 基础示例

### 更多操作

使用默认插槽传入触发元素，通过 `options` 定义命令。`type: 'divider'` 渲染分隔线。

```demo
../example/demos/overflow-actions.vue
```

## 外观与状态

### 禁用状态

`disabled` 加在菜单上禁用整个浮层，加在选项上只禁用该项及其后代。

```demo
../example/demos/disabled-state.vue
```

## 选项与层级

### 分组、子菜单与选项内容

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `options` | 命令树 | 分组、子菜单与选项内容、选中与视觉强调 |
| `hide-on-select` | 激活命令后关闭浮层 | 选中与视觉强调 |
| `submenu-trigger` | 各级子菜单的展开方式，对所有层级统一生效 | 选中与视觉强调 |
<!-- demo-config-notes:end -->

比较平级分组、层级菜单和自定义选项内容。展开子菜单或选择选项，观察各自的数据层级；受控选中与外部定位独立展示。

<details>
<summary>配置说明与使用限制</summary>

#### 选项分组

在 `options` 中使用 `{ type: 'group', children }` 分组，不需要额外的分组组件。分组只负责视觉分隔，不增加子项层级。

#### 多级菜单

带 `children` 的普通选项自动成为子菜单。所有层级的子菜单共用 `submenu-trigger`，移动端默认点击展开；改成 `'hover'` 时同样对所有层级生效，不能逐项配置，避免同一棵菜单里出现两种展开方式。

#### 自定义选项内容

选项的 `label`、`icon`、`extra` 都支持文本、VNode 或接收 `{ option, active, level }` 的渲染函数。需要统一渲染整组数据时，使用 `option-label`、`option-icon`、`option-extra` 作用域插槽。

`active` 只表示当前选项自身是否匹配菜单的选中值。选中子项时，父分支的 `active` 仍为 `false`；后代选中及展开状态只用于组件内部的路径强调，不作为渲染参数公开。根 Menu 使用 `modelValue/defaultValue` 控制选中值、`open/defaultOpen` 控制展开。`MenuOption` 的视觉强调统一使用 `highlight`，不会改变选中值。

</details>

```demo
../example/demos/structure-comparison.vue
```

### 选中与视觉强调

对比渲染函数、作用域插槽和手写 MenuOption。父分支可以有选中路径样式，但 active 仍为 false；highlight 也不会把选项变成选中值。

```demo
../example/demos/active-rendering.vue
```

## 触发与定位

### 右键菜单

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `trigger` | 根菜单触发方式 | 右键菜单、触发方式 |
| `options` | 命令树 | 右键菜单、定位策略 |
| `align-point` | 按触发时的鼠标坐标定位；打开后保持该位置，再次右键时更新 | 右键菜单 |
| `placement` | 浮层相对触发元素的首选方位，默认 bottom；启用默认的 auto-fit-position 时，空间不足会自动翻转并约束到可视区域，不保证最终停在该侧 | 弹出方向 |
| `strategy` | 根菜单及全部子菜单的定位策略 | 定位策略 |
| `submenu-trigger` | 各级子菜单的展开方式，对所有层级统一生效 | 定位策略 |
<!-- demo-config-notes:end -->

在目标区域内点击鼠标右键触发，需要同时设置 `trigger="contextMenu"` 和 `align-point`。菜单固定在本次右键触发的位置，移动鼠标不会改变位置；再次右键时才更新定位点。

```demo
../example/demos/context-menu.vue
```

### 与 SplitButton 组合

[SplitButton](#/zh-CN/split-button) 已封装按钮与下拉命令菜单的组合，并通过 `MenuOption` 定义附加操作。

### 触发方式

```demo
../example/demos/trigger.vue
```

### 弹出方向

```demo
../example/demos/placement.vue
```

### 定位策略

根菜单和各级子菜单响应式使用同一 `strategy`，默认 `absolute`，可选 `fixed`。切换策略不会改变激活值或主动关闭菜单。`popup-container` 独立控制挂载位置；`fixed` 不保证脱离 transform 祖先的包含块。

```demo
../example/demos/positioning.vue
```

### 高度限制

```demo
../example/demos/popup-max-height.vue
```

## 状态与内容定制

### 选中值与 select 事件

可使用 `v-model` 管理当前激活值。激活命令时先触发 `update:model-value`，再触发 `select(value, option, event)`；`select` 表示激活菜单项，不表示表单值变化。

```demo
../example/demos/selection.vue
```

### 受控打开状态

```demo
../example/demos/controlled.vue
```

### 页脚

```demo
../example/demos/footer.vue
```

## 阅读方向

继承最近的 `dir="ltr|rtl"`，支持运行时切换与局部覆盖。子级沿阅读方向展开；进入子级与返回父级的左右键跟随当前方向，上下键与首尾定位保持顺序并跳过禁用项。挂载到外部容器的菜单继承来源方向，切换方向不改变选中值。

## API

### 主值与默认值

使用普通 `v-model`。`modelValue` 表示选中选项的 value；`defaultValue` 仅在创建时初始化非受控值，后续修改不会重置当前状态。显式绑定值优先，初始化不发出 `update:modelValue`。

### 属性

| 参数名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `options` | 命令树 | _MenuOption[]_ | `[]` |
| `field-names` | `label/value/children/disabled` 字段映射 | _MenuFieldNames_ | `-` |
| `v-model` | 当前激活值 | _MenuValue_ | `-` |
| `v-model:open` | 浮层是否可见 | _boolean_ | `-` |
| `default-open` | 非受控默认可见状态 | _boolean_ | `false` |
| `size` | 选项尺寸 | _'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'_ | `'md'` |
| `trigger` | 根菜单触发方式 | _'click' \| 'hover' \| 'focus' \| 'contextMenu'_ | `'click'` |
| `submenu-trigger` | 各级子菜单的展开方式，对所有层级统一生效 | _'click' \| 'hover'_ | `'click'` |
| `placement` | 浮层相对触发元素的首选方位，默认 bottom；启用默认的 auto-fit-position 时，空间不足会自动翻转并约束到可视区域，不保证最终停在该侧 | _MenuPosition_ | `'bottom'` |
| `strategy` | 根菜单及全部子菜单的定位策略 | _'absolute' \| 'fixed'_ | `'absolute'` |
| `reference` | 外部触发元素 | _string \| HTMLElement_ | `-` |
| `popup-container` | 浮层挂载容器 | _string \| HTMLElement \| false_ | `-` |
| `popup-class` | 浮层类名 | _string \| array \| object_ | `-` |
| `popup-max-height` | 默认限制、自定义像素高度或不限高 | _boolean \| number_ | `true` |
| `offset-x` | 水平偏移 | _string \| number_ | `0` |
| `offset-y` | 垂直偏移 | _string \| number_ | `0` |
| `mouse-enter-delay` | 悬停打开延迟（毫秒） | _number_ | `100` |
| `mouse-leave-delay` | 悬停关闭延迟（毫秒） | _number_ | `100` |
| `close-on-click-reference` | 再次点击触发元素时关闭 | _boolean_ | `false` |
| `unmount-on-close` | 关闭时卸载浮层内容 | _boolean_ | `false` |
| `hide-on-select` | 激活命令后关闭浮层 | _boolean_ | `true` |
| `auto-fit-popup-width` | 浮层宽度跟随触发元素 | _boolean_ | `false` |
| `cover` | 浮层覆盖触发元素 | _boolean_ | `false` |
| `align-point` | 按触发时的鼠标坐标定位；打开后保持该位置，再次右键时更新 | _boolean_ | `false` |
| `disabled` | 禁用菜单 | _boolean_ | `false` |
| `elevation` | 浮层阴影层级 | _boolean \| number_ | `true` |

### MenuOptionData

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| `type` | 普通命令、分组或分隔线 | _'item' \| 'group' \| 'divider'_ |
| `label` | 主内容 | _VNodeChild \| (context) => VNodeChild_ |
| `icon` | 前置图标 | _VNodeChild \| (context) => VNodeChild_ |
| `extra` | 右侧辅助内容，如快捷键 | _VNodeChild \| (context) => VNodeChild_ |
| `value` | 激活命令时传给事件的值 | _any_ |
| `children` | 子命令；普通项带 children 时成为子菜单 | _MenuOption[]_ |
| `disabled` | 禁用当前项及其后代 | _boolean_ |
| `show` | 是否渲染 | _boolean_ |
| `ripple` | 是否显示点击波纹 | _boolean_ |
| `props` | 透传给命令行元素的 HTML 属性 | _HTMLAttributes_ |

渲染上下文为 `{ option, active, level }`。`type: 'group'` 只负责视觉分组，不增加子项层级；`type: 'divider'` 不可聚焦或激活。

### 事件

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `update:model-value` | 当前选中值更新请求 | `value: MenuValue` |
| `select` | 用户激活菜单项 | `value, option, event` |
| `open-change` | 浮层显示状态更新请求 | `open: boolean` |
| `open` / `opened` | 浮层开始打开 / 打开完成 | `-` |
| `close` / `closed` | 浮层开始关闭 / 关闭完成 | `-` |
| `click-outside` | 点击浮层外部 | `event: Event` |
| `key-escape` | 按下 Escape | `-` |

### 方法

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| `open` | 打开浮层 | `-` |
| `close` | 关闭浮层 | `-` |
| `resize` | 重新计算浮层位置 | `-` |
| `setReference` | 设置外部触发元素 | `reference?: HTMLElement` |

### 插槽

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 触发元素 | `-` |
| `content` | 追加手写内容，适合与 `MenuOption` 组合 | `-` |
| `footer` | 页脚 | `-` |
| `option-label` | 统一渲染选项主内容 | `{ option, active, level }` |
| `option-icon` | 统一渲染选项图标 | `{ option, active, level }` |
| `option-extra` | 统一渲染选项右侧内容 | `{ option, active, level }` |

### MenuOption 属性

保留给 SplitButton 和手写 `content` 场景。分组和子菜单只通过 `options` 描述，不提供 `MenuGroup`、`MenuSubmenu` 组件。

| 参数名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `label` | 主内容或渲染函数 | _MenuContent_ | `-` |
| `value` | 激活时传给事件的值 | _any_ | `-` |
| `disabled` | 禁用 | _boolean_ | `false` |
| `ripple` | 是否显示点击波纹 | _boolean_ | `true` |
| `highlight` | 视觉强调，不改变选中值 | _boolean_ | `false` |

### MenuOption 事件与插槽

`click` 事件在未禁用时触发；`default`、`icon`、`suffix` 插槽统一接收 `{ option, active, level }`。`label` 渲染函数也接收同一对象，替代旧的双参数签名。

### 键盘交互

根菜单支持上下键、Home/End、Enter；子菜单通过右键进入、左键或 Escape 返回，Escape 每次只关闭最上层并恢复焦点。

## 类型定义

```ts
import type {
  MenuFieldNames,
  MenuInstance,
  MenuOptionData,
  MenuRenderContext,
  MenuSlots,
  MenuOptionSlots,
  MenuPlacement,
  MenuProps,
  MenuSubmenuTrigger,
  MenuOptionProps,
  MenuValue,
} from '@maple-design/ui'
```

## 样式变量

分组标题与选项左对齐，标题行高 20px、上下各 4px 留白（总高 28px）；相邻分组额外间隔 8px，首组不添加组间距。标题高度随内容自然撑开，避免行高与 padding 挤压重叠。


| 变量名 | 默认值 |
| --- | --- |
| `--mp-menu-max-height` | `278px` |
| `--mp-menu-padding` | `4px 0` |
| `--mp-menu-padding-vertical` | `4px` |
| `--mp-menu-border-radius` | `2px` |
| `--mp-menu-border-color` | `var(--mp-color-fill-3)` |
| `--mp-menu-background-color` | `var(--mp-sys-color-surface-overlay)` |
| `--mp-menu-option-xs-height` | `24px` |
| `--mp-menu-option-sm-height` | `30px` |
| `--mp-menu-option-md-height` | `38px` |
| `--mp-menu-option-lg-height` | `46px` |
| `--mp-menu-option-xl-height` | `54px` |
| `--mp-menu-option-padding` | `0 12px` |
| `--mp-menu-option-xs-font-size` | `var(--mp-font-size-xs)` |
| `--mp-menu-option-sm-font-size` | `var(--mp-font-size-sm)` |
| `--mp-menu-option-md-font-size` | `var(--mp-font-size-md)` |
| `--mp-menu-option-lg-font-size` | `var(--mp-font-size-lg)` |
| `--mp-menu-option-xl-font-size` | `var(--mp-font-size-lg)` |
| `--mp-menu-option-text-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-menu-option-selected-background` | `var(--mp-sys-color-state-hover)` |
| `--mp-menu-option-selected-text-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-menu-option-bg-hover` | `var(--mp-sys-color-state-hover)` |
| `--mp-menu-option-disabled-color` | `var(--mp-color-text-disabled)` |
| `--mp-menu-option-icon-margin-right` | `8px` |
| `--mp-menu-option-suffix-margin-left` | `16px` |
| `--mp-menu-option-arrow-padding` | `0 6px 0 8px` |
| `--mp-menu-option-arrow-icon-size` | `18px` |
| `--mp-menu-group-title-height` | `20px` |
| `--mp-menu-group-title-padding` | `4px 12px` |
| `--mp-menu-group-title-font-size` | `var(--mp-font-size-sm)` |
| `--mp-menu-group-title-text-color` | `var(--mp-color-text-3)` |

### 状态与时长变量

禁用优先于选中、指针 hover 和键盘焦点。选中后的 hover 使用独立角色，默认继承选中背景；可单独覆盖以增加 hover 反馈。选中背景直接绘制在选项上，与 Cedar 一致。

| Token | Default |
| --- | --- |
| `--mp-menu-option-bg-selected-hover` | `var(--mp-menu-option-selected-background)` |
| `--mp-menu-option-bg-disabled` | `transparent` |

### 数据身份与触发器切换

可重排的数据项应提供稳定、唯一的 `value`，内部 Vue key 由业务值生成；数字 `0`、字符串 `'0'`、布尔值 `false` 保持不同身份。没有显式 value 的分组、分隔符或展示项按原始选项对象维持渲染身份，不新增公开 key 别名。点击另一个已经因 hover 打开的同级触发按钮，会关闭原先的菜单；点击子菜单内部不会误关父级。


### 方位语义与配置入口

MenuPlacement 复用 TriggerPlacement 的十二方位值域；属性和类型均表达浮层相对触发器的首选方位。旧 MenuPosition 已删除。
