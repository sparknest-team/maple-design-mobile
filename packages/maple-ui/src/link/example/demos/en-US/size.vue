<script setup lang="ts">
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
</script>

<template>
  <mp-space direction="column" size="md">
    <mp-space v-for="size in sizes" :key="size" wrap size="md" align="center">
      <mp-link :size="size" status="primary">{{ size }} Link</mp-link>
      <mp-link :size="size" status="primary" icon>{{ size }} Icon</mp-link>
      <mp-link :size="size" loading>{{ size }} Loading</mp-link>
    </mp-space>
  </mp-space>
</template>
