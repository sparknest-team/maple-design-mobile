# Button

Button 的禁用配色按变体区分：彩色实心使用淡化状态背景；text/outline 保持透明背景并淡化状态文字；tonal 保留浅色背景。中性按钮使用中性禁用色。禁用时暂停 color/text-color 覆盖，关闭 hover/active 反馈和阴影。

两端使用同一份实现和示例，组件前缀、主题基础变量与注册入口各自保留。

## 基础示例

### 八种主题色

```demo
../example/demos/basic.vue
```

## 外观与状态

### 变体、状态与尺寸

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `variant` | 外观；省略时继承按钮组，否则 default | 变体、状态与尺寸、自定义颜色 |
| `size` | 尺寸；省略时继承按钮组，否则 md | 变体、状态与尺寸、五档尺寸 |
| `status` | 主题色；省略时继承按钮组，否则 default | 变体、状态与尺寸 |
| `disabled` | 禁用；省略时继承按钮组，显式 false 可覆盖 | 禁用与链接拦截 |
| `component` | 根标签，链接属性通过 attrs 传入 | 禁用与链接拦截 |
| `loading` | 加载状态，禁止点击和链接跳转 | 禁用与链接拦截 |
<!-- demo-config-notes:end -->

选择变体和尺寸，同时对比八种状态色。实心适合主要操作，text 和 outline 适合次要操作；可切换卡片背景，对照透明按钮在不同背景上的表现。 变体、尺寸和背景选项较少，使用按钮式 RadioGroup 直接展示；Form/FormItem 提供标准字段布局，Card 承载背景对照。

```demo
../example/demos/variants.vue
```

### 五档尺寸

同一平台的水平 Button 与 Input 默认按相同 size 对齐高度和字号。Cedar 高度为 24/28/32/36/44px，Maple 为 32/40/48/56/64px；按钮单侧内边距为 8/12/16/20/24px，图标与文字间距为 6px。堆叠按钮使用独立的内容高度规则。组件局部样式覆盖仍各自生效。

```demo
../example/demos/size.vue
```

### 禁用与链接拦截

```demo
../example/demos/disabled.vue
```

### 自定义颜色

```demo
../example/demos/custom-color.vue
```

## 图标与布局

### 图标与图文布局

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `status` | 主题色；省略时继承按钮组，否则 default | 图标与图文布局 |
| `variant` | 外观；省略时继承按钮组，否则 default | 图标与图文布局 |
| `size` | 尺寸；省略时继承按钮组，否则 md | 图标与图文布局 |
| `stacked` | 图标文字纵向排列；省略时继承按钮组 | 图标与图文布局 |
| `round` | 圆形按钮 | 图标与图文布局 |
| `block` | 占满可用宽度 | 块级按钮 |
<!-- demo-config-notes:end -->

使用内置图标，切换四种变体和五档尺寸，对比纯图标、横排图文、上下堆叠。堆叠按钮按内容撑高，上下至少保留 8px 内边距。纯图标只传 icon 插槽；round 控制圆形，stacked 控制上下排列。

```demo
../example/demos/icons.vue
```

### 块级按钮

```demo
../example/demos/block.vue
```

## 按钮组

### 按钮组继承与覆盖

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `status` | 主题色；省略时继承按钮组，否则 default | 按钮组继承与覆盖 |
| `disabled` | 禁用；省略时继承按钮组，显式 false 可覆盖 | 按钮组继承与覆盖 |
| `loading` | 加载状态，禁止点击和链接跳转 | 按钮组图文与加载 |
<!-- demo-config-notes:end -->

切换组尺寸和禁用状态，观察子按钮继承配置。子按钮可独立覆盖状态色，显式 disabled=false 可覆盖组禁用。

```demo
../example/demos/button-group.vue
```

### 按钮组布局

切换 Mixed variants，让中间操作使用 text 外观，对照横向与纵向的接缝。

在水平和垂直排列中比较变体和尺寸。尺寸、变体与排列方向共同组成三个外观维度。

```demo
../example/demos/button-group-layout.vue
```

### 按钮组图文与加载

切换图文堆叠和排列方向，再启用第一个按钮的加载状态；其他操作仍可独立使用。竖向按钮组的横排图文按起始边对齐，避免文字长度不同导致图标错位。

```demo
../example/demos/button-group-content.vue
```

## 表单与事件

### 表单控件尺寸对照

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `size` | 尺寸；省略时继承按钮组，否则 md | 表单控件尺寸对照 |
| `variant` | 外观；省略时继承按钮组，否则 default | 表单控件尺寸对照 |
| `html-type` | 原生按钮类型 | 原生表单、焦点与触摸事件 |
| `focusable` | 允许 Tab 顺序聚焦；不影响通过代码聚焦 | 原生表单、焦点与触摸事件 |
<!-- demo-config-notes:end -->

切换五档 size 和三种字段变体，比较 Input、Button、Select、日期时间及其他单行表单控件的高度。Button 在这里固定使用 outline。DatePicker/TimePicker 是面板，此处使用带输入框的 Date/Time 字段。示例同时展示有值、可清空、标签删除与长标签多选；Select/Cascader 设置 tag-nowrap 时保持同档高度，长标签文字省略、删除图标保留；标签行可横向滚动，清空按钮和箭头固定在外侧。被省略的标签正文支持悬停、键盘聚焦或点按查看完整文字，点外部或按 Esc 关闭，不改变选中值。可清空后恢复选中值重复比较。多行文本和允许换行的多选内容按内容撑高。

```demo
../../field-decorator/example/demos/control-sizes.vue
```

### 原生表单、焦点与触摸事件

```demo
../example/demos/native-events.vue
```

## 加载与操作反馈

### 加载动画、布局与尺寸

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `loading` | 加载状态，禁止点击和链接跳转 | 加载动画、布局与尺寸、加载指示器样式 |
| `loading-size` | 指示器尺寸；xs/sm/md/lg/xl 对应 12/14/16/18/20px，数字为 px；省略时跟随按钮尺寸，line 模式不适用 | 加载动画、布局与尺寸、加载指示器样式 |
| `loading-type` | 加载动画；与 Loading 的 type 相同，line 模式不适用 | 加载动画、布局与尺寸 |
| `loading-mode` | 行内、覆盖或底部进度线；line 只使用 loading-color | 加载动画、布局与尺寸 |
| `loading-color` | 加载指示器颜色 | 加载指示器样式 |
| `ripple` | 点击水波 | 水波与阴影反馈 |
<!-- demo-config-notes:end -->

选择加载布局和指示器尺寸，对比五种动画。点击选择框箭头展开菜单，选择选项后收起。加载时按钮保留文案并阻止重复操作。

```demo
../example/demos/loading.vue
```

### 加载指示器样式

```demo
../example/demos/loading-appearance.vue
```

### 水波与阴影反馈

点击按钮观察水波，调整阴影等级比较层次感。关闭水波不会影响点击事件。

```demo
../example/demos/feedback.vue
```

### 受控加载与失败恢复

```demo
../example/demos/controlled-loading.vue
```

## 阅读方向

继承最近的 `dir="ltr|rtl"`，支持运行时切换和局部覆盖。图标与内容按阅读顺序排列，stacked 仍由上到下排列，不整体镜像插槽图形。ButtonGroup 的横向排列、拼接边框与首尾圆角由组方向决定，子按钮可以单独设置文字方向；单个按钮保留完整圆角，纵向组保持上下顺序。使用原生 Tab、Enter、Space 操作，普通按钮组不额外接管左右键；禁用和加载规则保持不变。

## API

<!-- same-source-api:start -->

### Button Props

| 属性          | 说明                                                                                             | 类型                                      | 默认值         |
| ------------- | ------------------------------------------------------------------------------------------------ | ----------------------------------------- | -------------- |
| status        | 主题色；省略时继承按钮组，否则 default                                                           | `SemanticStatus`<br>`'default' \| 'primary' \| 'secondary' \| 'tertiary' \| 'info' \| 'success' \| 'warning' \| 'danger'` | `undefined`    |
| variant       | 外观；省略时继承按钮组，否则 default                                                             | `default / text / outline / tonal`        | `undefined`    |
| size          | 尺寸；省略时继承按钮组，否则 md                                                                  | `xs / sm / md / lg / xl`                  | `undefined`    |
| html-type     | 原生按钮类型                                                                                     | `button / submit / reset`                 | `button`       |
| component     | 根标签，链接属性通过 attrs 传入                                                                  | `button / a`                              | `button`       |
| round         | 圆形按钮                                                                                         | `boolean`                                 | `false`        |
| block         | 占满可用宽度                                                                                     | `boolean`                                 | `false`        |
| loading       | 加载状态，禁止点击和链接跳转                                                                     | `boolean`                                 | `false`        |
| loading-type  | 加载动画；与 Loading 的 type 相同，line 模式不适用                                               | `circle / wave / cube / rect / disappear` | `circle`       |
| loading-mode  | 行内、覆盖或底部进度线；line 只使用 loading-color                                                | `default / fill / line`                   | `default`      |
| loading-size  | 指示器尺寸；xs/sm/md/lg/xl 对应 12/14/16/18/20px，数字为 px；省略时跟随按钮尺寸，line 模式不适用 | `ComponentSize / number`<br>`ComponentSize: 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `undefined`    |
| loading-color | 加载指示器颜色                                                                                   | `string`                                  | `currentColor` |
| disabled      | 禁用；省略时继承按钮组，显式 false 可覆盖                                                        | `boolean`                                 | `undefined`    |
| ripple        | 点击水波                                                                                         | `boolean`                                 | `true`         |
| focusable     | 允许 Tab 顺序聚焦；不影响通过代码聚焦                                                            | `boolean`                                 | `true`         |
| autofocus     | 原生自动聚焦                                                                                     | `boolean`                                 | `false`        |
| text-color    | 自定义文字色                                                                                     | `string`                                  | `undefined`    |
| color         | 自定义背景／变体基色                                                                             | `string`                                  | `undefined`    |
| elevation     | default 变体阴影；true 为 2，false 关闭，数字四舍五入并限制 0～24；组内由组控制                  | `boolean / number`                        | `true`         |
| stacked       | 图标文字纵向排列；省略时继承按钮组                                                               | `boolean`                                 | `undefined`    |

### Button Events

| 事件       | 参数与行为                                  |
| ---------- | ------------------------------------------- |
| click      | `(event: MouseEvent) => void` |

`click` 为普通通知事件，组件不处理监听器返回值，也不会自动切换加载状态。`loading` 由业务控制，异步操作建议在 `finally` 中恢复。禁用或加载中的链接会移除有效 `href`。

### Button Slots

| 插槽    | 说明                             | 参数 |
| ------- | -------------------------------- | ---- |
| default | 按钮内容；加载时保留             | —    |
| icon    | 前置图标；stacked 时位于文字上方 | —    |

### Button Methods

无自定义公开方法。
<!-- same-source-api:end -->

### ButtonGroup Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| status | 子按钮默认语义状态；子按钮可覆盖 | `SemanticStatus`<br>`'default' \| 'primary' \| 'secondary' \| 'tertiary' \| 'info' \| 'success' \| 'warning' \| 'danger'` | default |
| size | 子按钮默认尺寸；子按钮可覆盖 | xs / sm / md / lg / xl | undefined |
| variant | 子按钮默认外观；相邻按钮按生效变体拼接，允许混合 | default / text / outline / tonal | default |
| color | 子按钮默认自定义色；子按钮可覆盖 | string | undefined |
| text-color | 子按钮默认文字色；子按钮可覆盖 | string | undefined |
| disabled | 子按钮默认禁用状态；显式 false 可覆盖组 true | boolean | false |
| stacked | 默认图文纵排；子按钮可显式 false 覆盖 | boolean | false |
| vertical | 按钮组纵向排列，独立于按钮内部 stacked | boolean | false |
| elevation | 组整体阴影；true 为 2，数值归一化到 0–24；仅 default 变体且组未禁用时生效 | boolean / number | true |

根元素默认 `role="group"`；使用 `aria-label` 或 `aria-labelledby` 为需要命名的操作组提供名称。原生属性可覆盖 role，普通按钮组仍使用 Tab / Enter / Space，不自动接管方向键。

**继承边界：** status、size、variant、color、text-color、disabled、stacked 按子按钮显式值优先。elevation 始终由组管理，子按钮自己的 elevation 不生效。嵌套组使用最近组的配置和默认值，不自动叠加外层禁用。

### ButtonGroup Events

无自定义事件。`@click` 是根元素的原生事件透传，可以接收后代冒泡；各操作继续监听对应 Button 的 click。组不收集事件 Promise，也不管理任务或选中值。

### ButtonGroup Slots

| 插槽 | 说明 | 参数 |
| --- | --- | --- |
| default | 连体样式支持组根元素下直接相邻的 Button DOM 节点 | — |

**组合边界：** 额外的 DOM 包装层、前后文本和其他控件不属于连体外观契约。包装层内的按钮仍可能继承配置，但不会获得相同拼接效果。组接管首尾圆角，不保留独立 round 按钮的圆形外观。需要分离排列或任意内容混排时组合 Space；较窄区域由业务选择滚动、缩短文案或切换纵向，不自动换行。

### ButtonGroup Methods

| 名称 | 说明 |
| --- | --- |
| buttonGroupProvider | 响应式组配置对象，各字段为只读 ComputedRef；elevation 为 boolean / number，其余字段与 Props 对齐 |

无额外的组级动作方法。

## Types

ButtonProps、ButtonVariant、ButtonLoadingMode、ButtonInstance、ButtonGroupProps、ButtonGroupInstance。

## CSS Variables

Button 保留 58 个外观变量。`{status}-color` 控制实心背景，`{status}-foreground-color` 控制 text/outline/tonal 的文字和图标，`{status}-tonal-color` 控制浅色背景。语义状态共用 `solid-text-color` 和 `solid-state-layer-color`；default/tertiary 前景与 primary/tertiary 状态层保留必要的主题差异。

尺寸统一使用 xs/sm/md/lg/xl。字号、过渡时长、焦点宽度与偏移、堆叠高度增量直接复用系统变量；按钮组与堆叠圆角共用 border-radius。四个状态透明度变量保留 hover/active 的差异。loading-duration 仅控制底部进度线；其他加载动画由 Loading 负责。内部变量与固定动画几何细节不再作为公共定制项。

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-button-border-radius` | `var(--mp-sys-radius-md)` | `border-bottom-left-radius`, `border-bottom-right-radius`, `border-radius`, `border-top-left-radius`, `border-top-right-radius` |
| `--mp-button-content-gap` | `var(--mp-sys-space-3)` | `gap` |
| `--mp-button-danger-color` | `var(--mp-sys-color-status-danger)` | `background-color` |
| `--mp-button-danger-disabled-color` | `rgb(var(--mp-danger-3))`<br>`rgba(var(--mp-danger-6), 0.5)` (`:root[maple-theme='dark']`) | `background-color`, `color` |
| `--mp-button-danger-foreground-color` | `var(--mp-sys-color-content-danger)` | `color` |
| `--mp-button-danger-tonal-color` | `rgb(var(--mp-danger-1))` | `background-color` |
| `--mp-button-default-color` | `var(--mp-sys-color-surface-default)` | `background-color` |
| `--mp-button-default-foreground-color` | `var(--mp-sys-color-content-primary)` | `background`, `background-color`, `color` |
| `--mp-button-default-tonal-color` | `var(--mp-sys-color-surface-muted)` | `background-color` |
| `--mp-button-disabled-color` | `var(--mp-color-fill-2)` | `background-color` |
| `--mp-button-disabled-solid-text-color` | `var(--mp-sys-color-content-on-dark)`<br>`rgba(255, 255, 255, 0.3)` (`:root[maple-theme='dark']`) | `color` |
| `--mp-button-disabled-text-color` | `var(--mp-sys-color-content-disabled)` | `color` |
| `--mp-button-focus-color` | `var(--mp-sys-color-action-primary)` | `outline` |
| `--mp-button-info-color` | `var(--mp-sys-color-status-info)` | `background-color` |
| `--mp-button-info-disabled-color` | `rgb(var(--mp-blue-3))`<br>`rgba(var(--mp-blue-6), 0.5)` (`:root[maple-theme='dark']`) | `background-color`, `color` |
| `--mp-button-info-foreground-color` | `var(--mp-sys-color-content-info)` | `color` |
| `--mp-button-info-tonal-color` | `rgb(var(--mp-blue-1))` | `background-color` |
| `--mp-button-lg-height` | `56px` | `height`, `min-width`, `width` |
| `--mp-button-lg-padding` | `0 var(--mp-sys-space-7)` | `padding` |
| `--mp-button-loading-duration` | `1s` | `animation` |
| `--mp-button-loading-line-height` | `3px` | `height` |
| `--mp-button-md-height` | `48px` | `height`, `min-width`, `width` |
| `--mp-button-md-padding` | `0 var(--mp-sys-space-6)` | `padding` |
| `--mp-button-plain-state-opacity-active` | `1` | `opacity` |
| `--mp-button-plain-state-opacity-hover` | `0.5` | `opacity` |
| `--mp-button-primary-color` | `var(--mp-sys-color-action-primary)` | `background-color` |
| `--mp-button-primary-disabled-color` | `rgb(var(--mp-primary-3))`<br>`rgba(var(--mp-primary-6), 0.5)` (`:root[maple-theme='dark']`) | `background-color`, `color` |
| `--mp-button-primary-foreground-color` | `var(--mp-sys-color-content-brand)` | `color` |
| `--mp-button-primary-state-layer-color` | `var(--mp-button-solid-state-layer-color)` | `background-color` |
| `--mp-button-primary-tonal-color` | `rgb(var(--mp-primary-1))` | `background-color` |
| `--mp-button-secondary-color` | `rgb(var(--mp-gray-6))` | `background-color` |
| `--mp-button-secondary-foreground-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-button-secondary-tonal-color` | `rgb(var(--mp-gray-2))` | `background-color` |
| `--mp-button-sm-height` | `40px` | `height`, `min-width`, `width` |
| `--mp-button-sm-padding` | `0 var(--mp-sys-space-5)` | `padding` |
| `--mp-button-solid-state-layer-color` | `var(--mp-sys-color-content-on-dark)` | `background-color` |
| `--mp-button-solid-text-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-button-stacked-gap` | `var(--mp-sys-space-2)` | `gap`, `min-height`, `min-width` |
| `--mp-button-state-layer-color` | `var(--mp-sys-color-surface-page)` | `background-color` |
| `--mp-button-state-opacity-active` | `0.12` | `opacity` |
| `--mp-button-state-opacity-hover` | `0.08` | `opacity` |
| `--mp-button-success-color` | `var(--mp-sys-color-status-success)` | `background-color` |
| `--mp-button-success-disabled-color` | `rgb(var(--mp-success-3))`<br>`rgba(var(--mp-success-6), 0.5)` (`:root[maple-theme='dark']`) | `background-color`, `color` |
| `--mp-button-success-foreground-color` | `var(--mp-sys-color-content-success)` | `color` |
| `--mp-button-success-tonal-color` | `rgb(var(--mp-success-1))` | `background-color` |
| `--mp-button-tertiary-color` | `rgb(var(--mp-gray-7))` | `background-color` |
| `--mp-button-tertiary-foreground-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-button-tertiary-state-layer-color` | `var(--mp-sys-color-content-on-bright)`<br>`var(--mp-sys-color-content-on-dark)` (`:root[maple-theme='dark']`) | `background-color` |
| `--mp-button-tertiary-text-color` | `var(--mp-sys-color-content-on-dark)`<br>`var(--mp-sys-color-content-on-bright)` (`:root[maple-theme='dark']`) | `color` |
| `--mp-button-tertiary-tonal-color` | `rgb(var(--mp-gray-1))` | `background-color` |
| `--mp-button-warning-color` | `var(--mp-sys-color-status-warning)` | `background-color` |
| `--mp-button-warning-disabled-color` | `rgb(var(--mp-warning-3))`<br>`rgba(var(--mp-warning-6), 0.5)` (`:root[maple-theme='dark']`) | `background-color`, `color` |
| `--mp-button-warning-foreground-color` | `var(--mp-sys-color-content-warning)` | `color` |
| `--mp-button-warning-tonal-color` | `rgb(var(--mp-warning-1))` | `background-color` |
| `--mp-button-xl-height` | `64px` | `height`, `min-width`, `width` |
| `--mp-button-xl-padding` | `0 var(--mp-sys-space-8)` | `padding` |
| `--mp-button-xs-height` | `32px` | `height`, `min-width`, `width` |
| `--mp-button-xs-padding` | `0 var(--mp-sys-space-4)` | `padding` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-button-border-radius: var(--mp-sys-radius-md);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
