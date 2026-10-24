<script setup>
import { Message } from '@maple-design/ui'
</script>

<template>
  <mp-carousel class="carousel" @change="(slideNumber) => Message(String(slideNumber))">
    <mp-carousel-item>
      <img class="carousel-item" :src="'cat.jpg'" alt="" />
    </mp-carousel-item>
    <mp-carousel-item>
      <img class="carousel-item" :src="'cat2.jpg'" alt="" />
    </mp-carousel-item>
    <mp-carousel-item>
      <img class="carousel-item" :src="'cat3.jpg'" alt="" />
    </mp-carousel-item>
  </mp-carousel>

  <div class="space"></div>
</template>

<style lang="less" scoped>
.carousel {
  height: 160px;
}

.carousel-example {
  height: 160px;
}

.carousel-item {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}

.carousel-custom-slide {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #4a90d9;
  color: #fff;
  font-size: 24px;
  font-weight: bold;
}

.carousel-custom-indicators {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 4px;
}

.carousel-custom-indicator {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
  font-size: 12px;
  border-radius: 50%;
}

.carousel-custom--active {
  background: #4a90d9;
}

.space {
  height: 20px;
}
</style>
