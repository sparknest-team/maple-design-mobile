<!-- Source: src/swipe-cell/docs/en-US.md; locale: en-US; page: /en-US/swipe-cell -->

# SwipeCell

## Examples

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

### Before Close

Example source: src/swipe-cell/example/demos/before-close.vue

```vue
<script setup>
import { Dialog } from '@maple-design/ui'

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

## Drag cancellation and click suppression



## Confirmation lifetime



## Intro

Swipe a cell to reveal action buttons on either side.

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `name` | Item identity returned by open, close, and before-close; does not render text | `string \| number` | `''` |
| `left-width` | Left action width | `number \| string` | `auto` |
| `right-width` | Right action width | `number \| string` | `auto` |
| `before-close` | Hook before close | `(args) => boolean \| Promise<boolean>` | `-` |
| `disabled` | Disable swipe | `boolean` | `false` |
| `stop-propagation` | Stop touchmove bubbling | `boolean` | `false` |

### Events

| Event | Description | Arguments |
| --- | --- | --- |
| `click` | Emitted on click | `position` |
| `open` | Emitted when opened | `{ name, position }` |
| `close` | Emitted when closed | `{ name, position }` |

### Slots

| Name | Description |
| --- | --- |
| `default` | Main content |
| `left` | Left actions |
| `right` | Right actions |

### Methods

| Method | Description | Arguments |
| --- | --- | --- |
| `open` | Open side | `left \| right` |
| `close` | Close | `-` |
