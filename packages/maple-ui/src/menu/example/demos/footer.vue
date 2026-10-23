<script setup lang="ts"></script>

<template>
  <mp-menu>
    <mp-button>页脚</mp-button>

    <template #content>
      <mp-menu-option label="Option 1" />
      <mp-menu-option label="Option 2" />
    </template>

    <template #footer>
      <div class="menu-example-footer">自定义页脚</div>
    </template>
  </mp-menu>
</template>

<style>
.menu-example-area {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 160px;
  background-color: var(--mp-color-fill-2);
}

.menu-example-footer {
  padding: 8px 12px;
}
</style>
