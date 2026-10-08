# Button

两端使用同一份实现和示例，组件前缀、主题基础变量与注册入口各自保留。

## 案例

### 八种主题色

```demo
../example/demos/basic.vue
```

### 四种变体

```demo
../example/demos/variants.vue
```

### 五档尺寸

```demo
../example/demos/size.vue
```

### 禁用与链接拦截

```demo
../example/demos/disabled.vue
```

### 加载布局与动画

```demo
../example/demos/loading.vue
```

### 同步、异步与失败恢复

```demo
../example/demos/auto-loading.vue
```

### 块级按钮

```demo
../example/demos/block.vue
```

### 颜色、水波与阴影

```demo
../example/demos/custom-color.vue
```

### 图标插槽与圆形按钮

```demo
../example/demos/round.vue
```

### 图标文字堆叠

```demo
../example/demos/stacked.vue
```

### 按钮组继承与覆盖

```demo
../example/demos/button-group.vue
```

### 原生表单、焦点与触摸事件

```demo
../example/demos/native-events.vue
```

## API

<!-- same-source-api:start -->
### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| status | 主题色；省略时继承按钮组，否则 default | `SemanticStatus` | `undefined` |
| variant | 外观；省略时继承按钮组，否则 default | `default / text / outline / tonal` | `undefined` |
| size | 尺寸；省略时继承按钮组，否则 md | `xs / sm / md / lg / xl` | `undefined` |
| html-type | 原生按钮类型 | `button / submit / reset` | `button` |
| component | 根标签，链接属性通过 attrs 传入 | `button / a` | `button` |
| round | 圆形按钮 | `boolean` | `false` |
| block | 占满可用宽度 | `boolean` | `false` |
| loading | 加载状态，禁止点击和链接跳转 | `boolean` | `false` |
| loading-type | 加载动画；与 Loading 的 type 相同 | `circle / wave / cube / rect / disappear` | `circle` |
| loading-mode | 行内、覆盖或底部进度线 | `default / fill / line` | `default` |
| loading-size | 加载动画尺寸；省略时使用按钮尺寸，行内图标替换使用 xs | `ComponentSize / number` | `undefined` |
| loading-color | 加载指示器颜色 | `string` | `currentColor` |
| loading-radius | circle 动画半径 | `string / number` | `undefined` |
| auto-loading | 等待 click/touchstart 返回的 Promise；同步回调不闪 loading | `boolean` | `false` |
| icon-container | 图标容器外观 | `boolean` | `false` |
| disabled | 禁用；省略时继承按钮组，显式 false 可覆盖 | `boolean` | `undefined` |
| ripple | 点击水波 | `boolean` | `true` |
| focusable | 允许 Tab 顺序聚焦；不影响通过代码聚焦 | `boolean` | `true` |
| autofocus | 原生自动聚焦 | `boolean` | `false` |
| text-color | 自定义文字色 | `string` | `undefined` |
| color | 自定义背景／变体基色 | `string` | `undefined` |
| elevation | default 变体阴影；true 为 2，false 关闭，数字四舍五入并限制 0～24；组内由组控制 | `boolean / number` | `true` |
| stacked | 图标文字纵向排列；省略时继承按钮组 | `boolean` | `undefined` |

### Events

| 事件 | 参数与行为 |
| --- | --- |
| click | `(event: Event) => void / Promise<unknown>` |
| touchstart | `(event: Event) => void / Promise<unknown>` |

事件处理函数可返回 Promise，也支持多个监听器。auto-loading 会等待全部监听器完成，即使某个提前拒绝也不会提前解除禁用。卸载或 KeepAlive 停用会使旧异步结果失效。内部直接读取监听器返回值，不再二次 emit。原生 focus/blur 等事件透传。禁用／加载中的 click 会阻止跳转与冒泡。

### Slots

| 插槽 | 说明 | 参数 |
| --- | --- | --- |
| default | 按钮内容；加载时保留 | — |
| icon | 前置图标；stacked 时位于文字上方 | — |

### Methods

无自定义公开方法。
<!-- same-source-api:end -->

## ButtonGroup

属性：size=md、status=default、variant=default、color/text-color=undefined、disabled/stacked/vertical=false、elevation=true。使用 default 插槽，公开 buttonGroupProvider（响应式组配置），没有自定义事件。子按钮按字段覆盖组配置；阴影由组整体控制。

## 迁移

Cedar 原 loading-type=default/fill/line 改为 loading-mode=default/fill/line；loading-type 现在选择加载动画。Maple 如需原覆盖式布局，设置 loading-mode=fill。两端 ripple、focusable 默认均为 true。样式变量采用统一 Button token 名称（--c-/--mp- 前缀），完整变量见 style/token.less。

## 类型

ButtonProps、ButtonVariant、ButtonLoadingMode、ButtonHandler、ButtonInstance、ButtonGroupProps、ButtonGroupInstance。

## CSS 变量职责与完整默认值

status-color 只负责实心背景，status-text-color 负责其对比前景；历史命名 status-icon-color 实际控制 text/outline/tonal 及 default icon-container 的可读文字和图标，status-icon-container-color 控制对应浅色表面。定制时应成对覆盖。disabled 优先于 color/text-color 属性；loading 默认继承 currentColor，显式 loading-color 优先。焦点环独立使用 content-brand。

state-opacity-hover/active（0.08/0.12）用于实心、tonal 和图标容器；plain-state-opacity-hover/active（0.5/1）用于 text/outline 的浅色反馈。status-state-layer-color 控制实心反馈色；state-layer-color 控制 tonal/图标容器反馈色。active 高于 hover，disabled/loading 禁止反馈，覆盖层不遮挡前景。internal-button-state-* 是私有变量，不支持业务定制。自定义配色、瞬时 ripple、禁用对比度不在默认对比度保证内。

下表是 :root 默认值而非主题覆盖。暗色 tertiary 的文字改为 on-bright、覆盖层改为 on-dark；Maple 品牌浅色 primary 的文字改为 on-dark、覆盖层改为 on-bright。尺寸与 loading 动效保留现有组件值，不属于本阶段统一范围。

| 变量 | :root 默认值 |
| --- | --- |
| `--mp-button-default-text-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-button-primary-text-color` | `var(--mp-sys-color-content-on-bright)` |
| `--mp-button-danger-text-color` | `var(--mp-sys-color-content-on-bright)` |
| `--mp-button-success-text-color` | `var(--mp-sys-color-content-on-bright)` |
| `--mp-button-warning-text-color` | `var(--mp-sys-color-content-on-bright)` |
| `--mp-button-info-text-color` | `var(--mp-sys-color-content-on-bright)` |
| `--mp-button-default-color` | `var(--mp-sys-color-surface-default)` |
| `--mp-button-primary-color` | `var(--mp-sys-color-action-primary)` |
| `--mp-button-danger-color` | `var(--mp-sys-color-status-danger)` |
| `--mp-button-success-color` | `var(--mp-sys-color-status-success)` |
| `--mp-button-warning-color` | `var(--mp-sys-color-status-warning)` |
| `--mp-button-info-color` | `var(--mp-sys-color-status-info)` |
| `--mp-button-secondary-color` | `rgb(var(--mp-gray-6))` |
| `--mp-button-secondary-text-color` | `var(--mp-sys-color-content-on-bright)` |
| `--mp-button-tertiary-color` | `rgb(var(--mp-gray-7))` |
| `--mp-button-tertiary-text-color` | `var(--mp-sys-color-content-on-dark)` |
| `--mp-button-default-icon-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-button-primary-icon-color` | `var(--mp-sys-color-content-brand)` |
| `--mp-button-danger-icon-color` | `var(--mp-sys-color-content-danger)` |
| `--mp-button-success-icon-color` | `var(--mp-sys-color-content-success)` |
| `--mp-button-warning-icon-color` | `var(--mp-sys-color-content-warning)` |
| `--mp-button-info-icon-color` | `var(--mp-sys-color-content-info)` |
| `--mp-button-default-icon-container-color` | `var(--mp-sys-color-surface-muted)` |
| `--mp-button-primary-icon-container-color` | `rgb(var(--mp-primary-1))` |
| `--mp-button-danger-icon-container-color` | `rgb(var(--mp-danger-1))` |
| `--mp-button-success-icon-container-color` | `rgb(var(--mp-success-1))` |
| `--mp-button-warning-icon-container-color` | `rgb(var(--mp-warning-1))` |
| `--mp-button-info-icon-container-color` | `rgb(var(--mp-blue-1))` |
| `--mp-button-disabled-color` | `var(--mp-color-disabled)` |
| `--mp-button-disabled-text-color` | `var(--mp-sys-color-content-disabled)` |
| `--mp-button-border-radius` | `var(--mp-sys-radius-md)` |
| `--mp-button-mini-padding` | `0 var(--mp-sys-space-4)` |
| `--mp-button-small-padding` | `0 var(--mp-sys-space-5)` |
| `--mp-button-normal-padding` | `0 var(--mp-sys-space-6)` |
| `--mp-button-large-padding` | `0 22px` |
| `--mp-button-xl-padding` | `0 28px` |
| `--mp-button-round-padding` | `var(--mp-sys-space-3)` |
| `--mp-button-mini-height` | `20px` |
| `--mp-button-small-height` | `28px` |
| `--mp-button-normal-height` | `36px` |
| `--mp-button-large-height` | `44px` |
| `--mp-button-xl-height` | `52px` |
| `--mp-button-mini-font-size` | `var(--mp-font-size-xs)` |
| `--mp-button-small-font-size` | `var(--mp-sys-font-size-xs)` |
| `--mp-button-normal-font-size` | `var(--mp-sys-font-size-md)` |
| `--mp-button-large-font-size` | `var(--mp-sys-font-size-lg)` |
| `--mp-button-xl-font-size` | `var(--mp-sys-font-size-xl)` |
| `--mp-button-content-gap` | `var(--mp-sys-space-3)` |
| `--mp-button-line-height` | `1.2` |
| `--mp-button-stacked-height` | `48px` |
| `--mp-button-focus-width` | `2px` |
| `--mp-button-focus-color` | `var(--mp-sys-color-content-brand)` |
| `--mp-button-focus-offset` | `2px` |
| `--mp-button-icon-container-padding` | `var(--mp-sys-space-3)` |
| `--mp-button-loading-line-height` | `3px` |
| `--mp-button-loading-line-width` | `40%` |
| `--mp-button-loading-duration` | `1s` |
| `--mp-button-loading-static-opacity` | `0.5` |
| `--mp-button-secondary-icon-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-button-secondary-icon-container-color` | `rgb(var(--mp-gray-2))` |
| `--mp-button-tertiary-icon-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-button-tertiary-icon-container-color` | `rgb(var(--mp-gray-1))` |
| `--mp-button-mini-stacked-height` | `36px` |
| `--mp-button-small-stacked-height` | `44px` |
| `--mp-button-normal-stacked-height` | `var(--mp-button-stacked-height)` |
| `--mp-button-large-stacked-height` | `56px` |
| `--mp-button-xl-stacked-height` | `64px` |
| `--mp-button-stacked-gap` | `var(--mp-sys-space-2)` |
| `--mp-button-stacked-padding` | `var(--mp-sys-space-2)` |
| `--mp-button-stacked-border-radius` | `var(--mp-sys-radius-md)` |
| `--mp-button-group-border-radius` | `var(--mp-sys-radius-md)` |
| `--mp-button-default-state-layer-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-button-primary-state-layer-color` | `var(--mp-sys-color-content-on-dark)` |
| `--mp-button-info-state-layer-color` | `var(--mp-sys-color-content-on-dark)` |
| `--mp-button-success-state-layer-color` | `var(--mp-sys-color-content-on-dark)` |
| `--mp-button-warning-state-layer-color` | `var(--mp-sys-color-content-on-dark)` |
| `--mp-button-danger-state-layer-color` | `var(--mp-sys-color-content-on-dark)` |
| `--mp-button-secondary-state-layer-color` | `var(--mp-sys-color-content-on-dark)` |
| `--mp-button-tertiary-state-layer-color` | `var(--mp-sys-color-content-on-bright)` |
| `--mp-button-state-layer-color` | `var(--mp-sys-color-surface-page)` |
| `--mp-button-state-opacity-hover` | `0.08` |
| `--mp-button-state-opacity-active` | `0.12` |
| `--mp-button-plain-state-opacity-hover` | `0.5` |
| `--mp-button-plain-state-opacity-active` | `1` |

### 动效变量

内置动效遵循 `prefers-reduced-motion: reduce`；减少动效不会阻止加载状态或关闭事件更新。

| Token | Default |
| --- | --- |
| `--mp-button-transition-duration` | `var(--mp-sys-motion-duration-standard)` |
