<script setup>
import { ref } from 'vue'

const options = ['info', 'success', 'warning', 'danger', 'default'].map((value) => ({ label: value, value }))
const type = ref('info')
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-select v-model="type" variant="outline" size="sm" :options="options" />
    <mp-alert
      closable
      title="傲慢与偏见"
      message="我也说不准是在什么时间，什么地点，看见你的什么神情，听见你的什么言语，便开始爱上了你。"
      :status="type"
    />
    <mp-alert
      closable
      variant="tonal"
      title="傲慢与偏见"
      message="我也说不准是在什么时间，什么地点，看见你的什么神情，听见你的什么言语，便开始爱上了你。"
      :status="type"
    />
    <mp-alert
      closable
      variant="outline"
      title="傲慢与偏见"
      message="我也说不准是在什么时间，什么地点，看见你的什么神情，听见你的什么言语，便开始爱上了你。"
      :status="type"
    />
  </mp-space>
</template>
