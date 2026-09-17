<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
const current = ref(1)
const images = ['/cat.jpg', '/cat2.jpg']
</script>

<template>
  <mp-space direction="column" :size="16">
    <mp-button status="primary" size="sm" @click="open = true">打开预览组</mp-button>
    <mp-image-preview-group v-model:open="open" v-model:current="current" :images="images" :loop="false" />
  </mp-space>
</template>
