<script setup>
import { onBeforeUnmount, onDeactivated, reactive, ref, shallowRef, useId } from 'vue'
import ModelOutput from '../../components/ModelOutput.vue'

const formRef = ref()
const id = useId()
const model = reactive({ source: '', confirmation: '' })
const result = ref('Not submitted')
const submissions = ref(0)
const snapshot = ref('')
const message = 'Codes must match and must not be empty'
const sourceRules = [(value) => !!value || 'Enter a source code']
const paused = ref(false)
const pending = shallowRef([])
let epoch = 0
function complete() {
  const [resolve, ...rest] = pending.value
  pending.value = rest
  resolve?.()
}
function cleanup() {
  epoch++
  const tasks = pending.value
  pending.value = []
  tasks.forEach((resolve) => resolve())
}
onBeforeUnmount(cleanup)
onDeactivated(cleanup)
const confirmationRules = [
  async (value) => {
    if (paused.value) {
      await new Promise((resolve) => {
        pending.value = [...pending.value, resolve]
      })
    }
    return (!!value && value === model.source) || message
  },
]
function submitted({ errors, values }) {
  submissions.value++
  result.value = errors ? 'Failed' : 'Passed'
  snapshot.value = JSON.stringify(values)
}
async function validateConfirmation() {
  const current = ++epoch
  const errors = await formRef.value?.validateField('confirmation')
  if (current === epoch) {
    result.value = errors ? 'Confirmation failed' : 'Confirmation passed'
  }
}
function reset() {
  cleanup()
  result.value = 'Reset'
  snapshot.value = ''
}
</script>

<template>
  <section class="cross-field-form-demo">
    <p>
      Local synthetic codes only. Confirmation compares the current source on validation; changing the source does not
      automatically revalidate its dependent field.
    </p>
    <mp-form ref="formRef" :model="model" @submit="submitted" @reset="reset">
      <mp-form-item
        field="source"
        label="Source code"
        :label-attrs="{ for: id + '-source' }"
        :rules="sourceRules"
        :validate-trigger="[]"
        feedback
      >
        <mp-input :id="id + '-source'" v-model="model.source" />
      </mp-form-item>
      <mp-form-item
        field="confirmation"
        label="Confirmation code"
        :label-attrs="{ for: id + '-confirmation' }"
        :rules="confirmationRules"
        :validate-trigger="[]"
        feedback
      >
        <mp-input :id="id + '-confirmation'" v-model="model.confirmation" />
      </mp-form-item>
      <mp-space wrap>
        <mp-button html-type="submit">Submit codes</mp-button>
        <mp-button @click="validateConfirmation">Validate confirmation</mp-button>
        <mp-button html-type="reset">Reset codes</mp-button>
      </mp-space>
    </mp-form>
    <p role="status">Result：{{ result }}；Submissions：{{ submissions }}</p>
    <mp-button html-type="button" :aria-pressed="paused" @click="paused = !paused"
      >Pause cross-field validation</mp-button
    >
    <mp-button html-type="button" :disabled="!pending.length" @click="complete">Resolve cross-field result</mp-button>
    <p class="cross-field-pending">Pending：{{ pending.length }}</p>
    <ModelOutput>Model：{{ model }}</ModelOutput>
    <ModelOutput>Last submitted values：{{ snapshot || '-' }}</ModelOutput>
  </section>
</template>
