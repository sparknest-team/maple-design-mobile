<script setup lang="ts">
const placements = ['top', 'right', 'bottom', 'left'] as const
</script>

<template>
  <div class="trigger-placement-demo">
    <mp-trigger
      v-for="placement in placements"
      :key="placement"
      trigger="click"
      :placement="placement"
      :popup-offset="10"
      show-arrow
    >
      <mp-button variant="outline">{{ placement }}</mp-button>
      <template #content
        ><div class="trigger-placement-demo__panel">{{ placement }}</div></template
      >
    </mp-trigger>
  </div>
</template>

<style scoped>
.trigger-placement-demo {
  display: grid;
  grid-template-columns: repeat(2, minmax(100px, 1fr));
  gap: calc(var(--mp-sys-space-8) * 2);
  padding: calc(var(--mp-sys-space-8) * 3) calc(var(--mp-sys-space-8) + var(--mp-sys-space-4));
}

.trigger-placement-demo__panel {
  padding: var(--mp-sys-space-4) var(--mp-sys-space-5);
  color: var(--mp-sys-color-content-primary);
  background: var(--mp-sys-color-surface-overlay);
  border: 1px solid var(--mp-sys-color-border-default);
  border-radius: var(--mp-sys-radius-sm);
}
</style>
