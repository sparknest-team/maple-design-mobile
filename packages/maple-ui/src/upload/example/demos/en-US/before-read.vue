<script setup>
import { ref } from 'vue'

const files = ref([])
const beforeRead = (file) => file.size <= 1024 * 1024
</script>

<template>
  <div>
    <p>Reading is allowed only for files up to 1 MB.</p>
    <mp-upload v-model="files" :before-read="beforeRead"></mp-upload>
  </div>
</template>
