<script setup>
import { ref } from 'vue'

const value = ref('09:00')
const open = ref(false)
</script>

<template>
  <mp-space direction="column" size="12px" style="width: 100%">
    <p>Uncontrolled initial value</p>
    <mp-time :default-value="'09:00'" format="HH:mm" clearable />
    <p>Controlled value and visibility</p>
    <mp-time v-model="value" v-model:open="open" format="HH:mm" clearable />
    <span>{{ value }} / {{ open }}</span>
  </mp-space>
</template>
