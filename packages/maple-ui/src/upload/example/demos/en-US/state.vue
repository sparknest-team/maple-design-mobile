<script setup>
import { ref } from 'vue'

const files = ref(
  ['ready', 'reading', 'uploading', 'success', 'error', 'canceled'].map((status, index) => ({
    uid: String(index),
    name: status + '.txt',
    status,
    percent: status === 'success' ? 100 : 45,
  })),
)
</script>

<template>
  <div>
    <mp-upload v-model="files"></mp-upload>
  </div>
</template>
