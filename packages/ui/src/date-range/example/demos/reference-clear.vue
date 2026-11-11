<script setup lang="ts">
import { ref } from 'vue'

const value = ref<string[] | null>(['2026-10-19', '2026-10-22'])
const allowed = ref(true)
const status = ref('清空后先检查草稿，再确认 / Clear, review the draft, then confirm')
function beforeCommit(
  { value: next }: { value: unknown },
  _done: (allow?: boolean) => void,
  { signal }: { signal: AbortSignal },
) {
  status.value = '等待 beforeCommit / Waiting for beforeCommit'
  return new Promise<boolean>((resolve) => {
    const finish = (accept: boolean) => {
      clearTimeout(timer)
      signal.removeEventListener('abort', cancel)
      resolve(accept)
    }
    const cancel = () => finish(false)
    const timer = setTimeout(() => {
      status.value = allowed.value
        ? `已确认 / Committed: ${JSON.stringify(next)}`
        : '已拒绝，模型不变 / Rejected; model preserved'
      finish(allowed.value)
    }, 600)
    signal.addEventListener('abort', cancel, { once: true })
    if (signal.aborted) {
      cancel()
    }
  })
}
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-switch v-model="allowed" aria-label="允许提交 / Allow commit" />
    <p>开启允许提交；关闭后确认会被拒绝。Allow commits with the switch; otherwise confirmation is rejected.</p>
    <mp-date-range
      v-model="value"
      edit-mode="popup"
      clearable
      :empty-value="null"
      value-format="YYYY-MM-DD"
      :before-commit="beforeCommit"
    />
    <mp-button @click="value = ['2026-10-19', '2026-10-22']">恢复日期 / Restore range</mp-button>
    <p role="status">{{ status }}</p>
    <p>
      已提交模型 / Committed model: <output>{{ JSON.stringify(value) }}</output>
    </p>
    <p>
      引用区清空只打开空草稿。取消会恢复原范围，确认后才执行守卫并提交 null。Clearing opens an empty draft; cancel
      restores the range and confirm runs the guard before committing null.
    </p>
  </mp-space>
</template>
