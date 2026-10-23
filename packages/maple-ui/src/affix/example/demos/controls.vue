<script setup lang="ts">
import { nextTick, ref } from 'vue'

const containerRef = ref<HTMLElement>()
const affixRef = ref<{ updatePosition: () => Promise<void> }>()
const disabled = ref(false)
const cssMode = ref(false)
const spacerHeight = ref(40)
const updates = ref(0)
async function updateLayout() {
  spacerHeight.value = spacerHeight.value === 40 ? 100 : 40
  await nextTick()
  await affixRef.value?.updatePosition()
  updates.value++
}
</script>

<template>
  <div style="display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 12px">
    <mp-checkbox v-model="disabled">Disabled</mp-checkbox>
    <mp-checkbox v-model="cssMode">CSS sticky</mp-checkbox>
    <mp-button @click="updateLayout">Change layout and update position</mp-button>
  </div>
  <p aria-live="polite">Position updates: {{ updates }}</p>
  <div ref="containerRef" class="scroller">
    <div class="scroll-content">
      <div :style="{ height: `${spacerHeight}px` }"></div>
      <mp-affix
        ref="affixRef"
        :target="containerRef"
        :disabled="disabled"
        :css-mode="cssMode"
        :offset-top="12"
        :z-index="2"
      >
        <mp-button status="primary">Scroll to pin</mp-button>
      </mp-affix>
    </div>
  </div>
</template>

<style scoped>
.scroller {
  height: 200px;
  overflow: auto;
  border: 1px solid currentColor;
}
.scroll-content {
  min-height: 600px;
  padding: 16px;
}
</style>
