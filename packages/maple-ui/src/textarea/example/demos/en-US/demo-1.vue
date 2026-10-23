<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const trimmed = ref('')
</script>
<template>
  <mp-space direction="column">
    <mp-textarea v-model="value" clearable placeholder="Enter multiple lines" aria-label="Controlled text" />
    <p role="status">Current value: {{ value || '(empty)' }}</p>
    <mp-textarea default-value="An uncontrolled initial value" aria-label="非Controlled text" />
    <mp-textarea
      v-model.trim="trimmed"
      placeholder="Enter surrounding whitespace, then blur"
      aria-label="Trimmed text"
    />
    <p role="status">Trimmed value: {{ JSON.stringify(trimmed) }}</p>
  </mp-space>
</template>
