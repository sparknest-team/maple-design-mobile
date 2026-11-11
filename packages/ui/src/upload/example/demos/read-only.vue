<script setup>
import { ref } from 'vue'

const files = ref([])
const last = ref('')
</script>
<template>
  <div>
    <p>不配置 action/custom-request：只读取文件，不发送请求。</p>
    <mp-upload v-model="files" multiple list-type="picture" @read="(file) => (last = file.name)" />
    <p>最近读取：{{ last }}</p>
  </div>
</template>
