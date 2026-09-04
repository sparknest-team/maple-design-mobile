<script setup>
import { nextTick, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

const fullscreen = ref(false)
const watermarkRef = ref(null)
const watermarkRef2 = ref(null)
const watermarkRef3 = ref(null)
const watermarkRef4 = ref(null)
const watermarkRef5 = ref(null)

const toggle = () => {
  fullscreen.value = !fullscreen.value
}

watchLang(use)

onThemeChange(() => {
  nextTick(() => {
    watermarkRef.value.resize()
    watermarkRef2.value.resize()
    watermarkRef3.value.resize()
    watermarkRef4.value.resize()
    watermarkRef5.value.resize()
  })
})
</script>

<template>
  <app-type>{{ t('textWatermark') }}</app-type>
  <mp-watermark ref="watermarkRef" content="Maple">
    <div class="watermark-wrapper"></div>
  </mp-watermark>

  <app-type>{{ t('customGap') }}</app-type>
  <mp-watermark ref="watermarkRef2" content="Maple" :gap="[40, 40]">
    <div class="watermark-wrapper"></div>
  </mp-watermark>

  <app-type>{{ t('customOffset') }}</app-type>
  <mp-watermark ref="watermarkRef3" content="Maple" :offset="[20, 20]">
    <div class="watermark-wrapper"></div>
  </mp-watermark>

  <app-type>{{ t('customRotate') }}</app-type>
  <mp-watermark ref="watermarkRef4" content="Maple" :rotate="22" :offset="[0, 20]">
    <div class="watermark-wrapper"></div>
  </mp-watermark>

  <app-type>{{ t('imageWatermark') }}</app-type>
  <mp-watermark image="./logo.svg" :width="40" :height="40" :gap="[40, 40]" :offset="[10, 10]">
    <div class="watermark-wrapper"></div>
  </mp-watermark>

  <app-type>{{ t('fullscreen') }}</app-type>

  <mp-watermark ref="watermarkRef5" content="Maple UI" :fullscreen="fullscreen" z-index="99" :offset="[10, 10]">
    <div class="watermark-wrapper">
      <mp-button status="primary" @click="toggle">{{ t('toggle') }}</mp-button>
    </div>
  </mp-watermark>

  <app-type>{{ t('customContentSlot') }}</app-type>
  <mp-watermark :offset="[10, 10]">
    <div class="watermark-wrapper"></div>
    <template #content>
      <span style="font-size: 20px; color: #7986cb">Maple UI</span>
    </template>
  </mp-watermark>
</template>

<style scoped>
.watermark-wrapper {
  width: 100%;
  height: 200px;
}
</style>
