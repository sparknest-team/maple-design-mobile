<script setup>
import { onBeforeUnmount, onDeactivated, ref } from 'vue'
import { useUploader } from '@maple-design/ui'

const files = ref([])
const reasons = ref([])
const mode = ref('valid')
const preparing = ref(0)
const requestCount = ref(0)
const pending = new Set()
const modes = [
  { label: 'Valid copy', value: 'valid' },
  { label: 'Text replacement', value: 'type' },
  { label: 'Oversized image', value: 'size' },
  { label: '600B each, 1024B total', value: 'total' },
]
let sequence = 0

function beforeUpload(file) {
  return new Promise((resolve) => {
    pending.add({ file, resolve })
    preparing.value = pending.size
  })
}

const uploader = useUploader({
  modelValue: () => files.value,
  onUpdateModelValue: (value) => {
    files.value = value
  },
  accept: () => 'image/*',
  maxFileSize: () => 1024,
  maxFiles: () => (mode.value === 'total' ? 2 : 1),
  maxTotalSize: () => 1024,
  resolveType: () => 'file',
  autoUpload: () => false,
  beforeUpload: () => beforeUpload,
  customRequest:
    () =>
    ({ onSuccess }) => {
      requestCount.value++
      onSuccess({ ok: true })
    },
  onRejected: (items) => {
    reasons.value = items.map((item) => item.reason)
  },
})

function add() {
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"/>'
  return uploader.addFiles([new File([svg], `prepare-${++sequence}.svg`, { type: 'image/svg+xml' })])
}

function submit() {
  reasons.value = []
  return uploader.submit()
}

function finish() {
  const jobs = [...pending]
  pending.clear()
  preparing.value = 0
  jobs.forEach(({ file, resolve }) => {
    const raw = file.file
    if (mode.value === 'type') {
      resolve(new File(['text'], 'replacement.txt', { type: 'text/plain' }))
    } else if (mode.value === 'size') {
      resolve(new File([new Uint8Array(1025)], raw.name, { type: raw.type }))
    } else if (mode.value === 'total') {
      resolve(new File([new Uint8Array(600)], raw.name, { type: raw.type }))
    } else {
      resolve(new File([raw], raw.name, { type: raw.type }))
    }
  })
}

function cleanup() {
  uploader.abort()
  pending.forEach(({ resolve }) => resolve(false))
  pending.clear()
  preparing.value = 0
}

function reset() {
  cleanup()
  uploader.reset()
  reasons.value = []
  requestCount.value = 0
}
onBeforeUnmount(cleanup)
onDeactivated(cleanup)
</script>

<template>
  <div class="upload-prepare-demo">
    <p>
      Submit to pause before-upload. Cancel and submit again before resolving both attempts; only the current valid
      attempt may start a local request.
    </p>
    <mp-radio-group v-model="mode" edit-mode="direct" :options="modes" />
    <mp-space wrap>
      <mp-button :disabled="files.length >= (mode === 'total' ? 2 : 1)" @click="add">Add sample image</mp-button>
      <mp-button :disabled="!files.some((file) => ['ready', 'error', 'canceled'].includes(file.status))" @click="submit"
        >Prepare and submit</mp-button
      >
      <mp-button :disabled="preparing === 0" @click="uploader.abort()">Cancel preparation</mp-button>
      <mp-button :disabled="preparing === 0" @click="finish">Resolve preparation</mp-button>
      <mp-button @click="reset">Reset queue</mp-button>
    </mp-space>
    <mp-upload
      v-model="files"
      edit-mode="direct"
      :show-upload-button="false"
      :show-retry-button="false"
      :preview="false"
    />
    <p>Pending preparations：{{ preparing }}</p>
    <p>Requests started：{{ requestCount }}</p>
    <p>Queue：{{ files.map((file) => `${file.status} (${file.percent}%)`).join(', ') || 'Empty' }}</p>
    <p>Queued bytes：{{ files.map((file) => file.size).join(', ') || '0' }}</p>
    <p>Rejected：{{ reasons.join(', ') || 'None' }}</p>
  </div>
</template>
