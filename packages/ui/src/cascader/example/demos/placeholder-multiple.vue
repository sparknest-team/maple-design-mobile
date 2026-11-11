<script setup>
import { computed, ref } from 'vue'

const multipleValue = ref([])
const options = computed(() => [
  {
    label: '浙江省',
    value: 'zhejiang',
    children: [
      {
        label: '杭州市',
        value: 'hangzhou',
        children: [
          { label: '西湖区', value: 'xihu' },
          { label: '拱墅区', value: 'gongshu' },
        ],
      },
      {
        label: '宁波市',
        value: 'ningbo',
      },
    ],
  },
  {
    label: '江苏省',
    value: 'jiangsu',
    children: [
      { label: '南京市', value: 'nanjing' },
      { label: '苏州市', value: 'suzhou' },
    ],
  },
])
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-cascader v-model="multipleValue" path-mode placeholder="级联多选" :options="options" multiple show-tags />
  </mp-space>
</template>
