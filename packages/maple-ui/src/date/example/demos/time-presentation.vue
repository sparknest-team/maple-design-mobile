<script setup>
import { ref } from 'vue'

const value = ref('2026-10-22 13:30')
</script>
<template>
  <mp-date-picker
    v-model="value"
    show-time
    :time-fields="['hour', 'minute']"
    format="YYYY-MM-DD HH:mm"
    value-format="YYYY-MM-DD HH:mm"
  />
  <mp-date-picker presentation="picker" :picker-props="{ optionHeight: 36, optionCount: 4 }" />
</template>
