<script setup>
import { reactive as __demoReactive } from 'vue'

const __demoLayout = __demoReactive({ direction: 'row', align: 'flex-start', justify: 'flex-start' })
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <div>
        <span>direction</span
        ><mp-select
          v-model="__demoLayout['direction']"
          :clearable="false"
          :options="[
            { label: 'row', value: 'row' },
            { label: 'column', value: 'column' },
          ]"
          aria-label="direction"
        />
      </div>
      <div>
        <span>align</span
        ><mp-select
          v-model="__demoLayout['align']"
          :clearable="false"
          :options="[
            { label: 'flex-start', value: 'flex-start' },
            { label: 'flex-end', value: 'flex-end' },
            { label: 'center', value: 'center' },
            { label: 'baseline', value: 'baseline' },
            { label: 'stretch', value: 'stretch' },
          ]"
          aria-label="align"
        />
      </div>
      <div>
        <span>justify</span
        ><mp-select
          v-model="__demoLayout['justify']"
          :clearable="false"
          :options="[
            { label: 'flex-start', value: 'flex-start' },
            { label: 'flex-end', value: 'flex-end' },
            { label: 'center', value: 'center' },
            { label: 'space-around', value: 'space-around' },
            { label: 'space-between', value: 'space-between' },
            { label: 'space-evenly', value: 'space-evenly' },
          ]"
          aria-label="justify"
        />
      </div>
    </mp-space>
    <mp-space wrap :size="[8, 6]" v-bind="__demoLayout">
      <mp-button v-for="item in 8" :key="item">项目 {{ item }}</mp-button>
    </mp-space>
  </mp-space>
</template>
