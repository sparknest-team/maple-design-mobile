<script setup>
import { ref } from 'vue'

const open = ref(true)
</script>

<template>
  <mp-button status="primary" @click.stop="open = !open">切换</mp-button>
  <div class="fab-demo-stage">
    <mp-fab :fixed="false" :popup-container="false" :open="open" status="primary" />
  </div>
</template>

<style scoped>
.fab-demo-stage {
  position: relative;
  min-height: 120px;
  margin-top: 16px;
  overflow: hidden;
  border: 1px dashed var(--mp-color-border-2);
  border-radius: 8px;
}
</style>
