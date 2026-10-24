<script setup lang="ts">
import { reactive as __demoReactive, ref } from 'vue'

const current = ref(1)
const __demoAppearance = __demoReactive({ status: 'wait', size: 'md' })
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
            { label: 'wait', value: 'wait' },
            { label: 'process', value: 'process' },
            { label: 'finish', value: 'finish' },
            { label: 'error', value: 'error' },
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
            { label: 'sm', value: 'sm' },
            { label: 'md', value: 'md' },
          ]"
          aria-label="size"
        />
      </div>
    </mp-space>
    <mp-steps :model-value="2" content-placement="bottom" v-bind="__demoAppearance">
      <mp-step>步骤1</mp-step>
      <mp-step>步骤2</mp-step>
      <mp-step>步骤3</mp-step>
    </mp-steps>
  </mp-space>
</template>
<style scoped lang="less">
.status-switch {
  margin-bottom: 16px;
}
</style>
