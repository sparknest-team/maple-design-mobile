<script setup lang="ts">
import { ref } from 'vue'

const bottom = ref(24)
const consume = ref(true)
</script>

<template>
  <section class="safe-area-basic" aria-label="底部安全区与嵌套">
    <div class="safe-area-basic__controls">
      <label class="safe-area-basic__inset-label"
        >底部留白（CSS px）<mp-input-number v-model="bottom" :min="0" :max="80" aria-label="底部留白"
      /></label>
      <mp-checkbox v-model="consume">避免嵌套重复留白</mp-checkbox>
    </div>
    <p>斜纹是安全区，实色是内容。将底部设为 0，或关闭嵌套保护，比较留白变化。</p>
    <mp-safe-area class="safe-area-basic__outer" :edges="['bottom']" :insets="{ bottom }" :consume="consume">
      <div class="safe-area-basic__content">
        <p>页面内容</p>
        <mp-safe-area class="safe-area-basic__nested" :edges="['bottom']">
          <div class="safe-area-basic__action"><mp-button status="primary" block>底部操作栏</mp-button></div>
        </mp-safe-area>
      </div>
    </mp-safe-area>
    <p role="status">外层 {{ bottom }}px · 嵌套 {{ consume ? 0 : bottom }}px</p>
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
