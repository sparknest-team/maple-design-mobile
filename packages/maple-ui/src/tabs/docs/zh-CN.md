# Tabs 标签页

导航与内容使用同一套 API，PC 和移动端通过主题变量保留视觉密度差异。

## 基础示例

### 最简单用法

最简单的写法只需要在 `Tabs` 中声明带 `title` 的 `TabPane`，导航与内容会自动生成。

```demo
../example/demos/basic.vue
```

## 外观与状态

### 外观组合

适用于同级内容之间的切换。调整变体、尺寸，用相同数据观察变化。内容保持一致，便于比较不同设置的实际效果。

```demo
../example/demos/appearance-lab.vue
```

## 外观与方向

### 样式变体

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `default-value` | `string / number` | 样式变体、方向与指示器位置、图标与导航插槽 |
| `variant` | `line / card / outline / plain / capsule / enclosed` | 样式变体 |
| `size` | `xs / sm / md / lg / xl` | 样式变体 |
| `orientation` | 标签导航的横纵轴向，默认 horizontal；影响导航布局和方向键操作 | 方向与指示器位置 |
| `indicator-position` | 指示器位于导航靠内容的一侧 normal 或相反侧 reverse，默认 normal；不使用四边值 | 方向与指示器位置 |
| `item-class` | `string / object / array` | 自定义内部样式 |
<!-- demo-config-notes:end -->

`variant` 控制导航外观；卡片和胶囊样式也使用相同的标签与内容结构。

```demo
../example/demos/variants.vue
```

### 方向与指示器位置

通过选项切换横向、纵向布局和指示器所在方向；还可以交换 `TabsNavs` 与 `TabsItems` 的声明顺序，将导航放在内容的另一侧。

```demo
../example/demos/position.vue
```

### 图标与导航插槽

TabNav 支持图标与纵向排列；TabsNavs 支持前后附加内容。

```demo
../example/demos/icons-and-slots.vue
```

### 自定义内部样式

```demo
../example/demos/custom-style.vue
```

六个样式属性统一配置在 Tabs 上，对所有对应项生效。自定义类名与内置类名合并；内联样式可覆盖默认间距。`item-wrapper-*` 对应 role="tabpanel" 外层，`item-*` 对应实际内容内层，`tab-*` 对应导航标签外层。

内容间距使用 `item-style`，导航整体间距可通过 TabsNavs 的 `style` 或 CSS token 调整。

## 导航与内容组合

### 仅导航

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `default-value` | `string / number` | 仅导航 |
| `editable` | `boolean` | 仅导航 |
| `show-add-button` | `boolean` | 仅导航 |
| `auto-switch` | `boolean` | 仅导航 |
<!-- demo-config-notes:end -->

只需要标签导航时，无需编写内容组件；直接在 `TabsNavs` 中声明 `TabNav` 即可。

```demo
../example/demos/nav-content.vue
```

导航属性与状态组合：

```demo
../example/demos/navs-review.vue
```

## 内容与展示

### 横向滚动与手势切换

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `default-value` | `string / number` | 横向滚动与手势切换 |
| `swipeable` | `boolean` | 横向滚动与手势切换 |
| `scroll-position` | 选中标签在导航滚动视口中的目标位置或数值偏移，默认 auto；不是弹层方位 | 横向滚动与手势切换 |
<!-- demo-config-notes:end -->

标签较多时导航可横向滚动：移动端直接拖动导航，PC 使用鼠标滚轮或触控板。开启 `swipeable` 后，还能在内容区域左右滑动切换；滑动会跳过禁用项。

```demo
../example/demos/scrollable.vue
```

## 交互与动态标签

### 按需挂载内容

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `default-value` | `string / number` | 按需挂载内容 |
| `lazy-load` | `boolean` | 按需挂载内容 |
| `variant` | `line / card / outline / plain / capsule / enclosed` | 动态增删标签 |
| `editable` | `boolean` | 动态增删标签 |
| `show-add-button` | `boolean` | 动态增删标签 |
| `auto-switch` | `boolean` | 动态增删标签 |
<!-- demo-config-notes:end -->

`lazy-load` 在首次打开面板时才挂载内容；`destroy-on-hide` 在离开面板时卸载内容，适合无需保留内部状态的页面。

```demo
../example/demos/lazy-load.vue
```

### 动态增删标签

编辑模式支持增加和关闭标签，数据仍由使用者维护。

```demo
../example/demos/editable.vue
```

### 受控切换

使用 `v-model` 时，父组件可以通过按钮切换当前页，也能读取用户点选后的值。

```demo
../example/demos/controlled.vue
```

## API

TabPane、TabNav、TabItem 都需要唯一的 `name`；选中值及导航与面板对应关系均使用 name。Vue 的 key 只负责节点复用，循环渲染时单独提供 `:key`。

主值使用普通 `v-model`：`modelValue` 表示选中标签的 name。`defaultValue` 仅在创建时初始化非受控状态，之后修改不会重置当前值；初始化不触发 `update:modelValue`。提供 `modelValue` 时由父级控制，以受控值为准。

### Tabs Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| model-value | `string / number` | `undefined` | 当前选中 name；提供时受控 |
| default-value | `string / number` | `undefined` | 非受控初值，省略选首个可用项 |
| variant | `line / card / outline / plain / capsule / enclosed` | `line` | 视觉变体 |
| size | `xs / sm / md / lg / xl` | `全局值或 md` | 尺寸 |
| tab-list-aria-label | `string` | `undefined` | 标签列表的无障碍名称；TabsNavs 的显式 aria-label 或 aria-labelledby 优先 |
| orientation | `Orientation`<br>`'horizontal' \| 'vertical'` | `horizontal` | 导航方向 |
| indicator-position | `TabsIndicatorPosition`<br>`'normal' \| 'reverse'` | `normal` | 指示器在内容侧或相反侧 |
| editable | `boolean` | `false` | 允许关闭标签 |
| show-add-button | `boolean` | `false` | 编辑模式显示新增按钮 |
| auto-switch | `boolean` | `false` | 新增后切换最后一个可用标签 |
| lazy-load | `boolean` | `false` | 首次激活挂载 |
| destroy-on-hide | `boolean` | `false` | 隐藏即卸载内容 |
| justify | `boolean` | `false` | 水平方向撑满容器高度 |
| animation | `boolean` | `false` | 内容淡入动画 |
| item-class | `string / object / array` | `undefined` | 每页内容内层类名，合并内置类名 |
| item-style | `StyleValue` | `undefined` | 每页内容内层样式，支持字符串、对象和数组 |
| item-wrapper-class | `string / object / array` | `undefined` | 每页内容外层容器类名，合并内置类名 |
| item-wrapper-style | `StyleValue` | `undefined` | 每页内容外层容器样式，支持字符串、对象和数组 |
| tab-class | `string / object / array` | `undefined` | 导航标签外层（含标题与关闭按钮）类名，合并内置类名 |
| tab-style | `StyleValue` | `undefined` | 导航标签外层（含标题与关闭按钮）样式，支持字符串、对象和数组 |
| hide-content | `boolean` | `false` | 隐藏内容区域 |
| trigger | `click / hover` | `click` | 鼠标触发方式，触摸始终点击 |
| scroll-position | `TabsScrollPosition`<br>`'start' \| 'end' \| 'center' \| 'auto' \| number` | `auto` | 选中标签滚动位置，数字为起点偏移 |
| scroll-buttons | `boolean / auto` | `auto` | 溢出时显示箭头，auto 在触摸设备隐藏 |
| activation-mode | `automatic / manual` | `automatic` | 方向键是否立即选中 |
| swipeable | `boolean` | `false` | 内容横向触摸切换；不循环 |

### Tabs Events

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| update:model-value | name: string / number | 请求更新选中值 |
| change | name: string / number | 选择不同可用项时通知；受控模式仍由父级更新 modelValue |
| tab-click | name, event: Event | 点击可用项，重复点击仍触发；hover/方向键/滑动不触发 |
| add | event: Event | 请求增加标签；由使用者修改数据 |
| delete | name, event: Event | 请求删除标签；由使用者修改数据 |

### TabPane Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| name **(必填)** | string / number | — | 业务唯一标识，与 modelValue 对应 |
| title | string | undefined | 导航标题 |
| disabled | boolean | false | 禁止选择和关闭 |
| closable | boolean | true | editable 模式显示关闭按钮 |
| item-vertical | boolean | false | 图标文字垂直布局 |
| lazy-load | boolean | undefined | 继承 Tabs，显式 false 可覆盖 |
| destroy-on-hide | boolean | undefined | 继承 Tabs，显式 false 可覆盖 |

### TabNav Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| name **(必填)** | string / number | — | 业务唯一标识，与 modelValue 对应 |
| title | string | undefined | 标题 |
| disabled | boolean | false | 禁止选择和关闭 |
| closable | boolean | true | editable 模式显示关闭按钮 |
| item-vertical | boolean | false | 图标文字垂直布局 |

TabNav 与 TabItem 使用相同的 `name` 建立对应关系；`name` 在同组内唯一，数字 `1` 与字符串 `'1'` 不同。Vue 的 `key` 只负责节点复用，循环渲染时仍应提供 `:key`，它不参与选中值计算。

### TabItem Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| name **(必填)** | string / number | — | 业务唯一标识，与 modelValue 对应 |
| lazy-load | boolean | undefined | 继承 Tabs，显式 false 可覆盖 |
| destroy-on-hide | boolean | undefined | 继承 Tabs，显式 false 可覆盖 |

未激活的 panel 始终带 hidden，内部状态是否保留由上述属性决定。destroy-on-hide 优先于 lazy-load；active 内容始终挂载。TabsNavs 和 TabsItems 没有业务 Props。

### TabItem Slots

| 组件 | 插槽 | 说明 |
| --- | --- | --- |
| Tabs | default | TabPane 列表；或高级组合所需的 TabsNavs 与 TabsItems |
| TabPane | default / title | 面板内容 / 自定义导航标题 |
| TabsNavs | default | TabNav 列表 |
| TabsNavs | prefix / suffix / add-icon | 导航前后附加区、新增图标 |
| TabNav | title / default / icon | title 插槽或默认插槽为自定义标题；icon 为图标 |
| TabsItems | default | TabItem 列表 |
| TabItem | default | 面板内容 |

### TabItem Methods

`TabsNavs.resize(): void` 重新测量溢出并将选中标签滚入可见区域。尺寸变化有 ResizeObserver 自动监听。

### 键盘与方向

方向键跳过禁用项并循环；Home/End 到首尾；可编辑标签按 Delete 请求关闭。horizontal 使用左右键，vertical 使用上下键。manual 模式只移动焦点，Enter/Space 通过原生 button 激活。使用 `dir="rtl"` 支持从右向左布局。TabsNavs 可传 `aria-label` 为导航命名。

关闭请求后，若获得焦点的标签被移除，焦点移到相邻可用标签；若用户已将焦点移到别处则不抢回。切换面板时，仅当焦点位于将隐藏的面板内才将其移到新标签。水平滚动的 start、end 和数值偏移按阅读方向计算，RTL 时起点在右侧。

简单 TabPane 模式可通过 tab-list-aria-label 命名标签列表；高级 TabsNavs 可直接使用 aria-label 或 aria-labelledby。仅使用导航、不提供 TabItem 时，调用方负责管理外部面板的关联和可访问性。

## Types

导出 TabsName、TabsVariant、TabsTrigger、TabsIndicatorPosition、TabsScrollPosition、TabsActivationMode，以及六组件对应的 Props / Instance / 运行时 props / `_XxxComponent`。同一 props 定义用于两端。

## 使用说明

支持 xs / sm / md / lg / xl 五档尺寸。Cedar 继承 ConfigProvider 的 size / rtl；Maple 默认 md，支持 setPropsDefaults、显式 size 与 DOM dir。未激活面板被隐藏，InfiniteScroll 会随面板可见性工作。

公开类型包括 TabsEmits、TabsSlots、TabPaneSlots、TabsNavsSlots、TabNavSlots、TabsItemsSlots、TabItemSlots、TabsNavsExpose。自有实例方法仅 TabsNavs.resize()；其余成员没有自有命令式方法或通知事件，选择及编辑事件归属 Tabs。
### 配置说明

相同 token 后缀在两端意义一致，只有默认值不同。[完整跨端对比与设计依据](./comparison.md)。

## CSS Variables

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-tabs-active-font-weight` | `var(--mp-sys-font-weight-semibold)` | `font-weight` |
| `--mp-tabs-active-shadow` | `none` | `box-shadow` |
| `--mp-tabs-animation-duration` | `var(--mp-sys-motion-duration-standard)` | `animation` |
| `--mp-tabs-background` | `var(--mp-sys-color-surface-default)` | `background` |
| `--mp-tabs-border-color` | `var(--mp-sys-color-border-default)` | `background`, `border-color` |
| `--mp-tabs-border-width` | `1px` | `border`, `bottom`, `height` |
| `--mp-tabs-capsule-radius` | `12px` | `border-radius` |
| `--mp-tabs-content-padding` | `var(--mp-sys-space-5)` | `padding-block`, `padding-inline-start` |
| `--mp-tabs-control-height` | `var(--mp-sys-control-height-xs)` | `min-height`, `min-width` |
| `--mp-tabs-focus-offset` | `-3px` | `outline-offset` |
| `--mp-tabs-focus-width` | `2px` | `outline` |
| `--mp-tabs-group-padding` | `var(--mp-sys-space-2)` | `padding` |
| `--mp-tabs-header-padding` | `var(--mp-sys-space-4)` | `padding-inline` |
| `--mp-tabs-hover-background` | `var(--mp-sys-color-state-hover)` | `background` |
| `--mp-tabs-icon-gap` | `var(--mp-sys-space-3)` | `gap` |
| `--mp-tabs-indicator-radius` | `1px` | `border-radius` |
| `--mp-tabs-indicator-size` | `2px` | `height`, `width` |
| `--mp-tabs-muted-background` | `var(--mp-sys-color-surface-muted)` | `background` |
| `--mp-tabs-nav-gap` | `var(--mp-sys-space-2)` | `gap` |
| `--mp-tabs-radius` | `var(--mp-sys-radius-md)` | `border-radius` |
| `--mp-tabs-size-lg-tab-font-size` | `var(--mp-sys-font-size-lg)` | `font-size` |
| `--mp-tabs-size-lg-tab-height` | `var(--mp-sys-control-height-lg)` | `min-height` |
| `--mp-tabs-size-lg-tab-padding` | `10px var(--mp-sys-space-7)` | `padding` |
| `--mp-tabs-size-md-tab-font-size` | `var(--mp-sys-font-size-md)` | `font-size` |
| `--mp-tabs-size-md-tab-height` | `var(--mp-sys-control-height-md)` | `min-height` |
| `--mp-tabs-size-md-tab-padding` | `var(--mp-sys-space-4) var(--mp-sys-space-6)` | `padding` |
| `--mp-tabs-size-sm-tab-font-size` | `var(--mp-sys-font-size-sm)` | `font-size` |
| `--mp-tabs-size-sm-tab-height` | `var(--mp-sys-control-height-sm)` | `min-height` |
| `--mp-tabs-size-sm-tab-padding` | `var(--mp-sys-space-3) var(--mp-sys-space-5)` | `padding` |
| `--mp-tabs-size-xl-tab-font-size` | `var(--mp-sys-font-size-xl)` | `font-size` |
| `--mp-tabs-size-xl-tab-height` | `var(--mp-sys-control-height-xl)` | `min-height` |
| `--mp-tabs-size-xl-tab-padding` | `var(--mp-sys-space-5) var(--mp-sys-space-8)` | `padding` |
| `--mp-tabs-size-xs-tab-font-size` | `var(--mp-sys-font-size-xs)` | `font-size` |
| `--mp-tabs-size-xs-tab-height` | `var(--mp-sys-control-height-xs)` | `min-height` |
| `--mp-tabs-size-xs-tab-padding` | `var(--mp-sys-space-2) var(--mp-sys-space-4)` | `padding` |
| `--mp-tabs-tab-gap` | `var(--mp-sys-space-2)` | `gap` |
| `--mp-tabs-title-text-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-tabs-title-text-color-active` | `var(--mp-sys-color-content-brand)` | `background`, `color`, `outline` |
| `--mp-tabs-title-text-color-disabled` | `var(--mp-sys-color-content-disabled)` | `color` |
| `--mp-tabs-touch-target` | `var(--mp-sys-control-touch-target)` | `min-height`, `min-width` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-tabs-background: var(--mp-sys-color-surface-default);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
