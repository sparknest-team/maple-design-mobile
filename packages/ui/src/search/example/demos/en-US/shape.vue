<script setup>
import { ref } from 'vue'

const squareValue = ref('')
</script>

<template>
  <mp-search v-model="squareValue" placeholder="Search" shape="square" />
</template>
