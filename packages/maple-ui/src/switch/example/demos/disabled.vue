<script setup lang="ts">
const variants = ['circle', 'round', 'line', 'tonal'] as const
</script>

<template>
  <mp-space wrap
    ><template v-for="variant in variants" :key="variant"
      ><mp-switch :variant="variant" disabled :aria-label="variant + ' off'" /><mp-switch
        :variant="variant"
        :default-value="true"
        disabled
        :aria-label="variant + ' on'" /></template
  ></mp-space>
</template>
