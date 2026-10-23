<script setup>
import { onBeforeUnmount, onDeactivated, ref, shallowRef } from 'vue'
import { useUploader } from '@maplejs/maple-ui'

const files = ref([])
const handles = shallowRef([])
const callbacks = shallowRef([])
const requests = ref(0)
const aborts = ref(0)
const accepted = ref(0)
let sequence = 0
let generation = 0
const uploader = useUploader({
  modelValue: () => files.value,
  onUpdateModelValue: (value) => {
    files.value = value
  },
  resolveType: () => 'file',
  autoUpload: () => false,
  customRequest: () => (options) => {
    const current = generation
    requests.value++
    callbacks.value = [...callbacks.value, options]
    return new Promise((resolve) => {
      handles.value = [
        ...handles.value,
        {
          resolve: () =>
            resolve({
              abort: () => {
                if (current === generation) {
                  aborts.value++
                }
              },
            }),
        },
      ]
    })
  },
  onSuccess: () => {
    accepted.value++
  },
})
function add() {
  return uploader.addFiles([
    new File(['Local delayed transport; no network.'], `late-${++sequence}.txt`, { type: 'text/plain' }),
  ])
}
function release() {
  const pending = handles.value
  handles.value = []
  pending.forEach((job) => job.resolve())
}
function complete() {
  const pending = callbacks.value
  callbacks.value = []
  pending.forEach((options) => options.onSuccess({ local: true }))
}
function cleanup() {
  generation++
  uploader.abort()
  release()
  callbacks.value = []
}
function reset() {
  cleanup()
  uploader.reset()
  requests.value = 0
  aborts.value = 0
  accepted.value = 0
}
onBeforeUnmount(cleanup)
onDeactivated(cleanup)
</script>

<template>
  <section class="late-upload-demo">
    <p>
      Return the request handle after cancellation: it must be aborted, and late success must not restore a canceled
      item. No network.
    </p>
    <mp-space wrap>
      <mp-button :disabled="files.length > 0" @click="add">Add local file</mp-button>
      <mp-button
        :disabled="!files.some((file) => ['ready', 'error', 'canceled'].includes(file.status))"
        @click="uploader.submit()"
        >Start mock request</mp-button
      >
      <mp-button :disabled="!files.some((file) => file.status === 'uploading')" @click="uploader.abort()"
        >Cancel mock request</mp-button
      >
      <mp-button :disabled="!handles.length" @click="release">Return all handles</mp-button>
      <mp-button :disabled="!callbacks.length" @click="complete">Return all success callbacks</mp-button>
      <mp-button @click="reset">Reset mock</mp-button>
    </mp-space>
    <mp-upload v-model="files" :show-upload-button="false" :show-retry-button="false" :preview="false" />
    <p role="status">
      Pending handles: {{ handles.length }}; Requests: {{ requests }}; Aborts: {{ aborts }}; Accepted successes:
      {{ accepted }}
    </p>
    <p>Model: {{ files.map((file) => file.name + ': ' + file.status).join(', ') || 'empty' }}</p>
  </section>
</template>
