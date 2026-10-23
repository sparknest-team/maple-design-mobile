<script setup></script>

<template>
  <mp-carousel class="carousel-example">
    <mp-carousel-item>
      <img class="carousel-item" :src="'cat.jpg'" />
    </mp-carousel-item>
    <mp-carousel-item>
      <img class="carousel-item" :src="'cat2.jpg'" />
    </mp-carousel-item>
    <mp-carousel-item>
      <img class="carousel-item" :src="'cat3.jpg'" />
    </mp-carousel-item>
    <template #indicator="{ index, length, to }">
      <div class="carousel-custom-indicators">
        <mp-button
          v-for="(l, idx) in length"
          :key="l"
          size="xs"
          round
          :variant="idx === index ? 'default' : 'tonal'"
          :status="idx === index ? 'primary' : 'default'"
          :aria-label="`跳转至第 ${idx + 1} 页`"
          @click="to(idx)"
          >{{ idx + 1 }}</mp-button
        >
      </div>
    </template>
  </mp-carousel>
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

.space {
  height: 20px;
}
</style>
