# Trigger

### 介绍

无视觉样式的锚点浮层基础组件，统一负责触发、定位、挂载、层级和打开状态。业务提示优先使用 Tooltip，结构化内容使用 Popover，命令选择使用 DropdownMenu；只有构建新的浮层组件时才直接使用 Trigger。

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

```demo
../example/demos/controlled.vue
```

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

### 样式变量

| 变量 | 默认值 |
| --- | --- |
| `--mp-trigger-arrow-background` | `var(--mp-sys-color-surface-overlay)` |
| `--mp-trigger-arrow-size` | `var(--mp-sys-space-4)` |
| `--mp-trigger-arrow-radius` | `var(--mp-sys-radius-sm)` |
| `--mp-trigger-transition-duration` | `var(--mp-sys-motion-duration-fast)` |
| `--mp-trigger-transition-easing` | `var(--mp-sys-motion-easing-standard)` |

### 可访问性

`trigger="focus"` 支持键盘聚焦，Escape 只关闭最上层浮层。Trigger 不自行决定业务 `role` 和 aria 关系，上层语义组件负责补充。
