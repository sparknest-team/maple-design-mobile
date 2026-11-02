<!-- Source: src/upload/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/upload -->

# Upload 上传

读取、队列和请求采用两端独立复制的同源实现；未配置 action/custom-request 时仅读取，供业务自行管理进度与结果。

## 案例

### 基本使用

Example source: src/upload/example/demos/basic-usage.vue

```vue
<script setup>
import { ref } from 'vue'

const files = ref([])
</script>

<template>
  <div>
    <mp-upload v-model="files"></mp-upload>
  </div>
</template>
```

### 禁用

Example source: src/upload/example/demos/disabled.vue

```vue
<script setup>
import { ref } from 'vue'

const files = ref([
  {
    uid: 'image',
    name: 'example.svg',
    type: 'image/svg+xml',
    url: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22%3E%3Crect width=%22120%22 height=%22120%22 fill=%22%236750a4%22/%3E%3C/svg%3E',
    status: 'success',
    percent: 100,
  },
])
</script>

<template>
  <div>
    <mp-upload v-model="files" disabled></mp-upload>
  </div>
</template>
```

### 只读

Example source: src/upload/example/demos/readonly.vue

```vue
<script setup>
import { ref } from 'vue'

const files = ref([
  {
    uid: 'image',
    name: 'example.svg',
    type: 'image/svg+xml',
    url: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22%3E%3Crect width=%22120%22 height=%22120%22 fill=%22%236750a4%22/%3E%3C/svg%3E',
    status: 'success',
    percent: 100,
  },
])
</script>

<template>
  <div>
    <mp-upload v-model="files" readonly></mp-upload>
  </div>
</template>
```

### 所有队列状态

Example source: src/upload/example/demos/state.vue

```vue
<script setup>
import { ref } from 'vue'

const files = ref(
  ['ready', 'reading', 'uploading', 'success', 'error', 'canceled'].map((status, index) => ({
    uid: String(index),
    name: status + '.txt',
    status,
    percent: status === 'success' ? 100 : 45,
  })),
)
</script>

<template>
  <div>
    <mp-upload v-model="files"></mp-upload>
  </div>
</template>
```

### 只读取文件

Example source: src/upload/example/demos/read-only.vue

```vue
<script setup>
import { ref } from 'vue'

const files = ref([])
const last = ref('')
</script>
<template>
  <div>
    <p>不配置 action/custom-request：只读取文件，不发送请求。</p>
    <mp-upload v-model="files" multiple list-type="picture" @read="(file) => (last = file.name)" />
    <p>最近读取：{{ last }}</p>
  </div>
</template>
```

### 手动队列和可取消请求

可直接“加入示例文件”，也可选择本地文件；两种方式均不访问网络。点击提交后观察进度，取消会停止活动请求，重试会重新上传。开启“首次请求失败”时，同一文件首次失败、重试成功。活动请求数在完成、取消、失败及离开 Demo 后清零。

Example source: src/upload/example/demos/queue-request.vue

```vue
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
    <mp-checkbox v-model="failOnce" presentation="inline">首次请求失败（重试成功）</mp-checkbox>
    <mp-space wrap>
      <mp-button @click="addExample">加入示例文件</mp-button>
      <mp-button @click="uploader?.submit()">提交队列</mp-button>
    </mp-space>
    <mp-upload
      ref="uploader"
      v-model="files"
      presentation="inline"
      multiple
      :auto-upload="false"
      :custom-request="request"
    />
    <p>队列状态：{{ files.map((file) => `${file.name}: ${file.status} (${file.percent}%)`).join('；') || '空' }}</p>
    <p>活动请求：{{ activeRequests }}</p>
  </div>
</template>
```

### 上传前准备与取消竞争

取消后重试合计大小组合：双项进入准备后取消，再次提交会保留四个待返回任务（含两次已失效尝试）。统一返回时仍只启动一次有效请求；超限项保留取消前的原文件和 `canceled` 状态，不误算为新失败或自动恢复为 ready。删除成功项后可再次提交剩余项并成功；旧准备结果不占用额外容量。

合计大小组合：空队列选择“每项替换600B，合计上限1024B”，连续加入两个62B合成图片，再准备并统一完成。每项均满足单文件1024B限制，但两项替换后总量超限，因此只有一项发起本地请求，另一项保留ready原文件并报告max-total-size。删除成功项后，再准备剩余项可成功；重置清空队列、等待和请求计数。此处验证本地before-upload替换，不涉及原生文件选择或真实网络上传。

点击“准备并提交”后，`before-upload` 保持等待；重复提交不会重复创建同一尝试。取消准备后可以再次提交，再点击“完成准备”同时返回旧、新结果，只有当前有效尝试能发起请求。选择文本或超大图片替换时会再次检查类型和 1 KiB 大小限制，拒绝后保持 ready，可改为有效副本后重试。本示例使用公开 useUploader 和本地即时请求，不访问网络；重置、停用和卸载会释放等待任务。

Example source: src/upload/example/demos/prepare-request.vue

```vue
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
  { label: '有效副本', value: 'valid' },
  { label: '替换为文本', value: 'type' },
  { label: '替换为超大图片', value: 'size' },
  { label: '每项替换600B，合计上限1024B', value: 'total' },
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
    <p>提交后暂停 before-upload；可取消后再次提交，再统一完成准备，只有当前有效尝试可以发起本地请求。</p>
    <mp-radio-group v-model="mode" presentation="inline" :options="modes" />
    <mp-space wrap>
      <mp-button :disabled="files.length >= (mode === 'total' ? 2 : 1)" @click="add">加入示例图片</mp-button>
      <mp-button :disabled="!files.some((file) => ['ready', 'error', 'canceled'].includes(file.status))" @click="submit"
        >准备并提交</mp-button
      >
      <mp-button :disabled="preparing === 0" @click="uploader.abort()">取消准备</mp-button>
      <mp-button :disabled="preparing === 0" @click="finish">完成准备</mp-button>
      <mp-button @click="reset">重置队列</mp-button>
    </mp-space>
    <mp-upload
      v-model="files"
      presentation="inline"
      :show-upload-button="false"
      :show-retry-button="false"
      :preview="false"
    />
    <p>待返回准备任务：{{ preparing }}</p>
    <p>请求次数：{{ requestCount }}</p>
    <p>队列状态：{{ files.map((file) => `${file.status} (${file.percent}%)`).join(', ') || '空' }}</p>
    <p>队列字节：{{ files.map((file) => file.size).join(', ') || '0' }}</p>
    <p>拒绝原因：{{ reasons.join(', ') || '无' }}</p>
  </div>
</template>
```

### 异步请求元数据

填写你控制的本地接收接口后，分别手动返回 headers 和 data，观察默认 XHR 的准备与取消。只返回一项时仍不发送；取消后再返回另一项不得启动请求。成功响应显示在示例下方，可由接收端核对 `X-Demo-Upload`、`auditMarker` 和 `attachment` 文件字段。接口地址默认留空，不预设外部上传服务；接收器必须允许文档站来源的 CORS。本例仅使用生成的合成文本，不选择真实文件。

使用“拒绝 headers / 拒绝 data”模拟准备失败，当前尝试只进入一次 error。可在另一项旧 Promise 未结清时重试，观察旧结果不会覆盖新尝试；取消后再拒绝不增加错误计数。返回/拒绝按钮会结清该类所有等待任务（包括旧尝试），便于验证竞争；重置会释放等待任务。准备失败不等同 HTTP 错误。

Example source: src/upload/example/demos/metadata-request.vue

```vue
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
    <p>默认 XHR 请求；先配置你控制的本地接口。headers 与 data 分别等待手动返回，默认不访问任何地址。</p>
    <label
      >Local upload endpoint
      <mp-input v-model="endpoint" presentation="inline" placeholder="http://127.0.0.1:4197/upload"
    /></label>
    <mp-space wrap>
      <mp-button :disabled="files.length > 0" @click="add">加入合成文件</mp-button>
      <mp-button
        :disabled="!endpoint || !files.some((file) => ['ready', 'error', 'canceled'].includes(file.status))"
        @click="uploader.submit()"
        >提交元数据请求</mp-button
      >
      <mp-button :disabled="!files.some((file) => file.status === 'uploading')" @click="uploader.abort()"
        >取消元数据请求</mp-button
      >
      <mp-button :disabled="!headers.length" @click="finishHeaders">返回 headers</mp-button>
      <mp-button :disabled="!data.length" @click="finishData">返回 data</mp-button>
      <mp-button :disabled="!headers.length" @click="rejectHeaders">拒绝 headers</mp-button>
      <mp-button :disabled="!data.length" @click="rejectData">拒绝 data</mp-button>
      <mp-button @click="reset">重置元数据示例</mp-button>
    </mp-space>
    <mp-upload
      v-model="files"
      presentation="inline"
      :show-upload-button="false"
      :show-retry-button="false"
      :preview="false"
    />
    <p role="status">
      headers 等待：{{ headers.length }}；data 等待：{{ data.length }}；成功：{{ successes }}；错误：{{ errors }}
    </p>
    <p>模型：{{ files.map((file) => file.name + ': ' + file.status).join(', ') || '空' }}</p>
    <pre>{{ response }}</pre>
  </section>
</template>
```

### 请求句柄迟到与取消

本地模拟 custom-request 返回 Promise。取消后再返回旧句柄会立即调用其 abort；返回旧成功回调不会恢复已取消项。取消后再次发起、统一返回句柄和成功回调时，只接受当前尝试一次。计数展示回调是否被内核接受，不代表真实传输；本例不访问网络，重置/停用/卸载释放本地等待。

Example source: src/upload/example/demos/late-request.vue

```vue
<script setup>
import { onBeforeUnmount, onDeactivated, ref, shallowRef } from 'vue'
import { useUploader } from '@maple-design/ui'

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
    <p>请求句柄延迟返回；先取消再返回句柄，旧句柄应立即 abort，迟到成功回调不能恢复取消项。不访问网络。</p>
    <mp-space wrap>
      <mp-button :disabled="files.length > 0" @click="add">加入本地文件</mp-button>
      <mp-button
        :disabled="!files.some((file) => ['ready', 'error', 'canceled'].includes(file.status))"
        @click="uploader.submit()"
        >发起模拟请求</mp-button
      >
      <mp-button :disabled="!files.some((file) => file.status === 'uploading')" @click="uploader.abort()"
        >取消模拟请求</mp-button
      >
      <mp-button :disabled="!handles.length" @click="release">返回所有句柄</mp-button>
      <mp-button :disabled="!callbacks.length" @click="complete">返回所有成功回调</mp-button>
      <mp-button @click="reset">重置模拟</mp-button>
    </mp-space>
    <mp-upload v-model="files" :show-upload-button="false" :show-retry-button="false" :preview="false" />
    <p role="status">
      句柄等待：{{ handles.length }}；发起：{{ requests }}；abort：{{ aborts }}；有效成功：{{ accepted }}
    </p>
    <p>模型：{{ files.map((file) => file.name + ': ' + file.status).join(', ') || '空' }}</p>
  </section>
</template>
```

### 替换后的约束校验

反向返回顺序：旧任务等待时重置并加入新文件，先点“返回最新缩略图”接受新项，再“拒绝最早缩略图”。旧失败只结清旧任务，不能再显示read-error、删除新项或增加解码数；最后重置清空列表和计数。这仍是本地回调竞争，不是原生读取器异常。

加入小图片前开启 FileReader/data-url 开关，接受的替换 File 会经过浏览器原生 FileReader。16px图片用于核对解码；Data URLs 是当前data-url项目数，Decoded images 是自上次重置以来累计load事件数。删除移除对应图片但不递减累计计数，重置清零两者；类型拒绝发生在读取前。使用本地生成File，不代表原生文件选择器或网络上传已验收。

开关仅影响后续新增项，不会重新读取既有项目；可按 file/data-url/file 顺序混合加入三项。满额后再加入会报告 max-files，图片和解码计数不变；删除 data-url 项后重新加入会读取新文件，累计解码数继续增加，重置清空整个混合队列。

Example source: src/upload/example/demos/replacement-validation.vue

```vue
<script setup>
import { onBeforeUnmount, onDeactivated, ref, shallowRef } from 'vue'
import { useUploader } from '@maple-design/ui'

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
    <mp-checkbox v-model="readDataUrl" presentation="inline">使用原生 FileReader 读取为 data-url</mp-checkbox>
    <mp-checkbox v-model="readObjectUrl" presentation="inline">使用原生 Blob/object-url（优先）</mp-checkbox>
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
    <mp-checkbox v-model="pauseThumbnail" presentation="inline">暂停本地缩略图 Promise</mp-checkbox>
    <mp-upload v-model="files" presentation="inline" :show-upload-button="false" :preview="false" />
    <p>队列：{{ files.map((file) => file.name).join(', ') || '空' }}</p>
    <p>拒绝原因：{{ reasons.join(', ') || '无' }}</p>
  </div>
</template>
```

### 图卡、插槽与自定义预览

Example source: src/upload/example/demos/custom-surface.vue

```vue
<script setup>
import { ref } from 'vue'

const files = ref([])
const message = ref('')
const preview = (file, event) => {
  event.preventDefault()
  message.value = file.name
}
</script>
<template>
  <div>
    <mp-upload v-model="files" list-type="picture-card" multiple @preview="preview"
      ><template #trigger><span>选择图片</span></template
      ><template #remove-button="{ remove }"
        ><mp-button variant="text" @click="remove">删除</mp-button></template
      ></mp-upload
    >
    <p>自定义预览：{{ message }}</p>
  </div>
</template>
```

### 外部管理进度

可直接加入本地示例项观察 40% 的外部进度，再模拟完成。完成操作只更新仍在上传的项；取消项保持 canceled，已删除的项不会重新出现。外部托管模式隐藏内置请求重试按钮，使用“模拟外部重试”恢复取消或失败项，再由业务端完成。示例不发送网络请求。

Example source: src/upload/example/demos/external-state.vue

```vue
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
    <mp-upload v-model="files" presentation="inline" :show-retry-button="false" @read="read" />
    <p>队列状态：{{ files.map((file) => `${file.name}: ${file.status} (${file.percent}%)`).join('；') || '空' }}</p>
  </div>
</template>
```

### 批次筛选

Example source: src/upload/example/demos/before-add.vue

```vue
<script setup>
import { ref } from 'vue'

const files = ref([])
const filter = (files) => files.filter((file) => /\.png$/i.test(file.name))
</script>

<template>
  <div>
    <p>从本次选择中仅保留 PNG 文件。</p>
    <mp-upload v-model="files" :before-add="filter" multiple></mp-upload>
  </div>
</template>
```

### 读取前确认

Example source: src/upload/example/demos/before-read.vue

```vue
<script setup>
import { ref } from 'vue'

const files = ref([])
const beforeRead = (file) => file.size <= 1024 * 1024
</script>

<template>
  <div>
    <p>仅允许读取不超过 1 MB 的文件。</p>
    <mp-upload v-model="files" :before-read="beforeRead"></mp-upload>
  </div>
</template>
```

### 删除前确认

开启“手动异步确认”后忽略同步允许开关，删除等待“确认删除 / 取消删除”。同一文件等待时重复点击不会新增钩子；取消保留文件，等待中禁用后再确认也不会删除，解除禁用后需重新发起。计数核对列表、等待任务、钩子和 remove 通知；停用或卸载结清本地等待，不访问网络。

新增操作均不访问网络：“异常拒绝删除”拒绝本地Promise，文件保留且后续可重试；“替换同 UID 文件”生成新的本地File，旧删除确认不得移除替换项。“重置上传队列”调用公开reset，旧确认不再产生remove；“激活上传组件”通过KeepAlive停用/恢复Upload，等待任务保留在外层Demo用于手动返回，旧结果不得影响恢复后的实例。停用Upload不等于取消外部业务Promise；离开整个Demo才结清其本地等待。

Example source: src/upload/example/demos/before-remove.vue

```vue
<script setup>
import { onBeforeUnmount, onDeactivated, ref, shallowRef } from 'vue'

const files = ref([
  {
    uid: 'image',
    name: 'example.svg',
    type: 'image/svg+xml',
    url: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22%3E%3Crect width=%22120%22 height=%22120%22 fill=%22%236750a4%22/%3E%3C/svg%3E',
    status: 'success',
    percent: 100,
  },
])
const allow = ref(false)
const manual = ref(false)
const blocked = ref(false)
const attempts = ref(0)
const removed = ref(0)
const uploadRef = ref()
const mounted = ref(true)
const pending = shallowRef([])
const beforeRemove = () => {
  attempts.value++
  if (!manual.value) {
    return allow.value
  }
  return new Promise((resolve, reject) => {
    pending.value = [...pending.value, { resolve, reject }]
  })
}
function settle(accepted) {
  const jobs = pending.value
  pending.value = []
  jobs.forEach((job) =>
    accepted === 'reject' ? job.reject(new Error('Local removal rejection')) : job.resolve(accepted),
  )
}
function replace() {
  files.value = files.value.map((item) => ({
    ...item,
    name: 'replacement.txt',
    type: 'text/plain',
    file: new File(['local replacement'], 'replacement.txt', { type: 'text/plain' }),
  }))
}
function restore() {
  files.value = [
    {
      uid: 'image',
      name: 'restored.txt',
      type: 'text/plain',
      status: 'success',
      percent: 100,
      file: new File(['local sample'], 'restored.txt', { type: 'text/plain' }),
    },
  ]
}
onBeforeUnmount(() => settle(false))
onDeactivated(() => settle(false))
</script>

<template>
  <section class="remove-confirm-demo">
    <mp-checkbox v-model="allow" presentation="inline">允许此操作</mp-checkbox>
    <mp-checkbox v-model="manual" presentation="inline">手动异步确认</mp-checkbox>
    <mp-checkbox v-model="blocked" presentation="inline">禁用上传组件</mp-checkbox>
    <mp-button html-type="button" :disabled="!pending.length" @click="settle(true)">确认删除</mp-button>
    <mp-button html-type="button" :disabled="!pending.length" @click="settle(false)">取消删除</mp-button>
    <mp-button html-type="button" :disabled="!pending.length" @click="settle('reject')">异常拒绝删除</mp-button>
    <mp-button html-type="button" :disabled="!files.length" @click="replace">替换同 UID 文件</mp-button>
    <mp-button html-type="button" @click="uploadRef?.reset()">重置上传队列</mp-button>
    <mp-button html-type="button" @click="restore">恢复示例文件</mp-button>
    <mp-checkbox v-model="mounted" presentation="inline">激活上传组件</mp-checkbox>
    <KeepAlive>
      <mp-upload
        v-if="mounted"
        ref="uploadRef"
        v-model="files"
        presentation="inline"
        :before-remove="beforeRemove"
        :disabled="blocked"
        @remove="removed++"
      />
    </KeepAlive>
    <p role="status">文件：{{ files.length }}；等待：{{ pending.length }}；钩子：{{ attempts }}；删除：{{ removed }}</p>
  </section>
</template>
```

### 接管文件选择

Example source: src/upload/example/demos/click-action.vue

```vue
<script setup>
import { ref } from 'vue'

const files = ref([])
const allow = ref(false)
const requestChoose = (chooseFile) => {
  if (allow.value) {
    chooseFile()
  }
}
</script>

<template>
  <div>
    <mp-checkbox v-model="allow">允许此操作</mp-checkbox>
    <mp-upload v-model="files" :request-choose="requestChoose"></mp-upload>
  </div>
</template>
```

### 自定义文件项

Example source: src/upload/example/demos/custom-render.vue

```vue
<script setup>
import { ref } from 'vue'

const files = ref([
  {
    uid: 'image',
    name: 'example.svg',
    type: 'image/svg+xml',
    url: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22%3E%3Crect width=%22120%22 height=%22120%22 fill=%22%236750a4%22/%3E%3C/svg%3E',
    status: 'success',
    percent: 100,
  },
])
</script>

<template>
  <div>
    <mp-upload v-model="files"
      ><template #item="{ file, remove }"
        ><span>{{ file.name }}</span> <mp-button html-type="button" @click="remove">删除</mp-button></template
      ></mp-upload
    >
  </div>
</template>
```

### 单文件大小限制

Example source: src/upload/example/demos/max-file-size.vue

```vue
<script setup>
import { ref } from 'vue'

const files = ref([])
const reasons = ref([])
const onRejected = (items) => {
  reasons.value = items.map((item) => item.reason)
}
</script>

<template>
  <div>
    <mp-upload v-model="files" :max-file-size="1024" @rejected="onRejected"></mp-upload>
    <p>{{ reasons.join(', ') }}</p>
  </div>
</template>
```

### 文件数量限制

Example source: src/upload/example/demos/max-files.vue

```vue
<script setup>
import { ref } from 'vue'

const files = ref([])
const count = ref(0)
const onExceed = (files) => {
  count.value = files.length
}
</script>

<template>
  <div>
    <mp-upload v-model="files" :max-files="2" multiple @exceed="onExceed"></mp-upload>
    <p>超出数量：{{ count }}</p>
  </div>
</template>
```

### 自定义删除按钮

Example source: src/upload/example/demos/remove-button-slot.vue

```vue
<script setup>
import { ref } from 'vue'

const files = ref([
  {
    uid: 'image',
    name: 'example.svg',
    type: 'image/svg+xml',
    url: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22%3E%3Crect width=%22120%22 height=%22120%22 fill=%22%236750a4%22/%3E%3C/svg%3E',
    status: 'success',
    percent: 100,
  },
])
</script>

<template>
  <div>
    <mp-upload v-model="files"
      ><template #remove-button="{ remove }"
        ><mp-button html-type="button" @click.stop="remove">移除文件</mp-button></template
      ></mp-upload
    >
  </div>
</template>
```

### 自定义选择按钮

Example source: src/upload/example/demos/style.vue

```vue
<script setup>
import { ref } from 'vue'

const files = ref([])
</script>

<template>
  <div>
    <mp-upload v-model="files"
      ><template #trigger><mp-button status="primary">选择文件</mp-button></template></mp-upload
    >
  </div>
</template>
```

### 外部上传进度

Example source: src/upload/example/demos/use-progress.vue

```vue
<script setup>
import { onUnmounted, ref } from 'vue'

const files = ref([])
const timers = new Set()
function start(file) {
  file.status = 'uploading'
  const timer = setInterval(() => {
    file.percent = Math.min(file.percent + 10, 100)
    if (file.percent === 100) {
      file.status = 'success'
      clearInterval(timer)
      timers.delete(timer)
    }
  }, 200)
  timers.add(timer)
}
onUnmounted(() => timers.forEach((timer) => clearInterval(timer)))
</script>

<template>
  <div>
    <mp-upload v-model="files" @read="start"></mp-upload>
  </div>
</template>
```

### 动态只读与禁用

预置本地合成图片，启用 readPrettyonly 与 disabled，比较预览、删除和选择入口的行为。选择按钮只记录 request-choose 次数，不打开文件框或发送请求。只读保留预览，禁用同时阻止预览；解除限制后可重新操作。恢复示例由父级更新模型。

Example source: src/upload/example/demos/state-controls.vue

```vue
<script setup>
import { ref } from 'vue'

const readonly = ref(false)
const disabled = ref(false)
const chooseCount = ref(0)
const previewCount = ref(0)
const initialFile = {
  uid: 'state-image',
  name: 'state-example.svg',
  type: 'image/svg+xml',
  url: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22%3E%3Crect width=%22120%22 height=%22120%22 fill=%22%236750a4%22/%3E%3C/svg%3E',
  status: 'success',
  percent: 100,
}
const files = ref([{ ...initialFile }])
function choose() {
  chooseCount.value++
}
function restore() {
  files.value = [{ ...initialFile }]
}
</script>

<template>
  <section class="upload-state-demo">
    <div class="controls">
      <mp-checkbox v-model="readonly" presentation="inline">Readonly upload</mp-checkbox>
      <mp-checkbox v-model="disabled" presentation="inline">Disabled upload</mp-checkbox>
      <mp-button html-type="button" @click="restore">Restore sample</mp-button>
    </div>
    <p>Local selection callback only; no file chooser or network request.</p>
    <mp-upload
      v-model="files"
      presentation="inline"
      data-testid="state-upload"
      :readonly="readonly"
      :disabled="disabled"
      :request-choose="choose"
      @preview="previewCount++"
    />
    <p role="status">Files: {{ files.length }}; choose: {{ chooseCount }}; preview: {{ previewCount }}</p>
  </section>
</template>

<style scoped>
.controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
.controls label {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
</style>
```

### 交互状态切换

适用于附件列表展示与本地选取。调整禁用、只读，用相同数据观察变化。控制区始终可用，可以随时恢复编辑；错误外观本身不会触发表单校验。

Example source: src/upload/example/demos/state-lab.vue

```vue
<script setup>
import { reactive as __demoReactive, ref } from 'vue'

const value = ref([])
const __demoState = __demoReactive({ disabled: false, readonly: false })
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <mp-checkbox v-model="__demoState['disabled']">disabled</mp-checkbox>
      <mp-checkbox v-model="__demoState['readonly']">readonly</mp-checkbox>
    </mp-space>
    <mp-upload v-model="value" :auto-upload="false" v-bind="__demoState"></mp-upload>
  </mp-space>
</template>
```

### 自定义预览

Example source: src/upload/example/demos/custom-preview.vue

```vue
<script setup>
import { ref } from 'vue'

const files = ref([
  {
    uid: 'image',
    name: 'example.svg',
    type: 'image/svg+xml',
    url: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22%3E%3Crect width=%22120%22 height=%22120%22 fill=%22%236750a4%22/%3E%3C/svg%3E',
    status: 'success',
    percent: 100,
  },
])
const selected = ref('')
const preview = (file, event) => {
  event.preventDefault()
  selected.value = file.name
}
</script>

<template>
  <div>
    <mp-upload v-model="files" @preview="preview"></mp-upload>
    <p>当前预览：{{ selected }}</p>
  </div>
</template>
```

### 图片和视频预览

Example source: src/upload/example/demos/preview.vue

```vue
<script setup>
import { ref } from 'vue'

const files = ref([
  {
    uid: 'image',
    name: 'example.svg',
    type: 'image/svg+xml',
    url: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22%3E%3Crect width=%22120%22 height=%22120%22 fill=%22%236750a4%22/%3E%3C/svg%3E',
    status: 'success',
    percent: 100,
  },
  {
    uid: 'video',
    name: 'sample.mp4',
    type: 'video/mp4',
    url: 'https://www.runoob.com/try/demo_source/mov_bbb.mp4',
    status: 'success',
    percent: 100,
  },
])
const enabled = ref(true)
</script>

<template>
  <div>
    <mp-checkbox v-model="enabled">启用内置预览</mp-checkbox>
    <mp-upload v-model="files" list-type="picture" :preview="enabled"></mp-upload>
  </div>
</template>
```

### 目录选择与多文件回退

使用现有 addFiles 接入粘贴事件；移动端保留普通多选入口。本例只读取本地数据。

Example source: src/upload/example/demos/directory.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { UploadFileItem } from '@maple-design/ui'

const files = ref<UploadFileItem[]>([])
</script>
<template>
  <mp-space direction="column">
    <p>
      选择目录后查看文件列表；本例只读取本地文件，不发送请求。目录选择取决于浏览器与系统文件选择器，移动设备可使用普通多选入口。
    </p>
    <p>目录选择</p>
    <mp-upload v-model="files" directory multiple />
    <p>普通文件多选</p>
    <mp-upload multiple />
  </mp-space>
</template>
```

### 剪贴板图片与读取校验

Example source: src/upload/example/demos/clipboard.vue

```vue
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
```

## API

### Props

| 属性 | 类型 | 默认值/说明 |
| --- | --- | --- |
| model-value / default-value | UploadFileItem[] | 受控值 / 非受控初值[] |
| accept / capture | string / 原生capture | 未指定 |
| multiple / directory / draggable | boolean | false |
| disabled / readonly | boolean | undefined，继承Form，显式false优先 |
| action / method | string | 无 / post |
| headers / data | object 或 async(file) => object | 请求准备阶段仍可取消 |
| name | string / (file) => string | file |
| with-credentials | boolean | false |
| custom-request | (UploadRequestOptions) => UploadRequest / Promise / void | 自定义transport，可返回abort |
| auto-upload | boolean | true；必须同时有action或custom-request才启动 |
| max-files / max-file-size / max-total-size | number | 未指定；大小单位字节，max-files>0生效 |
| resolve-type | file / data-url / object-url | object-url；所有文件生成url，图片生成thumbnailUrl |
| create-thumbnail-url | (options) => string / Promise | 自定义URL归调用方所有，不自动回收 |
| before-add | async(files) => File[] | 批次筛选/替换 |
| before-read | async(file) => boolean / File | false/reject拒绝；替换后重新校验 |
| before-upload | async(item) => boolean / File / Blob | false/reject取消准备；替换后重新校验 |
| before-remove | async(item,list) => boolean | false/reject不删除 |
| is-success-response | (xhr,item) => boolean | 默认HTTP2xx |
| request-choose | (chooseFile,event) => void / Promise | 接管选择入口，异常不会自动打开文件框 |
| list-type | text / picture / picture-card | text，两端均支持 |
| image-fit | fill / contain / cover / none / scale-down | cover；item.fit优先 |
| preview | boolean | true |
| show-file-list / show-upload-button / show-remove-button | boolean | true |
| show-retry-button / show-cancel-button / show-preview-button | boolean | true |
| show-download-button | boolean | false；禁用时不可操作 |
| elevation / ripple | boolean或number / boolean | false / true |

UploadFileItem 的 uid、status、percent 必填，name/size/type/file/url/thumbnailUrl/fit/response/error 可选。status为ready/reading/uploading/success/error/canceled/removed。

### Events

- update:model-value(files)，change(files, changedFile?)：队列提议顺序，Form每次change仅一次。进度与状态更新也属于change。
- read(item)：读取完成，可自行接管业务上传；不是服务端成功。
- rejected(UploadRejectedFile[])：reason为accept/before-add/before-read/read-error/max-file-size/max-total-size/max-files。
- exceed(nativeFiles, acceptedList)：超过数量时通知。
- progress(item,event?)、success(item)、error(item)：当前有效请求通知；旧请求/取消回调不生效。
- remove(item)：通过删除钩子后的删除提议。
- preview(item, UploadPreviewEvent)：调用event.preventDefault()取消内建图片/视频预览；程序调用也可取消，originalEvent可选。

### Slots

- trigger({chooseFile,dragOver,disabled})：自定义选择入口。
- item({file,index,remove,retry,abort})：自定义整项。
- remove-button({file,index,remove,retry,abort})：自定义删除操作。

### Expose

chooseFile()、submit(file?)、abort(file?)、retry(file)、remove(file)、reset()、clearSuccess()、clearError()、getFiles(status?)、preview(file)、closePreview()。useUploader(options)提供同源无UI逻辑，另有addFiles(files)和input/drag处理接口。

### 受控与生命周期

受控父级拒绝新增时只发读取与列表提议，不自动上传；后续父级接受该uid才会自动上传一次。同tick提议事务合并，跨tick仍以实际父级列表为真源，拒绝项目不占总大小；父级负责迟到列表替换的一致性。显式remove未接受项、reset或卸载会释放其生成URL；任意外部URL不会被回收。内建预览保留自己的URL使用权至关闭，不关闭其他组件后来打开的预览。

取消覆盖before-upload、异步headers/data/name及异步custom-request句柄阶段；重试和外部同uid换File令旧回调失效。before-read和before-upload的替换会复查限制，max-total-size只累计已接受项及当前正在准备的合法批次/请求。禁用/只读禁止选择、移除、提交等更改；只读允许预览/下载。KeepAlive停用取消当前准备/请求，恢复后允许新操作。

## 类型定义

UploadProps、UploadEmits、UploadSlots、UploadExpose、UploadPublicMethods、UploadFileItem、UploadStatus、UploadListType、UploadResolveType、UploadImageFit、UploadCapture、UploadRejectedFile、UploadRejectedReason、UploadRequestOptions、UploadRequest、UploadCustomRequest、UploadProgressEvent、UploadData、UploadHeaders、UploadBeforeRead、UploadBeforeUpload、UploadBeforeRemove、UploadCreateThumbnailUrl、UploadIsSuccessResponse、UploadRequestChoose、UploadPreviewEvent、UseUploaderOptions、UploadInstance。

## 样式变量

两端公共后缀一致，所有默认值见下表（前缀分别为c/mp）。

| 变量 | 默认值 |
| --- | --- |
| --mp-upload-gap | var(--mp-sys-space-4) |
| --mp-upload-trigger-min-height | var(--mp-sys-control-height-md) |
| --mp-upload-trigger-padding-horizontal | var(--mp-sys-space-6) |
| --mp-upload-trigger-draggable-min-height | calc(var(--mp-sys-control-height-md) * 2) |
| --mp-upload-card-size | calc(var(--mp-sys-control-height-md) * 2) |
| --mp-upload-item-min-height | var(--mp-sys-control-height-md) |
| --mp-upload-item-padding | var(--mp-sys-space-4) |
| --mp-upload-thumb-size | var(--mp-sys-control-height-lg) |
| --mp-upload-border-radius | var(--mp-sys-radius-md) |
| --mp-upload-border-color | var(--mp-sys-color-border-default) |
| --mp-upload-background | var(--mp-sys-color-surface-default) |
| --mp-upload-text-color | var(--mp-sys-color-content-primary) |
| --mp-upload-secondary-text-color | var(--mp-sys-color-content-secondary) |
| --mp-upload-hover-background | var(--mp-sys-color-state-hover) |
| --mp-upload-active-color | var(--mp-sys-color-action-primary) |
| --mp-upload-error-color | var(--mp-sys-color-content-danger) |
| --mp-upload-action-size | var(--mp-sys-control-touch-target) |
| --mp-upload-progress-height | var(--mp-sys-space-2) |
| --mp-upload-disabled-opacity | .56 |
| --mp-upload-font-size | var(--mp-sys-font-size-md) |

### Form 字段展示与确认

本组件支持 `presentation`，字段 > FormItem > Form 逐层继承；未指定时为 `inline`，保留直接编辑。支持值：`inline / popup`。其他编辑展示使用 Cell 入口和一份草稿，确认后才更新 v-model；取消、重置或启用 readPretty 丢弃草稿。

Maple 使用 presentation="popup" 点击值区域打开编辑面板；inline 直接编辑。 readPretty 为纯阅读属性，与 readonly、disabled 独立。

`before-commit(value, { previousValue, signal })` 可拦截弹层保存；FormItem 先校验候选值，失败保持编辑。`open / default-open / update:open` 控制编辑层。`#read="{ value, text }"` 可自定义阅读内容。集中示例见 Form 的“各类字段统一展示”。

附件确认提交的是文件列表关系，无法撤销已经发生的远程上传或永久删除；需要延迟网络副作用时配置 `auto-upload="false"`，由业务在最终提交后执行上传。

`read-pretty` 为独立布尔属性，与 `readonly`、`disabled` 同级；字段 > FormItem > Form 继承，显式 `false` 覆盖父级。默认 `false`。纯阅读不显示编辑器。

### 覆盖已有附件与视频时长

`reupload` 默认 `false`。开启后，每个附件显示「替换」按钮；达到 `max-files` 后仍可替换已有项。也可调用 `replace(file, replacement?)`：未传 replacement 时选择一个文件，传入 `File` 时直接校验并提出替换。替换选择器不支持多选，且遵守 request-choose、disabled 与 readonly。

新文件先经过 before-add、before-read、accept、单文件/总大小与数量校验，再经过 before-remove。数量和总大小计算扣除被替换项。取消文件选择、校验失败、守卫拒绝或目标已被外部移除时保留原项。通过后以新 UID 原位替换并发出 `replace(next, previous)` 和 `change`，不发出 remove，也不请求删除服务器资源。受控父级决定是否接纳；接纳后旧上传回调失效。此后新上传失败会显示失败状态，可重试，不会自动恢复旧文件。

`UploadFileItem.duration?: number` 使用秒，有限且非负时显示为 `mm:ss` 或 `h:mm:ss`；0 显示 `00:00`，未知/无效值不显示。本地视频会尝试读取元数据（最多 5 秒），成功、错误、中止和卸载都会清理临时 URL、监听及定时器。远端回显记录可直接传 duration，不会为读时长主动请求远端视频。文本列表显示时长文字，图片布局显示角标。

| 新增入口 | 类型 / 默认 |
| --- | --- |
| reupload | boolean / false |
| replace(file, replacement?) | `Promise<void>`；方法，不代表远程上传已成功 |
| replace 事件 | next: UploadFileItem, previous: UploadFileItem；模型提案 |
| item 插槽 replace | () => void；打开当前项替换选择器 |
| duration | UploadFileItem 的可选秒数 |

示例的完整表单使用 data-url 保留本地附件草稿，切换弹层时不依赖临时 object URL。生产上传成功后应由业务写入服务器 URL；object-url 的生命周期仍由创建它的组件与预览引用管理。

| 样式变量 | 默认值 |
| --- | --- |
| `--mp-upload-duration-background` | `var(--mp-sys-color-surface-tooltip)` |
| `--mp-upload-duration-color` | `var(--mp-sys-color-content-on-dark)` |
| `--mp-upload-duration-radius` | `var(--mp-sys-radius-sm)` |
| `--mp-upload-duration-padding` | `var(--mp-sys-space-1) var(--mp-sys-space-2)` |
| `--mp-upload-duration-font-size` | `var(--mp-sys-font-size-sm)` |
