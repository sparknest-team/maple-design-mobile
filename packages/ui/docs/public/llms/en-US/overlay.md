<!-- Source: src/overlay/docs/en-US.md; locale: en-US; page: /en-US/overlay -->

# Overlay

### Intro

Create an overlay layer to emphasize specific page elements.

## Basic examples

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

## Content and presentation

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

## Interaction and control

### Click Event

Example source: src/overlay/example/demos/click-event.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Message } from '@maple-design/ui-vue'

const open = ref(false)
</script>

<template>
  <mp-button status="primary" block @click="open = true">点击背景层</mp-button>
  <mp-overlay v-model:open="open" @click="Message.success('点击了背景层')" />
</template>
```

## Usage notes

### Configuration

These are actual :root defaults. Prefer component variables for business customization; internal positioning variables are not public API.

## API

### Overlay Props

| Prop | Description | Type | Default |
| ------------------ | ------------------------------------------------------ | ------------------------------ | -------- |
| `v-model:open` | Show overlay | _boolean_ | `false` |
| `default-open` | Whether to display by default in uncontrolled mode | _boolean_ | `false` |
| `overlay-closable` | Whether clicking the backdrop closes the Overlay | _boolean_ | `true` |
| `lock-scroll` | Whether to disable scrolling penetration, scrolling the Overlay when disabled will not cause the body to scroll | _boolean_ | `true` |
| `unmount-on-close` | Whether to unmount slot content after closing | _boolean_ | `true` |
| `popup-container` | Teleport target; `false` renders in place | _string \| HTMLElement \| false_ | `'body'` |
| `esc-to-close` | Whether to support keyboard ESC to close the overlay | _boolean_ | `true` |
| `z-index` | Custom z-index | _number_ | `-` |

### Overlay Events

| Event | Description | Arguments |
| ------------ | ------------------- | --------------- |
| `update:open` | Open state changed | `boolean` |
| `click` | Triggered when clicking the overlay | `MouseEvent` |
| `key-escape` | Triggered when click keyboard ESC | `KeyboardEvent` |
| `open` | Triggered when opening starts | `-` |
| `opened` | Triggered after opening transition | `-` |
| `close` | Triggered when closing starts | `-` |
| `closed` | Triggered after closing transition | `-` |

### Overlay Slots

| Slot | Description | Prop |
| --------- | ---------- | ---- |
| `default` | Default slot | `-` |

## CSS Variables

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-overlay-animation-duration` | `var(--mp-sys-motion-duration-slow)` | `transition` |
| `--mp-overlay-background-color` | `var(--mp-sys-color-scrim)` | `background-color` |
| `--mp-overlay-content-z-index` | `var(--mp-sys-layer-raised)` | `z-index` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-overlay-background-color: var(--mp-sys-color-scrim);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->

### Reduced motion

Built-in CSS transitions follow `prefers-reduced-motion: reduce`. Removing transitions does not change final visibility, selected/expanded state or event semantics. Applications control custom animations inside slots.
