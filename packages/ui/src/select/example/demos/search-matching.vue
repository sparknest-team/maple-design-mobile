<script setup lang="ts">
import { computed, ref } from 'vue'

const value = ref('')
const mode = ref('label')
const caseSensitive = ref(false)
const modes = [
  { value: 'label', label: '默认：只匹配 label' },
  { value: 'both', label: '配置：value 或 label' },
]
const options = [
  { value: 'USER_A', label: 'Apple' },
  { value: 'USER_B', label: 'Banana' },
]
const searchFields = computed<('label' | 'value')[]>(() => (mode.value === 'both' ? ['value', 'label'] : ['label']))
</script>
<template>
  <mp-space direction="column" align="stretch" fill>
    <mp-form-item layout="vertical" size="sm" label="匹配字段">
      <mp-radio-group v-model="mode" aria-label="匹配字段" :options="modes" variant="button" size="sm" />
    </mp-form-item>
    <mp-space><mp-switch v-model="caseSensitive" /><span>区分大小写</span></mp-space>
    <mp-select
      v-model="value"
      :options="options"
      :case-sensitive="caseSensitive"
      :search-fields="searchFields"
      :search-delay="0"
      filterable
      placeholder="输入 Apple、apple 或 USER_A"
    />
    <p>默认搜索 label，不区分大小写；配置两字段后，USER_A 和 Apple 都能找到同一个选项。</p>
  </mp-space>
</template>
