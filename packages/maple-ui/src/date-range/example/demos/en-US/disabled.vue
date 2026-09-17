<script setup>
import { reactive, ref } from 'vue'

const range = ref([])
const disabledRange = ref(['2024-01-01', '2024-01-15'])
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-date-range v-model="disabledRange" disabled />
  </mp-space>
</template>
