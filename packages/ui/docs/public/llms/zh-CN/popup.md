<!-- Source: src/popup/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/popup -->

# 弹出层

创建从上、下、左、右或中心出现的移动端模态容器。Popup 与 Cedar Drawer 共用模态表面控制逻辑，但保留移动端安全区和转场布局。

## 基础示例

### 基础用法

Example source: src/popup/example/demos/basic.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <mp-button @click="open = true">打开弹出层</mp-button>
  <mp-popup v-model:open="open">
    <div style="padding: 24px">
      <p>弹出层的基础内容。</p>
      <mp-button @click="open = false">关闭</mp-button>
    </div>
  </mp-popup>
</template>
```

## 位置与遮罩

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

## 事件与动效

### 事件

Example source: src/popup/example/demos/event.vue

```vue
<script setup>
import { reactive, toRefs } from 'vue'
import { Message } from '@maple-design/ui-vue'

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

### 动效时长

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

## 加载与等待

### 受控加载

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `loading` | 业务显式控制的加载状态 | `boolean` | `false` |

外部 loading 暂停关闭／切换操作；内部 before 守卫等待与它合并展示。


通过 loading 显式展示等待；普通事件返回值不参与加载。before-* 守卫按其契约管理内部等待状态。

Example source: src/popup/example/demos/loading.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)
const open = ref(false)
const beforeWait = () => new Promise<boolean>((resolve) => setTimeout(() => resolve(true), 800))
</script>
<template>
  <mp-space direction="column" style="width: 100%" :size="16">
    <mp-form layout="vertical"
      ><mp-form-item label="加载状态 / Loading"><mp-switch v-model="loading" /></mp-form-item
    ></mp-form>
    <mp-button @click="open = true">打开弹层 / Open</mp-button
    ><mp-popup v-model:open="open" :before-close="beforeWait" :loading="loading"
      ><mp-space direction="column"
        ><p>业务控制加载 / Controlled loading</p>
        <mp-button @click="loading = !loading">切换加载 / Toggle loading</mp-button
        ><mp-button @click="open = false">关闭 / Close</mp-button></mp-space
      ></mp-popup
    >
    <p>
      通过 loading 显式控制等待展示，普通事件返回 Promise 不会自动加载。Loading is controlled by business state.
      关闭手动加载后切换或关闭，观察 before 守卫的自动等待反馈。
    </p>
  </mp-space>
</template>
```

## 使用说明

### 焦点管理

内置 fade、center 缩放与四方向 pop 和内容／遮罩基础过渡消费 duration／timing-function 两项 Token，默认仍为 250ms／ease。要整层统一覆写，设置在 Teleport 后实际共同祖先或 popup-container 宿主；style 仅覆盖内容，overlay-style 仅覆盖遮罩。使用有效、非负 CSS 时间。prefers-reduced-motion: reduce 优先关闭内置过渡及起始位移／缩放；自定义动画由业务适配。

unmount-on-close=true 时关闭途中保留内容，完成回调后卸载；关闭前锁不会提前释放。快速重开取消关闭并保留插槽状态。opened／closed 每个有效阶段只发一次，销毁后不再补发；没有固定 250ms JS 定时器。初始打开仍沿用 mounted 通知，不承诺完整 appear 计时；自定义转场或内容与外层时长不同需要业务自行协调。

打开时焦点进入实际 dialog 面板，Tab/Shift+Tab 在可用控件间循环，跳过隐藏和禁用项。嵌套弹层由最上层接管；关闭后回到打开它的控件。应用必须保留触发器节点；内部焦点根标记不应由业务覆盖。

### 横屏安全区

通过 `safe-area-inset-left`、`safe-area-inset-right` 为左右两侧增加安全区留白，默认均为 `false`。宿主边距与嵌套容器的用法见 [SafeArea](#/zh-CN/safe-area)。

### 从头部下拉关闭

底部弹层设置 `swipe-to-close`，在可拖动标题区域添加 `data-popup-swipe-handle`。默认关闭；其他 placement 不触发。`swipe-threshold` 默认 40，单位为布局 CSS px（父级缩放时也保持一致）。手势结束前最后的移动方向为向下，且位移达到阈值才请求 `update:open(false)` 并发出 `swipe-close(PointerEvent)`。位移不足、横向手势、pointercancel、按钮/输入框和正文滚动不会关闭；受控父级拒绝时弹层保留并回到原位。已有 Esc、遮罩、关闭按钮继续可用。

阈值按垂直方向的缩放换算，支持水平和垂直比例不同的缩放；不承诺旋转或倾斜变换的手势换算。

```html
<mp-popup v-model:open="open" placement="bottom" swipe-to-close>
  <header data-popup-swipe-handle>编辑信息</header>
  <main>弹层内容</main>
</mp-popup>
```

Maple 字段编辑弹层默认从标题空白处下拉取消草稿；异步确认 pending 时禁用手势。ActionSheet 可以显式设置 swipe-to-close / swipe-threshold，默认标题已标记；自定义 title 插槽需自行标记拖动区域。
# 异步关闭拦截


关闭原因包括 `overlay`、`escape`、`route`、`swipe`、`close`、`api`、`model`。默认插槽提供 `{ close, pending }`，关闭按钮应调用 `close('close', event)`；实例 `close()` 使用 `api`，`requestClose(reason, event)` 可指定原因并返回 `Promise<boolean>`。外部将 `open` 设为 `false` 使用 `model`，拒绝后会发送 `update:open(true)`，受控父组件应正常接收该事件。只有启用对应关闭能力的入口会发起请求。

动态添加、更换或移除 `before-close` 不会改变当前开关状态；受控模式仍由父组件更新 `open`。

直接销毁组件、移除 `v-if` 或销毁路由页面不属于关闭请求，无法等待组件内的异步拦截；在父级执行这些操作前等待 `requestClose()` 的结果。业务表单确认继续使用 `beforeCommit`，不要用关闭 guard 替代数据校验。主题页完整表单提供延迟允许、拒绝、报错与各关闭入口的验证弹层。

Popup 的 close()/requestClose() 和外部 open=false 会经过守卫；两端 Dialog 与 Cedar Drawer 的实例或服务 close() 是直接关闭命令，职责不同。Popup 关闭前需要确认时等待 `Promise<boolean>`，不要依赖同名方法推断行为。

## API

### Popup Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `loading` | 业务等待状态；与关闭守卫等待状态合并 | `boolean` | `false` |
| `dir` | 阅读方向；省略时继承来源作用域 | `'ltr' \| 'rtl'` | `-` |
| `before-close` | 显式关闭守卫，接收原因、完成回调和上下文 | `PopupBeforeClose` | `-` |
| `v-model:open` | 是否显示 | `boolean` | - |
| `default-open` | 非受控模式下是否默认显示 | `boolean` | `false` |
| `placement` | 弹层在容器四边或中央的放置区域，默认 center；不是相对触发器的方位，不自动翻转 | `'top' \| 'bottom' \| 'right' \| 'left' \| 'center'` | `'center'` |
| `swipe-to-close` | 在底部弹层的指定头部区域启用下滑关闭 | `boolean` | `false` |
| `swipe-threshold` | 下滑关闭阈值，单位为布局 CSS px | `number` | `40` |
| `overlay` | 是否显示遮罩 | `boolean` | `true` |
| `overlay-class` | 遮罩类名 | `string` | `-` |
| `overlay-style` | 遮罩样式 | `object` | `-` |
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
| `safe-area-inset-right` | 是否适配右侧安全区 | `boolean` | `false` |
| `safe-area-inset-left` | 是否适配左侧安全区 | `boolean` | `false` |
| `z-index` | 最外层层级 | `number` | 自动分配 |

### Popup Events

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `update:open` | `boolean` | 请求父组件更新显示状态 |
| `open` | - | 弹层开始打开 |
| `opened` | - | 打开完成 |
| `close` | - | 弹层开始关闭 |
| `closed` | - | 关闭完成 |
| `click-overlay` | `MouseEvent` | 点击遮罩 |
| `key-escape` | `KeyboardEvent` | 顶层弹层收到 Escape |
| `swipe-close` | `PointerEvent` | 下滑关闭请求通过守卫 |
| `close-error` | `error: unknown, reason: PopupCloseReason` | 关闭守卫抛错或拒绝 Promise |

### Popup Slots

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `default` | `{ close, pending }` | 弹层内容；`close(reason?, event?)` 返回 `Promise<boolean>` |

### Popup Methods

| 方法 | 参数与返回值 | 说明 |
| --- | --- | --- |
| `close` | `(event?: Event) => Promise<boolean>` | 以 `api` 原因请求关闭 |
| `requestClose` | `(reason?: PopupCloseReason, event?: Event) => Promise<boolean>` | 按指定原因请求关闭 |
| `pending` | `boolean` | 当前手动加载或守卫等待状态 |

`placement` 描述弹层相对容器的位置；`dir` 控制阅读方向。`route-change` 不是生命周期事件，需关闭时显式开启 `close-on-route-change`。

## 关闭守卫



只记录日志的同步钩子应显式 return true；同步 undefined 表示仍在等待回调。注意：以前返回 `Promise<void>` 却不调用 done 的异步钩子，现在会在 Promise 完成后放行。

Popup 原因为 overlay、escape、route、swipe、close、api、model。拒绝外部 open=false 时请求 update:open(true)。直接销毁组件不能等待内部钩子，应先 await requestClose()。


守卫统一使用 `(payload, done, context)`：关闭 payload 为 `{ action }`，切换和提交为 `{ value, previousValue }`，Popup 为 `{ reason }`。context 提供 `signal` 和可选原始 `event`。返回 boolean/Promise，或调用 done()/done(false)；同步 void 等待 done，Promise&lt;void&gt; 放行。首次完成生效。等待期间自动管理 loading/disabled，取消后旧结果失效，不暴露内部按钮 refs。

### 异步操作反馈

before-* 等待期间显示加载反馈并标记 aria-busy；拒绝或失败后恢复，重复提交不再启动同一操作。普通事件返回的 Promise 不参与加载。

## CSS Variables

遮罩变量只压暗背景层；内容背景／文字组成 raised 表面的配色对，暗色主题继承同一语义。`unstyled` 同时关闭默认背景和文字颜色。可通过 style 在内容节点设置内容变量，通过 overlay-style 设置遮罩变量；或在实际共同祖先设置 system 变量。Teleport 不会从原调用位置继承变量。Dialog 使用独立的遮罩变量，不受 Popup 组件变量影响。

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-popup-content-background-color` | `var(--mp-sys-color-surface-raised)` | `background-color` |
| `--mp-popup-content-text-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-popup-overlay-background-color` | `var(--mp-sys-color-scrim)` | `background-color` |
| `--mp-popup-transition-duration` | `250ms` | `transition` |
| `--mp-popup-transition-timing-function` | `ease` | `transition` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-popup-content-background-color: var(--mp-sys-color-surface-raised);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
