<script setup>
import { onBeforeUnmount, onDeactivated, reactive, ref, shallowRef, useId } from 'vue'
import ModelOutput from '../../components/ModelOutput.vue'

const formRef = ref()
const id = useId()
const model = reactive({ name: '', code: '' })
const pending = shallowRef([])
const submissions = ref(0)
const submittedResult = ref('-')
function submitted({ errors }) {
  submissions.value++
  submittedResult.value = errors ? 'Invalid' : 'Valid'
}
const result = ref('Not validated')
let run = 0
function request(field, value) {
  return new Promise((resolve) => {
    pending.value = [...pending.value, { field, value, resolve }]
  })
}
function rules(field) {
  return [(value) => request(field, value)]
}
const nameRules = rules('name')
const codeRules = rules('code')
async function validate() {
  const current = ++run
  result.value = 'Validating'
  const errors = await formRef.value?.validate()
  if (current === run) {
    result.value = errors ? 'Invalid' : 'Valid'
  }
}
function complete(field, latest = false) {
  const tasks = pending.value.filter((item) => item.field === field)
  const task = latest ? tasks.at(-1) : tasks[0]
  if (!task) {
    return
  }
  pending.value = pending.value.filter((item) => item !== task)
  task.resolve(
    task.value === (field === 'name' ? 'admin' : '1234')
      ? true
      : field === 'name'
        ? 'Username must be admin'
        : 'Code must be 1234',
  )
}
function reset() {
  run++
  formRef.value?.resetFields()
  result.value = 'Reset'
}
function clear() {
  run++
  formRef.value?.clearValidate()
  result.value = 'Cleared'
}
function serverError() {
  run++
  formRef.value?.setFields({ name: { status: 'error', message: 'Synthetic server rejection' } })
  result.value = 'Server error'
}
function cleanup() {
  run++
  const tasks = pending.value
  pending.value = []
  tasks.forEach((task) => task.resolve(true))
}
onBeforeUnmount(cleanup)
onDeactivated(cleanup)
</script>
<template>
  <section class="async-fields-form-demo">
    <p>Two independent local Promise rules: admin and 1234. Resolve each field separately; no network is used.</p>
    <mp-form ref="formRef" :model="model" @submit="submitted">
      <mp-form-item
        field="name"
        label="Username"
        :label-attrs="{ for: id + '-name' }"
        :rules="nameRules"
        :validate-trigger="[]"
        feedback
      >
        <mp-input :id="id + '-name'" v-model="model.name" />
      </mp-form-item>
      <mp-form-item
        field="code"
        label="Code"
        :label-attrs="{ for: id + '-code' }"
        :rules="codeRules"
        :validate-trigger="[]"
        feedback
      >
        <mp-input :id="id + '-code'" v-model="model.code" />
      </mp-form-item>
      <mp-button html-type="submit">Submit async form</mp-button>
    </mp-form>
    <mp-button html-type="button" @click="clear">Clear validation</mp-button>
    <mp-button html-type="button" @click="serverError">Set server error</mp-button>
    <p class="async-submit-status">Native submissions：{{ submissions }}；Result：{{ submittedResult }}</p>
    <mp-space wrap>
      <mp-button @click="validate">Validate both fields</mp-button>
      <mp-button :disabled="!pending.some((item) => item.field === 'name')" @click="complete('name')"
        >Resolve username</mp-button
      >
      <mp-button :disabled="!pending.some((item) => item.field === 'code')" @click="complete('code')"
        >Resolve code</mp-button
      >
      <mp-button :disabled="!pending.some((item) => item.field === 'name')" @click="complete('name', true)"
        >Resolve newest username</mp-button
      >
      <mp-button :disabled="!pending.some((item) => item.field === 'code')" @click="complete('code', true)"
        >Resolve newest code</mp-button
      >
      <mp-button @click="reset">Reset both fields</mp-button>
    </mp-space>
    <p role="status">
      Result:{{ result }}; Username pending:{{ pending.filter((item) => item.field === 'name').length }}; Code
      pending:{{ pending.filter((item) => item.field === 'code').length }}
    </p>
    <ModelOutput>{{ model }}</ModelOutput>
  </section>
</template>
