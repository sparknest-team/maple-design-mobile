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
    <mp-checkbox v-model="allow" edit-mode="direct">允许此操作</mp-checkbox>
    <mp-checkbox v-model="manual" edit-mode="direct">手动异步确认</mp-checkbox>
    <mp-checkbox v-model="blocked" edit-mode="direct">禁用上传组件</mp-checkbox>
    <mp-button html-type="button" :disabled="!pending.length" @click="settle(true)">确认删除</mp-button>
    <mp-button html-type="button" :disabled="!pending.length" @click="settle(false)">取消删除</mp-button>
    <mp-button html-type="button" :disabled="!pending.length" @click="settle('reject')">异常拒绝删除</mp-button>
    <mp-button html-type="button" :disabled="!files.length" @click="replace">替换同 UID 文件</mp-button>
    <mp-button html-type="button" @click="uploadRef?.reset()">重置上传队列</mp-button>
    <mp-button html-type="button" @click="restore">恢复示例文件</mp-button>
    <mp-checkbox v-model="mounted" edit-mode="direct">激活上传组件</mp-checkbox>
    <KeepAlive>
      <mp-upload
        v-if="mounted"
        ref="uploadRef"
        v-model="files"
        edit-mode="direct"
        :before-remove="beforeRemove"
        :disabled="blocked"
        @remove="removed++"
      />
    </KeepAlive>
    <p role="status">文件：{{ files.length }}；等待：{{ pending.length }}；钩子：{{ attempts }}；删除：{{ removed }}</p>
  </section>
</template>
