<script setup>
import { ref } from 'vue'

const custom = ref(true)
const messages = {
  'zh-CN': { emptyDescription: '中文自定义空状态' },
  'en-US': { emptyDescription: 'Custom English empty state' },
}
</script>
<template>
  <mp-checkbox v-model="custom">自定义语言包 / Custom messages</mp-checkbox>
  <mp-locale-provider locale="zh-CN" :messages="custom ? messages : undefined">
    <mp-empty />
  </mp-locale-provider>
</template>
