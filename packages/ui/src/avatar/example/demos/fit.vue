<template>
  <mp-space align="flex-end" :size="24" wrap>
    <mp-space v-for="fit in fits" :key="fit" direction="column" align="center" :size="8">
      <mp-avatar image-url="/cat.jpg" :alt="fit" :object-fit="fit" :size="56" />
      <span class="label">{{ fit }}</span>
    </mp-space>
  </mp-space>
</template>

<script lang="ts" setup>
const fits = ['fill', 'contain', 'cover', 'none', 'scale-down'] as const
</script>

<style scoped>
.label {
  color: var(--mp-color-text-3);
  font-size: var(--mp-font-size-sm);
}
</style>
