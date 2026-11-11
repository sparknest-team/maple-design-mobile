<template>
  <div class="trigger-demo">
    <mp-trigger trigger="click" :popup-offset="10" show-arrow>
      <mp-button>点击打开</mp-button>
      <template #content>
        <div class="trigger-demo__panel">Trigger 只负责浮层行为，面板外观由使用者决定。</div>
      </template>
    </mp-trigger>
  </div>
</template>

<style scoped>
.trigger-demo {
  display: flex;
  justify-content: center;
  padding: calc(var(--mp-sys-space-8) * 2) var(--mp-sys-space-6);
}

.trigger-demo__panel {
  max-width: 260px;
  padding: var(--mp-sys-space-5) var(--mp-sys-space-6);
  color: var(--mp-sys-color-content-primary);
  background: var(--mp-sys-color-surface-overlay);
  border: 1px solid var(--mp-sys-color-border-default);
  border-radius: var(--mp-sys-radius-md);
}
</style>
