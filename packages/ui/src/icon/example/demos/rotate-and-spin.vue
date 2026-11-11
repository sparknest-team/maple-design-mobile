<template>
  <mp-space wrap align="center" :size="32">
    <div class="demo-item">
      <mp-icon size="32" :rotate="90"><m-icon-arrow-right /></mp-icon>
      <span>rotate="90"</span>
    </div>
    <div class="demo-item">
      <mp-icon size="32" spin><m-icon-refresh /></mp-icon>
      <span>spin</span>
    </div>
    <div class="demo-item">
      <m-icon-refresh :size="32" :rotate="45" spin />
      <span>独立 SVG：rotate + spin</span>
    </div>
  </mp-space>
</template>
<style scoped>
.demo-item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
</style>
