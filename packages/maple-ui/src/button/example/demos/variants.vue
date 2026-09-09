<script setup lang="ts">
import { ref } from 'vue'

const variants = ['default', 'text', 'outline', 'tonal'] as const
const statuses = ['default', 'primary', 'secondary', 'tertiary', 'info', 'success', 'warning', 'danger'] as const
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
const size = ref<(typeof sizes)[number]>('md')
const variant = ref<(typeof variants)[number]>('default')
const component = ref<'button' | 'a'>('button')
const disabled = ref(false)
const loading = ref(false)
const clicks = ref(0)
</script>
<template>
  <div class="demo-panel">
    <div class="demo-controls">
      <div class="demo-control">
        <span class="demo-label">Size</span
        ><mp-radio-group v-model="size"
          ><mp-radio v-for="value in sizes" :key="value" :value="value">{{ value }}</mp-radio></mp-radio-group
        >
      </div>
      <div class="demo-control">
        <span class="demo-label">Variant</span
        ><mp-radio-group v-model="variant"
          ><mp-radio v-for="value in variants" :key="value" :value="value">{{ value }}</mp-radio></mp-radio-group
        >
      </div>
      <div class="demo-control">
        <span class="demo-label">Tag</span
        ><mp-radio-group v-model="component"
          ><mp-radio value="button">button</mp-radio><mp-radio value="a">a</mp-radio></mp-radio-group
        >
      </div>
      <div class="demo-toggles">
        <span class="demo-toggle"><mp-switch v-model="disabled" aria-label="Disabled" />Disabled</span
        ><span class="demo-toggle"><mp-switch v-model="loading" aria-label="Loading" />Loading</span>
      </div>
    </div>
    <div class="demo-preview" data-button-preview>
      <mp-button
        v-for="status in statuses"
        :key="status"
        :variant="variant"
        :status="status"
        :size="size"
        :component="component"
        :disabled="disabled"
        :loading="loading"
        @click="clicks++"
        >{{ status }}</mp-button
      >
    </div>
    <div aria-live="polite">Clicks: {{ clicks }}</div>
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
