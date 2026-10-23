<script setup>
import { reactive as __demoReactive } from 'vue'

const __demoAppearance = __demoReactive({ status: 'default', size: 'md' })
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <div>
        <span>status</span
        ><mp-select
          v-model="__demoAppearance['status']"
          :clearable="false"
          :options="[
            { label: 'default', value: 'default' },
            { label: 'primary', value: 'primary' },
            { label: 'info', value: 'info' },
            { label: 'success', value: 'success' },
            { label: 'warning', value: 'warning' },
            { label: 'danger', value: 'danger' },
          ]"
          aria-label="status"
        />
      </div>
      <div>
        <span>size</span
        ><mp-select
          v-model="__demoAppearance['size']"
          :clearable="false"
          :options="[
            { label: 'xs', value: 'xs' },
            { label: 'md', value: 'md' },
          ]"
          aria-label="size"
        />
      </div>
    </mp-space>
    <mp-tooltip content="Tooltip" v-bind="__demoAppearance">
      <mp-button>默认</mp-button>
    </mp-tooltip>
  </mp-space>
</template>
<style scoped lang="less">
.placement-container {
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
