<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <div class="trigger-controlled-demo">
    <mp-space>
      <mp-button @click="open = true">外部打开</mp-button>
      <mp-button variant="outline" @click="open = false">外部关闭</mp-button>
    </mp-space>
    <mp-trigger
      v-model:open="open"
      trigger="click"
      placement="bottom-start"
      :popup-offset="10"
      :popup-translate="[16, 0]"
    >
      <mp-button variant="text">受控触发元素</mp-button>
      <template #content
        ><div class="trigger-controlled-demo__panel">open = {{ open }}</div></template
      >
    </mp-trigger>
  </div>
</template>

<style scoped>
.trigger-controlled-demo {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--mp-sys-space-8);
  padding: calc(var(--mp-sys-space-8) * 2) var(--mp-sys-space-6);
}

.trigger-controlled-demo__panel {
  padding: var(--mp-sys-space-5) var(--mp-sys-space-6);
  color: var(--mp-sys-color-content-primary);
  background: var(--mp-sys-color-surface-overlay);
  border: 1px solid var(--mp-sys-color-border-default);
  border-radius: var(--mp-sys-radius-sm);
}
</style>
