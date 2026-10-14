<script setup>
import { ref } from 'vue'

const files = ref([])
const last = ref('')
</script>
<template>
  <div>
    <p>Without action/custom-request, files are read without network requests.</p>
    <mp-upload v-model="files" multiple list-type="picture" @read="(file) => (last = file.name)" />
    <p>Last read: {{ last }}</p>
  </div>
</template>
