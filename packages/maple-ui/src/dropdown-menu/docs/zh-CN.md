# DropdownMenu 下拉命令菜单

### 介绍

用于收纳针对当前对象的临时命令，例如更多操作、右键菜单和按钮的附加操作。选择表单数据请使用 [Select](#/zh-CN/select)；选择层级数据请使用 [Cascader](#/zh-CN/cascader)。

弹出层基于无视觉样式的 [Trigger](#/zh-CN/trigger) 实现，定位枚举沿用 Popper（含 `cover-*`），默认 `bottom`。同宽、高度限制分别使用 `auto-fit-popup-width`、`popup-max-height`。

### 更多操作

使用默认插槽传入触发元素，通过 `options` 定义命令。`type: 'divider'` 渲染分隔线。

```demo
../example/demos/overflow-actions.vue
```

### 右键菜单

在目标区域内点击鼠标右键触发，需要同时设置 `trigger="contextMenu"` 和 `align-point`。

```demo
../example/demos/context-menu.vue
```

### 与 SplitButton 组合

[SplitButton](#/zh-CN/split-button) 已封装按钮与下拉命令菜单的组合，并通过 `MenuOption` 定义附加操作。

### 激活值与 select 事件

可使用 `v-model` 管理当前激活值。激活命令时先触发 `update:model-value`，再触发 `select(value, option, event)`；`select` 表示激活菜单项，不表示表单值变化。

```demo
../example/demos/selection.vue
```

### 选项分组

在 `options` 中使用 `{ type: 'group', children }` 分组，不需要额外的分组组件。分组只负责视觉分隔，不增加子项层级。

```demo
../example/demos/group.vue
```

### 多级菜单

带 `children` 的普通选项自动成为子菜单。所有层级的子菜单共用 `submenu-trigger`，移动端默认点击展开；改成 `'hover'` 时同样对所有层级生效，不能逐项配置，避免同一棵菜单里出现两种展开方式。

```demo
../example/demos/submenu.vue
```

### 自定义选项内容

推荐直接在选项中传入 `icon`、`extra` 或 VNode；三者也可使用接收 `{ option, active, level }` 的渲染函数。需要统一渲染整组数据时，使用 `option-label`、`option-icon`、`option-extra` 作用域插槽。这个模式比为每项拼装模板更适合动态数据。

```demo
../example/demos/option-content.vue
```

### 触发方式

```demo
../example/demos/trigger.vue
```

### 禁用状态

`disabled` 加在菜单上禁用整个浮层，加在选项上只禁用该项及其后代。

```demo
../example/demos/disabled-state.vue
```

### 高度限制

```demo
../example/demos/popup-max-height.vue
```

### 受控打开状态

```demo
../example/demos/controlled.vue
```

### 页脚

```demo
../example/demos/footer.vue
```

### 弹出方向

```demo
../example/demos/placement.vue
```

## API

### 属性

| 参数名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `options` | 命令树 | _DropdownMenuOption[]_ | `[]` |
| `field-names` | `label/value/children/disabled` 字段映射 | _DropdownMenuFieldNames_ | `-` |
| `v-model` | 当前激活值 | _MenuValue_ | `-` |
| `v-model:open` | 浮层是否可见 | _boolean_ | `-` |
| `default-open` | 非受控默认可见状态 | _boolean_ | `false` |
| `size` | 选项尺寸 | _'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'_ | `'md'` |
| `trigger` | 根菜单触发方式 | _'click' \| 'hover' \| 'focus' \| 'contextMenu'_ | `'click'` |
| `submenu-trigger` | 各级子菜单的展开方式，对所有层级统一生效 | _'click' \| 'hover'_ | `'click'` |
| `placement` | 弹出位置 | _DropdownMenuPosition_ | `'bottom'` |
| `strategy` | Popper 定位策略 | _'absolute' \| 'fixed'_ | `'absolute'` |
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
| `align-point` | 浮层跟随鼠标位置 | _boolean_ | `false` |
| `disabled` | 禁用菜单 | _boolean_ | `false` |
| `elevation` | 浮层阴影层级 | _boolean \| number_ | `true` |

### DropdownMenuOption

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| `type` | 普通命令、分组或分隔线 | _'item' \| 'group' \| 'divider'_ |
| `label` | 主内容 | _VNodeChild \| (context) => VNodeChild_ |
| `icon` | 前置图标 | _VNodeChild \| (context) => VNodeChild_ |
| `extra` | 右侧辅助内容，如快捷键 | _VNodeChild \| (context) => VNodeChild_ |
| `value` | 激活命令时传给事件的值 | _any_ |
| `children` | 子命令；普通项带 children 时成为子菜单 | _DropdownMenuOption[]_ |
| `disabled` | 禁用当前项及其后代 | _boolean_ |
| `show` | 是否渲染 | _boolean_ |
| `ripple` | 是否显示点击波纹 | _boolean_ |
| `props` | 透传给命令行元素的 HTML 属性 | _HTMLAttributes_ |

渲染上下文为 `{ option, active, level }`。`type: 'group'` 只负责视觉分组，不增加子项层级；`type: 'divider'` 不可聚焦或激活。

### 事件

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `update:model-value` | 当前激活值更新请求 | `value: MenuValue` |
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
| `label` | 主内容 | _any_ | `-` |
| `value` | 激活时传给事件的值 | _any_ | `-` |
| `disabled` | 禁用 | _boolean_ | `false` |
| `ripple` | 是否显示点击波纹 | _boolean_ | `true` |

### MenuOption 事件与插槽

`click` 事件在未禁用时触发；插槽包含 `default`、`icon`、`suffix`。

### 键盘交互

根菜单支持上下键、Home/End、Enter；子菜单通过右键进入、左键或 Escape 返回，Escape 每次只关闭最上层并恢复焦点。

## 类型定义

```ts
import type {
  DropdownMenuFieldNames,
  DropdownMenuInstance,
  DropdownMenuOption,
  DropdownMenuPosition,
  DropdownMenuProps,
  DropdownMenuSubmenuTrigger,
  MenuOptionProps,
  MenuValue,
} from '@maplejs/maple-ui'
```

## 样式变量

| 变量名 | 默认值 |
| --- | --- |
| `--mp-dropdown-menu-max-height` | `278px` |
| `--mp-dropdown-menu-padding` | `4px 0` |
| `--mp-dropdown-menu-padding-vertical` | `4px` |
| `--mp-dropdown-menu-border-radius` | `2px` |
| `--mp-dropdown-menu-border-color` | `var(--mp-color-fill-3)` |
| `--mp-dropdown-menu-background-color` | `var(--mp-color-fill-2)` |
| `--mp-dropdown-menu-option-xs-height` | `24px` |
| `--mp-dropdown-menu-option-sm-height` | `30px` |
| `--mp-dropdown-menu-option-md-height` | `38px` |
| `--mp-dropdown-menu-option-lg-height` | `46px` |
| `--mp-dropdown-menu-option-xl-height` | `54px` |
| `--mp-dropdown-menu-option-padding` | `0 12px` |
| `--mp-dropdown-menu-option-xs-font-size` | `var(--mp-font-size-xs)` |
| `--mp-dropdown-menu-option-sm-font-size` | `var(--mp-font-size-sm)` |
| `--mp-dropdown-menu-option-md-font-size` | `var(--mp-font-size-md)` |
| `--mp-dropdown-menu-option-lg-font-size` | `var(--mp-font-size-lg)` |
| `--mp-dropdown-menu-option-xl-font-size` | `var(--mp-font-size-lg)` |
| `--mp-dropdown-menu-option-text-color` | `var(--mp-color-text-1)` |
| `--mp-dropdown-menu-option-selected-background` | `var(--mp-color-primary)` |
| `--mp-dropdown-menu-option-selected-text-color` | `var(--mp-color-primary)` |
| `--mp-dropdown-menu-option-bg-hover` | `var(--mp-color-fill-3)` |
| `--mp-dropdown-menu-option-disabled-color` | `var(--mp-color-text-disabled)` |
| `--mp-dropdown-menu-option-icon-margin-right` | `8px` |
| `--mp-dropdown-menu-option-suffix-margin-left` | `16px` |
| `--mp-dropdown-menu-option-arrow-padding` | `0 6px 0 8px` |
| `--mp-dropdown-menu-option-arrow-icon-size` | `18px` |
| `--mp-dropdown-menu-group-title-height` | `24px` |
| `--mp-dropdown-menu-group-title-padding` | `8px 12px 4px` |
| `--mp-dropdown-menu-group-title-font-size` | `var(--mp-font-size-sm)` |
| `--mp-dropdown-menu-group-title-text-color` | `var(--mp-color-text-3)` |
