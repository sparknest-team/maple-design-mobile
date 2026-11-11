<script setup lang="ts">
import { ref } from 'vue'

const value = ref<string | number | boolean | null>('email')
</script>
<template>
  <section class="native-radio-demo">
    <p>Icons and native input attributes</p>
    <mp-radio-group v-model="value" name="channel" aria-label="Notification channel">
      <mp-radio value="email" :icon-size="24" checked-color="rebeccapurple" :input-attrs="{ id: 'radio-email' }">
        <template #checked-icon><span aria-hidden="true">●</span></template>
        <template #unchecked-icon><span aria-hidden="true">○</span></template>
        Email
      </mp-radio>
      <mp-radio value="sms">SMS</mp-radio>
      <mp-radio value="readonly" readonly>Readonly</mp-radio>
    </mp-radio-group>
    <p>Current value：{{ value }}</p>
  </section>
</template>
<style scoped>
.native-radio-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.native-radio-demo p {
  margin: 0;
}
</style>
