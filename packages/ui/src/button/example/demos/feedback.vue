<script setup lang="ts">
import { ref } from 'vue'

const ripple = ref(true)
const elevation = ref(0)
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <mp-checkbox v-model="ripple">Ripple</mp-checkbox>
      <label>Elevation<mp-input-number v-model="elevation" :min="0" :max="24" aria-label="Button elevation" /></label>
    </mp-space>
    <mp-button variant="default" :ripple="ripple" :elevation="elevation">Click to compare feedback</mp-button>
  </mp-space>
</template>
