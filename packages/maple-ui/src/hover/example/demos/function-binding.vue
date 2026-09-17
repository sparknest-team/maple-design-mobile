<script setup>
import { ref } from 'vue'

const translateY = ref('100%')
function handleHover(hovering) {
  translateY.value = hovering ? '0' : '100%'
}
</script>

<template>
  <div v-hover="handleHover" class="image-container">
    <mp-image src="tree.jpeg" />
    <div class="image-overlay" :style="{ transform: `translateY(${translateY})` }">HOVER</div>
  </div>
</template>

<style lang="less" scoped>
.paper {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.image-container {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  border-radius: 6px;
}

.image-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: all 0.3s;
  color: var(--mp-color-white);
  background-color: var(--mp-color-primary);
  font-size: 50px;
}
</style>
