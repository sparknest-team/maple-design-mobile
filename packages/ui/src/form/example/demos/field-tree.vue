<script setup>
import { ref } from 'vue'
import ModelOutput from '../components/ModelOutput.vue'

const editMode = ref('popup')
const presentations = ['direct', 'popup'].map((value) => ({ value, label: value }))
const regions = [
  {
    label: '华东',
    value: 'east',
    children: [
      { label: '上海', value: 'shanghai' },
      {
        label: '浙江',
        value: 'zhejiang',
        children: [
          { label: '杭州', value: 'hangzhou' },
          { label: '宁波', value: 'ningbo' },
        ],
      },
    ],
  },
  {
    label: '华北',
    value: 'north',
    children: [
      { label: '北京', value: 'beijing' },
      { label: '天津', value: 'tianjin' },
    ],
  },
  { label: '华南（暂不可选）', value: 'south', disabled: true },
]
const model = ref({
  regions: ['shanghai', 'hangzhou'],
  region: 'shanghai',
  tree: 'shanghai',
  trees: ['shanghai', 'hangzhou'],
})
</script>

<template>
  <mp-space direction="column" align="stretch" :size="16">
    <mp-form-item layout="vertical" size="sm" label="字段展示方式">
      <mp-radio-group
        v-model="editMode"
        aria-label="字段展示方式"
        :options="presentations"
        variant="button"
        size="sm"
      />
    </mp-form-item>
    <mp-form :model="model" :edit-mode="editMode">
      <mp-form-item field="region" label="地区"
        ><mp-cascader v-model="model.region" :options="regions" filterable
      /></mp-form-item>
      <mp-form-item field="regions" label="多选地区"
        ><mp-cascader v-model="model.regions" :options="regions" multiple filterable show-path-label
      /></mp-form-item>
      <mp-form-item field="tree" label="树形选项（Cascader）"
        ><mp-cascader v-model="model.tree" :options="regions" filterable show-path-label
      /></mp-form-item>
      <mp-form-item field="trees" label="多选树形选项（Cascader）"
        ><mp-cascader v-model="model.trees" :options="regions" multiple filterable show-path-label
      /></mp-form-item>
    </mp-form>
    <ModelOutput aria-label="当前模型">{{ JSON.stringify(model, null, 2) }}</ModelOutput>
  </mp-space>
</template>
