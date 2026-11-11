<script setup lang="ts">
import { computed, ref } from 'vue'

const custom = ref(false)
const highlighter = computed(() => {
  const prefix = custom.value ? 'Custom: ' : ''
  return {
    async codeToHtml(code: string) {
      const escaped = code.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
      return '<pre><code>' + prefix + escaped + '</code></pre>'
    },
  }
})
</script>

<template>
  <mp-checkbox v-model="custom">自定义着色器 / Custom highlighter</mp-checkbox>
  <mp-highlighter-provider :highlighter="highlighter" theme="local">
    <mp-code code="const message = 'Hello Maple'" language="typescript" />
  </mp-highlighter-provider>
</template>
