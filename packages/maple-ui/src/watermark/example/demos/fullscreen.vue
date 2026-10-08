<script setup>
import { ref } from 'vue'

const fullscreen = ref(false)
const toggle = () => {
  fullscreen.value = !fullscreen.value
}
</script>

<template>
  <mp-watermark content="Maple UI" :fullscreen="fullscreen" :z-index="99" :offset="[10, 10]">
    <div class="watermark-wrapper">
      <mp-button status="primary" @click="toggle">切换</mp-button>
    </div>
  </mp-watermark>
</template>

<style scoped>
.watermark-wrapper {
  width: 100%;
  height: 200px;
}
</style>
