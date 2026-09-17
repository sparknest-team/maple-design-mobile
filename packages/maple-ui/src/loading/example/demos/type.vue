<script setup>
import { ref } from 'vue'

const loading = ref(false)
</script>

<template>
  <mp-space align="center" justify="space-between">
    <mp-loading />
    <mp-loading type="cube" />
    <mp-loading type="wave" />
    <mp-loading type="rect" />
    <mp-loading type="disappear" />
  </mp-space>
</template>

<style>
.loading-demo .mp-space {
  padding: 8px 0;
}
</style>
