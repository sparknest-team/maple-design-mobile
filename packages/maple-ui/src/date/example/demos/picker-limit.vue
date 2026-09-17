<script setup>
import { ref } from 'vue'

const date = ref('2020-11-11')

const disabledDate = (val) => parseInt(val.split('-')[2], 10) % 2 === 0
</script>

<template>
  <mp-date-picker v-model="date" min="2020-10-15" max="2021-01-15" :disabled-date="disabledDate" />
</template>
