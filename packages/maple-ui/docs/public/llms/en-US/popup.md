<!-- Source: src/popup/docs/en-US.md; locale: en-US; page: /en-US/popup -->

# Popup

Mobile modal surface entering from the top, bottom, left, right, or center. Popup shares its modal controller with Cedar Drawer while retaining mobile safe-area and transition presentation.

## 案例

### Placement

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

### Overlay style

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

### Events

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

Motion override example (tokens on the actual Teleport host):

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

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `v-model:open` | Visibility | `boolean` | - |
| `default-open` | Initial visibility when uncontrolled | `boolean` | `false` |
| `placement` | Surface placement | `'top' \| 'bottom' \| 'right' \| 'left' \| 'center'` | `'center'` |
| `overlay` | Show the overlay | `boolean` | `true` |
| `overlay-class` / `overlay-style` | Overlay class / style | `string / object` | - |
| `overlay-closable` | Close after an overlay click | `boolean` | `true` |
| `transition` | Content transition name | `string` | derived from placement |
| `overlay-animation-name` | Overlay transition name | `string` | `mp-fade` |
| `unstyled` | Remove the default background, text color and elevation | `boolean` | `false` |
| `lock-scroll` | Lock scrolling on the mount container | `boolean` | `true` |
| `esc-to-close` | Close on Escape | `boolean` | `true` |
| `close-on-route-change` | Close after a route change | `boolean` | `false` |
| `unmount-on-close` | False mounts and preserves content even when initially closed; true unmounts after leaving | `boolean` | `false` |
| `popup-container` | Mount container | `string \| HTMLElement \| false` | `body` |
| `safe-area-inset-bottom` | Apply the bottom safe-area inset | `boolean` | `false` |
| `safe-area-inset-top` | Apply the top safe-area inset | `boolean` | `false` |
| `z-index` | Explicit layer index | `number` | allocated |

Events: `update:open`, `open`, `opened`, `close`, `closed`, `click-overlay(MouseEvent)`, and `key-escape(KeyboardEvent)`.

`route-change` is not a lifecycle event. Enable `close-on-route-change` when route navigation should close the surface.

### Style variables

| Variable | Default |
| --- | --- |
| `--mp-popup-overlay-background-color` | `var(--mp-sys-color-scrim)` |
| `--mp-popup-content-background-color` | `var(--mp-sys-color-surface-raised)` |
| `--mp-popup-content-text-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-popup-transition-duration` | `250ms` |
| `--mp-popup-transition-timing-function` | `ease` |

The overlay token dims only the backdrop; content background/text form a raised surface pair. Dark themes inherit these roles. `unstyled` disables both default background and text colors. Apply content variables on the content element using `style`, and backdrop variables through `overlay-style`, or set system variables on their actual shared ancestor. Teleport does not inherit variables from the reference subtree. Dialog owns a separate backdrop token.

### Focus management

Built-in fade, center scale, four-side pops and base content/backdrop transitions consume the duration/timing-function tokens, retaining 250ms/ease defaults. Set both on the actual shared ancestor/Teleport host for whole-surface overrides; style affects content only and overlay-style the backdrop only. Use valid nonnegative CSS time values. prefers-reduced-motion: reduce takes priority and stops built-in transitions and starting movement. Custom animations remain caller-owned; compiled CSS and explicit 0ms overrides do not certify real OS preference switching.

With unmount-on-close=true, content and locks remain through leaving and are released after completion. Rapid reopening cancels closing and preserves slot state. opened/closed fire once per valid phase; callbacks after disposal are ignored. There is no fixed 250ms JS timer. Initial-open mounted notification behavior remains unchanged, not a promise of full appear timing. Custom or mismatched inner/outer transitions require caller coordination.

Opening focuses the actual dialog panel. Tab/Shift+Tab wrap among enabled, visible controls. The topmost nested modal owns focus; closing restores its opening control. Keep the opener mounted and do not override the internal focus-root marker.

### Landscape safe areas

`safe-area-inset-left` / `safe-area-inset-right` (boolean, default false) complement the existing top/bottom flags. Native overrides and nested consumption follow [SafeArea](#/en-US/safe-area).

### Swipe dismissal

For bottom placement, opt in with `swipe-to-close` and mark a noninteractive header with `data-popup-swipe-handle`. `swipe-threshold` defaults to 40 layout CSS px and accounts for ancestor scaling. A sufficient downward gesture requests update:open(false) and emits swipe-close(PointerEvent). Short/upward/horizontal gestures, pointer cancellation, body scrolling and interactive header controls do not dismiss. Controlled refusal keeps the sheet open. Field editors opt in and cancel unconfirmed drafts; pending confirmation disables dismissal. ActionSheet forwards both props; custom title slots must mark their handle.

## Before hooks and callback compatibility

`beforeClose(reason, done)` is the only hook entry. No new closeGuard/confirmGuard/cancelGuard prop is introduced.

Return true/false or `Promise<boolean>`; an async function resolving void allows completion. For callbacks, call done() to allow or done(false) to reject. A synchronous void return waits for done(), so a callback may finish later. First completion wins if callbacks and returned values compete. Pending operations are deduplicated. Throws/rejections preserve the surface and restore temporary button state. The callable done also exposes signal/event for cancellation-aware tasks; Dialog/Drawer retain the original third refs argument. A cancelled or replaced hook cannot commit a late result.

A before hook that only logs synchronously must explicitly return true; synchronous undefined means callback completion is still pending. Old async callbacks that returned `Promise<void>` without calling done now complete on Promise resolution.

Popup reasons: overlay, escape, route, swipe, close, api, model. Rejected external open=false emits update:open(true). Removing a component cannot await its hook; await requestClose() before destroying it.
