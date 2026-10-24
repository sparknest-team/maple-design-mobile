<script setup lang="ts">
import { ref } from 'vue'
import type { CheckboxGroupInstance } from '@maple-design/ui'

const group = ref<CheckboxGroupInstance>()
const value = ref<Array<string | number | boolean>>(['remote', 'locked', 'a'])
const reverse = ref(false)
const proposal = ref<Array<string | number | boolean>>([])
const options = [
  { value: 'a', label: '任务 A' },
  { value: 'b', label: '任务 B' },
  { value: 'c', label: '任务 C' },
  { value: 'locked', label: '只读，保留选择', readonly: true },
  { value: 'disabled', label: '禁用，不参与操作', disabled: true },
]
</script>

<template>
  <section class="group-methods-demo">
    <p>最多选择 4 项（包含未加载的 remote）。全选/反选保留只读和未加载的已选值。</p>
    <mp-checkbox-group
      ref="group"
      v-model="value"
      :options="reverse ? [...options].reverse() : options"
      :max="4"
      direction="vertical"
    />
    <mp-space wrap>
      <mp-button @click="proposal = group?.checkAll() ?? []">全选</mp-button>
      <mp-button @click="proposal = group?.inverseAll() ?? []">反选</mp-button>
      <mp-button @click="reverse = !reverse">调整选项顺序</mp-button>
    </mp-space>
    <p>当前值：{{ JSON.stringify(value) }}</p>
    <p>方法返回值：{{ JSON.stringify(proposal) }}</p>
  </section>
</template>

<style scoped>
.group-methods-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.group-methods-demo p {
  margin: 0;
}
</style>
