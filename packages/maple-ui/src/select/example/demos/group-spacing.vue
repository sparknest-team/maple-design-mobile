<script setup lang="ts">
const options = [
  {
    isGroup: true,
    label: '华北',
    options: [
      { value: 'beijing', label: '北京' },
      { value: 'tianjin', label: '天津' },
    ],
  },
  {
    isGroup: true,
    label: '华东',
    options: [
      { value: 'shanghai', label: '上海' },
      { value: 'hangzhou', label: '杭州' },
    ],
  },
]
</script>

<template>
  <mp-select :options="options" placeholder="分组候选" :style="{ width: '280px' }" />
</template>
