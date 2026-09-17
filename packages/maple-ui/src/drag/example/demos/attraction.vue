<template>
  <div class="drag-demo-surface">
    <mp-drag
      ref="drag3"
      style="left: 16px; top: 16px"
      attraction="x"
      :boundary="{ top: 12, right: 12, bottom: 12, left: 12 }"
      :popup-container="false"
    >
      <mp-button status="primary">水平吸附</mp-button>
    </mp-drag>
    <mp-drag
      ref="drag4"
      style="left: 132px; top: 88px"
      attraction="y"
      :boundary="{ top: 12, right: 12, bottom: 12, left: 12 }"
      :popup-container="false"
    >
      <mp-button status="primary">垂直吸附</mp-button>
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
