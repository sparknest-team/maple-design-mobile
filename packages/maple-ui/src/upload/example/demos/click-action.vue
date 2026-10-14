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
    <label><input v-model="allow" type="checkbox" /> 允许此操作</label>
    <mp-upload v-model="files" :request-choose="requestChoose"></mp-upload>
  </div>
</template>
