<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { CascaderOption } from '../../types'

const value = ref<string | number | (string | number)[] | (string | number)[][]>()
const multiple = ref(false)
const pathMode = ref(false)
const empty = ref(false)
const loads = ref(0)
const options = computed(() =>
  empty.value
    ? []
    : [
        {
          value: 'frontend',
          label: '前端',
          children: [
            { value: 'vue', label: 'Vue', isLeaf: true },
            { value: 'react', label: 'React', isLeaf: true },
          ],
        },
        { value: 'backend', label: '后端', children: [{ value: 'node', label: 'Node.js', isLeaf: true }] },
        { value: 'lazy', label: '异步节点', isLeaf: false },
      ],
)
watch([multiple, pathMode], () => {
  value.value = multiple.value ? [] : undefined
})
function loadMore(option: CascaderOption, done: (children: CascaderOption[]) => void) {
  loads.value++
  done([{ value: `${option.value}-child`, label: '异步子节点', isLeaf: true }])
}
</script>
<template>
  <mp-space direction="column">
    <mp-space>
      <mp-checkbox v-model="multiple">面板多选</mp-checkbox>
      <mp-checkbox v-model="pathMode">完整路径</mp-checkbox>
      <mp-checkbox v-model="empty">空数据</mp-checkbox>
      <mp-button @click="value = multiple ? [] : undefined">清空面板选择</mp-button>
    </mp-space>
    <mp-cascader-panel
      v-model="value"
      :options="options"
      :multiple="multiple"
      :path-mode="pathMode"
      :load-more="loadMore"
    >
      <template #empty><mp-tag>子面板空状态</mp-tag></template>
    </mp-cascader-panel>
    <p role="status">面板值：{{ JSON.stringify(value) }}；加载回调：{{ loads }}</p>
  </mp-space>
</template>
