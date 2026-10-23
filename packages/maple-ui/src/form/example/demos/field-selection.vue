<script setup>
import { ref, watch } from 'vue'
import ModelOutput from '../components/ModelOutput.vue'

const presentation = ref('inline')
const presentations = ['inline', 'popup'].map((value) => ({ value, label: value }))
const devices = [
  {
    isGroup: true,
    label: '常用设备',
    options: [
      { value: 'laptop', label: '笔记本' },
      { value: 'phone', label: '手机' },
      { value: 'tablet', label: '平板' },
    ],
  },
  {
    isGroup: true,
    label: '其他设备',
    options: [
      { value: 'desktop', label: '台式工作站' },
      { value: 'watch', label: '智能手表（暂不可选）', disabled: true },
    ],
  },
]
const people = [
  { value: 'lin', label: '林晓 · 研发' },
  { value: 'chen', label: '陈晨 · 设计' },
  { value: 'zhou', label: '周宁 · 运营' },
]
const suggestions = [
  { isGroup: true, label: '技术团队', options: [{ value: '研发' }, { value: '研发平台' }, { value: '研发基础设施' }] },
  {
    isGroup: true,
    label: '协作团队',
    options: [{ value: '设计' }, { value: '运营' }, { value: '归档团队', disabled: true }],
  },
]
const model = ref({
  device: 'laptop',
  devices: ['laptop', 'phone'],
  keyword: '研发',
  person: 'lin',
})
</script>

<template>
  <mp-space direction="column" :size="16">
    <mp-select v-model="presentation" :options="presentations" :clearable="false" aria-label="字段展示方式" />
    <mp-form :model="model" :presentation="presentation">
      <mp-form-item field="device" label="单选设备"
        ><mp-select v-model="model.device" :options="devices" filterable
      /></mp-form-item>
      <mp-form-item field="devices" label="多选设备"
        ><mp-select v-model="model.devices" :options="devices" multiple filterable :limit="3"
      /></mp-form-item>
      <mp-form-item field="keyword" label="自动补全"
        ><mp-auto-complete v-model="model.keyword" :options="suggestions" clearable placeholder="输入或选择团队"
      /></mp-form-item>
      <mp-form-item field="person" label="人员（Select）"
        ><mp-select
          v-model="model.person"
          :options="people"
          :show-extra-options="false"
          filterable
          clearable
          placeholder="搜索人员"
      /></mp-form-item>
    </mp-form>
    <ModelOutput aria-label="当前模型">{{ JSON.stringify(model, null, 2) }}</ModelOutput>
  </mp-space>
</template>
