<script setup>
import { ref } from 'vue'

const value = ref()
const formatValue = ref()
function formatter(value) {
  const values = value.split('.')
  values[0] = values[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  return values.join('.')
}
function parser(value) {
  return value.replace(/,/g, '')
}
</script>

<template>
  <div class="input-number-example">
    <mp-input-number
      v-model="formatValue"
      placeholder="Please Enter"
      :default-value="12000"
      :min="0"
      :formatter="formatter"
      :parser="parser"
    />
  </div>
</template>

<style lang="less">
.input-number-example {
  display: flex;
  flex-direction: column;
  gap: 12px;

  .mp-input-number {
    width: 320px;
    max-width: 100%;
  }

  &__value {
    color: var(--mp-field-color-text);
    font-size: 14px;
  }
}
</style>
