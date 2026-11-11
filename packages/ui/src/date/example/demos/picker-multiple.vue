<script setup>
import { ref } from 'vue'

const date = ref([])
</script>

<template>
  <mp-date-picker v-model="date" multiple />
</template>
