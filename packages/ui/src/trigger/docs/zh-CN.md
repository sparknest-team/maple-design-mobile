# Trigger

SSR 限制：触发插槽或 `content` 插槽内的同一节点同时使用 `v-for` 和 `v-memo` 时，服务端渲染可能报错。触发插槽即使在浮层关闭时也可能报错；`content` 插槽在浮层打开或设置 `unmount-on-close=false` 时可能报错。服务端渲染时请移除该插槽节点上的 `v-memo`；普通 `v-for` 仍可使用。 在 Vue 3.5.13 中，触发插槽内单独使用动态 `v-memo` 也可能报错。



更换或清空浮层引用，以及卸载组件时，会移除旧窗口的滚动监听。

关闭或解绑后，尚未执行的定位和滚动关闭任务不会影响后续打开的浮层。

mouse-enter-delay／mouse-leave-delay 是交互请求延迟，独立于CSS进出时长。取消、替换、KeepAlive停用或卸载后，旧已出队回调不会提交；停用或卸载后保留的请求方法不再调度。重新激活接受新请求、不重放旧延迟，受控open仍由调用方决定。

连续点击两个独立触发器时，先关闭之前的顶层浮层，再打开新的浮层；嵌套子浮层仍视为父层内部。受控 open 只发出关闭请求，调用方仍可决定是否接受。

### 介绍

无视觉样式的锚点浮层基础组件，统一负责触发、定位、挂载、层级和打开状态。业务提示优先使用 Tooltip，结构化内容使用 Popover，命令选择使用 Menu；只有构建新的浮层组件时才直接使用 Trigger。

## 基础示例

### 基础用法

```demo
../example/demos/basic.vue
```

## 布局与排列

### 方位与箭头

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `trigger` | `hover/click/focus/contextMenu/manual`，可传数组 | 方位与箭头 |
| `placement` | 浮层相对触发元素的首选方位，默认 bottom；启用默认的 auto-fit-position 时，空间不足会自动翻转并约束到可视区域，不保证最终停在该侧 | 方位与箭头 |
| `popup-offset` | 主轴向外距离 | 方位与箭头 |
| `show-arrow` | 显示箭头 | 方位与箭头 |
<!-- demo-config-notes:end -->

```demo
../example/demos/placement.vue
```

## 交互与控制

### 受控状态与偏移

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `trigger` | `hover/click/focus/contextMenu/manual`，可传数组 | 受控状态与偏移 |
| `placement` | 浮层相对触发元素的首选方位，默认 bottom；启用默认的 auto-fit-position 时，空间不足会自动翻转并约束到可视区域，不保证最终停在该侧 | 受控状态与偏移 |
| `popup-offset` | 主轴向外距离 | 受控状态与偏移 |
| `popup-translate` | 屏幕轴平移或按方位配置 | 受控状态与偏移 |
<!-- demo-config-notes:end -->

`popup-offset` 是沿 placement 主轴向外的距离；`popup-translate` 是屏幕 x/y 轴上的附加平移。

本例通过 `v-model:open` 接受开关请求，面板显示父级实际值。外部打开/关闭按钮直接更新父级；触发元素上的 Enter/Space 会产生原生按钮点击，Escape 或外部点击请求关闭。示例没有拒绝请求，不代表受控拒绝场景已覆盖。Trigger 已列入组件菜单，右侧预览使用本组件 Demo，而不是首页。

```demo
../example/demos/controlled.vue
```

## 触发与定位

### 弹层定位

placement 是首选方位，auto-fit-position 默认 true 时最终方位可能变化；它不是 position 坐标。top-start 与 top-left 不是同一种枚举：前者是锚点方位及沿边对齐，后者是容器角落。top/bottom 的 start/end 随阅读方向镜像；left/right 仍是物理方位，纵向 start/end 维持上下语义。

## 使用说明

### 配置说明

以下为实际 :root 默认值。业务定制优先使用组件变量；内部定位变量不属于公开 API。

使用 Teleport 时，变量需放在实际 popup 的作用域中（例如通过 `popup-style`）；触发按钮上的变量不会自动继承到浮层。

### 减少动态效果

`allowClose()` 只恢复内部关闭门控；没有公开的对应禁用方法，也不能用它阻止关闭。

## API

### Trigger Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model:open` | 受控打开状态 | _boolean_ | `-` |
| `default-open` | 非受控初始状态 | _boolean_ | `false` |
| `trigger` | `hover/click/focus/contextMenu/manual`，可传数组 | _TriggerEvent \| TriggerEvent[]_<br>`TriggerEvent: 'manual' \| 'focus' \| 'hover' \| 'click' \| 'contextMenu'` | `hover` |
| `disabled` | 禁止打开 | _boolean_ | `false` |
| `reference` | 外部参考元素 | _string \| HTMLElement \| SVGElement_ | `-` |
| `placement` | 浮层相对触发元素的首选方位，默认 bottom；启用默认的 auto-fit-position 时，空间不足会自动翻转并约束到可视区域，不保证最终停在该侧 | _TriggerPlacement_<br>`'left' \| 'right' \| 'bottom' \| 'top' \| 'top-start' \| 'top-end' \| 'bottom-start' \| 'bottom-end' \| 'left-start' \| 'left-end' \| 'right-start' \| 'right-end'` | `bottom` |
| `strategy` | 定位策略 | _absolute \| fixed_ | `absolute` |
| `cover` | 沿主轴覆盖参考元素 | _boolean_ | `false` |
| `popup-offset` | 主轴向外距离 | _number_ | `0` |
| `popup-translate` | 屏幕轴平移或按方位配置 | _[number, number] \| Record_ | `-` |
| `align-point` | 以鼠标坐标定位 | _boolean_ | `false` |
| `popup-container` | 挂载容器；false 原地渲染。同文档或可访问的同源 iframe 之间切换时，会尝试恢复未转移的原生输入、按钮等焦点，包括开放 Shadow DOM 中的同类元素；可能承载封闭 Shadow DOM 的不透明宿主不会自动恢复。 | _string \| HTMLElement \| false_ | `body` |
| `auto-fit-position` | 自动翻转并限制到可视区域 | _boolean_ | `true` |
| `auto-fit-popup-width` | 宽度跟随参考元素 | _boolean_ | `false` |
| `auto-fit-popup-min-width` | 最小宽度跟随参考元素 | _boolean_ | `false` |
| `auto-fix-position` | 触发元素尺寸变化时更新位置，其自身或祖先的 CSS 过渡和动画结束或取消后也会重新定位。关闭此选项后仍观察浮层、定位父级及窗口变化 | _boolean_ | `true` |
| `update-at-scroll` | 滚动时重新定位 | _boolean_ | `false` |
| `scroll-to-close` | 滚动超过阈值关闭 | _boolean_ | `false` |
| `scroll-to-close-distance` | 滚动关闭阈值 | _number_ | `0` |
| `show-arrow` | 显示箭头 | _boolean_ | `false` |
| `hide-empty` | content 插槽直接返回空内容时不渲染；组件节点即使最终渲染为空也视为非空 | _boolean_ | `false` |
| `prevent-focus` | 阻止定位层抢占焦点 | _boolean_ | `false` |
| `unmount-on-close` | 离场后卸载内容 | _boolean_ | `true` |
| `animation-name` | Vue Transition 名称 | _string_ | `trigger-fade` |
| `duration` | 动画时长 | _number \| object_ | `-` |
| `auto-fit-transform-origin` | 根据最终方位设置动画原点 | _boolean_ | `false` |
| `opened-class` | 打开时合并给默认插槽的首个节点；外部 reference 不添加该类 | _string \| array \| object_ | `-` |
| `reference-attrs` | 写入实际参考元素的属性，或接收 open 的函数；属性撤销、引用替换或卸载时恢复原属性 | _TriggerReferenceAttrs \| ((open: boolean) => TriggerReferenceAttrs)_ | `-` |
| `popup-class` | 定位层自定义类名 | `ClassName` | `-` |
| `popup-style` | 定位层的自定义样式 | `CSSProperties` | `-` |
| `content-class` | 内容层的自定义类名 | `ClassName` | `-` |
| `content-style` | 内容层的自定义样式 | `CSSProperties` | `-` |
| `arrow-class` | 箭头的自定义类名 | `ClassName` | `-` |
| `arrow-style` | 箭头的自定义样式 | `CSSProperties` | `-` |

交互延迟和关闭策略还包括 `mouse-enter-delay`、`mouse-leave-delay`、`focus-delay`、`popup-hover-stay`、`blur-to-close`、`close-on-click-reference`、`click-outside-to-close`、`esc-to-close`、`restore-focus`。

### Trigger Events

`update:open`、`open-change`、`open`、`opened`、`close`、`closed`、`click-outside`、`resize`。

### Trigger Slots / Methods

默认插槽提供参考节点，`content` 提供浮层内容。Expose：`open()`、`close()`、`resize()`、`allowClose()`、`getReference()`、`setReference()`、`focusReference()`、`isTopLayer()`。

### 可访问性

`trigger="focus"` 支持键盘聚焦，Escape 只关闭最上层浮层。Trigger 不自行决定业务 `role` 和 aria 关系，上层语义组件负责补充。

焦点触发时，单次外部指针操作同时导致失焦和点击，只请求关闭一次。受控状态未接受关闭时，后续独立点击仍会再次请求关闭；`click-outside` 保持外部点击事件通知。

## 参考元素的原生事件修饰符

`click`、`mouseenter`、`mouseleave`、`focusin`、`focusout`、`contextmenu` 的原生监听器和 `.once`、`.capture`、`.passive` 均绑定到实际参考元素，不会落到浮层。`.once` 按原生元素的监听生命周期执行；更新回调不重新启用已消费的监听，换参考元素或移除后重加监听才开始新的周期。停用和卸载会解绑。普通监听器只通知，返回 Promise 不驱动打开或加载，异常进入 Vue 的事件错误处理链。

`reference-attrs` 的 `aria-describedby` 与参考元素已有描述 ID 合并去重；清理或更换引用时恢复原始属性。

`fixed` 定位会识别 transform、filter、perspective 等形成的固定定位包含块，并处理轴向缩放；不保证旋转或倾斜坐标系精确。可访问的同源 iframe 引用与弹层之间会换算坐标并绑定各自文档事件；不支持跨源或无共同祖先的浏览上下文。启用 `update-at-scroll` 时，两端文档及可滚动祖先的滚动都会更新位置。

当弹层挂载到同一文档的封闭 ShadowRoot 内时，Trigger 会区分弹层内部点击和外部点击。经过封闭根宿主的点击会延后一个任务判断归属，依赖关闭事件时序的调用方需要考虑这一点。

当引用通过插槽进入封闭 ShadowRoot 内的滚动容器时，外部 Trigger 无法访问该插槽及容器，不能自动监听其滚动。封闭组件可在内部滚动或插槽变化时调用 Trigger 实例的 `resize()`；需要滚动关闭时，可在内部按业务阈值调用 `close()`，并在卸载时清理监听。

弹层挂载到 iframe 内时，显示区域仍受该 iframe 视口裁剪；即使跨文档坐标换算正确，iframe 范围外的弹层内容也不可见。

## CSS Variables

Tooltip 与 Popover 自行定义箭头外观；应覆盖其组件变量，而不是 Trigger arrow-background。

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-trigger-arrow-background` | `var(--mp-sys-color-surface-overlay)` | `background-color` |
| `--mp-trigger-arrow-radius` | `var(--mp-sys-radius-sm)` | `border-radius` |
| `--mp-trigger-arrow-size` | `var(--mp-sys-space-4)` | `height`, `width` |
| `--mp-trigger-transition-duration` | `var(--mp-sys-motion-duration-fast)` | `transition` |
| `--mp-trigger-transition-easing` | `var(--mp-sys-motion-easing-standard)` | `transition` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-trigger-arrow-background: var(--mp-sys-color-surface-overlay);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->

### 减少动态效果

内置 CSS 过渡遵循 `prefers-reduced-motion: reduce`。关闭过渡不改变最终显隐、选中／展开状态及事件语义；插槽内自定义动画由应用自行控制。
