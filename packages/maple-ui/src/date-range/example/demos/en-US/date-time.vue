<script setup>
import { reactive, ref } from 'vue'

const range = ref([])
const dateTimeRange = ref([])
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-date-range
      v-model="dateTimeRange"
      show-time
      :time-fields="['hour', 'minute']"
      format="YYYY-MM-DD HH:mm"
      value-format="YYYY-MM-DD HH:mm"
      placeholder="Select date and time range"
      clearable
    />
  </mp-space>
</template>
