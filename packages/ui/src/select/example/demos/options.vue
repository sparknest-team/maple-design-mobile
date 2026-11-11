<script setup>
import { computed, ref } from 'vue'

const outlineValue14 = ref()
const outlineValue15 = ref([])
const options = computed(() => [
  {
    label: '吃饭',
    value: 1,
  },
  {
    label: '睡觉',
    value: 2,
  },
  {
    label: '打游戏',
    value: 3,
    disabled: true,
  },
])
</script>

<template>
  <mp-space direction="column" :size="16">
    <mp-select v-model="outlineValue14" variant="outline" placeholder="选项式 API" :options="options" />
    <mp-select
      v-model="outlineValue15"
      variant="outline"
      placeholder="选项式 API（多选）"
      :options="options"
      multiple
    />
  </mp-space>
</template>
