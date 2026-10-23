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
  <mp-space size="sm">
    <mp-link loading>加载中</mp-link>
    <mp-link :loading="loading" @click="handleClick">点击加载</mp-link>
  </mp-space>
</template>
