<script setup>
import { ref } from 'vue'

const control = ref()
const value = ref(false)
const selected = ref([0])
</script>
<template>
  <mp-space direction="column">
    <p>布尔模型始终返回布尔值；数组模型用 value 标识选项。 当前值：{{ value }}</p>
    <mp-checkbox ref="control" v-model="value">启用通知</mp-checkbox>
    <mp-space wrap>
      <mp-button size="sm" @click="control?.toggle()">切换选择</mp-button>
      <mp-button size="sm" @click="control?.focus()">聚焦</mp-button>
      <mp-button size="sm" @click="value = false">重置</mp-button>
    </mp-space>
    <p>数组模型：{{ selected }}</p>
    <mp-checkbox v-model="selected" :value="0">数值 0</mp-checkbox>
    <mp-checkbox v-model="selected" :value="false">布尔 false</mp-checkbox>
    <p>只读允许聚焦，禁用不允许操作；Enter/空格只影响当前控件。</p>
    <mp-checkbox :default-value="true" readonly>只读</mp-checkbox>
    <mp-checkbox :default-value="true" disabled>禁用</mp-checkbox>
  </mp-space>
</template>
