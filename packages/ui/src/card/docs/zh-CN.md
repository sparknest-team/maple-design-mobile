# Card

## 基础示例

### 基础用法与副标题

```demo
../example/demos/basic.vue
```

## 外观与状态

### 外观配置对比

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `title` | 标题 | 外观配置对比、悬浮样式 |
| `description` | 描述 | 外观配置对比 |
| `hoverable` | 悬浮样式 | 悬浮样式 |
<!-- demo-config-notes:end -->

选择一个对比维度后，同屏展示它的全部可选值；其余配置和内容保持一致。可切换其他配置检查组合效果；输入类预览共享一个值。

<details>
<summary>配置说明与使用限制</summary>

#### 外观组合

适用于信息分组和内容层次。调整变体、尺寸，用相同数据观察变化。内容保持一致，便于比较不同设置的实际效果。

</details>

```demo
../example/demos/appearance-lab.vue
```

### 尺寸与标题层级

切换 Card 尺寸、标题层级和页脚对齐，或调整内嵌 Section 的变体，实时查看组合效果。Card 说明文字保持 15px，Section 说明文字保持 13px。Card 尺寸会改变说明文字周围的间距。

| 尺寸 | h1 | h2 | h3 | h4 | h5 | h6 | 正文水平内边距 | 说明上方间距 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `xs` | 25px | 21px | 19px | 17px | 15px | 13px | 8px | 6px |
| `sm` | 26px | 22px | 20px | 18px | 16px | 14px | 12px | 8px |
| `md` | 30px | 26px | 24px | 22px | 20px | 18px | 16px | 20px |
| `lg` | 34px | 30px | 28px | 26px | 24px | 22px | 20px | 20px |
| `xl` | 38px | 34px | 32px | 30px | 28px | 26px | 24px | 24px |

```demo
../example/demos/sizes-and-headings.vue
```

### 悬浮样式

```demo
../example/demos/hoverable.vue
```

## 布局与排列

### 图片与三种布局

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `direction` | 封面与正文的排列顺序，默认 column；支持 row、column、row-reverse，不表示卡片自身位置 | 图片与三种布局 |
| `title` | 标题 | 图片与三种布局 |
| `image-src` | 封面图片地址；cover 插槽优先 | 图片与三种布局 |
| `image-alt` | 封面图片替代文本 | 图片与三种布局 |
| `image-fit` | 封面图片填充方式，默认 cover | 图片与三种布局 |
| `image-height` | 封面图片高度，数字单位为 px | 图片与三种布局 |
| `image-width` | 封面图片宽度，数字单位为 px | 图片与三种布局 |
<!-- demo-config-notes:end -->

```demo
../example/demos/image.vue
```

### 组合 Tabs 与嵌套卡片

开启 `swipeable` 后，在内容区左右触摸滑动可切换标签。表格区域通过 `data-tabs-no-swipe` 保留横向滚动；请在表格外滑动切换。

Maple 当前没有 TypographyTitle 组件，分组使用原生标题。

外层 Card 承载报告，Tabs 切换分析维度，内层 Section 组织各组内容。产业链面板用更深一级的 Section 标题区分上下游，宽表格在自己的容器内横向滚动。

```demo
../example/demos/nested-tabs.vue
```

## 内容与展示

### 长标题与提示

```demo
../example/demos/tooltip.vue
```

## 自定义与插槽

### 自定义标题区域

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `title` | 标题 | 自定义标题区域 |
| `top-divider` | 上分割线 | 内容插槽 |
| `bottom-divider` | 下分割线 | 内容插槽 |
<!-- demo-config-notes:end -->

```demo
../example/demos/no-padding.vue
```

### 内容插槽

```demo
../example/demos/slots.vue
```

## 交互与控制

### 水波与点击事件

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `title` | 标题 | 水波与点击事件、浮动展开与关闭 |
| `ripple` | 点击水波 | 水波与点击事件 |
| `floating` | 浮动展开状态，支持 v-model:floating | 浮动展开与关闭 |
| `floating-duration` | 浮动展开与关闭动画时长，单位 ms | 浮动展开与关闭 |
<!-- demo-config-notes:end -->

```demo
../example/demos/ripple.vue
```

### 浮动展开与关闭

```demo
../example/demos/floating.vue
```

## 生命周期与边界

### Floating scheduler lifecycle / 浮起调度生命周期

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `floating` | 浮动展开状态，支持 v-model:floating | Floating scheduler lifecycle / 浮起调度生命周期 |
| `ripple` | 点击水波 | Floating scheduler lifecycle / 浮起调度生命周期 |
| `floating-duration` | 浮动展开与关闭动画时长，单位 ms | Floating scheduler lifecycle / 浮起调度生命周期 |
| `title` | 标题 | Floating scheduler lifecycle / 浮起调度生命周期 |
<!-- demo-config-notes:end -->

```demo
../example/demos/scheduler-lifecycle.vue
```

## 阅读方向

标题、内容和操作沿阅读顺序排列，默认浮动操作位于阅读终点，不镜像图片或自定义插槽。

## API

<!-- same-source-api:start -->
`row-reverse` 反转横排封面与正文的顺序，阅读方向仍受容器方向影响。`floating-content` 收起时保留节点与内部状态，但会通过 inert 退出键盘和辅助技术交互；展开时恢复。浮层仅在 column 方向生效。

Card 展开时保留原有 DOM 位置和表单归属。支持 Popover API 的浏览器可以将内容置于浏览器顶层，覆盖带 transform 或裁剪的祖先。同文档中已有原生模态框或弹出层时，Card 会等待它关闭或移除。检测范围包括开放的 Shadow DOM 以及 Card 所在的 ShadowRoot；其他组件私有的封闭 ShadowRoot 由宿主管理。如果浏览器不支持顶层显示或打开被取消，Card 使用原位置的 fixed 定位，覆盖范围受祖先布局影响。焦点在展开的 Card 内时，按 Escape 会请求关闭；内部控件已处理的 Escape 不会关闭 Card；内嵌弹层处于最上层时优先处理 Escape。从卡片外的按钮展开顶层 Card 时，若焦点仍在打开按钮上且 Card 位于最上层，展开完成后焦点会进入面板。在面板上按 Escape 收起时，焦点返回打开按钮。若子控件已获得焦点，则保留其焦点。进入浏览器顶层后，Tab 和 Shift+Tab 会在展开的 Card 与其上方的组件库浮层之间循环。展开面板使用分组角色。顶层 Card 完成展开后，背景控件暂停交互。Card 上方的组件库浮层和可检测的原生顶层仍可操作。收起或卸载后背景恢复，业务设置的 `inert` 会保留。如果外部 Web Component 在背景已经隔离后才创建 ShadowRoot，并要立即打开原生弹层，应将 `popover` 设置在宿主元素上，再调用宿主的 `showPopover()`。此时 Card 可以及时放行宿主，关闭弹层后恢复隔离。需要模态对话框语义时请使用 Dialog。

焦点位于通过 `showModal()` 打开的原生对话框时，Escape 交给对话框处理。业务可以在 `cancel` 事件中取消关闭，Card 保持展开。

在展开的 Card 内按 Escape 时，已打开的原生自动弹层（`popover="auto"` 或 `popover="hint"`）优先关闭。焦点留在触发按钮上时也适用。

焦点位于通过 `showModal()` 打开的原生对话框时，Escape 交给对话框处理。业务可以在 `cancel` 事件中取消关闭，Card 保持展开。

当展开内容或关闭按钮内仍有焦点时，关闭会尝试将焦点返回展开前的控件；如果焦点已经移到其他位置，则不会抢回焦点。 展开等待期间，如果焦点进入展开内容，内容会立即显示，不等待淡入动画。 等待期间尚未显示且未获得焦点的展开内容和关闭按钮不会出现在无障碍树中；焦点进入任一处时立即显示。

若打开控件位于外部的封闭 Shadow Root，Card 无法直接取得内部控件；宿主需自行提供焦点委托或由应用处理焦点恢复。`delegatesFocus` 可将宿主焦点委托给内部控件，但不保证在有多个控件时返回原控件。

自定义标题时，可在 Card 上设置 `aria-labelledby="order-title"`，并在头部插槽中使用 `<h2 id="order-title">订单详情</h2>`。这样标题旁的操作按钮不会被读作面板名称。没有可见标题时，可通过 `aria-label` 提供名称。

默认关闭按钮使用当前语言的关闭文案，`close-button-aria-label` 可覆盖。`floating-duration` 为有限非负毫秒数，0 表示不延时；无效值回退为 250。 系统启用减少动态效果时，展开和收起不等待波纹或过渡动画，运行中切换也会生效。

### Card Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| variant | 卡片外观 | `default / outline / tonal` | `outline` |
| size | 内容密度；省略时按平台规则回退，见下方说明 | `xs / sm / md / lg / xl` | `undefined` |
| heading-level | 标题语义层级，同时调整标题字号 | `1 / 2 / 3 / 4 / 5 / 6` | `undefined` |
| footer-align | 页脚内容对齐，start 和 end 随阅读方向 | `start / center / end` | `end` |
| direction | 封面与正文的排列顺序，默认 column；支持 row、column、row-reverse，不表示卡片自身位置 | `row / column / row-reverse` | `column` |
| hoverable | 悬浮样式 | `boolean` | `false` |
| title-style | 标题行样式 | `CSSProperties` | `undefined` |
| title | 标题 | `string` | `undefined` |
| subtitle | 副标题 | `string` | `undefined` |
| description | 描述 | `string` | `undefined` |
| top-divider | 上分割线，左右与内容区对齐 | `boolean` | `false` |
| bottom-divider | 下分割线，左右与内容区对齐 | `boolean` | `false` |
| image-src | 封面图片地址；cover 插槽优先 | `string` | `undefined` |
| image-fit | 封面图片填充方式 | `fill / contain / cover / none / scale-down` | `cover` |
| image-height | 封面图片高度，数字单位为 px | `string / number` | `undefined` |
| image-width | 封面图片宽度，数字单位为 px | `string / number` | `undefined` |
| image-alt | 封面图片替代文本 | `string` | `undefined` |
| elevation | default 变体阴影；true 为等级 1，false 为无阴影，数字范围 0～24 | `boolean / number` | `0` |
| ripple | 点击水波 | `boolean` | `false` |
| floating | 浮动展开状态，支持 v-model:floating | `boolean` | `false` |
| floating-duration | 浮动展开与关闭动画时长，单位 ms | `number` | `250` |
| aria-label | 展开面板的可访问名称，默认使用普通文本标题 | `string` | `—` |
| aria-labelledby | 自定义标题或头部插槽中可见标题元素的 ID | `string` | `—` |
| close-button-aria-label | 默认关闭按钮的可访问名称 | `string` | `—` |

### Card Events

| 事件 | 参数与时机 |
| --- | --- |
| click | `(event: Event)`，点击卡片时触发 |
| update:floating | `(value: boolean)`，内置关闭按钮或 Escape 请求关闭时发送 false；展开由父级设置 |

### Card Slots

| 插槽 | 说明 | 参数 |
| --- | --- | --- |
| default | 正文 | — |
| cover | 封面，覆盖 image-src 图片 | — |
| header | 整个标题区域，覆盖 title、title-action 和 subtitle | — |
| title | 标题 | `{ slotClass: string }` |
| title-action | 标题右侧操作 | — |
| subtitle | 副标题 | `{ slotClass: string }` |
| description | 自定义说明内容，沿用 Card 的说明容器和间距 | `{ slotClass: string }` |
| footer | 底部操作 | — |
| floating-content | 浮动展开内容，仅 column 布局渲染 | — |
| close-button | 自定义关闭按钮；需自行更新 floating | — |

### Card Methods

无公开方法。

### 使用说明

属性、事件参数及插槽契约一致。Cedar 省略 size 时继承全局尺寸（xs/sm 映射 sm，其余映射 md）；Maple 回退 md。需要一致密度时显式传入 size。主题和 CSS 前缀分别使用各端配置。
Card 通过 Loading 指令组合加载遮罩。
<!-- same-source-api:end -->

## CSS Variables

普通背景、filled 背景和描边分别使用 `surface-default`、`surface-muted`、`border-default`；标题、正文和辅助文字分别使用 `content-primary`、`content-tertiary`、`content-secondary`。展开后的悬浮按钮使用 `content-primary`，深色关闭按钮上的文字和图标使用 `content-on-dark`。

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-card-animation-duration` | `var(--mp-sys-motion-duration-slow)` | `transition` |
| `--mp-card-animation-easing` | `var(--mp-sys-motion-easing-standard)` | `transition-timing-function` |
| `--mp-card-background` | `var(--mp-sys-color-surface-default)` | `background` |
| `--mp-card-border-radius` | `4px` | `border-radius` |
| `--mp-card-close-button-background` | `#212121` | `background-color` |
| `--mp-card-close-button-border-radius` | `50%` | `border-radius` |
| `--mp-card-close-button-icon-size` | `24px` | `font-size` |
| `--mp-card-close-button-size` | `56px` | `height`, `width` |
| `--mp-card-close-button-text-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-card-content-color` | `var(--mp-sys-color-content-tertiary)` | `color` |
| `--mp-card-content-font-size` | `15px` | `font-size` |
| `--mp-card-content-margin` | `16px 0 0 0` | `margin` |
| `--mp-card-content-padding` | `0 16px` | `padding` |
| `--mp-card-content-row-margin` | `16px 0 0 0` | `margin` |
| `--mp-card-description-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-card-description-font-size` | `15px` | `font-size` |
| `--mp-card-description-margin` | `20px 0 0 0` | `margin` |
| `--mp-card-description-padding` | `0 16px` | `padding` |
| `--mp-card-filled-background` | `var(--mp-sys-color-surface-muted)` | `background-color` |
| `--mp-card-floating-buttons-bottom` | `16px` | `bottom` |
| `--mp-card-floating-buttons-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-card-floating-buttons-right` | `16px` | `inset-inline-end` |
| `--mp-card-footer-bottom` | `9px` | `bottom` |
| `--mp-card-footer-margin` | `30px 0 0 0` | `margin` |
| `--mp-card-footer-padding` | `0 16px` | `padding` |
| `--mp-card-footer-right` | `13px` | `inset-inline-end` |
| `--mp-card-hover-shadow` | 海拔 1 | `box-shadow` |
| `--mp-card-image-height` | `200px` | `height` |
| `--mp-card-image-width` | `100%` | `width` |
| `--mp-card-line-height` | `22px` | `line-height` |
| `--mp-card-outline-color` | `var(--mp-sys-color-border-default)` | `border` |
| `--mp-card-padding` | `0 0 15px 0` | `padding` |
| `--mp-card-row-height` | `140px` | `min-height` |
| `--mp-card-row-image-width` | `140px` | `width` |
| `--mp-card-row-line-height` | `1.5` | `line-height` |
| `--mp-card-heading-size-step` | `1px` | `font-size` |
| `--mp-card-size-xs-title-font-size` | `15px` | `font-size` |
| `--mp-card-size-xs-section-margin` | `6px 0 0` | `margin` |
| `--mp-card-size-xs-section-padding` | `0 8px` | `padding` |
| `--mp-card-size-lg-title-font-size` | `24px` | `font-size` |
| `--mp-card-size-lg-section-margin` | `20px 0 0` | `margin` |
| `--mp-card-size-lg-section-padding` | `0 20px` | `padding` |
| `--mp-card-size-xl-title-font-size` | `28px` | `font-size` |
| `--mp-card-size-xl-section-margin` | `24px 0 0` | `margin` |
| `--mp-card-size-xl-section-padding` | `0 24px` | `padding` |
| `--mp-card-size-sm-section-margin` | `8px 0 0` | `margin` |
| `--mp-card-size-sm-section-padding` | `0 12px` | `padding` |
| `--mp-card-size-sm-title-font-size` | `16px` | `font-size` |
| `--mp-card-subtitle-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-card-subtitle-font-size` | `15px` | `font-size` |
| `--mp-card-subtitle-margin` | `10px 0 0 0` | `margin` |
| `--mp-card-subtitle-padding` | `0 16px` | `padding` |
| `--mp-card-subtitle-row-margin` | `-8px 0 0 0` | `margin` |
| `--mp-card-title-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-card-title-font-size` | `20px` | `font-size` |
| `--mp-card-title-margin` | `15px 0 0 0` | `margin` |
| `--mp-card-title-padding` | `0 16px` | `padding` |
| `--mp-card-title-row-margin` | `12px 0` | `margin` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-card-background: var(--mp-sys-color-surface-default);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->

### 尺寸与动效

横向内容区的间距由 `--mp-card-content-row-margin` 控制。动效时长 `--mp-card-animation-duration` 默认为 `var(--mp-sys-motion-duration-slow)`，曲线 `--mp-card-animation-easing` 默认为 `var(--mp-sys-motion-easing-standard)`；启用减少动态效果时关闭 Card 的过渡。
