<!-- Source: src/upload/docs/en-US.md; locale: en-US; page: /en-US/upload -->

# Upload

Disabled downloads match Link/Button link mode: remove href while retaining the link role, `aria-disabled` and `tabindex=-1`, and cancel the default click action. `readonly` still allows downloading. Re-enabling restores the original file URL and download filename.

Without action / custom-request, the component only reads files; the application manages progress and results.

## Basic examples

### read-only

Example source: src/upload/example/demos/en-US/read-only.vue

```vue
<script setup>
import { ref } from 'vue'

const files = ref([])
const last = ref('')
</script>
<template>
  <div>
    <p>Without action/custom-request, files are read without network requests.</p>
    <mp-upload v-model="files" multiple list-type="picture" @read="(file) => (last = file.name)" />
    <p>Last read: {{ last }}</p>
  </div>
</template>
```

### Basic usage

Example source: src/upload/example/demos/en-US/basic-usage.vue

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

## Appearance and states

### Dynamic readonly and disabled states

Toggle readonly and disabled around a synthetic local image. The selection callback only increments a counter; it opens no file chooser and sends no request. Readonly preserves preview, while disabled blocks it. Removing restrictions restores actions. Restore sample replaces the parent-owned model, not the Upload reset method.

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
      <mp-checkbox v-model="readonly" edit-mode="direct">Readonly upload</mp-checkbox>
      <mp-checkbox v-model="disabled" edit-mode="direct">Disabled upload</mp-checkbox>
      <mp-button html-type="button" @click="restore">Restore sample</mp-button>
    </div>
    <p>Local selection callback only; no file chooser or network request.</p>
    <mp-upload
      v-model="files"
      edit-mode="direct"
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

### Queue states

Example source: src/upload/example/demos/en-US/state.vue

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

### Interaction state comparison

Toggle disabled, read-only and error states, then interact with the same instance. Recovery controls remain outside the target; error appearance alone does not validate data.

<details>
<summary>Configuration details and limits</summary>

#### Interaction states

Use this example for attachment lists and local file selection. Adjust disabled, read-only and compare the component with the same data. The controls remain available to restore editing; error appearance alone does not run validation.

</details>

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

### custom-surface

Example source: src/upload/example/demos/en-US/custom-surface.vue

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
      ><template #trigger><span>Choose images</span></template
      ><template #remove-button="{ remove }"
        ><mp-button variant="text" @click="remove">Remove</mp-button></template
      ></mp-upload
    >
    <p>Custom preview: {{ message }}</p>
  </div>
</template>
```

### Custom file item

Example source: src/upload/example/demos/en-US/custom-render.vue

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
        ><span>{{ file.name }}</span> <mp-button html-type="button" @click="remove">Remove</mp-button></template
      ></mp-upload
    >
  </div>
</template>
```

### Custom remove button

Example source: src/upload/example/demos/en-US/remove-button-slot.vue

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
        ><mp-button html-type="button" @click.stop="remove">Remove file</mp-button></template
      ></mp-upload
    >
  </div>
</template>
```

### Custom trigger

Example source: src/upload/example/demos/en-US/style.vue

```vue
<script setup>
import { ref } from 'vue'

const files = ref([])
</script>

<template>
  <div>
    <mp-upload v-model="files"
      ><template #trigger><mp-button status="primary">Choose files</mp-button></template></mp-upload
    >
  </div>
</template>
```

### Custom preview

Example source: src/upload/example/demos/en-US/custom-preview.vue

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
    <p>Selected preview：{{ selected }}</p>
  </div>
</template>
```

### Image and video preview

Example source: src/upload/example/demos/en-US/preview.vue

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
    <mp-checkbox v-model="enabled">Enable built-in preview</mp-checkbox>
    <mp-upload v-model="files" list-type="picture" :preview="enabled"></mp-upload>
  </div>
</template>
```

## File sources and validation

### Directory selection and multiple-file fallback

Compose paste events with the existing addFiles API. Keep a regular file picker on mobile; no network requests are sent.

Example source: src/upload/example/demos/directory.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { UploadFileItem } from '@maple-design/ui-vue'

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

### Custom file chooser

Example source: src/upload/example/demos/en-US/click-action.vue

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
    <mp-checkbox v-model="allow">Allow this operation</mp-checkbox>
    <mp-upload v-model="files" :request-choose="requestChoose"></mp-upload>
  </div>
</template>
```

### Clipboard images and file validation

Example source: src/upload/example/demos/clipboard.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useUploader, type UploadFileItem } from '@maple-design/ui-vue'

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

### Validation after replacement

Reverse completion order: reset while the old task is pending, add a new file, resolve the newest thumbnail first, then reject the oldest. The stale failure only settles its task; it must not report read-error, remove the accepted new item or increment decoding counts. Reset clears the list and counters afterward. This remains local callback concurrency, not a native reader error.

Pause local thumbnail promise uses the public create-thumbnail-url callback with manual resolve/reject, not native FileReader fault injection. Reset invalidates the old transaction but retains its Demo task to demonstrate late delivery. A new addition starts immediately; resolving the stale task must not append it, while resolving the new task does. Rejection reports read-error and a subsequent addition can recover. Suspension/unmount settles Demo tasks. Reset and KeepAlive suspension detach the old serial wait chain without physically canceling a business promise; custom URLs remain caller-owned.

Enable native Blob/object-url to create local blob: URLs with URL.createObjectURL for subsequent accepted Files. It takes priority over data-url without rereading existing items. Blob URLs counts current blob items; Decoded images accumulates load events from both image modes until reset. The component releases its owned URLs on removal, reset and unmount.

Enable the FileReader/data-url switch before adding small images to read accepted replacement Files using the browser's native FileReader. The 16px images verify decoding; Data URLs counts current data-url items, while Decoded images accumulates load events until reset. Removing an item removes its image but does not decrement that cumulative count; reset clears both. Type rejection happens before reading. Generated local Files are not native file-chooser or network-upload coverage.

The switch affects subsequent additions without rereading existing items. Add file/data-url/file items to fill the three slots: another addition reports max-files without changing the image or decoding counts. Remove the data-url item and add again to read the new file and increment the cumulative decoding count. Reset clears the mixed queue.

This demo feeds synthetic images through the public `useUploader.addFiles` method and displays the controlled queue with Upload. Add a small image, then replace an image with text or an image larger than 1 MiB to see `accept` / `max-file-size` rejections. After resetting, the third 768 KiB image exceeds the 2 MiB total limit; reset again and the fourth small image hits `max-files`. Removing an accepted item frees a slot. All checks run after `before-read` returns its replacement, with no network request.

Example source: src/upload/example/demos/en-US/replacement-validation.vue

```vue
<script setup>
import { onBeforeUnmount, onDeactivated, ref, shallowRef } from 'vue'
import { useUploader } from '@maple-design/ui-vue'

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
    <mp-checkbox v-model="readDataUrl" edit-mode="direct">Read with native FileReader / data-url</mp-checkbox>
    <mp-checkbox v-model="readObjectUrl" edit-mode="direct">Use native Blob/object-url (takes priority)</mp-checkbox>
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
    <mp-checkbox v-model="pauseThumbnail" edit-mode="direct">Pause local thumbnail promise</mp-checkbox>
    <mp-upload v-model="files" edit-mode="direct" :show-upload-button="false" :preview="false" />
    <p>Queue：{{ files.map((file) => file.name).join(', ') || 'Empty' }}</p>
    <p>Rejected：{{ reasons.join(', ') || 'None' }}</p>
  </div>
</template>
```

### Batch filtering

Example source: src/upload/example/demos/en-US/before-add.vue

```vue
<script setup>
import { ref } from 'vue'

const files = ref([])
const filter = (files) => files.filter((file) => /\.png$/i.test(file.name))
</script>

<template>
  <div>
    <p>Only PNG files from this selection are kept.</p>
    <mp-upload v-model="files" :before-add="filter" multiple></mp-upload>
  </div>
</template>
```

### Before reading

Example source: src/upload/example/demos/en-US/before-read.vue

```vue
<script setup>
import { ref } from 'vue'

const files = ref([])
const beforeRead = (file) => file.size <= 1024 * 1024
</script>

<template>
  <div>
    <p>Reading is allowed only for files up to 1 MB.</p>
    <mp-upload v-model="files" :before-read="beforeRead"></mp-upload>
  </div>
</template>
```

### File size and count limits

Choose local files exceeding the size or count limits and inspect the rejection feedback. Selection limits are separate from request preparation and upload queues.

Example source: src/upload/example/demos/en-US/selection-limits-comparison.vue

```vue
<script setup lang="ts">
import { proxyRefs as demoProxyRefs, ref } from 'vue'
import type { UploadFileItem, UploadRejectedFile, UploadRejectedReason } from '@maple-design/ui-vue'

const scene1 = demoProxyRefs(
  (() => {
    const files = ref<UploadFileItem[]>([])

    const reasons = ref<UploadRejectedReason[]>([])

    const onRejected = (items: UploadRejectedFile[]) => {
      reasons.value = items.map((item) => item.reason)
    }
    return { files, reasons, onRejected }
  })(),
)

const scene2 = demoProxyRefs(
  (() => {
    const files = ref<UploadFileItem[]>([])

    const count = ref(0)

    const onExceed = (files: File[]) => {
      count.value = files.length
    }
    return { files, count, onExceed }
  })(),
)
</script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="max-file-size">
      <h4><span lang="zh-CN">单文件大小限制</span><span lang="en-US">File size limit</span></h4>
      <div>
        <mp-upload v-model="scene1.files" :max-file-size="1024" @rejected="scene1.onRejected"></mp-upload>
        <p>{{ scene1.reasons.join(', ') }}</p>
      </div>
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="max-files">
      <h4><span lang="zh-CN">文件数量限制</span><span lang="en-US">File count limit</span></h4>
      <div>
        <mp-upload v-model="scene2.files" :max-files="2" multiple @exceed="scene2.onExceed"></mp-upload>
        <p>Rejected by count：{{ scene2.count }}</p>
      </div>
    </section>
  </div>
</template>

<style scoped lang="less">
.demo-comparison {
  display: grid;
  gap: 24px;
  min-width: 0;
  max-width: 100%;
}
.demo-comparison-case {
  min-width: 0;
  max-width: 100%;
}
.demo-comparison-case > h4 {
  margin: 0 0 12px;
  font-size: 14px;
}
html:not([lang='en-US']) .demo-comparison-case > h4 > [lang='en-US'],
html[lang='en-US'] .demo-comparison-case > h4 > [lang='zh-CN'] {
  display: none;
}
</style>
```

## Queues and progress

### Application-managed progress

Add local sample items to see externally managed progress at 40%, then complete the active uploads. Completion only updates items that are still uploading: canceled items remain canceled and removed items do not reappear. The built-in request retry button is hidden; use “Retry externally” to restart canceled or failed items before completing them. This demo makes no network requests.

Example source: src/upload/example/demos/en-US/external-state.vue

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
    <p>Application-managed progress and results. Add local sample items without choosing a file or making a request.</p>
    <mp-space wrap>
      <mp-button @click="addExample">Add external upload item</mp-button>
      <mp-button :disabled="!hasUploading" @click="complete">Complete externally</mp-button>
      <mp-button :disabled="!hasRetryable" @click="retry">Retry externally</mp-button>
    </mp-space>
    <mp-upload v-model="files" edit-mode="direct" :show-retry-button="false" @read="read" />
    <p>Queue：{{ files.map((file) => `${file.name}: ${file.status} (${file.percent}%)`).join('；') || 'Empty' }}</p>
  </div>
</template>
```

### External progress

Example source: src/upload/example/demos/en-US/use-progress.vue

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

### queue-request

Add a generated example file or choose a local file; neither sends a network request. Submit manually, observe progress, cancel, and retry. Enable the first-attempt failure option to exercise error recovery. Active requests return to zero after completion, cancellation, failure, or leaving the demo.

Example source: src/upload/example/demos/en-US/queue-request.vue

```vue
<script setup lang="ts">
import { onBeforeUnmount, onDeactivated, ref } from 'vue'
import type { UploadFileItem, UploadInstance, UploadProgressEvent, UploadRequestOptions } from '@maple-design/ui-vue'

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
    <p>Local request simulation with cancel, retry and manual submit; no network.</p>
    <mp-checkbox v-model="failOnce" edit-mode="direct">Fail first attempt (retry succeeds)</mp-checkbox>
    <mp-space wrap>
      <mp-button @click="addExample">Add example file</mp-button>
      <mp-button @click="uploader?.submit()">Submit queue</mp-button>
    </mp-space>
    <mp-upload
      ref="uploader"
      v-model="files"
      edit-mode="direct"
      multiple
      :auto-upload="false"
      :custom-request="request"
    />
    <p>
      Queue status：{{ files.map((file) => `${file.name}: ${file.status} (${file.percent}%)`).join('；') || 'empty' }}
    </p>
    <p>Active requests：{{ activeRequests }}</p>
  </div>
</template>
```

## Async hooks and requests

### Before removing

With manual async confirmation enabled, the synchronous allow switch is ignored. Repeated removal of a pending file invokes one hook. Cancel keeps the file; resolving after disabling also keeps it, and a fresh removal is required after re-enabling. Counters expose the list, pending tasks, hook calls and remove notifications. Deactivation/unmount settles local tasks without network requests.

All extra controls are local. Reject removal rejects the pending Promise, keeps the file and allows a fresh attempt. Replace same UID file creates a new local File; an old confirmation must not remove that replacement. Reset upload queue invokes public reset without a late remove notification. Activate upload suspends/restores Upload through KeepAlive; the outer Demo keeps pending jobs for manual completion, whose old results must stay invalid after activation. Suspending Upload does not physically cancel external business Promises; leaving the whole Demo settles its local jobs.

Example source: src/upload/example/demos/en-US/before-remove.vue

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
    <mp-checkbox v-model="allow">Allow this operation</mp-checkbox>
    <mp-checkbox v-model="manual">Manual async confirmation</mp-checkbox>
    <mp-checkbox v-model="blocked">Disable upload</mp-checkbox>
    <mp-button html-type="button" :disabled="!pending.length" @click="settle(true)">Confirm removal</mp-button>
    <mp-button html-type="button" :disabled="!pending.length" @click="settle(false)">Cancel removal</mp-button>
    <mp-button html-type="button" :disabled="!pending.length" @click="settle('reject')">Reject removal</mp-button>
    <mp-button html-type="button" :disabled="!files.length" @click="replace">Replace same UID file</mp-button>
    <mp-button html-type="button" @click="uploadRef?.reset()">Reset upload queue</mp-button>
    <mp-button html-type="button" @click="restore">Restore sample file</mp-button>
    <mp-checkbox v-model="mounted">Activate upload</mp-checkbox>
    <KeepAlive>
      <mp-upload
        v-if="mounted"
        ref="uploadRef"
        v-model="files"
        :before-remove="beforeRemove"
        :disabled="blocked"
        @remove="removed++"
      />
    </KeepAlive>
    <p role="status">
      Files：{{ files.length }}；Pending：{{ pending.length }}；Hook：{{ attempts }}；Removed：{{ removed }}
    </p>
  </section>
</template>
```

### Preparation and cancellation races

For cancellation plus total-size retry, prepare two items, cancel, then submit again: four jobs remain pending, including two obsolete attempts. Resolving all jobs starts only one valid request. The over-limit item retains its original file and canceled status; it is not counted as a new failure or automatically restored to ready. Remove the successful item and resubmit the remaining item to succeed. Obsolete preparation results consume no extra capacity.

In the total-size example, a 600B replacement fits the individual limit, but two replacements exceed the 1024B total limit. One request starts; the other item retains its original file and reports max-total-size. Remove the successful item, then prepare the remaining item again to free capacity. Reset clears the queue and pending preparations. This example uses local generated files and simulated requests.

“Prepare and submit” pauses before-upload; repeated submission does not duplicate the same attempt. Cancel and submit again, then resolve both preparations: only the current valid attempt starts a request. Text and oversized replacements are rechecked against the image type and 1 KiB size limit. Rejected items stay ready and can be retried with a valid copy. The demo uses public useUploader and immediate local requests. Resetting, deactivation and unmounting release pending preparations.

Example source: src/upload/example/demos/en-US/prepare-request.vue

```vue
<script setup>
import { onBeforeUnmount, onDeactivated, ref } from 'vue'
import { useUploader } from '@maple-design/ui-vue'

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
```

### Async request metadata

Configure a local receiver you control, then resolve headers and data separately to exercise the default XHR transport. Resolving only one does not send; cancel before resolving the other to prevent the request. The receiver can inspect `X-Demo-Upload`, `auditMarker` and the `attachment` file field; its response is shown below. The endpoint starts empty, with no external upload service configured. The receiver must allow the documentation origin through CORS. Only generated synthetic text is used.

Use Reject headers / Reject data to fail a preparation: the current attempt becomes error once. Retry before settling the other old Promise to verify that its late result cannot overwrite the new attempt. Rejections after cancellation do not add errors. Resolve/reject buttons settle all pending jobs of that kind, including obsolete ones, to make races observable; reset drains pending jobs. A preparation rejection is not an HTTP error.

Example source: src/upload/example/demos/en-US/metadata-request.vue

```vue
<script setup>
import { onBeforeUnmount, onDeactivated, ref, shallowRef } from 'vue'
import { useUploader } from '@maple-design/ui-vue'

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
```

### Delayed request handles

The local custom-request returns a Promise. Return an old handle after cancellation to see abort called immediately; its late success cannot restore the canceled item. Cancel, start again, and return all handles and callbacks: only the current attempt succeeds once. Counters show callbacks accepted by the queue, not real transmission. No network is used; reset, deactivation and unmounting release local waits.

Example source: src/upload/example/demos/en-US/late-request.vue

```vue
<script setup>
import { onBeforeUnmount, onDeactivated, ref, shallowRef } from 'vue'
import { useUploader } from '@maple-design/ui-vue'

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
```

## Usage notes

### Editing and confirmation

This component supports `edit-mode` with field > FormItem > Form precedence. When unset, it defaults to `direct` and preserves `direct` editing. Supported values: `direct / popup`. Non-direct modes open the editor through the field value trigger and keep one draft; v-model updates only after confirmation. Cancel, reset or enabling readPretty discards the draft.

Maple uses edit-mode="popup" to open the editor when the value area is clicked; direct edits immediately. readPretty is a reading-only setting, independent of readonly and disabled.

`before-commit(value, { previousValue, signal })` can reject an overlay save. FormItem validates the candidate first and keeps the editor open on failure. `open / default-open / update:open` control the editor. Use `#read="{ value, text }"` to customize display. See the full field comparison in Form.

Attachment confirmation commits file-list relationships; it cannot undo completed remote uploads or permanent deletion. To defer network side effects, set `auto-upload="false"` and upload after the final business submission.

`read-pretty` is an independent boolean alongside `readonly` and `disabled`. It inherits from field to FormItem to Form; explicit `false` overrides the parent. The default is `false`. Reading mode renders no editor.

### Replacing attachments and video duration

`reupload` defaults to `false`. When enabled, each attachment has Replace, including at `max-files`. `replace(file, replacement?)` opens a single-file chooser when replacement is omitted or directly validates/proposes a supplied `File`. The replacement chooser respects request-choose/disabled/readonly and does not support multiple selection.

New files pass before-add, before-read, accept, individual/total size/count checks, then before-remove. Count/total calculations subtract the old item. Canceling selection, validation/guard rejection or externally removed targets preserve the original. Accepted replacements use a new UID at the same position and emit `replace(next, previous)` plus `change`, without remove or server-deletion requests. Controlled parents decide acceptance. Acceptance invalidates old upload callbacks. Later upload failure displays an error/retry state without restoring the old file automatically.

`UploadFileItem.duration?: number` is seconds. Finite nonnegative values display `mm:ss`/`h:mm:ss`; 0 displays `00:00`, unknown/invalid values remain hidden. Local video metadata waits at most 5 seconds and cleans temporary URLs/listeners/timers on success, failure, abort or unmount. Remote records may supply duration directly; reading it does not request remote videos. Text lists show duration text; image layouts show badges.

| New entry | Type / default |
| --------------------------- | -------------------------------------------------------- |
| reupload | boolean / false |
| replace(file, replacement?) | `Promise<void>`; a method completion, not successful remote upload |
| replace event | next: UploadFileItem, previous: UploadFileItem; model proposal |
| item slot replace | () => void; open this item's replacement chooser |
| duration | Optional UploadFileItem duration in seconds |

The complete-form example uses data-url to retain local attachment drafts across popup switches without temporary object URLs. Production uploads should store server URLs after success. The creating component/preview references still own object-url lifetimes.


### Async operation feedback

Awaited before-* hooks show loading feedback and aria-busy. Rejection/failure restores interaction, and repeated input does not restart the same operation. Ordinary event return Promises do not participate. Files remain concurrent; feedback aggregates all current guard tasks without treating change/progress notifications as tasks.

`useUploader()` exposes readonly `guardPending`, aggregating currently awaited before hooks. It does not represent upload progress.

### Preparation vetoes and exceptions

`beforeUpload` returning `false` or resolving to `false` is a business veto: no transport starts, the item stays `ready`, and neither `error` nor `rejected` is emitted. Throwing or rejecting is a preparation failure: no transport starts, the item becomes `error`, and the existing `error(item)` event reports the original cause as `item.error` exactly once. This event covers preparation and transport failures; it does not imply an HTTP request was sent. Both outcomes permit a later submission with a valid hook result. Notification return Promises do not hold the preparation task open. Obsolete or canceled attempts cannot report a new `error`.
### Configuration

Public variable suffixes match across platforms; all defaults appear below with c/mp prefixes respectively.

## API

### Empty values and reading placeholders

`empty-values` recognizes empty data; `empty-value` keeps existing clear output. `empty-text` defaults to `'-'` under `read-pretty`, with Field > FormItem > Form precedence and custom read slots first. With explicit `empty-values`, built-in required uses the policy; custom validators receive original data. See the [shared guide](#/en-US/emptyValues).

| Prop | Type | Default and scope |
| ------------ | ------------------ | ----------------------------------------------------- |
| empty-values | readonly unknown[] | Field > FormItem > Form > component-family default; replaces the whole list |
| empty-text | string | Field > FormItem > Form > '-'; explicit '' is valid |

These props belong to field presentation; pure panels do not gain reading mode. Form and FormItem provide inherited settings. The existing empty-value type and clear fallback remain component-specific.

### Upload Props

| Prop | Type | Default / description |
| ------------------------------------------------------------ | -------------------------------------------------------- | ------------------------------------------------- |
| model-value / default-value | UploadFileItem[] | Controlled value / uncontrolled initial [] |
| accept / capture | `string / UploadCapture`<br>`UploadCapture: boolean \| 'user' \| 'environment' \| undefined` | Unspecified |
| multiple / directory / draggable | boolean | false |
| disabled / readonly | boolean | undefined inherits Form; explicit false overrides |
| action / method | string | None / post |
| headers / data | object or async(file) => object | Cancelable during request preparation |
| name | string / (file) => string | file |
| with-credentials | boolean | false |
| custom-request | (UploadRequestOptions) => UploadRequest / Promise / void | Custom transport; may return abort |
| auto-upload | boolean | true; requires action or custom-request to start |
| max-files / max-file-size / max-total-size | number | Unspecified; sizes use bytes, max-files applies when >0 |
| resolve-type | file / data-url / object-url | object-url; all files get url, images also get thumbnailUrl |
| create-thumbnail-url | (options) => string / Promise | Custom URLs belong to callers and are not automatically revoked |
| before-add | async(files) => File[] | Batch filtering/replacement |
| before-read | async(file) => boolean / File | false/rejection rejects; replacements are revalidated |
| before-upload | async(item) => boolean / File / Blob | false keeps ready; throw/rejection reports error; replacements are revalidated |
| before-remove | async(item,list) => boolean | false/rejection prevents removal |
| is-success-response | (xhr,item) => boolean | HTTP 2xx by default |
| request-choose | (chooseFile,event) => void / Promise | Own the selection entry; exceptions do not automatically open a file chooser |
| list-type | text / picture / picture-card | text; supported on both platforms |
| image-fit | fill / contain / cover / none / scale-down | cover; item.fit overrides |
| preview | boolean | true |
| show-file-list / show-upload-button / show-remove-button | boolean | true |
| show-retry-button / show-cancel-button / show-preview-button | boolean | true |
| show-download-button | boolean | false; disabled prevents interaction |
| elevation / ripple | boolean or number / boolean | false / true |

UploadFileItem requires uid, status and percent. name/size/type/file/url/thumbnailUrl/fit/response/error are optional. status is ready/reading/uploading/success/error/canceled/removed.

### Upload Events

- update:model-value(files), change(files, changedFile?): queue proposal order; Form receives one change notification per change, including progress/state updates.
- read(item): reading completed; business code may take over uploading. It does not indicate server success.
- rejected(UploadRejectedFile[]): reason is accept/before-add/before-read/read-error/max-file-size/max-total-size/max-files.
- exceed(nativeFiles, acceptedList): file-count limit exceeded.
- progress(item,event?), success(item), error(item): active-request notifications. Stale/canceled callbacks have no effect.
- remove(item): removal proposal after removal hooks accept it.
- preview(item, UploadPreviewEvent): event.preventDefault() cancels built-in image/video preview. Programmatic previews are cancelable too; originalEvent is optional.

### Upload Slots

- trigger({chooseFile,dragOver,disabled,describedBy}): custom selection entry.

Display-only content uses the wrapper button role and Enter/Space entry. Interactive custom content owns its keyboard behavior; the wrapper adds no button role or Tab stop. Bind the slot disabled value to your button. To associate the button itself with form errors and Upload’s aria-describedby, bind the slot’s describedBy to the button’s aria-describedby; it updates as errors appear and clear. Calling chooseFile directly needs no .stop: bubbling does not choose again or also invoke requestChoose. Custom buttons relying on bubbling can still use requestChoose.

```vue
<mp-upload aria-describedby="upload-hint">
  <template #trigger="{ chooseFile, disabled, describedBy }">
    <button type="button" :disabled="disabled" :aria-describedby="describedBy" @click="chooseFile">Choose file</button>
  </template>
</mp-upload>
<p id="upload-hint">Choose a file</p>
```

Use requestChoose for asynchronous decisions, or synchronously call event.preventDefault() before awaiting and invoking chooseFile yourself. Click listener Promises are not collected. Each requestChoose callback selects at most once and expires on unmount or KeepAlive deactivation, even after reopening.
- item({file,index,remove,retry,abort,replace}): customize a whole file item.
- remove-button({file,index,remove,retry,abort,replace}): customize removal actions.
- read({value,text}): field reading content; value is the nullable file model and text is formatted content. This differs from the file-read completion event.

### Upload Methods

Provides chooseFile(), replace(file,replacement?), submit(file?), abort(file?), retry(file), remove(file), reset(), clearSuccess(), clearError(), getFiles(status?), preview(file) and closePreview(). useUploader(options) provides headless upload logic, addFiles(files), and input/drag handlers.

chooseFile, replace, submit, retry and remove return `Promise<void>` for their preparation stages. submit/retry await preparation hooks and request-factory creation, without guaranteeing network completion; success/error events report results. chooseFile completion does not mean the user has selected a file, and remove completion does not mean a controlled parent accepted its proposal. Item/remove-button remove, retry and replace, and trigger chooseFile retain the same Promise types.

All public methods are callable before the editor first mounts. When it is unmounted, closed or deactivated, getFiles(status?) returns shallow snapshots of the accepted model filtered by status; asynchronous mutations settle as no-ops and synchronous mutations are no-ops. To perform an operation, first open and mount the editor through field interaction or controlled open, or use editMode="direct". Stored method references forward to the current instance after closing/reopening; cancelling an editor preserves the accepted model.

### Controlled state and lifecycle

If a controlled parent rejects an addition, only read/list proposals emit; automatic upload waits until that uid is accepted, then runs once. Same-tick proposals merge transactionally; across ticks, the actual parent list is authoritative. Rejected entries do not count toward total size. Parents own consistency of late list replacements. Explicit removal of rejected items, reset or unmount releases generated URLs; external URLs are never revoked. Built-in preview retains its own URL ownership until closing and does not close another component's later preview.

Cancellation covers before-upload, asynchronous headers/data/name and asynchronous custom-request handles. Retrying or replacing a File under the same uid invalidates old callbacks. before-read/before-upload replacements recheck limits. max-total-size counts accepted entries and the current valid prepared batch/request only. Disabled/readonly block selection, removal, submission and other mutations; readonly allows preview/download. KeepAlive deactivation cancels preparation/requests; reactivation allows new operations.

## Types

UploadProps、UploadEmits、UploadSlots、UploadExpose、UploadPublicMethods、UploadFileItem、UploadStatus、UploadListType、UploadResolveType、UploadImageFit、UploadCapture、UploadRejectedFile、UploadRejectedReason、UploadRequestOptions、UploadRequest、UploadCustomRequest、UploadProgressEvent、UploadData、UploadHeaders、UploadBeforeRead、UploadBeforeUpload、UploadBeforeRemove、UploadCreateThumbnailUrl、UploadIsSuccessResponse、UploadRequestChoose、UploadPreviewEvent、UseUploaderOptions、UploadInstance。

## CSS Variables

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-upload-action-size` | `var(--mp-sys-control-touch-target)` | `height`, `width` |
| `--mp-upload-active-color` | `var(--mp-sys-color-action-primary)` | `accent-color`, `border-color`, `outline` |
| `--mp-upload-background` | `var(--mp-sys-color-surface-default)` | `background` |
| `--mp-upload-border-color` | `var(--mp-sys-color-border-default)` | `border` |
| `--mp-upload-border-radius` | `var(--mp-sys-radius-md)` | `border-radius` |
| `--mp-upload-card-size` | `calc(var(--mp-sys-control-height-md) * 2)` | `height`, `min-height`, `width` |
| `--mp-upload-disabled-opacity` | `0.56` | `opacity` |
| `--mp-upload-duration-background` | `var(--mp-sys-color-surface-tooltip)` | `background` |
| `--mp-upload-duration-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-upload-duration-font-size` | `var(--mp-sys-font-size-sm)` | `font-size` |
| `--mp-upload-duration-padding` | `var(--mp-sys-space-1) var(--mp-sys-space-2)` | `padding` |
| `--mp-upload-duration-radius` | `var(--mp-sys-radius-sm)` | `border-radius` |
| `--mp-upload-error-color` | `var(--mp-sys-color-content-danger)` | `color` |
| `--mp-upload-font-size` | `var(--mp-sys-font-size-md)` | `font-size` |
| `--mp-upload-gap` | `var(--mp-sys-space-4)` | `gap` |
| `--mp-upload-hover-background` | `var(--mp-sys-color-state-hover)` | `background` |
| `--mp-upload-item-min-height` | `var(--mp-sys-control-height-md)` | `min-height` |
| `--mp-upload-item-padding` | `var(--mp-sys-space-4)` | `padding` |
| `--mp-upload-progress-height` | `var(--mp-sys-space-2)` | `height` |
| `--mp-upload-secondary-text-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-upload-text-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-upload-thumb-size` | `var(--mp-sys-control-height-lg)` | `height`, `width` |
| `--mp-upload-trigger-draggable-min-height` | `calc(var(--mp-sys-control-height-md) * 2)` | `min-height` |
| `--mp-upload-trigger-min-height` | `var(--mp-sys-control-height-md)` | `min-height` |
| `--mp-upload-trigger-padding-horizontal` | `var(--mp-sys-space-6)` | `padding-inline` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-upload-action-size: var(--mp-sys-control-touch-target);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
