<script setup lang="ts">
import { ref } from 'vue'

const busy = ref(true)
const value = ref('beijing')
const selected = ref(['beijing'])
const options = [
  { label: '北京 / Beijing', value: 'beijing' },
  { label: '上海 / Shanghai', value: 'shanghai' },
  { label: '广州 / Guangzhou', value: 'guangzhou' },
]
</script>
<template>
  <mp-space direction="column" :size="16" style="width: 100%">
    <mp-form layout="vertical">
      <mp-form-item label="加载状态 / Loading"><mp-switch v-model="busy" /></mp-form-item>
      <mp-form-item label="默认指示器 / Default"
        ><mp-select v-model="value" :loading="busy" :options="options" edit-mode="direct" loading-mode="default"
      /></mp-form-item>
      <mp-form-item label="底部加载线 / Line"
        ><mp-select v-model="value" :loading="busy" :options="options" edit-mode="direct" loading-mode="line"
      /></mp-form-item>
      <mp-form-item label="多选动作 / Multiple actions"
        ><mp-select
          v-model="selected"
          :loading="busy"
          :options="options"
          multiple
          clearable
          filterable
          edit-mode="direct"
      /></mp-form-item>
    </mp-form>
    <p>
      加载时保留选择，暂停选择、清空和移除；搜索仍可输入，关闭加载后恢复。Loading pauses selection, clearing and removal
      while search remains editable.
    </p>
  </mp-space>
</template>
