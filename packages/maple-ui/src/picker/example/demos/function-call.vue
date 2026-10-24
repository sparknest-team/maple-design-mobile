<script setup>
import { ref } from 'vue'
import { Message, Picker } from '@maple-design/ui'
import area from '../../../../json/area.json'

const columns = ref([[{ text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }, { text: 'E' }]])
const columns2 = ref([
  [{ text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }, { text: 'E' }],
  [{ text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }, { text: 'E' }],
  [{ text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }, { text: 'E' }],
])
const columns3 = ref([
  {
    text: '四川省',
    children: [
      {
        text: '成都市',
        children: [
          {
            text: '温江区',
          },
          {
            text: '青羊区',
          },
        ],
      },
    ],
  },
  {
    text: '江苏省',
    children: [
      {
        text: '无锡市',
        children: [
          {
            text: '新吴区',
          },
          {
            text: '滨湖区',
          },
        ],
      },
    ],
  },
])
const columns4 = ref(area)
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
async function picker2() {
  await Picker({
    columns: columns2.value,
    onChange(values, indexes) {
      Message(`values: ${values.toString()}, indexes: ${indexes.toString()}`)
    },
  })
}
async function picker3() {
  await Picker({
    cascade: true,
    columns: columns3.value,
    onChange(values, indexes) {
      Message(`values: ${values.toString()}, indexes: ${indexes.toString()}`)
    },
  })
}
async function picker4() {
  await Picker({
    columns: columns4.value,
    cascade: true,
    onChange(values, indexes) {
      Message(`values: ${values.toString()}, indexes: ${indexes.toString()}`)
    },
  })
}
async function picker5() {
  await Picker({
    columns: columns5.value,
    onChange(values, indexes) {
      Message(`values: ${values.toString()}, indexes: ${indexes.toString()}`)
    },
  })
}
async function picker6() {
  await Picker({
    columns: columns4,
    cascade: true,
    columnsCount: 2,
    onChange(values, indexes) {
      Message(`values: ${values.toString()}, indexes: ${indexes.toString()}`)
    },
  })
}
</script>

<template>
  <mp-space direction="column" :size="['3vmin', '4vmin']">
    <mp-button status="primary" block @click="picker">单列选择</mp-button>
    <mp-button status="primary" block @click="picker2">多列选择</mp-button>
    <mp-button status="primary" block @click="picker3">级联选择</mp-button>
    <mp-button status="primary" block @click="picker4">地区选择</mp-button>
    <mp-button status="primary" block @click="picker6">列数量</mp-button>
    <mp-button status="primary" block @click="picker5">值映射</mp-button>
  </mp-space>
</template>
