<script setup lang="ts">
import { reactive, ref } from 'vue'

const model = reactive({ department: -1 as number | null | undefined })
const form = ref()
const result = ref('尚未校验')
const options = [
  { value: 1, label: '研发' },
  { value: 2, label: '产品' },
]
async function validate() {
  const errors = await form.value.validate()
  result.value = errors ? '存在必填错误' : '校验通过'
}
</script>
<template>
  <mp-space direction="column">
    <p>先校验初始 -1，再选择部门并校验；点击清空后会回到 -1。</p>
    <mp-form ref="form" :model="model" layout="vertical" :empty-values="[null, undefined, -1]">
      <mp-form-item field="department" label="部门" required>
        <mp-select v-model="model.department" :options="options" edit-mode="direct" clearable :empty-value="-1" />
      </mp-form-item>
    </mp-form>
    <mp-button @click="validate">校验</mp-button>
    <p role="status">{{ result }}</p>
    <p>
      当前模型: <output>{{ String(model.department) }}</output>
    </p>
  </mp-space>
</template>
