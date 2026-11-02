<script setup lang="ts">
import { ref } from 'vue'

const stacked = ref(false)
const vertical = ref(false)
const loading = ref(false)
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <mp-checkbox v-model="stacked">Stacked labels</mp-checkbox>
      <mp-checkbox v-model="vertical">Vertical group</mp-checkbox>
      <mp-checkbox v-model="loading">Load first action</mp-checkbox>
    </mp-space>
    <mp-button-group aria-label="Save or cancel" status="primary" :stacked="stacked" :vertical="vertical">
      <mp-button :loading="loading"
        ><template #icon><m-icon-check /></template>Save</mp-button
      >
      <mp-button
        ><template #icon><m-icon-close /></template>Cancel</mp-button
      >
    </mp-button-group>
  </mp-space>
</template>
