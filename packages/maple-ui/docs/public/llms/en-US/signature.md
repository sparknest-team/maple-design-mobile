<!-- Source: src/signature/docs/en-US.md; locale: en-US; page: /en-US/signature -->

# Signature

## Examples

### Intro

Signature component based on `Canvas`.

### Basic Usage

Get the data url of the canvas through the component method `confirm`. When the canvas is empty, you will get the `empty string`.

Example source: src/signature/example/demos/basic-usage.vue

```vue
<script setup>
import { ref } from 'vue'
import { AppType, onThemeChange } from '@maple-design/cli/client'

const signature = ref('')
const signatureRef = ref()
function confirmSignature() {
  signature.value = signatureRef.value.confirm()
}
function resetSignature() {
  signature.value = ''
  signatureRef.value.reset()
}
onThemeChange(() => {
  signatureRef.value?.reset()
  signature.value = ''
})
</script>

<template>
  <mp-signature ref="signatureRef" />
  <mp-space class="gap">
    <mp-button status="primary" @click="confirmSignature">确认</mp-button>
    <mp-button status="primary" @click="resetSignature">重置</mp-button>
  </mp-space>
  <img v-if="signature" class="gap" :src="signature" />
</template>

<style scoped>
.gap {
  margin-top: 10px !important;
}
</style>
```

### Custom Style

You can customize the signature style through `stroke-style` and `line-width`. The default `stroke-style` is `currentColor`, which will inherit the text color, so you can also set the color through `css color`.

Example source: src/signature/example/demos/custom-style.vue

```vue
<script setup>
import { ref } from 'vue'
import { AppType, onThemeChange } from '@maple-design/cli/client'

const customStyleSignature = ref('')
const customStyleSignatureRef = ref()
function confirmCustomStyleSignature() {
  customStyleSignature.value = customStyleSignatureRef.value.confirm()
}
function clearCustomStyleSignature() {
  customStyleSignature.value = ''
  customStyleSignatureRef.value.reset()
}
onThemeChange(() => {
  customStyleSignatureRef.value?.reset()
  customStyleSignature.value = ''
})
</script>

<template>
  <mp-signature ref="customStyleSignatureRef" style="color: var(--mp-sys-color-content-primary)" :line-width="4" />
  <mp-space class="gap">
    <mp-button status="primary" @click="confirmCustomStyleSignature">确认</mp-button>
    <mp-button status="primary" @click="clearCustomStyleSignature">重置</mp-button>
  </mp-space>
  <img v-if="customStyleSignature" :src="customStyleSignature" class="gap" />
</template>

<style scoped>
.gap {
  margin-top: 10px !important;
}
</style>
```

## API

### Props

| Prop | Description  | Type | Default |
| --- | --- | --- | --- |
| `stroke-style` | Canvas stroke style | _string_ | `currentColor` |
| `line-width` | Canvas line width | _string \| number_ | `2` |
| `data-url-type` | Data url type for generating image | _'png' \| 'jpg'_ | `'png'` |

### Events

| Event | Description | Arguments |
| --- | --- | --- |
| `start` | Triggered when signing begins | `-` |
| `signing` | Triggered during signature | `-` |
| `end` | Triggered when ending signature | `-` |

### Methods

| Method | Description | Arguments | Return |
| --- | --- | --- | --- |
| `reset` | Reset canvas | `-` | `-` |
| `confirm` | Confirm the signature and return image data in data url format. Returns an empty string when the canvas is empty | `-` | `string` |

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable | Default |
| --- | --- |
| `--signature-height` | `200px` |
| `--signature-background-color` | `var(--color-fill-3)` |
| `--signature-stroke-color` | `#333` |
| `--signature-border-radius` | `4px` |
