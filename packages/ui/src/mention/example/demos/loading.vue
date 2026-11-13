<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import type { OptionsLoader } from '../../../_hooks/use-option-request'

const loading = ref(true)
const requests = new Set<(failed?: boolean) => void>()
const pending = ref(0)
const status = ref('等待数据 / Waiting for data')
const load: OptionsLoader<string> = (query, { signal }) =>
  new Promise((resolve, reject) => {
    const finish = (failed = false) => {
      requests.delete(finish)
      pending.value = requests.size
      signal.removeEventListener('abort', cancel)
      if (failed) {
        reject(new Error('Candidate request failed'))
      } else {
        resolve(['Alice', 'Bob'].filter((name) => name.toLowerCase().includes(query.toLowerCase())))
      }
    }
    const cancel = () => finish()
    requests.add(finish)
    pending.value = requests.size
    signal.addEventListener('abort', cancel, { once: true })
  })
function settle(failed = false) {
  status.value = failed ? '请求失败，可继续输入重试 / Failed; type to retry' : '数据已返回 / Data received'
  ;[...requests].forEach((finish) => finish(failed))
}
onBeforeUnmount(() => settle())
</script>
<template>
  <mp-space direction="column" style="width: 100%" :size="16">
    <h4>业务控制 / Manual loading</h4>
    <mp-switch v-model="loading" aria-label="业务加载状态 / Manual loading" />
    <mp-mention
      edit-mode="direct"
      :loading="loading"
      :options="['Alice', 'Bob']"
      placeholder="单行输入 @ / Single line"
    />
    <mp-mention
      edit-mode="direct"
      type="textarea"
      :loading="loading"
      :options="['Alice', 'Bob']"
      placeholder="多行输入 @ / Multiple lines"
    />
    <p>
      loading 只控制显示，两种输入框均可继续编辑。普通事件返回 Promise 不会触发等待。Loading does not disable editing or
      await notification handlers.
    </p>
    <h4>数据源等待 / Remote candidates</h4>
    <mp-mention
      edit-mode="direct"
      :options="load"
      placeholder="输入 @a，手动返回候选数据 / Type @a"
      @load-error="() => {}"
    />
    <mp-space>
      <mp-button :disabled="!pending" @click="settle()">返回数据 / Resolve</mp-button>
      <mp-button :disabled="!pending" @click="settle(true)">模拟失败 / Reject</mp-button>
    </mp-space>
    <p role="status">{{ pending ? '请求中，仍可输入 / Pending; editing remains available' : status }}</p>
  </mp-space>
</template>
