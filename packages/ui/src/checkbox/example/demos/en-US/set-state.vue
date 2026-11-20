<script setup>
import { ref } from 'vue'

const selected = ref([])
</script>
<template>
  <mp-checkbox v-model="selected" :value="1">Option 1, selected values: {{ selected }}</mp-checkbox>
</template>
