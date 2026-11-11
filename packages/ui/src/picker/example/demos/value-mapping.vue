<script setup>
import { ref } from 'vue'
import { Message, Picker } from '@maple-design/ui-vue'

const columns = ref([[{ text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }, { text: 'E' }]])
const columns5 = ref([
  [
    { text: 'A', value: 1 },
    { text: 'B', value: 2 },
    { text: 'C', value: 3 },
    { text: 'D', value: 4 },
  ],
  [
    { text: 'A', value: 1 },
    { text: 'B', value: 2 },
    { text: 'C', value: 3 },
    { text: 'D', value: 4 },
  ],
  [
    { text: 'A', value: 1 },
    { text: 'B', value: 2 },
    { text: 'C', value: 3 },
    { text: 'D', value: 4 },
  ],
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
  <mp-picker :columns="columns5" @change="handleChange" />
</template>
