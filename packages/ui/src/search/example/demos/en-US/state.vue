<script setup>
import { ref } from 'vue'

const disabledValue = ref('Disabled')
</script>

<template>
  <mp-search v-model="disabledValue" placeholder="Search" disabled />
</template>
