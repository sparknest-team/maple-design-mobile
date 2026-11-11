<script setup lang="ts">
import { ref } from 'vue'

const monthModel = ref('2025 January 15')
const numericModel = ref('2025-01-15')
</script>

<template>
  <p>
    Switch the language in the header. Display and typed text follow the UI language; the model protocol stays stable.
  </p>
  <mp-date v-model="monthModel" value-format="YYYY MMMM DD" format="YYYY MMMM DD" panel-type="calendar" />
  <p>Month-name model (stable English protocol): {{ monthModel }}</p>
  <mp-date v-model="numericModel" format="YYYY MMMM DD" panel-type="calendar" />
  <p>Numeric model: {{ numericModel }}</p>
</template>
