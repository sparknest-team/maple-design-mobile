<script setup lang="ts">
import { ref } from 'vue'

const modes = ['default', 'fill', 'line'] as const
const types = ['circle', 'wave', 'cube', 'rect', 'disappear'] as const
const variants = ['default', 'tonal', 'outline', 'text'] as const
const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 20] as const
const size = ref<(typeof sizes)[number]>('sm')
const mode = ref<(typeof modes)[number]>('default')
const variant = ref<(typeof variants)[number]>('default')
</script>
<template>
  <div class="demo-panel">
    <div class="demo-controls">
      <div class="demo-control">
        <span class="demo-label">Loading size</span
        ><mp-radio-group v-model="size"
          ><mp-radio v-for="value in sizes" :key="value" :value="value">{{
            typeof value === 'number' ? `${value}px` : value
          }}</mp-radio></mp-radio-group
        >
      </div>
      <div class="demo-control">
        <span class="demo-label">Loading mode</span
        ><mp-radio-group v-model="mode"
          ><mp-radio v-for="value in modes" :key="value" :value="value">{{ value }}</mp-radio></mp-radio-group
        >
      </div>
      <div class="demo-control">
        <span class="demo-label">Variant</span
        ><mp-radio-group v-model="variant"
          ><mp-radio v-for="value in variants" :key="value" :value="value">{{ value }}</mp-radio></mp-radio-group
        >
      </div>
    </div>
    <div class="demo-preview" :data-loading-size="size">
      <mp-button
        v-for="type in types"
        :key="type"
        loading
        :size="size === 'xl' ? 'xl' : size === 'lg' ? 'lg' : 'md'"
        :loading-type="type"
        :loading-size="size"
        :loading-mode="mode"
        :variant="variant"
        >{{ type }}</mp-button
      >
    </div>
    <div class="demo-control">
      <span class="demo-label">Custom color / radius</span>
      <div><mp-button loading loading-color="#e05279" :loading-radius="8">Custom spinner</mp-button></div>
    </div>
  </div>
</template>

<style scoped>
.demo-panel {
  display: grid;
  gap: 20px;
}
.demo-controls {
  display: grid;
  gap: 16px;
}
.demo-control {
  display: grid;
  gap: 8px;
}
.demo-label {
  font-size: 13px;
  opacity: 0.7;
}
.demo-toggles,
.demo-preview {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
.demo-toggle {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.demo-preview {
  min-height: 64px;
  padding-block: 8px;
}
</style>
