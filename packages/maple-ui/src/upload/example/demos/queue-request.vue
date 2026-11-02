<script setup lang="ts">
import { onBeforeUnmount, onDeactivated, ref } from 'vue'
import type { UploadFileItem, UploadInstance, UploadProgressEvent, UploadRequestOptions } from '@maple-design/ui'

const files = ref<UploadFileItem[]>([])
const uploader = ref<UploadInstance>()
const failOnce = ref(false)
const activeRequests = ref(0)
const timers = new Set<ReturnType<typeof setInterval>>()
const attempts = new Map<string, number>()
const exampleUrls = new Set<string>()
let sequence = 0

function addExample() {
  const file = new File(['Local upload demo; no network.'], `example-${++sequence}.txt`, { type: 'text/plain' })
  const url = URL.createObjectURL(file)
  exampleUrls.add(url)
  files.value = [
    ...files.value,
    {
      uid: `demo-queue-${sequence}`,
      name: file.name,
      size: file.size,
      type: file.type,
      file,
      url,
      status: 'ready',
      percent: 0,
    },
  ]
}

function request({ file, onProgress, onSuccess, onError }: UploadRequestOptions) {
  const attempt = (attempts.get(file.uid) ?? 0) + 1
  attempts.set(file.uid, attempt)
  const reject = failOnce.value && attempt === 1
  let percent = 0
  const stop = () => {
    clearInterval(timer)
    timers.delete(timer)
    activeRequests.value = timers.size
  }
  const timer = setInterval(() => {
    percent += 10
    onProgress({ percent } as UploadProgressEvent)
    if (percent >= 100) {
      stop()
      if (reject) {
        onError(new Error('Simulated first-attempt failure'))
      } else {
        onSuccess({ ok: true, attempt })
      }
    }
  }, 200)
  timers.add(timer)
  activeRequests.value = timers.size
  return { abort: stop }
}

function cleanup() {
  uploader.value?.abort()
  timers.forEach((timer) => clearInterval(timer))
  timers.clear()
  activeRequests.value = 0
}
onBeforeUnmount(() => {
  cleanup()
  exampleUrls.forEach((url) => URL.revokeObjectURL(url))
  exampleUrls.clear()
})
onDeactivated(cleanup)
</script>

<template>
  <div>
    <p>本地模拟请求；支持取消、重试和手动提交，不访问网络。</p>
    <mp-checkbox v-model="failOnce" edit-mode="direct">首次请求失败（重试成功）</mp-checkbox>
    <mp-space wrap>
      <mp-button @click="addExample">加入示例文件</mp-button>
      <mp-button @click="uploader?.submit()">提交队列</mp-button>
    </mp-space>
    <mp-upload
      ref="uploader"
      v-model="files"
      edit-mode="direct"
      multiple
      :auto-upload="false"
      :custom-request="request"
    />
    <p>队列状态：{{ files.map((file) => `${file.name}: ${file.status} (${file.percent}%)`).join('；') || '空' }}</p>
    <p>活动请求：{{ activeRequests }}</p>
  </div>
</template>
