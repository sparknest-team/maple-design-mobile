<script setup></script>

<template>
  <div v-lazy:background-image="'cat.jpg'" class="lazy-example-cat"></div>
</template>

<style lang="less" scoped>
.lazy-example-cat {
  width: 100%;
  height: 200px;
  object-fit: cover;
  background-size: cover;
  pointer-events: none;
}
</style>
