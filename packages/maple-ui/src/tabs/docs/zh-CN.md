# Tabs 标签页

导航与内容使用同一套 API，PC 和移动端通过主题变量保留视觉密度差异。

## 案例

### 最简单用法

最简单的写法只需要在 `Tabs` 中声明带 `title` 的 `TabPane`，导航与内容会自动生成。

```demo
../example/demos/basic.vue
```

### 仅导航

只需要标签导航时，无需编写内容组件；直接在 `TabsNavs` 中声明 `TabNav` 即可。

```demo
../example/demos/nav-content.vue
```

### 样式变体

`variant` 控制导航外观；卡片和胶囊样式也使用相同的标签与内容结构。

```demo
../example/demos/variants.vue
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

### 图标与导航插槽

TabNav 支持图标与纵向排列；TabsNavs 支持前后附加内容。

```demo
../example/demos/icons-and-slots.vue
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
| `--mp-tabs-background` | `var(--mp-color-bg-2)` |
| `--mp-tabs-title-text-color` | `var(--mp-color-text-2)` |
| `--mp-tabs-title-text-color-active` | `var(--mp-color-primary)` |
| `--mp-tabs-title-text-color-disabled` | `var(--mp-color-text-disabled)` |
| `--mp-tabs-muted-background` | `var(--mp-color-fill-2)` |
| `--mp-tabs-border-color` | `var(--mp-color-border-1)` |
| `--mp-tabs-hover-background` | `var(--mp-color-fill-2)` |
| `--mp-tabs-nav-gap` | `4px` |
| `--mp-tabs-tab-gap` | `4px` |
| `--mp-tabs-header-padding` | `8px` |
| `--mp-tabs-control-height` | `44px` |
| `--mp-tabs-touch-target` | `44px` |
| `--mp-tabs-border-width` | `1px` |
| `--mp-tabs-focus-width` | `2px` |
| `--mp-tabs-focus-offset` | `-3px` |
| `--mp-tabs-radius` | `4px` |
| `--mp-tabs-icon-gap` | `6px` |
| `--mp-tabs-content-padding` | `12px` |
| `--mp-tabs-indicator-size` | `2px` |
| `--mp-tabs-indicator-radius` | `1px` |
| `--mp-tabs-animation-duration` | `180ms` |
| `--mp-tabs-active-font-weight` | `600` |
| `--mp-tabs-group-padding` | `4px` |
| `--mp-tabs-capsule-radius` | `12px` |
| `--mp-tabs-active-shadow` | `none` |
| `--mp-tabs-size-xs-tab-height` | `44px` |
| `--mp-tabs-size-xs-tab-padding` | `4px 8px` |
| `--mp-tabs-size-xs-tab-font-size` | `12px` |
| `--mp-tabs-size-sm-tab-height` | `48px` |
| `--mp-tabs-size-sm-tab-padding` | `6px 12px` |
| `--mp-tabs-size-sm-tab-font-size` | `13px` |
| `--mp-tabs-size-md-tab-height` | `52px` |
| `--mp-tabs-size-md-tab-padding` | `8px 16px` |
| `--mp-tabs-size-md-tab-font-size` | `14px` |
| `--mp-tabs-size-lg-tab-height` | `56px` |
| `--mp-tabs-size-lg-tab-padding` | `10px 20px` |
| `--mp-tabs-size-lg-tab-font-size` | `16px` |
| `--mp-tabs-size-xl-tab-height` | `60px` |
| `--mp-tabs-size-xl-tab-padding` | `12px 24px` |
| `--mp-tabs-size-xl-tab-font-size` | `18px` |
