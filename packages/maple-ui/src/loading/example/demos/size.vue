<script setup>
import { ref } from 'vue'

const loading = ref(false)
</script>

<template>
  <mp-space align="center" justify="space-between">
    <mp-loading size="sm" />
    <mp-loading type="cube" size="sm" />
    <mp-loading type="wave" size="sm" />
    <mp-loading type="rect" size="sm" />
    <mp-loading type="disappear" size="sm" />
    <mp-loading :size="32" />
  </mp-space>
</template>

<style>
.loading-demo .mp-space {
  padding: 8px 0;
}
</style>
