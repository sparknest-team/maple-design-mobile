<template>
  <div class="drag-demo-surface">
    <mp-drag
      ref="drag6"
      style="left: 24px; top: 24px"
      attraction="x"
      :boundary="{ top: 24, right: 24, bottom: 24, left: 24 }"
      :popup-container="false"
    >
      <mp-button status="primary">距边缘 24px</mp-button>
    </mp-drag>
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
