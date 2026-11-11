<script setup>
import { onThemeChange } from '@maple-design/cli-vue/client'

const elevations = Array.from({ length: 25 }).map((_, index) => index)

onThemeChange()
</script>

<template>
  <mp-space wrap class="elevation-example-list" :size="['10vmin', 0]" justify="space-between">
    <div
      v-for="e in elevations"
      :key="e"
      class="elevation-example-item"
      :class="`mp-elevation--${e}`"
      :style="{ background: 'var(--mp-paper-background)' }"
    >
      {{ e }}
    </div>
  </mp-space>
</template>

<style lang="less">
@import '../../style/elevation';
</style>

<style>
.elevation-example-list {
  padding: 8vmin 4vmin;
}

.elevation-example-item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24vmin;
  height: 24vmin;
  border-radius: 4px;
}
</style>
