<script setup lang="ts">
import { ref } from 'vue'

const attempts = ref(0)
</script>

<template>
  <mp-empty :description="attempts ? 'No data. Local refresh completed.' : 'No data, please reload'">
    <template #extra>
      <mp-button status="primary" @click="attempts++">Reload</mp-button>
      <p aria-live="polite">Local refresh attempts: {{ attempts }}</p>
    </template>
  </mp-empty>
</template>
