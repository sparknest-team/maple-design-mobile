<script setup></script>

<template>
  <mp-watermark :offset="[10, 10]">
    <div class="watermark-wrapper"></div>
    <template #content>
      <span style="font-size: 20px; color: #7986cb">Maple UI</span>
    </template>
  </mp-watermark>
</template>

<style scoped>
.watermark-wrapper {
  width: 100%;
  height: 200px;
}
</style>
