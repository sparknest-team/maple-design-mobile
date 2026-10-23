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
])
</script>

<template>
  <div>
    <mp-upload v-model="files"
      ><template #remove-button="{ remove }"
        ><mp-button html-type="button" @click.stop="remove">移除文件</mp-button></template
      ></mp-upload
    >
  </div>
</template>
