<script setup>
import { ref } from 'vue'

const control = ref()
const value = ref(null)
</script>
<template>
  <mp-space direction="vertical">
    <p>null 表示未选中；重复选择不会取消。 当前值：{{ value }}</p>
    <mp-radio ref="control" v-model="value" :value="false">选择 false 选项</mp-radio>
    <mp-space>
      <mp-button size="sm" @click="control?.select()">选中</mp-button>
      <mp-button size="sm" @click="control?.focus()">聚焦</mp-button>
      <mp-button size="sm" @click="value = null">重置</mp-button>
    </mp-space>

    <p>只读允许聚焦，禁用不允许操作；Enter/空格只影响当前控件。</p>
    <mp-radio :default-value="true" readonly>只读</mp-radio>
    <mp-radio :default-value="true" disabled>禁用</mp-radio>
  </mp-space>
</template>
