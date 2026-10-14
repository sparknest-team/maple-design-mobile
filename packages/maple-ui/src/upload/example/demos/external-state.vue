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
    <p>业务端托管进度和结果；组件不发请求。</p>
    <mp-upload v-model="files" @read="read" /><mp-button @click="complete">模拟外部完成</mp-button>
  </div>
</template>
