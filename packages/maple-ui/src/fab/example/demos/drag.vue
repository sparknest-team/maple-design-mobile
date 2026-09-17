<script setup>
import { ref } from 'vue'

const drag = ref(false)
</script>

<template>
  <mp-switch v-model="drag" />
  <span class="fab-demo-label">拖拽: {{ drag }}</span>
  <p class="fab-demo-hint">拖拽模式：按钮位于屏幕角落，可用触摸拖动；关闭拖拽回到预览区。</p>
  <div v-if="!drag" class="fab-demo-stage">
    <mp-fab :fixed="false" :popup-container="false" />
  </div>
  <mp-fab v-else drag :popup-container="false" position="right-bottom" />
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
  min-height: 120px;
  overflow: hidden;
  border: 1px dashed var(--mp-color-border-2);
  border-radius: 8px;
}
</style>
