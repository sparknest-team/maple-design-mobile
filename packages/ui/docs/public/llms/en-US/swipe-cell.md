<!-- Source: src/swipe-cell/docs/en-US.md; locale: en-US; page: /en-US/swipe-cell -->

# SwipeCell

Swipe cell content left/right to reveal actions, commonly for deletion/favorites in lists.

## Basic examples

### Basic Usage

`name` identifies the item in `open`, `close`, and `before-close` payloads; it does not render text. Put visible content in the default slot, such as `<mp-cell title="Order title" />`. The example shows the emitted name and position.

Swipe left to reveal the right-side action.

Example source: src/swipe-cell/example/demos/basic.vue

```vue
<script setup>
import { ref } from 'vue'

const lastEvent = ref('向左滑动查看 open / close 事件中的 name')
function recordEvent(type, { name, position }) {
  lastEvent.value = `${type}: name=${name}, position=${position}`
}
</script>

<template>
  <div class="swipe-cell-example">
    <mp-swipe-cell name="order-1001" @open="recordEvent('open', $event)" @close="recordEvent('close', $event)">
      <template #right>
        <mp-button status="danger" style="height: 100%; border-radius: 0">删除</mp-button>
      </template>
      <mp-cell title="左滑显示操作" border />
    </mp-swipe-cell>
    <p role="status">{{ lastEvent }}</p>
  </div>
</template>
```

## Directions and actions

### Both Sides

Example source: src/swipe-cell/example/demos/both-sides.vue

```vue
<template>
  <mp-swipe-cell>
    <template #left>
      <mp-button status="primary" style="height: 100%; border-radius: 0">选择</mp-button>
    </template>
    <mp-cell title="两侧均可滑动" border />
    <template #right>
      <mp-button status="danger" style="height: 100%; border-radius: 0">删除</mp-button>
    </template>
  </mp-swipe-cell>
</template>
```

## Async closing control

### Before Close

Example source: src/swipe-cell/example/demos/before-close.vue

```vue
<script setup>
import { Dialog } from '@maple-design/ui-vue'

let confirming = false

async function beforeClose({ position }) {
  if (confirming) {
    return false
  }
  if (position !== 'right') {
    return true
  }

  confirming = true
  try {
    const action = await Dialog.confirm({ title: '确认删除？' })
    return action === 'confirm'
  } finally {
    confirming = false
  }
}
</script>

<template>
  <mp-swipe-cell :before-close="beforeClose">
    <mp-cell title="删除前确认" border />
    <template #right>
      <mp-button status="danger" style="height: 100%; border-radius: 0">删除</mp-button>
    </template>
  </mp-swipe-cell>
</template>
```

`Dialog.confirm(...)` resolves with an action. Only `confirm` allows closing; `cancel` and `close` preserve the revealed actions. The basic Delete button demonstrates closing only; implement data deletion in your application.

## Loading and waiting

### Controlled loading

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `loading` | Explicit business loading state | `boolean` | `false` |

External loading blocks close/switch requests; internal before-hook waiting is merged for display.


Set loading explicitly to display feedback. Ordinary event return values do not drive loading. Before hooks retain their documented pending behavior.

Example source: src/swipe-cell/example/demos/loading.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)
const beforeWait = () => new Promise<boolean>((resolve) => setTimeout(() => resolve(true), 800))
</script>
<template>
  <mp-space direction="column" style="width: 100%" :size="16">
    <mp-form layout="vertical"
      ><mp-form-item label="加载状态 / Loading"><mp-switch v-model="loading" /></mp-form-item
    ></mp-form>
    <mp-swipe-cell :before-close="beforeWait" :loading="loading" :right-width="80"
      ><p>向左滑动 / Swipe left</p>
      <template #right><mp-button>删除 / Delete</mp-button></template></mp-swipe-cell
    >
    <p>
      通过 loading 显式控制等待展示，普通事件返回 Promise 不会自动加载。Loading is controlled by business state.
      关闭手动加载后切换或关闭，观察 before 守卫的自动等待反馈。
    </p>
  </mp-space>
</template>
```

Left and right are physical sides. Widths accept `auto`, finite numbers, or numeric strings in pixels; negative or invalid values resolve to zero. Automatic widths are remeasured before opening and observed while supported. An outside touch requests close; an outside mouse click does not. `click` reports cell, left, or right; `outside` is a close reason.

Hidden action regions are inert and excluded from the accessibility tree. When closing while focus is in the actions, focus returns to the opener or to the cell container. Place a Button outside the cell to call `open('right')`, and handle Escape on a containing element by calling `close()`. The close request still passes through `before-close`. Give each action an accessible name.

`close()` returns `Promise<void>` after the guard settles; the return value does not indicate whether the cell closed. Guard exceptions and rejections emit `guard-error(error, position)`.

Keyboard-accessible composition:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { SwipeCellInstance } from '@maple-design/ui-vue'

const cell = ref<SwipeCellInstance>()
</script>

<template>
  <div @keydown.esc="cell?.close()">
    <mp-button html-type="button" @click="cell?.open('right')">Show actions</mp-button>
    <mp-swipe-cell ref="cell">
      <div>Order</div>
      <template #right><mp-button html-type="button">Archive</mp-button></template>
    </mp-swipe-cell>
  </div>
</template>
```

## API

### SwipeCell Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `name` | Item identity returned by open, close, and before-close; does not render text | `string \| number` | `''` |
| `left-width` | Left action-area width; `auto` measures content | `number \| string` | `auto` |
| `right-width` | Right action width | `number \| string` | `auto` |
| `before-close` | Before-close hook; `false` prevents closing | `(args) => boolean \| void \| Promise<boolean \| void>` | `-` |
| `disabled` | Disable swipe | `boolean` | `false` |
| `stop-propagation` | Stop `touchmove` bubbling | `boolean` | `false` |

### SwipeCell Events

| Event | Description | Arguments |
| --- | --- | --- |
| `click` | Triggered when the cell is clicked | `position: left \| right \| cell` |
| `open` | Emitted on open | `{ name, position }` |
| `close` | Emitted on close | `{ name, position }` |
| `guard-error` | A close guard throws or rejects | `(error, position)` |

### SwipeCell Slots

| Name | Description |
| --- | --- |
| `default` | Main content |
| `left` | Left actions |
| `right` | Right action |

### SwipeCell Methods

| Method | Description | Arguments |
| --- | --- | --- |
| `open` | Open the sidebar | `left \| right` |
| `close` | Request close through the guard; resolves `Promise<void>` without indicating whether the cell closed | `-` |

### Async operation feedback

Awaited before-* hooks show loading feedback and aria-busy. Rejection/failure restores interaction; repeated input does not restart the same operation. Ordinary event return Promises do not participate. Guard failure emits guard-error. close() ends waiting and leaves the cell open instead of rejecting its caller. A new gesture can cancel an earlier close request.

### guard-error

Emitted once after a closing guard fails, with `(error, position)`.

## CSS Variables

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-swipe-cell-background` | `transparent` | `background` |
| `--mp-swipe-cell-transition` | `transform 0.2s ease` | `transition` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-swipe-cell-background: transparent;
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
