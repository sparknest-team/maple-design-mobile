# Popover 气泡卡片

点击触发元素后展示结构化内容。Popover 可以包含按钮、表单和其他交互元素；纯文字说明使用 Tooltip。

## 基础示例

### 基本使用

```demo
../example/demos/basic-usage.vue
```

## 内容与展示

### 位置、偏移与宽度

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `placement` | 浮层相对触发元素的首选方位，默认 bottom；启用默认的 auto-fit-position 时，空间不足会自动翻转并约束到可视区域，不保证最终停在该侧 | 位置、偏移与宽度 |
| `popup-translate` | 屏幕轴附加平移 | 位置、偏移与宽度 |
| `trigger` | 触发方式 | 触发方式、受控状态与事件 |
| `disabled` | 禁止打开 | 触发方式、受控状态与事件 |
<!-- demo-config-notes:end -->

依次触发浮层，对比锚点方向、偏移与触发器宽度适配。关闭当前浮层后比较下一种配置。

```demo
../example/demos/positioning-comparison.vue
```

### 触发方式、受控状态与事件

```demo
../example/demos/trigger.vue
```

```demo
../example/demos/two-way-binding.vue
```

```demo
../example/demos/events.vue
```

```demo
../example/demos/disabled.vue
```

## 交互与控制

### 交互内容与状态保留

```demo
../example/demos/interactive.vue
```

## 阅读方向

继承最近的 `dir="ltr|rtl"`，支持运行时切换与局部覆盖。内容默认对齐阅读起点，弹层继承来源方向；逻辑 start/end 对齐随方向变化，显式 left/right 方位保持物理语义。

## API

Popover 继承 Trigger 的定位、容器、受控状态、关闭策略和公开方法。

### 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model:open | 受控打开状态 | `boolean` | — |
| default-open | 非受控初始状态 | `boolean` | `false` |
| title | 标题 | `string` | — |
| content | 正文 | `string` | — |
| trigger | 触发方式 | `TriggerEvent \| TriggerEvent[]` | `click` |
| placement | 浮层相对触发元素的首选方位，默认 bottom；启用默认的 auto-fit-position 时，空间不足会自动翻转并约束到可视区域，不保证最终停在该侧 | `TriggerPlacement` | `bottom` |
| show-arrow | 是否显示箭头 | `boolean` | `true` |
| popup-offset | 沿方位主轴的距离 | `number` | `10` |
| popup-translate | 屏幕轴附加平移 | `[number, number] \| Record` | — |
| popup-container | 挂载容器；false 原地渲染 | `string \| HTMLElement \| false` | `body` |
| reference | 外部触发元素 | `string \| HTMLElement \| SVGElement` | — |
| disabled | 禁止打开 | `boolean` | `false` |
| unmount-on-close | 关闭后卸载；默认保留交互草稿 | `boolean` | `false` |
| close-on-click-reference | 再次点击触发元素时关闭 | `boolean` | `true` |

### 事件

| 事件名 | 说明 |
| --- | --- |
| update:open | 请求修改受控打开状态 |
| open-change | 请求修改打开状态 |
| open | 开始打开 |
| opened | 入场动画完成 |
| close | 开始关闭 |
| closed | 离场动画完成 |
| click-outside | 点击浮层外部 |

### 插槽

| 插槽名 | 说明 |
| --- | --- |
| default | 触发元素 |
| title | 标题；未提供时使用 `title` 属性 |
| content | 正文；未提供时使用 `content` 属性 |

### 方法

`open()`、`close()`、`resize()`、`allowClose()`、`getReference()`、`setReference()`、`focusReference()`。

触发元素通过 `aria-controls`、`aria-expanded` 与面板关联。无样式定位使用 Trigger；不提供 `defaultStyle`、`popoverClass` 或 `elevation`，自定义外观使用 Token、`content-class` 或 `content-style`。

## 公开 CSS 变量

以下为实际 :root 默认值。业务定制优先使用组件变量；内部定位变量不属于公开 API。

| 变量 | 默认值 | 意义与场景 |
| --- | --- | --- |
| `--mp-popover-background` | `var(--mp-sys-color-surface-overlay)` | 内容与箭头背景 |
| `--mp-popover-text-color` | `var(--mp-sys-color-content-secondary)` | 正文前景 |
| `--mp-popover-border-color` | `var(--mp-sys-color-border-default)` | 内容与箭头边框颜色 |
| `--mp-popover-border-width` | `1px` | 内容与箭头边框宽度 |
| `--mp-popover-border-radius` | `var(--mp-sys-radius-md)` | 内容圆角 |
| `--mp-popover-box-shadow` | `0 3px 3px -2px var(--mp-shadow-key-umbra-opacity), 0 3px 4px 0 var(--mp-shadow-key-penumbra-opacity), 0 1px 8px 0 var(--mp-shadow-key-ambient-opacity)` | 内容阴影，保留平台差异 |
| `--mp-popover-arrow-z-index` | `1` | 箭头在当前浮层内的堆叠层级 |
| `--mp-popover-padding-horizontal` | `var(--mp-sys-space-7)` | 内容横向内边距 |
| `--mp-popover-padding-vertical` | `var(--mp-sys-space-6)` | 内容纵向内边距 |
| `--mp-popover-font-size` | `var(--mp-sys-font-size-md)` | 内容字号 |
| `--mp-popover-line-height` | `var(--mp-line-height)` | 内容行高 |
| `--mp-popover-title-text-color` | `var(--mp-sys-color-content-primary)` | 标题前景 |
| `--mp-popover-title-font-size` | `var(--mp-sys-font-size-lg)` | 标题字号 |
| `--mp-popover-title-font-weight` | `var(--mp-sys-font-weight-medium)` | 标题字重 |
| `--mp-popover-title-content-gap` | `var(--mp-sys-space-2)` | 标题与正文间距 |
| `--mp-popover-animation-duration` | `var(--mp-sys-motion-duration-standard)` | 组件入退场时长；reduced-motion 可覆盖 |

Maple 暗色保留圆角 2px，阴影保留平台差异。内容与箭头共享背景／边框变量，不再受 Trigger 样式加载顺序影响。

使用 Teleport 时，变量需放在实际 popup 的作用域中（例如通过 `popup-style`）；触发按钮上的变量不会自动继承到浮层。
