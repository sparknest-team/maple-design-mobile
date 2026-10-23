<script setup>
import { ref } from 'vue'

const files = ref([])
const allow = ref(false)
const requestChoose = (chooseFile) => {
  if (allow.value) {
    chooseFile()
  }
}
</script>

<template>
  <div>
    <mp-checkbox v-model="allow">Allow this operation</mp-checkbox>
    <mp-upload v-model="files" :request-choose="requestChoose"></mp-upload>
  </div>
</template>
