<script setup lang="ts">
import { ref } from 'vue'

const presentation = ref<'menu' | 'list' | 'picker'>('menu')
const value = ref(['factory', 'device-2'])
const options = ref<Record<string, unknown>[]>([])
const loading = ref(false)
async function load() {
  loading.value = true
  try {
    options.value = await Promise.resolve([
      {
        id: 'factory',
        name: '工厂',
        nodes: [
          { id: 'device-1', name: '设备一' },
          { id: 'device-2', name: '设备二' },
          { id: 'device-3', name: '检修设备', disabled: true },
        ],
      },
    ])
  } finally {
    loading.value = false
  }
}
</script>
<template>
  <mp-space direction="column" :size="16">
    <label
      >展示方式
      <select v-model="presentation">
        <option>menu</option>
        <option>list</option>
        <option>picker</option>
      </select>
    </label>
    <mp-button @click="load">加载设备树</mp-button>
    <mp-cascader
      v-model="value"
      :presentation="presentation"
      :options="options"
      :loading="loading"
      path-mode
      filterable
      clearable
      :field-names="{ label: 'name', value: 'id', children: 'nodes' }"
      placeholder="选择设备路径"
    />
    <p>已提交路径：{{ value }}。标签与 ID 分离，异步加载后自动回显。</p>
  </mp-space>
</template>
