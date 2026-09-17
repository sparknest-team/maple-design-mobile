<script setup>
import { reactive, ref } from 'vue'

const date = ref()
const multiple = ref([])
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-date v-model="multiple" multiple placeholder="Select multiple dates" clearable />
  </mp-space>
</template>
