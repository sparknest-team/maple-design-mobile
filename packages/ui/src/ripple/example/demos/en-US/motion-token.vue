<script setup></script>

<template>
  <div v-ripple role="button" tabindex="0" class="ripple-motion-demo">
    600ms expansion / 800ms fading — Enter or Space
  </div>
</template>

<style scoped>
.ripple-motion-demo {
  --mp-ripple-expand-duration: 600ms;
  --mp-ripple-fade-duration: 800ms;
  position: relative;
  max-width: 100%;
  height: auto;
  white-space: normal;
  overflow: hidden;
  padding: 16px;
  color: var(--mp-sys-color-content-primary);
  background: var(--mp-sys-color-surface-default);
  border: 1px solid var(--mp-sys-color-border-default);
}
</style>
