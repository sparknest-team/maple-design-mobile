<script setup lang="ts">
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space v-for="size in sizes" :key="size" align="center" wrap :size="12">
      <span>{{ size }}</span>
      <mp-input :size="size" :aria-label="`Input ${size}`" placeholder="Input" style="width: 140px" />
      <mp-button :size="size">Button</mp-button>
      <mp-button :size="size"
        ><template #icon><m-icon-search /></template>Search</mp-button
      >
    </mp-space>
  </mp-space>
</template>
