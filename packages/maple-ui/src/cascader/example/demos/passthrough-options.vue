<script setup lang="ts">
import { ref } from 'vue'
import type { CascaderTriggerOptions } from '@maple-design/ui'

const open = ref(false)
const triggerOptions: CascaderTriggerOptions = { placement: 'top-start', popupOffset: 8, popupContainer: false }
const options = [{ value: 'fruit', label: '水果', children: [{ value: 'apple', label: 'Apple' }] }]
</script>
<template>
  <mp-space direction="column" fill>
    <mp-button @click="open = !open">{{ open ? '关闭面板' : '打开面板' }}</mp-button>
    <mp-cascader
      v-model:open="open"
      edit-mode="direct"
      :options="options"
      :trigger-props="triggerOptions"
      aria-label="透传配置示例"
    />
    <p role="status">顶层 open：{{ open }}；嵌套配置：向上展开并调整偏移。</p>
  </mp-space>
</template>
