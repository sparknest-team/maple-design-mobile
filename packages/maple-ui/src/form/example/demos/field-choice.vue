<script setup>
import { ref } from 'vue'
import ModelOutput from '../components/ModelOutput.vue'

const editMode = ref('popup')
const presentations = ['direct', 'popup'].map((value) => ({ value, label: value }))
const choices = [
  { label: '研发', value: 'dev' },
  { label: '设计', value: 'design' },
  { label: '运营', value: 'ops' },
]
const model = ref({
  enabled: true,
  agreed: true,
  teams: ['dev', 'design'],
  role: 'dev',
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
      <mp-form-item field="enabled" label="启用"><mp-switch v-model="model.enabled" /></mp-form-item>
      <mp-form-item field="agreed" label="确认状态"
        ><mp-checkbox v-model="model.agreed">已阅读说明</mp-checkbox></mp-form-item
      >
      <mp-form-item field="teams" label="协作部门"
        ><mp-checkbox-group v-model="model.teams" :options="choices"
      /></mp-form-item>
      <mp-form-item field="role" label="所属部门"
        ><mp-radio-group v-model="model.role" :options="choices"
      /></mp-form-item>
    </mp-form>
    <ModelOutput aria-label="当前模型">{{ JSON.stringify(model, null, 2) }}</ModelOutput>
  </mp-space>
</template>
