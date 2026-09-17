<script setup>
import { onUnmounted, reactive } from 'vue'

const values = reactive({
  files: [],
  files2: [
    {
      uid: 'example-1',
      percent: 0,
      url: 'cat.jpg',
      thumbnailUrl: 'cat.jpg',
      status: 'ready',
    },
    {
      uid: 'example-2',
      percent: 0,
      url: 'https://www.runoob.com/try/demo_source/mov_bbb.mp4',
      thumbnailUrl: 'cover.jpg',
      status: 'ready',
    },
  ],
  files3: [
    {
      uid: 'example-3',
      percent: 0,
      url: 'cat.jpg',
      thumbnailUrl: 'cat.jpg',
      status: 'uploading',
    },
    {
      uid: 'example-4',
      percent: 0,
      url: 'cat.jpg',
      thumbnailUrl: 'cat.jpg',
      status: 'success',
    },
    {
      uid: 'example-5',
      percent: 0,
      url: 'cat.jpg',
      thumbnailUrl: 'cat.jpg',
      status: 'error',
    },
  ],
  files4: [],
  files5: [],
  files6: [],
  files7: [],
  files8: [],
  files9: [],
  files11: [
    {
      uid: 'example-6',
      percent: 0,
      url: 'cat.jpg',
      thumbnailUrl: 'cat.jpg',
      status: 'ready',
    },
  ],
  files12: [
    {
      uid: 'example-7',
      percent: 0,
      url: 'cat.jpg',
      thumbnailUrl: 'cat.jpg',
      status: 'uploading',
    },
    {
      uid: 'example-8',
      percent: 0,
      url: 'cat.jpg',
      thumbnailUrl: 'cat.jpg',
      status: 'success',
    },
    {
      uid: 'example-9',
      percent: 0,
      url: 'cat.jpg',
      thumbnailUrl: 'cat.jpg',
      status: 'error',
    },
  ],
  files13: [],
  files14: [],
  files15: [],
})
function handleAfterRead(file) {
  console.log(file)
}
</script>

<template>
  <mp-upload v-model="values.files" @after-read="handleAfterRead" />
</template>

<style lang="less" scoped>
.space {
  height: 40px;
}

.custom-upload-file {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 12px;
  object-fit: cover;
}

.custom-remove-button {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 3;
}
</style>
