<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(true)
</script>
<template>
  <div class="checkbox-custom-demo">
    <mp-checkbox v-model="checked" :icon-size="28" checked-color="#137547" unchecked-color="#656565"
      >Pixel size and instance colors</mp-checkbox
    >
    <mp-checkbox icon-size="1.5rem" :ripple="false">CSS length without ripple</mp-checkbox>
    <mp-checkbox v-model="checked">
      <template #checked-icon><span class="checkbox-custom-icon" aria-hidden="true">✓</span></template>
      <template #unchecked-icon><span class="checkbox-custom-icon" aria-hidden="true">○</span></template>
      Custom icons retain native keyboard and accessibility semantics
    </mp-checkbox>
    <mp-checkbox-group
      :default-value="['a']"
      :options="[
        { label: 'Plan A', value: 'a' },
        { label: 'Plan B', value: 'b' },
      ]"
    >
      <template #checkbox="{ checked: selected }"
        ><span class="checkbox-custom-icon">{{ selected ? '✓' : '○' }}</span></template
      >
    </mp-checkbox-group>
  </div>
</template>
<style scoped>
.checkbox-custom-demo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}
.checkbox-custom-icon {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  border: 1px solid currentColor;
  border-radius: 4px;
}
</style>
