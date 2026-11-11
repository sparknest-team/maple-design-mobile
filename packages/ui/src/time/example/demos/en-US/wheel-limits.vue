<script setup>
import { ref } from 'vue'

const value = ref('10:30:40')
const locked = ref(false)
const disabledHours = () => (locked.value ? Array.from({ length: 24 }, (_, hour) => hour) : [])
const disabledMinutes = (hour) => (hour === 10 ? [45] : [])
const disabledSeconds = (hour, minute) => (hour === 10 && minute === 30 ? [41, 43, 45] : [])
</script>

<template>
  <mp-space direction="column" :size="12" style="width: 100%">
    <p>
      Inclusive 10:30:38–11:30:02. Change the hour to see dependent minutes and seconds; blocking all hours prevents
      confirmation.
    </p>
    <mp-button @click="locked = !locked">{{ locked ? 'Restore choices' : 'Block all hours' }}</mp-button>
    <mp-time
      v-model="value"
      format="HH:mm:ss"
      panel-type="picker"
      min="10:30:38"
      max="11:30:02"
      :disabled-hours="disabledHours"
      :disabled-minutes="disabledMinutes"
      :disabled-seconds="disabledSeconds"
    />
    <span>{{ value }}</span>
  </mp-space>
</template>
