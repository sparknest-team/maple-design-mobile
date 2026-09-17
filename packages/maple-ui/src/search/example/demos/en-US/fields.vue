<script setup>
import { computed, reactive, ref } from 'vue'

const modelField = ref('name')
const model = reactive({})
const fields = computed(() => [
  {
    value: 'id',
    label: 'Device ID',
    placeholder: 'Enter an ID',
  },
  {
    value: 'name',
    label: 'Device name',
    placeholder: 'Enter a name',
  },
  {
    value: 'desc',
    label: 'Device description',
    placeholder: 'Enter a description',
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
      action-text="Search"
      @change="handleChange"
      @search="handleSearch"
    />
    <mp-button variant="text" @click="reset">Reset</mp-button>
  </mp-space>
</template>
