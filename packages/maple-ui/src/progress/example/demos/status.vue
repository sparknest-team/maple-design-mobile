<script setup lang="ts">
const statuses = ['default', 'primary', 'secondary', 'tertiary', 'info', 'success', 'warning', 'danger'] as const
</script>
<template>
  <div style="display: grid; gap: 16px">
    <mp-progress v-for="status in statuses" :key="status" :status="status" :percent="60"
      ><template #text>{{ status }}</template></mp-progress
    >
    <mp-progress :percent="100" />
  </div>
</template>
