<script setup>
import { onThemeChange } from '@maplejs/maple-cli/client'

onThemeChange()
const status = ['primary', 'success', 'warning', 'danger', 'info']
const levels = [1, 2, 3, 4]
</script>

<template>
  <div class="demo mp-px-16 mp-py-16">
    <div class="mp-text-1 mp-mb-8">Status</div>
    <div class="mp-flex mp-flex-wrap mp-items-center" style="gap: 8px">
      <div
        v-for="name in status"
        :key="name"
        class="mp-px-8 mp-py-4 mp-rounded-sm"
        :class="[`mp-${name}`, `mp-bg-${name}`]"
      >
        mp-{{ name }}
      </div>
    </div>

    <div class="mp-text-1 mp-mt-24 mp-mb-8">Text / Fill / Border / Bg</div>
    <div class="mp-flex mp-flex-wrap" style="gap: 8px">
      <div v-for="n in levels" :key="`t-${n}`" :class="`mp-text-${n}`">mp-text-{{ n }}</div>
    </div>
    <div class="mp-flex mp-flex-wrap mp-mt-8" style="gap: 8px">
      <div v-for="n in levels" :key="`f-${n}`" class="mp-px-8 mp-py-4 mp-rounded-sm" :class="`mp-fill-${n}`">
        mp-fill-{{ n }}
      </div>
    </div>
    <div class="mp-flex mp-flex-wrap mp-mt-8" style="gap: 8px">
      <div
        v-for="n in levels"
        :key="`bd-${n}`"
        class="mp-px-8 mp-py-4 mp-rounded-sm"
        :class="`mp-color-border-${n}`"
        style="border-width: 2px; border-style: solid"
      >
        mp-color-border-{{ n }}
      </div>
    </div>
    <div class="mp-flex mp-flex-wrap mp-mt-8" style="gap: 8px">
      <div
        v-for="n in [0, 1, 2]"
        :key="`b-${n}`"
        class="mp-px-8 mp-py-4 mp-rounded-sm mp-border-2"
        :class="`mp-bg-${n}`"
        style="border-width: 1px; border-style: solid"
      >
        mp-bg-{{ n }}
      </div>
    </div>
  </div>
</template>

<style lang="less">
@import '../../style/theme/css-variables.less';
@import '../../utilities/style/utilities.less';
</style>
