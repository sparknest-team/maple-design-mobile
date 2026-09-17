<script setup>
import { computed, reactive, ref } from 'vue'

const modelField = ref('name')
const model = reactive({})
const fields = computed(() => [
  {
    value: 'id',
    label: '设备ID',
    placeholder: '请输入ID',
  },
  {
    value: 'name',
    label: '设备名称',
    placeholder: '请输入名称',
  },
  {
    value: 'desc',
    label: '设备描述',
    placeholder: '请输入描述',
  },
])
function handleSearch(result) {
  console.log('search', result)
}
function handleChange(value) {
  console.log('change', value, model)
}
function reset() {
  Object.keys(model).forEach((key) => {
    delete model[key]
  })
}
</script>

<template>
  <mp-space direction="column" :size="['3vmin', 0]">
    <mp-search
      v-model:model-field="modelField"
      :model="model"
      :fields="fields"
      :select-style="{ minWidth: '28vmin' }"
      show-action
      action-type="search"
      action-text="搜索"
      @change="handleChange"
      @search="handleSearch"
    />
    <mp-button variant="text" @click="reset">重置</mp-button>
  </mp-space>
</template>
