<script setup>
import { reactive as __demoReactive } from 'vue'

const __demoAppearance = __demoReactive({ variant: 'tonal', status: 'default' })
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
            { label: 'tonal', value: 'tonal' },
            { label: 'outline', value: 'outline' },
            { label: 'standard', value: 'standard' },
          ]"
          aria-label="variant"
        />
      </div>
      <div>
        <span>status</span
        ><mp-select
          v-model="__demoAppearance['status']"
          :clearable="false"
          :options="[
            { label: 'info', value: 'info' },
            { label: 'success', value: 'success' },
            { label: 'warning', value: 'warning' },
            { label: 'danger', value: 'danger' },
            { label: 'default', value: 'default' },
          ]"
          aria-label="status"
        />
      </div>
    </mp-space>
    <mp-alert title="傲慢与偏见" v-bind="__demoAppearance" />
  </mp-space>
</template>
