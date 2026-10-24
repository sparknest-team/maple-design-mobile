<script setup>
import { onBeforeUnmount, onDeactivated, ref, shallowRef } from 'vue'
import { useUploader } from '@maple-design/ui'

const endpoint = ref('')
const files = ref([])
const headers = shallowRef([])
const data = shallowRef([])
const successes = ref(0)
const errors = ref(0)
const response = ref(null)
let sequence = 0
function wait(queue, file) {
  return new Promise((resolve, reject) => {
    queue.value = [...queue.value, { file, resolve, reject }]
  })
}
function finish(queue, kind) {
  const jobs = queue.value
  queue.value = []
  jobs.forEach((job) =>
    job.resolve(kind === 'headers' ? { 'X-Demo-Upload': job.file.name } : { auditMarker: 'audit-local' }),
  )
}
const uploader = useUploader({
  modelValue: () => files.value,
  onUpdateModelValue: (value) => {
    files.value = value
  },
  action: () => endpoint.value,
  headers: () => (file) => wait(headers, file),
  data: () => (file) => wait(data, file),
  name: () => 'attachment',
  autoUpload: () => false,
  resolveType: () => 'file',
  onSuccess: (file) => {
    successes.value++
    response.value = file.response
  },
  onError: () => {
    errors.value++
  },
})
function add() {
  return uploader.addFiles([
    new File(['Synthetic upload audit only.'], `metadata-${++sequence}.txt`, { type: 'text/plain' }),
  ])
}
function cleanup() {
  uploader.abort()
  finish(headers, 'headers')
  finish(data, 'data')
}
function finishHeaders() {
  finish(headers, 'headers')
}
function finishData() {
  finish(data, 'data')
}
function rejectHeaders() {
  rejectPending(headers, 'headers')
}
function rejectData() {
  rejectPending(data, 'data')
}
function rejectPending(queue, kind) {
  const jobs = queue.value
  queue.value = []
  jobs.forEach((job) => job.reject(new Error(`Synthetic ${kind} rejection`)))
}
function reset() {
  cleanup()
  uploader.reset()
  successes.value = 0
  errors.value = 0
  response.value = null
}
onBeforeUnmount(cleanup)
onDeactivated(cleanup)
</script>
<template>
  <section class="metadata-upload-demo">
    <p>
      Uses the default XHR transport. Configure a local endpoint you control; headers and data await manual completion.
      No address is configured by default.
    </p>
    <label>Local upload endpoint <mp-input v-model="endpoint" placeholder="http://127.0.0.1:4197/upload" /></label>
    <mp-space wrap>
      <mp-button :disabled="files.length > 0" @click="add">Add synthetic file</mp-button>
      <mp-button
        :disabled="!endpoint || !files.some((file) => ['ready', 'error', 'canceled'].includes(file.status))"
        @click="uploader.submit()"
        >Submit metadata request</mp-button
      >
      <mp-button :disabled="!files.some((file) => file.status === 'uploading')" @click="uploader.abort()"
        >Cancel metadata request</mp-button
      >
      <mp-button :disabled="!headers.length" @click="finishHeaders">Resolve headers</mp-button>
      <mp-button :disabled="!data.length" @click="finishData">Resolve data</mp-button>
      <mp-button :disabled="!headers.length" @click="rejectHeaders">Reject headers</mp-button>
      <mp-button :disabled="!data.length" @click="rejectData">Reject data</mp-button>
      <mp-button @click="reset">Reset metadata demo</mp-button>
    </mp-space>
    <mp-upload v-model="files" :show-upload-button="false" :show-retry-button="false" :preview="false" />
    <p role="status">
      Headers pending: {{ headers.length }}; Data pending: {{ data.length }}; Success: {{ successes }}; Errors:
      {{ errors }}
    </p>
    <p>Model: {{ files.map((file) => file.name + ': ' + file.status).join(', ') || 'empty' }}</p>
    <pre>{{ response }}</pre>
  </section>
</template>
