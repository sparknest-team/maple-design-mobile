<script setup>
import { ref } from 'vue'

const date = ref(['2021-04-08', '2021-04-20'])
</script>

<template>
  <mp-date-picker v-model="date" type="date" range />
</template>
