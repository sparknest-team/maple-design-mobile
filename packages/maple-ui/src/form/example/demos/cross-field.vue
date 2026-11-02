<script setup>
import { onBeforeUnmount, onDeactivated, reactive, ref, shallowRef, useId } from 'vue'
import ModelOutput from '../components/ModelOutput.vue'

const formRef = ref()
const id = useId()
const model = reactive({ source: '', confirmation: '' })
const result = ref('尚未提交')
const submissions = ref(0)
const snapshot = ref('')
const message = '两次代码须相同且不能为空'
const sourceRules = [(value) => !!value || '请输入源代码']
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
  result.value = errors ? '未通过' : '通过'
  snapshot.value = JSON.stringify(values)
}
async function validateConfirmation() {
  const current = ++epoch
  const errors = await formRef.value?.validateField('confirmation')
  if (current === epoch) {
    result.value = errors ? '确认值未通过' : '确认值通过'
  }
}
function reset() {
  cleanup()
  result.value = '已重置'
  snapshot.value = ''
}
</script>

<template>
  <section class="cross-field-form-demo">
    <p>仅使用本地合成代码。校验时确认值比较当前源代码；修改源代码不自动复验依赖字段。</p>
    <mp-form ref="formRef" edit-mode="direct" :model="model" @submit="submitted" @reset="reset">
      <mp-form-item
        field="source"
        label="源代码"
        :label-attrs="{ for: id + '-source' }"
        :rules="sourceRules"
        :validate-trigger="[]"
        feedback
      >
        <mp-input :id="id + '-source'" v-model="model.source" edit-mode="direct" />
      </mp-form-item>
      <mp-form-item
        field="confirmation"
        label="确认代码"
        :label-attrs="{ for: id + '-confirmation' }"
        :rules="confirmationRules"
        :validate-trigger="[]"
        feedback
      >
        <mp-input :id="id + '-confirmation'" v-model="model.confirmation" edit-mode="direct" />
      </mp-form-item>
      <mp-space wrap>
        <mp-button html-type="submit">提交代码</mp-button>
        <mp-button @click="validateConfirmation">只校验确认值</mp-button>
        <mp-button html-type="reset">重置代码</mp-button>
      </mp-space>
    </mp-form>
    <p role="status">结果：{{ result }}；提交次数：{{ submissions }}</p>
    <mp-button html-type="button" :aria-pressed="paused" @click="paused = !paused">暂停跨字段校验</mp-button>
    <mp-button html-type="button" :disabled="!pending.length" @click="complete">返回跨字段结果</mp-button>
    <p class="cross-field-pending">等待：{{ pending.length }}</p>
    <ModelOutput>模型：{{ model }}</ModelOutput>
    <ModelOutput>上次提交值：{{ snapshot || '-' }}</ModelOutput>
  </section>
</template>
