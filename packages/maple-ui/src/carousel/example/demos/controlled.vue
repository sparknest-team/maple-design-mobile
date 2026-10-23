<script setup>
import { ref } from 'vue'

const current = ref(0)
const accept = ref(true)
const proposal = ref(0)
function update(value) {
  proposal.value = value
  if (accept.value) {
    current.value = value
  }
}
</script>
<template>
  <mp-checkbox v-model="accept">Accept changes / 接受切换</mp-checkbox>
  <p>Current: {{ current }} · Proposal: {{ proposal }}</p>
  <mp-carousel :current="current" height="180px" keyboard draggable @update:current="update">
    <mp-carousel-item v-for="item in 4" :key="item"
      ><div class="carousel-demo-panel">Slide {{ item }}</div></mp-carousel-item
    >
  </mp-carousel>
</template>
<style scoped>
.carousel-demo-panel {
  display: grid;
  place-items: center;
  height: 100%;
  background: #dbeafe;
  color: #1e3a8a;
}
</style>
