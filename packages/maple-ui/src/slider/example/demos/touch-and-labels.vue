<script setup>
import { ref } from 'vue'

const value = ref(45)
</script>
<template>
  <div style="display: grid; gap: 36px; padding: 32px 12px">
    <mp-slider v-model="value" show-tooltip="always" aria-label="Always visible" />
    <mp-slider
      v-model="value"
      :show-tooltip="false"
      active-color="#722ed1"
      thumb-color="#f4edff"
      :track-height="8"
      :thumb-size="24"
      aria-label="Custom size"
    />
    <mp-slider v-model="value" aria-label="Custom handle"
      ><template #button="{ currentValue }"
        ><span class="slider-custom-handle">{{ currentValue }}</span></template
      ></mp-slider
    >
  </div>
</template>
<style scoped>
.slider-custom-handle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: 1px solid currentColor;
  border-radius: 50%;
  background: white;
  transform: translate(-6px, -6px);
}
</style>
