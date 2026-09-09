<script setup lang="ts">
const variants = ['default', 'outline', 'tonal'] as const
</script>

<template>
  <mp-space direction="column" style="width: 100%">
    <mp-card v-for="variant in variants" :key="variant" :variant="variant" :title="variant">Card content</mp-card>
    <mp-card :elevation="false" title="No elevation">Card content</mp-card>
    <mp-card :elevation="4" title="Elevation 4">Card content</mp-card>
  </mp-space>
</template>
