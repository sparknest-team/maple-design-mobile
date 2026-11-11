<script setup lang="ts">
import { h, ref } from 'vue'

const value = ref<string | number | boolean | null>(null)
const fields = { value: 'id', label: 'name', disabled: 'unavailable', readonly: 'locked' }
const options = ref([
  { id: false, name: '布尔 false' },
  { id: 0, name: '数字 0' },
  { id: '', name: '空字符串' },
  { id: 'locked', name: '只读选项', locked: true },
  { id: 'disabled', name: '禁用选项', unavailable: true },
])
const renderOptions = [
  { value: 'render', label: (_data: unknown, checked: boolean) => h('strong', checked ? '已选择' : '渲染函数标签') },
]
</script>

<template>
  <section class="option-demo">
    <p>字段映射与标签插槽；只读可聚焦，禁用不可操作。</p>
    <mp-radio-group v-model="value" :options="options" :field-names="fields" orientation="vertical">
      <template #label="{ data, checked }">{{ data.label }} {{ checked ? '✓' : '' }}</template>
    </mp-radio-group>
    <p>当前值：{{ JSON.stringify(value) }}</p>
    <mp-button @click="value = null">清空</mp-button>
    <p>标签也支持渲染函数；不传 options 时使用默认插槽，传入 [] 时保持空组。</p>
    <mp-radio-group :options="renderOptions" />
  </section>
</template>

<style scoped>
.option-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.option-demo p {
  margin: 0;
}
</style>
