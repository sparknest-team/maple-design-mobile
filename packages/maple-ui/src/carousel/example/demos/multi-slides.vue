<script setup>
import { ref } from 'vue'

const current = ref(0)
const proposal = ref(0)
const changes = ref(0)
const accept = ref(true)
const loop = ref(true)
function update(value) {
  proposal.value = value
  if (accept.value) {
    current.value = value
  }
}
</script>

<template>
  <section class="multi-slides-demo">
    <mp-checkbox v-model="accept">Accept changes / 接受切换</mp-checkbox>
    <mp-checkbox v-model="loop">Loop / 循环</mp-checkbox>
    <p role="status">Current: {{ current }} · Proposal: {{ proposal }} · Changes: {{ changes }}</p>
    <mp-carousel
      class="carousel"
      :slides-per-view="2.5"
      :space-between="10"
      :current="current"
      :loop="loop"
      draggable
      keyboard
      @update:current="update"
      @change="changes++"
    >
      <mp-carousel-item v-for="i in 6" :key="i">
        <div class="carousel-custom-slide">{{ i }}</div>
      </mp-carousel-item>
    </mp-carousel>
  </section>
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
