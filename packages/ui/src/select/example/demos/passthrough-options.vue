<script setup lang="ts">
import { ref } from 'vue'
import type { SelectTriggerOptions } from '@maple-design/ui-vue'

const open = ref(false)
const triggerOptions: SelectTriggerOptions = { placement: 'top-start', popupOffset: 8, popupContainer: false }
const options = [
  { value: 'USER_A', label: 'Apple' },
  { value: 'USER_B', label: 'Banana' },
]
</script>
<template>
  <mp-space direction="column" fill>
    <mp-button @click="open = !open">{{ open ? '关闭面板' : '打开面板' }}</mp-button>
    <mp-select
      v-model:open="open"
      edit-mode="direct"
      :options="options"
      :trigger-props="triggerOptions"
      aria-label="透传配置示例"
    />
    <p role="status">顶层 open：{{ open }}；嵌套配置：向上展开并调整偏移。</p>
  </mp-space>
</template>
