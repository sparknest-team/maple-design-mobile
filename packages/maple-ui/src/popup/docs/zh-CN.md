# 弹出层

创建从上、下、左、右或中心出现的移动端模态容器。Popup 与 Cedar Drawer 共用模态表面控制逻辑，但保留移动端安全区和转场布局。

## 案例

### 弹出位置

```demo
../example/demos/popup-position.vue
```

### 遮罩样式

```demo
../example/demos/overlay-style.vue
```

### 事件

```demo
../example/demos/event.vue
```

<!-- api-review:start -->
### 功能调试

```demo
../example/demos/api-review.vue
```

<!-- api-review:end -->

## API

动效覆写示例（变量放在实际挂载宿主）：

```demo
../example/demos/motion-token.vue
```

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model:open` | 是否显示 | `boolean` | - |
| `default-open` | 非受控模式下是否默认显示 | `boolean` | `false` |
| `placement` | 出现位置 | `'top' \| 'bottom' \| 'right' \| 'left' \| 'center'` | `'center'` |
| `overlay` | 是否显示遮罩 | `boolean` | `true` |
| `overlay-class` / `overlay-style` | 遮罩类名 / 样式 | `string / object` | - |
| `overlay-closable` | 点击遮罩是否关闭 | `boolean` | `true` |
| `transition` | 内容转场名称 | `string` | 按 placement 推导 |
| `overlay-animation-name` | 遮罩转场名称 | `string` | `mp-fade` |
| `unstyled` | 移除默认背景、文字颜色与 elevation | `boolean` | `false` |
| `lock-scroll` | 是否锁定挂载容器滚动 | `boolean` | `true` |
| `esc-to-close` | ESC 是否关闭 | `boolean` | `true` |
| `close-on-route-change` | 路由变化时是否关闭 | `boolean` | `false` |
| `unmount-on-close` | 为 false 时内容从初始关闭状态即挂载并保留；为 true 时关闭动画后卸载 | `boolean` | `false` |
| `popup-container` | 挂载容器 | `string \| HTMLElement \| false` | `body` |
| `safe-area-inset-bottom` | 是否适配底部安全区 | `boolean` | `false` |
| `safe-area-inset-top` | 是否适配顶部安全区 | `boolean` | `false` |
| `z-index` | 自定义层级 | `number` | 自动分配 |

事件：`update:open`、`open`、`opened`、`close`、`closed`、`click-overlay(MouseEvent)`、`key-escape(KeyboardEvent)`。

`placement` 描述弹层相对容器的位置；组件内部内容排布仍使用 `direction`。`route-change` 不再作为生命周期事件，需关闭时显式开启 `close-on-route-change`。

### 样式变量

| 变量名 | 默认值 |
| --- | --- |
| `--mp-popup-overlay-background-color` | `var(--mp-sys-color-scrim)` |
| `--mp-popup-content-background-color` | `var(--mp-sys-color-surface-raised)` |
| `--mp-popup-content-text-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-popup-transition-duration` | `250ms` |
| `--mp-popup-transition-timing-function` | `ease` |

遮罩变量只压暗背景层；内容背景／文字组成 raised 表面的配色对，暗色主题继承同一语义。`unstyled` 同时关闭默认背景和文字颜色。可通过 style 在内容节点设置内容变量，通过 overlay-style 设置遮罩变量；或在实际共同祖先设置 system 变量。Teleport 不会从原调用位置继承变量。Dialog 使用独立的遮罩变量，不受 Popup 组件变量影响。

### 焦点管理

内置 fade、center 缩放与四方向 pop 和内容／遮罩基础过渡消费 duration／timing-function 两项 Token，默认仍为 250ms／ease。要整层统一覆写，设置在 Teleport 后实际共同祖先或 popup-container 宿主；style 仅覆盖内容，overlay-style 仅覆盖遮罩。使用有效、非负 CSS 时间。prefers-reduced-motion: reduce 优先关闭内置过渡及起始位移／缩放；自定义动画由业务适配，编译检查及显式 0ms 都不代表真实 OS 偏好验收。

unmount-on-close=true 时关闭途中保留内容，完成回调后卸载；关闭前锁不会提前释放。快速重开取消关闭并保留插槽状态。opened／closed 每个有效阶段只发一次，销毁后不再补发；没有固定 250ms JS 定时器。初始打开仍沿用 mounted 通知，不承诺完整 appear 计时；自定义转场或内容与外层时长不同需要业务自行协调。

打开时焦点进入实际 dialog 面板，Tab/Shift+Tab 在可用控件间循环，跳过隐藏和禁用项。嵌套弹层由最上层接管；关闭后回到打开它的控件。应用必须保留触发器节点；内部焦点根标记不应由业务覆盖。
