<script setup lang="ts">
import { ref } from 'vue'

const bottom = ref(24)
const consume = ref(true)
</script>

<template>
  <section class="safe-area-basic" aria-label="Bottom safe area and nesting">
    <div class="safe-area-basic__controls">
      <label
        >Bottom inset (CSS px)<mp-input-number v-model="bottom" :min="0" :max="80" aria-label="Bottom inset"
      /></label>
      <mp-checkbox v-model="consume">Prevent duplicate nested padding</mp-checkbox>
    </div>
    <p>Stripes show safe-area padding. Set the inset to zero or disable nested protection to compare.</p>
    <mp-safe-area class="safe-area-basic__outer" :edges="['bottom']" :insets="{ bottom }" :consume="consume">
      <div class="safe-area-basic__content">
        <p>Page content</p>
        <mp-safe-area class="safe-area-basic__nested" :edges="['bottom']">
          <div class="safe-area-basic__action"><mp-button status="primary" block>Bottom actions</mp-button></div>
        </mp-safe-area>
      </div>
    </mp-safe-area>
    <p role="status">Outer {{ bottom }}px · Nested {{ consume ? 0 : bottom }}px</p>
  </section>
</template>

<style scoped>
.safe-area-basic__controls {
  display: grid;
  gap: 12px;
}
.safe-area-basic__inset-label {
  display: grid;
  gap: 8px;
}
.safe-area-basic__outer,
.safe-area-basic__nested {
  background: repeating-linear-gradient(
    135deg,
    var(--mp-sys-color-surface-muted) 0 6px,
    var(--mp-sys-color-border-default) 6px 12px
  );
}
.safe-area-basic__outer {
  border: 1px solid var(--mp-sys-color-border-default);
  border-radius: var(--mp-sys-radius-md);
  overflow: hidden;
}
.safe-area-basic__content > p,
.safe-area-basic__action {
  margin: 0;
  padding: 16px;
  background: var(--mp-sys-color-surface-default);
}
</style>
