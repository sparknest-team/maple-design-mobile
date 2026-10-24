<script setup lang="ts">
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
</script>

<template>
  <mp-space direction="column" size="md">
    <mp-space v-for="size in sizes" :key="size" wrap size="md" align="center">
      <mp-link :size="size" status="primary">{{ size }} 链接</mp-link>
      <mp-link :size="size" status="primary" icon>{{ size }} 图标</mp-link>
      <mp-link :size="size" loading>{{ size }} 加载中</mp-link>
    </mp-space>
  </mp-space>
</template>
