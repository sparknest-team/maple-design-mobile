<script setup lang="ts"></script>

<template>
  <mp-space>
    <mp-dropdown-menu trigger="click">
      <mp-button>点击触发</mp-button>

      <template #content>
        <mp-menu-option label="Option 1" />
        <mp-menu-option label="Option 2" />
      </template>
    </mp-dropdown-menu>

    <mp-dropdown-menu trigger="hover">
      <mp-button>悬浮触发</mp-button>

      <template #content>
        <mp-menu-option label="Option 1" />
        <mp-menu-option label="Option 2" />
      </template>
    </mp-dropdown-menu>
  </mp-space>
</template>

<style>
.dropdown-menu-example-area {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 160px;
  background-color: var(--mp-color-fill-2);
}

.dropdown-menu-example-footer {
  padding: 8px 12px;
}
</style>
