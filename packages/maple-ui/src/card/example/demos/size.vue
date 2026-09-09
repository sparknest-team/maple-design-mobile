<script setup lang="ts">
const sizes = ['sm', 'md'] as const
</script>

<template>
  <mp-space direction="column" style="width: 100%">
    <mp-card v-for="size in sizes" :key="size" :size="size" :title="size" subtitle="Content density"
      >Card content</mp-card
    >
  </mp-space>
</template>
