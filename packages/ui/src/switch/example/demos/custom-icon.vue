<script setup lang="ts">
const variants = ['circle', 'round', 'line', 'tonal'] as const
</script>

<template>
  <mp-space wrap
    ><mp-switch v-for="variant in variants" :key="variant" :variant="variant" :aria-label="variant"
      ><template #checked-icon>✓</template><template #unchecked-icon>×</template></mp-switch
    ></mp-space
  >
</template>
