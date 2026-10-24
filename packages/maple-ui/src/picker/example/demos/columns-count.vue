<script setup>
import { ref } from 'vue'
import { Message, Picker } from '@maple-design/ui'
import area from '../../../../json/area.json'

const columns = ref([[{ text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }, { text: 'E' }]])
const columns4 = ref(area)
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
  <mp-picker :columns="columns4" cascade :columns-count="2" @change="handleChange" />
</template>
