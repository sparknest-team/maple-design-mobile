<script setup></script>

<template>
  <mp-paper
    v-hover="{ color: 'var(--mp-color-white)', background: ' var(--mp-color-primary)' }"
    class="paper"
    :elevation="2"
    :width="100"
    :height="100"
    ripple
  >
    HOVER
  </mp-paper>
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
