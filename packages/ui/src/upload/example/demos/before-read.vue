<script setup>
import { ref } from 'vue'

const files = ref([])
const beforeRead = (file) => file.size <= 1024 * 1024
</script>

<template>
  <div>
    <p>仅允许读取不超过 1 MB 的文件。</p>
    <mp-upload v-model="files" :before-read="beforeRead"></mp-upload>
  </div>
</template>
