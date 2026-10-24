<script setup lang="ts">
import { ref } from 'vue'

const previewOpen = ref(false)
</script>

<template>
  <mp-space direction="column" :size="16">
    <mp-image width="160" height="120" object-fit="cover" src="/cat.jpg" preview-src="/cat2.jpg" />
    <mp-button status="primary" size="sm" @click="previewOpen = true">打开预览</mp-button>
    <mp-image
      v-model:open="previewOpen"
      width="160"
      height="120"
      object-fit="cover"
      src="/cat.jpg"
      :preview-props="{ scaleStep: 1 }"
    />
  </mp-space>
</template>
