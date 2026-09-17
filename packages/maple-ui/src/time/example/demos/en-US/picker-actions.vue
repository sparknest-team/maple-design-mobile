<script setup>
import { ref } from 'vue'

const date = ref('17:36:22')
</script>

<template>
  <mp-time-picker v-model="date">
    <template #actions>
      <mp-space size="sm">
        <mp-button status="primary" variant="text">ACTION</mp-button>
        <mp-button status="primary" variant="text">ACTION</mp-button>
      </mp-space>
    </template>
  </mp-time-picker>
</template>
