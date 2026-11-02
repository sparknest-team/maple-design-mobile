<template>
  <mp-space direction="column" align="stretch">
    <mp-radio-group
      v-model="target"
      :options="[
        { label: '整个字段', value: 'field' },
        { label: '仅右侧图标', value: 'icon' },
      ]"
    />
    <label><mp-switch v-model="editable" /> 允许编辑 / 搜索</label>
    <mp-form-item layout="vertical" hide-label>
      <mp-select
        v-model="value"
        edit-mode="direct"
        :open-trigger-target="target"
        :filterable="editable"
        :options="[
          { value: 'a', label: 'Alpha' },
          { value: 'b', label: 'Beta' },
        ]"
      />
    </mp-form-item>
    <p>关闭编辑后，可以复制已有文本；仅图标模式下编辑不会展开。</p>
  </mp-space>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const target = ref<'field' | 'icon'>('icon')
const editable = ref(true)
const value = ref('a')
</script>
