<script setup lang="ts">
const statuses = ['default', 'primary', 'secondary', 'tertiary', 'info', 'success', 'warning', 'danger'] as const
</script>
<template>
  <div style="display: flex; flex-wrap: wrap; gap: 12px">
    <mp-button v-for="status in statuses" :key="status" :status="status">{{ status }}</mp-button>
  </div>
</template>
