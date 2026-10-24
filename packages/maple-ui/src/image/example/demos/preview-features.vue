<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
const current = ref(1)
const images = ['/cat.jpg', '/cat2.jpg']

function onAction() {
  current.value = current.value === 0 ? 1 : 0
}
</script>

<template>
  <mp-space direction="column" :size="16">
    <mp-button status="primary" size="sm" @click="open = true">打开自定义预览</mp-button>
    <mp-image-preview-group v-model:open="open" v-model="current" :images="images" :loop="false">
      <template #close-icon>
        <span class="close-icon">×</span>
      </template>
      <template #indicator="{ imageNumber, length }">
        <span class="indicator">{{ imageNumber }} / {{ length }}</span>
      </template>
      <template #actions>
        <mp-image-preview-action name="切换" @click="onAction">+</mp-image-preview-action>
      </template>
    </mp-image-preview-group>
  </mp-space>
</template>

<style scoped>
.close-icon {
  font-size: 24px;
  color: #fff;
}

.indicator {
  position: absolute;
  top: 16px;
  left: 50%;
  padding: 4px 12px;
  color: #fff;
  font-size: 12px;
  background: rgb(0 0 0 / 45%);
  border-radius: 12px;
  transform: translateX(-50%);
}
</style>
