<script setup>
import { ref } from 'vue'

const loading = ref(false)
const handleClick = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 3000)
}
</script>

<template>
  <mp-space :size="['2.666vmin', '2.666vmin']">
    <mp-link loading>Loading</mp-link>
    <mp-link :loading="loading" @click="handleClick">Click to load</mp-link>
  </mp-space>
</template>
