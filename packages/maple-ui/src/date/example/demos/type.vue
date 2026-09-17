<script setup>
import { reactive, ref } from 'vue'

const date = ref()
const year = ref()
const month = ref()
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-date v-model="year" type="year" placeholder="选择年" clearable />
    <mp-date v-model="month" type="month" placeholder="选择月" clearable />
  </mp-space>
</template>
