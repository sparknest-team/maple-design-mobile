<script setup lang="ts">
const sizes = ['sm', 'md', 'lg'] as const
</script>

<template>
  <mp-space wrap
    ><label v-for="size in sizes" :key="size">{{ size }} <mp-switch :size="size" :aria-label="size" /></label
  ></mp-space>
</template>
