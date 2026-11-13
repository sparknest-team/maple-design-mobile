<script setup>
import { ref } from 'vue'

const files = ref([])
const filter = (files) => files.filter((file) => /\.png$/i.test(file.name))
</script>

<template>
  <div>
    <p>Only PNG files from this selection are kept.</p>
    <mp-upload v-model="files" :before-add="filter" multiple></mp-upload>
  </div>
</template>
