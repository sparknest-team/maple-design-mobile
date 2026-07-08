<template>
  <div :class="n()">
    <div :class="n(direction)">
      <div
        :class="classes(n(`${direction}-tag`), [isActive || isCurrent, n(`${direction}-tag--active`)])"
        :style="{ backgroundColor: isActive || isCurrent ? activeColor : inactiveColor }"
        @click="click"
      >
        <mp-icon v-if="isActive" :class="n('icon')" mp-step-cover :name="activeIcon" :namespace="activeIconNamespace" />
        <mp-icon
          v-else-if="isCurrent && currentIcon"
          :class="n('icon')"
          mp-step-cover
          :name="currentIcon"
          :namespace="currentIconNamespace"
        />
        <mp-icon
          v-else-if="inactiveIcon"
          :class="n('icon')"
          mp-step-cover
          :name="inactiveIcon"
          :namespace="inactiveIconNamespace"
        />
        <span v-else>{{ index + 1 }}</span>
      </div>
      <div
        v-if="$slots.default"
        :class="classes(n(`${direction}-content`), [isActive || isCurrent, n(`${direction}-content--active`)])"
        @click="click"
      >
        <slot />
      </div>
      <div :class="n(`${direction}-line`)"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, type ComputedRef } from 'vue'
import { toNumber } from '@maplejs/maple-shared'
import MpIcon from '../icon'
import { createNamespace } from '../utils/components'
import { props } from './props'
import { useSteps, type StepProvider } from './provide'

const { name, n, classes } = createNamespace('step')

export default defineComponent({
  name,
  components: { MpIcon },
  props,
  setup() {
    const { index, steps, bindSteps } = useSteps()
    const { active, activeColor, inactiveColor, direction, clickStep } = steps
    const isCurrent: ComputedRef<boolean> = computed(() => active.value === index.value)
    const isActive: ComputedRef<boolean> = computed(() => index.value !== -1 && toNumber(active.value) > index.value)

    const stepProvider: StepProvider = { index }

    bindSteps(stepProvider)

    function click() {
      return clickStep(index.value)
    }

    return {
      index,
      isActive,
      isCurrent,
      direction,
      activeColor,
      inactiveColor,
      n,
      classes,
      click,
    }
  },
})
</script>

<style lang="less">
@import '../styles/common';
@import '../icon/icon';
@import './step';
</style>
