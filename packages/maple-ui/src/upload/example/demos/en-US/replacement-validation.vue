<script setup>
import { onBeforeUnmount, onDeactivated, ref, shallowRef } from 'vue'
import { useUploader } from '@maplejs/maple-ui'

const files = ref([])
const readDataUrl = ref(false)
const readObjectUrl = ref(false)
const pauseThumbnail = ref(false)
const pendingThumbnails = shallowRef([])
const decoded = ref(0)
const reasons = ref([])
const replacements = new WeakMap()
const maxFileSize = 1048576
const maxTotalSize = 2097152
const maxFiles = 3
const svg =
  '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><rect width="16" height="16" fill="#4caf50"/></svg>'
let sequence = 0

function replace(file) {
  const mode = replacements.get(file)
  if (mode === 'type') {
    return new File(['text replacement'], file.name.replace('.svg', '.txt'), { type: 'text/plain' })
  }
  if (mode === 'size') {
    return new File([new Uint8Array(maxFileSize + 1)], file.name, { type: file.type })
  }
  return new File([file], file.name, { type: file.type })
}

const uploader = useUploader({
  modelValue: () => files.value,
  onUpdateModelValue: (value) => {
    files.value = value
  },
  accept: () => 'image/*',
  maxFiles: () => maxFiles,
  createThumbnailUrl: () =>
    pauseThumbnail.value
      ? () =>
          new Promise((resolve, reject) => {
            pendingThumbnails.value = [...pendingThumbnails.value, { resolve, reject }]
          })
      : undefined,
  maxFileSize: () => maxFileSize,
  maxTotalSize: () => maxTotalSize,
  resolveType: () => (readObjectUrl.value ? 'object-url' : readDataUrl.value ? 'data-url' : 'file'),
  beforeRead: () => replace,
  onRejected: (items) => {
    reasons.value = items.map((item) => item.reason)
  },
})

function probe(mode) {
  reasons.value = []
  const payload = mode === 'total' ? svg.padEnd(786432, ' ') : svg
  const file = new File([payload], `sample-${++sequence}.svg`, { type: 'image/svg+xml' })
  replacements.set(file, mode)
  return uploader.addFiles([file])
}

function reset() {
  uploader.reset()
  decoded.value = 0
  reasons.value = []
}
function settleThumbnail(fail = false, latest = false) {
  const tasks = [...pendingThumbnails.value]
  const task = latest ? tasks.pop() : tasks.shift()
  if (!task) {
    return
  }
  pendingThumbnails.value = tasks
  if (fail) {
    task.reject(new Error('Local thumbnail failure'))
  } else {
    task.resolve('data:image/svg+xml,' + encodeURIComponent(svg))
  }
}
function cleanupThumbnails() {
  const tasks = pendingThumbnails.value
  pendingThumbnails.value = []
  tasks.forEach((task) => task.resolve(undefined))
}
onBeforeUnmount(cleanupThumbnails)
onDeactivated(cleanupThumbnails)
</script>

<template>
  <div class="upload-read-demo">
    <p class="thumbnail-pending">Pending thumbnails: {{ pendingThumbnails.length }}</p>
    <mp-button html-type="button" :disabled="!pendingThumbnails.length" @click="settleThumbnail(false, true)">
      Resolve newest thumbnail
    </mp-button>
    <mp-button html-type="button" :disabled="!pendingThumbnails.length" @click="settleThumbnail()">
      Resolve oldest thumbnail
    </mp-button>
    <mp-button html-type="button" :disabled="!pendingThumbnails.length" @click="settleThumbnail(true)">
      Reject oldest thumbnail
    </mp-button>
    <mp-checkbox v-model="readDataUrl">Read with native FileReader / data-url</mp-checkbox>
    <mp-checkbox v-model="readObjectUrl">Use native Blob/object-url (takes priority)</mp-checkbox>
    <output>Blob URLs: {{ files.filter((file) => file.url?.startsWith('blob:')).length }}</output>
    <p role="status">
      Data URLs: {{ files.filter((file) => file.url?.startsWith('data:')).length }} · Decoded images: {{ decoded }}
    </p>
    <img
      v-for="file in files.filter((file) => /^(data:|blob:)/.test(file.thumbnailUrl || ''))"
      :key="file.uid"
      :src="file.thumbnailUrl"
      :alt="file.name"
      width="16"
      height="16"
      @load="decoded++"
    />
    <p>Images only; 1 MiB per file, 2 MiB total, up to 3 files. Every sample passes through before-read.</p>
    <mp-space wrap>
      <mp-button @click="probe('valid')">Add small image</mp-button>
      <mp-button @click="probe('type')">Replace with text</mp-button>
      <mp-button @click="probe('size')">Replace with oversized image</mp-button>
      <mp-button @click="probe('total')">Add 768 KiB image</mp-button>
      <mp-button @click="reset">Reset queue</mp-button>
    </mp-space>
    <mp-checkbox v-model="pauseThumbnail">Pause local thumbnail promise</mp-checkbox>
    <mp-upload v-model="files" :show-upload-button="false" :preview="false" />
    <p>Queue：{{ files.map((file) => file.name).join(', ') || 'Empty' }}</p>
    <p>Rejected：{{ reasons.join(', ') || 'None' }}</p>
  </div>
</template>
