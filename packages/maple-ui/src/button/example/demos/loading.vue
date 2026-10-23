<script setup lang="ts">
import { ref } from 'vue'

const mode = ref('default')
const size = ref('md')
const modes = ['default', 'fill', 'line']
const sizes = ['xs', 'sm', 'md', 'lg', 'xl']
const types = ['circle', 'wave', 'cube', 'rect', 'disappear']
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <div>
        <span>Layout</span>
        <mp-select
          v-model="mode"
          :clearable="false"
          :options="modes.map((value) => ({ label: value, value }))"
          aria-label="Loading mode"
        />
      </div>
      <div>
        <span>Size</span>
        <mp-select
          v-model="size"
          :disabled="mode === 'line'"
          :clearable="false"
          :options="sizes.map((value) => ({ label: value, value }))"
          aria-label="Loading size"
        />
      </div>
    </mp-space>
    <p v-if="mode === 'line'">
      line 使用底部进度线，loading-type 和 loading-size 不适用；可通过 loading-color 调整颜色。
    </p>
    <mp-space wrap
      ><mp-button
        v-for="type in mode === 'line' ? ['line'] : types"
        :key="type"
        loading
        :loading-type="mode === 'line' ? 'circle' : type"
        :loading-mode="mode"
        :loading-size="size"
        >{{ type }}</mp-button
      ></mp-space
    >
  </mp-space>
</template>
