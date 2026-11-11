<script setup>
import { onUnmounted, ref } from 'vue'

const loading = ref(false)
let timer
function show() {
  loading.value = true
  clearTimeout(timer)
  timer = setTimeout(() => {
    loading.value = false
  }, 2000)
}
onUnmounted(() => clearTimeout(timer))
</script>
<template>
  <mp-button status="danger" @click="show">切换全屏模式</mp-button>
  <mp-skeleton fullscreen :loading="loading" />
</template>
