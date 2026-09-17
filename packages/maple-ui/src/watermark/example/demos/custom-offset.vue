<script setup>
import { nextTick, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'

const watermarkRef3 = ref(null)
onThemeChange(() => {
  nextTick(() => {
    watermarkRef3.value?.resize()
  })
})
</script>

<template>
  <mp-watermark ref="watermarkRef3" content="Maple" :offset="[20, 20]">
    <div class="watermark-wrapper"></div>
  </mp-watermark>
</template>

<style scoped>
.watermark-wrapper {
  width: 100%;
  height: 200px;
}
</style>
