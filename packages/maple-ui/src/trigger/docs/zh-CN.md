# Trigger

真实IAB default/light完成两端延迟取消／KeepAlive测量四组，包含重新挂载正向计时对照，最终面板节点0。入口按钮原生点击但mouseenter由夹具脚本发出，不称原生hover、跨窗口视觉或OS验收。

更换或清空popup ref、watcher刷新前卸载时，scroll监听在实际原绑定窗口解绑，不依赖当前ref反查。此模拟回归不涵盖同节点跨document adopt或真实浏览器视觉／OS验收。

定位／滚动关闭 RAF 在事件元素或浮层的所属窗口申请，并在原申请窗口取消。关闭／解绑后已出队旧帧不消费新的滚动任务。RAF是必要测量调度，不是CSS动效时长；旧监听原窗口解绑已完成后续模拟回归，同节点adopt与真实浏览器仍需单独验收。

mouse-enter-delay／mouse-leave-delay 是交互请求延迟，独立于CSS进出时长。取消、替换、KeepAlive停用或卸载后，旧已出队回调不会提交；停用或卸载后保留的请求方法不再调度。重新激活接受新请求、不重放旧延迟，受控open仍由调用方决定。

连续点击两个独立触发器时，先关闭之前的顶层浮层，再打开新的浮层；嵌套子浮层仍视为父层内部。受控 open 只发出关闭请求，调用方仍可决定是否接受。

## 案例

### 介绍

无视觉样式的锚点浮层基础组件，统一负责触发、定位、挂载、层级和打开状态。业务提示优先使用 Tooltip，结构化内容使用 Popover，命令选择使用 Menu；只有构建新的浮层组件时才直接使用 Trigger。

### 基础用法

```demo
../example/demos/basic.vue
```

### 方位与箭头

```demo
../example/demos/placement.vue
```

### 受控状态与偏移

`popup-offset` 是沿 placement 主轴向外的距离；`popup-translate` 是屏幕 x/y 轴上的附加平移。

本例通过 `v-model:open` 接受开关请求，面板显示父级实际值。外部打开/关闭按钮直接更新父级；触发元素上的 Enter/Space 会产生原生按钮点击，Escape 或外部点击请求关闭。示例没有拒绝请求，不代表受控拒绝场景已覆盖。Trigger 已列入组件菜单，右侧预览使用本组件 Demo，而不是首页。

```demo
../example/demos/controlled.vue
```

<!-- api-review:start -->
### 功能调试

```demo
../example/demos/api-review.vue
```

<!-- api-review:end -->

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model:open` | 受控打开状态 | _boolean_ | `-` |
| `default-open` | 非受控初始状态 | _boolean_ | `false` |
| `trigger` | `hover/click/focus/contextMenu/manual`，可传数组 | _TriggerEvent \| TriggerEvent[]_ | `hover` |
| `disabled` | 禁止打开 | _boolean_ | `false` |
| `reference` | 外部参考元素 | _string \| HTMLElement \| SVGElement_ | `-` |
| `placement` | 十二方位 | _TriggerPlacement_ | `bottom` |
| `strategy` | 定位策略 | _absolute \| fixed_ | `absolute` |
| `cover` | 沿主轴覆盖参考元素 | _boolean_ | `false` |
| `popup-offset` | 主轴向外距离 | _number_ | `0` |
| `popup-translate` | 屏幕轴平移或按方位配置 | _[number, number] \| Record_ | `-` |
| `align-point` | 以鼠标坐标定位 | _boolean_ | `false` |
| `popup-container` | 挂载容器；false 原地渲染 | _string \| HTMLElement \| false_ | `body` |
| `auto-fit-position` | 自动翻转并限制到可视区域 | _boolean_ | `true` |
| `auto-fit-popup-width` | 宽度跟随参考元素 | _boolean_ | `false` |
| `auto-fit-popup-min-width` | 最小宽度跟随参考元素 | _boolean_ | `false` |
| `auto-fix-position` | 尺寸变化时重新定位 | _boolean_ | `true` |
| `update-at-scroll` | 滚动时重新定位 | _boolean_ | `false` |
| `scroll-to-close` | 滚动超过阈值关闭 | _boolean_ | `false` |
| `scroll-to-close-distance` | 滚动关闭阈值 | _number_ | `0` |
| `show-arrow` | 显示箭头 | _boolean_ | `false` |
| `hide-empty` | 内容为空时不渲染 | _boolean_ | `false` |
| `prevent-focus` | 阻止定位层抢占焦点 | _boolean_ | `false` |
| `unmount-on-close` | 离场后卸载内容 | _boolean_ | `true` |
| `animation-name` | Vue Transition 名称 | _string_ | `trigger-fade` |
| `duration` | 动画时长 | _number \| object_ | `-` |
| `auto-fit-transform-origin` | 根据最终方位设置动画原点 | _boolean_ | `false` |
| `opened-class` | 打开时的参考节点类名 | _string \| array \| object_ | `-` |
| `popup-class` / `popup-style` | 定位层类名 / 样式 | _ClassName / CSSProperties_ | `-` |
| `content-class` / `content-style` | 内容层类名 / 样式 | _ClassName / CSSProperties_ | `-` |
| `arrow-class` / `arrow-style` | 箭头类名 / 样式 | _ClassName / CSSProperties_ | `-` |

交互延迟和关闭策略还包括 `mouse-enter-delay`、`mouse-leave-delay`、`focus-delay`、`popup-hover-stay`、`blur-to-close`、`close-on-click-reference`、`click-outside-to-close`、`esc-to-close`、`restore-focus`。

### 事件

`update:open`、`open-change`、`open`、`opened`、`close`、`closed`、`click-outside`、`resize`。

### 插槽与方法

默认插槽提供参考节点，`content` 提供浮层内容。Expose：`open()`、`close()`、`resize()`、`allowClose()`、`getReference()`、`setReference()`、`focusReference()`、`isTopLayer()`。

### 可访问性

`trigger="focus"` 支持键盘聚焦，Escape 只关闭最上层浮层。Trigger 不自行决定业务 `role` 和 aria 关系，上层语义组件负责补充。

## 公开 CSS 变量

以下为实际 :root 默认值。业务定制优先使用组件变量；内部定位变量不属于公开 API。

| 变量 | 默认值 | 意义与场景 |
| --- | --- | --- |
| `--mp-trigger-arrow-background` | `var(--mp-sys-color-surface-overlay)` | 独立 Trigger 箭头背景；包装组件用自己的变量 |
| `--mp-trigger-arrow-size` | `var(--mp-sys-space-4)` | 箭头正方形尺寸 |
| `--mp-trigger-arrow-radius` | `var(--mp-sys-radius-sm)` | 箭头圆角 |
| `--mp-trigger-transition-duration` | `var(--mp-sys-motion-duration-fast)` | 默认 Trigger 淡入淡出时长 |
| `--mp-trigger-transition-easing` | `var(--mp-sys-motion-easing-standard)` | 默认 Trigger 缓动曲线 |

Tooltip 与 Popover 自行定义箭头外观；应覆盖其组件变量，而不是 Trigger arrow-background。

使用 Teleport 时，变量需放在实际 popup 的作用域中（例如通过 `popup-style`）；触发按钮上的变量不会自动继承到浮层。

### 减少动态效果

内置 CSS 过渡遵循 `prefers-reduced-motion: reduce`。关闭过渡不改变最终显隐、选中／展开状态及事件语义；插槽内自定义动画由应用自行控制。
