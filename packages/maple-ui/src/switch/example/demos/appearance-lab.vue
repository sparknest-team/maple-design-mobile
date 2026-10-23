<script setup>
import { reactive as __demoReactive, ref } from 'vue'

const value = ref(false)
const __demoAppearance = __demoReactive({ variant: 'circle', size: 'md' })
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <div>
        <span>variant</span
        ><mp-select
          v-model="__demoAppearance['variant']"
          :clearable="false"
          :options="[
            { label: 'circle', value: 'circle' },
            { label: 'round', value: 'round' },
            { label: 'line', value: 'line' },
            { label: 'tonal', value: 'tonal' },
          ]"
          aria-label="variant"
        />
      </div>
      <div>
        <span>size</span
        ><mp-select
          v-model="__demoAppearance['size']"
          :clearable="false"
          :options="[
            { label: 'sm', value: 'sm' },
            { label: 'md', value: 'md' },
            { label: 'lg', value: 'lg' },
          ]"
          aria-label="size"
        />
      </div>
    </mp-space>
    <mp-switch v-model="value" v-bind="__demoAppearance"></mp-switch>
  </mp-space>
</template>
