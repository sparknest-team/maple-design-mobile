<script setup lang="ts">
import { ref } from 'vue'

const presentation = ref<'menu' | 'list' | 'picker'>('menu')
const value = ref([2])
const options = ref<{ id: number; name: string; disabled?: boolean }[]>([])
const loading = ref(false)
async function load() {
  loading.value = true
  try {
    options.value = await Promise.resolve(
      Array.from({ length: 200 }, (_, index) => ({
        id: index + 1,
        name: `设备 ${index + 1}`,
        disabled: index === 3,
      })),
    )
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
    <mp-button @click="load">加载设备列表</mp-button>
    <mp-select
      v-model="value"
      :presentation="presentation"
      :options="options"
      :loading="loading"
      :field-names="{ label: 'name', value: 'id' }"
      :virtual-list-props="{ height: 180 }"
      :limit="3"
      multiple
      filterable
      clearable
      placeholder="最多选择三个设备"
    />
    <p>已提交 ID：{{ value }}。加载前显示 ID，加载后自动回显名称。</p>
  </mp-space>
</template>
