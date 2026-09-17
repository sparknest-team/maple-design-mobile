<script setup>
import { ref } from 'vue'

const drag = ref(null)
function reset() {
  drag.value?.reset()
}
</script>

<template>
  <div class="drag-demo-surface">
    <mp-drag
      ref="drag"
      style="right: 16px; bottom: 16px"
      attraction="xy"
      :boundary="{ top: 12, right: 12, bottom: 12, left: 12 }"
      :popup-container="false"
    >
      <mp-button status="primary">先拖动我</mp-button>
    </mp-drag>
    <mp-button variant="outline" @click="reset">重置位置</mp-button>
  </div>
</template>

<style scoped lang="less">
.drag-demo-surface {
  position: relative;
  height: 180px;
  overflow: hidden;
  border: 1px dashed var(--mp-color-border-2);
  border-radius: 8px;
}
</style>
