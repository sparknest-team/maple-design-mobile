# NumberKeyboard

### Intro

A bottom popup virtual keyboard for numeric or password input flows.

### Basic Usage

```html
<template>
  <mp-input v-model="value" readonly placeholder="Tap to input" @click="show = true" />
  <mp-number-keyboard v-model="value" v-model:open="open" />
</template>

<script setup>
import { ref } from 'vue'

const value = ref('')
const show = ref(false)
</script>
```

### Custom Theme

With `theme="custom"`, delete and done actions move to a right sidebar.

```html
<template>
  <mp-number-keyboard v-model="value" v-model:open="open" theme="custom" />
</template>
```

### Extra Key

Use `extra-key` to add characters such as `.` on the bottom-left key.

```html
<template>
  <mp-number-keyboard v-model="value" v-model:open="open" extra-key="." />
</template>
```

### Random Key Order

```html
<template>
  <mp-number-keyboard v-model="value" v-model:open="open" random-key-order />
</template>
```

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `v-model` | Current value | `string` | `''` |
| `v-model:open` | Whether keyboard is visible | `boolean` | `false` |
| `title` | Keyboard title | `string` | `-` |
| `theme` | Keyboard layout | `default \| custom` | `default` |
| `maxLength` | Max input length | `number \| string` | `Infinity` |
| `extra-key` | Extra bottom-left key(s) | `string \| string[]` | `''` |
| `close-button-text` | Done button text in custom theme | `string` | `Done` |
| `delete-button-text` | Delete key text; icon when empty | `string` | `-` |
| `show-delete-key` | Show delete key | `boolean` | `true` |
| `random-key-order` | Shuffle 1-9 keys | `boolean` | `false` |
| `hide-on-click-outside` | Close when overlay is clicked | `boolean` | `true` |
| `mask` | Show overlay | `boolean` | `true` |
| `mask-class` | Overlay class | `string` | `-` |
| `mask-style` | Overlay style | `object` | `-` |
| `lock-scroll` | Lock background scroll | `boolean` | `true` |
| `esc-to-close` | Close on Escape | `boolean` | `true` |
| `popupContainer` | Teleport target | `string \| object \| false` | `body` |
| `safe-area` | Enable bottom safe area | `boolean` | `true` |

### Events

| Event | Description | Arguments |
| --- | --- | --- |
| `input` | Emitted on key press | `key: string` |
| `delete` | Emitted on delete | `-` |
| `close` | Emitted on close | `-` |
| `blur` | Emitted on close | `-` |
| `open` | Emitted on open | `-` |
| `opened` | Emitted after open transition | `-` |
| `closed` | Emitted after close transition | `-` |
| `key-escape` | Emitted on Escape | `-` |
