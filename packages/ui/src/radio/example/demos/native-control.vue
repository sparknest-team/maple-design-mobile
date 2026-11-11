<script setup lang="ts">
import { ref } from 'vue'

const value = ref<string | number | boolean | null>('email')
</script>
<template>
  <section class="native-radio-demo">
    <p>图标与原生 input 属性</p>
    <mp-radio-group v-model="value" name="channel" aria-label="通知方式">
      <mp-radio value="email" :icon-size="24" checked-color="rebeccapurple" :input-attrs="{ id: 'radio-email' }">
        <template #checked-icon><span aria-hidden="true">●</span></template>
        <template #unchecked-icon><span aria-hidden="true">○</span></template>
        邮件
      </mp-radio>
      <mp-radio value="sms">短信</mp-radio>
      <mp-radio value="readonly" readonly>只读</mp-radio>
    </mp-radio-group>
    <p>当前值：{{ value }}</p>
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
