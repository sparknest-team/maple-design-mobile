# BackTop 回到顶部

显示测量帧与duration／easing滚动动画分别管理归属；换目标、停用、卸载及已消费旧回调不能重放。easing后再核对请求；RAF申请／取消与时间原点使用目标所属窗口。保留命令在停用／卸载后无效，激活不恢复旧动画。两端专项各14／完整各30通过，受控队列／iframe不是原生浏览器／OS验收。默认200ms与API不变，不新增CSS变量。

滚动页面或指定容器的回顶按钮，支持原生键盘操作。

## 案例

### 调度生命周期

```demo
../example/demos/scheduler-lifecycle.vue
```

### 基础用法

```demo
../example/demos/basic-usage.vue
```

### 切换滚动容器

```demo
../example/demos/target-container.vue
```

### 自定义位置

```demo
../example/demos/custom-position.vue
```

### 自定义内容与事件

```demo
../example/demos/custom-content.vue
```

示例使用独立局部容器，避免多个卡片争用页面回顶按钮。不传 `target-container` 时监听页面，不自动查找滚动祖先。无效或未匹配的选择器会隐藏按钮；异步容器使用返回元素的响应式 getter。`popup-container` 只控制按钮挂载位置，不改变滚动目标。

## API

BackTop 的 duration（200ms）与 easing（quartOut）是 JS requestAnimationFrame 滚动参数，不是 CSS 动效 Token；现有组件变量只负责几何、配色、焦点及层级。减少动效偏好读取滚动目标 ownerDocument 的窗口；动画途中开启时在下一帧立即回顶，保留横向滚动，不承诺同步 OS 事件回调。重复点击、目标切换、停用或卸载使旧帧失效，包括已经出队的回调。滚动可见性合帧不是视觉动画。此处以模拟 RAF／iframe 文档与 SSR 回归验证，不增加真实浏览器／OS 通过数。

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `target-container` | 滚动容器；省略时为页面 | `string \| HTMLElement \| (() => HTMLElement \| null \| undefined)` | `—` |
| `popup-container` | 挂载容器；false 原地渲染 | `string \| HTMLElement \| false` | `body` |
| `visible-height` | 显示阈值（含边界）；数字字符串按 px，不支持 CSS 单位 | `number \| string` | `200` |
| `duration` | 回顶动画毫秒数，0 立即回顶 | `number` | `200` |
| `easing` | 内置曲线或输入/输出 0–1 的自定义缓动函数 | `'linear' \| 'quartOut' \| 'easeInOutCubic' \| ((progress: number) => number)` | `'quartOut'` |
| `right` | 右侧偏移；数字按 px，字符串支持 CSS 长度 | `number \| string` | `—` |
| `bottom` | 底部偏移；数字按 px，字符串支持 CSS 长度 | `number \| string` | `—` |
| `elevation` | 阴影等级；true 为 2，false 关闭 | `boolean \| number` | `true` |
| `aria-label` | 无障碍名称 | `string` | `'Back to top'` |

`popup-container=false` 时按钮绝对定位，父级需 `position: relative`。重复点击替换前次动画；切换目标、KeepAlive 停用和卸载都会清理监听与动画。系统开启减少动态效果时立即回顶，不改变横向滚动位置。

### 事件 / 插槽 / 方法

- `click(event: MouseEvent)`：每次激活通知一次。
- 默认插槽：文字、图标等非交互内容；根节点已是原生 button，不再嵌套 Button 或链接。
- `scrollToTop()`：滚动当前目标，不额外触发 click。
- 键盘：Tab 聚焦可见按钮，Enter / Space 激活；隐藏时不可聚焦。

### 类型

```ts
import type { BackTopProps, BackTopInstance, BackTopTarget, BackTopEasing } from '@maplejs/maple-ui'
```

### 样式变量

| Token | 默认值 |
| --- | --- |
| `--mp-back-top-right` | `40px` |
| `--mp-back-top-bottom` | `40px` |
| `--mp-back-top-button-size` | `var(--mp-sys-control-touch-target)` |
| `--mp-back-top-button-border-radius` | `50%` |
| `--mp-back-top-font-size` | `var(--mp-sys-font-size-md)` |
| `--mp-back-top-icon-size` | `20px` |
| `--mp-back-top-background` | `var(--mp-sys-color-surface-raised)` |
| `--mp-back-top-text-color` | `var(--mp-sys-color-content-brand)` |
| `--mp-back-top-hover-background` | `var(--mp-sys-color-state-hover)` |
| `--mp-back-top-focus-color` | `var(--mp-sys-color-content-brand)` |
| `--mp-back-top-focus-width` | `2px` |
| `--mp-back-top-focus-offset` | `2px` |
| `--mp-back-top-z-index` | `var(--mp-z-index-local-sticky)` |

预发布迁移：Cedar 的 `margin-right/bottom` → `right/bottom`、`button-size-width` → `button-size`、`button-size-font/icon` → `font-size/icon-size`、`button-bg/bg-hover/text-color` → `background/hover-background/text-color`（均带组件前缀）。Maple 默认动画改为 200ms，默认目标为页面。旧 BTween 任意曲线字符串改用上述枚举或函数；不保留兼容别名。
