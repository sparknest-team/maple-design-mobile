<script setup>
import { ref } from 'vue'

const files = ref([])
</script>

<template>
  <div>
    <mp-upload v-model="files"></mp-upload>
  </div>
</template>
