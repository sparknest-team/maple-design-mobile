<script setup>
import { ref } from 'vue'

const files = ref([])
const filter = (files) => files.filter((file) => /\.png$/i.test(file.name))
</script>

<template>
  <div>
    <p>从本次选择中仅保留 PNG 文件。</p>
    <mp-upload v-model="files" :before-add="filter" multiple></mp-upload>
  </div>
</template>
