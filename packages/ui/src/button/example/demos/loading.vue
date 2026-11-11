<script setup lang="ts">
import { ref } from 'vue'

const stacked = ref(false)
const mode = ref('default')
const size = ref('md')
const modes = ['default', 'fill', 'line']
const sizes = ['xs', 'sm', 'md', 'lg', 'xl']
const types = ['circle', 'wave', 'cube', 'rect', 'disappear']
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-form layout="vertical" size="sm">
      <mp-form-item label="Layout" field="mode">
        <mp-radio-group v-model="mode" :options="modes" aria-label="Loading mode" variant="button" />
      </mp-form-item>
      <mp-form-item label="Size" field="size">
        <mp-radio-group
          v-model="size"
          :disabled="mode === 'line'"
          :options="sizes"
          aria-label="Loading size"
          variant="button"
        />
      </mp-form-item>
    </mp-form>
    <mp-checkbox v-model="stacked">图文堆叠（stacked）</mp-checkbox>
    <p v-if="mode === 'line'">
      line 使用底部进度线，loading-type 和 loading-size 不适用；可通过 loading-color 调整颜色。
    </p>
    <mp-space wrap
      ><mp-button
        v-for="type in mode === 'line' ? ['line'] : types"
        :key="type"
        loading
        :stacked="stacked"
        :loading-type="mode === 'line' ? 'circle' : type"
        :loading-mode="mode"
        :loading-size="size"
        ><template #icon
          ><svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M8 1v14M1 8h14" stroke="currentColor" /></svg></template
        >{{ type }}</mp-button
      ></mp-space
    >
  </mp-space>
</template>
