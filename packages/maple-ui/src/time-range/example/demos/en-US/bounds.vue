<script setup>
import { ref } from 'vue'

const value = ref(['10:30:38', '10:31:02'])
const narrow = ref(false)
</script>

<template>
  <mp-space direction="column" :size="12" style="width: 100%">
    <p>
      Inclusive bounds: 10:30:38–10:31:02. Narrowing the bounds preserves the current model but prevents invalid
      confirmation.
    </p>
    <label><input v-model="narrow" type="checkbox" /> Move minimum to 10:30:40</label>
    <mp-time-range v-model="value" format="HH:mm:ss" :min="narrow ? '10:30:40' : '10:30:38'" max="10:31:02" />
    <mp-time-range-picker v-model="value" format="HH:mm:ss" :min="narrow ? '10:30:40' : '10:30:38'" max="10:31:02" />
    <span>{{ value }}</span>
  </mp-space>
</template>
