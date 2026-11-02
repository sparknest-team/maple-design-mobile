<!-- Source: docs/showcaseAsync.zh-CN.md; locale: zh-CN; page: /zh-CN/showcaseAsync -->

# 异步数据选择

观察人员 ID 的名称回显、候选搜索及阅读态业务操作。示例使用本地数据。

Example source: src/people-select/example/demos/injected-services.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const personId = ref<string | null>('alice')
const log = ref('')
const people = [
  {
    value: 'alice',
    label: 'Alice',
    mobile: '13800000000',
    avatar:
      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="24" height="24"%3E%3Ccircle cx="12" cy="12" r="12" fill="%236579af"/%3E%3C/svg%3E',
  },
  { value: 'bob', label: 'Bob', mobile: '13900000000' },
]
const options = async (query: string) =>
  people.filter((person) => person.label.toLowerCase().includes(query.toLowerCase()))
const resolve = async (id: string) => people.find((person) => person.value === id)
async function call(person: { value: string; mobile?: string }) {
  log.value = `Call: ${person.mobile || person.value}`
}
async function chat(person: { value: string }) {
  log.value = `Chat: ${person.value}`
}
</script>
<template>
  <mp-space direction="column">
    <mp-people-select v-model="personId" :options="options" :resolve="resolve" clearable :empty-value="null" />
    <mp-people-select
      v-model="personId"
      :resolve="resolve"
      show-phone
      show-chat
      :call="call"
      :chat="chat"
      read-pretty
    />
    <p role="status">{{ log }}</p>
  </mp-space>
</template>
```


## 复用业务数据服务

重新加载候选，观察加载状态和选中值；展开源码查看 useAsyncData 如何把数据请求与字段绑定分开。此例为本地固定数据，不模拟请求失败。

Example source: src/select/example/demos/async-source.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useAsyncData } from '@maple-design/use'

const value = ref('mengshuai')
// A shared business function can be imported and reused in other fields.
const loadPeople = async () => {
  await new Promise((resolve) => setTimeout(resolve, 200))
  return [
    { value: 'mengshuai', label: '孟帅' },
    { value: 'wujiaming', label: '吴甲明' },
  ]
}
const {
  data: options,
  loading,
  error,
  refresh,
} = useAsyncData(loadPeople, {
  initialData: [] as { value: string; label: string }[],
})
</script>
<template>
  <mp-space direction="column">
    <mp-select v-model="value" :options="options" :loading="loading" filterable />
    <p v-if="error" role="alert">加载失败，请重试。</p>
    <mp-button @click="refresh()">重新加载</mp-button>
  </mp-space>
</template>
```

演示后返回[专栏总览](showcase.md)继续下一站。

## 连续修改时的异步校验

输入错误用户名并触发校验，再改为 admin 再次校验。手动先返回最新结果、再返回最早结果，检查过期校验是否影响当前字段。此例的等待队列完全在本地，方便演示返回顺序。

Example source: src/form/example/demos/async-race.vue

```vue
<template>
  <section class="async-race-form-demo">
    <p>本地异步规则只接受 admin；手动返回最早或最新结果，不访问网络。</p>
    <mp-form ref="formRef" presentation="inline" :model="model" :disabled="disabled" :readonly="readonly">
      <mp-form-item
        v-if="mounted"
        field="name"
        label="用户名"
        :label-attrs="{ for: demoId }"
        :rules="rules"
        :validate-trigger="[]"
        feedback
      >
        <mp-input :id="demoId" v-model="model.name" presentation="inline" placeholder="请输入 admin" />
      </mp-form-item>
    </mp-form>
    <div class="async-race-controls">
      <mp-checkbox v-model="disabled" presentation="inline">Disable async form</mp-checkbox>
      <mp-checkbox v-model="readonly" presentation="inline">Readonly async form</mp-checkbox>
      <mp-checkbox v-model="mounted" presentation="inline">Mount async field</mp-checkbox>
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
import type { FormInstance } from '@maple-design/ui'
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
```
