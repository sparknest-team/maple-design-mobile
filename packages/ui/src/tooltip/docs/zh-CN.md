# Tooltip 文字气泡

用于补充说明按钮、图标或被截断的文字。默认同时响应鼠标悬停和键盘聚焦；需要承载可操作内容时使用 Popover。

## 基础示例

### 基本使用

```demo
../example/demos/basic-usage.vue
```

## 外观与状态

### 外观配置对比

选择一个对比维度后，同屏展示它的全部可选值；其余配置和内容保持一致。可切换其他配置检查组合效果；输入类预览共享一个值。

<details>
<summary>配置说明与使用限制</summary>

#### 尺寸

只实现 `md` 和 `xs` 两档，默认 `md`。

#### 外观组合

适用于悬浮时的补充说明。调整状态、尺寸，用相同数据观察变化。内容保持一致，便于比较不同设置的实际效果。

</details>

```demo
../example/demos/appearance-lab.vue
```

## 布局与排列

### 位置、偏移与触发

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `content` | 提示内容 | 位置、偏移与触发 |
| `placement` | 浮层相对触发元素的首选方位，默认 top；启用默认的 auto-fit-position 时，空间不足会自动翻转并约束到可视区域，不保证最终停在该侧 | 位置、偏移与触发 |
| `popup-translate` | 屏幕轴附加平移 | 位置、偏移与触发 |
| `trigger` | 触发方式 | 位置、偏移与触发 |
<!-- demo-config-notes:end -->

```demo
../example/demos/placement.vue
```

```demo
../example/demos/offset.vue
```

```demo
../example/demos/trigger.vue
```

## 内容与展示

### 内容、主题与颜色

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `content` | 提示内容 | 内容、主题与颜色、事件与禁用 |
| `color` | 自定义背景色 | 内容、主题与颜色 |
| `text-color` | 自定义文字色 | 内容、主题与颜色 |
| `disabled` | 禁止打开 | 事件与禁用 |
<!-- demo-config-notes:end -->

```demo
../example/demos/content-slot.vue
```



```demo
../example/demos/custom-color.vue
```

### 事件与禁用

```demo
../example/demos/events.vue
```

```demo
../example/demos/disabled.vue
```

## 使用说明

### 配置说明

以下为实际 :root 默认值。业务定制优先使用组件变量；内部定位变量不属于公开 API。

使用 Teleport 时，变量需放在实际 popup 的作用域中（例如通过 `popup-style`）；触发按钮上的变量不会自动继承到浮层。

## API

Tooltip 继承 Trigger 的定位、容器、受控状态和关闭策略。默认 `hide-empty=true`、`auto-fit-transform-origin=true`，未传 `animation-name` 时使用 Tooltip 自身动画。空内容只隐藏提示，不改变 open；组件节点视为有内容。实例提供 `open`、`close`、`resize`、`allowClose`、`getReference`、`focusReference` 和 `setReference` 七个方法。

### Tooltip Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model:open | 受控打开状态 | `boolean` | — |
| default-open | 非受控初始状态 | `boolean` | `false` |
| content | 提示内容 | `string` | — |
| status | 面板主题 | `default \| primary \| info \| success \| warning \| danger` | `default` |
| size | 尺寸；只实现两档 | `xs \| md` | `md` |
| color | 自定义背景色 | `string` | — |
| text-color | 自定义文字色 | `string` | — |
| trigger | 触发方式 | `TriggerEvent \| TriggerEvent[]`<br>`TriggerEvent: 'manual' \| 'focus' \| 'hover' \| 'click' \| 'contextMenu'` | `['hover', 'focus']` |
| placement | 浮层相对触发元素的首选方位，默认 top；启用默认的 auto-fit-position 时，空间不足会自动翻转并约束到可视区域，不保证最终停在该侧 | `TriggerPlacement`<br>`'left' \| 'right' \| 'bottom' \| 'top' \| 'top-start' \| 'top-end' \| 'bottom-start' \| 'bottom-end' \| 'left-start' \| 'left-end' \| 'right-start' \| 'right-end'` | `top` |
| show-arrow | 是否显示箭头 | `boolean` | `true` |
| popup-offset | 沿方位主轴的距离 | `number` | `10` |
| popup-translate | 屏幕轴附加平移 | `[number, number] \| Record` | — |
| popup-container | 挂载容器；false 原地渲染 | `string \| HTMLElement \| false` | `body` |
| reference | 外部触发元素 | `string \| HTMLElement \| SVGElement` | — |
| disabled | 禁止打开 | `boolean` | `false` |
| unmount-on-close | 关闭后卸载内容 | `boolean` | `true` |

### Tooltip Events

| 事件名 | 说明 |
| --- | --- |
| update:open | 请求修改受控打开状态 |
| open-change | 请求修改打开状态 |
| open | 开始打开 |
| opened | 入场动画完成 |
| close | 开始关闭 |
| closed | 离场动画完成 |
| click-outside | 点击浮层外部 |

### Tooltip Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 触发元素 |
| content | 提示内容；未提供时使用 `content` 属性 |

### Tooltip Methods

`open()`、`close()`、`resize()`、`allowClose()`、`getReference()`、`setReference()`、`focusReference()`。

内容具有 `role="tooltip"`，打开时通过 `aria-describedby` 与实际触发元素关联，并与原有描述及 reference-attrs 中的描述合并去重；关闭、更换引用或卸载时移除提示 ID 并保留原有描述。两端独立保存同一份实现，不提供 `backgroundColor` 或布尔 `xs` 兼容入口。

## CSS Variables

所有内置主题 opacity 为 1。彩色实心状态文字遵循 Button，统一使用 on-dark，明暗模式一致。Maple 暗色保留圆角 4px、字号 14px、纵向／横向内边距 8px／16px。中性表面在明暗模式均保持深色。`color` 同时设置内容与箭头背景，`text-color` 设置文字；显式 content-style／arrow-style 覆盖各自节点。自定义颜色／透明度需重新验证。

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-tooltip-animation-duration` | `var(--mp-sys-motion-duration-standard)` | `transition` |
| `--mp-tooltip-background` | `var(--mp-sys-color-surface-tooltip)` | `background-color` |
| `--mp-tooltip-border-radius` | `var(--mp-sys-radius-md)` | `border-radius` |
| `--mp-tooltip-font-size` | `var(--mp-sys-font-size-md)` | `font-size` |
| `--mp-tooltip-line-height` | `var(--mp-line-height)` | `line-height` |
| `--mp-tooltip-max-width` | `350px` | `max-width` |
| `--mp-tooltip-opacity` | `1` | `opacity` |
| `--mp-tooltip-padding-horizontal` | `var(--mp-sys-space-6)` | `padding` |
| `--mp-tooltip-padding-vertical` | `var(--mp-sys-space-4)` | `padding` |
| `--mp-tooltip-size-xs-font-size` | `var(--mp-sys-font-size-xs)` | `font-size` |
| `--mp-tooltip-size-xs-padding-horizontal` | `var(--mp-sys-space-4)` | `padding` |
| `--mp-tooltip-size-xs-padding-vertical` | `var(--mp-sys-space-2)` | `padding` |
| `--mp-tooltip-status-danger-background` | `var(--mp-sys-color-status-danger)` | `background-color` |
| `--mp-tooltip-status-danger-text-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-tooltip-status-info-background` | `var(--mp-sys-color-status-info)` | `background-color` |
| `--mp-tooltip-status-info-text-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-tooltip-status-primary-background` | `var(--mp-sys-color-action-primary)` | `background-color` |
| `--mp-tooltip-status-primary-text-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-tooltip-status-success-background` | `var(--mp-sys-color-status-success)` | `background-color` |
| `--mp-tooltip-status-success-text-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-tooltip-status-warning-background` | `var(--mp-sys-color-status-warning)` | `background-color` |
| `--mp-tooltip-status-warning-text-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-tooltip-text-color` | `var(--mp-sys-color-content-on-dark)` | `color` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-tooltip-background: var(--mp-sys-color-surface-tooltip);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
