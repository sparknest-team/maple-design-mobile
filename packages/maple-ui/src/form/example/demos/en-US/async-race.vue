<template>
  <section class="async-race-form-demo">
    <p>The local async rule only accepts admin. Resolve the oldest or newest request manually; no network is used.</p>
    <mp-form ref="formRef" :model="model" :disabled="disabled" :readonly="readonly">
      <mp-form-item
        v-if="mounted"
        field="name"
        label="Username"
        :label-attrs="{ for: demoId }"
        :rules="rules"
        :validate-trigger="[]"
        feedback
      >
        <mp-input :id="demoId" v-model="model.name" placeholder="Enter admin" />
      </mp-form-item>
    </mp-form>
    <div class="async-race-controls">
      <mp-checkbox v-model="disabled">Disable async form</mp-checkbox>
      <mp-checkbox v-model="readonly">Readonly async form</mp-checkbox>
      <mp-checkbox v-model="mounted">Mount async field</mp-checkbox>
    </div>
    <mp-space wrap>
      <mp-button :disabled="!mounted" @click="validate">Validate field</mp-button>
      <mp-button :disabled="!mounted" @click="validateAll">Validate whole form</mp-button>
      <mp-button :disabled="!pending.length" @click="complete(false)">Resolve oldest</mp-button>
      <mp-button :disabled="!pending.length" @click="complete(true)">Resolve newest</mp-button>
      <mp-button :disabled="!mounted" @click="serverError">Set server error</mp-button>
      <mp-button @click="clear">Clear validation</mp-button>
      <mp-button @click="reset">Reset</mp-button>
    </mp-space>
    <p role="status">Validation result: {{ result }}; Pending: {{ pending.length }}</p>
    <p>Validated value: {{ checkedValue || 'empty' }}</p>
    <ModelOutput>{{ model }}</ModelOutput>
  </section>
</template>
<script setup lang="ts">
import { onBeforeUnmount, onDeactivated, reactive, ref, shallowRef, useId } from 'vue'
import type { FormInstance } from '@maple-design/ui'
import ModelOutput from '../../components/ModelOutput.vue'

interface Pending {
  value: unknown
  resolve: (result: true | string) => void
}
const demoId = useId()
const disabled = ref(false)
const readonly = ref(false)
const mounted = ref(true)
const formRef = ref<FormInstance>()
const model = reactive({ name: '' })
const pending = shallowRef<Pending[]>([])
const result = ref('Not validated')
const checkedValue = ref('')
let run = 0

function request(value: unknown) {
  return new Promise<true | string>((resolve) => {
    pending.value = [...pending.value, { value, resolve }]
  })
}
const rules = [request]

function validate() {
  return validateScope(false)
}
function validateAll() {
  return validateScope(true)
}
async function validateScope(all: boolean) {
  const current = ++run
  checkedValue.value = model.name
  result.value = 'Validating'
  const errors = await (all ? formRef.value?.validate() : formRef.value?.validateField('name'))
  if (current === run) {
    result.value = errors ? 'Invalid' : 'Valid'
  }
}
function complete(latest: boolean) {
  const task = latest ? pending.value.at(-1) : pending.value[0]
  if (!task) {
    return
  }
  pending.value = pending.value.filter((item) => item !== task)
  task.resolve(task.value === 'admin' ? true : 'Username must be admin')
}
function clear() {
  run++
  formRef.value?.clearValidate()
  result.value = 'Cleared'
}
function serverError() {
  run++
  formRef.value?.setFields({ name: { status: 'error', message: 'Simulated server rejection' } })
  result.value = 'Server error'
}
function reset() {
  run++
  formRef.value?.resetFields()
  checkedValue.value = ''
  result.value = 'Reset'
}
function cleanup() {
  run++
  result.value = 'Canceled'
  const tasks = pending.value
  pending.value = []
  tasks.forEach((task) => task.resolve(true))
}
onBeforeUnmount(cleanup)
onDeactivated(cleanup)
</script>

<style scoped>
.async-race-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.async-race-controls label {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
</style>
