<script setup lang="ts">
import { ref } from 'vue'

const abbreviation = ref(true)
</script>

<template>
  <mp-checkbox v-model="abbreviation">Abbreviated month labels</mp-checkbox>
  <mp-date-picker
    type="month"
    picker-value="2025-01"
    :abbreviation="abbreviation"
    :disable-confirm="false"
    presentation="calendar"
  />
  <mp-date-range-picker
    :date-picker-props="{ hint: 'Device reservation', touchable: false }"
    type="month"
    :abbreviation="abbreviation"
    presentation="calendar"
  />
</template>
