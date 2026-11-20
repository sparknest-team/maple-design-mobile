<!-- Source: src/popup/docs/en-US.md; locale: en-US; page: /en-US/popup -->

# Popup

Mobile modal surface entering from the top, bottom, left, right, or center. Popup shares its modal controller with Cedar Drawer while retaining mobile safe-area and transition presentation.

## Basic examples

### Basic usage

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

## Positioning and overlay

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

## Events and motion

### Events


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

### Motion duration

Example source: src/popup/example/demos/motion-token.vue

```vue
<script setup>
import { ref } from 'vue'
import { demoEnglish as english } from '@maple-design/cli-vue/demo-language'

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

## Loading and waiting

### Controlled loading

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `loading` | Explicit business loading state | `boolean` | `false` |

External loading blocks close/switch requests; internal before-hook waiting is merged for display.


Set loading explicitly to display feedback. Ordinary event return values do not drive loading. Before hooks retain their documented pending behavior.

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

## Usage notes

### Focus management

Built-in fade, center scaling, four-direction pop and base content/scrim transitions consume duration/timing-function tokens, retaining 250ms/ease defaults. Whole-layer overrides belong on the actual post-Teleport common ancestor or popup-container host. style affects content only; overlay-style affects scrim only. Use valid nonnegative CSS times. prefers-reduced-motion: reduce overrides built-in transitions/initial displacement/scaling. Business code adapts custom animations.

With unmount-on-close=true, content remains during closing and unmounts after completion; close locks are not released early. Rapid reopening cancels closing and retains slot state. opened/closed fire once per valid phase, never after destruction. No fixed 250ms JS timer is used. Initial opening retains mounted notification without promising complete appear timing. Business code must coordinate custom transitions or differing inner/outer durations.

Opening focuses the actual dialog panel. Tab/Shift+Tab cycle through available controls, skipping hidden/disabled elements. The topmost nested popup owns focus handling; closing restores its opener. Applications must retain trigger nodes and must not override internal focus-root markers.

### Landscape safe areas

Use `safe-area-inset-left` and `safe-area-inset-right` to add safe-area padding on the sides. Both default to `false`. See [SafeArea](#/en-US/safe-area) for host insets and nested containers.

### Closing by pulling the header

Enable `swipe-to-close` for bottom popups and mark draggable header areas with `data-popup-swipe-handle`. It is off by default and inactive at other placements. `swipe-threshold` defaults to 40 layout CSS px, including under parent scaling. Closing requests `update:open(false)` and emits `swipe-close(PointerEvent)` only if final movement is downward and reaches the threshold. Small/horizontal/canceled gestures, buttons/inputs and body scrolling do not close. Rejected controlled requests retain the popup and restore its position. Existing Esc/scrim/close controls remain.

The vertical threshold accounts for vertical scaling independently of horizontal scaling; gesture conversion under rotation or skew is not specified.

```html
<mp-popup v-model:open="open" placement="bottom" swipe-to-close>
  <header data-popup-swipe-handle>Edit information</header>
  <main>Popup content</main>
</mp-popup>
```

Maple field editors allow dragging blank header areas to cancel drafts by default; pending asynchronous confirmation disables gestures. ActionSheet can explicitly set swipe-to-close/swipe-threshold; default titles are marked, while custom title slots must mark their own drag area.
# Asynchronous close interception


Reasons: `overlay`, `escape`, `route`, `swipe`, `close`, `api`, `model`. The default slot provides `{ close, pending }`; `close` buttons should call `close('close', event)`. Instance `close()` uses `api`; `requestClose(reason, event)` specifies a reason and returns `Promise<boolean>`. External `open`=`false` uses `model`; rejection emits `update:open(true)`, which controlled parents should accept. Only enabled `close` entries request closing.

Adding, replacing, or removing `before-close` does not change the current `open` state; in controlled mode the parent continues to update `open`.

Direct destruction, removing `v-if` or destroying a route page is not a close request and cannot await internal guards. Await `requestClose()` before those parent actions. Keep business confirmation in `beforeCommit`; a close guard does not replace validation. The theme page's complete form demonstrates delayed allowance/rejection/errors and all close entries.

Popup close()/requestClose() and external open=false are guarded. Dialog on both ends and Cedar Drawer instance/service close() are direct commands with a different responsibility. Await `Promise<boolean>` when Popup confirmation is required; do not infer behavior from matching method names.

## API

### Popup Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `loading` | Business loading state, combined with the close guard pending state | `boolean` | `false` |
| `dir` | Reading direction; inherited from the source scope when omitted | `'ltr' \| 'rtl'` | `-` |
| `before-close` | Explicit close guard receiving the reason, completion callback, and context | `PopupBeforeClose` | `-` |
| `v-model:open` | Visible state | `boolean` | - |
| `default-open` | Whether to display by default in uncontrolled mode | `boolean` | `false` |
| `placement` | Panel region at a container edge or center, default center. It is not trigger-relative and does not automatically flip | `'top' \| 'bottom' \| 'right' \| 'left' \| 'center'` | `'center'` |
| `swipe-to-close` | Enable swipe-to-close in the designated header area of a bottom popup | `boolean` | `false` |
| `swipe-threshold` | Swipe-to-close threshold in layout CSS pixels | `number` | `40` |
| `overlay` | Show the overlay | `boolean` | `true` |
| `overlay-class` | Overlay class | `string` | `-` |
| `overlay-style` | Overlay style | `object` | `-` |
| `overlay-closable` | Close after an overlay click | `boolean` | `true` |
| `transition` | Content transition name | `string` | Derived from placement |
| `overlay-animation-name` | Overlay transition name | `string` | `mp-fade` |
| `unstyled` | Remove the default background, text color and elevation | `boolean` | `false` |
| `lock-scroll` | Lock scrolling on the host | `boolean` | `true` |
| `esc-to-close` | Close on Escape | `boolean` | `true` |
| `close-on-route-change` | Close after a route change | `boolean` | `false` |
| `unmount-on-close` | False mounts and preserves content even when initially closed; true unmounts after leaving | `boolean` | `false` |
| `popup-container` | Portal container | `string \| HTMLElement \| false` | `body` |
| `safe-area-inset-bottom` | Apply the bottom safe-area inset | `boolean` | `false` |
| `safe-area-inset-top` | Apply the top safe-area inset | `boolean` | `false` |
| `safe-area-inset-right` | Apply the right safe-area inset | `boolean` | `false` |
| `safe-area-inset-left` | Apply the left safe-area inset | `boolean` | `false` |
| `z-index` | Outer stacking level | `number` | Automatically distributed |

### Popup Events

| Event | Arguments | Description |
| --- | --- | --- |
| `update:open` | `boolean` | Request that the parent update the open state |
| `open` | - | The popup starts opening |
| `opened` | - | Opening has completed |
| `close` | - | The popup starts closing |
| `closed` | - | Closing has completed |
| `click-overlay` | `MouseEvent` | The overlay was clicked |
| `key-escape` | `KeyboardEvent` | The topmost popup received Escape |
| `swipe-close` | `PointerEvent` | A swipe close request passed the guard |
| `close-error` | `error: unknown, reason: PopupCloseReason` | The close guard threw or returned a rejected Promise |

### Popup Slots

| Slot | Prop | Description |
| --- | --- | --- |
| `default` | `{ close, pending }` | Popup content; `close(reason?, event?)` returns `Promise<boolean>` |

### Popup Methods

| Method | Parameters and return value | Description |
| --- | --- | --- |
| `close` | `(event?: Event) => Promise<boolean>` | Request closing with the `api` reason |
| `requestClose` | `(reason?: PopupCloseReason, event?: Event) => Promise<boolean>` | Request closing with the specified reason |
| `pending` | `boolean` | Current manual loading or guard pending state |

`placement` describes the popup position relative to its container; `dir` controls reading direction. `route-change` is not a lifecycle event; explicitly enable `close-on-route-change` to close on navigation.

## Close guards



Synchronous logging-only hooks must explicitly return true; synchronous undefined means awaiting a callback. Earlier `Promise<void>` hooks without done now allow closing when their Promise resolves.

Popup reasons: overlay, escape, route, swipe, close, api, model. Rejecting external open=false requests update:open(true). Direct destruction cannot await hooks; await requestClose() first.


Cancellable hooks use `(payload, done, context)`: closure payloads contain `{ action }`, change/commit payloads contain `{ value, previousValue }`, and Popup uses `{ reason }`. Context provides `signal` and an optional original `event`. Return a boolean/Promise, or call done()/done(false). Synchronous void waits for done; Promise&lt;void&gt; allows the operation. First completion wins. Pending state controls loading/disabled automatically. Cancellation invalidates stale results. Button refs are not exposed.

### Async operation feedback

Awaited before-* hooks show loading feedback and aria-busy. Rejection or failure restores interaction; repeated input does not start the same operation again. Ordinary event return Promises do not participate in loading.

## CSS Variables

Scrim variables dim only the background. Content background/text form a raised-surface color pair, with dark themes inheriting the same semantics. `unstyled` disables default background/text colors together. style sets content variables, overlay-style scrim variables, or place system variables on an actual common ancestor. Teleport does not inherit from the original call site. Dialog uses independent scrim variables unaffected by Popup variables.

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-popup-content-background-color` | `var(--mp-sys-color-surface-raised)` | `background-color` |
| `--mp-popup-content-text-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-popup-overlay-background-color` | `var(--mp-sys-color-scrim)` | `background-color` |
| `--mp-popup-transition-duration` | `250ms` | `transition` |
| `--mp-popup-transition-timing-function` | `ease` | `transition` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-popup-content-background-color: var(--mp-sys-color-surface-raised);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
