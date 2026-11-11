<script setup lang="ts">
import { reactive, ref } from 'vue'

const model = reactive({ status: '' as string | null })
const multiple = ref(['active'])
const optional = ref<string | undefined>('active')
const options = [
  { value: '', label: '全部' },
  { value: 'active', label: '启用' },
]
</script>
<template>
  <mp-space direction="column">
    <p>“全部”的值是空字符串，仍是有效选项；点击清空返回 null。</p>
    <mp-form :model="model" layout="vertical">
      <mp-form-item field="status" label="状态">
        <mp-select
          v-model="model.status"
          :options="options"
          edit-mode="direct"
          clearable
          :empty-values="[null, undefined]"
          :empty-value="null"
        />
      </mp-form-item>
    </mp-form>
    <mp-button @click="model.status = ''">选择“全部”</mp-button>
    <p>
      当前模型: <output>{{ JSON.stringify(model.status) }}</output>
    </p>
    <mp-form layout="vertical">
      <mp-form-item label="多选：清空返回 []">
        <mp-select
          v-model="multiple"
          :options="options"
          edit-mode="direct"
          multiple
          clearable
          :empty-value="() => []"
        />
        <output>{{ JSON.stringify(multiple) }}</output>
      </mp-form-item>
      <mp-form-item label="单选：清空返回 undefined">
        <mp-select v-model="optional" :options="options" edit-mode="direct" clearable :empty-value="() => undefined" />
        <output>{{ String(optional) }}</output>
      </mp-form-item>
    </mp-form>
  </mp-space>
</template>
