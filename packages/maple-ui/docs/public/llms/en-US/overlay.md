<!-- Source: src/overlay/docs/en-US.md; locale: en-US; page: /en-US/overlay -->

# Overlay

## Examples

### Intro

Create an overlay layer to emphasize specific page elements.

### Basic Usage

Example source: src/overlay/example/demos/overlay-base.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <mp-button status="primary" block @click="open = true">显示背景层</mp-button>
  <mp-overlay v-model:open="open" />
</template>
```

### Overlay Content

Example source: src/overlay/example/demos/overlay-content.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <mp-button status="primary" block @click="open = true">嵌入内容</mp-button>
  <mp-overlay v-model:open="open">
    <div class="overlay-content">点击背景区域或按 Escape 关闭</div>
  </mp-overlay>
</template>

<style lang="less" scoped>
.overlay-content {
  padding: 24px;
  width: 312px;
  background: var(--mp-color-fill-3);
  border-radius: 28px;
}
</style>
```

### Click Event

Example source: src/overlay/example/demos/click-event.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Message } from '@maple-design/ui'

const open = ref(false)
</script>

<template>
  <mp-button status="primary" block @click="open = true">点击背景层</mp-button>
  <mp-overlay v-model:open="open" @click="Message.success('点击了背景层')" />
</template>
```

## API

### Props

| Prop               | Description                                                                                                     | Type                           | Default  |
| ------------------ | --------------------------------------------------------------------------------------------------------------- | ------------------------------ | -------- |
| `v-model:open`     | Whether to display the Overlay                                                                                  | _boolean_                      | `false`  |
| `default-open`     | Whether to display by default in uncontrolled mode                                                              | _boolean_                      | `false`  |
| `overlay-closable` | Whether clicking the backdrop closes the Overlay                                                                | _boolean_                      | `true`   |
| `lock-scroll`      | Whether to disable scrolling penetration, scrolling the Overlay when disabled will not cause the body to scroll | _boolean_                      | `true`   |
| `unmount-on-close` | Whether to unmount slot content after closing                                                                   | _boolean_                      | `true`   |
| `popup-container`  | Teleport target; `false` renders in place                                                                       | _string \| HTMLElement \| false_ | `'body'` |
| `esc-to-close`     | Whether to support keyboard ESC to close the overlay                                                            | _boolean_                      | `true`   |
| `z-index`          | Custom stack level                                                                                              | _number_                       | `-`      |

### Events

| Event        | Description                          | Arguments       |
| ------------ | ------------------------------------ | --------------- |
| `update:open` | Open state changed                  | `boolean`       |
| `click`      | Triggered when clicking on overlay   | `MouseEvent`    |
| `key-escape` | Triggered when pressing keyboard ESC | `KeyboardEvent` |
| `open`       | Triggered when opening starts        | `-`             |
| `opened`     | Triggered after opening transition   | `-`             |
| `close`      | Triggered when closing starts        | `-`             |
| `closed`     | Triggered after closing transition   | `-`             |

### Slots

| Name      | Description  | SlotProps |
| --------- | ------------ | --------- |
| `default` | Default slot | `-`       |

## Public CSS variables

Defaults below are the actual :root values. Prefer component variables for customization; internal positioning variables are not public APIs.

| Variable | Default | Purpose |
| --- | --- | --- |
| `--mp-overlay-background-color` | `var(--mp-sys-color-scrim)` | Backdrop only; does not fade foreground content |
| `--mp-overlay-animation-duration` | `var(--mp-sys-motion-duration-slow)` | Enter/leave duration; reduced-motion may override |
| `--mp-overlay-content-z-index` | `var(--mp-sys-layer-raised)` | Local content layer above the backdrop |

### Reduced motion

Built-in CSS transitions respect `prefers-reduced-motion: reduce`. Final visibility, checked/expanded state and event semantics remain unchanged; custom slot animations are controlled by the application.
