<script setup lang="ts"></script>

<template>
  <mp-space wrap>
    <mp-menu disabled>
      <mp-button disabled>菜单禁用</mp-button>

      <template #content>
        <mp-menu-option label="Option 1" />
      </template>
    </mp-menu>

    <mp-menu>
      <mp-button>选项禁用</mp-button>

      <template #content>
        <mp-menu-option label="可用选项" />
        <mp-menu-option label="禁用选项" disabled />
        <mp-menu-option label="另一个可用选项" />
      </template>
    </mp-menu>
  </mp-space>
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
