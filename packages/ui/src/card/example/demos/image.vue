<script setup lang="ts">
const imageSrc = `${(import.meta as ImportMeta & { env: { BASE_URL: string } }).env.BASE_URL}cat.jpg`
const directions = ['column', 'row', 'row-reverse'] as const
</script>

<template>
  <mp-space direction="column" style="width: 100%">
    <mp-card
      v-for="direction in directions"
      :key="direction"
      :direction="direction"
      :title="direction"
      :image-src="imageSrc"
      alt="Cat"
      :image-height="120"
      :image-width="direction === 'column' ? '100%' : 100"
      fit="cover"
      >Card content</mp-card
    >
    <mp-card title="Custom cover"
      ><template #cover
        ><img :src="imageSrc" alt="Cat" style="width: 100%; height: 120px; object-fit: cover" /></template
      >Cover slot overrides the image.</mp-card
    >
  </mp-space>
</template>
