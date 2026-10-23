<script setup>
import { reactive as __demoReactive } from 'vue'

const __demoAppearance = __demoReactive({ variant: 'line', size: 'md' })
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
            { label: 'line', value: 'line' },
            { label: 'card', value: 'card' },
            { label: 'outline', value: 'outline' },
            { label: 'plain', value: 'plain' },
            { label: 'capsule', value: 'capsule' },
            { label: 'enclosed', value: 'enclosed' },
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
    <mp-tabs default-active="overview" v-bind="__demoAppearance">
      <mp-tab-pane key="overview" title="概览">概览内容</mp-tab-pane>
      <mp-tab-pane key="details" title="详情">详情内容</mp-tab-pane>
      <mp-tab-pane key="settings" title="设置">设置内容</mp-tab-pane>
    </mp-tabs>
  </mp-space>
</template>
