<script setup></script>

<template>
  <mp-watermark image="./logo.svg" :width="40" :height="40" :gap="[40, 40]" :offset="[10, 10]">
    <div class="watermark-wrapper"></div>
  </mp-watermark>
</template>

<style scoped>
.watermark-wrapper {
  width: 100%;
  height: 200px;
}
</style>
