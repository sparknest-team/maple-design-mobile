<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <mp-space direction="column" :size="16">
    <mp-button status="primary" size="sm" @click="open = true">打开单图预览</mp-button>
    <mp-image-preview v-model:open="open" src="/cat.jpg" />
  </mp-space>
</template>
