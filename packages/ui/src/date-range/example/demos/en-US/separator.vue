<script setup>
import { reactive, ref } from 'vue'

const range = ref([])
const customSeparator = ref([])
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-date-range v-model="customSeparator" separator=" to " placeholder="Custom separator" clearable />
  </mp-space>
</template>
