<template>
  <mp-carousel slides-per-view="auto" :space-between="12" height="180px" centered-slides draggable>
    <mp-carousel-item v-for="(width, index) in [140, 220, 180, 260]" :key="index" :style="{ width: width + 'px' }">
      <div class="carousel-demo-panel">{{ width }}px</div>
    </mp-carousel-item>
  </mp-carousel>
</template>
<style scoped>
.carousel-demo-panel {
  display: grid;
  place-items: center;
  height: 100%;
  background: #e0e7ff;
  color: #312e81;
}
</style>
