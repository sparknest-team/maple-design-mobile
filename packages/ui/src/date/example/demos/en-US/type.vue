<script setup>
import { reactive, ref } from 'vue'

const date = ref()
const year = ref()
const month = ref()
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-date v-model="year" type="year" placeholder="Select a year" clearable />
    <mp-date v-model="month" type="month" placeholder="Select a month" clearable />
  </mp-space>
</template>
