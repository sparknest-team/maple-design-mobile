<script setup>
import { ref } from 'vue'

const value = ref(['09:30', '18:00'])
const immediate = ref(false)
const readonly = ref(false)
const confirmations = ref(0)
const hideDisabled = ref(false)
const presentation = ref('picker')
const disabledHours = () => [0, 1, 2, 3, 4, 5, 6, 7]
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px; width: 100%">
    <label><input v-model="immediate" type="checkbox" /> 跳过确认，选择即提交</label>
    <label><input v-model="hideDisabled" type="checkbox" /> 隐藏禁用小时（00–07）</label>
    <label
      >展示方式
      <select v-model="presentation">
        <option value="picker">滚轮</option>
        <option value="clock">时钟</option>
      </select></label
    >
    <label><input v-model="readonly" type="checkbox" /> 只读（草稿不可提交）</label>
    <mp-button variant="outline" @click="value = ['11:00', '20:00']">外部替换模型</mp-button>
    <mp-time-range-picker
      v-model="value"
      format="HH:mm"
      :disable-confirm="immediate"
      :readonly="readonly"
      :hide-disabled-options="hideDisabled"
      :disabled-hours="disabledHours"
      :presentation="presentation"
      @confirm="confirmations++"
    >
      <template #extra><p>切换展示方式保留草稿；附加说明使用同一个 extra 插槽。</p></template>
    </mp-time-range-picker>
    <span>有效确认次数: {{ confirmations }}</span>
    <span>已提交值: {{ value }}</span>
    <p>默认选择只修改草稿，点击确认后上方的已提交值才会更新。</p>
  </div>
</template>
