<script setup>
import { reactive, ref } from 'vue'

const range = ref([])
const disabledRange = ref(['09:00', '18:00'])
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-time-range v-model="disabledRange" format="24hr" disabled />
  </mp-space>
</template>
