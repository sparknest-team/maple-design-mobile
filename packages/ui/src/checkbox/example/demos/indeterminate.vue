<script setup>
import { computed, ref } from 'vue'

const selected = ref(['a'])
const all = computed({
  get: () => selected.value.length === 2,
  set: (value) => {
    selected.value = value ? ['a', 'b'] : []
  },
})
const indeterminate = computed(() => selected.value.length > 0 && selected.value.length < 2)
</script>
<template>
  <mp-space direction="column">
    <mp-checkbox v-model="all" :indeterminate="indeterminate">全选（半选状态由业务值计算）</mp-checkbox>
    <mp-checkbox-group
      v-model="selected"
      :options="[
        { label: '设备 A', value: 'a' },
        { label: '设备 B', value: 'b' },
      ]"
    />
  </mp-space>
</template>
