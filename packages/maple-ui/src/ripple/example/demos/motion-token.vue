<script setup>
defineProps({ english: Boolean })
</script>

<template>
  <button v-ripple class="ripple-motion-demo">
    {{ english ? '600ms expansion / 800ms fading — Enter or Space' : '600ms 扩散／800ms 消退 — Enter 或 Space' }}
  </button>
</template>

<style scoped>
.ripple-motion-demo {
  --mp-ripple-expand-duration: 600ms;
  --mp-ripple-fade-duration: 800ms;
  position: relative;
  overflow: hidden;
  padding: 16px;
  color: var(--mp-sys-color-action-primary);
  background: var(--mp-sys-color-surface-default);
  border: 1px solid var(--mp-sys-color-border-default);
}
</style>
