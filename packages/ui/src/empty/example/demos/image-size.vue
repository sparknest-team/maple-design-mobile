<script setup>
const sizes = ['xs', 'sm', 'md', 'lg', 'xl']
</script>

<template>
  <mp-space direction="column" :size="16">
    <mp-empty v-for="size in sizes" :key="size" :image-size="size" :description="`image-size: ${size}`" />
  </mp-space>
</template>
