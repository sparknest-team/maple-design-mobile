<script setup>
import { ref } from 'vue'

const basicValue = ref('')
const clearableValue = ref('Maple Design')
</script>

<template>
  <mp-space direction="column" :size="[12, 0]">
    <mp-input v-model="basicValue" placeholder="Enter content" />
    <mp-input v-model="clearableValue" clearable placeholder="Clearable text" />
    <div class="input-example__value">Current value：{{ basicValue || '-' }}</div>
  </mp-space>
</template>

<style lang="less" scoped>
.input-example {
  &__caption,
  &__value {
    color: var(--mp-field-blur-color);
    font-size: 12px;
  }

  &__caption {
    margin: 16px 0 8px;
  }

  &__bottom-space {
    height: 40px;
  }
}
</style>
