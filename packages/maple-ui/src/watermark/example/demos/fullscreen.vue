<script setup>
import { nextTick, ref } from 'vue'
import { AppType, onThemeChange } from '@maplejs/maple-cli/client'

const fullscreen = ref(false)
const watermarkRef5 = ref(null)
const toggle = () => {
  fullscreen.value = !fullscreen.value
}
onThemeChange(() => {
  nextTick(() => {
    watermarkRef5.value?.resize()
  })
})
</script>

<template>
  <mp-watermark ref="watermarkRef5" content="Maple UI" :fullscreen="fullscreen" z-index="99" :offset="[10, 10]">
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
