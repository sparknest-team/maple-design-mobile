<script setup lang="ts">
const longOptions = Array.from({ length: 8 }, (_, index) => `Option ${index + 1}`)
</script>

<template>
  <mp-space wrap>
    <mp-menu :popup-max-height="120">
      <mp-button>限制为 120px</mp-button>

      <template #content>
        <mp-menu-option v-for="item in longOptions" :key="item" :label="item" />
      </template>
    </mp-menu>

    <mp-menu :popup-max-height="false">
      <mp-button>不限制高度</mp-button>

      <template #content>
        <mp-menu-option v-for="item in longOptions" :key="item" :label="item" />
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
