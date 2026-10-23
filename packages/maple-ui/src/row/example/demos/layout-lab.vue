<script setup>
import { reactive as __demoReactive } from 'vue'

const __demoLayout = __demoReactive({ align: 'start', justify: 'start' })
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <div>
        <span>align</span
        ><mp-select
          v-model="__demoLayout['align']"
          :clearable="false"
          :options="[
            { label: 'start', value: 'start' },
            { label: 'center', value: 'center' },
            { label: 'end', value: 'end' },
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
            { label: 'start', value: 'start' },
            { label: 'center', value: 'center' },
            { label: 'end', value: 'end' },
            { label: 'space-around', value: 'space-around' },
            { label: 'space-between', value: 'space-between' },
          ]"
          aria-label="justify"
        />
      </div>
    </mp-space>
    <mp-row :gutter="12" v-bind="__demoLayout"
      ><mp-col v-for="i in 3" :key="i" :span="8"><div class="cell">8</div></mp-col></mp-row
    >
  </mp-space>
</template>
<style scoped>
.controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
.cell {
  box-sizing: border-box;
  padding: 12px;
  min-width: 0;
  border-radius: 4px;
  background: var(--mp-color-primary);
  color: var(--mp-color-white);
  text-align: center;
  overflow-wrap: anywhere;
}
.soft {
  opacity: 0.7;
}
</style>
