<script setup>
import { reactive, ref } from 'vue'

const date = ref()
const disabledDate = ref('2024-01-15')
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-date v-model="disabledDate" disabled />
  </mp-space>
</template>
