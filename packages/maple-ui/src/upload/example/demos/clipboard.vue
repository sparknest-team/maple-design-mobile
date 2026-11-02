<script setup lang="ts">
import { ref } from 'vue'
import { useUploader, type UploadFileItem } from '@maple-design/ui'

const files = ref<UploadFileItem[]>([])
const message = ref('')
const rejectionMessages: Record<string, string> = {
  'max-files': '最多接收 3 张图片',
  'max-file-size': '单张图片不能超过 1 MiB',
  accept: '仅支持图片文件',
}
const uploader = useUploader({
  modelValue: () => files.value,
  onUpdateModelValue: (value) => {
    files.value = value
  },
  accept: () => 'image/*',
  maxFiles: () => 3,
  maxFileSize: () => 1024 * 1024,
  autoUpload: () => false,
  onRejected: (rejected) => {
    message.value = rejected.map((item) => rejectionMessages[item.reason] ?? '文件未能读取，请重新选择').join(', ')
  },
})
function paste(event: ClipboardEvent) {
  const incoming = Array.from(event.clipboardData?.files ?? [])
  if (!incoming.length) {
    return
  }
  event.preventDefault()
  message.value = ''
  uploader.addFiles(incoming)
}
function addExample() {
  message.value = ''
  uploader.addFiles([
    new File(['<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8"/>'], 'local-example.svg', {
      type: 'image/svg+xml',
    }),
  ])
}
function reset() {
  uploader.reset()
  message.value = ''
}
</script>
<template>
  <mp-space direction="column">
    <p>将剪贴板图片粘贴到输入区。最多 3 张，每张不超过 1 MiB；只读取文件，不上传。普通文本粘贴仍按原生输入处理。</p>
    <mp-textarea placeholder="在这里粘贴图片或文本" @paste="paste" />
    <mp-space wrap>
      <mp-button @click="addExample">加入本地示例图片</mp-button>
      <mp-button @click="reset">清空列表</mp-button>
    </mp-space>
    <p role="status">已接收 {{ files.length }} 个文件。{{ message }}</p>
    <ul>
      <li v-for="file in files" :key="file.uid">{{ file.name }}</li>
    </ul>
  </mp-space>
</template>
