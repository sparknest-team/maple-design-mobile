<script setup>
import { ref } from 'vue'

const open = ref(false)
const host = ref()
</script>

<template>
  <mp-button block @click="open = true">600ms / linear Popup</mp-button>
  <!-- The real Teleport host carries both motion tokens, not just the panel style. -->
  <div ref="host" class="popup-motion-host" />
  <mp-popup v-if="host" v-model:open="open" :popup-container="host" unmount-on-close>
    <div class="popup-motion-content">
      <p>Content, backdrop and outer fade share these tokens.</p>
      <mp-button @click="open = false">Close after transition</mp-button>
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
