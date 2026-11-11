<script setup lang="ts">
import { reactive, ref } from 'vue'

const model = reactive({ status: '' as string | null })
const multiple = ref(['active'])
const optional = ref<string | undefined>('active')
const options = [
  { value: '', label: 'All' },
  { value: 'active', label: 'Active' },
]
</script>
<template>
  <mp-space direction="column">
    <p>All uses an empty string as a valid option value. Clearing produces null.</p>
    <mp-form :model="model" layout="vertical">
      <mp-form-item field="status" label="Status">
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
    <mp-button @click="model.status = ''">Choose All</mp-button>
    <p>
      Current model: <output>{{ JSON.stringify(model.status) }}</output>
    </p>
    <mp-form layout="vertical">
      <mp-form-item label="Multiple: clear to []">
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
      <mp-form-item label="Single: clear to undefined">
        <mp-select v-model="optional" :options="options" edit-mode="direct" clearable :empty-value="() => undefined" />
        <output>{{ String(optional) }}</output>
      </mp-form-item>
    </mp-form>
  </mp-space>
</template>
