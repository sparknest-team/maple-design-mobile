<script setup lang="ts">
import { ref } from 'vue'

const clicks = ref(0)
</script>
<template>
  <div style="display: flex; flex-wrap: wrap; gap: 12px">
    <mp-button disabled @click="clicks++">Disabled button</mp-button>
    <mp-button component="a" href="#blocked-button-link" disabled @click="clicks++">Disabled link</mp-button>
    <mp-button component="a" href="#blocked-button-link" loading @click="clicks++">Loading link</mp-button>
  </div>
  <p aria-live="polite">Blocked clicks: {{ clicks }}</p>
</template>
