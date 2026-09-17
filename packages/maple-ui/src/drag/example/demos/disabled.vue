<template>
  <div class="drag-demo-surface">
    <mp-drag
      ref="drag5"
      style="left: 16px; top: 16px"
      disabled
      attraction="x"
      :boundary="{ top: 12, right: 12, bottom: 12, left: 12 }"
      :popup-container="false"
      z-index="80"
    >
      <mp-button status="primary" disabled>禁止拖拽</mp-button>
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
