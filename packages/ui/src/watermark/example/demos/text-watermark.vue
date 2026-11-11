<script setup>
import { ref } from 'vue'

const dark = ref(false)
const shown = ref(true)
const content = ref('LOCAL DEMO 200')
const clicks = ref(0)
</script>

<template>
  <section class="watermark-contrast-demo">
    <mp-checkbox v-model="dark" edit-mode="direct">Dark surface / 深色底</mp-checkbox>
    <mp-checkbox v-model="shown" edit-mode="direct">Show watermark / 显示水印</mp-checkbox>
    <label>Watermark text / 水印文字<mp-input v-model="content" edit-mode="direct" /></label>
    <mp-watermark
      v-if="shown"
      :content="content"
      :font="{ color: dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.25)' }"
      :style="{ background: dark ? '#1f2937' : '#ffffff', color: dark ? '#ffffff' : '#111827' }"
    >
      <div class="watermark-contrast-surface">
        <p>Local synthetic content / 本地合成内容</p>
        <mp-button html-type="button" @click="clicks++">Click through / 点击内容</mp-button>
      </div>
    </mp-watermark>
    <p role="status">Visible: {{ shown }} · Dark: {{ dark }} · Clicks: {{ clicks }}</p>
  </section>
</template>
<style scoped>
.watermark-contrast-surface {
  min-height: 240px;
  display: grid;
  place-content: center;
  gap: 12px;
}
</style>
