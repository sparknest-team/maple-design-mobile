<script setup>
import { ref } from 'vue'

const value = ref(['09:00', '18:00'])
const immediate = ref(false)
const readonly = ref(false)
const disabled = ref(false)
const events = ref([])
function record(name, value, dates) {
  const times = Array.isArray(dates) ? dates.map((date) => date?.toLocaleTimeString()) : dates?.toLocaleTimeString()
  events.value = [JSON.stringify({ event: name, value: value ?? null, time: times ?? null }), ...events.value].slice(
    0,
    5,
  )
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px; width: 100%">
    <label><input v-model="readonly" type="checkbox" /> 只读：可聚焦，不可修改</label>
    <label><input v-model="disabled" type="checkbox" /> 禁用：释放焦点，不可修改</label>
    <label><input v-model="immediate" type="checkbox" /> 选择后立即提交</label>
    <p>select 记录草稿，change 记录提交；取消不改模型，清除返回 undefined。</p>
    <mp-time-range
      v-model="value"
      :disable-confirm="immediate"
      :readonly="readonly"
      :disabled="disabled"
      format="HH:mm"
      clearable
      @select="(value, dates) => record('select', value, dates)"
      @change="(value, dates) => record('change', value, dates)"
      @clear="record('clear')"
      @click="record('click')"
      @open-change="(open) => record('open-change', open)"
      @focus="record('focus')"
      @blur="record('blur')"
    />
    <span>模型: {{ value === undefined ? 'undefined' : value }}</span>
    <mp-button variant="outline" @click="value = ['15:30', '18:00']">从外部替换模型</mp-button>
    <small>外部替换会更新反显，不触发 select 或 change。</small>
    <div v-for="(event, index) in events" :key="index" style="overflow-wrap: anywhere">{{ event }}</div>
  </div>
</template>
