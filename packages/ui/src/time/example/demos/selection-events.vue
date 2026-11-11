<script setup>
import { ref } from 'vue'

const value = ref('09:00')
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
  <mp-space direction="column" size="12px" style="width: 100%">
    <mp-checkbox v-model="readonly">只读：可聚焦，不可修改</mp-checkbox>
    <mp-checkbox v-model="disabled">禁用：释放焦点，不可修改</mp-checkbox>
    <mp-checkbox v-model="immediate">选择后立即提交</mp-checkbox>
    <p>select 记录草稿，change 记录提交；取消不改模型，清除返回 undefined。</p>
    <mp-time
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
    <mp-button variant="outline" @click="value = '15:30'">从外部替换模型</mp-button>
    <small>外部替换会更新反显，不触发 select 或 change。</small>
    <div v-for="(event, index) in events" :key="index" style="overflow-wrap: anywhere">{{ event }}</div>
  </mp-space>
</template>
