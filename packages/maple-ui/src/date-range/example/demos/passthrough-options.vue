<script setup lang="ts">
import { ref } from 'vue'
import type { DateRangePopupOptions } from '@maple-design/ui'

const open = ref(false)
const popupOptions: DateRangePopupOptions = { placement: 'top-start', popupTranslate: [0, -8], popupContainer: false }
</script>
<template>
  <mp-space direction="column" fill>
    <mp-button @click="open = !open">{{ open ? '关闭面板' : '打开面板' }}</mp-button>
    <mp-date-range v-model:open="open" edit-mode="direct" :popup-props="popupOptions" aria-label="透传配置示例" />
    <p role="status">顶层 open：{{ open }}；嵌套配置：向上展开并调整偏移。</p>
  </mp-space>
</template>
