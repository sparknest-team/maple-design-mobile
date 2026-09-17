<script setup>
import { nextTick, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'

const watermarkRef4 = ref(null)
onThemeChange(() => {
  nextTick(() => {
    watermarkRef4.value?.resize()
  })
})
</script>

<template>
  <mp-watermark ref="watermarkRef4" content="Maple" :rotate="22" :offset="[0, 20]">
    <div class="watermark-wrapper"></div>
  </mp-watermark>
</template>

<style scoped>
.watermark-wrapper {
  width: 100%;
  height: 200px;
}
</style>
