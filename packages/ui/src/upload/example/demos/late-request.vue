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
