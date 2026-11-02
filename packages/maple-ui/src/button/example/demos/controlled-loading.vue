<script setup lang="ts">
import { ref } from 'vue'

const saving = ref(false)
const failing = ref(false)
const message = ref('点击保存，观察业务控制的 loading / Click Save to start')
const delay = () => new Promise((resolve) => setTimeout(resolve, 800))
async function save() {
  if (saving.value) {
    return
  }
  saving.value = true
  try {
    await delay()
    message.value = '保存完成 / Saved'
  } finally {
    saving.value = false
  }
}
async function recover() {
  if (failing.value) {
    return
  }
  failing.value = true
  try {
    await delay()
    throw new Error('模拟请求失败 / Simulated failure')
  } catch (error) {
    message.value = (error as Error).message
  } finally {
    failing.value = false
  }
}
</script>
<template>
  <mp-space direction="column" :size="12">
    <p>
      click 支持 async 回调；业务通过 loading 展示等待，在 finally 中恢复。Async click handlers own their loading state.
    </p>
    <mp-space wrap :size="12">
      <mp-button :loading="saving" @click="save">保存 / Save</mp-button>
      <mp-button :loading="failing" @click="recover">失败与恢复 / Failure recovery</mp-button>
    </mp-space>
    <p aria-live="polite">{{ message }}</p>
  </mp-space>
</template>
