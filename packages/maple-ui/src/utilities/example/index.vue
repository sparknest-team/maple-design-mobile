<script setup>
import { onThemeChange } from '@maplejs/maple-cli/client'

onThemeChange()

const statusColors = ['primary', 'success', 'warning', 'danger', 'info']
const textLevels = [1, 2, 3, 4]
const spaceSamples = [
  { cls: 'mp-mt-16 mp-px-8', label: 'mp-mt-16 mp-px-8' },
  { cls: 'mp-p-16', label: 'mp-p-16' },
  { cls: 'mp-mx-24 mp-my-8', label: 'mp-mx-24 mp-my-8' },
]
</script>

<template>
  <div class="utilities-demo mp-px-16 mp-py-16">
    <div class="mp-text-1 mp-mb-8">Color</div>
    <div class="mp-flex mp-flex-wrap mp-items-center" style="gap: 8px">
      <div
        v-for="name in statusColors"
        :key="name"
        class="mp-px-8 mp-py-4 mp-rounded-sm"
        :class="[`mp-${name}`, `mp-bg-${name}`]"
      >
        mp-{{ name }}
      </div>
    </div>

    <div class="mp-flex mp-flex-wrap mp-mt-16" style="gap: 8px">
      <div v-for="n in textLevels" :key="`t-${n}`" :class="`mp-text-${n}`">mp-text-{{ n }}</div>
    </div>

    <div class="mp-flex mp-flex-wrap mp-mt-8" style="gap: 8px">
      <div v-for="n in textLevels" :key="`f-${n}`" class="mp-px-8 mp-py-4 mp-rounded-sm" :class="`mp-fill-${n}`">
        mp-fill-{{ n }}
      </div>
    </div>

    <div class="mp-flex mp-flex-wrap mp-mt-8" style="gap: 8px">
      <div
        v-for="n in [0, 1, 2]"
        :key="`bg-${n}`"
        class="mp-px-8 mp-py-4 mp-rounded-sm mp-border-2"
        :class="`mp-bg-${n}`"
        style="border-width: 1px; border-style: solid"
      >
        mp-bg-{{ n }}
      </div>
    </div>

    <div class="mp-text-1 mp-mt-24 mp-mb-8">Spacing</div>
    <div class="mp-fill-2 mp-rounded-md mp-p-8">
      <div v-for="item in spaceSamples" :key="item.label" class="mp-bg-primary mp-rounded-sm" :class="item.cls">
        {{ item.label }}
      </div>
    </div>

    <div class="mp-text-1 mp-mt-24 mp-mb-8">Flex</div>
    <div class="mp-flex mp-flex-row mp-justify-between mp-items-center mp-fill-1 mp-rounded-md mp-px-16 mp-py-8">
      <span class="mp-text-1">start</span>
      <span class="mp-text-3">space-between</span>
      <span class="mp-primary">end</span>
    </div>

    <div class="mp-text-1 mp-mt-24 mp-mb-8">Rounded</div>
    <div class="mp-flex mp-flex-col" style="gap: 12px">
      <div class="mp-bg-1 mp-rounded-sm mp-px-16 mp-py-8">mp-rounded-sm</div>
      <div class="mp-bg-1 mp-rounded-md mp-px-16 mp-py-8">mp-rounded-md</div>
      <div class="mp-bg-1 mp-rounded-lg mp-px-16 mp-py-8">mp-rounded-lg</div>
    </div>
  </div>
</template>

<style lang="less">
@import '../../styles/theme/css-variables.less';
@import '../utilities.less';
</style>
