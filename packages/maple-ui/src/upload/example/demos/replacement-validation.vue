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
      返回最新缩略图
    </mp-button>
    <mp-button html-type="button" :disabled="!pendingThumbnails.length" @click="settleThumbnail()"
      >返回最早缩略图</mp-button
    >
    <mp-button html-type="button" :disabled="!pendingThumbnails.length" @click="settleThumbnail(true)"
      >拒绝最早缩略图</mp-button
    >
    <mp-checkbox v-model="readDataUrl">使用原生 FileReader 读取为 data-url</mp-checkbox>
    <mp-checkbox v-model="readObjectUrl">使用原生 Blob/object-url（优先）</mp-checkbox>
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
    <p>仅接受图片；单文件 1 MiB、合计 2 MiB、最多 3 个。每个示例均经过 before-read。</p>
    <mp-space wrap>
      <mp-button @click="probe('valid')">加入小图片</mp-button>
      <mp-button @click="probe('type')">替换为文本</mp-button>
      <mp-button @click="probe('size')">替换为超大图片</mp-button>
      <mp-button @click="probe('total')">加入 768 KiB 图片</mp-button>
      <mp-button @click="reset">重置队列</mp-button>
    </mp-space>
    <mp-checkbox v-model="pauseThumbnail">暂停本地缩略图 Promise</mp-checkbox>
    <mp-upload v-model="files" :show-upload-button="false" :preview="false" />
    <p>队列：{{ files.map((file) => file.name).join(', ') || '空' }}</p>
    <p>拒绝原因：{{ reasons.join(', ') || '无' }}</p>
  </div>
</template>
