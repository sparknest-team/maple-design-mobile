<script setup lang="ts">
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
</script>
<template>
  <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 12px">
    <mp-button v-for="size in sizes" :key="size" :size="size">{{ size }}</mp-button>
  </div>
</template>
