<script setup lang="ts">
import { onBeforeUnmount, onDeactivated, reactive, ref, shallowRef, useId } from 'vue'

const id = useId()
const model = reactive({ name: 'allowed' })
const pending = shallowRef<{ value: unknown; resolve: (result: boolean | string) => void }[]>([])
const submissions = ref(0)
const snapshot = ref('-')
function request(value: unknown) {
  return new Promise<boolean | string>((resolve) => {
    pending.value = [...pending.value, { value, resolve }]
  })
}
const rules = [(value: unknown) => request(value)]
function complete() {
  const [task, ...rest] = pending.value
  if (!task) {
    return
  }
  pending.value = rest
  task.resolve(task.value === 'allowed' ? true : '请输入 allowed / Enter allowed')
}
function submitted(data: { values: Record<string, unknown>; errors?: unknown }) {
  submissions.value++
  snapshot.value = JSON.stringify({ values: data.values, valid: !data.errors })
}
function cleanup() {
  const tasks = pending.value
  pending.value = []
  tasks.forEach((task) => task.resolve(false))
}
onBeforeUnmount(cleanup)
onDeactivated(cleanup)
</script>
<template>
  <section>
    <p>
      提交后修改输入，再返回旧结果：提交次数仍为 0。重新提交并返回本次结果，才会通知。Edit while waiting, then resolve:
      submit again to validate the new input.
    </p>
    <mp-form :model="model" edit-mode="direct" @submit="submitted">
      <mp-form-item field="name" label="Name" :label-attrs="{ for: id }" :rules="rules" :validate-trigger="[]" feedback>
        <mp-input :id="id" v-model="model.name" edit-mode="direct" />
      </mp-form-item>
      <mp-space wrap>
        <mp-button html-type="submit">提交 / Submit</mp-button>
        <mp-button html-type="button" :disabled="!pending.length" @click="complete"
          >返回最早结果 / Resolve oldest</mp-button
        >
      </mp-space>
    </mp-form>
    <p role="status">Submissions: {{ submissions }}; pending: {{ pending.length }}</p>
    <pre class="submitted-values">{{ snapshot }}</pre>
  </section>
</template>
