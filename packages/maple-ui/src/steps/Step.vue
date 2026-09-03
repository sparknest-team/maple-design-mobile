<template>
  <div :class="classes(n(), [disabled, n('--disabled')])">
    <div :class="n(direction)">
      <div
        :class="
          classes(
            n(`${direction}-tag`),
            [isHighlighted, n(`${direction}-tag--active`)],
            n(`${direction}-tag--${computedStatus}`),
          )
        "
        @click="click"
      >
        <slot name="icon" :step="stepNumber" :status="computedStatus">
          <mp-icon v-if="computedStatus === 'finish'" :class="n('icon')" mp-step-cover><MIconCheck /></mp-icon>
          <mp-icon v-else-if="computedStatus === 'error'" :class="n('icon')" mp-step-cover
            ><MIconCloseCircle
          /></mp-icon>
          <span v-else>{{ stepNumber }}</span>
        </slot>
      </div>
      <div
        v-if="hasContent"
        :class="classes(n(`${direction}-content`), [isHighlighted, n(`${direction}-content--active`)])"
        @click="click"
      >
        <div v-if="title || $slots.default" :class="n(`${direction}-title`)">
          <slot>{{ title }}</slot>
        </div>
        <div v-if="description || $slots.description" :class="n(`${direction}-description`)">
          <slot name="description">{{ description }}</slot>
        </div>
      </div>
      <div :class="n(`${direction}-line`)"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, useSlots, type ComputedRef } from 'vue'
import { IconCheck as MIconCheck, IconCloseCircle as MIconCloseCircle } from '@maplejs/icons-vue'
import MpIcon from '../icon'
import { createNamespace } from '../utils/components'
import type { StepStatus } from './props'
import { props } from './step-props'
import { useSteps, type StepProvider } from './step-provide'

const { name, n, classes } = createNamespace('step')

export default defineComponent({
  name,
  components: {
    MIconCheck,
    MIconCloseCircle,
    MpIcon,
  },
  props,
  setup(props) {
    const slots = useSlots()
    const { index, steps, bindSteps } = useSteps()
    const { direction, changeable, getStatus, clickStep } = steps

    const stepNumber: ComputedRef<number> = computed(() => index.value + 1)
    const computedStatus: ComputedRef<StepStatus> = computed(() => props.status ?? getStatus(stepNumber.value))
    const isHighlighted = computed(() => computedStatus.value !== 'wait')
    const hasContent = computed(() => Boolean(props.title || props.description || slots.default || slots.description))

    const stepProvider: StepProvider = { index }

    bindSteps(stepProvider)

    function click(ev: Event) {
      if (props.disabled || !changeable.value) {
        return
      }
      clickStep(stepNumber.value, ev)
    }

    return {
      title: computed(() => props.title),
      description: computed(() => props.description),
      disabled: computed(() => props.disabled),
      stepNumber,
      computedStatus,
      isHighlighted,
      hasContent,
      direction,
      n,
      classes,
      click,
    }
  },
})
</script>
