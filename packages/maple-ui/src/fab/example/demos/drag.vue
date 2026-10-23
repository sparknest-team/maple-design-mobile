<script setup>
import { ref } from 'vue'

const drag = ref(false)
</script>

<template>
  <mp-switch v-model="drag" />
  <span class="fab-demo-label">拖拽: {{ drag }}</span>
  <p class="fab-demo-hint">开启后可用触摸在预览区内拖动按钮；关闭后停止拖动。</p>
  <div class="fab-demo-stage">
    <mp-fab :drag="drag" :popup-container="false" />
  </div>
</template>

<style scoped>
.fab-demo-label {
  margin-left: 8px;
}
.fab-demo-hint {
  margin: 8px 0;
  color: var(--mp-color-text-3);
  font-size: 13px;
}
.fab-demo-stage {
  position: relative;
  min-height: 240px;
  overflow: hidden;
  border: 1px dashed var(--mp-color-border-2);
  border-radius: 8px;
}
</style>
