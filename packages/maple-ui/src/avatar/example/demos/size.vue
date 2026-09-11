<template>
  <mp-space direction="column" :size="20">
    <mp-space align="flex-end" :size="16" wrap>
      <mp-space v-for="size in numericSizes" :key="size" direction="column" align="center" :size="8">
        <mp-avatar :size="size">{{ labels[size] }}</mp-avatar>
        <span class="label">{{ size }}px</span>
      </mp-space>
    </mp-space>

    <mp-space align="flex-end" :size="16" wrap>
      <mp-space v-for="size in imageSizes" :key="size" direction="column" align="center" :size="8">
        <mp-avatar image-url="/cat.jpg" :alt="`${size}px`" :size="size" />
        <span class="label">{{ size }}px</span>
      </mp-space>
    </mp-space>

    <mp-space align="flex-end" :size="16" wrap>
      <mp-space v-for="size in cssSizes" :key="size" direction="column" align="center" :size="8">
        <mp-avatar :size="size">Aa</mp-avatar>
        <span class="label">{{ size }}</span>
      </mp-space>
    </mp-space>
  </mp-space>
</template>

<script lang="ts" setup>
const numericSizes = [24, 32, 40, 48, 64] as const
const labels = { 24: 'A', 32: 'B', 40: 'C', 48: 'D', 64: 'E' } as const
const imageSizes = [28, 36, 48, 64, 78] as const
const cssSizes = ['3rem', '2.5em', '48px'] as const
</script>

<style scoped>
.label {
  color: var(--mp-color-text-3);
  font-size: var(--mp-font-size-sm);
}
</style>
