<script setup lang="ts">
const variants = ['circle', 'round', 'line', 'md3'] as const
</script>

<template>
  <mp-space wrap
    ><template v-for="variant in variants" :key="variant"
      ><mp-switch :variant="variant" readonly :aria-label="variant + ' off'" /><mp-switch
        :variant="variant"
        default-checked
        readonly
        :aria-label="variant + ' on'" /></template
  ></mp-space>
</template>
