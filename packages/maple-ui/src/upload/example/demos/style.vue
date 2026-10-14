<script setup>
import { ref } from 'vue'

const files = ref([])
</script>

<template>
  <div>
    <mp-upload v-model="files"
      ><template #trigger><mp-button status="primary">选择文件</mp-button></template></mp-upload
    >
  </div>
</template>
