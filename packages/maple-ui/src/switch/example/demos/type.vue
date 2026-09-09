<script setup lang="ts">
const variants = ['circle', 'round', 'line', 'md3'] as const
</script>

<template>
  <mp-space wrap
    ><label v-for="variant in variants" :key="variant"
      >{{ variant }} <mp-switch :variant="variant" :aria-label="variant" /></label
  ></mp-space>
</template>
