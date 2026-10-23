<template>
  <section class="async-race-form-demo">
    <p>本地异步规则只接受 admin；手动返回最早或最新结果，不访问网络。</p>
    <mp-form ref="formRef" :model="model" :disabled="disabled" :readonly="readonly">
      <mp-form-item
        v-if="mounted"
        field="name"
        label="用户名"
        :label-attrs="{ for: demoId }"
        :rules="rules"
        :validate-trigger="[]"
        feedback
      >
        <mp-input :id="demoId" v-model="model.name" placeholder="请输入 admin" />
      </mp-form-item>
    </mp-form>
    <div class="async-race-controls">
      <mp-checkbox v-model="disabled">Disable async form</mp-checkbox>
      <mp-checkbox v-model="readonly">Readonly async form</mp-checkbox>
      <mp-checkbox v-model="mounted">Mount async field</mp-checkbox>
    </div>
    <mp-space wrap>
      <mp-button :disabled="!mounted" @click="validate">校验字段</mp-button>
      <mp-button :disabled="!mounted" @click="validateAll">校验整表</mp-button>
      <mp-button :disabled="!pending.length" @click="complete(false)">返回最早结果</mp-button>
      <mp-button :disabled="!pending.length" @click="complete(true)">返回最新结果</mp-button>
      <mp-button :disabled="!mounted" @click="serverError">写入服务端错误</mp-button>
      <mp-button @click="clear">清空校验</mp-button>
      <mp-button @click="reset">重置</mp-button>
    </mp-space>
    <p role="status">校验结果：{{ result }}；等待结果：{{ pending.length }}</p>
    <p>本次校验值：{{ checkedValue || '空' }}</p>
    <ModelOutput>{{ model }}</ModelOutput>
  </section>
</template>
<script setup lang="ts">
import { onBeforeUnmount, onDeactivated, reactive, ref, shallowRef, useId } from 'vue'
import type { FormInstance } from '@maplejs/maple-ui'
import ModelOutput from '../components/ModelOutput.vue'

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
const result = ref('尚未校验')
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
  result.value = '校验中'
  const errors = await (all ? formRef.value?.validate() : formRef.value?.validateField('name'))
  if (current === run) {
    result.value = errors ? '未通过' : '通过'
  }
}
function complete(latest: boolean) {
  const task = latest ? pending.value.at(-1) : pending.value[0]
  if (!task) {
    return
  }
  pending.value = pending.value.filter((item) => item !== task)
  task.resolve(task.value === 'admin' ? true : '用户名必须是 admin')
}
function clear() {
  run++
  formRef.value?.clearValidate()
  result.value = '已清空'
}
function serverError() {
  run++
  formRef.value?.setFields({ name: { status: 'error', message: '模拟服务端拒绝' } })
  result.value = '服务端错误'
}
function reset() {
  run++
  formRef.value?.resetFields()
  checkedValue.value = ''
  result.value = '已重置'
}
function cleanup() {
  run++
  result.value = '已取消'
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
