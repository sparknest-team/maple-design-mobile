<script setup lang="ts">
import MpInputTag from '../../index'
import '../../style'
import { reactive, ref } from 'vue'

const urls = ref(['https://vuejs.org', 'https://github.com'])
const titles = reactive<Record<string, string>>({})
const fallbackOption = (value: string | number) => ({ value, label: titles[String(value)] ?? String(value) })

function loadTitles() {
  // 实际应用由业务请求并更新映射；组件不发起请求。
  titles['https://vuejs.org'] = 'Vue.js'
  titles['https://github.com'] = 'GitHub'
}
</script>

<template>
  <mp-space direction="column" style="width: 100%" :size="12">
    <mp-input-tag v-model="urls" :fallback-option="fallbackOption" />
    <mp-button @click="loadTitles">模拟获取标题 / Load mock titles</mp-button>
    <pre>{{ JSON.stringify(urls, null, 2) }}</pre>
  </mp-space>
</template>
