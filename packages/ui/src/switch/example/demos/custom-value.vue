<script setup lang="ts">
import { ref } from 'vue'

const value = ref('disabled')
const lastChange = ref('—')
</script>

<template>
  <mp-space direction="column"
    ><mp-switch
      v-model="value"
      checked-value="enabled"
      unchecked-value="disabled"
      aria-label="String value"
      @change="lastChange = String($event)"
    /><output aria-live="polite">Value: {{ value }}; change: {{ lastChange }}</output></mp-space
  >
</template>
