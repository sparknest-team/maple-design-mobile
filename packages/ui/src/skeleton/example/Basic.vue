<script setup>
import { ref } from 'vue'

const loading = ref(true)
</script>
<template>
  <mp-switch v-model="loading" />
  <mp-skeleton :loading="loading">加载的数据</mp-skeleton>
</template>
