<script setup>
import { ref } from 'vue'

const value = ref('09:30')
const immediate = ref(false)
const confirmations = ref(0)
const hideDisabled = ref(false)
const readonly = ref(false)
const disabledHours = () => [0, 1, 2, 3, 4, 5, 6, 7]
</script>

<template>
  <mp-space direction="column" size="12px" style="width: 100%">
    <mp-checkbox v-model="immediate">跳过确认，选择即提交</mp-checkbox>
    <mp-checkbox v-model="hideDisabled">隐藏禁用小时（00–07）</mp-checkbox>
    <mp-checkbox v-model="readonly">只读（包括确认）</mp-checkbox>
    <mp-button variant="outline" @click="value = '13:45'">外部更新为 13:45，覆盖未提交草稿</mp-button>
    <mp-time-picker
      v-model="value"
      format="HH:mm"
      :disable-confirm="immediate"
      :hide-disabled-options="hideDisabled"
      :readonly="readonly"
      :disabled-hours="disabledHours"
      @confirm="confirmations++"
    >
      <template #extra><p>附加说明使用同一个 extra 插槽。</p></template>
    </mp-time-picker>
    <span>有效确认次数: {{ confirmations }}</span>
    <span>已提交值: {{ value }}</span>
    <p>默认选择只修改草稿，点击确认后上方的已提交值才会更新。</p>
  </mp-space>
</template>
