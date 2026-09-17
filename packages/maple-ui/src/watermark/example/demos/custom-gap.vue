<script setup>
import { nextTick, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'

const watermarkRef2 = ref(null)
onThemeChange(() => {
  nextTick(() => {
    watermarkRef2.value?.resize()
  })
})
</script>

<template>
  <mp-watermark ref="watermarkRef2" content="Maple" :gap="[40, 40]">
    <div class="watermark-wrapper"></div>
  </mp-watermark>
</template>

<style scoped>
.watermark-wrapper {
  width: 100%;
  height: 200px;
}
</style>
