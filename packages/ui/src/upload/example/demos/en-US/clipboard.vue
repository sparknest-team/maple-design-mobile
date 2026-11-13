<script setup lang="ts">
import { ref } from 'vue'
import { useUploader, type UploadFileItem } from '@maple-design/ui-vue'

const files = ref<UploadFileItem[]>([])
const message = ref('')
const rejectionMessages: Record<string, string> = {
  'max-files': 'Up to 3 images',
  'max-file-size': 'Each image must be at most 1 MiB',
  accept: 'Images only',
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
    message.value = rejected
      .map((item) => rejectionMessages[item.reason] ?? 'Unable to read the file; choose again')
      .join(', ')
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
    <p>
      Paste clipboard images into the field. Up to 3 images, each at most 1 MiB. Files stay local; ordinary text input
      is unchanged.
    </p>
    <mp-textarea placeholder="Paste images or text here" @paste="paste" />
    <mp-space wrap>
      <mp-button @click="addExample">Add a sample image</mp-button>
      <mp-button @click="reset">Clear files</mp-button>
    </mp-space>
    <p role="status">Accepted {{ files.length }} files.{{ message }}</p>
    <ul>
      <li v-for="file in files" :key="file.uid">{{ file.name }}</li>
    </ul>
  </mp-space>
</template>
