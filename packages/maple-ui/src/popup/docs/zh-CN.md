# 弹出层

创建从上、下、左、右或中心出现的移动端模态容器。Popup 与 Cedar Drawer 共用模态表面控制逻辑，但保留移动端安全区和转场布局。

## 基础示例

### 基础用法

```demo
../example/demos/basic.vue
```

## 位置与遮罩

### 弹出位置

```demo
../example/demos/popup-position.vue
```

### 遮罩样式

```demo
../example/demos/overlay-style.vue
```

## 事件与动效

### 事件

```demo
../example/demos/event.vue
```

### 动效时长

动效覆写示例（变量放在实际挂载宿主）：

```demo
../example/demos/motion-token.vue
```

## 加载与等待

### 受控加载

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `loading` | 业务显式控制的加载状态 | `boolean` | `false` |

外部 loading 暂停关闭／切换操作；内部 before 守卫等待与它合并展示。


通过 loading 显式展示等待；普通事件返回值不参与加载。before-* 守卫按其契约管理内部等待状态。

```demo
../example/demos/loading.vue
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model:open` | 是否显示 | `boolean` | - |
| `default-open` | 非受控模式下是否默认显示 | `boolean` | `false` |
| `placement` | 弹层在容器四边或中央的放置区域，默认 center；不是相对触发器的方位，不自动翻转 | `'top' \| 'bottom' \| 'right' \| 'left' \| 'center'` | `'center'` |
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

### Landscape safe areas

`safe-area-inset-left` / `safe-area-inset-right` (boolean, default false) complement the existing top/bottom flags. Native overrides and nested consumption follow [SafeArea](#/zh-CN/safe-area).

### 从头部下拉关闭

底部弹层设置 `swipe-to-close`，在可拖动标题区域添加 `data-popup-swipe-handle`。默认关闭；其他 placement 不触发。`swipe-threshold` 默认 40，单位为布局 CSS px（父级缩放时也保持一致）。手势结束前最后的移动方向为向下，且位移达到阈值才请求 `update:open(false)` 并发出 `swipe-close(PointerEvent)`。位移不足、横向手势、pointercancel、按钮/输入框和正文滚动不会关闭；受控父级拒绝时弹层保留并回到原位。已有 Esc、遮罩、关闭按钮继续可用。

```html
<mp-popup v-model:open="open" placement="bottom" swipe-to-close>
  <header data-popup-swipe-handle>编辑信息</header>
  <main>弹层内容</main>
</mp-popup>
```

Maple 字段编辑弹层默认从标题空白处下拉取消草稿；异步确认 pending 时禁用手势。ActionSheet 可以显式设置 swipe-to-close / swipe-threshold，默认标题已标记；自定义 title 插槽需自行标记拖动区域。
# 异步关闭拦截


关闭原因包括 `overlay`、`escape`、`route`、`swipe`、`close`、`api`、`model`。默认插槽提供 `{ close, pending }`，关闭按钮应调用 `close('close', event)`；实例 `close()` 使用 `api`，`requestClose(reason, event)` 可指定原因并返回 `Promise<boolean>`。外部将 `open` 设为 `false` 使用 `model`，拒绝后会发送 `update:open(true)`，受控父组件应正常接收该事件。只有启用对应关闭能力的入口会发起请求。

直接销毁组件、移除 `v-if` 或销毁路由页面不属于关闭请求，无法等待组件内的异步拦截；在父级执行这些操作前等待 `requestClose()` 的结果。业务表单确认继续使用 `beforeCommit`，不要用关闭 guard 替代数据校验。主题页完整表单提供延迟允许、拒绝、报错与各关闭入口的验证弹层。

## before 钩子与 done 兼容



只记录日志的同步钩子应显式 return true；同步 undefined 表示仍在等待回调。注意：以前返回 `Promise<void>` 却不调用 done 的异步钩子，现在会在 Promise 完成后放行。

Popup 原因为 overlay、escape、route、swipe、close、api、model。拒绝外部 open=false 时请求 update:open(true)。直接销毁组件不能等待内部钩子，应先 await requestClose()。


守卫统一使用 `(payload, done, context)`：关闭 payload 为 `{ action }`，切换和提交为 `{ value, previousValue }`，Popup 为 `{ reason }`。context 提供 `signal` 和可选原始 `event`。返回 boolean/Promise，或调用 done()/done(false)；同步 void 等待 done，Promise&lt;void&gt; 放行。首次完成生效。等待期间自动管理 loading/disabled，取消后旧结果失效，不暴露内部按钮 refs。

### 守卫等待反馈

before-* 等待期间显示加载反馈并标记 aria-busy；拒绝或失败后恢复，重复提交不再启动同一操作。普通事件返回的 Promise 不参与加载。
