<!-- Source: src/popup/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/popup -->

# 弹出层

创建从上、下、左、右或中心出现的移动端模态容器。Popup 与 Cedar Drawer 共用模态表面控制逻辑，但保留移动端安全区和转场布局。

## 案例

### 弹出位置

Example source: src/popup/example/demos/popup-position.vue

```vue
<script setup>
import { reactive, toRefs } from 'vue'

const values = reactive({
  center: false,
  top: false,
  bottom: false,
  left: false,
  right: false,
  overlayClass: false,
  overlayStyle: false,
  event: false,
})
const { center, top, bottom, left, right, overlayClass, overlayStyle, event } = toRefs(values)
</script>

<template>
  <mp-space direction="column" :size="['3vmin', '4vmin']">
    <mp-button status="primary" block @click="center = true">居中弹出</mp-button>
    <mp-button status="primary" block @click="bottom = true">下方弹出</mp-button>
    <mp-button status="primary" block @click="top = true">上方弹出</mp-button>
    <mp-button status="primary" block @click="left = true">左侧弹出</mp-button>
    <mp-button status="primary" block @click="right = true">右侧弹出</mp-button>
  </mp-space>

  <mp-popup v-model:open="center">
    <div class="block">
      素胚勾勒出青花笔锋浓转淡, 瓶身描绘的牡丹一如你初妆, 冉冉檀香透过窗心事我了然, 宣纸上走笔至此搁一半。
    </div>
  </mp-popup>
  <mp-popup v-model:open="bottom" placement="bottom">
    <div class="block">
      素胚勾勒出青花笔锋浓转淡, 瓶身描绘的牡丹一如你初妆, 冉冉檀香透过窗心事我了然, 宣纸上走笔至此搁一半。
    </div>
  </mp-popup>
  <mp-popup v-model:open="top" placement="top">
    <div class="block">
      素胚勾勒出青花笔锋浓转淡, 瓶身描绘的牡丹一如你初妆, 冉冉檀香透过窗心事我了然, 宣纸上走笔至此搁一半。
    </div>
  </mp-popup>
  <mp-popup v-model:open="left" placement="left">
    <div class="block">
      素胚勾勒出青花笔锋浓转淡, 瓶身描绘的牡丹一如你初妆, 冉冉檀香透过窗心事我了然, 宣纸上走笔至此搁一半。
    </div>
  </mp-popup>
  <mp-popup v-model:open="right" placement="right">
    <div class="block">
      素胚勾勒出青花笔锋浓转淡, 瓶身描绘的牡丹一如你初妆, 冉冉檀香透过窗心事我了然, 宣纸上走笔至此搁一半。
    </div>
  </mp-popup>
</template>

<style>
.custom-overlay {
  background: rgba(0, 0, 0, 0.3);
}
</style>

<style lang="less" scoped>
.block {
  padding: 24px;
  width: 280px;
}
</style>
```

### 遮罩样式

Example source: src/popup/example/demos/overlay-style.vue

```vue
<script setup>
import { reactive, toRefs } from 'vue'

const values = reactive({
  center: false,
  top: false,
  bottom: false,
  left: false,
  right: false,
  overlayClass: false,
  overlayStyle: false,
  event: false,
})
const { center, top, bottom, left, right, overlayClass, overlayStyle, event } = toRefs(values)
</script>

<template>
  <mp-space direction="column" :size="['3vmin', '4vmin']">
    <mp-button status="primary" block @click="overlayClass = true">背景层class</mp-button>
    <mp-button status="primary" block @click="overlayStyle = true">背景层样式</mp-button>
  </mp-space>

  <mp-popup v-model:open="overlayClass" overlay-class="custom-overlay">
    <div class="block">
      素胚勾勒出青花笔锋浓转淡, 瓶身描绘的牡丹一如你初妆, 冉冉檀香透过窗心事我了然, 宣纸上走笔至此搁一半。
    </div>
  </mp-popup>
  <mp-popup
    v-model:open="overlayStyle"
    :overlay-style="{
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    }"
  >
    <div class="block">
      素胚勾勒出青花笔锋浓转淡, 瓶身描绘的牡丹一如你初妆, 冉冉檀香透过窗心事我了然, 宣纸上走笔至此搁一半。
    </div>
  </mp-popup>
</template>

<style>
.custom-overlay {
  background: rgba(0, 0, 0, 0.3);
}
</style>

<style lang="less" scoped>
.block {
  padding: 24px;
  width: 280px;
}
</style>
```

### 事件

Example source: src/popup/example/demos/event.vue

```vue
<script setup>
import { reactive, toRefs } from 'vue'
import { Message } from '@maple-design/ui'

const values = reactive({
  center: false,
  top: false,
  bottom: false,
  left: false,
  right: false,
  overlayClass: false,
  overlayStyle: false,
  event: false,
})
const { center, top, bottom, left, right, overlayClass, overlayStyle, event } = toRefs(values)
</script>

<template>
  <mp-button status="primary" block @click="event = true">注册事件</mp-button>
  <mp-popup
    v-model:open="event"
    @open="Message.info('open')"
    @opened="Message.success('opened')"
    @close="Message.warning('close')"
    @closed="Message.error('closed')"
  >
    <div class="block">
      素胚勾勒出青花笔锋浓转淡, 瓶身描绘的牡丹一如你初妆, 冉冉檀香透过窗心事我了然, 宣纸上走笔至此搁一半。
    </div>
  </mp-popup>
</template>

<style>
.custom-overlay {
  background: rgba(0, 0, 0, 0.3);
}
</style>

<style lang="less" scoped>
.block {
  padding: 24px;
  width: 280px;
}
</style>
```

## API

动效覆写示例（变量放在实际挂载宿主）：

Example source: src/popup/example/demos/motion-token.vue

```vue
<script setup>
import { ref } from 'vue'

defineProps({ english: Boolean })
const open = ref(false)
const host = ref()
</script>

<template>
  <mp-button block @click="open = true">{{ english ? '600ms / linear Popup' : '600ms / linear 弹出层' }}</mp-button>
  <!-- The real Teleport host carries both motion tokens, not just the panel style. -->
  <div ref="host" class="popup-motion-host" />
  <mp-popup v-if="host" v-model:open="open" :popup-container="host" unmount-on-close>
    <div class="popup-motion-content">
      <p>
        {{
          english
            ? 'Content, backdrop and outer fade share these tokens.'
            : '内容、遮罩和外层 fade 共同继承这两项 Token。'
        }}
      </p>
      <mp-button @click="open = false">{{ english ? 'Close after transition' : '动画完成后关闭' }}</mp-button>
    </div>
  </mp-popup>
</template>

<style scoped>
.popup-motion-host {
  --mp-popup-transition-duration: 600ms;
  --mp-popup-transition-timing-function: linear;
}
.popup-motion-content {
  padding: 24px;
  max-width: 280px;
}
</style>
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

`before-close(reason, { signal, event })` 可返回 `false` 拒绝关闭，返回 `true` / `undefined` 允许关闭，也可以返回 Promise。等待期间保持可见、焦点管理和滚动锁，并忽略重复关闭请求；抛错时保留内容并触发 `close-error(error, reason)`。卸载、停用、重新打开或替换 guard 会取消旧任务，过期的成功结果不会关闭新一轮弹层。

关闭原因包括 `overlay`、`escape`、`route`、`swipe`、`close`、`api`、`model`。默认插槽提供 `{ close, pending }`，关闭按钮应调用 `close('close', event)`；实例 `close()` 使用 `api`，`requestClose(reason, event)` 可指定原因并返回 `Promise<boolean>`。外部将 `open` 设为 `false` 使用 `model`，拒绝后会发送 `update:open(true)`，受控父组件应正常接收该事件。只有启用对应关闭能力的入口会发起请求。

直接销毁组件、移除 `v-if` 或销毁路由页面不属于关闭请求，无法等待组件内的异步拦截；在父级执行这些操作前等待 `requestClose()` 的结果。业务表单确认继续使用 `beforeCommit`，不要用关闭 guard 替代数据校验。主题页完整表单提供延迟允许、拒绝、报错与各关闭入口的验证弹层。

## before 钩子与 done 兼容

`beforeClose(reason, done)` 为统一入口，不新增另一套命名。

返回 true/false 或 `Promise<boolean>`；async 函数正常完成且返回 void 时放行。回调方式使用 done() 放行、done(false) 拒绝；同步返回 void 时等待 done，可异步调用。返回值和 done 同时使用时，第一次完成生效。等待中去重；异常保留弹层并恢复临时按钮状态。done 同时携带 signal/event，Dialog/Drawer 原第三参数 refs 保留。关闭、卸载或更换钩子会使旧结果失效。

只记录日志的同步钩子应显式 return true；同步 undefined 表示仍在等待回调。注意：以前返回 `Promise<void>` 却不调用 done 的异步钩子，现在会在 Promise 完成后放行。

Popup 原因为 overlay、escape、route、swipe、close、api、model。拒绝外部 open=false 时请求 update:open(true)。直接销毁组件不能等待内部钩子，应先 await requestClose()。
