<script setup>
import { onDeactivated, onUnmounted, ref, shallowRef } from 'vue'

const value = ref(['remote'])
const options = ref([])
const loading = ref(false)
let pendingTimer
const manual = ref(false)
const waiting = shallowRef([])
const applied = ref(0)
const ignored = ref(0)
const changeCount = ref(0)
let version = 0
let sequence = 0

function cancelPending() {
  version++
  if (pendingTimer !== undefined) {
    clearTimeout(pendingTimer)
  }
  pendingTimer = undefined
  loading.value = false
}

function load() {
  cancelPending()
  loading.value = true
  const ticket = version
  const id = ++sequence
  const complete = () => {
    if (ticket !== version) {
      ignored.value++
      return
    }
    applied.value = id
    options.value = [
      { label: '异步设备', value: 'remote' },
      { label: '设备 A', value: 'a' },
      { label: '设备 B', value: 'b' },
      { label: '停用设备', value: 'locked', disabled: true },
    ]
    pendingTimer = undefined
    loading.value = false
  }
  if (manual.value) {
    new Promise((resolve) => {
      waiting.value = [...waiting.value, { id, resolve }]
    }).then(complete)
  } else {
    pendingTimer = setTimeout(complete, 800)
  }
}

function settle(latest) {
  const jobs = [...waiting.value]
  const job = latest ? jobs.pop() : jobs.shift()
  waiting.value = jobs
  job?.resolve()
}

function cleanup() {
  cancelPending()
  const jobs = waiting.value
  waiting.value = []
  jobs.forEach((job) => job.resolve())
}

function remove() {
  cancelPending()
  options.value = []
}

onDeactivated(cleanup)
onUnmounted(cleanup)
</script>

<template>
  <mp-space class="checkbox-async-demo" direction="column">
    <p>业务值独立于当前选项，加载或移除选项不会清空已选值：{{ value }}</p>
    <mp-checkbox v-model="manual" edit-mode="direct" @change="remove">Manual responses / 手动返回</mp-checkbox>
    <mp-space wrap>
      <mp-button size="sm" @click="load">加载选项</mp-button>
      <mp-button size="sm" @click="remove">移除选项</mp-button>
      <mp-button size="sm" :disabled="waiting.length === 0" @click="settle(false)">返回最早加载</mp-button>
      <mp-button size="sm" :disabled="waiting.length === 0" @click="settle(true)">返回最新加载</mp-button>
    </mp-space>
    <p aria-live="polite">
      {{ loading ? '加载中，可在完成前移除选项以取消本次加载。' : '加载完成后保留当前选值和键盘焦点。' }}
    </p>
    <mp-checkbox-group v-model="value" edit-mode="direct" :options="options" :max="2" @change="changeCount++" />
    <p>用户变更次数：{{ changeCount }}</p>
    <p role="status">Applied: {{ applied }} · Ignored: {{ ignored }} · Pending: {{ waiting.length }}</p>
  </mp-space>
</template>
