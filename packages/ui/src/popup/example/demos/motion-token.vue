<script setup>
import { ref } from 'vue'

const open = ref(false)
const host = ref()
</script>

<template>
  <mp-button block @click="open = true">600ms / linear 弹出层</mp-button>
  <!-- The real Teleport host carries both motion tokens, not just the panel style. -->
  <div ref="host" class="popup-motion-host" />
  <mp-popup v-if="host" v-model:open="open" :popup-container="host" unmount-on-close>
    <div class="popup-motion-content">
      <p>内容、遮罩和外层 fade 共同继承这两项 Token。</p>
      <mp-button @click="open = false">动画完成后关闭</mp-button>
    </div>
  </mp-popup>
</template>

<style scoped>
.popup-motion-host {
  --mp-popup-transition-duration: 600ms;
  --mp-popup-transition-timing-function: linear;
}
.popup-motion-content {
  padding: 24px;
  max-width: 280px;
}
</style>
