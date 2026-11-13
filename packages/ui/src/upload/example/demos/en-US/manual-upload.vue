<script setup lang="ts">
import { computed, onBeforeUnmount, onDeactivated, ref } from 'vue'
import type { UploadCustomRequest, UploadFileItem, UploadInstance, UploadProgressEvent } from '@maple-design/ui-vue'

const files = ref<UploadFileItem[]>([])
const uploader = ref<UploadInstance>()
const failOnce = ref(false)
const timers = new Set<ReturnType<typeof setInterval>>()
const attempts = new Map<string, number>()
const pending = computed(() => files.value.some((file) => ['ready', 'error', 'canceled'].includes(file.status)))
let sequence = 0
function addSample() {
  const file = new File(['Local upload example.'], `example-${++sequence}.txt`, { type: 'text/plain' })
  files.value = [
    ...files.value,
    { uid: `sample-${sequence}`, name: file.name, size: file.size, type: file.type, file, status: 'ready', percent: 0 },
  ]
}
const request: UploadCustomRequest = ({ file, onProgress, onSuccess, onError }) => {
  const attempt = (attempts.get(file.uid) ?? 0) + 1
  attempts.set(file.uid, attempt)
  const reject = failOnce.value && attempt === 1
  let percent = 0
  const stop = () => {
    clearInterval(timer)
    timers.delete(timer)
  }
  const timer = setInterval(() => {
    percent += 10
    onProgress({ percent } as UploadProgressEvent)
    if (percent >= 100) {
      stop()
      if (reject) {
        onError(new Error('Simulated upload failure; retry to continue'))
      } else {
        onSuccess({ ok: true })
      }
    }
  }, 150)
  timers.add(timer)
  return { abort: stop }
}
function cleanup() {
  uploader.value?.abort()
  timers.forEach((timer) => clearInterval(timer))
  timers.clear()
}
onBeforeUnmount(cleanup)
onDeactivated(cleanup)
</script>

<template>
  <mp-space direction="column">
    <mp-checkbox v-model="failOnce">Fail the first attempt</mp-checkbox>
    <mp-upload ref="uploader" v-model="files" multiple :auto-upload="false" :custom-request="request" />
    <mp-space wrap>
      <mp-button @click="addSample">Add a sample</mp-button>
      <mp-button :disabled="!pending" @click="uploader?.submit()">Start upload</mp-button>
    </mp-space>
    <p role="status">Completed: {{ files.filter((file) => file.status === 'success').length }} / {{ files.length }}</p>
  </mp-space>
</template>
