<script setup lang="ts"></script>

<template>
  <mp-dropdown-menu trigger="contextMenu" align-point style="display: block">
    <div class="dropdown-menu-example-area">右键点击</div>

    <template #content>
      <mp-menu-option label="Option 1" />
      <mp-menu-option label="Option 2" />
      <mp-menu-option label="Option 3" />
    </template>
  </mp-dropdown-menu>
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
