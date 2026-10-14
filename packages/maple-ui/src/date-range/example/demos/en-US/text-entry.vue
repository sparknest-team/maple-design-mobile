<script setup lang="ts">
import { ref } from 'vue'

const range = ref(['2025-01-15', '2025-01-20'])
const panelOnly = ref(false)
</script>

<template>
  <p>Type DD/MM/YYYY and commit with Enter or blur. Invalid or out-of-bounds text returns to the model.</p>
  <mp-switch v-model="panelOnly" />
  <p>Panel-only selection: {{ panelOnly }}</p>
  <mp-date-range v-model="range" format="DD/MM/YYYY" :disabled="[true, false]" :input-editable="!panelOnly" />
  <p>Start is locked; end cannot precede it: {{ range }}</p>
</template>
