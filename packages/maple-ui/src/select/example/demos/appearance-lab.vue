<script setup>
import { reactive as __demoReactive, ref } from 'vue'

const value = ref('design')
const options = [
  { label: '研发', value: 'dev' },
  { label: '设计', value: 'design' },
  { label: '运营', value: 'ops', disabled: true },
]
const __demoAppearance = __demoReactive({ variant: 'filled', size: 'md' })
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
            { label: 'filled', value: 'filled' },
            { label: 'outline', value: 'outline' },
            { label: 'standard', value: 'standard' },
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
            { label: 'xs', value: 'xs' },
            { label: 'sm', value: 'sm' },
            { label: 'md', value: 'md' },
            { label: 'lg', value: 'lg' },
            { label: 'xl', value: 'xl' },
          ]"
          aria-label="size"
        />
      </div>
    </mp-space>
    <mp-select v-model="value" :options="options" clearable v-bind="__demoAppearance"></mp-select>
  </mp-space>
</template>
