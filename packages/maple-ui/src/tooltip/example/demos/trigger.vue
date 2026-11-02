<script setup>
import { ref } from 'vue'

const trigger = ref('click')
</script>

<template>
  <mp-form-item layout="vertical" size="sm" label="trigger">
    <mp-radio-group
      v-model="trigger"
      aria-label="trigger"
      :options="[
        { label: 'click', value: 'click' },
        { label: 'hover', value: 'hover' },
      ]"
      variant="button"
      size="sm"
    />
  </mp-form-item>
  <mp-tooltip content="Tooltip" style="margin-top: 15px" :trigger="trigger">
    <mp-button status="primary">触发方式</mp-button>
  </mp-tooltip>
</template>

<style lang="less" scoped>
.placement-container {
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
