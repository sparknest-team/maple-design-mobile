<script setup>
import { ref } from 'vue'

const value = ref('remote')
const options = ref([])
async function load() {
  options.value = await Promise.resolve([
    { label: '异步设备', value: 'remote' },
    { label: '设备 A', value: 'a' },
    { label: '停用设备', value: 'locked', disabled: true },
  ])
}
</script>

<template>
  <mp-space direction="column">
    <p>业务值独立于当前选项，加载或移除选项不会清空已选值：{{ value }}</p>
    <mp-space>
      <mp-button size="sm" @click="load">加载选项</mp-button>
      <mp-button size="sm" @click="options = []">移除选项</mp-button>
    </mp-space>
    <mp-radio-group v-model="value" :options="options" />
  </mp-space>
</template>
