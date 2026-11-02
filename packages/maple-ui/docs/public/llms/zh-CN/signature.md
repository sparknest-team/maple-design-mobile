<!-- Source: src/signature/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/signature -->

# 签名

## 案例

### 介绍

基于 `Canvas` 的签名组件。

### 基本使用

通过组件方法 `confirm` 获取画布的 `data url`，画布为空时会获取到 `空字符串`。

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

### 自定义样式

可以通过 `stroke-style`、`line-width` 自定义签名的样式，`stroke-style` 默认是 `currentColor`，会继承文字颜色，所以也可以通过 `css color` 来设置颜色。

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

### 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `stroke-style` | 画笔颜色 | _string_ | `currentColor` |
| `line-width` | 画笔粗细 | _string \| number_ | `2` |
| `data-url-type` | 生成图片的格式 | _'png' \| 'jpg'_ | `'png'` |

### 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `start` | 开始签名时触发 | `-` |
| `signing` | 签名过程中触发 | `-` |
| `end` | 结束签名时触发 | `-` |

### 方法

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| `reset` | 重置签名 | `-` | `-` |
| `confirm` | 确认签名，返回 data url 格式的图片数据。画布为空时返回空字符串 | `-` | `string` |

### 样式变量

以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

| 变量名 | 默认值 |
| --- | --- |
| `--signature-height` | `200px` |
| `--signature-background-color` | `var(--color-fill-3)` |
| `--signature-stroke-color` | `#333` |
| `--signature-border-radius` | `4px` |
