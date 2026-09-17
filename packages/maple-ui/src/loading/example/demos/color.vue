<script setup>
import { ref } from 'vue'

const loading = ref(false)
</script>

<template>
  <mp-space align="center" justify="space-between">
    <mp-loading color="var(--mp-color-info)" />
    <mp-loading type="cube" color="var(--mp-color-success)" />
    <mp-loading type="wave" color="var(--mp-color-warning)" />
    <mp-loading type="rect" color="var(--mp-color-danger)" />
    <mp-loading type="disappear" color="var(--mp-color-text-disabled)" />
  </mp-space>
</template>

<style>
.loading-demo .mp-space {
  padding: 8px 0;
}
</style>
