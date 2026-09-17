<script setup lang="ts">
const fits = ['fill', 'contain', 'cover', 'none', 'scale-down'] as const
</script>

<template>
  <mp-space :size="16" wrap>
    <mp-space v-for="fit in fits" :key="fit" direction="column" align="center" :size="8">
      <mp-image width="120" height="120" :object-fit="fit" preview-disabled src="/cat.jpg" />
      <span class="label">{{ fit }}</span>
    </mp-space>
  </mp-space>
</template>

<style scoped>
.label {
  color: var(--mp-color-text-3);
  font-size: 12px;
}
</style>
