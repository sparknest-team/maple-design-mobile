<script setup lang="ts">
import { computed, ref } from 'vue'

const statuses = ['info', 'success', 'warning', 'danger', 'question', 'empty'] as const
const index = ref(0)
const status = computed(() => statuses[index.value])
</script>

<template>
  <mp-result data-demo-result :status="status" :title="'Result: ' + status" subtitle="Local state preview">
    <template #extra>
      <mp-space wrap>
        <mp-button status="primary" @click="index = (index + 1) % statuses.length">Next status</mp-button>
        <mp-button @click="index = 0">Reset status</mp-button>
      </mp-space>
      <p aria-live="polite">Current status: {{ status }}</p>
    </template>
  </mp-result>
</template>
