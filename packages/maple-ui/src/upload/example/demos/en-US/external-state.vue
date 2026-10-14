<script setup>
import { ref } from 'vue'

const files = ref([])
function read(file) {
  file.status = 'uploading'
  file.percent = 40
}
function complete() {
  files.value = files.value.map((file) => ({ ...file, status: 'success', percent: 100 }))
}
</script>
<template>
  <div>
    <p>Application-managed progress and results; no component request.</p>
    <mp-upload v-model="files" @read="read" /><mp-button @click="complete">Complete externally</mp-button>
  </div>
</template>
