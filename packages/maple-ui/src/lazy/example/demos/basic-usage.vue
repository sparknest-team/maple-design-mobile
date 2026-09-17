<script setup></script>

<template>
  <img v-lazy="'cat.jpg'" class="lazy-example-cat" />
  <img v-lazy="'cat.jpg'" class="lazy-example-cat" />
  <img v-lazy="'cat.jpg'" class="lazy-example-cat" />
  <img v-lazy="'cat.jpg'" class="lazy-example-cat" />
  <img v-lazy="'cat.jpg'" class="lazy-example-cat" />
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
