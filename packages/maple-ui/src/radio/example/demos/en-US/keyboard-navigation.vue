<script setup lang="ts">
import { ref } from 'vue'

const value = ref<string | number | boolean | null>('email')
const options = [
  { label: 'Email', value: 'email' },
  { label: 'Readonly', value: 'locked', readonly: true },
  { label: 'Disabled', value: 'disabled', disabled: true },
  { label: 'SMS', value: 'sms' },
]
</script>
<template>
  <section class="radio-demo">
    <p>
      Tab enters the group. Arrow keys cycle; Home / End focus the first / last item. Readonly items receive focus
      without changing the value.
    </p>
    <mp-radio-group v-model="value" :options="options" aria-label="Notification channel" />
    <p>Current value：{{ value }}</p>
    <mp-button @click="value = null">Clear</mp-button>
  </section>
</template>
<style scoped>
.radio-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.radio-demo p {
  margin: 0;
}
</style>
