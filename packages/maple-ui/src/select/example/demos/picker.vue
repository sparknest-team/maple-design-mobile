<script setup>
import { computed, ref } from 'vue'

const pickerValue = ref()
const pickerValue2 = ref()
const pickerMultiple = ref([])
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
const keyOptions = computed(() => [
  {
    name: '吃饭',
    id: 1,
  },
  {
    name: '睡觉',
    id: 2,
  },
  {
    name: '打游戏',
    id: 3,
    disabled: true,
  },
])
</script>

<template>
  <mp-space direction="column" :size="['3vmin', 0]">
    <mp-select v-model="pickerValue" presentation="picker" placeholder="请选择一个选项" :options="options" />
    <mp-select
      v-model="pickerValue2"
      presentation="picker"
      placeholder="自定义字段"
      :options="keyOptions"
      :field-names="{ label: 'name', value: 'id' }"
    />
    <mp-select
      v-model="pickerMultiple"
      presentation="picker"
      multiple
      show-tags
      clearable
      placeholder="Picker 多选"
      :options="options"
    />
  </mp-space>
</template>

<style lang="less" scoped>
.space {
  height: 200px;
}

.selected-icon {
  margin-right: 6px;
}

.prefix {
  margin-right: 6px;
}

.suffix {
  margin-left: 6px;
}

.arrow-icon-rotate {
  transform: rotate(180deg);
}
</style>
