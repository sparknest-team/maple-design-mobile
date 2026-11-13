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
