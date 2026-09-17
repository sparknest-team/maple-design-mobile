<script setup>
import { nextTick, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'

const watermarkRef = ref(null)
onThemeChange(() => {
  nextTick(() => {
    watermarkRef.value?.resize()
  })
})
</script>

<template>
  <mp-watermark ref="watermarkRef" content="Maple">
    <div class="watermark-wrapper"></div>
  </mp-watermark>
</template>

<style scoped>
.watermark-wrapper {
  width: 100%;
  height: 200px;
}
</style>
