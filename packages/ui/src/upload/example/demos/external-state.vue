<script setup>
import { computed, ref } from 'vue'

const files = ref([])
const hasUploading = computed(() => files.value.some((file) => file.status === 'uploading'))
const hasRetryable = computed(() => files.value.some((file) => ['error', 'canceled'].includes(file.status)))
let sequence = 0

function read(file) {
  file.status = 'uploading'
  file.percent = 40
}

function addExample() {
  const file = new File(['Local external upload demo.'], `external-${++sequence}.txt`, { type: 'text/plain' })
  const item = {
    uid: `external-${sequence}`,
    name: file.name,
    size: file.size,
    type: file.type,
    file,
    status: 'ready',
    percent: 0,
  }
  read(item)
  files.value = [...files.value, item]
}

function complete() {
  files.value = files.value.map((file) =>
    file.status === 'uploading' ? { ...file, status: 'success', percent: 100 } : file,
  )
}

function retry() {
  files.value = files.value.map((file) =>
    ['error', 'canceled'].includes(file.status) ? { ...file, status: 'uploading', percent: 40 } : file,
  )
}
</script>

<template>
  <div>
    <p>业务端托管进度和结果；可加入本地示例项，无需选择文件，也不发送请求。</p>
    <mp-space wrap>
      <mp-button @click="addExample">加入外部上传项</mp-button>
      <mp-button :disabled="!hasUploading" @click="complete">模拟外部完成</mp-button>
      <mp-button :disabled="!hasRetryable" @click="retry">模拟外部重试</mp-button>
    </mp-space>
    <mp-upload v-model="files" edit-mode="direct" :show-retry-button="false" @read="read" />
    <p>队列状态：{{ files.map((file) => `${file.name}: ${file.status} (${file.percent}%)`).join('；') || '空' }}</p>
  </div>
</template>
