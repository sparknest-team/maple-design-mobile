<script setup lang="ts">
import { ref } from 'vue'
import type { DialogBeforeClose } from '@maple-design/ui'

const open = ref(false)
const mode = ref('promise')
const allowed = ref(false)
const status = ref('')
const check: DialogBeforeClose = (payload, done, { signal }) => {
  status.value = `等待： ${payload.action}`
  if (mode.value === 'done') {
    setTimeout(() => {
      status.value = allowed.value ? '允许' : '阻止'
      done(!signal.aborted && allowed.value)
    }, 500)
    return
  }
  return new Promise<boolean>((resolve) =>
    setTimeout(() => {
      status.value = allowed.value ? '允许' : '阻止'
      resolve(!signal.aborted && allowed.value)
    }, 500),
  )
}
</script>
<template>
  <mp-space direction="column" align="stretch">
    <mp-switch v-model="allowed" />
    <mp-form-item layout="vertical" size="sm" label="mode">
      <mp-radio-group
        v-model="mode"
        aria-label="mode"
        :options="[
          { value: 'promise', label: 'Promise' },
          { value: 'done', label: 'done 回调' },
        ]"
        variant="button"
        size="sm"
      />
    </mp-form-item>
    <mp-button @click="open = true">打开</mp-button>
    <mp-dialog v-model:open="open" :before-close="check" @guard-error="status = 'Error'">
      <template #default
        ><mp-button v-if="false" @click="open = true">Confirm action</mp-button
        ><span v-else>通过 beforeClose 关闭</span></template
      >
    </mp-dialog>
    <p role="status">{{ status }}</p>
  </mp-space>
</template>
