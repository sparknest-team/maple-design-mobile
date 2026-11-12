<script setup lang="ts">
import { ref } from 'vue'

const immediate = ref('a')
const confirmed = ref('a')
const options = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
]
</script>
<template>
  <mp-space direction="column">
    <p>Choose and apply: {{ immediate }}</p>
    <mp-select v-model="immediate" :options="options" edit-mode="popup" />
    <p>Confirm before applying: {{ confirmed }}</p>
    <mp-select v-model="confirmed" :options="options" edit-mode="popup" need-confirm />
  </mp-space>
</template>
