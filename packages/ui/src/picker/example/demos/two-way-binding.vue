<script setup>
import { ref } from 'vue'
import { Message, Picker } from '@maple-design/ui-vue'

const columns = ref([[{ text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }, { text: 'E' }]])
const columns2 = ref([
  [{ text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }, { text: 'E' }],
  [{ text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }, { text: 'E' }],
  [{ text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }, { text: 'E' }],
])
const values = ref(['A', 'B', 'C'])
async function picker() {
  await Picker({
    columns: columns.value,
    onChange(values, indexes) {
      Message(`values: ${values.toString()}, indexes: ${indexes.toString()}`)
    },
  })
}
function handleChange(values, indexes) {
  Message(`values: ${values.toString()}, indexes: ${indexes.toString()}`)
}
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-button status="primary" @click="values = ['A', 'B', 'C']">values: {{ values }} 点击重置</mp-button>
    <mp-picker v-model="values" :columns="columns2" @change="handleChange" />
  </mp-space>
</template>
