# Tabs 标签页

导航与内容使用同一套 API，PC 和移动端通过主题变量保留视觉密度差异。

## 案例

### 最简单用法

最简单的写法只需要在 `Tabs` 中声明带 `title` 的 `TabPane`，导航与内容会自动生成。

```demo
../example/demos/basic.vue
```

### 样式变体

`variant` 控制导航外观；卡片和胶囊样式也使用相同的标签与内容结构。

```demo
../example/demos/variants.vue
```

### 仅导航

只需要标签导航时，无需编写内容组件；直接在 `TabsNavs` 中声明 `TabNav` 即可。

```demo
../example/demos/nav-content.vue
```

导航属性与状态组合：

```demo
../example/demos/navs-review.vue
```

### 横向滚动与手势切换

标签较多时导航可横向滚动：移动端直接拖动导航，PC 使用鼠标滚轮或触控板。开启 `swipeable` 后，还能在内容区域左右滑动切换；滑动会跳过禁用项。

```demo
../example/demos/scrollable.vue
```

### 方向与指示器位置

通过选项切换横向、纵向布局和指示器所在方向；还可以交换 `TabsNavs` 与 `TabsItems` 的声明顺序，将导航放在内容的另一侧。

```demo
../example/demos/position.vue
```

### 动态增删标签

编辑模式支持增加和关闭标签，数据仍由使用者维护。

```demo
../example/demos/editable.vue
```

### 受控切换

使用 `v-model:active` 时，父组件可以通过按钮切换当前页，也能读取用户点选后的值。

```demo
../example/demos/controlled.vue
```

### 按需挂载内容

`lazy-load` 在首次打开面板时才挂载内容；`destroy-on-hide` 在离开面板时卸载内容，适合无需保留内部状态的页面。

```demo
../example/demos/lazy-load.vue
```

### 外观组合

适用于同级内容之间的切换。调整变体、尺寸，用相同数据观察变化。内容保持一致，便于比较不同设置的实际效果。

```demo
../example/demos/appearance-lab.vue
```

### 图标与导航插槽

TabNav 支持图标与纵向排列；TabsNavs 支持前后附加内容。

```demo
../example/demos/icons-and-slots.vue
```

<!-- api-review:start -->
### 功能调试

```demo
../example/demos/api-review.vue
```

<!-- api-review:end -->

## API

### Tabs Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| active | `string / number` | `undefined` | 当前选中 key；提供时受控 |
| default-active | `string / number` | `undefined` | 非受控初值，省略选首个可用项 |
| variant | `line / card / outline / plain / capsule / enclosed` | `line` | 视觉变体 |
| size | `xs / sm / md / lg / xl` | `全局值或 md` | 尺寸 |
| orientation | `horizontal / vertical` | `horizontal` | 导航方向 |
| indicator-position | `normal / reverse` | `normal` | 指示器在内容侧或相反侧 |
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
| scroll-position | `start / end / center / auto / number` | `auto` | 选中标签滚动位置，数字为起点偏移 |
| scroll-buttons | `boolean / auto` | `auto` | 溢出时显示箭头，auto 在触摸设备隐藏 |
| activation-mode | `automatic / manual` | `automatic` | 方向键是否立即选中 |
| swipeable | `boolean` | `false` | 内容横向触摸切换；不循环 |

### Tabs Events

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| update:active | key: string / number | 请求更新选中值 |
| change | key: string / number | 选择不同可用项时通知；受控模式仍由父级更新 active |
| tab-click | key, event: Event | 点击可用项，重复点击仍触发；hover/方向键/滑动不触发 |
| add | event: Event | 请求增加标签；由使用者修改数据 |
| delete | key, event: Event | 请求删除标签；由使用者修改数据 |

### TabPane Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| title | string | undefined | 导航标题 |
| disabled | boolean | false | 禁止选择和关闭 |
| closable | boolean | true | editable 模式显示关闭按钮 |
| item-vertical | boolean | false | 图标文字垂直布局 |
| lazy-load | boolean | undefined | 继承 Tabs，显式 false 可覆盖 |
| destroy-on-hide | boolean | undefined | 继承 Tabs，显式 false 可覆盖 |

### TabNav Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| title | string | undefined | 标题 |
| disabled | boolean | false | 禁止选择和关闭 |
| closable | boolean | true | editable 模式显示关闭按钮 |
| item-vertical | boolean | false | 图标文字垂直布局 |

TabNav 与 TabItem 使用同一个 Vue `key`，必须为字符串或数字，在同组内唯一。不要省略 key；不要混用 `1` 与 `'1'`。

### TabItem Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| lazy-load | boolean | undefined | 继承 Tabs，显式 false 可覆盖 |
| destroy-on-hide | boolean | undefined | 继承 Tabs，显式 false 可覆盖 |

未激活的 panel 始终带 hidden，内部状态是否保留由上述属性决定。destroy-on-hide 优先于 lazy-load；active 内容始终挂载。TabsNavs 和 TabsItems 没有业务 Props。

### Slots

| 组件 | 插槽 | 说明 |
| --- | --- | --- |
| Tabs | default | TabPane 列表；或高级组合所需的 TabsNavs 与 TabsItems |
| TabPane | default / title | 面板内容 / 自定义导航标题 |
| TabsNavs | default | TabNav 列表 |
| TabsNavs | prefix / suffix / add-icon | 导航前后附加区、新增图标 |
| TabNav | title / default / icon | title 插槽或默认插槽为自定义标题；icon 为图标 |
| TabsItems | default | TabItem 列表 |
| TabItem | default | 面板内容 |

### Expose

`TabsNavs.resize(): void` 重新测量溢出并将选中标签滚入可见区域。尺寸变化有 ResizeObserver 自动监听。

### 键盘与方向

方向键跳过禁用项并循环；Home/End 到首尾；可编辑标签按 Delete 请求关闭。horizontal 使用左右键，vertical 使用上下键。manual 模式只移动焦点，Enter/Space 通过原生 button 激活。使用 `dir="rtl"` 支持从右向左布局。TabsNavs 可传 `aria-label` 为导航命名。

### 类型

导出 TabsKey、TabsVariant、TabsTrigger、TabsIndicatorPosition、TabsScrollPosition、TabsActivationMode，以及六组件对应的 Props / Instance / 运行时 props / `_XxxComponent`。同一 props 定义用于两端。

## 自定义内部样式

```demo
../example/demos/custom-style.vue
```

六个样式属性统一配置在 Tabs 上，对所有对应项生效。自定义类名与内置类名合并；内联样式可覆盖默认间距。`item-wrapper-*` 对应 role="tabpanel" 外层，`item-*` 对应实际内容内层，`tab-*` 对应导航标签外层。

内容间距使用 `item-style`，导航整体间距可通过 TabsNavs 的 `style` 或 CSS token 调整。

## 样式变量

相同 token 后缀在两端意义一致，只有默认值不同。[完整跨端对比与设计依据](./comparison.md)。

| 变量 | 默认值 |
| --- | --- |
| `--mp-tabs-background` | `var(--mp-sys-color-surface-default)` |
| `--mp-tabs-title-text-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-tabs-title-text-color-active` | `var(--mp-sys-color-content-brand)` |
| `--mp-tabs-title-text-color-disabled` | `var(--mp-sys-color-content-disabled)` |
| `--mp-tabs-muted-background` | `var(--mp-sys-color-surface-muted)` |
| `--mp-tabs-border-color` | `var(--mp-sys-color-border-default)` |
| `--mp-tabs-hover-background` | `var(--mp-sys-color-state-hover)` |
| `--mp-tabs-nav-gap` | `var(--mp-sys-space-2)` |
| `--mp-tabs-tab-gap` | `var(--mp-sys-space-2)` |
| `--mp-tabs-header-padding` | `var(--mp-sys-space-4)` |
| `--mp-tabs-control-height` | `var(--mp-sys-control-height-xs)` |
| `--mp-tabs-touch-target` | `var(--mp-sys-control-touch-target)` |
| `--mp-tabs-border-width` | `1px` |
| `--mp-tabs-focus-width` | `2px` |
| `--mp-tabs-focus-offset` | `-3px` |
| `--mp-tabs-radius` | `var(--mp-sys-radius-md)` |
| `--mp-tabs-icon-gap` | `var(--mp-sys-space-3)` |
| `--mp-tabs-content-padding` | `var(--mp-sys-space-5)` |
| `--mp-tabs-indicator-size` | `2px` |
| `--mp-tabs-indicator-radius` | `1px` |
| `--mp-tabs-animation-duration` | `var(--mp-sys-motion-duration-standard)` |
| `--mp-tabs-active-font-weight` | `var(--mp-sys-font-weight-semibold)` |
| `--mp-tabs-group-padding` | `var(--mp-sys-space-2)` |
| `--mp-tabs-capsule-radius` | `12px` |
| `--mp-tabs-active-shadow` | `none` |
| `--mp-tabs-size-xs-tab-height` | `var(--mp-sys-control-height-xs)` |
| `--mp-tabs-size-xs-tab-padding` | `var(--mp-sys-space-2) var(--mp-sys-space-4)` |
| `--mp-tabs-size-xs-tab-font-size` | `var(--mp-sys-font-size-xs)` |
| `--mp-tabs-size-sm-tab-height` | `var(--mp-sys-control-height-sm)` |
| `--mp-tabs-size-sm-tab-padding` | `var(--mp-sys-space-3) var(--mp-sys-space-5)` |
| `--mp-tabs-size-sm-tab-font-size` | `var(--mp-sys-font-size-sm)` |
| `--mp-tabs-size-md-tab-height` | `var(--mp-sys-control-height-md)` |
| `--mp-tabs-size-md-tab-padding` | `var(--mp-sys-space-4) var(--mp-sys-space-6)` |
| `--mp-tabs-size-md-tab-font-size` | `var(--mp-sys-font-size-md)` |
| `--mp-tabs-size-lg-tab-height` | `var(--mp-sys-control-height-lg)` |
| `--mp-tabs-size-lg-tab-padding` | `10px var(--mp-sys-space-7)` |
| `--mp-tabs-size-lg-tab-font-size` | `var(--mp-sys-font-size-lg)` |
| `--mp-tabs-size-xl-tab-height` | `var(--mp-sys-control-height-xl)` |
| `--mp-tabs-size-xl-tab-padding` | `var(--mp-sys-space-5) var(--mp-sys-space-8)` |
| `--mp-tabs-size-xl-tab-font-size` | `var(--mp-sys-font-size-xl)` |

## 独立同源与公开类型

两端独立维护 Tabs、TabPane、TabsNavs、TabNav、TabsItems、TabItem 六件套，不跨库引用运行时，也不使用通用平台配置。size 的 xs/sm/md/lg/xl 五档均已实现。Cedar 继承 ConfigProvider 的 size/rtl；Maple 默认 md，支持 setPropsDefaults、显式 size 与 DOM dir。面板通过原生 hidden 显隐，InfiniteScroll 直接观察可见性，不再依赖旧面板注册。

公开类型包括 TabsEmits、TabsSlots、TabPaneSlots、TabsNavsSlots、TabNavSlots、TabsItemsSlots、TabItemSlots、TabsNavsExpose。自有实例方法仅 TabsNavs.resize()；其余成员没有自有命令式方法或通知事件，选择及编辑事件归属 Tabs。
