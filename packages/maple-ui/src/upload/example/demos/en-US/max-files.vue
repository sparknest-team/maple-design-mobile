<script setup>
import { ref } from 'vue'

const files = ref([])
const count = ref(0)
const onExceed = (files) => {
  count.value = files.length
}
</script>

<template>
  <div>
    <mp-upload v-model="files" :max-files="2" multiple @exceed="onExceed"></mp-upload>
    <p>Rejected by count：{{ count }}</p>
  </div>
</template>
