<script setup>
import { onDeactivated, onUnmounted, ref, shallowRef } from 'vue'

const value = ref('remote')
const options = ref([])
const loading = ref(false)
const changeCount = ref(0)
let pendingTimer
const manual = ref(false)
const waiting = shallowRef([])
const applied = ref(0)
const ignored = ref(0)
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
      { label: 'Remote device', value: 'remote' },
      { label: 'Device A', value: 'a' },
      { label: 'Disabled device', value: 'locked', disabled: true },
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
  <mp-space class="radio-async-demo" direction="column">
    <p>Values survive loading and removing options:{{ value }}</p>
    <mp-checkbox v-model="manual" @change="remove">Manual responses / 手动返回</mp-checkbox>
    <mp-space wrap>
      <mp-button size="sm" @click="load">Load options</mp-button>
      <mp-button size="sm" @click="remove">Remove options</mp-button>
      <mp-button size="sm" @click="value = 'a'">Set Device A</mp-button>
      <mp-button size="sm" @click="value = null">Clear selection</mp-button>
      <mp-button size="sm" :disabled="waiting.length === 0" @click="settle(false)">Resolve oldest load</mp-button>
      <mp-button size="sm" :disabled="waiting.length === 0" @click="settle(true)">Resolve newest load</mp-button>
    </mp-space>
    <p aria-live="polite">
      {{
        loading
          ? 'Loading. Remove the options before completion to cancel this request.'
          : 'Loading preserves the current selection and keyboard focus.'
      }}
    </p>
    <mp-radio-group v-model="value" :options="options" @change="changeCount++" />
    <p>User changes：{{ changeCount }}</p>
    <p role="status">Applied: {{ applied }} · Ignored: {{ ignored }} · Pending: {{ waiting.length }}</p>
  </mp-space>
</template>
