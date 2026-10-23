<script setup lang="ts">
import { ref } from 'vue'

const value = ref<string[]>(['dev'])
const selectedSlot = ref(false)
const triggerSlot = ref(false)
const clears = ref(0)
const options = [
  { value: 'dev', label: '研发' },
  { value: 'design', label: '设计' },
  { value: 'ops', label: '运营', disabled: true },
]
function onClear(clear: (event: MouseEvent) => void, event: MouseEvent) {
  clears.value++
  clear(event)
}
</script>
<template>
  <mp-space direction="column">
    <mp-space>
      <mp-checkbox v-model="selectedSlot">自定义已选区</mp-checkbox>
      <mp-checkbox v-model="triggerSlot">自定义触发器</mp-checkbox>
    </mp-space>
    <mp-select
      v-model="value"
      :options="options"
      multiple
      filterable
      clearable
      placeholder="复杂插槽审查"
      :style="{ width: '320px' }"
    >
      <template #prefix><mp-tag>前缀</mp-tag></template>
      <template #suffix><mp-tag>后缀</mp-tag></template>
      <template #header><mp-tag>菜单页头</mp-tag></template>
      <template #footer><mp-tag>菜单页脚</mp-tag></template>
      <template #option="{ data }"
        ><mp-tag>选项：{{ data.label }}</mp-tag></template
      >
      <template #label="{ data }"
        ><mp-tag>已选：{{ data.label }}</mp-tag></template
      >
      <template #clear-icon="{ clear }"
        ><mp-button size="xs" @mousedown.prevent @click.stop="onClear(clear, $event)">插槽清空</mp-button></template
      >
      <template #arrow-icon><mp-tag>展开</mp-tag></template>
      <template #search-icon><mp-tag>搜索</mp-tag></template>
      <template #loading-icon><mp-tag>加载</mp-tag></template>
      <template #empty><mp-tag>无匹配选项</mp-tag></template>
      <template #read="{ text }"
        ><mp-tag>阅读：{{ text }}</mp-tag></template
      >
      <template v-if="selectedSlot" #selected
        ><mp-tag>已选区域：{{ value.join(' / ') }}</mp-tag></template
      >
      <template v-if="triggerSlot" #trigger><mp-button>插槽打开选择器</mp-button></template>
    </mp-select>
    <p role="status">当前值：{{ JSON.stringify(value) }}；插槽清空：{{ clears }}</p>
  </mp-space>
</template>
