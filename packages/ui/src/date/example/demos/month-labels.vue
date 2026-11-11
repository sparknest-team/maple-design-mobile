<script setup lang="ts">
import { ref } from 'vue'

const abbreviation = ref(true)
</script>

<template>
  <mp-checkbox v-model="abbreviation">月份缩写</mp-checkbox>
  <mp-date-picker
    type="month"
    picker-value="2025-01"
    :abbreviation="abbreviation"
    :disable-confirm="false"
    presentation="calendar"
  />
  <mp-date-range-picker
    :date-picker-props="{ hint: '设备预订', touchable: false }"
    type="month"
    :abbreviation="abbreviation"
    presentation="calendar"
  />
</template>
