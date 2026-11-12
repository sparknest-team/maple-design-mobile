<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const options = ['Design', 'Engineering', 'Operations']
</script>

<template>
  <div>
    <p>Choose a suggestion to commit immediately, or confirm custom text.</p>
    <mp-auto-complete v-model="value" edit-mode="popup" :options="options" />
    <p>Committed value: {{ value || '—' }}</p>
  </div>
</template>
