<script setup>
import { ref } from 'vue'

const custom = ref(true)
const highlighter = {
  async codeToHtml(code, options) {
    const escaped = code.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
    return `<pre><code>${escaped}</code></pre><small>theme: ${String(options.theme).replaceAll('<', '&lt;')}</small>`
  },
}
</script>
<template>
  <mp-checkbox v-model="custom" edit-mode="direct">自定义着色器 / Custom highlighter</mp-checkbox>
  <mp-highlighter-provider :highlighter="custom ? highlighter : undefined" theme="review">
    <mp-code language="javascript" code="const review = true" />
  </mp-highlighter-provider>
</template>
