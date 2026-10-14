<script setup>
import { ref } from 'vue'

const files = ref([
  {
    uid: 'image',
    name: 'example.svg',
    type: 'image/svg+xml',
    url: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22%3E%3Crect width=%22120%22 height=%22120%22 fill=%22%236750a4%22/%3E%3C/svg%3E',
    status: 'success',
    percent: 100,
  },
  {
    uid: 'video',
    name: 'sample.mp4',
    type: 'video/mp4',
    url: 'https://www.runoob.com/try/demo_source/mov_bbb.mp4',
    status: 'success',
    percent: 100,
  },
])
const enabled = ref(true)
</script>

<template>
  <div>
    <label><input v-model="enabled" type="checkbox" /> 启用内置预览</label>
    <mp-upload v-model="files" list-type="picture" :preview="enabled"></mp-upload>
  </div>
</template>
